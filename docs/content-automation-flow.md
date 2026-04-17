# Content Automation Flow: Google Sheet → Claude → Review → Auto-Publish

> **Design principle:** Maximum control in early phase, progressive automation as confidence builds.
> **Stack:** Google Sheets + Make + Claude API + Google Docs + Kit + LinkedIn

---

## Full Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                  STAGE 1: QUEUE                      │
│                                                       │
│  Google Sheet (Content Queue)                        │
│  ┌──────────┬──────────┬────────────┬──────────┐    │
│  │ Topic    │ Pillar   │ Type       │ Status   │    │
│  │ "AI and  │ Human    │ LinkedIn + │ Ready    │    │
│  │ judgment"│ Leadership│ Substack  │          │    │
│  └──────────┴──────────┴────────────┴──────────┘    │
└────────────────────┬────────────────────────────────┘
                     │  Make: Scheduled trigger
                     │  (e.g. Mon + Thu, 8am)
                     ▼
┌─────────────────────────────────────────────────────┐
│                  STAGE 2: GENERATE                   │
│                                                       │
│  Make calls Claude API (HTTP module)                 │
│  Inputs:                                             │
│    • Topic from Google Sheet row                     │
│    • JSB voice guide (from docs/agent-config/)       │
│    • Post template for each format                   │
│                                                       │
│  Claude generates all 3 outputs in one call:         │
│    [A] Substack essay  (600–900 words)               │
│    [B] LinkedIn post   (150–200 words)               │
│    [C] Email broadcast (subject line + body)         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  STAGE 3: STAGE                      │
│                                                       │
│  Make creates a Google Doc automatically             │
│  Doc contains:                                        │
│    • Section 1: Substack draft                       │
│    • Section 2: LinkedIn post                        │
│    • Section 3: Email subject + body                 │
│    • Section 4: Metadata (topic, pillar, date)       │
│                                                       │
│  Doc is titled: "DRAFT — [Topic] — [Date]"           │
│  Saved to: Google Drive / JSB Content Drafts folder  │
│                                                       │
│  Google Sheet row updated: Status → "In Review"     │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  STAGE 4: REVIEW EMAIL               │
│                                                       │
│  Make sends approval email to JSB (and you)          │
│                                                       │
│  Email contains:                                      │
│    • Preview of LinkedIn post (full text)            │
│    • Preview of Email subject line                   │
│    • Link to Google Doc (to read/edit full drafts)   │
│                                                       │
│  Three action buttons:                               │
│  ┌──────────────┐ ┌──────────┐ ┌────────────────┐  │
│  │ ✓ APPROVE &  │ │ ✎ EDIT   │ │ ✗ REJECT       │  │
│  │   PUBLISH    │ │  FIRST   │ │   (discard)    │  │
│  └──────────────┘ └──────────┘ └────────────────┘  │
│                                                       │
│  Each button = unique Make webhook URL               │
└────────────────────┬────────────────────────────────┘
                     │
          ┌──────────┼──────────────────┐
          │          │                  │
     APPROVED     EDIT FIRST        REJECTED
          │          │                  │
          │     Opens Google Doc   Sheet → "Rejected"
          │     JSB edits content  Flow ends
          │          │
          │     JSB clicks approve
          │     link inside doc
          │          │
          └────┬─────┘
               │
               ▼
