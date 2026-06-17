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
  },
  {
    id: 'practice-2',
    label: 'Practice 2',
    correctPositive: 25,
    correctNegative: 75,
    correctNeutral: 0,
    apertureType: 'practice',
  },
]

export const QUIZ_SCENARIOS = [
  // Two-Emotion Blends
  { id: 'EA1',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA1'  },
  { id: 'EA2',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA2'  },
  { id: 'EA3',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA3'  },
  { id: 'EA4',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA4'  },
  { id: 'EA6',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA6'  },
  { id: 'EA7',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA7'  },
  { id: 'EA8',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA8'  },
  { id: 'EA9',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA9'  },
  // Emotion Transitions
  { id: 'EA5',  correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA5'  },
  { id: 'EA11', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA11' },
  // Single Emotion + Neutral — NOTE: neutral faces present, sliders independent
  { id: 'EA10', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA10' },
  { id: 'EA12', correctPositive: 0,   correctNegative: 50,  correctNeutral: 50,  apertureType: 'Single Emotion + Neutral', label: 'EA12' },
  { id: 'EA13', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA13' },
  { id: 'EA14', correctPositive: 0,   correctNegative: 75,  correctNeutral: 25,  apertureType: 'Single Emotion + Neutral', label: 'EA14' },
  // All-Negative
  { id: 'EA15', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Different',  label: 'EA15' },
  { id: 'EA16', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Similar',    label: 'EA16' },
  // All-Positive
  { id: 'EA17', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'All-Positive',             label: 'EA17' },
]
