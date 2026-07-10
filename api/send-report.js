import { Resend } from 'resend'

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
      subject: `${firstName ? firstName + ', your' : 'Your'} Emotional Aperture Development Report`,
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

function buildReportEmail(firstName, scores) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Development focus: whichever dimension scored lower is the growth area
  const focusNegative = scores.posAccuracy > scores.negAccuracy
  const focusBalanced = scores.posAccuracy === scores.negAccuracy
  const focusText = focusBalanced
    ? 'Your accuracy was even across positive and negative reactions, so focus your development on reading mixed rooms, where some people are energized, some are struggling, and some show nothing at all.'
    : focusNegative
      ? 'Your accuracy was higher for positive reactions than for negative ones. Focus your development on noticing and responding to negative emotions in people and groups. These are the signals most likely to slip past you.'
      : 'Your accuracy was higher for negative reactions than for positive ones. Focus your development on noticing and responding to positive emotions in people and groups. Recognizing what is going well is how you build on moments of connection.'

  const pointsLine = (scores.totalPoints != null && scores.maxPoints != null)
    ? `<p style="text-align: center; color: #666; font-size: 14px; margin-top: 4px;">You read ${scores.totalPoints} of ${scores.maxPoints} emotional signals exactly right.</p>`
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
          h1 { font-size: 26px; margin: 0; }
          h2 { font-size: 20px; margin-top: 32px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; padding: 8px 12px; border-bottom: 2px solid #e0e0e0; }
          td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
          .cover {
            background: #1a3a52;
            color: #f1f1e2;
            border-radius: 10px;
            padding: 36px 28px;
            text-align: center;
            margin-bottom: 24px;
          }
          .cover h1 { color: #f1f1e2; }
          .cover .sub { color: rgba(241,241,226,0.85); font-size: 15px; margin-top: 10px; }
          .score-box { background: #f9f7f2; padding: 20px; border-radius: 8px; margin: 16px 0; }
          .bias-box { background: #fef3f0; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #d97762; }
          .blindspot-box { background: #f0faf5; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #7cb47c; }
          .insight-box { background: #f5f9fc; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #4a7ba7; }
          .focus-box { background: #fdf8ec; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #c9a227; }
          .score-hero { font-size: 44px; font-weight: 700; color: #1a3a52; text-align: center; margin: 8px 0 0; }
          .score-large { font-size: 22px; font-weight: 700; color: #1a3a52; }
          .score-positive { color: #7cb47c; }
          .score-negative { color: #d97762; }
          .muted { color: #666; font-size: 13px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 10px; }
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
        <div class="cover">
          <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(241,241,226,0.7); margin-bottom: 12px;">Emotional Aperture Measure&trade;</div>
          <h1>Development Report</h1>
          <div class="sub">Prepared for ${escapeHtml(firstName)}<br>${date}</div>
        </div>

        <h2>About This Report</h2>
        <p>
          This report presents your results on the Emotional Aperture Measure (EAM), which reflects how well you recognize the emotional reactions of people in groups. Your results are personal to you, so treat them as private and share them only with people you trust.
        </p>
        <p>
          Your scores are based on your responses in this one sitting. Think of them as a snapshot and a starting point for development, not a final verdict on your ability.
        </p>

        <h2>What Is Emotional Aperture?</h2>
        <p>
          Emotional aperture is the skill of reading the emotions of a group, not just one person. Like widening a camera's aperture to bring the whole scene into focus, it means noticing how feeling is distributed across a room: who is energized, who is struggling, and who is showing nothing at all.
        </p>
        <p>Why it matters:</p>
        <ul>
          <li><strong>Better group interactions.</strong> Reading the room tells you how others are receiving you, so you can adjust in the moment and build stronger rapport.</li>
          <li><strong>Empathy.</strong> Accurately recognizing facial expressions and body language helps you notice when someone needs support.</li>
          <li><strong>Resilience.</strong> Strong relationships are built on being seen and understood, and they underpin your own well-being too.</li>
        </ul>

        <h2>Your Results</h2>
        <div class="score-box">
          <p style="text-align: center; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #888;">Overall Emotional Aperture Score</p>
          <p class="score-hero">${scores.overallAccuracy}%</p>
          ${pointsLine}
          <table>
            <tr>
              <th>Dimension</th>
              <th style="text-align: right;">Your Score</th>
              <th style="text-align: right;">Average</th>
            </tr>
            <tr>
              <td><strong>Overall</strong><br><span class="muted">Accuracy across positive and negative reactions</span></td>
              <td style="text-align: right;"><span class="score-large">${scores.overallAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">${scores.benchmarks.overall}%</td>
            </tr>
            <tr>
              <td><strong>Positive Emotions</strong><br><span class="muted">Accuracy at reading positive reactions</span></td>
              <td style="text-align: right;"><span class="score-large score-positive">${scores.posAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">${scores.benchmarks.positive}%</td>
            </tr>
            <tr>
              <td><strong>Negative Emotions</strong><br><span class="muted">Accuracy at reading negative reactions</span></td>
              <td style="text-align: right;"><span class="score-large score-negative">${scores.negAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">${scores.benchmarks.negative}%</td>
            </tr>
          </table>
          <p class="muted" style="margin-top: 8px;">
            Each question scores your read of positive and negative reactions separately. A point is earned when your estimate matches the group exactly. Higher scores mean greater accuracy.
          </p>
        </div>

        <div class="bias-box">
          <h3 style="margin-top: 0;">Overestimation Biases</h3>
          <p class="muted" style="margin-top: -8px;">How often you saw more emotion than was actually there.</p>
          <p>
            <strong>"Pessimistic" Bias:</strong> <span class="score-large score-negative">${scores.pessimisticBias}%</span><br>
            <span class="muted">Percentage of the time you overestimated negative reactions</span>
          </p>
          <p>
            <strong>"Rose-Tinted Glasses" Bias:</strong> <span class="score-large score-positive">${scores.roseTintedBias}%</span><br>
            <span class="muted">Percentage of the time you overestimated positive reactions</span>
          </p>
        </div>

        <div class="blindspot-box">
          <h3 style="margin-top: 0;">Blind Spots</h3>
          <p class="muted" style="margin-top: -8px;">How often you missed emotion that was actually there.</p>
          <p>
            <strong>Negative Blind Spot:</strong> <span class="score-large score-negative">${scores.negativeBlindSpot}%</span><br>
            <span class="muted">Percentage of the time you underestimated negative reactions</span>
          </p>
          <p>
            <strong>Positive Blind Spot:</strong> <span class="score-large score-positive">${scores.positiveBlindSpot}%</span><br>
            <span class="muted">Percentage of the time you underestimated positive reactions</span>
          </p>
        </div>

        <div class="focus-box">
          <h3 style="margin-top: 0;">Where to Focus</h3>
          <p style="margin-bottom: 0;">${focusText}</p>
        </div>

        <div class="insight-box">
          <h3 style="margin-top: 0;">Your Profile: ${escapeHtml(scores.profile.name)}</h3>
          <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(scores.profile.insight)}</p>
        </div>

        <h2>Tips for Development</h2>
        <p>
          Emotional aperture is a skill, not a fixed trait. It improves with deliberate practice. As you read these tips, think of a recent meeting where you read the room well, and one where you missed something.
        </p>
        <ul>
          <li><strong>Get to know people beyond the work.</strong> The better you understand what someone values and what they're finding hard, the easier their reactions are to read.</li>
          <li><strong>Watch the mismatch.</strong> When someone's tone, face, or body language doesn't match their words, ask an open question and explore.</li>
          <li><strong>Reflect back what you hear.</strong> When someone shares how they feel, say it back in your own words and ask a clarifying question if you're unsure.</li>
          <li><strong>Scan the whole room, not just the loudest voice.</strong> Before a meeting ends, take ten seconds to estimate how many people are energized, how many are struggling, and how many are giving you nothing at all.</li>
          <li><strong>Act on your intuition.</strong> If you sense someone needs support, ask. Being wrong costs little; being right matters.</li>
          <li><strong>Match your energy to the room.</strong> Adjusting your tone and pace to those around you builds connection and sharpens your reads over time.</li>
        </ul>

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

        <p>
          This assessment is one of the themes in <a href="https://jeffreysanchezburks.com" style="color: #1a3a52;"><em>Human Mode: Unlock Your Unique Edge and Transform Your World of Work</em></a> (2027), forthcoming from Harper Collins.
        </p>

        <div class="footer">
          <p>Copyright &copy; 2008 J Sanchez-Burks. All rights reserved.</p>
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
