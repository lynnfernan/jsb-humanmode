import { Resend } from 'resend'

// Benchmark averages from JSB normative data (n=309, version closest to 3.0).
// Bias and blind-spot norms are not available — those scores show without averages.
const BENCHMARKS = { overall: 46, positive: 56, negative: 36 }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured (missing RESEND_API_KEY)' })
  }

  const { firstName, email, scores } = req.body

  if (!email || !scores) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = buildReportEmail(firstName || 'Friend', scores)

    const response = await resend.emails.send({
      from: process.env.REPORT_FROM_EMAIL || 'JSB Human Mode <onboarding@resend.dev>',
      to: email,
      subject: `${firstName ? firstName + ', your' : 'Your'} Emotional Aperture Report`,
      html,
    })

    if (response.error) {
      return res.status(500).json({ error: response.error.message })
    }

    return res.status(200).json({ success: true, id: response.data?.id })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: error.message })
  }
}

// ---- Band (applies to raw accuracy, consistent with the n=309 norms) ----

function getBand(score) {
  if (score <= 20) return {
    label: 'Very Low',
    prose: `A score here usually says more about the sitting than the skill. Distractions, a glitchy screen, or counting faces one by one will sink it; Emotional Aperture reads the forest, not the trees. If none of that applies, your attention has simply been trained on technical detail rather than social signals. That's a starting point, not a ceiling.`,
  }
  if (score <= 40) return {
    label: 'Low',
    prose: `Rule out the technical culprits first: distractions, multitasking, counting faces instead of taking in the whole. What remains is room to grow, and this skill grows with practice. Sit in a busy café and shift from one conversation's tone to the room's. Study a pointillist painting up close, then step back until the dots become a scene. Do the same with faces in a crowd.`,
  }
  if (score <= 60) return {
    label: 'Average',
    prose: `You read group emotion competently; most people land here. Your edge lies in your errors: did you misread positive reactions more often, or negative ones? Whichever it is, notice what you've come to expect from a room. Expectation is where misreads begin.`,
  }
  if (score <= 80) return {
    label: 'High',
    prose: `You track a room's emotional current as it moves, catching swings in momentum most people miss, including the share of a group that hasn't tipped positive or negative. Your reads are rarely far off.`,
  }
  return {
    label: 'Very High',
    prose: `Exceptional. You hold the whole group in view without getting captured by any one face, and your estimates rarely miss by much. People with scores here usually have the stories to match; others have likely told you that you're the one who senses the room.`,
  }
}

// ---- Pattern (which dimension to develop, and whether errors lean or scatter) ----

