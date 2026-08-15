/** Interactive content for Competent Humility playbook */

export const TRAPS = {
  certainty: {
    key: 'certainty',
    label: 'Certainty Actor',
    looksLike: 'Decisive optics; low genuine openness to alternatives',
    cost: 'Silent risk — team stops surfacing bad news',
    practice: 'Practice 4 — Invite the dissenting junior',
    script: 'What are we not seeing?',
    tip: 'Name the least senior person with exposure. Protect their answer. Thank them in the room.',
  },
  quiet: {
    key: 'quiet',
    label: 'Quiet Expert',
    looksLike: 'Deep skill; under-claims authority',
    cost: 'Vacuum filled by louder, less informed voices',
    practice: 'Practice 3 — Claim your craft out loud',
    script: 'Here’s where I’m confident — [domain]. Here’s where I want your pressure-test — [domain].',
    tip: 'Open one meeting with a competence claim before you open the floor. Orientation, not arrogance.',
  },
  open: {
    key: 'open',
    label: 'Open Amateur',
    looksLike: 'Invites input before owning a frame',
    cost: 'Drift; team loses the “adult in the room”',
    practice: 'Practice 1 — Know / Don’t know / Decide',
    script: 'Here’s what I know. Here’s what no one can really know. Here’s how we’ll decide — and by when.',
    tip: 'You still decide. Always close the loop: how and when.',
  },
  gold: {
    key: 'gold',
    label: 'Competent Humility Leader',
    looksLike: 'High craft + high openness',
    cost: 'The Gold Standard — protect it under pressure',
    practice: 'Practice 5 — Repair after certainty theater',
    script: 'In that meeting I overstated how settled this is. What’s still open is [X]. Here’s what I need from you now.',
    tip: 'Even strong leaders slip. Repair within 48 hours rebuilds more trust than a clean record.',
  },
}

export const PRACTICE_OF_DAY = [
  {
    n: 1,
    title: 'Know / Don’t know / Decide',
    line: 'Here’s what I know. Here’s what no one can really know at this point. Here’s how we’ll decide — and by when.',
    note: 'Keep authority without pretending omniscience.',
  },
  {
    n: 2,
    title: 'Pre-mortem honesty',
    line: 'It’s six months from now. This failed. What did we miss?',
    note: 'You go first with one real risk — not a safe one.',
  },
  {
    n: 3,
    title: 'Claim your craft',
    line: 'Here’s where I’m confident — [domain]. Here’s where I want your pressure-test — [domain].',
    note: 'For Quiet Experts: humility without a claim reads as absence.',
  },
  {
    n: 4,
    title: 'Invite the dissenting junior',
    line: 'What are we not seeing?',
    note: 'For Certainty Actors: protect the answer. Thank them in the room.',
  },
  {
    n: 5,
    title: 'Repair after certainty theater',
    line: 'In that meeting I overstated how settled this is. What’s still open is [X]. Here’s what I need now.',
    note: 'Within 48 hours. Silence teaches the wrong standard.',
  },
]

export function practiceOfTheDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const day = Math.floor((date - start) / 86400000)
  return PRACTICE_OF_DAY[day % PRACTICE_OF_DAY.length]
}
