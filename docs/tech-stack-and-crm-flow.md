# JSB Brand Tech Stack & CRM Process Flow

> **Purpose:** Complete map of the technology stack, how JSB's existing data migrates
> in, and how every type of contact, email, and content flows through the system.
> **Audience:** JSB, Rev Global, Website Designer, PR Publicist

---

## Master Tech Stack Overview

```
╔══════════════════════════════════════════════════════════════════════╗
║                    JSB BRAND NERVOUS SYSTEM                          ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │                     CONTENT CREATION                         │     ║
║  │                                                               │     ║
║  │  Google Docs        Google Sheet       Claude API            │     ║
║  │  (drafted content)  (topic queue)      (AI generation)       │     ║
║  └────────────────────────────┬────────────────────────────────┘     ║
║                               │                                       ║
║  ┌─────────────────────────────▼────────────────────────────────┐    ║
║  │                  AUTOMATION LAYER (MAKE)                      │    ║
║  │                                                               │    ║
║  │  Connects every tool ← → Routes all data ← → Fires triggers  │    ║
║  └───┬──────────────┬──────────────┬──────────────┬─────────────┘    ║
║      │              │              │              │                    ║
║  ┌───▼───┐    ┌─────▼────┐  ┌─────▼────┐  ┌─────▼──────┐           ║
║  │  KIT  │    │ LINKEDIN │  │SUBSTACK  │  │  GOOGLE    │           ║
║  │  CRM  │    │          │  │          │  │  ANALYTICS │           ║
║  │       │    │ Content  │  │ Essays + │  │  + LOOKER  │           ║
║  │Email  │    │ posting  │  │ Newsletter│  │  STUDIO    │           ║
║  │Seqs   │    │          │  │          │  │            │           ║
║  └───┬───┘    └──────────┘  └──────────┘  └────────────┘           ║
║      │                                                                ║
║  ┌───▼──────────────────────────────────────────────────────────┐    ║
║  │                    AUDIENCE TOUCHPOINTS                       │    ║
║  │                                                               │    ║
║  │  Website     Quiz / Lead   Speaking    Book        Substack   │    ║
║  │  (opt-in     Magnet        Inquiry     Purchase    Subscribe  │    ║
║  │   forms)     (Typeform)    (form)      (link)      (button)   │    ║
║  └───────────────────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Tool-by-Tool Stack

| Tool | Role | Cost | Manages |
|------|------|------|---------|
| **Kit (ConvertKit)** | CRM + Email | $29–79/mo | All subscriber data, sequences, broadcasts, tags, segments |
| **Make** | Automation | $16/mo | All cross-tool triggers, routing, API calls, webhooks |
| **Claude API** | Content generation | ~$10–30/mo usage | AI drafts for Substack, LinkedIn, email |
| **Google Sheets** | Content queue + reporting | Free | Topic queue, campaign tracker, UTM builder |
| **Google Docs** | Staged drafts | Free | Draft review before publish |
| **Google Analytics 4** | Web tracking | Free | All website behavior, conversions |
| **Google Looker Studio** | Dashboard | Free | Live reporting across all channels |
| **Google Tag Manager** | Tag deployment | Free | GA4 events, conversion tracking |
| **Typeform / Tally** | Quiz / lead magnet | Free–$29/mo | Human Mode Score gated experience |
| **Substack** | Newsletter + essays | Free (10% on paid) | Long-form content, subscriber audience |
| **LinkedIn** | Professional content | Free | Organic reach, authority building |
| **Calendly** | Scheduling | $12/mo | Speaking + advisory intake |
| **Gmail** | JSB's personal email | Existing | Inbound inquiries, personal comms |
| **1Password** | Credential management | $5/mo | Secure team access to all tools |
| **TOTAL** | | **~$101–180/mo** | |

---

## Where JSB Is Today — Current State

```
TODAY (Before Infrastructure)

JSB's Gmail
  ├── Inbound: Speaking inquiries (scattered)
  ├── Inbound: Media / PR requests (scattered)
  ├── Inbound: Personal/professional contacts
  └── No structured follow-up or routing

Substack
  └── Existing subscriber list (if live)
      └── No connection to any CRM

