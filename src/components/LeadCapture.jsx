import React, { useState } from 'react'

export default function LeadCapture({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', role: '' })
  const [errors, setErrors] = useState({})

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    onSubmit(form)
  }

  return (
    <div className="quiz-card" style={{ maxWidth: 540 }}>
      <div className="card-header">
        <div className="brand-name">Jeffrey Sanchez-Burks</div>
        <div className="brand-tagline">Human Mode, Always</div>

        <h1 style={{ fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>
          Emotional Aperture<br />Assessment
        </h1>
        <p style={{ color: '#578ead', fontSize: '0.95rem' }}>
          Discover how accurately you read collective emotions — and where your biases may lie.
        </p>
      </div>

      <div className="info-box" style={{ marginBottom: '1.75rem' }}>
        <strong>What you'll discover:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', lineHeight: 1.8 }}>
          <li>Your overall Emotional Aperture (EA™) score</li>
          <li>Accuracy reading positive &amp; negative group reactions</li>
          <li>"Pessimistic" and "Rose-Tinted" overestimation biases</li>
          <li>Your positive &amp; negative blind spots</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Work Email *</label>
          <input
            className="form-input"
            type="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Role / Title{' '}
            <span style={{ fontWeight: 400, color: '#aaa' }}>(optional)</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. VP, Director, Team Lead"
            value={form.role}
            onChange={set('role')}
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.25rem' }}
        >
          Start the Assessment →
        </button>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: '#bbb',
            marginTop: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          ~8 minutes &nbsp;·&nbsp; Results emailed to you &nbsp;·&nbsp; We respect your privacy.
        </p>
      </form>
    </div>
  )
}
