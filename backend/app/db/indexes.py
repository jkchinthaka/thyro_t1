"""Index management placeholder.

Phase 4 intentionally does not create domain collections or indexes.
Collection design and indexes belong to Phase 5.
"""

from app.core.logging import get_logger

logger = get_logger(__name__)


async def ensure_indexes() -> None:
    """No-op foundation hook for future domain indexes."""
    logger.info("ensure_indexes(): skipped in Phase 4 (no domain collections)")
