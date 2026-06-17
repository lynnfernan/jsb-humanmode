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
            <div className="card-body" style={{ textAlign: 'left', paddingTop: '3rem' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', color: 'var(--ink)' }}>
                Next you will complete your two practice trials.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', color: 'var(--ink)' }}>
                The movie clips are extremely brief so please focus carefully on your screen.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', color: 'var(--ink)' }}>
                Click to begin.
              </p>
              <button className="btn btn-full" onClick={onStart}>
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Screen 1 — Full instructions matching Qualtrics exactly
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
          <div className="card-body">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--ink)' }}>
              Read the following instructions carefully:
            </h2>

            <ol className="instruction-steps" style={{ marginBottom: '1.5rem' }}>
              <li className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">
                  You will see a series of brief, two-clip "movies." In each movie, imagine you see a
                  group of employees just before hearing about an event in their organization and then
                  their reaction. Following each movie, you will be asked about the group's emotional
                  reaction to the event. Specifically, you will indicate what percent of the group
                  showed positive and negative emotion.
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">
                  <strong>Please note: while the questions will ask about certain emotions, not all
                  employees will show a reaction — that is, some employees could appear
                  neutral. Therefore, the positive and negative reactions you see do not need to
                  add up to 100%.</strong>
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">
                  For example, if you see that 25% of the group expresses a positive emotion, this does
                  not mean that 75% of the group must express a negative emotion. Instead, it could be
                  the case that only 25% of the group expresses negative emotions while 50% of the
                  group remains neutral (expressing neither positive nor negative emotions). In this case
                  you would answer "about one-fourth (25%)" of the group" for BOTH positive and
                  negative emotions.
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-text">
                  After viewing each group movie, the page will auto-advance to the questions about
                  that movie unless you are directed to click to continue.
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">5</div>
                <div className="step-text">
                  The emotional reactions in the movies will appear and disappear rapidly, much like
                  they do in the real world.
                </div>
              </li>
            </ol>

            <div style={{
              background: '#f9f7f2',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--ink)',
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>You will complete 2 practice trials so that you can familiarize yourself with the
                "movies" and the format of the questions.</strong>
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                This survey should take about 8 minutes to complete.
              </p>
              <p>
                Once you are ready to begin, click the arrow below:
              </p>
            </div>

            <button className="btn btn-full" onClick={() => setScreen(2)}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
