import React, { useEffect, useState } from 'react'
import {
  MkNav,
  ShareBar,
  BookCta,
  EmailPdfForm,
  LINKS,
  BOOK_URL,
} from './components.jsx'
import { TRAPS, practiceOfTheDay } from './comphumPhrases.js'
import './marketing.css'

const SHARE = {
  title: 'Drop the Certainty Theater · Competent Humility playbook from Human Mode',
  text: 'Free field guide: five practices for competent humility without certainty theater. Companion to the Pulse Check, not the instrument itself.',
}

function PracticeOfDay() {
  const p = practiceOfTheDay()
  return (
    <div className="mk-phrase-day">
      <div className="mk-card-meta" style={{ marginBottom: '0.35rem', color: 'var(--slate)' }}>
        Practice of the day · #{p.n}
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
        {p.title}
      </div>
      <div className="line">“{p.line}”</div>
      <div className="note">{p.note}</div>
    </div>
  )
}

function TrapHelper() {
  const [key, setKey] = useState('certainty')
  const t = TRAPS[key]
  return (
    <div>
      <p className="mk-muted" style={{ marginBottom: '0.5rem' }}>
        Which trap do you fall into when the room gets political? Tap one — get this week’s move.
      </p>
      <div className="mk-emotion-tabs">
        {Object.values(TRAPS).map((c) => (
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
      <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
        <em>{t.looksLike}</em> · Cost: {t.cost}
      </p>
      <p style={{ fontWeight: 700, color: 'var(--navy)', margin: '0.75rem 0 0.35rem' }}>{t.practice}</p>
      <div className="mk-try-list">
        <span>{t.script}</span>
      </div>
      <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>{t.tip}</p>
    </div>
  )
}

export default function CompetentHumilityPlaybook() {
  const [showEmail, setShowEmail] = useState(false)

  useEffect(() => {
    document.title =
      'Drop the Certainty Theater · Competent Humility Playbook | Human Mode'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Free Competent Humility playbook: five practices without certainty theater. Companion to the Pulse Check — not the assessment itself.'
      )
    }
  }, [])

  return (
    <div className="mk-shell">
      <MkNav active="comphum" />
      <div className="mk-page">
        <header className="mk-hero">
          <span className="eyebrow">Drop the Certainty Theater · Free field guide</span>
          <h1>The Confident and Humble Leader’s Playbook</h1>
          <p className="mk-promise">
            Five practices for leading with competence and disciplined openness — without certainty
            theater or risking your reputation.
          </p>
          <p className="mk-sub">
            Not the Pulse Check instrument. A free companion field guide you run <em>after</em> the
            assessment — or any Tuesday you tighten into “we’ve got this” when you don’t fully. From
            Jeffrey Sanchez-Burks, author of <em>Human Mode</em>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-primary" href={LINKS.comphumPdf} download>
              Download free PDF →
            </a>
            <button
              type="button"
              className="mk-btn mk-btn-secondary"
              onClick={() => setShowEmail((v) => !v)}
            >
              Email me the PDF
            </button>
          </div>
          {showEmail && (
            <div style={{ marginTop: '1rem' }}>
              <EmailPdfForm
                source="comphum_playbook_landing"
                asset="comphum"
                buttonLabel="Email me the PDF →"
                emphasizeTip={false}
              />
            </div>
          )}
        </header>

        <section className="mk-section">
          <h2>Not the Pulse Check — the practice after it</h2>
          <ul>
            <li>
              <strong>Pulse Check</strong> = 8-statement assessment (score + result)
            </li>
            <li>
              <strong>This playbook</strong> = five scripts you run in real rooms this week
            </li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Competent humility is not low confidence. Own your craft, name complexity, leave oxygen
            for the unknown — then decide.
          </p>
        </section>

        <section className="mk-section">
          <h2>What’s inside</h2>
          <ul>
            <li>
              <strong>The certainty tax</strong> — why looking sure can signal less competence
            </li>
            <li>
              <strong>Four traps</strong> — Certainty Actor · Quiet Expert · Open Amateur · Gold
              Standard
            </li>
            <li>
              <strong>Five practices</strong> — Know/Don’t know/Decide · Pre-mortem · Claim craft ·
              Dissenting junior · Repair in 48 hours
            </li>
            <li>
              <strong>30-day loop</strong> — one focus per week
            </li>
          </ul>
        </section>

        <section className="mk-section">
          <h2>Preview</h2>
          <div className="mk-preview">
            <div className="mk-preview-block navy">
              <h4>Cover</h4>
              <p className="mk-preview-title">Confident &amp; Humble</p>
              <p className="mk-preview-sub">
                Five practices. Not fake modesty. Not vulnerability theater.
              </p>
            </div>
            <div className="mk-preview-block">
              <h4>Sample script · Practice 1</h4>
              <p style={{ fontStyle: 'italic', color: 'var(--navy)', fontWeight: 600 }}>
                “Here’s what I know. Here’s what no one can really know. Here’s how we’ll decide —
                and by when.”
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Keep authority without pretending omniscience.
              </p>
            </div>
          </div>
          <div className="mk-cta-row" style={{ marginTop: '1.15rem' }}>
            <a className="mk-btn mk-btn-navy" href={LINKS.comphumPdf} download>
              Download full guide (PDF)
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.comphumPocket} download>
              1-page pocket card
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/competent-humility">
              Take Pulse Check first →
            </a>
          </div>
        </section>

        <section className="mk-section">
          <h2>Use it today</h2>
          <PracticeOfDay />
          <h3>Interactive · Name your trap</h3>
          <TrapHelper />
        </section>

        <section className="mk-section">
          <h2>Share this playbook</h2>
          <p className="mk-muted">
            Open download — ideal after Pulse Check, for leadership teams, and Exec Ed leave-behinds.
          </p>
          <ShareBar url={LINKS.comphum} title={SHARE.title} text={SHARE.text} />
          <div className="mk-qr-row">
            <img
              src="/playbooks/qr-comphum.png"
              alt="QR code to Competent Humility playbook"
              width={120}
              height={120}
            />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--navy)' }}>Scan for this page</p>
              <p className="mk-muted">Full PDF, pocket card, trap helper, and Pulse Check link.</p>
            </div>
          </div>
        </section>

        <section className="mk-section">
          <h2>Part of the Field Kit</h2>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-navy" href="/hub">
              Open Field Kit →
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/competent-humility">
              Drop the Certainty Theater
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/quiet">
              Skip the Pep Talk
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/">
              Read the Room
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/bricolage">
              Tap the Rest of You
            </a>
          </div>
        </section>

        <BookCta />

        <footer className="mk-footer">
          Human Mode, Always.
        </footer>
      </div>
    </div>
  )
}
