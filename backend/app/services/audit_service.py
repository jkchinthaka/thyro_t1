"""Best-effort authentication audit events."""

from __future__ import annotations

import hashlib

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.core.logging import get_logger, get_request_id
from app.models.supporting import AuditLogDocument
from app.repositories.audit_log_repository import AuditLogRepository

logger = get_logger(__name__)


class AuditActions:
    USER_REGISTERED = "USER_REGISTERED"
    LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED"
    LOGIN_FAILED = "LOGIN_FAILED"
    ACCOUNT_TEMPORARILY_LOCKED = "ACCOUNT_TEMPORARILY_LOCKED"
    TOKEN_REFRESHED = "TOKEN_REFRESHED"
    REFRESH_TOKEN_REUSE_DETECTED = "REFRESH_TOKEN_REUSE_DETECTED"
    LOGOUT_COMPLETED = "LOGOUT_COMPLETED"
    TOKEN_FAMILY_REVOKED = "TOKEN_FAMILY_REVOKED"
    AUTHORIZATION_DENIED = "AUTHORIZATION_DENIED"
    PROFILE_UPDATED = "PROFILE_UPDATED"
    MEDICATION_CREATED = "MEDICATION_CREATED"
    MEDICATION_UPDATED = "MEDICATION_UPDATED"
    MEDICATION_DELETED = "MEDICATION_DELETED"
    MEDICATION_LOG_RECORDED = "MEDICATION_LOG_RECORDED"
    MEDICATION_LOG_UPDATED = "MEDICATION_LOG_UPDATED"


def email_fingerprint(email_normalized: str) -> str:
    return hashlib.sha256(email_normalized.encode("utf-8")).hexdigest()[:32]


class AuditService:
    def __init__(self, database: AsyncDatabase) -> None:
        self._repo = AuditLogRepository(database)

    async def record(
        self,
        action: str,
        *,
        actor_user_id: ObjectId | None = None,
        entity_type: str = "user",
        entity_id: ObjectId | None = None,
        changes_summary: str = "",
    ) -> None:
        try:
            doc = AuditLogDocument(
                actor_user_id=actor_user_id,
                action=action,
                entity_type=entity_type,
                entity_id=entity_id,
                changes_summary=changes_summary[:500],
                request_id=get_request_id(),
            )
            await self._repo.create_event(doc)
        except Exception:  # noqa: BLE001 — audit must not break auth flows
            logger.exception("Failed to write audit event action=%s", action)
