// Emotional Aperture Assessment — Stimulus Map
// correctPositive / correctNegative = % of 4 faces showing that emotion
// correctNeutral = remainder (faces showing neither positive nor negative)
// IMPORTANT: positive + negative + neutral = 100%
// Sliders are INDEPENDENT — do not need to sum to 100%
// Each scenario uses two image frames (-a and -b) displayed for 1750ms each
// Image names are intentionally neutral to prevent answer-key leakage

export const PRACTICE_SCENARIOS = [
  {
    id: 'practice-1',
    label: 'Practice 1',
    correctPositive: 50,
    correctNegative: 50,
    correctNeutral: 0,
    apertureType: 'practice',
    frame1: 'practice-1-a.jpg',
    frame2: 'practice-1-b.jpg',
  },
  {
    id: 'practice-2',
    label: 'Practice 2',
    correctPositive: 25,
    correctNegative: 75,
    correctNeutral: 0,
    apertureType: 'practice',
    frame1: 'practice-2-a.jpg',
    frame2: 'practice-2-b.jpg',
  },
]

export const QUIZ_SCENARIOS = [
  // Two-Emotion Blends
  { id: 'EA1',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA1',  frame1: 'EA1-a.jpg', frame2: 'EA1-b.jpg' },
  { id: 'EA2',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA2',  frame1: 'EA2-a.jpg', frame2: 'EA2-b.jpg' },
  { id: 'EA3',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA3',  frame1: 'EA3-a.jpg', frame2: 'EA3-b.jpg' },
  { id: 'EA4',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA4',  frame1: 'EA4-a.jpg', frame2: 'EA4-b.jpg' },
  { id: 'EA6',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA6',  frame1: 'EA6-a.jpg', frame2: 'EA6-b.jpg' },
  { id: 'EA7',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA7',  frame1: 'EA7-a.jpg', frame2: 'EA7-b.jpg' },
  { id: 'EA8',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA8',  frame1: 'EA8-a.jpg', frame2: 'EA8-b.jpg' },
  { id: 'EA9',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA9',  frame1: 'EA9-a.jpg', frame2: 'EA9-b.jpg' },
  // Emotion Transitions
  { id: 'EA5',  correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA5',  frame1: 'EA5-a.jpg', frame2: 'EA5-b.jpg' },
  { id: 'EA11', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA11', frame1: 'EA11-a.jpg', frame2: 'EA11-b.jpg' },
  // Single Emotion + Neutral — NOTE: neutral faces present, sliders independent
  { id: 'EA10', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA10', frame1: 'EA10-a.jpg', frame2: 'EA10-b.jpg' },
  { id: 'EA12', correctPositive: 0,   correctNegative: 50,  correctNeutral: 50,  apertureType: 'Single Emotion + Neutral', label: 'EA12', frame1: 'EA12-a.jpg', frame2: 'EA12-b.jpg' },
  { id: 'EA13', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA13', frame1: 'EA13-a.jpg', frame2: 'EA13-b.jpg' },
  { id: 'EA14', correctPositive: 0,   correctNegative: 75,  correctNeutral: 25,  apertureType: 'Single Emotion + Neutral', label: 'EA14', frame1: 'EA14-a.jpg', frame2: 'EA14-b.jpg' },
  // All-Negative
  { id: 'EA15', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Different',  label: 'EA15', frame1: 'EA15-a.jpg', frame2: 'EA15-b.jpg' },
  { id: 'EA16', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Similar',    label: 'EA16', frame1: 'EA16-a.jpg', frame2: 'EA16-b.jpg' },
  // All-Positive — NOTE: frame2 (EA17-b.jpg) is missing from image set; Lynn needs to supply the reaction frame
  { id: 'EA17', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'All-Positive',             label: 'EA17', frame1: 'EA17-a.jpg', frame2: 'EA17-b.jpg' },
]
