"""Ingest controlled local knowledge files into MongoDB.

Usage (from backend directory with venv active):

    python -m app.scripts.ingest_approved_knowledge

Does not auto-approve PENDING_REVIEW content.
"""

from __future__ import annotations

import asyncio
import sys

from app.core.config import get_settings
from app.db.mongodb import close_mongo_connection, connect_to_mongo, get_database
from app.repositories.knowledge_repository import KnowledgeRepository
from app.services.audit_service import AuditActions, AuditService
from app.services.knowledge_ingestion_service import KnowledgeIngestionService


async def main() -> int:
    settings = get_settings()
    await connect_to_mongo(settings)
    database = get_database()
    if database is None:
        print("Database unavailable", file=sys.stderr)
        return 1
    ingestion = KnowledgeIngestionService()
    docs, chunks = ingestion.load_all()
    repo = KnowledgeRepository(database)
    for doc in docs:
        await repo.upsert_document(doc)
        related = [c for c in chunks if c.document_id == doc.document_id]
        await repo.upsert_chunks(related)
        await repo.retire_old_chunks(doc.document_id, doc.content_version)
    audit = AuditService(database)
    await audit.record(
        AuditActions.KNOWLEDGE_INGESTED,
        changes_summary=f"docs={len(docs)};chunks={len(chunks)}",
    )
    print(f"Ingested {len(docs)} documents and {len(chunks)} chunks (review statuses preserved).")
    await close_mongo_connection()
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
