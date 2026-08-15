# Human Mode Hub — Card Copy Spec

Handoff for the developer of `jsb-humanmode.vercel.app`. This replaces the four cards on `/hub` (also served at `/starter-kit`, `/human-mode-hub`, `/human-mode-starter-kit`).

Prepared for Jeffrey Sanchez-Burks, August 2026.

**Summary of the change.** The four hub cards get new titles written as calls to action. Each concept name moves into the card eyebrow, where it still does its SEO and book-continuity work. Two cards gain a secondary CTA, one gains a micro-line, and a fifth concept (Bricolage) becomes a new card with a new route.

---

## 1. Copy (source of truth)

Set this text exactly. Typography rules below in §6.

**Section heading:** Start with the hard part

**Deck:** Four practices from the book. Free, no account. Start with whichever one matches the meeting you're dreading this week.

### Card 1

| Field | Value |
| --- | --- |
| Eyebrow | Assessment + playbook · 8 min · Emotional Aperture |
| Title | Read the Room |
| Body | You left that meeting sure it went well. Two people in it had already checked out. Eight minutes with the measure I built shows you which faces you skip. |
| Primary CTA | Take the assessment → |
| Primary href | `/` |
| Secondary CTA | *(none)* |
| Micro-line | The playbook comes with your score. |

### Card 2

| Field | Value |
| --- | --- |
| Eyebrow | Exercises + playbook · Bricolage |
| Title | Tap the Rest of You |
| Body | Everyone tells you to think outside the box. Work mode locked the boxes worth opening: a summer job you hated at sixteen, your grandmother's garden, a film you'd swear you forgot. |
| Primary CTA | Start the exercises → |
| Primary href | `/bricolage` |
| Secondary CTA | Get the playbook |
| Secondary href | `/playbooks/bricolage-playbook.pdf` |
| Micro-line | *(none)* |

### Card 3

| Field | Value |
| --- | --- |
| Eyebrow | Pulse Check + playbook · 2 min · Competent Humility |
| Title | Drop the Certainty Theater |
| Body | There's a meeting this week where you'll sound more certain than you are. Two minutes, eight statements, and the sentence most of us swallow: "I don't know yet. Let's work through this." |
| Primary CTA | Start the Pulse Check → |
| Primary href | `/competent-humility` |
| Secondary CTA | Get the playbook |
| Secondary href | `/comphum` |
| Micro-line | *(none)* |

### Card 4

| Field | Value |
| --- | --- |
| Eyebrow | Field guide · Quiet Understanding |
| Title | Skip the Pep Talk |
| Body | Someone tells you something hard and everything in you reaches for the bright side. Don't. Here's what to say in the sixty seconds after, for anger, for sadness, for dejection. |
| Primary CTA | Get the field guide → |
| Primary href | `/quiet` |
| Secondary CTA | Pocket card |
| Secondary href | `/playbooks/quiet-understanding-pocket.pdf` |
| Micro-line | *(none)* |

---

## 2. Data shape

The current array carries `{meta, title, body, href, cta}`. Three cards now need a second action and one needs a note, so the shape extends. Replace the existing hub card array with this.

```js
const HUB_CARDS = [
  {
    id: "read-the-room",
    meta: "Assessment + playbook · 8 min · Emotional Aperture",
    title: "Read the Room",
    body:
      "You left that meeting sure it went well. Two people in it had already checked out. Eight minutes with the measure I built shows you which faces you skip.",
    cta: { label: "Take the assessment →", href: "/" },
    secondary: null,
    note: "The playbook comes with your score.",
  },
  {
    id: "tap-the-rest-of-you",
    meta: "Exercises + playbook · Bricolage",
    title: "Tap the Rest of You",
    body:
      "Everyone tells you to think outside the box. Work mode locked the boxes worth opening: a summer job you hated at sixteen, your grandmother's garden, a film you'd swear you forgot.",
    cta: { label: "Start the exercises →", href: "/bricolage" },
    secondary: { label: "Get the playbook", href: "/playbooks/bricolage-playbook.pdf", download: true },
    note: null,
  },
  {
    id: "drop-the-certainty-theater",
    meta: "Pulse Check + playbook · 2 min · Competent Humility",
    title: "Drop the Certainty Theater",
    body:
      "There's a meeting this week where you'll sound more certain than you are. Two minutes, eight statements, and the sentence most of us swallow: “I don't know yet. Let's work through this.”",
    cta: { label: "Start the Pulse Check →", href: "/competent-humility" },
    secondary: { label: "Get the playbook", href: "/comphum" },
    note: null,
  },
  {
    id: "skip-the-pep-talk",
    meta: "Field guide · Quiet Understanding",
    title: "Skip the Pep Talk",
    body:
      "Someone tells you something hard and everything in you reaches for the bright side. Don't. Here's what to say in the sixty seconds after, for anger, for sadness, for dejection.",
    cta: { label: "Get the field guide →", href: "/quiet" },
    secondary: { label: "Pocket card", href: "/playbooks/quiet-understanding-pocket.pdf", download: true },
    note: null,
  },
];
```

