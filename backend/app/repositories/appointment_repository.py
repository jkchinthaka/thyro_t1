"""Appointment repository — ownership-enforced queries."""

from __future__ import annotations

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import CollectionName
from app.models.appointment import AppointmentDocument
from app.models.enums import AppointmentStatus
from app.models.object_id import to_object_id
from app.repositories.base import BaseRepository
from app.utils.datetime import utc_now


class AppointmentRepository(BaseRepository[AppointmentDocument]):
    collection_name = CollectionName.APPOINTMENTS.value
    model_type = AppointmentDocument
    supports_soft_delete = True

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def list_for_user(
        self,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[AppointmentDocument]:
        return await self.find_many(
            {"user_id": to_object_id(user_id)},
            page=page,
            page_size=page_size,
            sort=[("scheduled_start", 1)],
        )

    async def list_upcoming_for_user(
        self,
        user_id: ObjectId | str,
    ) -> list[AppointmentDocument]:
        return await self.find_many(
            {
                "user_id": to_object_id(user_id),
                "status": AppointmentStatus.UPCOMING.value,
                "scheduled_start": {"$gte": utc_now()},
            },
            page=1,
            page_size=100,
            sort=[("scheduled_start", 1)],
        )

    async def get_owned_by_id(
        self,
        appointment_id: ObjectId | str,
        user_id: ObjectId | str,
    ) -> AppointmentDocument | None:
        return await self.find_one(
            {"_id": to_object_id(appointment_id), "user_id": to_object_id(user_id)},
        )
