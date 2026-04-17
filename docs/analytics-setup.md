# Analytics + Tracking Setup Guide

> **Goal:** Full-funnel visibility from first touch to purchase, speaking inquiry, and beyond. Every dollar of effort should be traceable to an outcome.

---

## Analytics Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Google Analytics 4 | Website + conversion tracking | Free |
| Google Tag Manager | Tag deployment without code changes | Free |
| Google Looker Studio | Dashboard + reporting | Free |
| Google Search Console | SEO + organic search performance | Free |
| Microsoft Clarity | Heatmaps + session recordings | Free |
| CRM built-in reporting | Email performance, sequence stats | Included in CRM |
| Substack analytics | Newsletter growth + post performance | Included in Substack |

---

## Google Analytics 4 Setup

### Property Configuration

```
Property Name: JSB Human Mode
Industry: Arts & Entertainment (closest match)
Reporting timezone: [JSB's primary timezone]
Currency: USD
Data retention: 14 months (max for free tier)
```

### Tag Manager Setup

Install GTM first, then deploy all tags through GTM (never install GA4 directly on site pages — always via GTM for flexibility).

**GTM Container Structure:**
```
Tags:
  ├── GA4 Configuration Tag (fires on all pages)
  ├── GA4 Event — Lead Generated
  ├── GA4 Event — Quiz Started
  ├── GA4 Event — Quiz Completed
  ├── GA4 Event — Book Link Click
  ├── GA4 Event — Speaking Inquiry
  └── GA4 Event — Substack Subscribe Click

Triggers:
  ├── All Pages (pageview)
  ├── CRM Form Submit (form ID match)
  ├── Typeform Load (URL contains quiz URL)
  ├── Typeform Thank You (URL contains /thank-you)
  ├── Book CTA Click (link click contains amazon.com or book URL)
  ├── Speaking Form Submit (form ID match)
  └── Substack Link Click (link click contains substack.com)

Variables:
  ├── GA4 Measurement ID
  ├── Form IDs (CRM opt-in forms)
  └── UTM parameters (custom JS variable)
```

### Key Events (Conversions)

| Event Name | Trigger | Value |
|-----------|---------|-------|
| `generate_lead` | Any CRM form submission | $5 (estimated) |
| `quiz_start` | Typeform page load | $1 |
| `quiz_complete` | Typeform thank-you page | $10 |
| `book_click` | Click on book purchase link | $15 |
| `speaking_inquiry` | Speaking form submission | $500 |
| `advisory_application` | Advisory form submission | $1,000 |
| `substack_subscribe_click` | Click to Substack subscribe | $3 |

Mark all as conversions in GA4 Admin → Events.

### Audiences

Create these audiences for future remarketing (even if not running paid ads yet — build the data):

| Audience | Definition | Min Size |
|----------|-----------|---------|
| Quiz Completers | Completed `quiz_complete` event | — |
| Book Interested | Triggered `book_click` | — |
| High Intent | 3+ pages visited + book_click | — |
| Return Visitors | 2+ sessions in 30 days | — |
| Speaker Prospects | Visited /speaking page | — |

---

## UTM Tagging System

### Standard UTM Parameters

```
utm_source   = WHERE the traffic comes from
utm_medium   = HOW it was delivered
utm_campaign = WHICH campaign it's part of
utm_content  = WHICH specific asset/link
utm_term     = (paid search only) keyword
```

### Source/Medium Taxonomy

| Channel | utm_source | utm_medium |
|---------|-----------|-----------|
| LinkedIn organic | linkedin | social |
| Instagram organic | instagram | social |
| LinkedIn newsletter | linkedin | newsletter |
| Email broadcast | kit (or activecampaign) | email |
| Email sequence | kit | email-sequence |
| Substack | substack | newsletter |
| Podcast appearance | [podcast-name] | podcast |
| Press/media feature | [publication] | referral |
| Partner promo | [partner-name] | partner |

### Campaign Naming Convention

