# ThyroCare AI API (Backend)

FastAPI + PyMongo Async persistence foundation for ThyroCare AI (Phases 4–5).

> **Medical disclaimer:** This API is part of a patient-support research prototype. It does **not** replace professional medical advice, diagnosis, or emergency care.

## Current scope (through Phase 5)

Included:

- FastAPI application factory and lifespan
- `/api/v1` versioning and health endpoints
- Configuration via environment variables (Pydantic Settings)
- **PyMongo `AsyncMongoClient`** (Motor removed)
- Domain persistence models + public schemas
- Base and domain repositories (no public CRUD routes)
- Named indexes, TTL indexes, migration registry
- Structured logging, CORS, security headers, request ID, timing
- Exception handlers with safe JSON errors
- Pytest suite and Ruff
- Dockerfile foundation

**Not included yet:**

- User registration / login / JWT / password hashing workflows
- Public profile, medication, appointment, symptom, or chat endpoints
- Chatbot / RAG / AI
- Frontend ↔ backend wiring
- Seed users or demo credentials

## Prerequisites

- Python **3.11+** (validated on 3.14 locally; Docker uses 3.12)
- `pip`
- Optional: MongoDB on `localhost:27017` (app starts degraded without it in non-production)

## Windows setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
copy .env.example .env
```

## Start development server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Health endpoints

| Method | Path             | Purpose                           |
| ------ | ---------------- | --------------------------------- |
| GET    | `/health`        | Lightweight probe                 |
| GET    | `/api/v1/health` | Detailed health + database status |

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

- No authentication or domain HTTP APIs
- In-memory rate limiting only
- Integration index creation requires Mongo authorization
