# ThyroCare AI

**ThyroCare AI – Development of an AI-Powered Personalized Healthcare Assistant for Post-Thyroidectomy Thyroid Cancer Survivorship.**

Educational patient-support prototype for differentiated thyroid cancer survivors after thyroidectomy and radioactive iodine (RAI) treatment.

> **Medical safety:** This system provides informational support only. It does **not** diagnose disease, prescribe medication, change dosages, interpret laboratory results as a clinician, or make emergency treatment decisions. Always consult a qualified healthcare professional. In an emergency, contact local emergency services immediately.

---

## Current status

- **Phase 0:** Complete (baseline + backups + build verified)
- **Phase 1:** Complete (modular pages/components; UI preserved)
- **Phase 2:** Complete (React Router, protected layouts, lazy pages)
- **Phase 3+:** Not started

Mock data remains under `src/data/mock/` and is **not** live clinical data.

**Authentication is mock-only** for routing demos. Real JWT auth is deferred to Phase 6.

Baseline audit: [`docs/baseline-audit.md`](docs/baseline-audit.md)  
Phase 1 validation: [`docs/phase-1-validation.md`](docs/phase-1-validation.md)  
Phase 2 architecture: [`docs/phase-2-routing-architecture.md`](docs/phase-2-routing-architecture.md)  
Phase 2 validation: [`docs/phase-2-validation.md`](docs/phase-2-validation.md)  
Progress log: [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md)

---

## Tech stack (frontend baseline)

| Layer | Technology |
|-------|------------|
| UI | React 18.3 |
| Language | TypeScript |
| Bundler | Vite 6 |
| Routing | react-router 7 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Icons | lucide-react |

---

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

Production build:

```bash
npm run build
```

---

## Frontend routes

### Public

| URL | Screen |
|-----|--------|
| `/` | Landing |
| `/login` | Login |
| `/register` | Register |
| `/emergency` | Emergency |

### Patient (mock-auth protected)

| URL | Screen |
|-----|--------|
| `/dashboard` | Dashboard |
| `/chat` | AI Chat |
| `/medications` | Medication |
| `/diet` | Diet |
| `/symptoms` | Symptoms |
| `/follow-ups` | Follow-up |
| `/analytics` | Progress / Analytics |
| `/resources` | Resources |
| `/profile` | Profile |

### System

| URL | Screen |
|-----|--------|
| `/unauthorized` | Unauthorized |
| unknown paths | Not Found |

Sign in / register uses **temporary mock authentication** (sessionStorage flag). It is not secure and must be replaced in Phase 6.

Vite local development supports SPA fallback automatically. Production hosts will need rewrite-to-`index.html` configuration during deployment.

---

## Project structure (after Phase 2)

```
src/
  app/App.tsx              # Providers + RouterProvider shell
  app/providers.tsx        # Mock AuthProvider
  app/router.tsx           # createBrowserRouter route table
  pages/                   # Lazy-loaded route pages
  layouts/                 # Public, Auth, Dashboard (Outlet)
  context/AuthContext.tsx  # Temporary mock auth
  components/common/       # Guards, ScrollToTop, UI atoms
  data/mock/               # Explicit demo datasets (*.mock.ts)
  constants/routes.ts      # Central path constants
```

---

## Roadmap (high level)

1. Modular frontend + routing ← **done through Phase 2**
2. Quality / accessibility foundation
3. FastAPI + MongoDB backend
4. Auth, profiles, clinical support modules
5. Governed medical knowledge + safe RAG chatbot
6. Admin / medical expert workflows
7. Tests, security, Docker, deployment docs

See `PROJECT_PROGRESS.md` for phase tracking.

---

## License / attributions

See `ATTRIBUTIONS.md` (shadcn/ui MIT; Unsplash imagery).
