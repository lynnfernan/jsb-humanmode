import React, { useState } from 'react'
import { EMOTION_CARDS, phraseOfTheDay } from './phrases.js'
import {
  LINKS,
  BOOK_URL,
  SHARE,
  linkedInShare,
  xShare,
  emailShare,
  utm,
} from './links.js'

export function MkNav({ active }) {
  // Keep nav minimal: brand + Hub drive discovery; tool pages are reached from Hub cards.
  return (
    <nav className="mk-nav">
      <a href="/hub" className="mk-nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="mk-nav-name">Human Mode</span>
        <span className="mk-nav-tag">Jeffrey Sanchez-Burks</span>
      </a>
      <div className="mk-nav-links">
        <a
          href="/hub"
          style={active === 'hub' ? { color: '#fff', fontWeight: 700 } : undefined}
        >
          Field Kit
        </a>
        <a href={BOOK_URL} target="_blank" rel="noopener noreferrer">
          Book
        </a>
      </div>
    </nav>
  )
}

export function PhraseOfTheDay() {
  const p = phraseOfTheDay()
  return (
    <div className="mk-phrase-day">
      <div className="mk-card-meta" style={{ marginBottom: '0.35rem', color: 'var(--slate)' }}>
        Phrase of the day
      </div>
      <div className="line">“{p.line}”</div>
      <div className="note">{p.note}</div>
    </div>
  )
}

export function EmotionHelper() {
  const [key, setKey] = useState('anger')
  const card = EMOTION_CARDS[key]
  return (
    <div>
      <p className="mk-muted" style={{ marginBottom: '0.5rem' }}>
        What is the person holding? Tap one — get lines that work.
      </p>
      <div className="mk-emotion-tabs">
        {Object.values(EMOTION_CARDS).map((c) => (
          <button
            key={c.key}
            type="button"
            className={key === c.key ? 'active' : ''}
            onClick={() => setKey(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontStyle: 'italic' }}>
        Short of: {card.shortOf}
      </p>
      <div className="mk-try-list">
        {card.try.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>
        <strong>Sixty seconds:</strong> {card.sixty}
      </p>
      <p className="mk-muted" style={{ marginTop: '0.5rem' }}>
        Avoid: {card.avoid.join(' · ')}
      </p>
    </div>
  )
}

export function ShareBar({ url, title, text }) {
  const shareUrl = utm(url, 'share_bar')
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="mk-share">
      <a href={linkedInShare(shareUrl)} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={xShare(shareUrl, text)} target="_blank" rel="noopener noreferrer">
        X / Twitter
      </a>
      <a href={emailShare(title, `${text}\n\n${shareUrl}`)}>Email</a>
      <button type="button" onClick={copy}>
        {copied ? '✓ Copied' : 'Copy link'}
      </button>
    </div>
  )
}

export function BookCta({ compact }) {
  return (
    <div className="mk-book-cta">
      <p className="mk-book-eyebrow">The ethos</p>
      <h2>Human Mode, Always.</h2>
      <p>
        {compact
          ? 'Practice free. Go deeper in the book when you’re ready.'
          : 'Free practices keep the skill alive between meetings. The book is the full manual — research, stories, and the framework for leading without pausing your most human capabilities.'}
      </p>

      {!compact && (
        <div className="mk-book-paths">
          <a href="/">Read the Room</a>
          <span aria-hidden="true">·</span>
          <a href="/bricolage">Tap the Rest of You</a>
          <span aria-hidden="true">·</span>
          <a href="/competent-humility">Drop the Certainty Theater</a>
          <span aria-hidden="true">·</span>
          <a href="/quiet">Skip the Pep Talk</a>
          <span aria-hidden="true">·</span>
          <a href="/hub">Field Kit</a>
        </div>
      )}

      <div className="mk-cta-row">
        <a
          className="mk-btn mk-btn-amazon"
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy now on Amazon →
        </a>
        <a
          className="mk-btn mk-btn-secondary"
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Human Mode, the book
        </a>
        {compact && (
          <a className="mk-btn mk-btn-secondary" href="/hub">
            Field Kit
          </a>
        )}
      </div>
      <p className="mk-book-meta">
        Jeffrey Sanchez-Burks · HarperCollins 2027 ·{' '}
        <em>Unlock Your Unique Edge and Transform Your World of Work</em>
      </p>
    </div>
  )
}

export function EmailPdfForm({
  source = 'quiet_understanding',
  asset = 'quiet',
  buttonLabel,
  emphasizeTip = true,
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | ok | err
  const [error, setError] = useState('')

  const pdfHref = asset === 'comphum' ? LINKS.comphumPdf : LINKS.quietPdf
  const consentLabel =
    asset === 'comphum'
      ? 'Email me the Competent Humility Playbook and occasional notes on leadership from Human Mode.'
      : 'Email me the Quiet Understanding guide and occasional notes on leadership from Human Mode.'
  const submitLabel =
    buttonLabel ||
    (emphasizeTip ? 'Email me the PDF + tip →' : 'Email me the PDF →')
  const helperText = emphasizeTip
    ? 'Optional: we email the free PDF plus one practice tip. No spam. Unsubscribe anytime.'
    : 'Optional: we email you the free PDF. No spam. Unsubscribe anytime.'
  const successText = emphasizeTip
    ? '✓ Check your inbox — guide link + one practice tip on the way.'
    : '✓ Check your inbox — the guide link is on its way.'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!consent) {
      setError('Please confirm you want the guide emailed.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/send-playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: name.trim() || undefined,
          source,
          asset,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Could not send. Download the PDF below instead.')
      }
      setStatus('ok')
    } catch (err) {
      setStatus('err')
      setError(err.message || 'Something went wrong.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="mk-form">
        <p className="mk-success">{successText}</p>
        <p className="mk-muted" style={{ marginTop: '0.5rem' }}>
          Prefer not to wait?{' '}
          <a href={pdfHref} download>
            Download the PDF now
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form className="mk-form" onSubmit={submit}>
      <p style={{ fontSize: '0.9rem', marginBottom: '0.85rem', color: 'var(--muted)' }}>
        {helperText}
      </p>
      <div className="field">
        <label htmlFor="mk-name">First name (optional)</label>
        <input
          id="mk-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
        />
      </div>
      <div className="field">
        <label htmlFor="mk-email">Email</label>
        <input
          id="mk-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>{consentLabel}</span>
      </label>
      {error && <p className="mk-error">{error}</p>}
      <button
        className="mk-btn mk-btn-navy"
        type="submit"
        disabled={status === 'loading'}
        style={{ width: '100%' }}
      >
        {status === 'loading' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}

export { LINKS, BOOK_URL, SHARE }