Contacts / Network
  ├── LinkedIn connections (not exportable in bulk)
  ├── Phone contacts
  ├── Business cards / past events
  └── Spreadsheet (if exists)

Content
  ├── Posts published ad hoc
  ├── No unified calendar
  └── No performance tracking
```

---

## Migration: Moving JSB's Existing Contacts Into Kit

### Step 1: Gmail Contacts Export

```
Gmail → Google Contacts → Export as CSV
         │
         ▼
Clean in Google Sheets:
  • Remove duplicates
  • Add column: source = "personal-network"
  • Add column: tag = "vip" for close contacts
  • Add column: tag = "media" for press/journalists
  • Add column: tag = "speaker-prospect" for event organizers
         │
         ▼
Import CSV into Kit
  • Map: First Name, Last Name, Email, Tags
  • Segment applied: vip / media / speaker-prospect
  • Do NOT enroll in automated sequences (these are personal contacts)
  • Mark as: manually curated — require permission before sending marketing email
```

**Important:** Personal contacts must opt in before receiving marketing emails. Send a personal one-to-one email from JSB's Gmail first — "I'm building something new, wanted to include you if you're interested." Only add confirmed yes-responses to Kit marketing segments.

---

### Step 2: Substack Subscribers Export

```
Substack Dashboard → Settings → Exports → Subscriber list (CSV)
         │
         ▼
Import into Kit:
  • Tag: substack-reader
  • Tag: source-substack
  • Segment: existing-audience
  • Enroll in: Welcome sequence (modified — acknowledge they know JSB already)
         │
         ▼
Make Automation (ongoing sync after import):
  New Substack subscriber
         │
         └──► Make webhook → Kit: add contact, apply tags, enroll sequence
```

---

### Step 3: Any Existing Email List

If JSB has an existing newsletter or list anywhere else (Mailchimp, manual spreadsheet):

```
Export list as CSV
         │
         ▼
Clean: remove bounces, duplicates, anyone who previously unsubscribed
         │
         ▼
Import into Kit:
  • Tag: legacy-list
  • Tag: source-[previous platform]
  • Send a re-permission email before adding to active campaigns
    Subject: "I've moved — and I want to make sure you come with me"
```

---

### Step 4: LinkedIn Connections

LinkedIn does not allow bulk CRM import. Two approaches:

**Option A — Self-select (recommended):**
Post on LinkedIn: "I'm moving my newsletter to a dedicated home — link in bio to join."
People who opt in are the most valuable anyway (active interest).

**Option B — Manual VIP import:**
For key contacts (event organizers, media, potential partners), manually add to Kit with tag `vip` and a personal outreach note.

---

## Complete Contact Entry Map — All Inbound Paths

Every way a contact enters the CRM, where they come from, and what happens next:

```
CONTACT ENTRY PATHS INTO KIT CRM
─────────────────────────────────────────────────────────────────────

PATH 1: QUIZ / LEAD MAGNET
  Source: Website or social CTA → Typeform (Human Mode Score)
  Make trigger: Form submitted
  Kit action: Create contact
  Tags applied: source-quiz, persona-[type], new-subscriber
  Sequence enrolled: Welcome Sequence (full 5-email onboarding)
  First email: "Your Human Mode Score is inside"

PATH 2: WEBSITE OPT-IN FORM
  Source: Homepage, blog, exit intent popup
  Make trigger: Kit native form embed (no Make needed)
  Kit action: Create contact
  Tags applied: source-website, new-subscriber
  Sequence enrolled: Welcome Sequence
  First email: "Here's what to expect from me"

PATH 3: SUBSTACK SUBSCRIBE (new ongoing)
  Source: Substack subscribe button
  Make trigger: Substack webhook → new subscriber
  Kit action: Create/update contact
  Tags applied: source-substack, substack-reader
  Sequence enrolled: Substack Welcome (shorter — they already read the essay)
  First email: "You're in — here's what else I'm working on"

PATH 4: SPEAKING INQUIRY FORM
  Source: JSB website /speaking page → Calendly or form
  Make trigger: Form submitted / Calendly booking created
  Kit action: Create contact
  Tags applied: source-speaking-form, speaker-prospect
  Sequence enrolled: NOT a marketing sequence
  Action: Notification email to JSB immediately
  Auto-reply to inquirer: "JSB's team will be in touch within 24 hours"
  CRM pipeline: Added to Speaking Prospects stage "Inquiry Received"

