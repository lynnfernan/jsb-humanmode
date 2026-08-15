/** Interactive content for Becoming a Bricoleur field guide */

export const MATERIALS = {
  memory: {
    key: 'memory',
    label: 'Lived memory',
    prompt: 'Who have I known who solved a cousin of this problem?',
    tip: 'Name a specific person — grandmother, former boss, mentor, child, colleague from another industry. Ask how they would solve this with what they had. The output is a next move, not a story.',
    move: 'Write one usable next move from their playbook — not the perfect plan.',
  },
  tools: {
    key: 'tools',
    label: 'Tools at hand',
    prompt: 'What is already paid for, built, or one hop away?',
    tip: 'Software already licensed. Half-built process. Slack threads. A junior with data. A partner who owes you a favor. A template with one good page.',
    move: 'Name one tool you will actually use in the next 48 hours.',
  },
  constraints: {
    key: 'constraints',
    label: 'Constraints',
    prompt: 'What design parameter forces a smarter combination?',
    tip: 'Time, money, politics, and “we can’t do that here” are not only obstacles. A constraint forces recombination — the Bricoleur’s craft.',
    move: 'State the constraint as a design input: “Given X, we will try Y this week.”',
  },
}

export const PRACTICES = [
  {
    n: 1,
    title: '60-Second Memory Forage',
    line: 'How would they solve this with what they had?',
    note: 'Challenge → timer → specific person → next move. Not nostalgia.',
  },
  {
    n: 2,
    title: 'Inventory before the gap list',
    line: 'Before we name what we don’t have, let’s name what we do.',
    note: 'People, tools, prior scraps — then the true gaps.',
  },
  {
    n: 3,
    title: 'Two odd tools, one problem',
    line: 'What if both disciplines had to show up?',
    note: 'Force a recombination. End with a 48-hour try.',
  },
  {
    n: 4,
    title: 'Rough artifact in 24 hours',
    line: 'We need something that can be wrong in public.',
    note: 'Early and testable — not careless.',
  },
  {
    n: 5,
    title: 'Debrief the forage',
    line: 'What did we almost dismiss as not professional enough?',
    note: 'Celebrate foraging, not overwork.',
  },
]

export function practiceOfTheDay() {
  const day = Math.floor(Date.now() / 86400000)
  return PRACTICES[day % PRACTICES.length]
}

export const FORAGE_STEPS = [
  'Name the challenge in one sentence.',
  'Set a 60-second timer.',
  'Summon a specific person (grandmother, former boss, child…).',
  'Ask: How would they solve this with what they had?',
  'Write one usable next move — not the perfect plan.',
]