┌─────────────────────────────────────────────────────┐
│                  STAGE 5: AUTO-PUBLISH               │
│                                                       │
│  Make Scenario 2 fires (webhook received)            │
│  Reads final content from Google Doc                 │
│                                                       │
│  Three actions run in parallel:                      │
│                                                       │
│  [1] LINKEDIN                                        │
│      Make → LinkedIn API                             │
│      Posts LinkedIn content from Section 2 of doc   │
│      Fires immediately on approval                   │
│                                                       │
│  [2] KIT EMAIL BROADCAST                             │
│      Make → Kit API                                  │
│      Creates + sends broadcast to full list          │
│      Uses subject + body from Section 3 of doc      │
│      Fires immediately on approval                   │
│                                                       │
│  [3] SUBSTACK DRAFT                                  │
│      Make → Substack email-to-draft                  │
│      Sends Substack essay to JSB's private           │
│      Substack draft inbox (one-click publish         │
│      from inside Substack — see note below)          │
│                                                       │
│  Google Sheet row updated: Status → "Published"     │
│  Timestamp + publish date logged automatically       │
└─────────────────────────────────────────────────────┘
```

---

## The Two Make Scenarios

### Scenario 1: Generate + Stage + Notify
**Trigger:** Schedule (Monday + Thursday, 8am — or your cadence)
**Steps:**
1. Google Sheets → Get next row where Status = `Ready`
2. HTTP module → Call Claude API (generate all 3 content pieces)
3. Google Docs → Create new doc, populate with Claude output
4. Google Sheets → Update row Status to `In Review`
5. Email module → Send review email to JSB with preview + webhook links

### Scenario 2: Publish on Approval
**Trigger:** Webhook (fires when JSB clicks Approve button)
**Steps:**
1. Google Docs → Read final content from staged doc
2. LinkedIn → Create post (Section 2 content)
3. Kit → Create + send broadcast (Section 3 content)
4. Email → Send Substack draft to Substack draft address (Section 1 content)
5. Google Sheets → Update row Status to `Published`, log timestamp

**Scenario 3: Handle Rejection**
**Trigger:** Webhook (fires when JSB clicks Reject)
**Steps:**
1. Google Sheets → Update Status to `Rejected`
2. Email → Notify team with reason field (optional: rejection reason form)

---

## Substack: The Honest Reality

Substack does not have a public API for programmatically publishing posts. There are two practical options:

### Option A: Email-to-Draft (Recommended)
Substack gives every publication a private email address. Emailing content to that address creates a **draft** in the Substack dashboard that JSB can review and publish with one click.

- **Make action:** Send email to `[publication]@substack.com` (private draft inbox)
- **JSB action:** Opens Substack → sees draft ready → clicks Publish
- **Friction level:** 1 click, 30 seconds

### Option B: Google Doc as Substack Source
On approval, Make sends JSB a direct link to the Google Doc with the Substack essay ready to copy. JSB pastes into Substack.

- **More friction** than Option A, but full editing control before publishing

**Recommended:** Option A for speed, with the Google Doc still available if JSB wants to edit before publishing.

---

## Google Sheet: Content Queue Structure

```
Column A: Topic           (e.g. "How great leaders make decisions under uncertainty")
Column B: Pillar          (Human Leadership / Authentic Presence / Decision Intelligence /
                           Connection at Scale / Future-Proof Identity)
Column C: Content Type    (Full: Substack + LinkedIn + Email | LinkedIn Only | Email Only)
Column D: Status          (Ready / In Review / Approved / Published / Rejected)
Column E: Scheduled Date  (target publish date — Make picks up when date = today)
Column F: Google Doc Link (auto-populated by Make when draft is created)
Column G: Published Date  (auto-populated by Make on publish)
Column H: Notes           (optional — context for the agent)
```

---

## The Claude API Call (Make HTTP Module)

**Endpoint:** `https://api.anthropic.com/v1/messages`
**Method:** POST
**Headers:**
```
x-api-key: [your Claude API key]
anthropic-version: 2023-06-01
content-type: application/json
```

**Body (JSON — built dynamically in Make):**
```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 2000,
  "system": "[paste contents of docs/agent-config/jsb-voice-guide.md]",
  "messages": [
    {
      "role": "user",
      "content": "Write the following three pieces of content for JSB.\n\nTOPIC: {{topic from Google Sheet}}\nPILLAR: {{pillar from Google Sheet}}\nNOTES: {{notes from Google Sheet}}\n\n[paste contents of docs/agent-config/post-templates.md]"
    }
  ]
}
```

Make maps the Google Sheet columns into the `{{topic}}`, `{{pillar}}`, and `{{notes}}` variables dynamically — no coding required.

---

## Approval Email Design

**Subject:** `[ACTION REQUIRED] New JSB Draft Ready: "{{topic}}"`

**Body:**
```
A new content draft is ready for your review.

TOPIC: {{topic}}
PILLAR: {{pillar}}
SCHEDULED: {{date}}

─────────────────────────────
LINKEDIN PREVIEW:
─────────────────────────────
{{linkedin post text}}

─────────────────────────────
EMAIL SUBJECT LINE:
─────────────────────────────
{{email subject}}

─────────────────────────────

[Read + Edit Full Draft in Google Doc]  ← link to doc

─────────────────────────────

[✓ APPROVE & PUBLISH NOW]   ← webhook URL (approve)
[✗ REJECT THIS DRAFT]       ← webhook URL (reject)

─────────────────────────────
After approval: LinkedIn posts immediately, Kit email sends immediately,
Substack draft lands in your Substack drafts folder for 1-click publish.
```

---

## Phase Controls: Dial Up Automation Over Time

| Phase | Control Level | What Changes |
|-------|--------------|-------------|
| **Month 1–2** | Full approval gate | Every post requires approval email |
| **Month 3** | Pillar auto-approve | Evergreen pillar posts auto-publish; original essays still need approval |
| **Month 6+** | Schedule-based | Approved topics auto-publish on schedule; JSB only reviews exception reports |

This lets you start with full control and progressively remove friction as trust in the agent output builds.
