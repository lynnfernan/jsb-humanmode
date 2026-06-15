// Emotional Aperture Assessment — Stimulus Map
// correctPositive / correctNegative = % of 4 faces showing that emotion
// correctNeutral = remainder (faces showing neither positive nor negative)
// IMPORTANT: positive + negative + neutral = 100%
// Sliders are INDEPENDENT — do not need to sum to 100%

export const PRACTICE_SCENARIOS = [
  {
    id: 'practice-1',
    gifFile: 'EA_Practice1.gif',
    label: 'Practice 1',
    correctPositive: 50,
    correctNegative: 50,
    correctNeutral: 0,
    apertureType: 'practice',
  },
  {
    id: 'practice-2',
    gifFile: 'EA_Practice2.gif',
    label: 'Practice 2',
    correctPositive: 25,
    correctNegative: 75,
    correctNeutral: 0,
    apertureType: 'practice',
  },
]

export const QUIZ_SCENARIOS = [
  // Two-Emotion Blends
  { id: 'EA1',  gifFile: 'EA1.gif',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA1'  },
  { id: 'EA2',  gifFile: 'EA2.gif',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA2'  },
  { id: 'EA3',  gifFile: 'EA3.gif',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA3'  },
  { id: 'EA4',  gifFile: 'EA4.gif',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA4'  },
  { id: 'EA6',  gifFile: 'EA6.gif',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA6'  },
  { id: 'EA7',  gifFile: 'EA7.gif',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA7'  },
  { id: 'EA8',  gifFile: 'EA8.gif',  correctPositive: 25,  correctNegative: 75,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA8'  },
  { id: 'EA9',  gifFile: 'EA9.gif',  correctPositive: 75,  correctNegative: 25,  correctNeutral: 0,   apertureType: 'Two-Emotion Blend',        label: 'EA9'  },
  // Emotion Transitions
  { id: 'EA5',  gifFile: 'EA5.gif',  correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA5'  },
  { id: 'EA11', gifFile: 'EA11.gif', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'Emotion Transition',       label: 'EA11' },
  // Single Emotion + Neutral — NOTE: neutral faces present, sliders independent
  { id: 'EA10', gifFile: 'EA10.gif', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA10' },
  { id: 'EA12', gifFile: 'EA12.gif', correctPositive: 0,   correctNegative: 50,  correctNeutral: 50,  apertureType: 'Single Emotion + Neutral', label: 'EA12' },
  { id: 'EA13', gifFile: 'EA13.gif', correctPositive: 0,   correctNegative: 25,  correctNeutral: 75,  apertureType: 'Single Emotion + Neutral', label: 'EA13' },
  { id: 'EA14', gifFile: 'EA14.gif', correctPositive: 0,   correctNegative: 75,  correctNeutral: 25,  apertureType: 'Single Emotion + Neutral', label: 'EA14' },
  // All-Negative
  { id: 'EA15', gifFile: 'EA15.gif', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Different',  label: 'EA15' },
  { id: 'EA16', gifFile: 'EA16.gif', correctPositive: 0,   correctNegative: 100, correctNeutral: 0,   apertureType: 'All-Negative, Similar',    label: 'EA16' },
  // All-Positive
  { id: 'EA17', gifFile: 'EA17.gif', correctPositive: 100, correctNegative: 0,   correctNeutral: 0,   apertureType: 'All-Positive',             label: 'EA17' },
]