Apostrophes and quotes in the strings above are typographic (U+2019, U+201C, U+201D). Card 3 uses escapes so the nested quotes survive a copy-paste; the rendered result must read with curly quotes.

---

## 3. Render

Mirrors the existing `mk-card` markup, with the secondary action as a text link rather than a second filled button so the grid stays quiet.

```jsx
{HUB_CARDS.map((card) => (
  <article className="mk-card" key={card.id}>
    <span className="mk-card-meta">{card.meta}</span>
    <h3>{card.title}</h3>
    <p>{card.body}</p>

    <div className="mk-card-actions">
      <a className="mk-btn mk-btn-navy" href={card.cta.href}>
        {card.cta.label}
      </a>

      {card.secondary && (
        <a
          className="mk-card-link"
          href={card.secondary.href}
          {...(card.secondary.download ? { download: true } : {})}
        >
          {card.secondary.label}
        </a>
      )}
    </div>

    {card.note && <p className="mk-card-note">{card.note}</p>}
  </article>
))}
```

The grid wrapper is unchanged: `mk-grid-3` with `gridTemplateColumns: repeat(auto-fit, minmax(200px, 1fr))`.

---

## 4. CSS additions

```css
.mk-card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.mk-card-link {
  font-size: 0.85rem;
  color: var(--slate);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.mk-card-link:hover {
  color: var(--navy);
}

.mk-card-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--muted);
}
```

At the 200px minimum column width the two actions must stack, never sit side by side. The column direction above handles it at every breakpoint.

---

## 5. Routes and assets to add

| Item | Path | Status |
| --- | --- | --- |
| Bricolage exercises page | `/bricolage` | New. Aliases to match existing conventions: `/tap-the-rest-of-you`, `/playbook-b` |
| Bricolage playbook PDF | `/playbooks/bricolage-playbook.pdf` | New |
| Bricolage pocket card | `/playbooks/bricolage-pocket.pdf` | Optional, matches the other guides |

Existing routes are unchanged. `/`, `/competent-humility`, `/comphum`, `/quiet` and all their aliases keep working.

---

## 6. Typography rules

These are house style and apply to every string in this document.

- Curly quotes and apostrophes throughout. No straight quotes anywhere.
- No em dashes. Commas, parentheses, or a new sentence instead.
- No emoji.
- The `→` in a CTA is a single character, not `->`.
- The `·` separator in eyebrows is a middle dot (U+00B7) with a space on each side.
- Card titles are title case. Eyebrows are sentence case except for proper concept names (Emotional Aperture, Bricolage, Competent Humility, Quiet Understanding, Pulse Check).
- "8 min" and "2 min", not "8 minutes" or "~8 min".

---

## 7. The two naming layers

Read this before Section 8, because it explains why Section 8 exists.

The site now carries two kinds of names, and both are correct.

**Commands** are the card titles: Read the Room, Tap the Rest of You, Drop the Certainty Theater, Skip the Pep Talk. They tell a visitor what to do. They belong on cards, on buttons, and in cross-links between pages.

**Concepts** are the ideas from the book: Emotional Aperture, Bricolage, Competent Humility, Quiet Understanding. They tell a visitor what the thing is. They belong on page headings, in file names, in download labels, and in eyebrows.

So a card says "Skip the Pep Talk," the download button beneath it says "Quiet Understanding guide," and the page it links to is headed Quiet Understanding. Nothing conflicts, because each layer has its own job.

Section 8 is a cleanup list. The old copy used the *old card titles* in places that now need to pick a layer.

---

## 8. Strings to replace

Every row is a string that currently names a card the old way. Replace all of them so a visitor never meets two names for one thing. All hrefs stay as they are.

### On `/hub`

| Where | Currently says | Replace with |
| --- | --- | --- |
| Promise line under the h1 | "Free tools to read the room, practice competent humility, and stay with someone when it gets hard — then go deeper in the book." | Four free practices: read the room, tap what you already carry, drop the certainty theater, and stay with someone when it gets hard. |
| Section h2 | "What's in the Hub" | Start with the hard part |
| Deck under the h2 | "Two assessments · two field guides. Pulse Check is the instrument; the Confident & Humble guide is the practice companion (not the same thing)." | Four practices from the book. Free, no account. Start with whichever one matches the meeting you're dreading this week. |
| `<meta name="description">` | "Free Human Mode Hub: Reading the Room, Competent Humility Pulse Check, Confident & Humble Leader's Playbook, Quiet Understanding — plus the book." | Four free practices from Human Mode: Read the Room, Tap the Rest of You, Drop the Certainty Theater, and Skip the Pep Talk. No account required. |
| Share title (`hubTitle`) | "Human Mode Hub — free tools" | Human Mode Hub · four free practices |
| Share text (`hubText`) | "Free Human Mode Hub: Reading the Room, Competent Humility Pulse Check, Confident & Humble Leader's Playbook, and Quiet Understanding." | Four free practices from Human Mode: Read the Room, Tap the Rest of You, Drop the Certainty Theater, Skip the Pep Talk. |
| "Trap helper" link | "Confident & Humble Playbook →" | Drop the Certainty Theater → |

