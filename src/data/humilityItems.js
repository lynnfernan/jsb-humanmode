// The Competent Humility Pulse Check — Item Bank
// Source of truth: JSB "Competent Humility Pulse Check — web build spec.md"
// Do NOT show subscale letters or reverse flags to the taker.

export const PULSE_META = {
  title: 'The Competent Humility Pulse Check',
  tagline: 'Human Mode, Always.',
  bookCredit: 'Concepts from Human Mode (HarperCollins, 2026), Part III.',
  creditLine:
    'Item design adapted from published humility measures (Owens, Johnson & Mitchell, 2013; Krumrei-Mancuso & Rouse, 2016; Leary et al., 2017), paired with a competence dimension. Concepts from Human Mode (HarperCollins, 2026), Part III.',
  // Soft book CTA
  bookUrl: 'https://www.jeffreysanchezburks.com/',
  bookLabel: 'Human Mode — Reserve Your Copy',
}

export const HUMILITY_ITEMS = [
  {
    id: 'q1',
    text: 'In meetings, I regularly say some version of, "I don\'t know yet. Here\'s how we\'ll find out."',
    axis: 'H',
    reverse: false,
  },
  {
    id: 'q2',
    text: 'When I make a call, people can tell I own the standard and the outcome.',
    axis: 'C',
    reverse: false,
  },
  {
    id: 'q3',
    text: 'Admitting uncertainty in front of my team would weaken my authority.',
    axis: 'H',
    reverse: true,
  },
  {
    id: 'q4',
    text: 'I can name the two or three domains where my judgment is strongest, without hedging.',
    axis: 'C',
    reverse: false,
  },
  {
    id: 'q5',
    text: 'When a junior person challenges my view with data, I treat it as useful, not as a status threat.',
    axis: 'H',
    reverse: false,
  },
  {
    id: 'q6',
    text: 'Under board or investor pressure, I tighten into "we\'ve got this" even when I\'m not sure.',
    axis: 'H',
    reverse: true,
  },
  {
    id: 'q7',
    text: 'My team would say I set clear bars for quality, not just "do your best."',
    axis: 'C',
    reverse: false,
  },
  {
    id: 'q8',
    text: 'I ask at least one question in high-stakes rooms that I don\'t already know the answer to.',
    axis: 'H',
    reverse: false,
  },
  {
    id: 'q9',
    text: 'I downplay my expertise so I don\'t seem arrogant, even when the room needs my call.',
    axis: 'C',
    reverse: true,
  },
  {
    id: 'q10',
    text: 'After a miss, I can name what I didn\'t see without collapsing into self-attack or blame-shifting.',
    axis: 'H',
    reverse: false,
  },
  {
    id: 'q11',
    text: 'People leave conversations with me clearer on direction, not just heard.',
    axis: 'C',
    reverse: false,
  },
  {
    id: 'q12',
    text: 'I reach for "projecting confidence" more often than "naming complexity."',
    axis: 'H',
    reverse: true,
  },
]

// Radio 1–5 — every point labeled for clarity
export const LIKERT_LABELS = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neither agree nor disagree' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
]

// Named constants — JSB can recalibrate after real response data
export const THRESHOLDS = {
  wiseFloor: 3.75,
  opportunityFloor: 3.0,
  balanceGap: 0.75,
}

export const SUBSCALES = {
  C: { label: 'Competence Ownership', items: ['q2', 'q4', 'q7', 'q9', 'q11'] },
  H: { label: 'Humility / Openness', items: ['q1', 'q3', 'q5', 'q6', 'q8', 'q10', 'q12'] },
}
