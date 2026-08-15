/** Phrase bank for Phrase of the Day + interactive emotion helper */

export const EMOTION_CARDS = {
  anger: {
    key: 'anger',
    label: 'Anger',
    shortOf: 'Being heard before being handled',
    try: [
      'What landed hardest?',
      'Walk me through it.',
      'I’m not going to argue with how you feel. I will work the facts with you.',
    ],
    avoid: ['Calm down.', 'You’re overreacting.', 'Other people have it worse.'],
    sixty:
      'Ask what landed hardest. Listen without building your reply. Only then reach for options.',
  },
  sadness: {
    key: 'sadness',
    label: 'Sadness',
    shortOf: 'Permission to stop performing fine',
    try: [
      'No need to apologize for being human in a hard season.',
      'What would actually help this week?',
      'We can protect your focus without pretending you’re at a hundred percent.',
    ],
    avoid: ['Stay strong.', 'Chin up.', 'I know exactly how you feel.'],
    sixty:
      'Say the season is hard, ask what would help this week, then move one thing yourself.',
  },
  dejection: {
    key: 'dejection',
    label: 'Dejection',
    shortOf: 'Person separated from the performance',
    try: [
      'This stings. Feeling flattened after a miss like that is human. It isn’t the whole story.',
      'I’m not questioning whether you can do this. I’m thinking about how we recover.',
      'What’s one piece of this you still own that we can build from?',
    ],
    avoid: ['Everyone fails. Get over it.', 'This is a gift!', 'Quiet reassignment with no conversation.'],
    sixty:
      'Name the sting, separate the person from the outcome, agree one recovery move together.',
  },
}

/** Daily rotating phrases (question / sideways / Plan D lines) */
export const DAILY_PHRASES = [
  { line: 'What landed hardest?', note: 'Question, don’t diagnose.' },
  { line: 'I sense you’re processing something.', note: 'Say it sideways.' },
  { line: 'Do you have concerns about that change?', note: 'Turn it into a question.' },
  { line: 'Walk me through it.', note: 'Anger → agency without tone lectures.' },
  { line: 'What would actually help this week?', note: 'Sadness → concrete relief.' },
  { line: 'This stings. It isn’t the whole story.', note: 'Dejection → separate person from outcome.' },
  { line: 'I’m not going to argue with how you feel.', note: 'Stay in the room.' },
  { line: 'No need to apologize for being human in a hard season.', note: 'Permission to stop performing fine.' },
  { line: 'What’s one piece of this you still own that we can build from?', note: 'Recovery, not pep talk.' },
  { line: 'Stop typing. Turn your body toward them.', note: 'Sixty seconds — step one.' },
  { line: 'Wait longer than is comfortable.', note: 'The step everyone skips.' },
  { line: 'Somebody near you will tell you. Ask.', note: 'You don’t need to feel qualified first.' },
  { line: 'Quiet understanding is not agreement or a solution.', note: 'Plan D — make them feel seen.' },
  { line: 'Can we take thirty minutes at four?', note: 'Specific time beats vague delay.' },
  { line: 'I want to do this well and I’m not in the right headspace right now.', note: 'Distance without abandonment.' },
]

export function phraseOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const day = Math.floor((date - start) / 86400000)
  return DAILY_PHRASES[day % DAILY_PHRASES.length]
}
