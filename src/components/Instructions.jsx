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
          <div className="card-body">
            <ol className="instruction-steps" style={{ marginBottom: '1.5rem' }}>
              <li className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-text">
                  <strong>What You'll See</strong>
                  <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                    You will see brief videos of groups of people. For each video, estimate what percent of the group shows positive emotions and what percent shows negative emotions. Note that some people will show positive reactions, some will show negative reactions, and some will show no reaction at all (remaining neutral).
                  </div>
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-text">
                  <strong>How to Score</strong>
                  <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                    Positive and negative reactions do not need to add up to 100%. For example, 25% of the group might show positive emotions while only 25% show negative emotions—the remaining 50% could appear neutral. Answer what you actually see, not what you think should add up.
                  </div>
                </div>
              </li>

              <li className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-text">
                  <strong>What to Expect</strong>
                  <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                    You'll complete 2 practice videos first to get familiar with the format. Emotional reactions appear and disappear quickly, just like in real life. This takes about 8 minutes total. When you're ready, click the arrow to begin.
                  </div>
                </div>
              </li>
            </ol>

            <button className="btn btn-full" onClick={onStart} style={{ marginTop: '1.5rem' }}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
