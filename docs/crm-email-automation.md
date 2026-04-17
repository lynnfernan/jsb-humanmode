# CRM + Email Automation Blueprint

> **Stack:** Kit (ConvertKit) preferred | ActiveCampaign as alternative
> **Orchestration:** Make (Integromat) or Zapier
> **Philosophy:** Every touchpoint is intentional, personalized, and moves the subscriber toward the next meaningful action.

---

## CRM Architecture

### Segment Structure

```
SUBSCRIBERS
├── By Engagement Stage
│   ├── new-subscriber (0–7 days, no opens yet)
│   ├── engaged (opened 2+ emails in last 30 days)
│   ├── warm (clicked 1+ links in last 30 days)
│   └── cold (no open in 60+ days → re-engagement sequence)
│
├── By Persona (from quiz)
│   ├── persona-leader
│   ├── persona-creator
│   ├── persona-builder
│   └── persona-connector
│
├── By Interest
│   ├── book-interested (clicked book CTA)
│   ├── speaker-prospect (visited /speaking or submitted inquiry)
│   ├── advisory-prospect (submitted advisory application)
│   └── substack-reader (came via Substack)
│
└── By Lifecycle
    ├── pre-launch-list (subscribed before book launch)
    ├── launch-week (subscribed during launch window)
    ├── buyer (confirmed book purchase)
    └── vip (manually tagged: media, partners, close network)
```

### Custom Fields

| Field Name | Type | Source |
|-----------|------|--------|
| `human_mode_score` | Number (0–100) | Quiz |
| `persona_type` | Text | Quiz |
| `primary_challenge` | Text | Quiz Q7 |
| `industry` | Text | Optional form field |
| `source` | Text | UTM / form hidden field |
| `book_format_preference` | Text | Survey / email click |
| `last_engaged_date` | Date | CRM auto-track |

---

## Email Sequence Library

### Sequence 1: Welcome + Human Mode Onboarding
**Trigger:** Quiz completed OR any opt-in form submitted
**Duration:** 10 days | 5 emails
**Goal:** Deliver value, establish voice, deepen connection, tease the book

---

**Email 1 — Immediate: "Your Human Mode Score is inside"**

```
Subject: Your Human Mode Score: [Score] — here's what it means
Preview: You scored [X] in [top dimension]. Let's unpack that.

[First name],

Your score is in.

You're a [Persona Type] — and that tells me a lot about how you lead,
create, and connect in a world that keeps demanding you act more like a machine.

[Link to personalized results page]

Over the next few days, I'm going to share exactly what your score means
for your career, your relationships, and your ability to stay relevant
in a world running on AI.

Nothing generic. Just what actually matters for someone like you.

— JSB

P.S. Hit reply and tell me one word that describes how you feel about
the way technology is changing your work. I read every response.
```

---

**Email 2 — Day 2: "The one thing AI will never take from you"**

```
Subject: The one thing AI will never take from you
Preview: I've thought about this a lot. Here's my honest answer.

[First name],

I've been in rooms with some of the most capable leaders I've ever met —
people who've built companies, led thousands, and navigated every kind
of disruption.

And every single one of them has asked me some version of the same question:

"Am I still relevant?"

Here's the honest answer: AI will take tasks. It will not take judgment.
It will optimize processes. It will not build trust. It will generate content.
It will not carry presence.

The thing that makes you irreplaceable is the thing that took you decades to build.
And most people have no idea how to name it, protect it, or amplify it.

That's what Human Mode is about.

More tomorrow.

— JSB
```

---

**Email 3 — Day 4: Personalized by Persona Tag**

*Version A — Leaders:*
```
Subject: How [Persona: Leader] types stay irreplaceable
Preview: It's not about working harder. It's about this.
```

*Version B — Creators:*
```
Subject: Why [Persona: Creator] types have a massive advantage right now
Preview: The machines can't do this. You can.
```