function getPattern(scores) {
  const posAcc = scores.posAccuracy ?? 0
  const negAcc = scores.negAccuracy ?? 0

  let focus
  if (posAcc > negAcc) focus = 'negative'
  else if (negAcc > posAcc) focus = 'positive'
  else focus = 'balanced'

  // For the focus dimension, compare over- vs under-estimation rates.
  // A gap of 15+ points is a consistent lean (tilt); less is scatter (noise).
  let tilt = 'noise'
  if (focus === 'negative') {
    const over = scores.pessimisticBias ?? 0
    const under = scores.negativeBlindSpot ?? 0
    if (over - under >= 15) tilt = 'over'
    else if (under - over >= 15) tilt = 'under'
  } else if (focus === 'positive') {
    const over = scores.roseTintedBias ?? 0
    const under = scores.positiveBlindSpot ?? 0
    if (over - under >= 15) tilt = 'over'
    else if (under - over >= 15) tilt = 'under'
  }

  const patternLines = {
    'negative-over': 'You tend to see more negativity in a room than is actually there.',
    'negative-under': 'Negative reactions slip past you more often than they should.',
    'negative-noise': 'Your misreads cluster on negative reactions, scattered in both directions rather than leaning one way.',
    'positive-over': 'You tend to see more positivity in a room than is actually there.',
    'positive-under': 'Positive reactions slip past you more often than they should.',
    'positive-noise': 'Your misreads cluster on positive reactions, scattered in both directions rather than leaning one way.',
    'balanced-noise': 'Your accuracy is even across positive and negative reactions; mixed rooms are your frontier.',
  }

  const focusParagraphs = {
    negative: `Your development target is specific: negative emotion in groups. Frustration that hides behind a nod. Disengagement that photographs as calm. The colleague who has gone quiet in a way that isn't contentment. These are the signals most likely to slip past you, or to appear when they aren't there.`,
    positive: `Your development target is specific: positive emotion in groups. Genuine enthusiasm you file away as politeness. Real buy-in that reads to you as mere compliance. The quiet supporter you never counted. These are the signals most likely to slip past you, or to appear when they aren't there.`,
    balanced: `Your development target is breadth rather than a single emotion: the mixed room. Some people energized, some struggling, some giving you nothing at all. Your reads are even-handed; the next level is holding the whole spread in view at once.`,
  }

  const verifySentences = {
    noise: `Your pattern is noise, not tilt, so the fix is confirmation. When you sense a reaction, name it gently and ask. When you sense none, ask anyway once in a while.`,
    over: `Your pattern leans toward seeing more than is there, so the fix is calibration. Before you act on a read, ask one more question and let the answer adjust you.`,
    under: `Your pattern leans toward missing what is there, so the fix is deliberate looking. Once a meeting, check in with the person giving you nothing at all.`,
  }

  return {
    focus,
    tilt,
    line: patternLines[`${focus}-${tilt}`] || patternLines['balanced-noise'],
    focusParagraph: focusParagraphs[focus],
    verifySentence: verifySentences[tilt],
  }
}

// ---- Tips, reordered so the first ones aim at the reader's pattern ----

function getTips(pattern) {
  const tips = {
    mismatch: `<strong>Watch the mismatch.</strong> When someone's tone, face, or body language doesn't match their words, don't resolve the ambiguity in your head. Ask an open question and explore.`,
    scan: `<strong>Scan the whole room, not just the loudest voice.</strong> Before a meeting ends, take ten seconds to estimate how many people are energized, how many are struggling, and how many are giving you nothing at all. Then, where you can, check one of those guesses.`,
    verify: `<strong>Verify before you conclude.</strong> ${pattern.verifySentence} Being wrong costs little; being right matters.`,
    reflect: `<strong>Reflect back what you hear.</strong> When someone shares how they feel, say it back in your own words and ask a clarifying question if you're unsure. You're giving them evidence of listening, and giving yourself feedback on your read.`,
    know: `<strong>Get to know people beyond the work.</strong> The better you understand what someone values and what they're finding hard, the easier their reactions are to read.`,
    energy: `<strong>Match your energy to the room.</strong> Adjusting your tone and pace to those around you builds connection and sharpens your reads over time.`,
  }

  const order = pattern.focus === 'balanced'
    ? ['scan', 'mismatch', 'reflect', 'verify', 'know', 'energy']
    : ['mismatch', 'scan', 'verify', 'reflect', 'know', 'energy']

  return order.map(k => tips[k])
}

