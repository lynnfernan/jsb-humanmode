import React, { useState } from 'react'

export default function Results({ scores, leadData, onRetake }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailForReport, setEmailForReport] = useState(leadData?.email || '')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  if (!scores) {
    return (
      <div className="app-shell">
        <nav className="top-bar">
          <div className="top-bar-brand">
            <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
            <span className="top-bar-tagline">Human Mode, Always</span>
          </div>
          <span className="top-bar-badge">Results</span>
        </nav>
        <div className="page">
          <div className="card">
            <div className="card-body">
              <p>Unable to calculate results. Please try the assessment again.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const profile = scores.profile
  const hasPositiveBias = scores.avgPosBias > 8
  const hasNegativeBias = scores.avgPosBias < -8
  const strengths = getStrengths(scores)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    // TODO: Send detailed report email via SendGrid
    setEmailSubmitted(true)
  }

  return (
    <div className="app-shell">
      <nav className="top-bar">
        <div className="top-bar-brand">
          <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
          <span className="top-bar-tagline">Human Mode, Always</span>
        </div>
        <span className="top-bar-badge">Results</span>
      </nav>

      <div className="page">
        <div className="card">
          {/* Hero section with overall score */}
          <div className="card-hero" style={{ paddingBottom: '2rem' }}>
            <span className="eyebrow-light">Assessment Complete</span>
            <h1 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1.5rem' }}>
              {profile.name}
            </h1>
            <p style={{ color: 'rgba(241,241,226,0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {profile.tagline}
            </p>
          </div>

          <div className="card-body">
            {/* Overall accuracy */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'Saira', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Overall Emotional Aperture
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>
                {scores.overallAccuracy}%
              </div>
            </div>

            {/* Three dimensions */}
            <div style={{ background: '#f9f7f2', borderRadius: 'var(--radius-sm)', padding: '1.75rem', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e8edf0' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--slate)', letterSpacing: '0.06em' }}>
                      Dimension
                    </th>
                    <th style={{ textAlign: 'right', paddingBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--slate)', letterSpacing: '0.06em' }}>
                      Your Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f0f0e8' }}>
                    <td style={{ paddingTop: '1rem', paddingBottom: '1rem', fontSize: '0.95rem', color: 'var(--ink)' }}>
                      Positive Emotions
                    </td>
                    <td style={{ paddingTop: '1rem', paddingBottom: '1rem', textAlign: 'right', fontSize: '1.3rem', fontWeight: 700, color: 'var(--positive)' }}>
                      {scores.typeScores?.find(t => t.type === 'Positive') ? Math.round(scores.typeScores.find(t => t.type === 'Positive').accuracy) : scores.overallAccuracy}%
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: '1rem', paddingBottom: '1rem', fontSize: '0.95rem', color: 'var(--ink)' }}>
                      Negative Emotions
                    </td>
                    <td style={{ paddingTop: '1rem', paddingBottom: '1rem', textAlign: 'right', fontSize: '1.3rem', fontWeight: 700, color: 'var(--negative)' }}>
                      {scores.typeScores?.find(t => t.type === 'Negative') ? Math.round(scores.typeScores.find(t => t.type === 'Negative').accuracy) : scores.overallAccuracy}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Profile insight */}
            <div style={{ background: '#f5f9fc', borderRadius: 'var(--radius-sm)', padding: '1.75rem', marginBottom: '2rem', borderLeft: '4px solid var(--slate)' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
                {profile.insight}
              </p>
            </div>

            {/* Strengths & areas for improvement */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
                Strengths & Development Areas
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                <strong>Strength:</strong> {profile.strength}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                <strong>Focus Area:</strong> {hasPositiveBias ? 'Recognizing negative emotional signals and distress that might be masked by optimism bias.' : hasNegativeBias ? 'Validating positive emotions and building on moments of connection without overreading tension.' : 'Expanding your aperture to read mixed emotional distributions where some people are energized and others are struggling.'}
              </p>
            </div>

            {/* Email opt-in for detailed report */}
            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-sm)', padding: '1.75rem', marginBottom: '2rem' }}>
              {!emailSubmitted ? (
                <>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>
                    Get Your Detailed Report
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    Receive a comprehensive PDF report with item-by-item analysis, strength and weakness breakdowns, and personalized development tips.
                  </p>

                  {!showEmailForm ? (
                    <button
                      className="btn btn-full"
                      onClick={() => setShowEmailForm(true)}
                      style={{ marginBottom: '0.75rem' }}
                    >
                      Receive Detailed Report
                    </button>
                  ) : (
                    <form onSubmit={handleEmailSubmit} style={{ marginBottom: '0.75rem' }}>
                      <div className="field">
                        <label htmlFor="reportEmail">Email Address</label>
                        <input
                          id="reportEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={emailForReport}
                          onChange={(e) => setEmailForReport(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-full">
                        Send Report
                      </button>
                    </form>
                  )}

                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: '1rem' }}>
                    Your report will be sent within minutes. We don't share your email.
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--positive)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    ✓ Report requested
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Check your inbox at <strong>{emailForReport}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Retake button */}
            <button className="btn btn-outline" onClick={onRetake} style={{ width: '100%' }}>
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStrengths(scores) {
  const profile = scores.profile
  const hasPositiveBias = scores.avgPosBias > 8
  const hasNegativeBias = scores.avgPosBias < -8

  return {
    strength: profile.strength,
    focus: hasPositiveBias ? 'negative emotions' : hasNegativeBias ? 'positive emotions' : 'mixed distributions',
  }
}
