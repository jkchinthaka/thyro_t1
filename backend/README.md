# ThyroCare AI API (Backend)

FastAPI + PyMongo Async persistence, authentication, and patient self-profile for ThyroCare AI (Phases 4–7).

> **Medical disclaimer:** This API is part of a patient-support research prototype. It does **not** replace professional medical advice, diagnosis, or emergency care. The patient profile is support metadata, not a medical record.

## Current scope (through Phase 7)

Included:

- FastAPI application factory and lifespan
- `/api/v1` versioning and health endpoints
- Configuration via environment variables (Pydantic Settings)
- **PyMongo `AsyncMongoClient`** (Motor removed)
- Domain persistence models + public schemas
- Base and domain repositories
- Named indexes, TTL indexes, migration registry
- **Authentication:** register, login, refresh, logout, `/auth/me`
- Argon2 password hashing (`pwdlib`), JWT access tokens (PyJWT), opaque refresh cookies
- CSRF protection for refresh/logout, account lockout, RBAC dependencies, audit events
- **Patient profile:** `GET` / `PATCH /api/v1/profiles/me` (PATIENT ownership, optimistic concurrency)
- Structured logging, CORS (credentials + exact origins), security headers
- Pytest suite and Ruff
- Dockerfile foundation

**Not included yet:**

- Password-reset email, email verification, MFA, social login
- Medication, appointment, symptom, or chat CRUD endpoints
- Chatbot / RAG / AI
- Admin profile management
- Seed users or demo / default admin credentials

## Prerequisites

- Python **3.11+** (validated on 3.14 locally; Docker uses 3.12)
- `pip`
- MongoDB on `localhost:27017` recommended for full auth flows (app can start degraded without it in non-production)

## Windows setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
copy .env.example .env
```

Generate a local JWT secret (do not commit it):

```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Set `JWT_SECRET_KEY` in `backend/.env`. Development may use a long local secret; production must use a strong unique secret and `COOKIE_SECURE=true`.

## Start development server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Health endpoints

| Method | Path             | Purpose                           |
| ------ | ---------------- | --------------------------------- |
| GET    | `/health`        | Lightweight probe                 |
| GET    | `/api/v1/health` | Detailed health + database status |

## Authentication endpoints

| Method | Path                    | Notes                                     |
| ------ | ----------------------- | ----------------------------------------- |
| POST   | `/api/v1/auth/register` | Creates PATIENT only; sets refresh + CSRF |
| POST   | `/api/v1/auth/login`    | Generic failure messages; sets cookies    |
| POST   | `/api/v1/auth/refresh`  | Cookie + `X-CSRF-Token`; rotates refresh  |
| POST   | `/api/v1/auth/logout`   | CSRF when cookie present; clears cookies  |
| GET    | `/api/v1/auth/me`       | Bearer access token                       |

## Patient profile endpoints

| Method | Path                  | Notes                                                        |
| ------ | --------------------- | ------------------------------------------------------------ |
| GET    | `/api/v1/profiles/me` | PATIENT only; returns profile + account                      |
| PATCH  | `/api/v1/profiles/me` | Partial update; requires `expected_version`; 409 on conflict |

Profile is support metadata only — not a medical record and not diagnostic.

Local cookies: `COOKIE_SECURE=false`, `COOKIE_SAMESITE=lax`, refresh path `/api/v1/auth`. Frontend origin must be listed in `ALLOWED_ORIGINS` (default `http://localhost:5173`) with credentials enabled.

## Database notes

- Driver: `pymongo.AsyncMongoClient`
- Indexes: `DATABASE_AUTO_INITIALIZE` (dev default true)
- Migrations: `DATABASE_RUN_MIGRATIONS` (dev default true; initial migration = indexes only)
- Test DB names must end with `_test`
- See `docs/motor-to-pymongo-async-migration.md` and `docs/database-design.md`

## Tests

```powershell
pytest                         # unit suite (no Mongo required)
pytest -m integration          # optional; requires authorized local/test Mongo
ruff check app tests
ruff format --check app tests
```

## Known limitations

- Email verification and password reset are not implemented
- Medication / appointment / symptom CRUD are not implemented
- In-memory rate limiting only (not multi-instance safe)
- Integration index creation requires Mongo authorization
