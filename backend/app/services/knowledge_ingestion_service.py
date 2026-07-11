"""Load and chunk controlled local knowledge files."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any

from app.models.enums import KnowledgeStatus
from app.models.knowledge import (
    KnowledgeChunkDocument,
    KnowledgeChunkMetadata,
    KnowledgeDocumentDocument,
)
from app.utils.datetime import utc_now

CHUNK_SIZE = 800
CHUNK_OVERLAP = 100

_DEFAULT_DIR = Path(__file__).resolve().parent.parent / "content" / "approved_knowledge"


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def deterministic_chunks(
    body: str, *, size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP
) -> list[str]:
    text = re.sub(r"\s+", " ", body.strip())
    if not text:
        return []
    if len(text) <= size:
        return [text]
    chunks: list[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + size)
        chunks.append(text[start:end].strip())
        if end >= len(text):
            break
        start = max(0, end - overlap)
    return [c for c in chunks if c]


def _parse_status(value: str) -> KnowledgeStatus:
    return KnowledgeStatus(value)


def load_knowledge_file(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    required = {
        "document_id",
        "title",
        "slug",
        "source_name",
        "topic",
        "language",
        "version",
        "review_status",
        "body",
    }
    missing = required - set(data)
    if missing:
        raise ValueError(f"Missing fields in {path.name}: {sorted(missing)}")
    return data


def build_document(data: dict[str, Any]) -> KnowledgeDocumentDocument:
    body = str(data["body"])
    status = _parse_status(str(data["review_status"]))
    digest = content_hash(body)
    return KnowledgeDocumentDocument(
        document_id=str(data["document_id"]),
        title=str(data["title"]),
        slug=str(data["slug"]),
        source_name=str(data["source_name"]),
        source_url=data.get("source_url"),
        topic=str(data["topic"]),
        language=str(data.get("language") or "english"),
        version=str(data.get("version") or "1"),
        review_status=status,
        reviewed_at=None,
        reviewed_by_role=data.get("reviewed_by_role"),
        content_hash=digest,
        body=body,
        medical_disclaimer=str(data.get("medical_disclaimer") or ""),
        category=str(data.get("topic") or "general"),
        content=body,
        source_organization=str(data["source_name"]),
        source_reference=data.get("source_url"),
        status=status,
        active=status == KnowledgeStatus.APPROVED,
        updated_at=utc_now(),
    )


def build_chunks(doc: KnowledgeDocumentDocument) -> list[KnowledgeChunkDocument]:
    parts = deterministic_chunks(doc.body)
    out: list[KnowledgeChunkDocument] = []
    for idx, part in enumerate(parts):
        chunk_id = f"{doc.document_id}:c{idx}"
        out.append(
            KnowledgeChunkDocument(
                document_id=doc.document_id,
                chunk_id=chunk_id,
                chunk_index=idx,
                text=part,
                topic=doc.topic,
                language=doc.language,
                source_title=doc.title,
                source_name=doc.source_name,
                source_url=doc.source_url,
                document_version=doc.version,
                review_status=doc.review_status,
                content_hash=content_hash(part),
                content=part,
                metadata=KnowledgeChunkMetadata(category=doc.topic, language=doc.language),
                active=doc.review_status == KnowledgeStatus.APPROVED,
            )
        )
    return out


class KnowledgeIngestionService:
    def __init__(self, content_dir: Path | None = None) -> None:
        self.content_dir = content_dir or _DEFAULT_DIR

    def load_all(self) -> tuple[list[KnowledgeDocumentDocument], list[KnowledgeChunkDocument]]:
        docs: list[KnowledgeDocumentDocument] = []
        chunks: list[KnowledgeChunkDocument] = []
        if not self.content_dir.exists():
            return docs, chunks
        for path in sorted(self.content_dir.glob("*.json")):
            data = load_knowledge_file(path)
            doc = build_document(data)
            docs.append(doc)
            chunks.extend(build_chunks(doc))
        return docs, chunks

    def approved_only_chunks(
        self, chunks: list[KnowledgeChunkDocument]
    ) -> list[KnowledgeChunkDocument]:
        return [c for c in chunks if c.review_status == KnowledgeStatus.APPROVED and c.active]