PATH 5: BOOK PURCHASE
  Source: Book link click → Amazon / retailer (or direct sales page)
  Make trigger: Purchase webhook (if direct) or GA4 goal (if Amazon)
  Kit action: Create/update contact
  Tags applied: buyer, book-purchased
  Sequence enrolled: Post-Purchase Nurture (6 emails over 30 days)
  First email: "You just made a great decision"

PATH 6: EMAIL REFERRAL (subscriber shares)
  Source: Referral link in email (Kit native referral or SparkLoop)
  Kit action: Create contact + tag referrer
  Tags applied: source-referral, referred-by-[id]
  Sequence enrolled: Welcome Sequence

PATH 7: GMAIL INBOUND (personal/ad hoc)
  Source: Someone emails JSB directly
  Make trigger: Gmail filter (label: "CRM-add") applied manually
  Kit action: Create contact with tag manually-added
  Tags applied: source-gmail, vip or media or speaker-prospect
  Sequence enrolled: None (personal contacts — no automation)
  Action: JSB manages manually from Kit contact record

PATH 8: IMPORTED (migration — one-time)
  Source: Substack export, Gmail contacts, past list
  Kit action: Bulk import via CSV
  Tags applied: legacy-list, source-[origin]
  Sequence enrolled: Re-permission email only (not full sequence)
```

---

## Complete Outbound Flow — How Emails Leave the CRM

```
OUTBOUND EMAIL PATHS FROM KIT
─────────────────────────────────────────────────────────────────────

AUTOMATED SEQUENCES (set-and-forget after setup)
  ├── Welcome Sequence         5 emails / 10 days   All new opt-ins
  ├── Book Pre-Launch          14 emails / 42 days  tag: book-launch-active
  ├── Launch Week              7 emails / 7 days    date-triggered
  ├── Post-Purchase Nurture    6 emails / 30 days   tag: buyer
  ├── Speaking Nurture         3 emails / 14 days   tag: speaker-prospect
  └── Re-Engagement            3 emails / 9 days    60-day inactive

BROADCAST EMAILS (sent manually or via Make on content approval)
  ├── Weekly newsletter        Every Friday         Full list (engaged segment)
  ├── Substack announcement    When essay publishes  Full list (or substack segment)
  ├── Launch announcements     Campaign windows     Full list
  └── Event / speaking promos Occasional           Relevant segments only

TRANSACTIONAL / NOTIFICATION
  ├── Speaking inquiry auto-reply    Immediate     Triggered by form
  ├── Quiz result delivery           Immediate     Triggered by Typeform
  └── JSB team notification          Immediate     Internal (not to subscriber)
```

---

## Segment Decision Tree

When a new contact enters Kit, this logic determines their experience:

```
New contact enters Kit
         │
         ├── Has tag: buyer?
         │     └── YES → Post-Purchase sequence
         │
         ├── Has tag: speaker-prospect?
         │     └── YES → Speaking notification flow (no marketing emails)
         │
         ├── Has tag: vip or media?
         │     └── YES → No automation. Manual management only.
         │
         ├── Has tag: substack-reader?
         │     └── YES → Substack welcome sequence (shorter)
         │
         └── Default (quiz, website, referral)
               └── Welcome Sequence (full 5-email onboarding)
                         │
                         ├── Opens 2+ emails → tag: engaged
                         ├── Clicks book link → tag: book-interested
                         │                     → enroll: Pre-Launch sequence
                         └── No open in 60 days → Re-engagement sequence
                                                   └── No response → suppressed
```

---

## Data Flow: Gmail → CRM (Day-to-Day)

JSB's Gmail doesn't automatically sync to Kit. The workflow for ongoing inbound email management:

```
Someone emails JSB (speaking inquiry, media, partnership)
         │
         ▼
JSB (or team) applies Gmail label: "Add to CRM"
         │
         ▼
Make checks Gmail label every hour
         │
         ▼
