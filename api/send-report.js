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
      subject: `${firstName || 'Your'} Emotional Aperture Assessment Results`,
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
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 { color: #1a3a52; }
          h1 { font-size: 28px; margin-top: 0; }
          h2 { font-size: 20px; margin-top: 24px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; }
          .score-box {
            background: #f9f7f2;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
          }
          .bias-box {
            background: #fef3f0;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
            border-left: 4px solid #d97762;
          }
          .blindspot-box {
            background: #f0faf5;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
            border-left: 4px solid #7cb47c;
          }
          .insight-box {
            background: #f5f9fc;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
            border-left: 4px solid #4a7ba7;
          }
          .score-large { font-size: 24px; font-weight: 700; color: #1a3a52; }
          .score-positive { color: #7cb47c; }
          .score-negative { color: #d97762; }
          .footer {
            font-size: 12px;
            color: #999;
            text-align: center;
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #e0e0e0;
          }
        </style>
      </head>
      <body>
        <h1>Personal Feedback Report</h1>
        <p><strong>For:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Date:</strong> ${date}</p>

        <h2>Your Emotional Aperture Assessment Results</h2>

        <div class="score-box">
          <h3>Overall EAM Score with Benchmarks</h3>
          <table>
            <tr>
              <td><strong>Overall Emotional Aperture</strong></td>
              <td style="text-align: right;"><span class="score-large">${scores.overallAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">Avg: ${scores.benchmarks.overall}%</td>
            </tr>
            <tr>
              <td><strong>Negative Reactions</strong></td>
              <td style="text-align: right;"><span class="score-large score-negative">${scores.negAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">Avg: ${scores.benchmarks.negative}%</td>
            </tr>
            <tr>
              <td><strong>Positive Reactions</strong></td>
              <td style="text-align: right;"><span class="score-large score-positive">${scores.posAccuracy}%</span></td>
              <td style="text-align: right; color: #999;">Avg: ${scores.benchmarks.positive}%</td>
            </tr>
          </table>
          <p style="font-size: 14px; color: #666; margin-top: 12px;">
            Your score reflects your average accuracy at recognizing emotional reactions within groups. Higher scores indicate greater accuracy.
          </p>
        </div>

        <div class="bias-box">
          <h3>Overestimation Biases</h3>
          <p>
            <strong>"Pessimistic" Bias:</strong> <span class="score-large score-negative">${scores.pessimisticBias}%</span><br>
            <span style="font-size: 13px; color: #666;">Percentage of items where you overestimated negative emotional reactions</span>
          </p>
          <p>
            <strong>"Rose-Tinted Glasses" Bias:</strong> <span class="score-large score-positive">${scores.roseTintedBias}%</span><br>
            <span style="font-size: 13px; color: #666;">Percentage of items where you overestimated positive emotional reactions</span>
          </p>
        </div>

        <div class="blindspot-box">
          <h3>Underestimation Biases / Blind Spots</h3>
          <p>
            <strong>Negative Blind Spot:</strong> <span class="score-large score-negative">${scores.negativeBlindSpot}%</span><br>
            <span style="font-size: 13px; color: #666;">Percentage of items where you underestimated negative reactions</span>
          </p>
          <p>
            <strong>Positive Blind Spot:</strong> <span class="score-large score-positive">${scores.positiveBlindSpot}%</span><br>
            <span style="font-size: 13px; color: #666;">Percentage of items where you underestimated positive reactions</span>
          </p>
        </div>

        <div class="insight-box">
          <h3>${scores.profile.name}</h3>
          <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(scores.profile.insight)}</p>
        </div>

        <h2>Next Steps</h2>
        <p>
          Reflect on your scores in the context of your leadership. Consider how understanding these patterns can help you build stronger team awareness and emotional intelligence.
        </p>

        <div class="footer">
          <p>Copyright © 2008 J Sanchez-Burks. All rights reserved.</p>
          <p>Powered by the Emotional Aperture Measure (EAM™)</p>
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
