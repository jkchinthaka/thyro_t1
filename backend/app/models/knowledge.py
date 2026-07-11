"""Knowledge document and chunk persistence (Phase 11)."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.base import SoftDeletableDocument
from app.models.enums import KnowledgeStatus
from app.models.object_id import PyObjectId

KNOWLEDGE_BODY_MAX = 200_000
CHUNK_TEXT_MAX = 4_000


class KnowledgeDocumentDocument(SoftDeletableDocument):
    document_id: str = Field(min_length=1, max_length=120)
    title: str = Field(min_length=1, max_length=300)
    slug: str = Field(min_length=1, max_length=200)
    source_name: str = Field(min_length=1, max_length=200)
    source_url: str | None = Field(default=None, max_length=500)
    topic: str = Field(min_length=1, max_length=100)
    language: str = Field(default="english", min_length=1, max_length=32)
    version: str = Field(default="1", min_length=1, max_length=64)
    review_status: KnowledgeStatus = KnowledgeStatus.DRAFT
    reviewed_at: datetime | None = None
    reviewed_by_role: str | None = Field(default=None, max_length=64)
    content_hash: str = Field(default="", max_length=128)
    body: str = Field(default="", max_length=KNOWLEDGE_BODY_MAX)
    medical_disclaimer: str = Field(default="", max_length=1000)
    # Legacy Phase 5 compatibility fields
    category: str = Field(default="general", max_length=100)
    content: str = Field(default="", max_length=KNOWLEDGE_BODY_MAX)
    source_organization: str | None = Field(default=None, max_length=200)
    source_reference: str | None = Field(default=None, max_length=500)
    status: KnowledgeStatus = KnowledgeStatus.DRAFT
    active: bool = False
    reviewed_by_user_id: PyObjectId | None = None
    review_comment: str | None = Field(default=None, max_length=1000)
    created_by_user_id: PyObjectId | None = None
    updated_by_user_id: PyObjectId | None = None


class KnowledgeChunkMetadata(BaseModel):
    model_config = ConfigDict(extra="forbid")

    category: str | None = Field(default=None, max_length=100)
    language: str | None = Field(default=None, max_length=32)


class KnowledgeChunkDocument(SoftDeletableDocument):
    document_id: str = Field(min_length=1, max_length=120)
    mongo_document_id: PyObjectId | None = None
    chunk_id: str = Field(min_length=1, max_length=160)
    chunk_index: int = Field(ge=0)
    text: str = Field(min_length=1, max_length=CHUNK_TEXT_MAX)
    topic: str = Field(default="general", max_length=100)
    language: str = Field(default="english", max_length=32)
    source_title: str = Field(default="", max_length=300)
    source_name: str = Field(default="", max_length=200)
    source_url: str | None = Field(default=None, max_length=500)
    document_version: str = Field(default="1", max_length=64)
    review_status: KnowledgeStatus = KnowledgeStatus.DRAFT
    content_hash: str = Field(default="", max_length=128)
    # Legacy
    content: str = Field(default="", max_length=20_000)
    metadata: KnowledgeChunkMetadata = Field(default_factory=KnowledgeChunkMetadata)
    embedding_provider: str | None = Field(default=None, max_length=64)
    embedding_model: str | None = Field(default=None, max_length=128)
    embedding_dimension: int | None = Field(default=None, ge=1)
    embedding_reference: str | None = Field(default=None, max_length=500)
    active: bool = False
