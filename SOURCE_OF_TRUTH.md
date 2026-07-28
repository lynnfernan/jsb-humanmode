# SOURCE OF TRUTH — JSB Human Mode Assessments

**Last updated:** 2026-07-27  
**Owner:** Lynn Fernando / REV Global  
**Assessment creator:** Jeffrey Sanchez-Burks  

---

## Canonical repository (READ THIS FIRST)

| Item | Value |
|------|--------|
| **Local path** | `/Users/lynnfernan/jsb-humanmode` |
| **GitHub** | `https://github.com/lynnfernan/jsb-humanmode` |
| **Vercel project** | `lynnfernans-projects/jsb-humanmode` |
| **Production domain** | `https://jsb-humanmode.vercel.app` |

### DO NOT deploy over this domain

| Path / project | Status |
|----------------|--------|
| `Lynn Priorities/REV Global/website/client/humanmode` | **WRONG FORK** — GIF movies, 7.5s exposure, countdown, linked sliders. Prototype only. |
| Vercel project `jsb-pulse-check` | Temporary Pulse-only host (Jul 26–27). Prefer paths on main domain below. |

---

## Live routes (same SPA)

| URL | Product | Spec |
|-----|---------|------|
| **`https://jsb-humanmode.vercel.app/`** | **Emotional Aperture Measure™ (EAM)** — *Reading the Room* | **CANONICAL** (July 15, 2026 production) |
| **`https://jsb-humanmode.vercel.app/competent-humility`** | Competent Humility Pulse Check | Separate path; does not alter EAM |
| `/humility` · `/pulse-check` | Aliases → Pulse Check | Same as above |

SPA rewrites: `vercel.json` sends all paths to `index.html`. Routing is in `src/main.jsx`.

---

## EAM instrument rules (locked — do not “improve” without JSB)

Documented in `IMPLEMENTATION.md`, `NOTES.md`, `STATUS_AND_DEPLOY.md`.

| Rule | Spec |
|------|------|
| Stimulus | **Still images**, two frames (not GIFs) |
| Frame 1 | Neutral baseline — **1750 ms** |
| Frame 2 | Emotional state — **1750 ms** |
| Countdown on image | **None** (removed; distracts from observation) |
| Instruction on image | **None** (no “watch the group react” on the frame) |
| Response UI | **Radio grid** (not sliders): Positive & Negative **independent** |
| Scale | 0% / 25% / 50% / 75% / 100% with Qualtrics labels |
| Sum to 100%? | **No** — neutrals allowed; note shown on question screen |
| Scoring | Original EAM binary scoring in `src/utils/scoring.js` (July 10+) |
| Report | Email via `api/send-report.js` |
| Key commit (JSB feedback) | `f75c2bd` (2026-07-09) |
| Key production deploy | 2026-07-15 `7cf1468` → Vercel Ready deploy |

If you need the pre-overwrite production snapshot:  
`https://jsb-humanmode-me2iwmkro-lynnfernans-projects.vercel.app`  
(created Wed Jul 15 2026 ~09:03 PT).

---

## Pulse Check (separate product, same domain)

| Rule | Spec |
|------|------|
| Path | `/competent-humility` |
| Source modules | `src/humility/HumilityApp.jsx`, `src/data/humilityItems.js`, `src/utils/humilityScoring.js`, `src/humility.css` |
| JSB revision file | `website/client/humanmode/competent-humility-items.js` + `Competent Humility Pulse Check - Revised.docx` (8-item single-scale) — **apply when shipping v2** |
| Must not change | EAM frame timing, radio grid, or image assets |

---

## Incident log (why this doc exists)

| When | What went wrong |
|------|------------------|
| 2026-07-26–27 | Pulse Check was deployed from `website/client/humanmode` (GIF + slider fork) and **`jsb-humanmode.vercel.app` was re-aliased** to that project. |
| Result | Domain served wrong EAM: long GIF (~5s emotional), countdown, linked sliders. |
| 2026-07-27 | Restored canonical EAM from this repo; Pulse Check mounted at `/competent-humility` only. |

**Rule going forward:** Deploy **only** from `/Users/lynnfernan/jsb-humanmode` (or its GitHub main) to the `jsb-humanmode` Vercel project. Never alias the production domain to `jsb-pulse-check` or the website monorepo client folder.

---

## Deploy checklist

```bash
cd /Users/lynnfernan/jsb-humanmode
npm install
npm run build
npx vercel link --yes --project jsb-humanmode --scope lynnfernans-projects
npx vercel deploy --prod --yes
# Confirm alias:
# https://jsb-humanmode.vercel.app/          → EAM
# https://jsb-humanmode.vercel.app/competent-humility → Pulse Check
```

### Smoke tests after every deploy

1. `/` — still images, ~1.75s + ~1.75s, **no** countdown badge, radio grid, pos/neg independent.  
2. `/competent-humility` — Pulse Check loads; does not replace `/`.  
3. EAM results link to Pulse Check works.  
4. Email report still posts to `/api/send-report` (env keys on Vercel).

---

## Related files

| File | Purpose |
|------|---------|
| `IMPLEMENTATION.md` | Phase 1 Qualtrics-aligned build detail |
| `STATUS_AND_DEPLOY.md` | Feature status, commit history |
| `NOTES.md` | UX decisions (no counter on frames) |
| `TASKS.md` | Phase 2 report work |
| `SOURCE_OF_TRUTH.md` | **This file — which repo/domain/instrument is correct** |

---

## Contact

Lynn · lynn@revglobalinc.com · REV Global  
Jeffrey Sanchez-Burks · Human Mode, Always™
