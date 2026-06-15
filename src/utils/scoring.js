// Emotional Aperture — Scoring Engine
// Based on original EAM instrument (Sanchez-Burks)
//
// CRITICAL: Positive and negative are scored INDEPENDENTLY.
// Some scenarios have neutral faces — pos + neg may not equal 100%.
// Error = absolute deviation from correct percentage for each dimension.
// Lower error = higher aperture accuracy.

export function computeScores(responses, scenarios) {
  if (!responses || responses.length === 0) return null

  const itemScores = responses.map((resp, i) => {
    const scenario = scenarios[i]
    if (!scenario) return null

    const posError = Math.abs(resp.posEstimate - scenario.correctPositive)
    const negError = Math.abs(resp.negEstimate - scenario.correctNegative)
    // Average error across both dimensions
    const avgError = (posError + negError) / 2
    const accuracy = Math.max(0, 100 - avgError)

    return {
      id: scenario.id,
      apertureType: scenario.apertureType,
      posEstimate: resp.posEstimate,
      negEstimate: resp.negEstimate,
      correctPositive: scenario.correctPositive,
      correctNegative: scenario.correctNegative,
      correctNeutral: scenario.correctNeutral || 0,
      posError,
      negError,
      avgError,
      accuracy,
    }
  }).filter(Boolean)

  // Overall accuracy
  const overallAccuracy = Math.round(
    itemScores.reduce((sum, s) => sum + s.accuracy, 0) / itemScores.length
  )

  // Accuracy by aperture type
  const byType = {}
  itemScores.forEach((s) => {
    if (!byType[s.apertureType]) byType[s.apertureType] = []
    byType[s.apertureType].push(s.accuracy)
  })

  const typeScores = Object.entries(byType).map(([type, scores]) => ({
    type,
    accuracy: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    count: scores.length,
  })).sort((a, b) => b.accuracy - a.accuracy)

  // Positive bias: does the person consistently over/under-estimate positive?
  const posBiases = itemScores.map(s => s.posEstimate - s.correctPositive)
  const avgPosBias = posBiases.reduce((a, b) => a + b, 0) / posBiases.length

  // Neutral sensitivity: on scenarios with neutral faces, do they miss the neutral?
  const neutralScenarios = itemScores.filter(s => s.correctNeutral > 0)
  const missesNeutral = neutralScenarios.length > 0 &&
    neutralScenarios.every(s => (s.posEstimate + s.negEstimate) > (100 - s.correctNeutral + 15))

  const profile = assignProfile(overallAccuracy, avgPosBias, typeScores, missesNeutral)

  return {
    overallAccuracy,
    typeScores,
    avgPosBias: Math.round(avgPosBias),
    missesNeutral,
    profile,
    itemScores,
    totalItems: itemScores.length,
  }
}

