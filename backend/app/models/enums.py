"""Typed string enums for persistence (stable string values)."""

from __future__ import annotations

from enum import StrEnum


class UserRole(StrEnum):
    PATIENT = "patient"
    ADMIN = "admin"
    MEDICAL_EXPERT = "medical_expert"


class AccountStatus(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    PENDING = "pending"


class MedicationStatus(StrEnum):
    ACTIVE = "active"
    COMPLETED = "completed"
    DISCONTINUED = "discontinued"


class MedicationLogStatus(StrEnum):
    TAKEN = "taken"
    MISSED = "missed"
    SKIPPED = "skipped"


class MedicationFrequency(StrEnum):
    ONCE_DAILY = "once_daily"
    TWICE_DAILY = "twice_daily"
    THREE_TIMES_DAILY = "three_times_daily"
    FOUR_TIMES_DAILY = "four_times_daily"
    WEEKLY = "weekly"
    AS_NEEDED = "as_needed"
    CUSTOM = "custom"


class AppointmentStatus(StrEnum):
    UPCOMING = "upcoming"
    COMPLETED = "completed"
    MISSED = "missed"
    CANCELLED = "cancelled"


class AppointmentType(StrEnum):
    TSH_TEST = "tsh_test"
    BLOOD_TEST = "blood_test"
    DOCTOR_CONSULTATION = "doctor_consultation"
    ULTRASOUND = "ultrasound"
    RAI_FOLLOW_UP = "rai_follow_up"
    MEDICATION_REVIEW = "medication_review"
    OTHER = "other"


class SymptomGuidanceLevel(StrEnum):
    SELF_CARE = "self_care"
    CONTACT_PROVIDER = "contact_provider"
    URGENT_MEDICAL_HELP = "urgent_medical_help"


class KnowledgeStatus(StrEnum):
    DRAFT = "draft"
    IN_REVIEW = "in_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    ARCHIVED = "archived"


class FeedbackType(StrEnum):
    HELPFUL = "helpful"
    NOT_HELPFUL = "not_helpful"
    REPORT = "report"


class EmergencyEventStatus(StrEnum):
    DETECTED = "detected"
    ACKNOWLEDGED = "acknowledged"
    REVIEWED = "reviewed"
    CLOSED = "closed"


class ChatMessageRole(StrEnum):
    USER = "user"
    ASSISTANT = "assistant"


class AssessmentSource(StrEnum):
    USER_FORM = "user_form"
    RULE_ENGINE = "rule_engine"
    SYSTEM = "system"


class AgeRange(StrEnum):
    UNDER_18 = "under_18"
    AGE_18_29 = "age_18_29"
    AGE_30_39 = "age_30_39"
    AGE_40_49 = "age_40_49"
    AGE_50_59 = "age_50_59"
    AGE_60_69 = "age_60_69"
    AGE_70_PLUS = "age_70_plus"
    PREFER_NOT_TO_SAY = "prefer_not_to_say"


class PreferredLanguage(StrEnum):
    ENGLISH = "english"
    SINHALA = "sinhala"
    TAMIL = "tamil"


class RAITreatmentStatus(StrEnum):
    NOT_PLANNED = "not_planned"
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    NOT_APPLICABLE = "not_applicable"
    UNKNOWN = "unknown"


class TreatmentStage(StrEnum):
    POST_SURGERY = "post_surgery"
    PRE_RAI = "pre_rai"
    POST_RAI = "post_rai"
    FOLLOW_UP = "follow_up"
    LONG_TERM_SURVIVORSHIP = "long_term_survivorship"
    UNKNOWN = "unknown"