The two entries above marked as containing an em dash are the reason those strings must change even if you like the wording. House style has no em dashes.

### Quick downloads row on `/hub`

These are file names, so they take the **concept** layer, not the command layer.

| Currently says | Replace with |
| --- | --- |
| "Confident & Humble PDF" | Competent Humility playbook |
| "Confident & Humble pocket" | Competent Humility pocket card |
| "Quiet Understanding PDF" | Quiet Understanding guide |
| "Quiet pocket card" | Quiet Understanding pocket card |

Add the two bricolage files to this row once they exist, labelled Bricolage playbook and Bricolage pocket card.

### Footer path row in the book CTA block

This row appears on every page. It currently reads:

> Reading the Room · Competent Humility Pulse Check · Confident & Humble Leader · Quiet Understanding · Human Mode Hub

These are navigation links, so they take the **command** layer. Replace with:

> Read the Room · Tap the Rest of You · Drop the Certainty Theater · Skip the Pep Talk · Human Mode Hub

Keep every existing href and add `/bricolage` for the new entry.

### Cross-links at the bottom of `/comphum`

The "Part of the Human Mode Hub" row offers "Pulse Check", "Quiet Understanding", "Reading the Room". Use the command layer here too: Drop the Certainty Theater, Skip the Pep Talk, Read the Room. Apply the same treatment to the matching row on `/quiet` and any other page carrying it.

---

## 9. Destination page headings

Separate from the renaming above, and a smaller change.

Each destination page keeps its concept name as the H1. `/quiet` still says Quiet Understanding. What changes is the eyebrow above it, which picks up the command that got the visitor there.

On `/quiet`, the eyebrow currently reads "Free field guide · Desk reference". It becomes:

> Skip the Pep Talk · Free field guide

So someone who clicks "Skip the Pep Talk" sees that phrase again on arrival, then meets the concept name underneath it. Same pattern on the other three pages.

---

## 10. QA checklist

- [ ] All four card bodies match §1 word for word.
- [ ] No straight quotes, no em dashes, no `->` anywhere in the new strings.
- [ ] Card 3's nested quotation renders with curly quotes.
- [ ] Card 1 shows one button plus the micro-line, not two buttons.
- [ ] Secondary actions render as text links, not filled buttons.
- [ ] Actions stack vertically at the narrowest column width.
- [ ] `/bricolage` resolves, and the playbook PDF downloads rather than opening in a viewer.
- [ ] Every string in the Section 8 tables has been updated.
- [ ] No page still shows an old card name (search the codebase for "Reading the Room", "Confident & Humble", "Pulse Check" used as a card title).
- [ ] Section 9 eyebrows added to all four destination pages.
- [ ] Card order is 1, 2, 3, 4 as listed, matching the book's part order.

---

## Appendix A. The `/bricolage` page

Card 2 is the only card pointing at a route that does not exist yet. Everything here is ready to build. The exercises themselves are still being written, and the two places that need them are marked TK.

### Hero

| Field | Value |
| --- | --- |
| Eyebrow | Tap the Rest of You · Exercises + playbook |
| H1 | Bricolage |
| Promise | A practice for the moment you have run out of the obvious answers. |
| Sub | Exercises for rummaging through what you already carry, plus a playbook for putting it to work, from Jeffrey Sanchez-Burks, author of *Human Mode*. |
| Primary CTA | Start the exercises → |
| Secondary CTA | Download the playbook (PDF) |

Match the layout of `/quiet`, which is the closest existing template: hero, "What's inside" list, an interactive element, share row, book CTA, footer.

### What's inside

TK. Four to six list items in the shape used on `/quiet`, where each item leads with a bolded label and follows with a short gloss. Copy to come.

### Interactive element

TK. `/quiet` carries a phrase helper with emotion tabs and `/comphum` carries a trap namer. The bricolage equivalent will be a prompt that surfaces one overlooked resource. Build the container, leave the content pluggable.

### Share strings

| Field | Value |
| --- | --- |
| Title | Bricolage · free exercises from Human Mode |
| Text | Free exercises for the problem you cannot solve with what is officially in your job description. Rummage through what you already carry. From Jeffrey Sanchez-Burks. |

---

*End of spec. Questions to Jeffrey at jeffrysb@umich.edu.*
