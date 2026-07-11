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
- **Phase 4+:** Not started

Mock data remains under `src/data/mock/` and is **not** live clinical data.

**Authentication is mock-only** for routing demos. Real JWT auth is deferred to Phase 6.

**API client is mock-ready only** (`src/services/api.ts`) — no real backend is connected.

Accessibility improvements move toward WCAG 2.1 AA practices; formal certification has not been performed. See [`docs/accessibility-improvements.md`](docs/accessibility-improvements.md).

Docs: [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md) · [`docs/phase-3-quality-foundation.md`](docs/phase-3-quality-foundation.md) · [`docs/phase-3-validation.md`](docs/phase-3-validation.md)

---

## Tech stack (frontend baseline)

| Layer    | Technology              |
| -------- | ----------------------- |
| UI       | React 18.3              |
| Language | TypeScript (strict)     |
| Bundler  | Vite 6                  |
| Routing  | react-router 7          |
| Forms    | react-hook-form + Zod   |
| HTTP     | Axios (foundation only) |
| Toasts   | sonner                  |
| Styling  | Tailwind CSS 4          |
| Charts   | Recharts                |
| Icons    | lucide-react            |

---

## Local setup

```bash
npm install
cp .env.example .env   # optional local overrides
npm run dev
```

Open `http://localhost:5173/`.

### Developer scripts

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

## Project structure (after Phase 3)

```
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
2. Quality / accessibility foundation ← **done (Phase 3)**
3. FastAPI + MongoDB backend
4. Auth, profiles, clinical support modules
5. Governed medical knowledge + safe RAG chatbot
6. Admin / medical expert workflows
7. Tests, security, Docker, deployment docs

See `PROJECT_PROGRESS.md` for phase tracking.

---

## License / attributions

See `ATTRIBUTIONS.md` (shadcn/ui MIT; Unsplash imagery).
