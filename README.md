# ThyroCare AI

**ThyroCare AI – Development of an AI-Powered Personalized Healthcare Assistant for Post-Thyroidectomy Thyroid Cancer Survivorship.**

Educational patient-support prototype for differentiated thyroid cancer survivors after thyroidectomy and radioactive iodine (RAI) treatment.

> **Medical safety:** This system provides informational support only. It does **not** diagnose disease, prescribe medication, change dosages, interpret laboratory results as a clinician, or make emergency treatment decisions. Always consult a qualified healthcare professional. In an emergency, contact local emergency services immediately.

---

## Current status

- **Phase 0:** Complete (baseline + backups + build verified)
- **Phase 1:** Complete (modular pages/components; UI preserved)
- **Phase 2:** Complete (React Router, protected layouts, lazy pages)
- **Phase 3:** Complete (TypeScript strictness, ESLint/Prettier, env, Axios foundation, forms, a11y)
- **Phase 4:** Complete (FastAPI backend foundation — health/infra only)
- **Phase 5:** Complete (PyMongo Async models, repositories, indexes — no public CRUD)
- **Phase 6+:** Not started

Mock data remains under `src/data/mock/` and is **not** live clinical data.

**Authentication is mock-only** for routing demos. Real JWT auth is deferred to Phase 6.

**API client is mock-ready only** (`src/services/api.ts`) — frontend forms are **not** wired to the backend yet.

Accessibility improvements move toward WCAG 2.1 AA practices; formal certification has not been performed. See [`docs/accessibility-improvements.md`](docs/accessibility-improvements.md).

Docs: [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md) · [`docs/phase-5-database-foundation.md`](docs/phase-5-database-foundation.md) · [`docs/phase-5-validation.md`](docs/phase-5-validation.md)

---

## Tech stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| UI       | React 18.3                          |
| Language | TypeScript (strict)                 |
| Bundler  | Vite 6                              |
| Routing  | react-router 7                      |
| Forms    | react-hook-form + Zod               |
| HTTP     | Axios (foundation only)             |
| Toasts   | sonner                              |
| Styling  | Tailwind CSS 4                      |
| Charts   | Recharts                            |
| Icons    | lucide-react                        |
| Backend  | FastAPI + Uvicorn (Phase 4)         |
| Database | MongoDB via PyMongo AsyncMongoClient |

---

## Local setup

### Frontend

```bash
npm install
cp .env.example .env   # optional local overrides
npm run dev
```

Open `http://localhost:5173/`.

### Backend (Phase 4)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Health: `http://localhost:8000/health`
- Detailed health: `http://localhost:8000/api/v1/health`
- OpenAPI: `http://localhost:8000/docs`

See [`backend/README.md`](backend/README.md).

**Phase 4–5 limitations:** no user registration, login, JWT, password hashing, or public domain CRUD endpoints. Persistence models/repositories exist for later phases.

### Developer scripts (frontend)

```bash
npm run dev            # Vite dev server
npm run build          # Production build
npm run preview        # Preview production build
npm run typecheck      # TypeScript project build check
npm run lint           # ESLint
npm run format         # Prettier write
npm run format:check   # Prettier check
```

Environment variables (browser-safe `VITE_*` only) are documented in `.env.example` and read via `src/config/env.ts`.

---

## Frontend routes

### Public

| URL          | Screen    |
| ------------ | --------- |
| `/`          | Landing   |
| `/login`     | Login     |
| `/register`  | Register  |
| `/emergency` | Emergency |

### Patient (mock-auth protected)

| URL            | Screen               |
| -------------- | -------------------- |
| `/dashboard`   | Dashboard            |
| `/chat`        | AI Chat              |
| `/medications` | Medication           |
| `/diet`        | Diet                 |
| `/symptoms`    | Symptoms             |
| `/follow-ups`  | Follow-up            |
| `/analytics`   | Progress / Analytics |
| `/resources`   | Resources            |
| `/profile`     | Profile              |

### System

| URL             | Screen       |
| --------------- | ------------ |
| `/unauthorized` | Unauthorized |
| unknown paths   | Not Found    |

Sign in / register uses **temporary mock authentication** (sessionStorage flag). It is not secure and must be replaced in Phase 6.

---

## Project structure

```
backend/                   # FastAPI Phase 4 foundation
src/
  app/App.tsx              # Providers + RouterProvider shell
  app/providers.tsx        # ErrorBoundary, Auth, Toast
  app/router.tsx           # createBrowserRouter route table
  config/env.ts            # Typed Vite env
  services/api.ts          # Axios client foundation (no real calls)
  schemas/                 # Zod validation schemas
  hooks/                   # useDocumentTitle, useToast
  pages/                   # Lazy-loaded route pages
  layouts/                 # Public, Auth, Dashboard (+ mobile drawer)
  context/AuthContext.tsx  # Temporary mock auth
  components/common/       # Guards, states, ErrorBoundary, UI atoms
  data/mock/               # Explicit demo datasets (*.mock.ts)
```

---

## Roadmap (high level)

1. Modular frontend + routing ← done (Phases 1–2)
2. Quality / accessibility foundation ← done (Phase 3)
3. FastAPI backend foundation ← done (Phase 4)
4. MongoDB models & repositories ← **done (Phase 5)**
5. Auth, profiles, clinical support modules (Phase 6 — not started)
6. Governed medical knowledge + safe RAG chatbot
7. Admin / medical expert workflows
8. Tests, security, Docker Compose, deployment docs

See `PROJECT_PROGRESS.md` for phase tracking.

---

## License / attributions

See `ATTRIBUTIONS.md` (shadcn/ui MIT; Unsplash imagery).
