/** Interactive content for Bricolage · Tap the Rest of You */

export const INSIDE = [
  {
    label: 'What Bricolage is',
    gloss:
      'Adaptive resourcefulness: solve with what is already here, not the perfect plan you do not have yet.',
  },
  {
    label: 'Three materials',
    gloss: 'Lived memory · tools at hand · constraints as design input.',
  },
  {
    label: '60-Second Memory Forage',
    gloss: 'Digital twin of the Bricolage Lab. Challenge → timer → specific person → next move.',
  },
  {
    label: 'Five practices',
    gloss:
      'Forage · inventory before the gap list · two odd tools · rough artifact · debrief what you almost ignored.',
  },
  {
    label: 'Overlooked-resource prompts',
    gloss:
      'Work mode locked the boxes worth opening: a summer job, a garden, a film you swore you forgot.',
  },
  {
    label: '30-day loop',
    gloss: 'One focus per week so the skill sticks after the meeting ends.',
  },
]

/** High-end forage deck: person / tool / constraint / locked box */
export const RESOURCE_DECK = [
  { suit: 'Person', card: 'Your grandmother (or the person who negotiated scarcity with grace)' },
  { suit: 'Person', card: 'A former boss who held a hard room without raising their voice' },
  { suit: 'Person', card: 'A child who asked the obvious question adults stopped asking' },
  { suit: 'Person', card: 'A colleague from another industry who solved a cousin of this' },
  { suit: 'Person', card: 'The version of you from a summer job you hated at sixteen' },
  { suit: 'Tool', card: 'Software already paid for and half-used' },
  { suit: 'Tool', card: 'A template someone abandoned that still has one good page' },
  { suit: 'Tool', card: 'Slack threads or notes from a prior attempt' },
  { suit: 'Tool', card: 'A junior with data nobody has asked for yet' },
  { suit: 'Tool', card: 'A partner favor you have not called in' },
  { suit: 'Constraint', card: 'Time so short it forces a smaller first move' },
  { suit: 'Constraint', card: 'Budget that will not move this quarter' },
  { suit: 'Constraint', card: 'Politics: “we can’t do that here” as a design rule' },
  { suit: 'Locked box', card: 'Your grandmother’s garden (what grew under constraint)' },
  { suit: 'Locked box', card: 'A film you’d swear you forgot (a shape you still carry)' },
  { suit: 'Locked box', card: 'A failure that taught you a usable pattern' },
]

export const MATERIALS = {
  memory: {
    key: 'memory',
    label: 'Lived memory',
    prompt: 'Who have I known who solved a cousin of this problem?',
    tip: 'Name a specific person. Ask how they would solve this with what they had. The output is a next move, not a story.',
    move: 'Write one usable next move from their playbook, not the perfect plan.',
  },
  tools: {
    key: 'tools',
    label: 'Tools at hand',
    prompt: 'What is already paid for, built, or one hop away?',
    tip: 'Software already licensed. Half-built process. Slack threads. A junior with data. A partner who owes you a favor.',
    move: 'Name one tool you will actually use in the next 48 hours.',
  },
  constraints: {
    key: 'constraints',
    label: 'Constraints',
    prompt: 'What design parameter forces a smarter combination?',
    tip: 'Time, money, and “we can’t do that here” are design inputs. A constraint forces recombination.',
    move: 'State the constraint as design: “Given X, we will try Y this week.”',
  },
}

export const PRACTICES = [
  {
    n: 1,
    title: '60-Second Memory Forage',
    line: 'How would they solve this with what they had?',
    note: 'Challenge → timer → specific person → next move. Not nostalgia.',
    when: 'You are stuck, or the room is waiting for conditions that will not arrive this week.',
    steps: [
      'Name the challenge in one sentence.',
      'Set a 60-second timer.',
      'Summon a specific person (grandmother, former boss, child…).',
      'Ask: How would they solve this with what they had?',
      'Write one usable next move, not the perfect plan.',
    ],
    anti: 'Treating the forage as nostalgia. The output is a next move, not a story.',
  },
  {
    n: 2,
    title: 'Inventory before the gap list',
    line: 'Before we name what we don’t have, let’s name what we do.',
    note: 'People, tools, prior scraps, then the true gaps.',
    when: 'The first slide of the meeting is “what we need.”',
    steps: [
      'What people are already in this room (or one Slack hop away)?',
      'What tools are already paid for?',
      'What prior attempts left reusable scraps?',
      'Then list the true gaps.',
    ],
    anti: 'Inventory as performative optimism. Be specific: names, tools, artifacts.',
  },
  {
    n: 3,
    title: 'Two odd tools, one problem',
    line: 'What if both disciplines had to show up?',
    note: 'Force a recombination. End with a 48-hour try.',
    when: 'The team is stuck in a single-domain frame.',
    steps: [
      'Pick the stuck problem.',
      'Name two tools or disciplines that “don’t belong” together.',
      'Ask what a solution would look like if both had to show up.',
      'End with: what will we try in 48 hours?',
    ],
    anti: 'Random mashups with no decision path.',
  },
  {
    n: 4,
    title: 'Rough artifact in 24 hours',
    line: 'We need something that can be wrong in public.',
    note: 'Early and testable, not careless.',
    when: 'The group is polishing a deck before testing anything.',
    steps: [
      'Define the smallest thing that would teach you something true.',
      'Examples: one-page prototype, five calls, one ugly scenario model, one-week pilot.',
      'Script: We don’t need the finished version. We need a rough artifact by tomorrow.',
      'Ship before the next “we need more research” loop.',
    ],
    anti: 'Rough as excuse for low standards. Rough means early and testable.',
  },
  {
    n: 5,
    title: 'Debrief the forage',
    line: 'What did we almost dismiss as not professional enough?',
    note: 'Celebrate foraging, not overwork.',
    when: 'After a win, a miss, or a scramble.',
    steps: [
      'What did we use that was already here?',
      'What memory or person changed the approach?',
      'What did we almost dismiss as “not professional enough”?',
      'What will we inventory first next time?',
    ],
    anti: 'Only celebrating heroics.',
  },
]

export function practiceOfTheDay() {
  const day = Math.floor(Date.now() / 86400000)
  return PRACTICES[day % PRACTICES.length]
}

export function drawResource(excludeIndex = -1) {
  let i = Math.floor(Math.random() * RESOURCE_DECK.length)
  if (RESOURCE_DECK.length > 1 && i === excludeIndex) {
    i = (i + 1) % RESOURCE_DECK.length
  }
  return { ...RESOURCE_DECK[i], index: i }
}

export const FORAGE_STEPS = PRACTICES[0].steps

export const WEEKLY_LOOP = [
  { week: 1, focus: 'Run the 60-Second Memory Forage three times on live stuck points' },
  { week: 2, focus: 'Open one meeting with room inventory before the gap list' },
  { week: 3, focus: 'Force one “two odd tools” recombination + 48-hour try' },
  { week: 4, focus: 'Ship one rough artifact; debrief what you almost ignored' },
]
