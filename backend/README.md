# ThyroCare AI API (Backend)

FastAPI foundation for ThyroCare AI — Phase 4 infrastructure only.

> **Medical disclaimer:** This API is part of a patient-support research prototype. It does **not** replace professional medical advice, diagnosis, or emergency care.

## Current Phase 4 scope

Included:

- FastAPI application factory and lifespan
- `/api/v1` versioning
- Configuration via environment variables (Pydantic Settings)
- Health endpoints
- MongoDB connection foundation (Motor) — no domain collections
- Structured logging, CORS, security headers, request ID, timing
- Exception handlers with safe JSON errors
- In-memory rate-limit foundation (disabled by default)
- OpenAPI docs (`/docs`, `/redoc`)
- Pytest suite and Ruff
- Dockerfile foundation

**Not included yet:**

- User registration / login / JWT
- Patient profiles, medications, appointments, symptoms
- Chatbot / RAG / AI
- Domain MongoDB collections or indexes
- Admin features
- Frontend ↔ backend wiring

## Prerequisites

- Python **3.11+** (recommended). This workspace validated on Python 3.14 with cp314 wheels; Docker image uses Python 3.12.
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

## macOS / Linux setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
cp .env.example .env
```

## Start development server

From the `backend/` directory (so `app` is importable):

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Entry point: module-level `app` from `create_application()`.

## Health endpoints

| Method | Path             | Purpose                           |
| ------ | ---------------- | --------------------------------- |
| GET    | `/health`        | Lightweight probe (no Mongo ping) |
| GET    | `/api/v1/health` | Detailed health + database status |

Non-production: missing MongoDB → **degraded** with HTTP 200.  
Production: missing MongoDB → **unhealthy** with HTTP 503.

## OpenAPI

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Schema: http://localhost:8000/openapi.json

Disable in production with `OPENAPI_ENABLED=false`.

## Tests

```powershell
pytest
# or
pytest tests -v
```

Tests mock MongoDB — no real database required.

## Lint / format (Ruff)

```powershell
ruff check app tests
ruff format --check app tests
ruff format app tests
```

## Docker

```powershell
docker build -t thyrocare-api .
docker run --rm -p 8000:8000 -e APP_ENVIRONMENT=development thyrocare-api
```

Do not bake `.env` or `.venv` into the image.

## MongoDB behavior

- Motor async client initialized on startup.
- URI is never logged or returned in API responses.
- `ensure_indexes()` is a Phase 4 no-op placeholder (domain indexes belong to Phase 5).
- Development may run without MongoDB (degraded health).

## Rate limiting

Controlled by `RATE_LIMIT_ENABLED` (default `false`). Uses SlowAPI **in-memory** limits only. Distributed/Redis rate limiting is deferred.

## Known limitations

- No authentication
- No domain APIs
- In-memory rate limiting is not production-grade
- Frontend is not connected

## Deferred features

Registration, JWT auth, profiles, clinical modules, AI/RAG, Docker Compose, and domain schemas start in later phases — not Phase 4.
