# EAM Assessment Implementation — Phase 1

## Overview
Redesigned and rebuilt the Emotional Aperture Measure™ (EAM) assessment web application to match the Qualtrics survey format with frame-based image display system.

## Changes Made

### 1. Messaging & Instructions (Qualtrics-Aligned)
**Files Modified:** `src/components/Instructions.jsx`, `src/components/LeadCapture.jsx`

Updated three instruction screens to exactly match Qualtrics EAM assessment format:

**Screen 1 — Lead Capture:**
- Title: "The Emotional Aperture Measure™ (EAM) Assessment"
- Description: "This survey focuses on how people recognize the emotions that other people express."
- Technical note: JavaScript and image loading requirements
- Email/Name capture fields

**Screen 2 — Full Instructions:**
- "Read the following instructions carefully:" heading
- 5 numbered instruction points (formatted exactly as Qualtrics original)
- Key note about positive/negative reactions not summing to 100%
- Example scenario explaining neutral faces
- Practice trial information
- Timing note (8 minutes to complete)

**Screen 3 — Pre-Practice:**
- "Next you will complete your two practice trials."
- "The movie clips are extremely brief so please focus carefully on your screen."
- "Click to begin."

### 2. Frame-Based Image System
**Files Modified:** `src/components/SceneDisplay.jsx`, `src/data/scenarios.js`

Replaced GIF-based video with two-frame image sequences:
- **Frame 1 (.1):** Neutral baseline state (displays 1750ms)
- **Frame 2 (.2):** Emotional response state (displays 1750ms)
- Each scenario cycles through both frames in sequence
- Images moved to `public/images/` directory
- Naming convention preserved descriptive filenames (e.g., "EA1.1 happy25disgust75-neutral.jpg.jpg")

**Scenarios Mapped:**
- 2 practice scenarios with corresponding image frames
- 17 quiz scenarios (EA1-EA17) with frame mappings
- Each scenario includes frame1/frame2 properties linking to actual image files

### 3. Missing Components Created
**Files Created:** 
- `src/components/SceneDisplay.jsx` — Displays image frames with 1750ms timing
- `src/components/TopBar.jsx` — Navigation header with brand info and badge
- `src/components/ProgressBar.jsx` — Quiz progress visualization
- `src/components/Results.jsx` — Results screen (placeholder; pending psychologist input)

### 4. Image Container Styling
**Files Modified:** `src/index.css`

Added `.scene-display` CSS styling:
```css
.scene-display {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin: 1.5rem 0;
}

.scene-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
```

Ensures full image visibility without cropping on all question screens.

## File Structure
```
jsb-humanmode/
├── public/
│   └── images/               (40 image files, organized by scenario)
│       ├── EA Practice 1.1.jpg
│       ├── EA Practice 1.2.jpg
│       ├── EA1.1 happy25disgust75-neutral.jpg.jpg
│       ├── EA1.2 happy25disgust75.jpg.jpg
│       └── ... (EA2-EA17 frames)
├── src/
│   ├── components/
│   │   ├── Instructions.jsx  (3-screen instruction flow)
│   │   ├── LeadCapture.jsx   (name/email entry)
│   │   ├── SceneDisplay.jsx  (frame-based image display)
│   │   ├── TopBar.jsx        (header/navigation)
│   │   ├── ProgressBar.jsx   (quiz progress)
│   │   ├── Results.jsx       (results screen — in progress)
│   │   └── QuestionSliders.jsx (response capture)
│   ├── data/
│   │   └── scenarios.js      (practice + 17 quiz scenarios with frame mappings)
│   ├── App.jsx               (main app state machine)
│   └── index.css             (styling)
└── vercel.json              (Vercel config)
```

## App Flow
1. **Lead Capture** → Name & email entry
2. **Instructions** → 3-screen onboarding (messaging matched to Qualtrics)
3. **Practice** → 2 practice scenarios with immediate feedback
4. **Quiz Intro** → Transition message
5. **Quiz** → 17 scenarios with slider responses
6. **Results** → [Pending psychologist scoring/profile guidance]

## Technology Stack
- **Frontend:** React + Vite
- **Styling:** CSS with design tokens (navy, slate, cream, etc.)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Images:** 40 JPG files (portrait frames, 1750ms timing each)

## Next Phase
Results screen design pending clarification on:
- Scoring methodology (how responses map to scores)
- Profile types (categories based on aperture scores)
- High-level summary display format
- Detailed report content & delivery method
- Email opt-in flow for detailed report

## Commits
- `dea84ce` — Update EAM assessment with Qualtrics messaging and frame-based image system
- `6340e3c` — Add image files and update scenarios with frame mappings
- `822aedf` — Expand scene display container to show full images

## Deployed
Live at: https://jsb-humanmode.vercel.app/
