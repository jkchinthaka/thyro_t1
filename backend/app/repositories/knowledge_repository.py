"""Knowledge repository — approved/active filtering."""

from __future__ import annotations

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import CollectionName
from app.models.enums import KnowledgeStatus
from app.models.knowledge import KnowledgeDocumentDocument
from app.models.object_id import to_object_id
from app.repositories.base import BaseRepository


class KnowledgeRepository(BaseRepository[KnowledgeDocumentDocument]):
    collection_name = CollectionName.KNOWLEDGE_DOCUMENTS.value
    model_type = KnowledgeDocumentDocument
    supports_soft_delete = True

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def list_approved_active(
        self,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[KnowledgeDocumentDocument]:
        return await self.find_many(
            {
                "status": KnowledgeStatus.APPROVED.value,
                "active": True,
            },
            page=page,
            page_size=page_size,
            sort=[("updated_at", -1)],
        )

    async def get_approved_active_by_id(
        self,
        document_id: ObjectId | str,
    ) -> KnowledgeDocumentDocument | None:
        return await self.find_one(
            {
                "_id": to_object_id(document_id),
                "status": KnowledgeStatus.APPROVED.value,
                "active": True,
            },
        )

    async def list_by_status(
        self,
        status: KnowledgeStatus,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[KnowledgeDocumentDocument]:
        return await self.find_many(
            {"status": status.value},
            page=page,
            page_size=page_size,
            sort=[("updated_at", -1)],
        )
