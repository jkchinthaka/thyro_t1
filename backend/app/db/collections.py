"""Centralized MongoDB collection names (snake_case).

Declaring a name does not create the collection; MongoDB creates
collections on first write or via explicit initialization.
"""

from __future__ import annotations

from enum import StrEnum


class CollectionName(StrEnum):
    USERS = "users"
    PATIENT_PROFILES = "patient_profiles"
    REFRESH_TOKENS = "refresh_tokens"
    MEDICATIONS = "medications"
    MEDICATION_LOGS = "medication_logs"
    APPOINTMENTS = "appointments"
    SYMPTOMS = "symptoms"
    SYMPTOM_LOGS = "symptom_logs"
    CHAT_SESSIONS = "chat_sessions"
    CHAT_MESSAGES = "chat_messages"
    KNOWLEDGE_DOCUMENTS = "knowledge_documents"
    KNOWLEDGE_CHUNKS = "knowledge_chunks"
    USER_FEEDBACK = "user_feedback"
    EMERGENCY_EVENTS = "emergency_events"
    RESOURCES = "resources"
    NOTIFICATIONS = "notifications"
    AUDIT_LOGS = "audit_logs"
    SCHEMA_MIGRATIONS = "schema_migrations"


ALL_COLLECTION_NAMES: tuple[str, ...] = tuple(c.value for c in CollectionName)
