import React, { useState } from 'react'

export default function Results({ scores, leadData, onRetake }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailForReport, setEmailForReport] = useState(leadData?.email || '')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)

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
    setSending(true)
    setSendError(null)
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: leadData?.firstName,
          email: emailForReport,
          scores,
        }),
      })
      if (res.ok) {
        setEmailSubmitted(true)
      } else {
        setSendError('Something went wrong sending your report. Please try again.')
      }
    } catch (err) {
      setSendError('Something went wrong sending your report. Please try again.')
    } finally {
      setSending(false)
    }
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
            {/* Overall EAM Score with population average */}
            <div style={{ background: '#f9f7f2', borderRadius: 'var(--radius-sm)', padding: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'Saira', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Overall Emotional Aperture Score
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>
                {scores.overallAccuracy}%
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                {scores.totalPoints} of {scores.maxPoints} emotional reads exactly right &middot; Average score: {scores.benchmarks.overall}%
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', marginTop: '1.5rem', lineHeight: 1.7, textAlign: 'left' }}>
                This single number doesn't tell the whole story about your ability to read the room. Instead, your report breaks down how well you decode positive versus negative reactions, highlighting any tendencies to overestimate or underestimate these cues. Together, these insights will help you read the room more accurately and dynamically adapt while presenting and collaborating.
              </p>
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
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                <strong>Focus Area:</strong> {hasPositiveBias ? 'Recognizing negative emotional signals and distress that might be masked by optimism bias.' : hasNegativeBias ? 'Validating positive emotions and building on moments of connection without overreading tension.' : 'Expanding your aperture to read mixed emotional distributions where some people are energized and others are struggling.'}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                Links to the science behind reading the room and tips for improving your skills are included in your report.
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
                      <button type="submit" className="btn btn-full" disabled={sending} style={{ opacity: sending ? 0.6 : 1 }}>
                        {sending ? 'Sending...' : 'Send Report'}
                      </button>
                      {sendError && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--negative)', textAlign: 'center', marginTop: '0.75rem' }}>
                          {sendError}
                        </p>
                      )}
                    </form>
                  )}

                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: '1rem' }}>
                    Your report will be sent within minutes. We don't share your email.
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--positive)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    ✓ Your report is on its way to your inbox
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Sent to <strong>{emailForReport}</strong>. If you don't see it within a few minutes, check your spam folder.
                  </p>
                </div>
              )}
            </div>

            {/* Retake button */}
            <button className="btn btn-outline" onClick={onRetake} style={{ width: '100%', marginBottom: '2rem' }}>
              Take Assessment Again
            </button>

            {/* Book mention */}
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This assessment is one of the themes in{' '}
              <a href="https://jeffreysanchezburks.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)', fontWeight: 600 }}>
                <em>Human Mode: Unlock Your Unique Edge and Transform Your World of Work</em>
              </a>
              {' '}(2027), forthcoming from Harper Collins.
            </p>

            {/* Copyright line */}
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
              Copyright © 2008 J Sanchez-Burks. All rights reserved.
            </p>
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
