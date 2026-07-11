# ThyroCare AI API (Backend)

FastAPI + PyMongo Async persistence, authentication, patient profile, medication tracking, appointments, and symptoms for ThyroCare AI (Phases 4–10).

> **Medical disclaimer:** This API is part of a patient-support research prototype. It does **not** replace professional medical advice, diagnosis, or emergency care. Medication, appointment, and symptom endpoints are for **tracking/organization and safety awareness only**. Symptom safety classification uses structured answers and versioned rules only — never free-text inference. The patient profile is support metadata, not a medical record.

## Current scope (through Phase 10)

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
- **Medications:** CRUD, dose logs, schedule, adherence (PATIENT ownership, soft delete, version conflicts)
- **Appointments:** CRUD, status, calendar, upcoming (PATIENT ownership, soft delete, version conflicts)
- **Symptoms:** CRUD, active list, status, structured safety-check (PATIENT ownership, soft delete, version conflicts, deterministic rules)
- Structured logging, CORS (credentials + exact origins), security headers
- Pytest suite and Ruff
- Dockerfile foundation

**Not included yet:**

- Password-reset email, email verification, MFA, social login
- Chatbot / RAG / AI
- Medication/appointment SMS/email reminders
- Admin profile / medication / appointment / symptom management
- Seed users or demo / default admin credentials
- Clinically approved safety copy (engineering REVIEW_REQUIRED until medical sign-off)

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

## Medication endpoints

| Method | Path                            | Notes                                       |
| ------ | ------------------------------- | ------------------------------------------- |
| GET    | `/api/v1/medications`           | List owned; optional `status`, pagination   |
| POST   | `/api/v1/medications`           | Create owned medication                     |
| GET    | `/api/v1/medications/schedule`  | Computed schedule (`date_from`, `date_to`)  |
| GET    | `/api/v1/medications/adherence` | Tracking adherence metrics                  |
| GET    | `/api/v1/medications/{id}`      | Get owned; foreign → 404                    |
| PATCH  | `/api/v1/medications/{id}`      | Update; `expected_version`; 409 on conflict |
| DELETE | `/api/v1/medications/{id}`      | Soft delete                                 |
| POST   | `/api/v1/medications/{id}/logs` | Log taken/missed/skipped                    |
| GET    | `/api/v1/medications/{id}/logs` | List logs for owned medication              |

All medication routes require an active PATIENT. Ownership is derived from the JWT. Soft delete and unique occurrence logs apply. See `docs/medication-architecture.md`.

## Appointment endpoints

| Method | Path                               | Notes                              |
| ------ | ---------------------------------- | ---------------------------------- |
| GET    | `/api/v1/appointments`             | List owned; filters + pagination   |
| POST   | `/api/v1/appointments`             | Create                             |
| GET    | `/api/v1/appointments/calendar`    | Bounded calendar range             |
| GET    | `/api/v1/appointments/upcoming`    | Next upcoming (excludes cancelled) |
| GET    | `/api/v1/appointments/{id}`        | Get owned; foreign → 404           |
| PATCH  | `/api/v1/appointments/{id}`        | Update; `expected_version`         |
| PATCH  | `/api/v1/appointments/{id}/status` | Status transition                  |
| DELETE | `/api/v1/appointments/{id}`        | Soft delete                        |

Organization/tracking only — reminders are not sent. See `docs/appointment-architecture.md`.

### Symptoms (Phase 10)

| Method | Path                            | Notes                              |
| ------ | ------------------------------- | ---------------------------------- |
| GET    | `/api/v1/symptoms`              | List owned; filters + pagination   |
| POST   | `/api/v1/symptoms`              | Create + structured safety_answers |
| POST   | `/api/v1/symptoms/safety-check` | Assessment only; no persistence    |
| GET    | `/api/v1/symptoms/active`       | Active + improving                 |
| GET    | `/api/v1/symptoms/{id}`         | Get owned; foreign → 404           |
| PATCH  | `/api/v1/symptoms/{id}`         | Update; `expected_version`         |
| PATCH  | `/api/v1/symptoms/{id}/status`  | Status transition                  |
| DELETE | `/api/v1/symptoms/{id}`         | Soft delete                        |

Tracking + safety awareness only — no diagnosis; free text never used for safety. See `docs/symptom-architecture.md`.

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
- Symptom CRUD is not implemented
- Medication/appointment reminders / pharmacy / prescription upload are not implemented
- In-memory rate limiting only (not multi-instance safe)
- Integration index creation requires Mongo authorization
