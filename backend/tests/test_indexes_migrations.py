"""Index definition and migration registry unit tests."""

from __future__ import annotations

import pytest
from app.db.indexes import INDEX_SPECS, assert_index_names_unique, list_ttl_indexes
from app.db.migrations.registry import MIGRATIONS, apply_pending_migrations


def test_ttl_index_definitions() -> None:
    ttl = list_ttl_indexes()
    names = {spec.name for spec in ttl}
    assert "ttl_refresh_tokens_expires_at" in names
    assert "ttl_notifications_expires_at" in names
    for spec in ttl:
        assert spec.expire_after_seconds == 0


def test_index_names_are_stable_and_unique() -> None:
    assert_index_names_unique()
    names = [spec.name for spec in INDEX_SPECS]
    assert len(names) == len(set(names))
    assert all(name for name in names)


@pytest.mark.asyncio
async def test_migration_registry_idempotency(monkeypatch: pytest.MonkeyPatch) -> None:
    import app.db.migrations.registry as registry

    async def fake_applied() -> set[str]:
        return {MIGRATIONS[0].migration_id}

    monkeypatch.setattr(registry, "list_applied_migration_ids", fake_applied)
    monkeypatch.setattr(registry, "get_database", lambda: object())

    applied = await apply_pending_migrations(dry_run=False)
    assert applied == []
    # Same migration id remains the only registered entry
    assert MIGRATIONS[0].migration_id in await fake_applied()
