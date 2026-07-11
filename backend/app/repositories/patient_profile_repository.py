"""Patient profile repository foundation."""

from __future__ import annotations

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import CollectionName
from app.models.object_id import to_object_id
from app.models.patient_profile import PatientProfileDocument
from app.repositories.base import BaseRepository


class PatientProfileRepository(BaseRepository[PatientProfileDocument]):
    collection_name = CollectionName.PATIENT_PROFILES.value
    model_type = PatientProfileDocument
    supports_soft_delete = True

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def get_by_user_id(self, user_id: ObjectId | str) -> PatientProfileDocument | None:
        return await self.find_one({"user_id": to_object_id(user_id)})

    async def profile_exists(self, user_id: ObjectId | str) -> bool:
        return await self.exists({"user_id": to_object_id(user_id)})

    async def create_profile_document(
        self,
        document: PatientProfileDocument,
    ) -> PatientProfileDocument:
        return await self.insert_one(document)
