# Human Mode Field Kit, Fix 01: the old playbook name on `/comphum`

Follow-up to `Human-Mode-Hub-Copy-Spec.md`. Everything else in that spec shipped correctly. This is the one QA-checklist item that did not land, plus the two PDF assets it depends on.

Prepared for the developer of `jsb-humanmode.vercel.app`. August 2026.

---

## The problem

The Copy Spec (§7) set two naming layers: **commands** on cards and buttons, **concepts** on page headings, file names, and download labels. The concept for this product is **Competent Humility**. The hub already uses it: the Quick downloads row says “Competent Humility playbook,” and the page’s own `<title>` already says “Drop the Certainty Theater · Competent Humility Playbook | Human Mode.”

But four surfaces still carry the pre-spec marketing name, so a visitor who clicks “Get the playbook” from the hub meets a *third* name for the same thing:

1. hub card secondary link says **Competent Humility playbook**
2. they land on `/comphum`, whose H1 says **The Confident and Humble Leader’s Playbook**
3. they download a PDF whose cover also says **The Confident and Humble Leader’s Playbook**

This escaped the original find-and-replace because the spec’s QA line said to search for “Confident & Humble,” and three of the four instances spell out “and.” Search for `confident` (case-insensitive) instead.

---

## Decision (change this once if you disagree, then it flows through the whole document)

The new name is **The Competent Humility Playbook**.

It is the concept layer per §7, it matches the Quick downloads label already on the hub, and it matches the `<title>` tag already on the page, so it is the lowest-churn option. If Jeffrey prefers the bare concept name (**Competent Humility**, exactly parallel to `/quiet`), swap that one string everywhere below. Nothing else changes.

---

## 1. Code changes

Four strings, all in the `/comphum` page component and the shared email-capture component. Curly apostrophes throughout, per house style.

| # | Where | Currently says | Replace with |
| --- | --- | --- | --- |
| 1 | `/comphum` hero `<h1>` | The Confident and Humble Leader’s Playbook | The Competent Humility Playbook |
| 2 | Email-capture consent line, `comphum` branch (the component that switches on `asset === "comphum"`) | Email me the Confident and Humble Leader’s Playbook and occasional notes on leadership from Human Mode. | Email me the Competent Humility Playbook and occasional notes on leadership from Human Mode. |
| 3 | `/comphum` Preview section, `.mk-preview-title` under the “Cover” block | Confident & Humble | Competent Humility |
| 4 | *(optional, house style)* `/comphum` `<meta name="description">` | Free Competent Humility playbook: five practices without certainty theater. Companion to the Pulse Check — not the assessment itself. | Free Competent Humility playbook: five practices without certainty theater. Companion to the Pulse Check, not the assessment itself. |

On row 3, the short form matches the parallel block on `/quiet`, where the Cover preview reads “Quiet Understanding” and not the full cover title. It also keeps the block from wrapping.

Row 4 is the same em-dash rule from Copy Spec §6. It is in the same file, so it is cheap to do while you are there.

The eyebrow, promise line, and standfirst on `/comphum` are already correct. Leave them.

---

## 2. Asset changes

Both PDFs are regenerated from source, so this is a source-document edit plus a re-export, not a byte patch. Keep both file names exactly as they are (`competent-humility-playbook.pdf`, `competent-humility-pocket.pdf`); the hub, the QR codes, and the email flow all point at them.

### `/playbooks/competent-humility-playbook.pdf`

| Where | Currently says | Replace with |
| --- | --- | --- |
| Cover title (page 1) | The Confident and Humble Leader’s Playbook | The Competent Humility Playbook |
| Cover pull quote (page 1) | …The research-backed alternative to certainty performance — a free companion to the Competent Humility Pulse Check. | …The research-backed alternative to certainty performance. A free companion to the Competent Humility Pulse Check. |
| PDF document title (`/Title` in the metadata, shown in the browser tab and in Preview) | The Confident and Humble Leader’s Playbook \| Human Mode | The Competent Humility Playbook \| Human Mode |

Pages 2 through 4 are clean. They already say “Competent Humility” throughout. One optional tidy while you are in there: the section heading on page 2 reads “Competent humility (what it is)” in lower case. It is a coined concept name, so it should be “Competent Humility (what it is).”

### `/playbooks/competent-humility-pocket.pdf`

| Where | Currently says | Replace with |
| --- | --- | --- |
| Header line (top navy band) | The Confident and Humble Leader’s Playbook | The Competent Humility Playbook |
| PDF document title (`/Title` in the metadata) | Competent Humility — Pocket Card | Competent Humility · Pocket Card |

The subhead (“Pocket card · Five practices · Companion to the Competent Humility Pulse Check”) is already correct.

---

## 3. Do NOT change

- **The `/confident-humble` route alias.** Copy Spec §8 says all hrefs stay as they are. It is a live URL that may be in print or in slides. Keep it resolving to `/comphum`.
- **Either PDF file name.** Renaming breaks the hub links, the QR code, and any link already in the wild.
- **Ordinary uses of the word “confident.”** There are four in the codebase that are plain English, not the product name, and they must survive the replace:
  - “…before anyone reaches for a confident yes or no.” (Pulse Check result copy)
  - “Question vs sideways language (and why confident diagnosis fails)” (`/quiet`)
  - “Here’s where I’m confident — [domain]…” (appears twice: trap script and practice card)

Do a targeted replace on the four exact strings in §1, not a blanket replace on `confident`.

---

## 4. Verification

- [ ] `grep -rin "confident and humble\|confident & humble" src/` returns nothing.
- [ ] `grep -rin "confident" src/` returns only the four plain-English uses listed in §3, plus the `/confident-humble` route alias.
- [ ] `/comphum` renders the H1 “The Competent Humility Playbook.”
- [ ] The email-capture consent line on `/comphum` names the same thing.
- [ ] The Preview “Cover” block reads “Competent Humility.”
- [ ] `/confident-humble` still returns 200 and renders `/comphum`.
- [ ] Both PDFs re-download from the hub Quick downloads row, and the cover of each matches its label in that row.
- [ ] Both PDFs show the new document title in the browser tab when opened (that is the `/Title` metadata, not the file name).
- [ ] Walk the full path once: hub card 3 → “Get the playbook” → `/comphum` → “Download free PDF.” One name the whole way.

---

*Questions to Jeffrey at jeffrysb@umich.edu.*
