# Phase 0: Infrastructure Build — 2-Week Sprint Plan

> **Goal:** Deploy JSB's brand nervous system — CRM, email sequences, gated experience, automations, analytics, and Substack integration — ready for campaign activation.
> **Timeline:** 14 days
> **Owner:** Rev Global Inc.

---

## The Nervous System Stack (Recommended Tools)

| Layer | Tool | Why |
|-------|------|-----|
| CRM + Email | **Kit (ConvertKit)** or **ActiveCampaign** | Best-in-class for creator/author brands; visual automations, tagging, sequences |
| Landing Pages | **Carrd** or existing website (Webflow/WordPress) | Fast, clean, high-converting |
| Gated Experience / Quiz | **Typeform** or **Tally** | Personalized output via conditional logic; integrates with CRM via webhook |
| Automation Orchestration | **Make (Integromat)** or **Zapier** | Connects all tools; triggers, routing, webhooks |
| Analytics | **Google Analytics 4** + **Clarity** | Behavior tracking + heatmaps |
| Newsletter / Content | **Substack** | Native audience + SEO; embed or link from website |
| Link Hub | **Linktree** or custom `/start` page | Single entry point for all CTAs |
| Scheduling | **Calendly** | Speaking/advisory intake |

**Note on "Xavier":** If this refers to a specific AI automation platform or agent, plug it into the Make/Zapier orchestration layer at the trigger-routing stage (see CRM blueprint).

---

## Week 1: Foundation (Days 1–7)

### Day 1–2: CRM Setup and Segmentation Architecture

**Tasks:**
- [ ] Create CRM account (Kit or ActiveCampaign)
- [ ] Define list segments:
  - `cold-prospect` — new opt-ins, no engagement history
  - `warm-lead` — opened 2+ emails or engaged with content
  - `book-interested` — clicked book links or landing page
  - `speaker-prospect` — clicked speaking page or inquiry form
  - `buyer` — confirmed purchase
  - `vip` — personal contacts, media, podcast hosts
- [ ] Set up custom fields:
  - `Human Mode Score` (from quiz)
  - `Persona Type` (from quiz output: Leader / Creator / Builder / Connector)
  - `Source` (how they found JSB)
  - `Engagement Stage`
- [ ] Configure domain authentication (SPF, DKIM, DMARC) for email deliverability
- [ ] Set up sender reputation warm-up schedule if new domain

**Deliverable:** CRM live, segmented, domain authenticated.

---

### Day 3–4: Lead Magnet + Gated Experience Build

**The Human Mode Score — Primary Lead Magnet**

This is JSB's highest-leverage asset. A short (7–10 question) assessment that:
1. Diagnoses the reader's "Human Mode" profile across 4 dimensions
2. Delivers a personalized output (PDF or web page) based on their score
3. Captures their email in exchange for results
4. Tags them in CRM with their persona type for personalized follow-up

**Build Steps:**
- [ ] Write quiz questions (see content strategy for copy guidance)
- [ ] Create 4 output profiles (Leader / Creator / Builder / Connector)
- [ ] Build quiz in Typeform or Tally with conditional logic
- [ ] Design personalized result pages or PDF outputs (one per persona)
- [ ] Connect Typeform → CRM via Make/Zapier webhook
  - Trigger: Form submitted
  - Action: Add to CRM, tag with persona, enroll in welcome sequence
- [ ] Build simple landing page for quiz CTA
- [ ] Test end-to-end: submit → tag → email received

**Deliverable:** Gated experience live, tested, converting.

---

### Day 5–6: Welcome + Nurture Email Sequences

**Sequence 1: Welcome / Onboarding (5 emails, 10 days)**

| Email | Timing | Subject | Goal |
|-------|--------|---------|------|
| E1 | Immediate | "Here's your Human Mode Score + what it means" | Deliver value, set expectation |
| E2 | Day 2 | "The one thing AI will never take from you" | Establish positioning, build trust |
| E3 | Day 4 | "How [Persona Type] leaders stay irreplaceable" | Personalized by tag, deepen relevance |
| E4 | Day 7 | "A story about leading without losing yourself" | Story-driven, emotional connection |
| E5 | Day 10 | "What's coming — and why I'm building this with you" | Tease the book, invite response |

**Sequence 2: Book Pre-Awareness (begins Week 5 of campaign)**
- Separate sequence, triggered by tag `book-launch-active`
- 7 emails over 14 days — see content strategy

**Sequence 3: Re-engagement (triggered after 30 days of inactivity)**
- 3-email win-back sequence
- If no engagement after E3, remove from active list, add to suppression

**Build Steps:**
- [ ] Write all E1–E5 emails (or review AI drafts)
- [ ] Load into CRM automation builder
- [ ] Set triggers, delays, and tag conditions
- [ ] Test with seed addresses across Gmail, Outlook, Apple Mail
- [ ] Check mobile rendering

**Deliverable:** Welcome sequence live and tested.

---

### Day 7: Automation Orchestration Layer

**Core Automation Triggers (Make / Zapier):**

| Trigger | Action | Notes |
|---------|--------|-------|
| New CRM subscriber | Send to Google Sheet (master list) | Backup + reporting |
| Quiz completed | Tag in CRM + enroll sequence | Via webhook |
| Email link clicked (book page) | Add tag `book-interested` | CRM behavior trigger |
| Speaking inquiry form submitted | Notify JSB via email/Slack + add to CRM | Same-day response goal |
| Substack new subscriber | Cross-tag in CRM if email matches | Via Zapier Substack integration |
| Purchase confirmed | Move to `buyer` segment + trigger post-purchase sequence | Via payment processor webhook |

