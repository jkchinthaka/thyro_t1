"""LLM provider abstraction — no tools, no chain-of-thought, no secrets."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol

from app.content.assistant_policy import (
    ASSISTANT_DISCLAIMER,
    INSUFFICIENT_EVIDENCE_MESSAGE,
    PROVIDER_UNAVAILABLE_MESSAGE,
    SYSTEM_POLICY_TEXT,
)
from app.services.grounding_validation_service import RetrievedChunk


@dataclass(frozen=True, slots=True)
class ProviderAnswer:
    text: str
    citation_ids: list[str]
    provider: str
    model_name: str
    available: bool


class LLMProvider(Protocol):
    def health_check(self) -> bool: ...

    def generate_grounded_answer(
        self,
        *,
        user_message: str,
        evidence: list[RetrievedChunk],
        max_output_tokens: int,
    ) -> ProviderAnswer: ...


class DisabledLLMProvider:
    def health_check(self) -> bool:
        return False

    def generate_grounded_answer(
        self,
        *,
        user_message: str,
        evidence: list[RetrievedChunk],
        max_output_tokens: int,
    ) -> ProviderAnswer:
        _ = (user_message, evidence, max_output_tokens, SYSTEM_POLICY_TEXT)
        return ProviderAnswer(
            text=PROVIDER_UNAVAILABLE_MESSAGE,
            citation_ids=[],
            provider="disabled",
            model_name="none",
            available=False,
        )


class FakeLLMProvider:
    """Deterministic test provider — cites first evidence chunk only."""

    def health_check(self) -> bool:
        return True

    def generate_grounded_answer(
        self,
        *,
        user_message: str,
        evidence: list[RetrievedChunk],
        max_output_tokens: int,
    ) -> ProviderAnswer:
        _ = (user_message, max_output_tokens)
        if not evidence:
            return ProviderAnswer(
                text=INSUFFICIENT_EVIDENCE_MESSAGE,
                citation_ids=[],
                provider="fake",
                model_name="fake-v1",
                available=True,
            )
        top = evidence[0]
        excerpt = top.text[: min(280, max_output_tokens * 4)]
        text = (
            f"Based on approved educational materials: {excerpt} "
            f"[{top.chunk_id}] {ASSISTANT_DISCLAIMER}"
        )
        return ProviderAnswer(
            text=text,
            citation_ids=[top.chunk_id],
            provider="fake",
            model_name="fake-v1",
            available=True,
        )


def get_llm_provider(provider_name: str, *, assistant_enabled: bool) -> LLMProvider:
    name = (provider_name or "disabled").strip().lower()
    if not assistant_enabled or name in {"", "disabled", "none"}:
        return DisabledLLMProvider()
    if name == "fake":
        return FakeLLMProvider()
    # Unknown production providers are not silently enabled
    return DisabledLLMProvider()