function buildReportEmail(firstName, scores) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const band = getBand(scores.overallAccuracy)
  const pattern = getPattern(scores)
  const tips = getTips(pattern)

  const pointsLine = (scores.totalPoints != null && scores.maxPoints != null)
    ? `You read ${scores.totalPoints} of ${scores.maxPoints} emotional signals exactly right. `
    : ''

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 640px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 { color: #1a3a52; }
          h1 { font-size: 28px; margin: 0; }
          h2 { font-size: 20px; margin-top: 32px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
          .header { text-align: center; margin-bottom: 8px; }
          .header .tagline { color: #4a7ba7; font-size: 16px; margin: 6px 0 2px; }
          .header .brand { color: #4a7ba7; font-size: 13px; }
          .meta { font-size: 14px; color: #666; margin: 18px 0 6px; }
          .summary-box {
            background: #1a3a52;
            color: #f1f1e2;
            border-radius: 10px;
            padding: 24px 28px;
            margin: 20px 0 28px;
          }
          .summary-box .label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(241,241,226,0.65); }
          .summary-box p { margin: 4px 0 14px; font-size: 15px; color: #f1f1e2; }
          .summary-box p:last-child { margin-bottom: 0; }
          .score-hero { font-size: 44px; font-weight: 700; color: #1a3a52; margin: 8px 0 0; }
          .score-large { font-size: 26px; font-weight: 700; }
          .score-positive { color: #2e8b57; }
          .score-negative { color: #c0392b; }
          .avg { font-size: 13px; color: #888; margin-top: 2px; }
          .score-box { background: #f9f7f2; padding: 20px 24px; border-radius: 8px; margin: 16px 0; }
          .band-box { background: #f5f9fc; padding: 20px 24px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #4a7ba7; }
          .bias-box { background: #fef3f0; padding: 20px 24px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #c0392b; }
          .blindspot-box { background: #f0faf5; padding: 20px 24px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #2e8b57; }
          .focus-box { background: #fdf8ec; padding: 20px 24px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #c9a227; }
          .commit-box { background: #f9f7f2; padding: 18px 24px; border-radius: 8px; margin: 20px 0; font-weight: 600; color: #1a3a52; }
          .muted { color: #666; font-size: 13px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 12px; }
          .footer {
            font-size: 12px;
            color: #999;
            text-align: center;
            margin-top: 36px;
            padding-top: 16px;
            border-top: 1px solid #e0e0e0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Emotional Aperture Report</h1>
          <div class="tagline">How well you read a room, and how to read it better</div>
          <div class="brand">The Emotional Aperture Measure&trade; &middot; JeffreySanchezBurks.com</div>
        </div>

        <p class="meta"><em>Prepared for ${escapeHtml(firstName)}</em><br>
        Results based on assessment taken <strong>${date}</strong></p>

        <div class="summary-box">
          <div class="label">Your 30-Second Summary</div>
          <p><strong>Your score:</strong> ${scores.overallAccuracy}% (${band.label}). ${pointsLine}The benchmark average is ${BENCHMARKS.overall}%.</p>
          <p><strong>Your pattern:</strong> ${pattern.line}</p>
          <p><strong>Your practice:</strong> The ten-second scan. Before your next meeting ends, estimate how many people are energized, how many are struggling, and how many are giving you nothing at all.</p>
        </div>

        <p>
          Many of us walk out of a meeting certain we know how it went. We rarely check. Other people may get an accurate read on one or two individuals but not expand their focus to the broader vibe present in the room. By completing the <em>Emotional Aperture Measure</em>&trade;, you checked. This report shows what your read of the room got right, and where it drifted. One fun fact from the research before you dive in: skill at reading the room, as measured by the EAM, is not related to IQ. It is a distinct skill, and it grows with awareness and intentionality, the two keys to getting the real-time data you need to adjust on the fly whenever you collaborate or present to a group.
        </p>

        <h2>What Is Emotional Aperture?</h2>
        <p>
          Emotional aperture is the skill of reading the emotions of a group, not just one person. Like widening a camera's aperture to bring a whole scene into focus, it means noticing the temperature of the room and how emotion-laden reactions are distributed. Are people aligned, all over the place, is the group showing signs of increasing hope or despair?
        </p>
        <p>Why it matters:</p>
        <ul>
          <li><strong>You adjust in the moment.</strong> Reading how a room is receiving you lets you change course while it still matters.</li>
          <li><strong>You catch who needs support.</strong> Accurate reads of faces and body language tell you when to check in, and with whom.</li>
          <li><strong>You build sturdier relationships.</strong> Being seen and understood is what people remember, and it feeds your own resilience too.</li>
        </ul>

        <h2>Your Results</h2>

        <div class="score-box">
          <p style="margin: 0;">Your <strong>Overall Accuracy</strong> at assessing the proportion of positive and negative emotional reactions in groups:</p>
          <p class="score-hero">${scores.overallAccuracy}%</p>
          <p class="avg">Average* = ${BENCHMARKS.overall}%</p>
          <p style="margin-bottom: 0;">
            ${pointsLine}Higher scores are particularly impressive since they reflect accuracy at reading both positive and negative reactions combined. Now, let's break that down so you can see if there are certain patterns to the way you read and misread the room.
          </p>
        </div>

        <div class="score-box">
          <p style="margin: 0;">Your accuracy at reading <strong style="color: #2e8b57;">Positive Reactions</strong>, the proportion of positive emotional reactions in a group:</p>
          <p class="score-large score-positive" style="margin: 8px 0 0;">${scores.posAccuracy}%</p>
          <p class="avg" style="margin-bottom: 0;">Average* = ${BENCHMARKS.positive}%</p>
        </div>

        <div class="score-box">
          <p style="margin: 0;">Your accuracy at reading <strong style="color: #c0392b;">Negative Reactions</strong>, the proportion of negative emotional reactions in a group:</p>
          <p class="score-large score-negative" style="margin: 8px 0 0;">${scores.negAccuracy}%</p>
          <p class="avg" style="margin-bottom: 0;">Average* = ${BENCHMARKS.negative}%</p>
        </div>

        <h2>The Big Picture</h2>
        <p>
          Your scores show your percent accuracy in reading the emotional reactions of groups, from 0 to 100. *The averages beside your scores come from a benchmark sample of more than 300 working adults who took this version of the EAM. The full scale: 1&ndash;20 Very Low &middot; 21&ndash;40 Low &middot; 41&ndash;60 Average &middot; 61&ndash;80 High &middot; 81&ndash;99 Very High.
        </p>
        <div class="band-box">
          <h3 style="margin-top: 0;">Your band: ${band.label}</h3>
          <p style="margin-bottom: 0;">${band.prose}</p>
        </div>

        <h2>Seeing More or Less Than Is Actually There?</h2>

        <div class="bias-box">
          <h3 style="margin-top: 0;">Overestimation Tendencies</h3>
          <p class="muted" style="margin-top: -8px;">How often you saw more emotion than was actually there.</p>
          <p>
            <strong>"Pessimistic" Bias:</strong> <span class="score-large score-negative">${scores.pessimisticBias}%</span><br>
            <span class="muted">The percentage of the time you overestimated the proportion of negative emotional reactions in a group.</span>
          </p>
          <p style="margin-bottom: 0;">
            <strong>"Rose-Tinted Glasses" Bias:</strong> <span class="score-large score-positive">${scores.roseTintedBias}%</span><br>
            <span class="muted">The percentage of the time you saw more positive reactions than actually existed.</span>
          </p>
        </div>

        <div class="blindspot-box">
          <h3 style="margin-top: 0;">Underestimation Biases: "Blind Spots"</h3>
          <p class="muted" style="margin-top: -8px;">How often you missed emotion that was actually there.</p>
          <p>
            <strong>Negative Blind Spot:</strong> <span class="score-large score-negative">${scores.negativeBlindSpot}%</span><br>
            <span class="muted">The percentage of the time you underestimated the proportion of negative emotional reactions in a group.</span>
          </p>
          <p style="margin-bottom: 0;">
            <strong>Positive Blind Spot:</strong> <span class="score-large score-positive">${scores.positiveBlindSpot}%</span><br>
            <span class="muted">The percentage of the time you underestimated the proportion of positive emotional reactions in a group.</span>
          </p>
        </div>

        <h2>Where to Focus</h2>
        <div class="focus-box">
          <p style="margin: 0;">${pattern.focusParagraph}</p>
        </div>

        <h2>Tips for Development</h2>
        <p>
          Emotional aperture is a skill, not a fixed trait. William James saw why more than a century ago: we have eyes only for what we have been taught to discern. Training your attention changes what you can see, and that is precisely what these practices do. As you read them, think of a recent meeting where you read the room well, and one where you missed something. The first three aim directly at your pattern.
        </p>
        <ul>
          ${tips.map(t => `<li>${t}</li>`).join('\n          ')}
        </ul>
        <div class="commit-box">
          One commitment before you go: pick one meeting this week and make it your practice field. One room, ten seconds, one guess checked.
        </div>

        <h2>Reflections and Looking Forward</h2>
        <p>
          A score becomes useful the moment you connect it to a real room. Do your results surprise you? Compare your accuracy with the averages beside each score: where is the gap widest, and does that match your experience? Recall a moment when you read a group well, and one when you missed. What was different: the stakes, the setting, your role, how much attention you had to spare?
        </p>
        <p>
          Then look forward. Where does reading a group matter most in your work: presenting a change in direction, gauging real commitment, staying in touch with the emotional pulse of a key team? Name the next such moment on your calendar and treat it as a practice field.
        </p>
        <p>
          One caveat as you reflect. Group emotion travels through more than faces; it leaks out in voices, posture, pacing, and what goes unsaid. The EAM reads the face channel, and your strengths may vary across channels. These skills tend to travel together, but treat your score as one lens among several, not the whole picture.
        </p>

        <h2>The Science Behind Reading the Room</h2>
        <p>
          The Emotional Aperture Measure is grounded in peer-reviewed research on how leaders perceive collective emotions. To go deeper:
        </p>
        <ul style="line-height: 1.8;">
          <li>
            <a href="https://sloanreview.mit.edu/article/how-leaders-can-optimize-teams-emotional-landscapes/" style="color: #1a3a52;">How Leaders Can Optimize Teams' Emotional Landscapes</a>
            <span style="color: #666;"> &mdash; MIT Sloan Management Review</span>
          </li>
          <li>
            <a href="https://knowledge.insead.edu/strategy/leaders-who-can-read-collective-emotions-are-more-effective" style="color: #1a3a52;">Leaders Who Can Read Collective Emotions Are More Effective</a>
            <span style="color: #666;"> &mdash; INSEAD Knowledge</span>
          </li>
          <li>
            <a href="https://pubsonline.informs.org/doi/10.1287/orsc.1070.0347" style="color: #1a3a52;">Emotional Aperture and Strategic Change: The Accurate Recognition of Collective Emotions</a>
            <span style="color: #666;"> &mdash; Organization Science (the original EAM research)</span>
          </li>
        </ul>

        <h2>About This Report</h2>
        <p>
          This report presents your results on the Emotional Aperture Measure (EAM), which reflects how well you recognize the emotional reactions of people in groups. Your scores are based on your responses in this one sitting. Think of them as a snapshot and a starting point, not a final verdict on your ability.
        </p>

        <h2>One Last Thought</h2>
        <p>
          This assessment told you where your lens is sharp and where it fogs. What to do with that is the subject of the forthcoming book, <a href="https://jeffreysanchezburks.com" style="color: #1a3a52;"><em>Human Mode: Unlock Your Unique Edge and Transform Your World of Work</em></a> (HarperCollins, 2027), where emotional aperture is the first of four core practices. The next room you walk into is a chance to practice. Take the ten seconds. Count the faces.
        </p>

        <p style="text-align: center; margin-top: 28px;">
          <a href="https://jeffreysanchezburks.com" style="display: inline-block; background: #1a3a52; color: #f1f1e2; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">Learn More at JeffreySanchezBurks.com</a>
        </p>

        <div class="footer">
          <p>Copyright &copy; 2026 Jeffrey Sanchez-Burks. All rights reserved.</p>
          <p>Powered by the Emotional Aperture Measure (EAM&trade;)</p>
        </div>
      </body>
    </html>
  `
}

function escapeHtml(text) {
  if (!text) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
