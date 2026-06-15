import React, { useState } from 'react'

const TYPE_COLORS = {
  'Two-Emotion Blend': '#578ead',
  'Emotion Transition': '#2a7d4f',
  'Single Emotion + Neutral': '#b45309',
  'All-Negative, Different': '#7c3aed',
  'All-Negative, Similar': '#b03a2e',
  'All-Positive': '#1c4b61',
}

function ScoreRing({ accuracy }) {
  return (
    <div className="score-ring">
      <div className="score-number">{accuracy}</div>
      <div className="score-label">Accuracy</div>
    </div>
  )
}

function ShareCard({ profile, accuracy, onCopy, copied }) {
  return (
    <div className="share-section">
      <span className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>
        Share your result
      </span>

      <div className="share-card">
        <span className="share-card-eyebrow">Emotional Aperture Assessment</span>
        <div className="share-card-type">{profile.name}</div>
        <div className="share-card-sub">{profile.tagline}</div>
        <div className="share-card-score">
          {accuracy}/100 accuracy · Jeffrey Sanchez-Burks
        </div>
      </div>

      <div className="share-buttons">
        <a
          className="share-btn share-btn-linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://jsb-humanmode.vercel.app')}&summary=${encodeURIComponent(`I just took the Emotional Aperture Assessment by Jeffrey Sanchez-Burks. My result: ${profile.name}. ${profile.shareText} Take it yourself:`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Share on LinkedIn
        </a>

        <button
          className="share-btn share-btn-copy"
          onClick={onCopy}
        >
          {copied ? '✓ Copied!' : '🔗 Copy Link'}
        </button>
      </div>
    </div>
  )
}

export default function Results({ scores, leadData, onRetake }) {
  const [copied, setCopied] = useState(false)

  if (!scores) return null

  const { overallAccuracy, typeScores, profile } = scores
  const firstName = leadData?.firstName || ''

  const handleCopy = () => {
    const text = `${profile.name} — ${profile.tagline}\nI scored ${overallAccuracy}/100 on the Emotional Aperture Assessment by Jeffrey Sanchez-Burks.\nTake it: https://jsb-humanmode.vercel.app`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="app-shell">
      <nav className="top-bar">
        <div className="top-bar-brand">
          <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
          <span className="top-bar-tagline">Human Mode, Always</span>
        </div>
        <span className="top-bar-badge">Your Results</span>
      </nav>

      <div className="page">
        <div className="card">

          {/* Hero */}
          <div className="results-hero">
            <span className="eyebrow-light">
              {firstName ? `${firstName}'s Result` : 'Your Result'}
            </span>
            <ScoreRing accuracy={overallAccuracy} />
            <div className="profile-type">{profile.name}</div>
            <div className="profile-tagline">{profile.tagline}</div>
          </div>

          {/* Insight */}
          <div className="insight-section">
            <span className="eyebrow">What this means</span>
            {profile.insight.split('\n\n').map((para, i) => (
              <p key={i} className="insight-text" style={{ marginBottom: i < profile.insight.split('\n\n').length - 1 ? '1rem' : 0 }}>
                {para}
              </p>
            ))}
          </div>

          <div className="divider" />

          {/* Breakdown by type */}
          <div className="breakdown-section">
            <span className="eyebrow" style={{ marginBottom: '1.25rem' }}>Accuracy by scenario type</span>
            {typeScores.map(({ type, accuracy }) => (
              <div key={type} className="breakdown-row">
                <span className="breakdown-label">{type.replace(', ', ',\n')}</span>
                <div className="breakdown-bar-wrap">
                  <div
                    className="breakdown-bar"
                    style={{
                      width: `${accuracy}%`,
                      background: TYPE_COLORS[type] || 'var(--slate)',
                    }}
                  />
                </div>
                <span className="breakdown-score">{accuracy}%</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* Share */}
          <ShareCard
            profile={profile}
            accuracy={overallAccuracy}
            onCopy={handleCopy}
            copied={copied}
          />

          <div className="divider" />

          {/* CTA */}
          <div className="practice-cta">
            <p>
              Jeffrey's book <em>MATTERING</em> — releasing late 2026 — builds on this 
              research with a complete framework for leading with full awareness. 
              You're on the list.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                className="btn btn-slate"
                href="https://workties.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go Deeper at workties.org →
              </a>
              <button className="btn btn-outline" onClick={onRetake}>
                Retake Assessment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
