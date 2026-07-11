"""Chat session and message persistence (no AI calls in Phase 5)."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.base import DocumentBase, SoftDeletableDocument, TimestampFields
from app.models.enums import ChatMessageRole
from app.models.object_id import PyObjectId
from app.utils.datetime import utc_now

CHAT_CONTENT_MAX_LENGTH = 8000


class ChatSourceReference(BaseModel):
    """Structured citation — not an arbitrary free-form URL blob."""

    model_config = ConfigDict(extra="forbid", arbitrary_types_allowed=True)

    label: str = Field(min_length=1, max_length=200)
    source_organization: str | None = Field(default=None, max_length=200)
    document_id: PyObjectId | None = None
    chunk_id: PyObjectId | None = None


class ChatSessionDocument(SoftDeletableDocument):
    user_id: PyObjectId
    title: str = Field(default="Conversation", min_length=1, max_length=200)
    started_at: datetime = Field(default_factory=utc_now)
    last_message_at: datetime | None = None
    message_count: int = Field(default=0, ge=0)
    archived_at: datetime | None = None


class ChatMessageDocument(DocumentBase, TimestampFields):
    session_id: PyObjectId
    user_id: PyObjectId
    role: ChatMessageRole
    content: str = Field(min_length=1, max_length=CHAT_CONTENT_MAX_LENGTH)
    category: str | None = Field(default=None, max_length=64)
    confidence_band: str | None = Field(default=None, max_length=32)
    source_references: list[ChatSourceReference] = Field(default_factory=list, max_length=20)
    emergency_detected: bool = False
    fallback_used: bool = False
