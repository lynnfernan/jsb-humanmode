# jsb-humanmode

**Canonical web apps for Jeffrey Sanchez-Burks / Human Mode assessments.**

| Product | Path | Status |
|---------|------|--------|
| **Emotional Aperture Measure™** (Reading the Room) | `/` | **Canonical instrument** (July 15, 2026 final) |
| **Competent Humility Pulse Check** | `/competent-humility` | Separate path on same site |

**Production:** https://jsb-humanmode.vercel.app  

**Read first:** [SOURCE_OF_TRUTH.md](./SOURCE_OF_TRUTH.md) — which repo to deploy, EAM rules, incident log.

---

## Quick start

```bash
cd /Users/lynnfernan/jsb-humanmode
npm install
npm run dev
# http://localhost:5173/                 → EAM
# http://localhost:5173/competent-humility → Pulse Check
```

## Deploy

```bash
npm run build
npx vercel deploy --prod --yes --scope lynnfernans-projects
```

Only deploy this repository to the Vercel project **`jsb-humanmode`**.

## Docs

- `SOURCE_OF_TRUTH.md` — canonical paths, EAM lock rules, deploy checklist  
- `IMPLEMENTATION.md` — Qualtrics-aligned EAM build  
- `STATUS_AND_DEPLOY.md` — feature status  
- `NOTES.md` — UX decisions (no countdown on stimuli)  
- `TASKS.md` — backlog  

## EAM instrument (do not change without JSB)

- Two JPG frames per trial: **1750 ms** neutral + **1750 ms** emotional  
- No countdown on the image  
- Radio buttons 0–100% for Positive and Negative **independently** (may not sum to 100%)  

See `src/components/SceneDisplay.jsx` and `src/components/QuestionSliders.jsx`.

## Pulse Check

Mounted at `/competent-humility` via `src/main.jsx` → `src/humility/HumilityApp.jsx`.  
Does not modify EAM flow or assets.
