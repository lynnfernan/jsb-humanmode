import React, { useEffect, useState } from 'react'
import { MkNav, ShareBar, BookCta, LINKS } from './components.jsx'
import './marketing.css'

const SHARE = {
  title: 'Bricolage · free exercises from Human Mode',
  text: 'Free exercises for the problem you cannot solve with what is officially in your job description. Rummage through what you already carry. From Jeffrey Sanchez-Burks.',
}

/** Pluggable prompt surface. Content TK until exercises land. */
function OverlookedResourcePrompt() {
  const [challenge, setChallenge] = useState('')
  const [drawn, setDrawn] = useState(null)

  const PLACEHOLDERS = [
    'A summer job you hated at sixteen',
    'Your grandmother\u2019s garden',
    'A film you\u2019d swear you forgot',
    'A colleague from another industry',
    'A tool already paid for and half-used',
  ]

  function draw() {
    const i = Math.floor(Date.now() / 1000) % PLACEHOLDERS.length
    setDrawn(PLACEHOLDERS[i])
  }

  return (
    <div className="mk-practice-box" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '1rem 1.1rem' }}>
      <p className="mk-card-meta" style={{ color: 'var(--slate)', marginBottom: '0.5rem' }}>
        Interactive · Overlooked resource
      </p>
      <p className="mk-muted" style={{ marginBottom: '0.75rem' }}>
        Name a stuck problem. Draw one prompt from what you already carry. Full exercise set is TK
        and will replace this starter.
      </p>
      <label
        style={{
          display: 'block',
          fontSize: '0.88rem',
          fontWeight: 600,
          color: 'var(--navy)',
          marginBottom: '0.35rem',
        }}
      >
        The problem you cannot solve with the official toolkit
      </label>
      <textarea
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        rows={2}
        placeholder="One sentence…"
        style={{
          width: '100%',
          padding: '0.55rem 0.65rem',
          border: '1px solid var(--line)',
          borderRadius: 6,
          fontFamily: 'inherit',
          fontSize: '0.95rem',
          marginBottom: '0.75rem',
          resize: 'vertical',
        }}
      />
      <button type="button" className="mk-btn mk-btn-navy" onClick={draw}>
        Draw a prompt →
      </button>
      {drawn && (
        <div style={{ marginTop: '0.9rem' }}>
          <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
            {drawn}
          </p>
          <p className="mk-muted" style={{ fontSize: '0.9rem' }}>
            How would that box open a next move on your problem? Write one usable step, not the
            perfect plan.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Bricolage() {
  useEffect(() => {
    document.title = 'Bricolage — Tap the Rest of You | Human Mode'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Free Bricolage exercises from Human Mode: rummage through what you already carry when the official toolkit runs out.'
      )
    }
  }, [])

  return (
    <div className="mk-shell">
      <MkNav active="bricoleur" />
      <div className="mk-page">
        <header className="mk-hero">
          <span className="eyebrow">Tap the Rest of You · Exercises + playbook</span>
          <h1>Bricolage</h1>
          <p className="mk-promise">
            A practice for the moment you have run out of the obvious answers.
          </p>
          <p className="mk-sub">
            Exercises for rummaging through what you already carry, plus a playbook for putting it
            to work, from Jeffrey Sanchez-Burks, author of <em>Human Mode</em>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-primary" href="#exercises">
              Start the exercises →
            </a>
            <a className="mk-btn mk-btn-secondary" href={LINKS.bricolagePdf} download>
              Download the playbook (PDF)
            </a>
          </div>
        </header>

        <section className="mk-section">
          <h2>What&rsquo;s inside</h2>
          <div className="mk-tk">
            <strong>TK.</strong> Four to six list items in the Quiet Understanding shape (bold label
            + short gloss). Copy still being written and will ship separately.
          </div>
        </section>

        <section className="mk-section" id="exercises">
          <h2>Use it today</h2>
          <OverlookedResourcePrompt />
          <div className="mk-cta-row" style={{ marginTop: '1.15rem' }}>
            <a className="mk-btn mk-btn-navy" href={LINKS.bricolagePdf} download>
              Download Bricolage playbook (PDF)
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.bricolagePocket} download>
              Pocket card
            </a>
          </div>
        </section>

        <section className="mk-section">
          <h2>Share these exercises</h2>
          <p className="mk-muted">
            Open download, no account required. Ideal after the Bricolage Lab, for leadership teams,
            and Exec Ed leave-behinds.
          </p>
          <ShareBar url={LINKS.bricolage} title={SHARE.title} text={SHARE.text} />
          <div className="mk-qr-row">
            <img
              src="/playbooks/qr-bricoleur.png"
              alt="QR code to Bricolage"
              width={120}
              height={120}
            />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>
                Scan or share the QR
              </p>
              <p className="mk-muted">Points to this page: exercises, playbook, pocket card.</p>
            </div>
          </div>
        </section>

        <section className="mk-section">
          <h2>Part of the Field Kit</h2>
          <p>
            Pair Bricolage with free practices: <strong>Read the Room</strong>,{' '}
            <strong>Drop the Certainty Theater</strong>, and <strong>Skip the Pep Talk</strong>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-navy" href="/hub">
              Open Field Kit →
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/">
              Read the Room
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/competent-humility">
              Drop the Certainty Theater
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/quiet">
              Skip the Pep Talk
            </a>
          </div>
        </section>

        <BookCta />

        <footer className="mk-footer">Human Mode, Always.</footer>
      </div>
    </div>
  )
}
