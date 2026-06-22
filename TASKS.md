# JSB HumanMode EAM Assessment — Phase 2 Tasks

## SendGrid Setup

- [ ] Create or access SendGrid account (www.sendgrid.com)
- [ ] Generate API key from SendGrid dashboard
- [ ] Add SendGrid API key to project environment variables:
  - [ ] Add to local `.env` file: `VITE_SENDGRID_API_KEY=sk_...`
  - [ ] Add to Vercel environment variables (Project Settings → Environment Variables)
- [ ] Configure SendGrid sender domain/email authentication
  - [ ] Verify sender email address (e.g., reports@jsb-humanmode.com or lynn@revglobalinc.com)
  - [ ] Set up DKIM/SPF records if using custom domain
- [ ] Create email template in SendGrid for detailed report
  - [ ] Template name: "EAM Detailed Report"
  - [ ] Include user's name, score, profile, and link to report
  - [ ] Template ID needed for backend integration

## Backend Integration

- [ ] Choose backend solution (options below):
  - [ ] Vercel serverless functions (recommended for Vercel deployment)
  - [ ] Node.js backend server
  - [ ] Other backend platform
- [ ] Create API endpoint for report generation:
  - [ ] Route: `POST /api/send-report`
  - [ ] Accept: `{ email, firstName, scores, responses }`
  - [ ] Return: success/error response
- [ ] Install SendGrid package for backend:
  - [ ] `npm install @sendgrid/mail` (if Node-based)
- [ ] Implement SendGrid API integration:
  - [ ] Load API key from environment variables
  - [ ] Generate PDF with user's report data
  - [ ] Send email via SendGrid with PDF attachment

## PDF Report Generation

- [ ] Choose PDF library:
  - [ ] `jsPDF` + `html2canvas` (client-side)
  - [ ] `puppeteer` (server-side, more sophisticated)
  - [ ] `pdfkit` (Node.js)
- [ ] Design PDF layout:
  - [ ] Header: Title, user name, date
  - [ ] Section 1: Overall score and three dimensions
  - [ ] Section 2: Profile name, tagline, and full insight
  - [ ] Section 3: Item-by-item breakdown (optional but valuable)
    - [ ] Question ID, user's answers, correct answers, accuracy
  - [ ] Section 4: Strengths and development focus
  - [ ] Section 5: Development tips (from existing PDF template)
  - [ ] Footer: Copyright, Jeffrey Sanchez-Burks branding
- [ ] Test PDF output with sample data

## Database/Storage (Optional but Recommended)

- [ ] Decide on data storage for reports:
  - [ ] Store in database (Supabase, Firebase, MongoDB)
  - [ ] Or just send email without storing
  - [ ] Or store temporarily for 30 days then delete
- [ ] If storing, create schema:
  - [ ] Table: `reports` with fields: id, email, firstName, scores, responses, createdAt
  - [ ] Add authentication to prevent unauthorized access

## Frontend Updates

- [ ] Update Results.jsx to call backend endpoint:
  - [ ] Remove placeholder TODO comment
  - [ ] Connect email form submission to POST `/api/send-report`
  - [ ] Pass: email, firstName, scores, responses
- [ ] Add loading state while email is being sent
  - [ ] Show "Sending..." button state
  - [ ] Disable form while sending
- [ ] Add error handling:
  - [ ] Display error message if email fails
  - [ ] Allow user to retry
- [ ] Success state:
  - [ ] Confirm email was sent
  - [ ] Show email address confirmation

## Environment & Deployment

- [ ] Create `.env.example` file with required variables:
  - [ ] `VITE_SENDGRID_API_KEY` (if client-side)
  - [ ] `SENDGRID_API_KEY` (if server-side)
- [ ] Update Vercel deployment:
  - [ ] Add SendGrid API key to Vercel environment variables
  - [ ] Test deployment with new variables
  - [ ] Verify email sending works in production

## Testing

- [ ] Manual testing:
  - [ ] Take assessment end-to-end
  - [ ] Request detailed report with test email
  - [ ] Verify email arrives with PDF attachment
  - [ ] Verify PDF content is correct
- [ ] Error scenarios:
  - [ ] Invalid email address
  - [ ] SendGrid API rate limit
  - [ ] PDF generation failure
- [ ] Cross-browser testing:
  - [ ] Test on Chrome, Safari, Firefox
  - [ ] Test on mobile devices

## Documentation & Handoff

- [ ] Update IMPLEMENTATION.md with Phase 2 completion
- [ ] Document backend endpoint in code comments
- [ ] Create SendGrid setup guide for future reference
- [ ] Add API endpoint documentation to project README

## Optional Enhancements (Post-Launch)

- [ ] Add "download PDF" button (in addition to email)
- [ ] Create detailed report template matching original EAM PDF style
- [ ] Add user survey in email: "How useful was this report?"
- [ ] Create dashboard to view past reports (if storing in database)
- [ ] Add analytics: track report opens, downloads

---

## Priority Order

**Immediate (Required for launch):**
1. SendGrid account + API key
2. Backend endpoint for report sending
3. PDF generation
4. Email template
5. Frontend integration
6. Environment variables in Vercel
7. Testing

**Nice-to-have:**
- Database storage
- Enhanced PDF design
- Optional enhancements

---

## Questions to Clarify

- [ ] Should the detailed report PDF match the original EAM report design exactly?
- [ ] Should you store reports in a database, or just send and forget?
- [ ] Should there be a "download PDF" option, or email-only?
- [ ] What email address should reports come from? (e.g., reports@jsb-humanmode.com or lynn@revglobalinc.com)
- [ ] Any specific branding/styling for the PDF report?