function assignProfile(accuracy, bias, typeScores, missesNeutral) {
  if (accuracy >= 80) {
    return {
      name: 'The Wide-Angle Reader',
      tagline: 'You see the full emotional landscape.',
      insight: `Most people lock onto one or two faces and assume they represent the group. You don't. You track the spread — who's energized, who's struggling, where the tension is quietly building. You also picked up on the neutral faces — the people who weren't visibly reacting — which is the hardest signal to read accurately.\n\nJeffrey's research shows this is the rarest and most consequential leadership skill. In teams, it's the difference between seeing a problem coming and being surprised by it.\n\nYour next edge: the moments that will test this skill aren't the obvious ones. They're the meetings where everything looks fine on the surface. Keep scanning even when the room seems calm.`,
      strength: 'Reading mixed and complex emotional distributions',
      shareText: 'I just took the Emotional Aperture Assessment by Jeffrey Sanchez-Burks and scored in the top tier. Turns out I can read a room better than I thought.',
    }
  }

  if (accuracy >= 65) {
    if (missesNeutral) {
      return {
        name: 'The Binary Reader',
        tagline: 'You see emotion clearly — but miss who isn\'t showing any.',
        insight: `You read positive and negative signals well. Where the data shows a gap: the neutral faces — the people in the room who aren't visibly reacting to anything.\n\nIn the real world, neutral doesn't mean fine. It often means disengaged, uncertain, or holding back. When a leader misses the neutral third of the room, they're misreading the actual emotional landscape by a wide margin.\n\nOne practice: after your next team meeting, ask yourself not just "who seemed upset or energized?" but "who seemed like they weren't there at all?" That's your aperture expanding.`,
        strength: 'Detecting clear emotional signals',
        shareText: 'The Emotional Aperture Assessment revealed my blind spot: I read emotions clearly but miss the people who aren\'t showing any. Working on widening my aperture.',
      }
    }
    if (bias > 8) {
      return {
        name: 'The Optimism Lens',
        tagline: 'You read the room — but through rose-colored glass.',
        insight: `You have real perceptual range — you notice more of what's happening in a group than most people do. But your estimates consistently tilt positive. You see the happy faces first and they anchor your read on the whole room.\n\nThis isn't a character flaw. It's a perceptual habit. And in leadership, it matters: teams where managers consistently overread positivity tend to have higher rates of unspoken struggle. The people who aren't okay have learned that you're not looking for them.\n\nOne practice: after your next team meeting, name one person who seemed fine — then ask yourself what you'd see if they weren't.`,
        strength: 'Detecting positive emotional signals',
        shareText: 'The Emotional Aperture Assessment told me I read groups with an optimism bias. I see the good — but might be missing who\'s struggling.',
      }
    }
    if (bias < -8) {
      return {
        name: 'The Vigilant Scanner',
        tagline: 'You catch what others miss — especially difficulty.',
        insight: `You have above-average perceptual range and a strong instinct for detecting distress. When someone in a group is struggling, you tend to notice before others do. That's a genuine leadership asset.\n\nBut your estimates lean negative — you see more difficulty than is actually there. In a team context, this can manifest as overreading tension, reading neutral faces as troubled, or feeling a sense of group stress that others don't share.\n\nThe scan routine that serves you: trust your instinct to look for who's struggling. Then check it — ask one more question before concluding the room is harder than it is.`,
        strength: 'Detecting negative and distress signals',
        shareText: 'The Emotional Aperture Assessment says I\'m a Vigilant Scanner — I catch difficulty early, but sometimes see more trouble than is there.',
      }
    }
    return {
      name: 'The Selective Reader',
      tagline: 'Your aperture opens wide — for some signals.',
      insight: `You read emotional information accurately when you're paying attention — and that's most of the time. What the data shows: the gap isn't perception, it's coverage. You track certain signals well (especially at the extremes — all positive or all negative) but mixed distributions trip you up.\n\nThat's the hard part of emotional aperture. It's not about reading one person clearly. It's about holding the whole spread simultaneously — the person who's energized AND the person who's checked out — at the same time.\n\nPractice: in your next team meeting, make yourself name an emotion for every person in the room before the meeting ends. Not a judgment — just a read.`,
      strength: 'Reading uniform emotional states',
      shareText: 'The Emotional Aperture Assessment showed me where my group-reading breaks down. Mixed rooms are where I lose the thread.',
    }
  }

  return {
    name: 'The Single-Signal Reader',
    tagline: 'You see clearly — but not the whole picture.',
    insight: `Here's what the research shows about scores like yours: you're not missing the emotional information in the room. You're collapsing it. When you look at a group, you register a general impression — positive or negative — and that impression smooths over the variation.\n\nThis is extremely common. Most leaders operate this way. The organizational cost is significant: the people who are quietly not okay become invisible. The conflict building in the team doesn't register until it's already a problem.\n\nAltimeter lock — in Jeffrey's framework — is exactly this: fixating on the general signal while losing the individual data points. The Scan Routine exists to interrupt it. You just took the first step.\n\nStart small: pick one meeting this week and track one specific person's emotional state from start to finish. Not the whole room — one person. Build the muscle from there.`,
    strength: 'Identifying general emotional valence',
    shareText: 'The Emotional Aperture Assessment revealed I\'m a Single-Signal Reader — I read the overall vibe but miss the variation. Working on it.',
  }
}
