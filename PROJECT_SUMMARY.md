# Human Mode Assessments — Project Summary

**Date:** 2026-07-28  
**Audience:** Lynn Fernando / JSB / internal handoff  
**Production:** https://jsb-humanmode.vercel.app  

---

## Why this document exists

In late July 2026, the production domain briefly served a **wrong fork** of Emotional Aperture (GIF movies, long exposure, countdown, linked sliders). We restored the **July 15 / Qualtrics-aligned EAM**, put **Pulse Check on a separate path**, documented source of truth, and applied a small round of **report copy** feedback.  

**Next phase:** validate both instruments with real users.

---

## What is live (and correct)

| Product | URL | Instrument |
|---------|-----|------------|
| **Emotional Aperture Measure™** (*Reading the Room*) | https://jsb-humanmode.vercel.app/ | Canonical EAM |
| **Competent Humility Pulse Check** | https://jsb-humanmode.vercel.app/competent-humility | Separate path; does not alter EAM |

**Aliases for Pulse Check:** `/humility`, `/pulse-check`

**Canonical code:** `/Users/lynnfernan/jsb-humanmode` · GitHub `lynnfernan/jsb-humanmode` · Vercel project `jsb-humanmode`

**Do not deploy:** `Lynn Priorities/REV Global/website/client/humanmode` (GIF/slider prototype) over this domain. See `SOURCE_OF_TRUTH.md` and that folder’s `DO_NOT_DEPLOY_EAM.md`.

---

## What changed (overall)

### 1. Emotional Aperture — restored as the scientific web instrument

**Restored behavior (July 15 final / JSB-aligned):**

| Spec | Detail |
|------|--------|
| Stimuli | Still **JPG frames**, not GIFs |
| Timing | **1750 ms** neutral + **1750 ms** emotional |
| On image | **No** countdown badge; **no** “watch the group react” overlay |
| Response UI | **Radio grid** (Qualtrics-style): Positive & Negative **independent** |
| Scale | 0% / 25% / 50% / 75% / 100% with plain-language labels |
| Sum to 100%? | **Not required** (neutrals allowed — note on screen) |
| Scoring | Original EAM binary scoring (`src/utils/scoring.js`) |
| Report | Detailed email via `api/send-report.js` (Resend) |

**Incident (important):** Production was temporarily aliased to a monorepo fork with ~7.5s GIF exposure, countdown, and linked sliders that auto-filled the other emotion %. That was **not** the validated instrument. Restored **2026-07-27**.

### 2. Competent Humility Pulse Check — separate path

- Mounted at **`/competent-humility`** on the **same** production app so it never overwrites EAM.
- Live flow: Likert items → scored profile / buckets → optional email → soft book CTA (“Human Mode — Reserve Your Copy”).
- **Note for product backlog:** JSB supplied a **revised** Pulse Check (8 items, single scale, no balance read) in `Competent Humility Pulse Check - Revised.docx` + `competent-humility-items.js`. That revision should be applied as a deliberate v2; do not mix it into EAM.

### 3. EAM email report & on-screen feedback — copy updates (2026-07-28)

Only these copy edits (nothing else):

1. **High-score insight (Wide-Angle Reader):**  
   Replaced the “who’s energized / neutrals hardest” line with overall vibe / distribution wording (cohesive vs different reactions).

2. **On-screen Focus Area (balanced / no strong bias path):**  
   Now points people to (a) the detailed report and (b) **developing others’** room-reading ability, citing MIT / Carnegie Mellon collective intelligence framing.

3. **Email “Your 30-Second Summary → Your practice” (all scores):**  
   Kept the ten-second scan; added **fostering the habit on the team** so reading the room is a shared skill, not only a personal one.

**Score-band note:**  
- Insight edit #1 applies to **top-tier** profiles only.  
- Focus Area edit #2 applies when there is **no** strong optimism/vigilant bias on the results screen.  
- Practice edit #3 applies to **all** emailed reports.

### 4. Documentation locked in

| File | Role |
|------|------|
| **`SOURCE_OF_TRUTH.md`** | Canonical repo, domain, EAM rules, incident log, deploy checklist |
| **`PROJECT_SUMMARY.md`** | This summary (shareable / email) |
| **`README.md`** | Quick start + routes |
| **`STATUS_AND_DEPLOY.md`** | Version history (incl. 1.3.0 restore) |
| **`IMPLEMENTATION.md` / `NOTES.md`** | Qualtrics build & UX decisions |

---

## What is important going forward

1. **EAM fidelity** — Timing, still frames, independent radios, and “need not sum to 100%” are **instrument design**, not cosmetic UX. Do not “smooth” them without JSB.

2. **One deploy path** — Only ship from `~/jsb-humanmode` to Vercel project `jsb-humanmode`. Never re-alias production to `jsb-pulse-check` or the website monorepo client.

3. **Two products, clear roles**  
   - EAM = research-aligned skill assessment + detailed development report  
   - Pulse Check = shorter Human Mode / Part III discovery + book soft CTA  

4. **Reports work** — Detailed EAM email delivery is confirmed working (Resend). Re-test after any `api/send-report.js` or env change.

5. **Book messaging** — Soft CTA / reserve language points at jeffreysanchezburks.com; full book pub framing is **2027 / HarperCollins** in current copy.

---

## Next steps — real-user validation

**Goal:** Confirm the restored EAM (and Pulse Check path) behave as intended with people who did not build them.

### Suggested validation plan

| Step | Action | Owner |
|------|--------|--------|
| 1 | **Smoke** EAM + Pulse Check on production (desktop + mobile) | Lynn |
| 2 | **Pilot cohort** (n = 10–25): friends, Ross contacts, past EAM takers | Lynn + JSB |
| 3 | **Protocol check** with JSB: 1750/1750, radios, independent pos/neg still match research intent | JSB |
| 4 | **Capture feedback** on: clarity of instructions, perceived speed of frames, report usefulness, Focus Area / practice copy | Lynn |
| 5 | **Metrics (light):** completions, report email requests, drop-off after practice, Pulse Check CTR from EAM results | Lynn |
| 6 | **Decide Pulse Check v2** (8-item single-scale JSB revision) after EAM pilot is stable | Lynn + JSB |
| 7 | **CRM / list** (if not already): tag `assessment_eam` / `assessment_humility` + book_interest for launch funnel | Lynn |

### Success criteria for “validated enough to scale”

- [ ] ≥10 complete EAM runs with no critical bugs (image load, scoring, email)  
- [ ] JSB sign-off: web EAM still matches the instrument he intends to stand behind  
- [ ] At least a few qualitative notes on report tone (high vs lower scores)  
- [ ] Pulse Check path does not interfere with EAM completion  

---

## Quick links

- EAM: https://jsb-humanmode.vercel.app/  
- Pulse Check: https://jsb-humanmode.vercel.app/competent-humility  
- Source of truth: `SOURCE_OF_TRUTH.md`  
- Repo: https://github.com/lynnfernan/jsb-humanmode  

---

*Jeffrey Sanchez-Burks · Human Mode, Always™ · REV Global / Lynn Fernando*
