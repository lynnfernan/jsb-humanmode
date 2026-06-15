import React from 'react'

export default function Instructions({ onStart, firstName }) {
  return (
    <div className="app-shell">
      <nav className="top-bar">
        <div className="top-bar-brand">
          <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
          <span className="top-bar-tagline">Human Mode, Always</span>
        </div>
        <span className="top-bar-badge">Instructions</span>
      </nav>

      <div className="page">
        <div className="card">
          <div className="card-hero">
            <span className="eyebrow-light">Before you begin</span>
            <h1 className="display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
              {firstName ? `Here's how it works, ${firstName}.` : "Here's how it works."}
            </h1>
          </div>

          <div className="card-body">
            <p className="body-lg" style={{ marginBottom: '1.75rem' }}>
              You'll watch a short animated scene — a group of four people reacting to something. 
              Your job is to estimate what percentage of the group felt a positive reaction 
              versus a negative one.
            </p>

            <ol className="instruction-steps">
              {[
                {
                  title: 'Watch the scene once.',
                  detail: 'Each animation plays through one time. Pay attention to all four faces — not just the loudest reaction.',
                },
                {
                  title: 'Estimate the split.',
                  detail: 'Use the sliders to indicate: what percentage of the group reacted positively, and what percentage reacted negatively. They should add up to 100%.',
                },
                {
                  title: 'Trust your gut.',
                  detail: "There's no trick. You're measuring your natural ability to read group-level emotion — not individual faces.",
                },
                {
                  title: 'Two practice rounds first.',
                  detail: "You'll get feedback on your estimates before the real assessment begins. Use them to calibrate.",
                },
              ].map((step, i) => (
                <li key={i} className="instruction-step">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-text">
                    <strong>{step.title}</strong>{' '}
                    {step.detail}
                  </div>
                </li>
              ))}
            </ol>

            <div className="divider" style={{ margin: '1.5rem 0' }} />

            <div style={{
              background: 'var(--cream)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              borderLeft: '3px solid var(--slate)',
            }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--ink)' }}>
                <strong style={{ color: 'var(--navy)' }}>Why this matters:</strong>{' '}
                Leaders who can perceive the full spread of emotions across their team — 
                not just the average mood, but who's energized and who's struggling — 
                intervene earlier and build stronger teams. This is emotional aperture. 
                Today you'll find out where yours stands.
              </p>
            </div>

            <button className="btn btn-full" onClick={onStart}>
              Begin Practice →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
