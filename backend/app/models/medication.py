"""Medication and medication-log persistence documents."""

from __future__ import annotations

from datetime import date, datetime, time

from pydantic import Field, field_validator, model_validator

from app.models.base import DocumentBase, SoftDeletableDocument, TimestampFields
from app.models.enums import MedicationLogStatus, MedicationStatus
from app.models.object_id import PyObjectId
from app.utils.datetime import utc_now


class MedicationDocument(SoftDeletableDocument):
    user_id: PyObjectId
    name: str = Field(min_length=1, max_length=200)
    dosage_text: str = Field(min_length=1, max_length=200)
    frequency: str = Field(min_length=1, max_length=120)
    reminder_times: list[time] = Field(default_factory=list, max_length=12)
    instructions: str | None = Field(default=None, max_length=1000)
    start_date: date | None = None
    end_date: date | None = None
    status: MedicationStatus = MedicationStatus.ACTIVE
    prescribed_by_text: str | None = Field(default=None, max_length=200)
    notes: str | None = Field(default=None, max_length=1000)
    timezone: str = Field(default="UTC", min_length=1, max_length=64)

    @field_validator("reminder_times")
    @classmethod
    def _unique_reminder_times(cls, value: list[time]) -> list[time]:
        if len(value) != len(set(value)):
            raise ValueError("reminder_times must be unique")
        return value

    @model_validator(mode="after")
    def _validate_dates(self) -> MedicationDocument:
        if self.start_date and self.end_date and self.end_date < self.start_date:
            raise ValueError("end_date must be on or after start_date")
        return self


class MedicationLogDocument(DocumentBase, TimestampFields):
    """Append-oriented log; no soft-delete."""

    user_id: PyObjectId
    medication_id: PyObjectId
    scheduled_for: datetime
    recorded_at: datetime = Field(default_factory=utc_now)
    status: MedicationLogStatus
    note: str | None = Field(default=None, max_length=500)
