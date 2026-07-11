"""Public medication schemas."""

from __future__ import annotations

from datetime import date, datetime, time

from app.models.enums import MedicationLogStatus, MedicationStatus
from app.schemas.base import PublicIdSchema, PublicSoftDeleteSchema, PublicTimestampSchema


class MedicationPublic(PublicIdSchema, PublicTimestampSchema, PublicSoftDeleteSchema):
    user_id: str
    name: str
    dosage_text: str
    frequency: str
    reminder_times: list[time] = []
    instructions: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: MedicationStatus
    prescribed_by_text: str | None = None
    notes: str | None = None
    timezone: str = "UTC"


class MedicationLogPublic(PublicIdSchema, PublicTimestampSchema):
    user_id: str
    medication_id: str
    scheduled_for: datetime
    recorded_at: datetime
    status: MedicationLogStatus
    note: str | None = None
