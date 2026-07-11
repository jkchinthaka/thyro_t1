"""Citation and grounding validation."""

from __future__ import annotations

from dataclasses import dataclass

from app.content.assistant_policy import INSUFFICIENT_EVIDENCE_MESSAGE
from app.models.enums import ChatResponseMode, KnowledgeStatus


@dataclass(frozen=True, slots=True)
class RetrievedChunk:
    chunk_id: str
    document_id: str
    title: str
    source_name: str
    source_url: str | None
    document_version: str
    text: str
    language: str
    topic: str
    review_status: KnowledgeStatus
    score: float


@dataclass(frozen=True, slots=True)
class GroundingResult:
    ok: bool
    mode: ChatResponseMode | None
    message: str | None
    citations: list[dict[str, str | None]]


class GroundingValidationService:
    def validate(
        self,
        *,
        answer_text: str,
        citation_ids: list[str],
        retrieved: list[RetrievedChunk],
        require_citation: bool = True,
    ) -> GroundingResult:
        by_id = {c.chunk_id: c for c in retrieved}
        citations: list[dict[str, str | None]] = []
        for cid in citation_ids:
            chunk = by_id.get(cid)
            if chunk is None:
                return GroundingResult(
                    ok=False,
                    mode=ChatResponseMode.INSUFFICIENT_EVIDENCE,
                    message=INSUFFICIENT_EVIDENCE_MESSAGE,
                    citations=[],
                )
            if chunk.review_status != KnowledgeStatus.APPROVED:
                return GroundingResult(
                    ok=False,
                    mode=ChatResponseMode.INSUFFICIENT_EVIDENCE,
                    message=INSUFFICIENT_EVIDENCE_MESSAGE,
                    citations=[],
                )
            citations.append(
                {
                    "citation_id": chunk.chunk_id,
                    "document_id": chunk.document_id,
                    "title": chunk.title,
                    "source_name": chunk.source_name,
                    "source_url": chunk.source_url,
                    "document_version": chunk.document_version,
                    "excerpt": chunk.text[:400],
                }
            )

        if require_citation and not citations:
            # Factual answers without citations are not allowed
            if answer_text.strip():
                return GroundingResult(
                    ok=False,
                    mode=ChatResponseMode.INSUFFICIENT_EVIDENCE,
                    message=INSUFFICIENT_EVIDENCE_MESSAGE,
                    citations=[],
                )
        return GroundingResult(ok=True, mode=None, message=None, citations=citations)
