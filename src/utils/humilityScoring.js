// The Competent Humility Pulse Check — Scoring Engine
// Source: JSB web build spec (means on 1–5, 3 buckets + balance read)

import { HUMILITY_ITEMS, THRESHOLDS } from '../data/humilityItems.js'

function reverseScore(value) {
  return 6 - value
}

function mean(nums) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

export const BUCKETS = {
  wise: {
    key: 'wise',
    headline: 'A Wise Practitioner of Competent Humility',
    body:
      'You operate from your wheelhouse without propping yourself up where you don\'t belong, and you can say "I don\'t know yet" without feeling your authority drain out of the room. That pairing is rarer than it should be. You\'re problem-centered, not ego-centered: more interested in the best answer than in looking like you already have it. Keep bringing your misshapen ideas early, and keep making it safe for everyone around the table to bring theirs.',
    practice:
      'In your next high-stakes room, set the stage. Map the real complexity out loud before anyone reaches for a confident yes or no.',
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: A Wise Practitioner of Competent Humility.',
  },
  almost: {
    key: 'almost',
    headline: 'Almost There',
    body:
      'You hold one half of competent humility solidly. The other half is where your next gain is hiding. Competent humility is not confidence or humility alone. It is the two held together: competence you own, and limits you name. Your balance read below points to the side to lean into.',
    practice:
      'Take the one nudge from your balance read and use it once this week. One repetition changes the room more than a resolution.',
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: Almost There — building the full pairing of competence and humility.',
  },
  opportunity: {
    key: 'opportunity',
    headline: 'This Is Your Opportunity',
    body:
      'Right now, something is quietly costing you. Maybe it\'s fronting, projecting a confidence you don\'t feel, which is a full-time job that drains the very energy you\'d otherwise spend finding the answer. Maybe it\'s the opposite, keeping a call the room needs from you. Either way, the fix starts in the same place: pick one real uncertainty and name it, along with how you\'ll resolve it.',
    practice:
      'In your next meeting, say one sentence you\'ve been swallowing: "Here\'s what I don\'t know yet, and here\'s how we\'ll find out."',
    shareText:
      'I took The Competent Humility Pulse Check by Jeffrey Sanchez-Burks. Result: This Is Your Opportunity — one honest sentence in the next hard meeting is enough to start.',
  },
}

export const BALANCE = {
  competence_leads: {
    key: 'competence_leads',
    label: 'Competence leads',
    text:
      'You own the standard, but you may be under-inviting. The risk is fronting, or racing past complexity to a clean answer. Name one uncertainty before you name your call.',
  },
  humility_leads: {
    key: 'humility_leads',
    label: 'Humility leads',
    text:
      'You\'re open and teachable, but you may be under-owning. The room sometimes needs your judgment, not only your listening. Stop downplaying the call when you actually have one.',
  },
  in_step: {
    key: 'in_step',
    label: 'In step',
    text:
      'Your competence and your openness are moving together. That is the whole game. Protect it under pressure, which is exactly when the pull to front is strongest.',
  },
}

/**
 * @param {Record<string, number>} answers - { q1: 1-5, ... }
 * @returns scores or null if incomplete
 */
export function computeHumilityScores(answers) {
  const { wiseFloor, opportunityFloor, balanceGap } = THRESHOLDS

  // Require all 12
  for (const item of HUMILITY_ITEMS) {
    if (answers[item.id] == null) return null
  }

  const scoredById = {}
  const cVals = []
  const hVals = []
  const allVals = []

  HUMILITY_ITEMS.forEach((item) => {
    const raw = answers[item.id]
    const scored = item.reverse ? reverseScore(raw) : raw
    scoredById[item.id] = scored
    allVals.push(scored)
    if (item.axis === 'C') cVals.push(scored)
    else hVals.push(scored)
  })

  const competenceMean = mean(cVals)
  const humilityMean = mean(hVals)
  const overallMean = mean(allVals)

  let bucketKey
  if (competenceMean >= wiseFloor && humilityMean >= wiseFloor) {
    bucketKey = 'wise'
  } else if (
    Math.min(competenceMean, humilityMean) < opportunityFloor ||
    overallMean < opportunityFloor
  ) {
    bucketKey = 'opportunity'
  } else {
    bucketKey = 'almost'
  }

  const diff = competenceMean - humilityMean
  let balanceKey
  if (diff >= balanceGap) balanceKey = 'competence_leads'
  else if (diff <= -balanceGap) balanceKey = 'humility_leads'
  else balanceKey = 'in_step'

  return {
    competenceMean: round2(competenceMean),
    humilityMean: round2(humilityMean),
    overallMean: round2(overallMean),
    // 0–100 for meter fill (mean of 1–5 → (m-1)/4 * 100)
    competencePct: meanToPct(competenceMean),
    humilityPct: meanToPct(humilityMean),
    bucketKey,
    bucket: BUCKETS[bucketKey],
    balanceKey,
    balance: BALANCE[balanceKey],
    thresholds: THRESHOLDS,
    scoredById,
  }
}

function round2(n) {
  return Math.round(n * 100) / 100
}

function meanToPct(m) {
  return Math.round(((m - 1) / 4) * 100)
}

export { THRESHOLDS }
