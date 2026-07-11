# Backend production deployment checklist

Provider-neutral. **Do not deploy the FastAPI backend without valid provider credentials and a chosen host.**

Current static frontend origin (must be allowlisted exactly when the API is live):

`https://thyrot1.chinthakajayaweera1.workers.dev`

## Required configuration

| Item                          | Requirement                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Public HTTPS backend URL      | e.g. `https://api.example.com` with TLS                                                           |
| MongoDB URI                   | Production Atlas/URI via secret manager — never commit                                            |
| `JWT_SECRET_KEY`              | Long random secret — never commit                                                                 |
| `APP_ENVIRONMENT`             | `production`                                                                                      |
| `DEBUG`                       | `false`                                                                                           |
| `DATABASE_REQUIRE_CONNECTION` | `true`                                                                                            |
| `COOKIE_SECURE`               | `true`                                                                                            |
| `ALLOWED_ORIGINS`             | Exact frontend origin(s), comma-separated — **no wildcard** with credentials                      |
| CORS credentials              | Enabled (`allow_credentials=true`)                                                                |
| OpenAPI                       | Prefer `OPENAPI_ENABLED=false` in production unless intentionally public                          |
| Health check                  | `GET /health` and/or `GET /api/v1/health`                                                         |
| Start command                 | `uvicorn app.main:app --host 0.0.0.0 --port $PORT`                                                |
| Dockerfile                    | Optional; `backend/Dockerfile` exists as a foundation                                             |
| Secrets                       | Platform secret store / env — never in Git                                                        |
| Logging                       | Structured logs; no passwords, tokens, dosage text, or PHI in log bodies                          |
| Indexes                       | Run controlled init/migrations in prod; prefer `DATABASE_AUTO_INITIALIZE=false` after first setup |
| Migrations                    | Documented, idempotent; gate with `DATABASE_RUN_MIGRATIONS`                                       |
| Backups                       | MongoDB provider backups + restore drill                                                          |

## CORS note

The live Workers frontend origin above must appear **exactly** in `ALLOWED_ORIGINS`. Mismatched schemes/hosts break browser credentialed requests.

## Cookie note

See `docs/production-auth-cookie-and-cors.md` for SameSite / Secure combinations when frontend and API are cross-site.

## Current status

FastAPI is **not** deployed as part of the Cloudflare static Worker. Treat backend as undeployed until a host is provisioned and health checks pass.
