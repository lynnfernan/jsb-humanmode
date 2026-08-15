// ─────────────────────────────────────────────────────────────────────────────
// The Competent Humility Pulse Check — final data and copy (JSB v2)
// Route: /competent-humility          Prepared 2026-07-27 · shipped 2026-08-10
//
// Companion to "Competent Humility Pulse Check - Developer Handoff.docx".
// Retires the two-subscale model: 8 items, one mean, no balance read.
// Curly quotation marks preserved from JSB handoff.
// ─────────────────────────────────────────────────────────────────────────────

// Twelve become eight. One scale — no `axis` field.
// Items 2, 4 and 6 are reverse-scored.

export const HUMILITY_ITEMS = [
  {
    id: 'q1',
    text: `It is common for me to say some version of, “I don’t know yet. Do you see a possible solution?”`,
    reverse: false,
  },
  {
    id: 'q2',
    text: 'Even when an idea is half-formed, I polish it before anyone sees it: tidy slides, AI-smoothed language, a mockup that looks finished.',
    reverse: true,
  },
  {
    id: 'q3',
    text: 'A trash bin full of ruled-out ideas feels like progress to me, not a wasted team meeting.',
    reverse: false,
  },
  {
    id: 'q4',
    text: 'Even when nobody could know the answer, I worry that sounding humble will get me marked down as less competent.',
    reverse: true,
  },
  {
    id: 'q5',
    text: `Once I’ve laid out how complicated the situation really is, I name both the things I feel strongly about and the places I’m unsure.`,
    reverse: false,
  },
  {
    id: 'q6',
    text: `When I float a new idea, even one that came to me the night before, what I’m really hoping for is approval.`,
    reverse: true,
  },
  {
    id: 'q7',
    text: `When something matters, I ask at least one question I don’t already know the answer to.`,
    reverse: false,
  },
  {
    id: 'q8',
    text: 'When someone with less experience pushes back with evidence, I take it as useful, not as a threat.',
    reverse: false,
  },
]

// Alias for handoff naming
export const ITEMS = HUMILITY_ITEMS

export const LIKERT_LABELS = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neither agree nor disagree' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
]

export const SCALE = LIKERT_LABELS

// One mean across all eight items. balanceGap retired with two-subscale model.
export const THRESHOLDS = {
  wiseFloor: 3.75, // raw total 30 of 40 and up
  opportunityFloor: 3.0, // raw total 23 and below → opportunity
}

// Results: body is an array of paragraphs — render each separately.
export const RESULTS = {
  wise: {
    key: 'wise',
    headline: 'A Wise Practitioner of Competent Humility',
    body: [
      `You operate from your wheelhouse without propping yourself up where you don’t belong, and you can say “I don’t know yet” without feeling your authority drain out of the room. That is rarer than it should be. You’re problem-centered, not ego-centered: more interested in the best answer than in looking like you already have it.`,
      `Which means your next move isn’t about you. Nobody hears that it’s safe to bring a rough idea. They watch to see what happens to the person who does. When you name your own uncertainty out loud, and when you credit the half-formed suggestion that beat your polished one, you’re setting the price of admission for everyone else in the room. Keep bringing your misshapen ideas early. The point now is the ones you make room for.`,
    ],
    practice: `In your next meeting, map the real complexity out loud before anyone reaches for a confident yes or no. Then ask the quietest person what they’d try, and take the rough answer seriously where everyone can see.`,
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: A Wise Practitioner of Competent Humility.',
  },
  almost: {
    key: 'almost',
    headline: 'Almost There',
    body: [
      `You already do this, some of the time. A score in this band usually isn’t someone missing the instinct. It’s someone who has it right up until the stakes rise, and then the old training takes over: tidy the idea, sound sure, wait until you’re certain before you speak. That’s worth knowing, because it tells you where the practice happens. Not in the easy meeting where being candid costs nothing. In the one you’re slightly dreading.`,
    ],
    practice: `Before the meeting you’re least looking forward to, write down two things. One, the plain case for why this situation is more complicated than it looks. Two, the one thing you don’t know. Say them in that order, in the first five minutes, before anyone has staked out a position.`,
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: Almost There. The next hard meeting is where it gets built.',
  },
  opportunity: {
    key: 'opportunity',
    headline: 'This Is Your Opportunity',
    body: [
      `Right now, something is quietly costing you. Projecting a confidence you don’t feel is a full-time job, and it draws down the very energy you’d otherwise spend finding the answer. It also costs you the help, because nobody offers a solution to someone who looks like they have it handled. The fix is smaller than it seems. Pick one real uncertainty and say it out loud, along with what you’d do to resolve it.`,
    ],
    practice: `In your next meeting, name the complexity first. Say out loud why the situation is harder than it looks and how much of it nobody knows yet. Once that is on the table, the sentence you’ve been swallowing costs you almost nothing: “I don’t know yet. Let’s work through this.”`,
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: This Is Your Opportunity. One honest sentence in the next hard meeting is enough to start.',
  },
}

export const COPY = {
  eyebrow: 'Drop the Certainty Theater · Pulse Check · 2 min',
  title: 'The Competent Humility Pulse Check',
  tagline: 'Human Mode, Always.',
  standfirst: `Humility usually gets cast as the counterweight to competence, the thing that keeps expertise from curdling into arrogance. Competent Humility says otherwise. Knowing where your knowledge ends, and knowing the art of how and when to say so out loud, is itself a competence.`,
  chips: [
    { icon: '⏱', label: '2 minutes' },
    { icon: '📋', label: '8 statements' },
    { icon: '🎯', label: 'Instant read' },
  ],
  introBody: `Eight statements about how you’ve actually been working lately, not the person you’re aiming to be. It won’t grade your character. It will show you where you already practice Competent Humility, where there’s room, and one thing to try this week.`,
  introNudge: `Answer fast and answer honestly if you want the results to identify opportunities for you. A flattering answer only fools the one person the score is for.`,
  startButton: 'Start the Pulse Check →',
  introFooter: 'No account required · Results stay on your device',
  itemPrompt: 'How true has this been for you over the last few months?',
  scaleHint: '1 = Strongly disagree · 5 = Strongly agree',
  scoreLabel: 'Your Competent Humility score',
  creditLine: `The statements are original to this assessment. The construct builds on published work on humility and its measurement (Owens, Johnson & Mitchell, 2013; Krumrei-Mancuso & Rouse, 2016; Leary et al., 2017). Competent Humility is developed in Human Mode (HarperCollins, 2027), Part III.`,
  // Soft book link kept secondary; results close on practice per JSB handoff §8
  bookUrl: 'https://www.jeffreysanchezburks.com/',
  bookLabel: 'Human Mode — Reserve Your Copy',
}

// Back-compat for older imports
export const PULSE_META = {
  title: COPY.title,
  tagline: COPY.tagline,
  bookCredit: 'Concepts from Human Mode (HarperCollins, 2027), Part III.',
  creditLine: COPY.creditLine,
  bookUrl: COPY.bookUrl,
  bookLabel: COPY.bookLabel,
}
