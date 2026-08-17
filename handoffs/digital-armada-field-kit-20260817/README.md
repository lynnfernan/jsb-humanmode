# Human Mode Field Kit — Digital Armada Handoff

**Product name:** The Human Mode, Always™ Field Kit  
**Current host (working production):** https://jsb-humanmode.vercel.app  
**Package date:** 2026-08-17  
**Prepared for:** Digital Armada (integration + hosting)  
**Owner / contact:** Lynn Fernando (JSB partner / operator)

---

## 1. What you are receiving

This package is everything Digital Armada needs to **host, link, and integrate** the free Field Kit lead magnets:

| Folder | Contents |
|--------|----------|
| `01-pdfs/` | Canonical downloadable PDFs (full guides + pocket cards) |
| `02-qr-codes/` | QR PNGs pointed at current production URLs |
| `03-copy-and-naming/` | Naming rules (command vs concept layers) + CompHum rename fix |
| `04-integration/` | Link map (CSV + JSON), hosting options, open questions |

**Also live as interactive web apps** (not static files): assessments and exercise UIs on Vercel. Those can stay where they are, move to Armada hosting, or sit behind Armada’s domain via reverse proxy / DNS. See §5.

---

## 2. Product map (four practices)

Two naming layers — both correct:

- **Commands** (cards, CTAs, nav): what the visitor should *do*
- **Concepts** (page H1s, PDF titles, download labels): what the *thing is* from the book

| # | Command (card title) | Concept | Type | Canonical path |
|---|----------------------|---------|------|----------------|
| 1 | **Read the Room** | Emotional Aperture Measure™ | Assessment (~8 min) + score | `/` |
| 2 | **Tap the Rest of You** | Bricolage | Interactive exercises + playbook PDF | `/bricolage` |
| 3 | **Drop the Certainty Theater** | Competent Humility | Pulse Check (~2 min) + playbook PDF | `/competent-humility` · `/comphum` |
| 4 | **Skip the Pep Talk** | Quiet Understanding | Field guide + pocket PDF | `/quiet` |

**Hub / Field Kit home:** `/hub` (aliases: `/field-kit`, `/starter-kit`, …)

**Book CTA (Amazon):**  
https://www.amazon.com/Human-Mode-Unlock-Unique-Transform/dp/0063467542/ref=tmm_hrd_swatch_0

---

## 3. Live production URLs (as of package date)

Base: `https://jsb-humanmode.vercel.app`

### Field Kit shell
| Surface | URL |
|---------|-----|
| Field Kit home | https://jsb-humanmode.vercel.app/hub |
| Field Kit alias | https://jsb-humanmode.vercel.app/field-kit |

### Practice 1 — Read the Room
| Surface | URL |
|---------|-----|
| Assessment (EAM) | https://jsb-humanmode.vercel.app/ |
| Validation / research pilot (not marketing) | https://jsb-humanmode.vercel.app/eam-validation |

### Practice 2 — Tap the Rest of You
| Surface | URL |
|---------|-----|
| Exercises landing | https://jsb-humanmode.vercel.app/bricolage |
| Playbook PDF | https://jsb-humanmode.vercel.app/playbooks/bricolage-playbook.pdf |
| Pocket PDF | https://jsb-humanmode.vercel.app/playbooks/bricolage-pocket.pdf |

### Practice 3 — Drop the Certainty Theater
| Surface | URL |
|---------|-----|
| Pulse Check instrument | https://jsb-humanmode.vercel.app/competent-humility |
| Playbook landing | https://jsb-humanmode.vercel.app/comphum |
| Playbook PDF | https://jsb-humanmode.vercel.app/playbooks/competent-humility-playbook.pdf |
| Pocket PDF | https://jsb-humanmode.vercel.app/playbooks/competent-humility-pocket.pdf |

### Practice 4 — Skip the Pep Talk
| Surface | URL |
|---------|-----|
| Guide landing | https://jsb-humanmode.vercel.app/quiet |
| Full PDF | https://jsb-humanmode.vercel.app/playbooks/quiet-understanding.pdf |
| Pocket PDF | https://jsb-humanmode.vercel.app/playbooks/quiet-understanding-pocket.pdf |

Full machine-readable map: `04-integration/link-map.csv` and `link-map.json`.

---

## 4. Static files in this package

### PDFs (`01-pdfs/`)

| File | Use as |
|------|--------|
| `quiet-understanding.pdf` | Quiet Understanding full field guide |
| `quiet-understanding-pocket.pdf` | Quiet 1-page pocket |
| `competent-humility-playbook.pdf` | **The Competent Humility Playbook** (full) |
| `competent-humility-pocket.pdf` | CompHum pocket |
| `bricolage-playbook.pdf` | Bricolage full playbook |
| `bricolage-pocket.pdf` | Bricolage pocket |

**Do not rename PDFs** without updating all hub links, QR targets, and email flows.

### QR codes (`02-qr-codes/`)

