"""Public appointment schemas."""

from __future__ import annotations

from datetime import datetime

from app.models.enums import AppointmentStatus, AppointmentType
from app.schemas.base import PublicIdSchema, PublicSoftDeleteSchema, PublicTimestampSchema


class AppointmentPublic(PublicIdSchema, PublicTimestampSchema, PublicSoftDeleteSchema):
    user_id: str
    appointment_type: AppointmentType
    title: str
    scheduled_start: datetime
    scheduled_end: datetime
    timezone: str = "UTC"
    location: str | None = None
    provider_name: str | None = None
    notes: str | None = None
    status: AppointmentStatus
    completed_at: datetime | None = None
    reminder_offsets_minutes: list[int] = []
