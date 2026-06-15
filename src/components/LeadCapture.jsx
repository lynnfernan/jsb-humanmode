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
            <span className="eyebrow-light">Research-Based Assessment</span>
            <h1 className="display">Can you read the room?</h1>
            <p style={{ color: 'rgba(241,241,226,0.75)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '1rem' }}>
              Most leaders think they track how their team is feeling. 
              Jeffrey's research shows most of us are only catching part of the picture.
              This assessment measures what you actually see — not what you think you see.
            </p>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.75rem' }}>
              {[
                { icon: '⏱', label: '5 minutes' },
                { icon: '🎬', label: '17 scenes' },
                { icon: '📊', label: 'Instant results' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{icon}</div>
                  <div style={{ fontFamily: 'Saira', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ marginBottom: '1.75rem' }} />

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
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
                {loading ? 'Starting…' : 'Start the Assessment →'}
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
              You'll also receive Jeffrey's monthly note on leadership and human behavior.
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
