import React, { useEffect, useState } from 'react'
import { MkNav, ShareBar, BookCta, LINKS } from './components.jsx'
import { MATERIALS, PRACTICES, practiceOfTheDay, FORAGE_STEPS } from './bricoleurPhrases.js'
import './marketing.css'

const SHARE = {
  title: 'Becoming a Bricoleur — free field guide from Human Mode',
  text: 'Lead with what you have — memory, tools, and people already in the room. Free field guide + 60-Second Memory Forage from Jeffrey Sanchez-Burks.',
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

function MaterialHelper() {
  const [key, setKey] = useState('memory')
  const m = MATERIALS[key]
  return (
    <div>
      <p className="mk-muted" style={{ marginBottom: '0.5rem' }}>
        Before the gap list — inventory one material. Tap a lane.
      </p>
      <div className="mk-emotion-tabs">
        {Object.values(MATERIALS).map((c) => (
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
      <p style={{ fontWeight: 700, color: 'var(--navy)', margin: '0.75rem 0 0.35rem' }}>{m.prompt}</p>
      <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{m.tip}</p>
      <div className="mk-try-list" style={{ marginTop: '0.75rem' }}>
        <span>{m.move}</span>
      </div>
    </div>
  )
}

function ForageTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [challenge, setChallenge] = useState('')
  const [move, setMove] = useState('')

  useEffect(() => {
    if (!running) return undefined
    if (seconds <= 0) {
      setRunning(false)
      setDone(true)
      return undefined
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [running, seconds])

  function start() {
    setSeconds(60)
    setRunning(true)
    setDone(false)
    setMove('')
  }

  function reset() {
    setRunning(false)
    setSeconds(0)
    setDone(false)
    setMove('')
  }

  return (
    <div className="mk-practice-box" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '1rem 1.1rem' }}>
      <p className="mk-card-meta" style={{ color: 'var(--slate)', marginBottom: '0.5rem' }}>
        Interactive · 60-Second Memory Forage
      </p>
      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.35rem' }}>
        Name the challenge (one sentence)
      </label>
      <textarea
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        rows={2}
        placeholder="e.g. Launch is blocked until headcount lands next quarter…"
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
      <ol style={{ margin: '0 0 0.85rem 1.15em', fontSize: '0.92rem', lineHeight: 1.45 }}>
        {FORAGE_STEPS.map((s) => (
          <li key={s} style={{ marginBottom: '0.25rem' }}>
            {s}
          </li>
        ))}
      </ol>
      <div className="mk-cta-row" style={{ alignItems: 'center', gap: '0.75rem' }}>
        {!running && !done && (
          <button type="button" className="mk-btn mk-btn-navy" onClick={start}>
            Start 60-second forage →
          </button>
        )}
        {running && (
          <div
            style={{
              fontFamily: 'Saira, system-ui, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--navy)',
              minWidth: '3.5rem',
            }}
            aria-live="polite"
          >
            {seconds}s
          </div>
        )}
        {running && (
          <button type="button" className="mk-btn mk-btn-outline-navy" onClick={reset}>
            Cancel
          </button>
        )}
        {done && (
          <button type="button" className="mk-btn mk-btn-outline-navy" onClick={start}>
            Run again
          </button>
        )}
      </div>
      {(running || done) && (
        <div style={{ marginTop: '0.9rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.35rem' }}>
            {done ? 'Time’s up — write one usable next move' : 'While the timer runs: who are you summoning?'}
          </label>
          <textarea
            value={move}
            onChange={(e) => setMove(e.target.value)}
            rows={3}
            placeholder={
              done
                ? 'One next move — not the perfect plan…'
                : 'Grandmother / former boss / child… How would they solve this?'
            }
            style={{
              width: '100%',
              padding: '0.55rem 0.65rem',
              border: '1px solid var(--line)',
              borderRadius: 6,
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              resize: 'vertical',
            }}
          />
          {done && move.trim() && (
            <p style={{ marginTop: '0.65rem', fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>
              You foraged. Ship a rough version of that move this week.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function BecomingABricoleur() {
  useEffect(() => {
    document.title = 'Becoming a Bricoleur — Free Field Guide | Human Mode'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Free field guide: lead with what you have — memory, tools, and people already in the room. 60-Second Memory Forage + five practices from Jeffrey Sanchez-Burks.'
      )
    }
  }, [])

  return (
    <div className="mk-shell">
      <MkNav active="bricoleur" />
      <div className="mk-page">
        <header className="mk-hero">
          <span className="eyebrow">Free field guide · Human Mode Part II</span>
          <h1>Becoming a Bricoleur</h1>
          <p className="mk-promise">
            Lead with what you have — memory, tools, and people already in the room.
          </p>
          <p className="mk-sub">
            Solve unprecedented problems with what’s already here — not with the perfect plan you
            don’t have yet. Five practices. One 60-second forage. From Jeffrey Sanchez-Burks, author
            of <em>Human Mode</em>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-primary" href={LINKS.bricoleurPdf} download>
              Download free PDF →
            </a>
            <a className="mk-btn mk-btn-secondary" href={LINKS.bricoleurPocket} download>
              1-page pocket card
            </a>
          </div>
        </header>

        <section className="mk-section">
          <h2>What’s inside</h2>
          <ul>
            <li>
              <strong>What a Bricoleur is (and isn’t)</strong> — forager, not performative scrounger
            </li>
            <li>
              <strong>Three materials</strong> — lived memory · tools at hand · constraints as design
            </li>
            <li>
              <strong>Practice 1 — 60-Second Memory Forage</strong> — digital twin of the Bricolage
              Lab
            </li>
            <li>
              <strong>Four more practices</strong> — inventory first · two odd tools · rough
              artifact · forage debrief
            </li>
            <li>
              <strong>30-day loop</strong> — one focus per week
            </li>
          </ul>
          <div className="mk-stat">
            The room waits for ideal conditions — headcount, vendor, budget. Meanwhile the people at
            the table have already solved stranger problems in other lives. That invitation is the
            skill.
          </div>
        </section>

        <section className="mk-section">
          <h2>Preview</h2>
          <div className="mk-preview">
            <div className="mk-preview-block navy">
              <h4>Cover</h4>
              <p className="mk-preview-title">Becoming a Bricoleur</p>
              <p className="mk-preview-sub">
                Leading with what you have — memory, tools, and people already in the room.
              </p>
            </div>
            <div className="mk-preview-block">
              <h4>Sample script · Inventory</h4>
              <p style={{ fontStyle: 'italic', color: 'var(--navy)', fontWeight: 600 }}>
                “Before we name what we don’t have, let’s name what we do — including who here has
                solved a cousin of this problem somewhere else.”
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Flip the first ten minutes. Then list the true gaps.
              </p>
            </div>
          </div>
          <div className="mk-cta-row" style={{ marginTop: '1.15rem' }}>
            <a className="mk-btn mk-btn-navy" href={LINKS.bricoleurPdf} download>
              Download full guide (PDF)
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.bricoleurPocket} download>
              1-page pocket card
            </a>
          </div>
        </section>

        <section className="mk-section">
          <h2>Use it today</h2>
          <PracticeOfDay />
          <h3 style={{ marginTop: '1.25rem' }}>Interactive · Inventory a material</h3>
          <MaterialHelper />
          <h3 style={{ marginTop: '1.25rem' }}>Run the forage now</h3>
          <ForageTimer />
        </section>

        <section className="mk-section">
          <h2>Five practices at a glance</h2>
          <div
            className="mk-grid-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
          >
            {PRACTICES.map((p) => (
              <article key={p.n} className="mk-card">
                <span className="mk-card-meta">Practice {p.n}</span>
                <h3 style={{ fontSize: '1rem' }}>{p.title}</h3>
                <p style={{ fontStyle: 'italic', color: 'var(--navy)' }}>“{p.line}”</p>
                <p className="mk-muted" style={{ fontSize: '0.85rem' }}>
                  {p.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-section">
          <h2>Share this guide</h2>
          <p className="mk-muted">
            Open download — no account required. Ideal for Exec Ed, leadership teams, and
            leave-behinds after the Bricolage Lab.
          </p>
          <ShareBar url={LINKS.bricoleur} title={SHARE.title} text={SHARE.text} />
          <div className="mk-qr-row">
            <img
              src="/playbooks/qr-bricoleur.png"
              alt="QR code to Becoming a Bricoleur landing page"
              width={120}
              height={120}
            />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>
                Scan or share the QR
              </p>
              <p className="mk-muted">
                Points to this page — full PDF, pocket card, and interactive forage.
              </p>
            </div>
          </div>
        </section>

        <section className="mk-section">
          <h2>Part of the Field Kit</h2>
          <p>
            Pair this guide with free practices: <strong>Read the Room</strong>,{' '}
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
