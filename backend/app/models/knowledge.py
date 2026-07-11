"""Knowledge document and chunk persistence (no content or embeddings in Phase 5)."""

from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.base import SoftDeletableDocument
from app.models.enums import KnowledgeStatus
from app.models.object_id import PyObjectId


class KnowledgeDocumentDocument(SoftDeletableDocument):
    title: str = Field(min_length=1, max_length=300)
    category: str = Field(min_length=1, max_length=100)
    content: str = Field(default="", max_length=200_000)
    source_organization: str | None = Field(default=None, max_length=200)
    source_reference: str | None = Field(default=None, max_length=500)
    publication_date: date | None = None
    guideline_date: date | None = None
    status: KnowledgeStatus = KnowledgeStatus.DRAFT
    version: int = Field(default=1, ge=1)
    reviewed_by_user_id: PyObjectId | None = None
    reviewed_at: datetime | None = None
    review_comment: str | None = Field(default=None, max_length=1000)
    active: bool = False
    created_by_user_id: PyObjectId | None = None
    updated_by_user_id: PyObjectId | None = None


class KnowledgeChunkMetadata(BaseModel):
    model_config = ConfigDict(extra="forbid")

    category: str | None = Field(default=None, max_length=100)
    language: str | None = Field(default=None, max_length=16)


class KnowledgeChunkDocument(SoftDeletableDocument):
    """Chunk metadata only — vector storage deferred to AI phase."""

    document_id: PyObjectId
    chunk_index: int = Field(ge=0)
    content: str = Field(min_length=1, max_length=20_000)
    metadata: KnowledgeChunkMetadata = Field(default_factory=KnowledgeChunkMetadata)
    embedding_provider: str | None = Field(default=None, max_length=64)
    embedding_model: str | None = Field(default=None, max_length=128)
    embedding_dimension: int | None = Field(default=None, ge=1)
    embedding_reference: str | None = Field(
        default=None,
        max_length=500,
        description="External vector store reference; large vectors are not stored here",
    )
    active: bool = False
