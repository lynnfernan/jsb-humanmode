import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import {
  HUMILITY_ITEMS,
  LIKERT_LABELS,
  COPY,
  PULSE_META,
} from '../data/humilityItems.js'
import { computeHumilityScores } from '../utils/humilityScoring.js'

const P = {
  INTRO: 'intro',
  QUIZ: 'quiz',
  RESULTS: 'results',
}

const SHARE_URL = 'https://jsb-humanmode.vercel.app/competent-humility'

function track(event, payload = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: `ch_pulse_${event}`, ...payload })
  }
}

export default function HumilityApp() {
  const [phase, setPhase] = useState(P.INTRO)
  const [itemIndex, setItemIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState(null)
  const [email, setEmail] = useState('')
  const [emailConsent, setEmailConsent] = useState(false)
  const [emailSaved, setEmailSaved] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (phase === P.INTRO) track('started')
  }, [phase])

  const current = HUMILITY_ITEMS[itemIndex]

  const handleSelect = (value) => {
    const next = { ...answers, [current.id]: value }
    setAnswers(next)
    setTimeout(() => {
      if (itemIndex + 1 < HUMILITY_ITEMS.length) {
        setItemIndex((i) => i + 1)
      } else {
        const result = computeHumilityScores(next)
        setScores(result)
        setPhase(P.RESULTS)
        track('completed')
        if (result) track('bucket_assigned', { bucket: result.bucketKey })
      }
    }, 160)
  }

  const handleOptionalEmail = (e) => {
    e.preventDefault()
    setEmailError('')
    if (!emailConsent) {
      setEmailError('Please confirm you want the result emailed.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Enter a valid email, or skip.')
      return
    }
    // TODO: wire CRM — tag assessment_humility_pulse, store only if opted in
    track('email_captured')
    setEmailSaved(true)
  }

  const handleRetake = () => {
    setItemIndex(0)
    setAnswers({})
    setScores(null)
    setEmail('')
    setEmailConsent(false)
    setEmailSaved(false)
    setEmailError('')
    setPhase(P.INTRO)
  }

  const handleCopy = () => {
    if (!scores) return
    const text = `${scores.bucket.shareText}\nTake it: ${SHARE_URL}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  // ── Intro ──
  if (phase === P.INTRO) {
    return (
      <div className="app-shell">
        <TopBar badge="Pulse Check" />
        <div className="page">
          <div className="card">
            <div className="card-hero">
              <span className="eyebrow-light">{COPY.eyebrow}</span>
              <h1 className="display">{COPY.title}</h1>
              <p
                style={{
                  color: 'rgba(241,241,226,0.75)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginTop: '1rem',
                }}
              >
                {COPY.standfirst}
              </p>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {COPY.chips.map(({ icon, label }) => (
                  <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{icon}</div>
                    <div className="meta-chip">{label}</div>
                  </div>
                ))}
              </div>
              <p className="body-lg" style={{ marginBottom: '1rem' }}>
                {COPY.introBody}
              </p>
              <p className="body-sm" style={{ marginBottom: '1.5rem' }}>
                {COPY.introNudge}
              </p>
              <button className="btn btn-full" onClick={() => setPhase(P.QUIZ)}>
                {COPY.startButton}
              </button>
              <p className="footer-soft" style={{ marginTop: '1.25rem' }}>
                {COPY.introFooter}
              </p>
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a href="/" className="link-subtle">
                  ← Emotional Aperture Assessment
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz (one statement per screen) ──
  if (phase === P.QUIZ && current) {
    return (
      <div className="app-shell">
        <TopBar badge="Pulse Check" />
        <ProgressBar current={itemIndex + 1} total={HUMILITY_ITEMS.length} />
        <div className="page">
          <div className="card">
            <div className="card-body">
              <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
                Statement {itemIndex + 1} of {HUMILITY_ITEMS.length}
              </span>
              <h2
                className="display-dark"
                style={{
                  textAlign: 'center',
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem',
                  lineHeight: 1.45,
                }}
              >
                {current.text}
              </h2>
              <p className="body-sm" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                {COPY.itemPrompt}
              </p>
              <p className="likert-scale-hint">{COPY.scaleHint}</p>
              <div className="likert-list">
                {LIKERT_LABELS.map(({ value, label }) => {
                  const selected = answers[current.id] === value
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`likert-option${selected ? ' selected' : ''}`}
                      onClick={() => handleSelect(value)}
                      aria-label={`${value}: ${label}`}
                    >
                      <span className="likert-num">{value}</span>
                      <span className="likert-label">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Results: single score, multi-paragraph body, close on practice ──
  if (phase === P.RESULTS && scores) {
    const { bucket, score, pct } = scores
    const bodyParas = Array.isArray(bucket.body) ? bucket.body : [bucket.body]

    return (
      <div className="app-shell">
        <TopBar badge="Your Result" />
        <div className="page">
          <div className="card">
            <div className="results-hero">
              <span className="eyebrow-light">{COPY.title}</span>
              <div className="profile-type" style={{ marginTop: '1rem', fontSize: '1.45rem' }}>
                {bucket.headline}
              </div>
              <div className="profile-tagline" style={{ marginTop: '0.75rem' }}>
                {COPY.tagline}
              </div>
            </div>

            <div className="breakdown-section" style={{ paddingTop: '1.5rem' }}>
              <span
                className="eyebrow"
                style={{ marginBottom: '0.75rem', display: 'block', textAlign: 'center' }}
              >
                {COPY.scoreLabel}
              </span>
              <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    lineHeight: 1,
                  }}
                >
                  {score.toFixed(2)}
                </span>
                <span
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    marginLeft: '0.5rem',
                  }}
                >
                  / 5.0
                </span>
              </div>
              <div className="axis-meter" style={{ marginBottom: '0.5rem', maxWidth: '100%' }}>
                <div className="axis-meter-track light">
                  <div className="axis-meter-fill navy" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <p
                className="body-sm"
                style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--muted)' }}
              >
                Mean of {HUMILITY_ITEMS.length} statements (1–5 scale)
              </p>
            </div>

            <div className="divider" />

            <div className="insight-section">
              <span className="eyebrow">What this means</span>
              {bodyParas.map((para, i) => (
                <p
                  key={i}
                  className="insight-text"
                  style={{ marginTop: i === 0 ? undefined : '1rem' }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="divider" />

            {/* Primary close: practice (JSB handoff — not preorder) */}
            <div className="insight-section" style={{ background: 'var(--cream)' }}>
              <span className="eyebrow">Try this</span>
              <p className="insight-text">{bucket.practice}</p>
            </div>

            <div className="divider" />

            <div className="share-section">
              <span
                className="eyebrow"
                style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}
              >
                Share your result
              </span>
              <div className="share-card">
                <span className="share-card-eyebrow">Competent Humility Pulse Check</span>
                <div className="share-card-type" style={{ fontSize: '1.25rem' }}>
                  {bucket.headline}
                </div>
                <div className="share-card-sub">{COPY.tagline}</div>
                <div className="share-card-score">Jeffrey Sanchez-Burks</div>
              </div>
              <div className="share-buttons">
                <a
                  className="share-btn share-btn-linkedin"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on LinkedIn
                </a>
                <button className="share-btn share-btn-copy" type="button" onClick={handleCopy}>
                  {copied ? '✓ Copied!' : '🔗 Copy Link'}
                </button>
              </div>
            </div>

            <div className="email-opt-in">
              <span className="eyebrow">Optional — email yourself this result</span>
              {emailSaved ? (
                <p className="body-sm" style={{ color: 'var(--positive)', marginTop: '0.5rem' }}>
                  ✓ Saved. We’ll only use this if you opted in — no spam.
                </p>
              ) : (
                <form onSubmit={handleOptionalEmail} style={{ marginTop: '0.75rem' }}>
                  <div className="field">
                    <label htmlFor="pulse-email">Email</label>
                    <input
                      id="pulse-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <label className="consent-row">
                    <input
                      type="checkbox"
                      checked={emailConsent}
                      onChange={(e) => setEmailConsent(e.target.checked)}
                    />
                    <span>
                      Email me this result and Jeffrey’s occasional note on leadership. I can
                      unsubscribe anytime.
                    </span>
                  </label>
                  {emailError && (
                    <p style={{ color: 'var(--negative)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
                      {emailError}
                    </p>
                  )}
                  <button
                    className="btn btn-slate btn-full"
                    type="submit"
                    style={{ marginTop: '0.75rem' }}
                  >
                    Send my result
                  </button>
                </form>
              )}
            </div>

            <div className="practice-cta">
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <a className="btn btn-full" href="/comphum" style={{ textAlign: 'center', textDecoration: 'none' }}>
                  Get the playbook →
                </a>
                <button className="btn btn-outline" type="button" onClick={handleRetake}>
                  Retake Pulse Check
                </button>
                <a className="btn btn-outline" href="/">
                  Read the Room
                </a>
                <a className="btn btn-outline" href="/hub">
                  Field Kit
                </a>
                <a
                  className="btn btn-outline"
                  href={PULSE_META.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {PULSE_META.bookLabel} →
                </a>
              </div>
              <p className="footer-soft" style={{ marginTop: '1.25rem', lineHeight: 1.55 }}>
                {COPY.creditLine}
              </p>
              <p className="footer-soft" style={{ marginTop: '0.5rem' }}>
                {COPY.tagline} · #HumanModeAlways
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
