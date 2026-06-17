// Emotional Aperture Assessment — Stimulus Map
// correctPositive / correctNegative = % of 4 faces showing that emotion
// correctNeutral = remainder (faces showing neither positive nor negative)
// IMPORTANT: positive + negative + neutral = 100%
// Sliders are INDEPENDENT — do not need to sum to 100%
// Each scenario uses two image frames (.1 and .2) displayed for 1750ms each

export const PRACTICE_SCENARIOS = [
  {
    id: 'practice-1',
    label: 'Practice 1',
    correctPositive: 50,
    correctNegative: 50,
    correctNeutral: 0,
    apertureType: 'practice',
    frame1: 'EA Practice 1.1.jpg',
    frame2: 'EA Practice 1.2.jpg',
  },
  {
    id: 'practice-2',
    label: 'Practice 2',
    correctPositive: 25,
    correctNegative: 75,
    correctNeutral: 0,
    apertureType: 'practice',
    frame1: 'EA Practice 2.1.jpg',
    frame2: 'EA Practice 2.2.jpg',
  },
]

export const QUIZ_SCENARIOS = [
  // Two-Emotion Blends
  { id: 'EA1',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA1',  frame1: 'EA1.1 happy25disgust75-neutral.jpg.jpg', frame2: 'EA1.2 happy25disgust75.jpg.jpg' },
  { id: 'EA2',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA2',  frame1: 'EA2.1 happy25sad75-neutral.jpg.jpg', frame2: 'EA2.2 happy25sad75.jpg.jpg' },
  { id: 'EA3',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA3',  frame1: 'EA3.1 happy25fear75-neutral.jpg.jpg', frame2: 'EA3.2 happy25fear75.jpg.jpg' },
  { id: 'EA4',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA4',  frame1: 'EA4.1 happy75fear25-neutral.jpg.jpg', frame2: 'EA4.2 happy75fear25.jpg' },
  { id: 'EA6',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA6',  frame1: 'EA6.1 happy25angry75-neutral.jpg', frame2: 'EA6.2 happy25angry75.jpg' },
  { id: 'EA7',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA7',  frame1: 'EA7.1 happy75angry25-neutral.jpg.jpg', frame2: 'EA7.2 happy75angry25.jpg.jpg' },
  { id: 'EA8',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA8',  frame1: 'EA8.1 sadhappy25-neutral.jpg.jpg', frame2: 'EA8.2 sadhappy25.jpg.jpg' },
  { id: 'EA9',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA9',  frame1: 'EA9.1 happy75disgust25-neutral.jpg.jpg', frame2: 'EA9.2 happy75disgust25.jpg.jpg' },
  // Emotion Transitions
  { id: 'EA5',  correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA5',  frame1: 'EA5.1 happytoangry-happy.jpg.jpg', frame2: 'EA5.2 happytoangry-angry.jpg' },
  { id: 'EA11', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA11', frame1: 'EA11.1 sadtohappy-sad.jpg.jpg', frame2: 'EA11.2 sadtohappy-happy.jpg.jpg' },
  // Single Emotion + Neutral — NOTE: neutral faces present, sliders independent
  { id: 'EA10', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA10', frame1: 'EA10.1 fear25-neutral.jpg.jpg', frame2: 'EA10.2 fear25.jpg.jpg' },
  { id: 'EA12', correctPositive: 0,   correctNegative: 50,  correctNeutral: 50,  apertureType: 'Single Emotion + Neutral', label: 'EA12', frame1: 'EA12.1 fear50-Neutral.jpg.jpg', frame2: 'EA12.2 fear50.jpg.jpg' },
  { id: 'EA13', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA13', frame1: 'EA13.1 angry25neutral75-Neutral.jpg.jpg', frame2: 'EA13.2 angry25neutral75.jpg.jpg' },
  { id: 'EA14', correctPositive: 0,   correctNegative: 75,  correctNeutral: 25,  apertureType: 'Single Emotion + Neutral', label: 'EA14', frame1: 'EA14.1 fear75-neutral.jpg.jpg', frame2: 'EA14.2 fear75.jpg.jpg' },
  // All-Negative
  { id: 'EA15', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Different',  label: 'EA15', frame1: 'EA15.1 AllNegDiff-Neutral.jpg', frame2: 'EA15.2 AllNegDiff.jpg' },
  { id: 'EA16', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Similar',    label: 'EA16', frame1: 'EA16.1Neutral.jpg', frame2: 'EA16.2 AllNegSimilar.jpg' },
  // All-Positive
  { id: 'EA17', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'All-Positive',             label: 'EA17', frame1: 'EA17.1 AllPos-neutral.jpg', frame2: 'EA17.1 AllPos.jpg' },
]
