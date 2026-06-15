import React, { useState } from 'react'

// Two screens matching original EAM instrument exactly:
// Screen 1: Full instructions
// Screen 2: Pre-practice prompt — "Next you will complete your two practice trials..."

export default function Instructions({ onStart, firstName }) {
  const [screen, setScreen] = useState(1)

  if (screen === 2) {
    return (
      <div className="app-shell">
        <nav className="top-bar">
          <div className="top-bar-brand">
            <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
            <span className="top-bar-tagline">Human Mode, Always</span>
          </div>
          <span className="top-bar-badge">Practice</span>
        </nav>

        <div className="page">
          <div className="card">
            <div className="card-hero">
              <span className="eyebrow-light">You're almost ready</span>
              <h1 className="display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                Practice trials coming up.
              </h1>
            </div>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <p className="body-lg" style={{ marginBottom: '0.75rem' }}>
                Next you will complete your two practice trials.
              </p>
              <p className="body-lg" style={{ marginBottom: '1.75rem' }}>
                The movie clips are extremely brief — please focus carefully on your screen.
              </p>
              <button className="btn" style={{ minWidth: 220 }} onClick={onStart}>
                Click to Begin →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Screen 1 — Full instructions
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
            <span className="eyebrow-light">Read carefully before you begin</span>
            <h1 className="display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
              {firstName ? `Here's how it works, ${firstName}.` : "Here's how it works."}
            </h1>
          </div>

          <div className="card-body">
            <ol className="instruction-steps">
              {[
                {
                  title: 'You will see a series of brief, two-clip "movies."',
                  detail: 'In each movie, imagine you see a group of employees just before hearing about an event in their organization — and then their reaction to it.',
                },
                {
                  title: 'Following each movie, you will be asked about the group\'s emotional reaction.',
                  detail: 'Specifically, you will indicate what percent of the group showed positive and negative emotion.',
                },
                {
                  title: 'Positive and negative reactions do not need to add up to 100%.',
                  detail: 'Some employees may show no reaction — that is, some individuals could appear neutral. Therefore the positive and negative reactions you see do not need to add up to 100%.',
                },
                {
                  title: 'The emotional reactions appear and disappear rapidly.',
                  detail: 'Much like they do in the real world. For the purposes of this assessment, imagine the emotions you see reflect the employees\' true feelings.',
                },
                {
                  title: 'Each two-clip sequence is followed by two questions.',
                  detail: 'Sequences may differ slightly in length or format from previous ones. This is normal. After viewing each movie, the page will auto-advance to the questions.',
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
                <strong style={{ color: 'var(--navy)' }}>This survey takes about 8 minutes.</strong>{' '}
                You will complete 2 practice trials so you can familiarize yourself
                with the movies and the format of the questions.
                Once you are ready to begin, click the arrow below.
              </p>
            </div>

            <button className="btn btn-full" onClick={() => setScreen(2)}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
