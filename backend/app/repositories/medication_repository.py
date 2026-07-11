"""Medication repository — ownership-enforced queries."""

from __future__ import annotations

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import CollectionName
from app.models.enums import MedicationStatus
from app.models.medication import MedicationDocument
from app.models.object_id import to_object_id
from app.repositories.base import BaseRepository


class MedicationRepository(BaseRepository[MedicationDocument]):
    collection_name = CollectionName.MEDICATIONS.value
    model_type = MedicationDocument
    supports_soft_delete = True

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def list_for_user(
        self,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[MedicationDocument]:
        return await self.find_many(
            {"user_id": to_object_id(user_id)},
            page=page,
            page_size=page_size,
            sort=[("created_at", -1)],
        )

    async def get_owned_by_id(
        self,
        medication_id: ObjectId | str,
        user_id: ObjectId | str,
    ) -> MedicationDocument | None:
        return await self.find_one(
            {"_id": to_object_id(medication_id), "user_id": to_object_id(user_id)},
        )

    async def list_active_for_user(self, user_id: ObjectId | str) -> list[MedicationDocument]:
        return await self.find_many(
            {
                "user_id": to_object_id(user_id),
                "status": MedicationStatus.ACTIVE.value,
            },
            page=1,
            page_size=100,
            sort=[("created_at", -1)],
        )