*(Each version speaks directly to the persona's core tension and strength)*

---

**Email 4 — Day 7: Story Email**

```
Subject: The meeting that changed how I lead
Preview: I almost made the wrong call. Here's what stopped me.

[First name],

I want to tell you about a meeting I was in three years ago.

[2–3 paragraph story — JSB's personal experience where human judgment
overrode data/AI/conventional wisdom and led to a breakthrough]

The lesson wasn't about being contrarian. It was about knowing when
the most sophisticated tool in the room is the one sitting in your chair.

That's what I've been building toward with this book.

More on that soon.

— JSB
```

---

**Email 5 — Day 10: The Tease**

```
Subject: I've been working on something for you
Preview: It's almost ready. Here's a first look.

[First name],

Over the past few months I've been writing the most important thing
I've ever put my name on.

It's called Human Mode.

[2 sentences on what the book is]

I'm not ready to share everything yet — but I want you to be the first
to know when I do.

Can I count on you?

[Button: Yes, I want early access]

— JSB
```

---

### Sequence 2: Book Pre-Launch (6-Week Build)
**Trigger:** Tag `book-launch-active` (applied Week 5 of overall campaign)
**Duration:** 42 days | 14 emails
**Goal:** Build anticipation, drive pre-orders, activate referrals

**Campaign Arc:**

| Week | Theme | Emails | Goal |
|------|-------|--------|------|
| Week 1 | "The Why" | 2 | Establish stakes — why this book, why now |
| Week 2 | "The Framework" | 2 | Preview the methodology — one key insight per email |
| Week 3 | "The Evidence" | 2 | Social proof — early readers, endorsers, case stories |
| Week 4 | "The Community" | 2 | Invite to launch team / referral program |
| Week 5 | "The Countdown" | 4 | Urgency build — 7 days, 3 days, 1 day, launch day |
| Week 6 | "Post-Launch" | 2 | Thank you + drive reviews + next chapter |

---

### Sequence 3: Launch Week (7 Days)
**Trigger:** Book launch date (date-based trigger)
**Duration:** 7 days | 7 emails
**Goal:** Maximize launch week velocity, drive reviews, sustain momentum

| Day | Subject | CTA |
|-----|---------|-----|
| Day 1 (Launch) | "It's here. Human Mode is live." | Buy now |
| Day 2 | "What readers are already saying" | Buy + share |
| Day 3 | "The chapter that surprised everyone" | Read excerpt + buy |
| Day 4 | "A quick favor (takes 30 seconds)" | Leave a review |
| Day 5 | "The story behind Chapter [X]" | Deepen engagement |
| Day 6 | "48 hours left at launch price" | Urgency CTA |
| Day 7 | "Last day — and a thank you" | Final push + referral |

---

### Sequence 4: Post-Purchase Nurture
**Trigger:** Tag `buyer` applied
**Duration:** 30 days | 6 emails
**Goal:** Deepen relationship, drive reviews, surface next offer

| Email | Timing | Goal |
|-------|--------|------|
| E1 | Immediate | Celebrate, set reading expectation |
| E2 | Day 3 | "Start here" — Chapter 1 key insight + discussion prompt |
| E3 | Day 7 | Request Amazon/Goodreads review |
| E4 | Day 14 | Invite to community or Substack |
| E5 | Day 21 | Surface advisory/mastermind opportunity |
| E6 | Day 30 | "How's it going?" — conversation-starter email |

---

### Sequence 5: Re-Engagement (Cold Subscribers)
**Trigger:** No email open in 60 days
**Duration:** 9 days | 3 emails
**Goal:** Re-engage or cleanly remove from list

| Email | Subject | Action if No Engage |
|-------|---------|-------------------|
| E1 | "Are you still there?" | Wait 3 days |
| E2 | "One last thing before I go" | Wait 3 days |
| E3 | "I'll leave the door open" | Unsubscribe + move to suppression list |

---

## Automation Flow Diagrams

### Primary Onboarding Flow

```
[Quiz Submitted]
       │
       ▼
[Make/Zapier Webhook]
       │
       ├──► [CRM: Create/Update Contact]
       │           │
       │           ├──► [Set custom fields: score, persona, source]
       │           └──► [Apply tags: persona-X, source-quiz]
       │
       ├──► [Enroll in Sequence 1: Welcome]
       │
       └──► [Google Sheets: Log new subscriber]
```

### Book Interest Trigger Flow

```
[Subscriber clicks book link in email]
       │
       ▼
[CRM behavior trigger]
       │
       ├──► [Apply tag: book-interested]
       │
       └──► [If NOT already in pre-launch sequence]
                   │
                   └──► [Enroll in Sequence 2: Pre-Launch]
```

### Speaking Inquiry Flow

```
[Speaking inquiry form submitted]
       │
       ▼
[Make/Zapier trigger]
       │
       ├──► [CRM: Create contact, tag speaker-prospect]
       │
       ├──► [Send JSB notification email]
       │       Subject: "New speaking inquiry: [Name] — [Company]"
       │
       ├──► [Send auto-reply to inquirer]
       │       "Thanks for reaching out — JSB's team will be in touch within 24 hours"
       │
       └──► [Add to CRM pipeline: Speaking Prospects]
```

### Purchase Confirmation Flow

```
[Purchase confirmed (payment processor webhook)]
       │
       ▼
[Make/Zapier]
       │
       ├──► [CRM: Apply tag buyer, remove book-interested]
       │
       ├──► [Enroll in Sequence 4: Post-Purchase]
       │
       └──► [Google Sheets: Log purchase + source UTM]
```

---

## Deliverability Protocol

**Domain Authentication:**
- SPF record configured
- DKIM signing enabled
- DMARC policy: `p=quarantine` (escalate to `p=reject` after 30 days)
- Custom sending domain: `mail.jsb.com` or `hello.humanmode.com`

**List Hygiene:**
- Weekly: Remove hard bounces
- Monthly: Move 60-day non-openers to re-engagement sequence
- Quarterly: Purge suppression list of non-engagers older than 90 days

**Warm-Up Schedule (if new sending domain):**
- Week 1: Max 200 emails/day (VIP segment only)
- Week 2: Max 500 emails/day
- Week 3: Max 1,000 emails/day
- Week 4+: Full send volume

**Subject Line Principles:**
- Under 50 characters preferred
- No spam trigger words (Free, Guaranteed, Act Now, Limited time)
- Use first name personalization in first 3 sequences
- A/B test subject lines on 20% of list before full send
