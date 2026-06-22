import React, { useState } from 'react'

export default function LeadCapture({ onSubmit }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!firstName.trim()) { setError('First name is required.'); return }
    if (!email.trim() || !email.includes('@')) { setError('A valid email is required.'); return }
    setLoading(true)
    setTimeout(() => {
      onSubmit({ firstName: firstName.trim(), email: email.trim() })
    }, 400)
  }

  return (
    <div className="app-shell">
      <nav className="top-bar">
        <div className="top-bar-brand">
          <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
          <span className="top-bar-tagline">Human Mode, Always</span>
        </div>
        <span className="top-bar-badge">Free Assessment</span>
      </nav>

      <div className="page">
        <div className="card">
          <div className="card-hero">
            <span className="eyebrow-light">Jeffrey Sanchez-Burks</span>
            <h1 className="display">
              Reading the Room™
            </h1>
            <p style={{
              color: 'rgba(241,241,226,0.8)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginTop: '1rem',
            }}>
              A skills-based assessment of how well you recognize emotional reactions in groups.
            </p>
          </div>

          <div className="card-body">

            {/* Technical note matching original */}
            <div style={{
              background: '#fffbea',
              border: '1px solid #f0e68c',
              borderRadius: 'var(--radius-sm)',
              padding: '0.875rem 1rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{
                fontSize: '0.82rem',
                color: '#7a6800',
                lineHeight: 1.65,
                fontFamily: 'Saira',
              }}>
                <strong>Note:</strong> Please make sure Javascript is enabled.
                Depending on your browser settings, some images may not load properly.
              </p>
            </div>

            {/* Original CTA text */}
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}>
              After submitting your responses, you will be redirected to a personalized
              feedback report. Please provide the following information if you would like
              to receive the report via email.
            </p>

            <div className="divider" style={{ marginBottom: '1.5rem' }} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="firstName">Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="sample@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {error && (
                <p style={{ color: 'var(--negative)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              <button className="btn btn-full" type="submit" disabled={loading}>
                {loading ? 'Starting…' : 'Begin Assessment →'}
              </button>
            </form>

            <p style={{
              fontSize: '0.72rem',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '1rem',
              lineHeight: 1.6,
            }}>
              You'll also receive Jeffrey's monthly note on leadership and human behavior.
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
