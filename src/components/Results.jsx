import React from 'react'

export default function Results({ scores, leadData, onRetake }) {
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
          <div className="card-hero">
            <span className="eyebrow-light">Assessment Complete</span>
            <h1 className="display">Your Emotional Aperture Profile</h1>
          </div>

          <div className="card-body">
            {leadData?.firstName && (
              <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1rem', color: 'var(--muted)' }}>
                Thank you for completing the assessment, {leadData.firstName}.
              </p>
            )}

            <div className="results-grid" style={{ marginBottom: '2rem' }}>
              {scores && Object.entries(scores).map(([key, value]) => (
                <div key={key} className="result-card">
                  <div className="result-label">{key}</div>
                  <div className="result-value">{value}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--cream)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                Your personalized report is being generated and will be sent to <strong>{leadData?.email}</strong> shortly.
              </p>
            </div>

            <button className="btn btn-full" onClick={onRetake}>
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