Make creates Kit contact with:
  • Name + email from the Gmail sender
  • Tag: source-gmail
  • Tag: [category applied by JSB: vip / media / speaker-prospect / partner]
  • Note field: Gmail thread subject line (for context)
         │
         ▼
Kit contact created — JSB manages relationship manually
No automated sequences fire for Gmail-sourced contacts
```

**Optional upgrade (Month 3+):** Connect Gmail to a lightweight CRM view inside Kit using Kit's API — lets JSB see full contact history without leaving Gmail. Requires one Make scenario to set up.

---

## System Diagram: Full Stack End to End

```
PEOPLE                   TOOLS                      OUTPUTS
──────               ──────────────              ──────────────

Website visitor ──► Kit form embed ──────────────► Welcome email sequence
                                                    ↓
Quiz completer ─────► Typeform ──► Make ──► Kit ──► Persona email sequence
                                                    ↓
Substack reader ────► Substack ──► Make ──► Kit ──► Substack welcome email
                                                    ↓
Speaking inquiry ───► Website form ─► Make ──► Kit ──► JSB notification
                                            └─► Calendly link to inquirer
                                                    ↓
Email JSB directly ─► Gmail ──► Make (labeled) ──► Kit contact (manual)
                                                    ↓
JSB approves draft ─► Google Doc ─► Make ──► Kit ──► Email broadcast
                                         ├──► LinkedIn post
                                         └──► Substack draft

ANALYTICS LAYER (parallel — tracks everything above)
  GA4 + GTM ──────────────────────────────────────► Looker Studio dashboard
  Kit reporting ──────────────────────────────────► Looker Studio dashboard
  Google Search Console ──────────────────────────► Looker Studio dashboard
```

---

## Setup Sequence: What Gets Built in What Order

```
WEEK 1
Day 1  Kit account created, domain authenticated, segments configured
Day 2  Gmail contacts exported, cleaned, imported to Kit (tagged, no sequences)
Day 3  Substack subscribers exported, imported to Kit (tagged)
Day 4  Welcome email sequence written and loaded into Kit
Day 5  Typeform quiz built, Make webhook connects Typeform → Kit
Day 6  Speaking inquiry form built, Make connects form → Kit → JSB notification
Day 7  All Make automations tested end-to-end

WEEK 2
Day 8  Substack publication set up / optimized, Make ongoing sync activated
Day 9  Website opt-in forms embedded (brief to designer)
Day 10 GA4 + GTM installed, key events configured
Day 11 UTM builder sheet created, all campaign links pre-built
Day 12 Looker Studio dashboard built
Day 13 Content automation flow set up (Google Sheet queue → Claude → Google Doc → approval email)
Day 14 Full QA: every path tested, credential vault secured, JSB walkthrough

WEEK 3+ (Campaign activation — infrastructure complete)
  Pre-awareness content begins publishing via the approval-gate automation
```

---

## Cost Summary

| Category | Tool | Monthly |
|----------|------|---------|
| CRM + Email | Kit (up to 1k subscribers) | $29 |
| Automation | Make (Core) | $16 |
| AI Content | Claude API (est. usage) | $15–30 |
| Quiz | Typeform (free tier to start) | $0 |
| Scheduling | Calendly (basic) | $12 |
| Analytics | GA4 + Looker Studio | $0 |
| Credentials | 1Password | $5 |
| **TOTAL** | | **$77–97/mo** |

*Kit scales: $49/mo at 3k subscribers, $79/mo at 5k, $99/mo at 10k*
*Make scales: $29/mo if automation volume increases*

---

## What JSB Needs to Provide (Input Checklist)

Before infrastructure build begins, Rev Global needs from JSB:

- [ ] Access to Gmail account (to export contacts + set up label-to-CRM)
- [ ] Substack login (to export subscribers + configure draft email address)
- [ ] Existing contact spreadsheet (if any — past events, relationships)
- [ ] LinkedIn login (for Make OAuth connection)
- [ ] Domain access (for Kit sending domain authentication)
- [ ] 3–5 examples of his best writing (for voice guide calibration)
- [ ] Claude API key (or Rev Global creates under JSB's Anthropic account)
- [ ] Approval of CRM segment structure and tag names
- [ ] Approval of Welcome email sequence copy before activation