```
[phase]-[audience]-[goal]-[date-MMYY]

Examples:
  pre-awareness-cold-listbuild-0526
  launch-warm-book-preorder-0826
  evergreen-engaged-speaking-inquiry-ongoing
  podcast-cold-awareness-0626
```

### UTM Builder Spreadsheet

Maintain a shared Google Sheet with columns:
`Destination URL | Source | Medium | Campaign | Content | Full UTM URL | Used In | Date`

All team members use this sheet to generate links. Never build UTMs ad hoc.

---

## Looker Studio Dashboard

### Dashboard URL
Share with: JSB (view), Rev Global team (edit)
Refresh frequency: Daily (GA4 auto-refreshes; CRM sheet via Zapier nightly)

### Page 1: Executive Summary

**Scorecard Widgets:**
- Total email subscribers (CRM)
- New subscribers this week
- Email open rate (last 7 days)
- Website sessions this week
- Quiz completions this week
- Book link clicks this week

**Charts:**
- Subscriber growth over time (line chart, by week)
- Top traffic sources (bar chart)
- Conversion funnel: Sessions → Quiz Start → Quiz Complete → Email Opt-In

---

### Page 2: Audience + List Health

**Metrics:**
- Subscribers by segment (donut chart)
- Subscribers by persona type (donut chart)
- New vs. returning subscribers by week
- Unsubscribe rate trend
- List growth rate (%)

**Table:**
- Source breakdown: how subscribers found JSB, by count and % of total

---

### Page 3: Email Performance

**Metrics:**
- Average open rate by sequence
- Average CTR by sequence
- Best-performing subject lines (table: subject + open rate)
- Sequence completion rates (% who complete full sequence)
- Re-engagement sequence effectiveness

**Charts:**
- Open rate trend (30 days)
- CTR trend (30 days)

---

### Page 4: Content + Conversion

**Metrics:**
- Top landing pages by sessions
- Top landing pages by conversion rate
- Substack subscriber count (manual weekly update)
- Substack top posts by opens

**Funnel:**
- Website visit → Quiz start → Quiz complete → Subscribed → Book interested → Buyer

---

### Page 5: Revenue Pipeline

**Metrics:**
- Speaking inquiries (week/month)
- Advisory applications (week/month)
- Book link clicks (proxy for purchase intent)
- Confirmed book purchases (if trackable)

**Table:**
- Active speaking prospects in CRM pipeline (name, company, stage, date)

---

## Weekly Reporting Cadence

### Automated: Monday Morning Report (via Looker Studio email)
- Sent to: JSB + Rev Global
- Content: Key metrics from Page 1 (executive summary)
- Time: 8am, every Monday

### Manual: Weekly Strategy Note (Rev Global → JSB)
- Format: 5-bullet Slack or email
- Content:
  1. One thing working well
  2. One thing to watch
  3. Recommended action for the week
  4. Content performing best
  5. Upcoming milestone / deadline

### Monthly: Full Review
- 30-minute call
- Review all 5 dashboard pages
- Adjust sequence triggers, content calendar, or automation rules based on data

---

## Microsoft Clarity (Behavioral Analytics)

Install alongside GA4 for qualitative insight.

**What to watch:**
- Heatmaps on: Homepage, Quiz landing page, Book page, Speaking page
- Session recordings: Filter by users who started quiz but didn't complete
- Scroll depth: Are visitors reaching the email opt-in form?
- Rage clicks: Identify broken or confusing UX elements

**Review frequency:** Weekly during Phase 0–1, monthly thereafter

---

## Data Governance

**What we track:**
- Aggregate behavior data (page views, events)
- Email engagement (opens, clicks — anonymized in aggregate)
- Form submissions (with consent)
- UTM source attribution

**What we never store unsecured:**
- Payment information (handled by payment processor)
- Personal data beyond name + email without explicit consent

**Privacy compliance:**
- Add GA4 consent mode for EU visitors (if relevant)
- Ensure CRM opt-in forms include clear consent language
- Maintain unsubscribe link in every email (CAN-SPAM / GDPR)
- Privacy policy on website must reflect data collection practices
