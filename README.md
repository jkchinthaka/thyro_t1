# ThyroCare AI

**ThyroCare AI – Development of an AI-Powered Personalized Healthcare Assistant for Post-Thyroidectomy Thyroid Cancer Survivorship.**

Educational patient-support prototype for differentiated thyroid cancer survivors after thyroidectomy and radioactive iodine (RAI) treatment.

> **Medical safety:** This system provides informational support only. It does **not** diagnose disease, prescribe medication, change dosages, interpret laboratory results as a clinician, or make emergency treatment decisions. Always consult a qualified healthcare professional. In an emergency, contact local emergency services immediately.

---

## Current status (Phase 0)

- Frontend prototype runs locally (React + TypeScript + Vite + Tailwind CSS).
- 13 patient-facing screens present (Landing → Emergency).
- Mock data is clearly separated under `src/data/mock/`.
- No backend, no real authentication, no live AI yet.
- Baseline audit: [`docs/baseline-audit.md`](docs/baseline-audit.md)
- Progress log: [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md)

---

## Tech stack (frontend baseline)

| Layer | Technology |
|-------|------------|
| UI | React 18.3 |
| Language | TypeScript |
| Bundler | Vite 6 |
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

## Existing screens

Landing · Login · Register · Dashboard · AI Chat · Medication · Diet · Symptoms · Follow-up · Progress · Resources · Profile · Emergency

---

## Project structure (current)

```
src/
  app/App.tsx          # Screen implementations (to be split in Phase 1)
  components/common/   # Shared UI primitives
  layouts/             # Sidebar, TopBar, DashboardLayout
  data/mock/           # Explicit mock datasets
  constants/ types/ styles/
```

---

## Roadmap (high level)

1. Modular frontend + routing  
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
