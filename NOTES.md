# Development Notes — JSB HumanMode EAM Assessment

## Image Representation Concern

**Issue:** The current image set shows a problematic pattern where there is typically one person with very dark skin juxtaposed against predominantly white individuals, with minimal representation of other ethnicities.

**Impact:** This creates an unequal/salient representation that may bias assessment results and doesn't reflect authentic group dynamics where diversity is more evenly distributed.

**Action Items:**
- [ ] Discuss with psychologist/assessment designer about image selection criteria
- [ ] Consider if new images need to be sourced with more equitable representation
- [ ] If updating images, ensure they reflect realistic workplace/group composition without any single individual being visually isolated by race/ethnicity
- [ ] Review assessment for any other potential biases in stimulus materials

**Timeline:** Flag for discussion before wider deployment

---

## Recent Changes (June 2026)

### UX Improvements
- Changed title from "Emotional Aperture Measure™ (EAM) Assessment" to "**Reading the Room™** — A skills-based assessment of how well you recognize emotional reactions in groups"
- Removed "Watch the group react" instruction from scene display frames (was distracting from actual observation)
- Removed scene counter from image frames, kept only on question screens
- Simplified instructions language from "two-clip movies" to "brief images showing groups of people"

### Rationale
User feedback: Telling people "watch the reactions" actually made them miss the reactions. Clean visual focus (just the image) allows for better observation.

---

## Known Limitations

1. **PDF Report Backend** — Not yet integrated; email opt-in form captures data but doesn't send report (see TASKS.md for implementation)

2. **PDF Generation** — Detailed report template not yet designed; needs to match original EAM report format with item-by-item breakdown

3. **Database Storage** — Reports not stored; once emailed, no record kept (may add later for analytics)

---

## Future Enhancements

- [ ] Download PDF button (in addition to email delivery)
- [ ] User feedback survey in confirmation email
- [ ] Assessment dashboard showing past results (requires database)
- [ ] Normative comparison data display
- [ ] Custom report branding for different organization deployments
