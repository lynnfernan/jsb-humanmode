const BENCHMARKS = {
  overall: 79.2,
  positive: 83.5,
  negative: 74.9,
}

export function computeScores(responses, scenarios) {
  const n = Math.min(responses.length, scenarios.length)
  if (n === 0) return null

  let totalPosAcc = 0
  let totalNegAcc = 0
  let pessimisticCount = 0
  let roseTintedCount = 0
  let posBlindSpotCount = 0
  let negBlindSpotCount = 0

  for (let i = 0; i < n; i++) {
    const { posEstimate, negEstimate } = responses[i]
    const { correctPositive, correctNegative } = scenarios[i]

    totalPosAcc += Math.max(0, 100 - Math.abs(correctPositive - posEstimate))
    totalNegAcc += Math.max(0, 100 - Math.abs(correctNegative - negEstimate))

    if (negEstimate > correctNegative) pessimisticCount++
    if (posEstimate > correctPositive) roseTintedCount++
    if (posEstimate < correctPositive) posBlindSpotCount++
    if (negEstimate < correctNegative) negBlindSpotCount++
  }

  const posAccuracy = totalPosAcc / n
  const negAccuracy = totalNegAcc / n
  const overallScore = (posAccuracy + negAccuracy) / 2

  return {
    overallScore: Math.round(overallScore * 10) / 10,
    posAccuracy: Math.round(posAccuracy * 10) / 10,
    negAccuracy: Math.round(negAccuracy * 10) / 10,
    pessimisticBias: Math.round((pessimisticCount / n) * 1000) / 10,
    roseTintedBias: Math.round((roseTintedCount / n) * 1000) / 10,
    posBlindSpot: Math.round((posBlindSpotCount / n) * 1000) / 10,
    negBlindSpot: Math.round((negBlindSpotCount / n) * 1000) / 10,
    benchmarks: BENCHMARKS,
    n,
  }
}
