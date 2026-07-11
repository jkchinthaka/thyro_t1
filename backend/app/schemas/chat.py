"""Public chat schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ChatMessageRole
from app.schemas.base import PublicIdSchema, PublicSoftDeleteSchema, PublicTimestampSchema


class ChatSourceReferencePublic(BaseModel):
    model_config = ConfigDict(extra="forbid")

    label: str
    source_organization: str | None = None
    document_id: str | None = None
    chunk_id: str | None = None


class ChatSessionPublic(PublicIdSchema, PublicTimestampSchema, PublicSoftDeleteSchema):
    user_id: str
    title: str
    started_at: datetime
    last_message_at: datetime | None = None
    message_count: int = 0
    archived_at: datetime | None = None


class ChatMessagePublic(PublicIdSchema, PublicTimestampSchema):
    session_id: str
    user_id: str
    role: ChatMessageRole
    content: str
    category: str | None = None
    confidence_band: str | None = None
    source_references: list[ChatSourceReferencePublic] = []
    emergency_detected: bool = False
    fallback_used: bool = False
