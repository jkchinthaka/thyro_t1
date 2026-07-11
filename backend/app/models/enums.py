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
