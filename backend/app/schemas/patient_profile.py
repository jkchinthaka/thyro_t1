"""Public patient profile schemas."""

from __future__ import annotations

from datetime import date, datetime

from app.schemas.base import PublicIdSchema, PublicSoftDeleteSchema, PublicTimestampSchema


class PatientProfilePublic(PublicIdSchema, PublicTimestampSchema, PublicSoftDeleteSchema):
    user_id: str
    age_range: str | None = None
    preferred_language: str | None = None
    surgery_date: date | None = None
    rai_treatment_status: str | None = None
    treatment_stage: str | None = None
    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None
    current_medication_summary: str | None = None
    consent_accepted: bool = False
    consent_accepted_at: datetime | None = None
    disclaimer_accepted: bool = False
    disclaimer_accepted_at: datetime | None = None
