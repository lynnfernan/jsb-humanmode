// Each scenario defines the 4 faces shown in the "after/reaction" clip.
// Emotions: 'positive' (happy) | 'negative' (sad)
// Correct percentages are exact: 1 person = 25%, 2 = 50%, 3 = 75%, 4 = 100%

export const PRACTICE_SCENARIOS = [
  {
    id: 'p1',
    faces: ['positive', 'negative', 'positive', 'negative'],
    correctPositive: 50,
    correctNegative: 50,
  },
  {
    id: 'p2',
    faces: ['positive', 'positive', 'positive', 'negative'],
    correctPositive: 75,
    correctNegative: 25,
  },
]

export const QUIZ_SCENARIOS = [
  { id: 1,  faces: ['positive', 'positive', 'positive', 'positive'], correctPositive: 100, correctNegative: 0   },
  { id: 2,  faces: ['negative', 'negative', 'negative', 'negative'], correctPositive: 0,   correctNegative: 100 },
  { id: 3,  faces: ['positive', 'positive', 'negative', 'negative'], correctPositive: 50,  correctNegative: 50  },
  { id: 4,  faces: ['positive', 'negative', 'negative', 'negative'], correctPositive: 25,  correctNegative: 75  },
  { id: 5,  faces: ['positive', 'positive', 'positive', 'negative'], correctPositive: 75,  correctNegative: 25  },
  { id: 6,  faces: ['negative', 'positive', 'positive', 'positive'], correctPositive: 75,  correctNegative: 25  },
  { id: 7,  faces: ['negative', 'negative', 'positive', 'negative'], correctPositive: 25,  correctNegative: 75  },
  { id: 8,  faces: ['negative', 'positive', 'negative', 'positive'], correctPositive: 50,  correctNegative: 50  },
  { id: 9,  faces: ['positive', 'negative', 'positive', 'negative'], correctPositive: 50,  correctNegative: 50  },
  { id: 10, faces: ['negative', 'negative', 'negative', 'positive'], correctPositive: 25,  correctNegative: 75  },
  { id: 11, faces: ['positive', 'negative', 'positive', 'positive'], correctPositive: 75,  correctNegative: 25  },
  { id: 12, faces: ['negative', 'negative', 'positive', 'positive'], correctPositive: 50,  correctNegative: 50  },
  { id: 13, faces: ['positive', 'negative', 'negative', 'positive'], correctPositive: 50,  correctNegative: 50  },
  { id: 14, faces: ['positive', 'positive', 'negative', 'positive'], correctPositive: 75,  correctNegative: 25  },
  { id: 15, faces: ['negative', 'positive', 'negative', 'negative'], correctPositive: 25,  correctNegative: 75  },
  { id: 16, faces: ['positive', 'positive', 'positive', 'positive'], correctPositive: 100, correctNegative: 0   },
  { id: 17, faces: ['negative', 'negative', 'negative', 'negative'], correctPositive: 0,   correctNegative: 100 },
  { id: 18, faces: ['positive', 'negative', 'negative', 'negative'], correctPositive: 25,  correctNegative: 75  },
  { id: 19, faces: ['negative', 'positive', 'positive', 'negative'], correctPositive: 50,  correctNegative: 50  },
  { id: 20, faces: ['negative', 'positive', 'positive', 'positive'], correctPositive: 75,  correctNegative: 25  },
  { id: 21, faces: ['positive', 'negative', 'positive', 'positive'], correctPositive: 75,  correctNegative: 25  },
  { id: 22, faces: ['negative', 'negative', 'positive', 'negative'], correctPositive: 25,  correctNegative: 75  },
]