Regenerated against **current Vercel URLs**. If Armada hosts on a new domain, **regenerate QRs** to the final production URLs.

| File | Points to (current) |
|------|---------------------|
| `qr-field-kit.png` | `/hub` |
| `qr-quiet-understanding.png` | Quiet landing |
| `qr-quiet-pdf.png` | Quiet full PDF |
| `qr-comphum.png` | CompHum playbook landing |
| `qr-comphum-pdf.png` | CompHum PDF |
| `qr-bricolage.png` | Bricolage landing |
| `qr-bricolage-pdf.png` | Bricolage PDF |

---

## 5. Hosting options for Digital Armada

### Option A — Keep interactive apps on Vercel; Armada hosts marketing + PDFs
**Best if:** Armada owns the public site/domain; you want zero rebuild risk on assessments.

- Armada serves: Field Kit page, PDF downloads, QR on domain of choice  
- Deep-link assessments to existing Vercel paths (or reverse-proxy)  
- PDFs can be uploaded to Armada CDN/WordPress/media library from `01-pdfs/`

### Option B — Armada hosts everything under one domain
**Best if:** Single brand domain required (e.g. `humanmode.com/field-kit`).

- Deploy SPA (Vite/React) + static `playbooks/*` + SPA fallback to `index.html`  
- **Critical:** static files under `/playbooks/*.pdf` must **not** be rewritten to `index.html` (we hit this bug once on Vercel)  
- Env: any Resend keys for “email me the PDF” if that feature is kept  

### Option C — Hybrid
- Assessments stay on Vercel  
- Field Kit hub + PDFs on Armada CMS  
- Hub card CTAs = absolute URLs to whichever host owns each asset  

**Recommendation for first handoff:** **Option A or C** — deliver PDFs + link map now; plan domain cutover after Armada’s architecture is set.

---

## 6. Integration checklist for Armada

- [ ] Confirm final production domain(s)  
- [ ] Upload all 6 PDFs; verify `Content-Type: application/pdf` and direct download/open  
- [ ] Build or port Field Kit hub page with four cards (see copy specs)  
- [ ] Wire card CTAs to live assessments + PDF URLs  
- [ ] Regenerated QRs to final URLs (if domain changes)  
- [ ] Keep **command vs concept** naming (see §2 and `03-copy-and-naming/`)  
- [ ] CompHum product name is **The Competent Humility Playbook** (not “Confident and Humble”)  
- [ ] Amazon book CTA on hub + post-assessment surfaces  
- [ ] Optional: email-capture for PDF (currently Resend API on Vercel — document if reimplemented)  
- [ ] Do **not** treat `/eam-validation` as a marketing lead magnet (research / Prolific)  
- [ ] Analytics: suggest UTM on external shares (`utm_source`, `utm_medium`, `utm_campaign=field_kit`)  
- [ ] 301 plan for old aliases if paths change (`/starter-kit` → Field Kit, etc.)

---

## 7. Interactive app inventory (source repo)

Repo: `jsb-humanmode` (GitHub) · Deploy: Vercel  

| App | Path | Stack notes |
|-----|------|-------------|
| Field Kit hub | `/hub` | React marketing page |
| EAM / Read the Room | `/` | React assessment + results + optional email report |
| Pulse Check | `/competent-humility` | 8-item React instrument |
| CompHum playbook | `/comphum` | Marketing + trap helper + PDF CTA |
| Quiet Understanding | `/quiet` | Marketing + phrase helper + PDF CTA |
| Bricolage | `/bricolage` | Exercises + forage timer + PDF CTA |
| EAM validation | `/eam-validation` | Research only; Prolific confirmation code |

Source PDF masters (HTML print sources) live under repo `playbooks/*-print.html` if Armada needs to regenerate PDFs later.

---

## 8. Out of scope / do not package as consumer lead magnets

- `/eam-validation` — research pilot (Prolific), not Field Kit marketing  
- Internal docs, Exec Ed decks, sponsorship decks  
- Legacy filenames: `becoming-a-bricoleur*.pdf` (superseded by `bricolage-*.pdf`)

---

## 9. Open questions for Armada kickoff

1. Final domain + path prefix (`/field-kit` vs root)?  
2. Host assessments on Armada stack or keep Vercel?  
3. Need CRM / email capture on PDF download (Mailchimp, HubSpot, etc.)?  
4. Brand system: Human Mode navy (`#1C4B61`) / cream vs Ross/Michigan for campus only?  
5. Who owns redirects from `jsb-humanmode.vercel.app` after cutover?

---

## 10. How to send this package

1. Zip the folder `digital-armada-field-kit-20260817`  
2. Share via Drive / Dropbox / Armada preferred intake  
3. Attach or link this `README.md` as the cover brief  
4. Optional: invite to GitHub repo for interactive app source  

**Zip command (from repo root):**

```bash
cd handoffs && zip -r digital-armada-field-kit-20260817.zip digital-armada-field-kit-20260817
```

---

*Human Mode, Always. · Field Kit handoff · 2026-08-17*