**Build Steps:**
- [ ] Set up Make or Zapier account + connect all tools
- [ ] Build and test each automation scenario above
- [ ] Document all Zaps/Scenarios with descriptions for handoff
- [ ] Set error notifications (failed zaps alert to Slack or email)

**Deliverable:** Core automations live, tested, documented.

---

## Week 2: Integration + Analytics (Days 8–14)

### Day 8–9: Website Integration + Substack Setup

**Substack:**
- [ ] Create or optimize Substack publication (`humanmode.substack.com` or custom domain)
- [ ] Set up publication branding (header image, bio, about page)
- [ ] Write and publish first "Hello World" post — establishes baseline
- [ ] Configure Substack custom domain if using JSB's main domain
- [ ] Add Substack embed widget to website homepage and blog section
- [ ] Add Substack CTA to email signature and all email footers

**Website Integration (coordinate with designer):**
- [ ] Brief designer on CTA placement requirements:
  - Hero section: Lead magnet / quiz CTA (primary)
  - Navigation: "Get the Book" + "Work With JSB"
  - Footer: Newsletter embed (Substack or CRM form)
  - Blog/Resources page: Substack feed embed or manual posts
- [ ] Implement CRM opt-in forms on website (embedded or popup)
  - Homepage hero
  - Blog sidebar
  - Exit intent popup (show after 60s or on scroll exit)
- [ ] Connect website form submissions → CRM via embed code or API

**Deliverable:** Substack live, website forms connected to CRM.

---

### Day 10–11: Google Analytics 4 + Tracking Setup

**GA4 Configuration:**
- [ ] Create GA4 property for JSB website
- [ ] Install GA4 tag via Google Tag Manager (GTM preferred)
- [ ] Configure key events (conversions):
  - `generate_lead` — any CRM form submission
  - `quiz_start` — Typeform page load
  - `quiz_complete` — Typeform submission
  - `book_click` — click on book pre-order/purchase link
  - `speaking_inquiry` — speaking form submission
  - `substack_click` — click to Substack subscribe
- [ ] Set up GA4 audiences:
  - High-intent visitors (book page + 2+ pages visited)
  - Quiz completers
  - Return visitors
- [ ] Connect GA4 to Google Search Console
- [ ] Create GA4 Exploration report: Conversion funnel (visit → quiz → email → book)

**UTM Tagging Protocol:**
All external links to JSB's website must use UTM parameters:

```
utm_source = platform (instagram, linkedin, substack, email)
utm_medium = channel (social, newsletter, referral, paid)
utm_campaign = campaign name (humanmode-launch, speaking-promo, etc.)
utm_content = specific asset (quiz-cta, book-banner, bio-link)
```

- [ ] Create UTM builder spreadsheet for team use
- [ ] Pre-build UTMs for all Phase 1 campaign links

**Deliverable:** GA4 live, events firing, UTM protocol documented.

---

### Day 12–13: Analytics Dashboard

**Dashboard Tool:** Google Looker Studio (free, connects to GA4 + sheets)

**Dashboard Panels:**
1. **Audience Growth** — New subscribers by week, by source
2. **Email Health** — Open rate, CTR, unsubscribe rate by sequence
3. **Conversion Funnel** — Website visits → quiz starts → quiz completions → CRM opt-ins
4. **Content Performance** — Top pages by engagement, Substack post performance
5. **Revenue Pipeline** — Speaking inquiries, book clicks, advisory applications
6. **Campaign Tracker** — Active sequences, subscriber counts by segment

**Build Steps:**
- [ ] Create Looker Studio account + connect GA4 data source
- [ ] Connect CRM data (export to Google Sheets weekly, or via Zapier live sync)
- [ ] Build all 6 panels above
- [ ] Share dashboard link with JSB (view-only)
- [ ] Schedule weekly automated email report from Looker Studio

**Deliverable:** Live dashboard accessible to JSB and Rev Global team.

---

### Day 14: QA, Testing + Handoff

**Full System Test:**
- [ ] Submit quiz as test user → verify email received, CRM tagged correctly, sequence enrolled
- [ ] Click book link in email → verify `book-interested` tag applied in CRM
- [ ] Submit speaking form → verify JSB notification sent + CRM record created
- [ ] Verify all UTMs tracking in GA4
- [ ] Check Substack embed rendering on website
- [ ] Review dashboard for data accuracy

**Documentation Deliverables:**
- [ ] System map (visual diagram of all connected tools and flows)
- [ ] Automation log (all Make/Zapier scenarios documented)
- [ ] Email sequence log (all sequences, triggers, delays)
- [ ] Credential vault (shared securely — 1Password or similar)
- [ ] 30-minute walkthrough session with JSB

**Go/No-Go Checklist:**
- [ ] CRM live, segmented, authenticated
- [ ] Welcome sequence sending correctly
- [ ] Gated experience converting (quiz → email → output)
- [ ] All automations tested
- [ ] GA4 events firing
- [ ] Dashboard live
- [ ] Substack integrated
- [ ] Website forms connected

---

## Week 1–2 Owner Matrix

| Task Area | Owner | JSB Input Needed |
|-----------|-------|-----------------|
| CRM setup + segmentation | Rev Global | Approve segments |
| Quiz questions + output copy | Rev Global draft → JSB review | Voice approval |
| Email sequence copy | Rev Global draft → JSB review | Voice + story approval |
| Website CTA placement | Rev Global brief → Designer executes | None (post-brief) |
| GA4 + GTM installation | Rev Global or Designer | Website access |
| Substack branding | Rev Global setup → JSB review | Bio, photo, about copy |
| Dashboard build | Rev Global | None |
| Automation builds | Rev Global | None |
