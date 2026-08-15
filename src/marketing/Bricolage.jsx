import React, { useEffect, useState } from 'react'
import { MkNav, ShareBar, BookCta, LINKS } from './components.jsx'
import {
  INSIDE,
  MATERIALS,
  PRACTICES,
  practiceOfTheDay,
  drawResource,
  FORAGE_STEPS,
  WEEKLY_LOOP,
} from './bricoleurPhrases.js'
import './marketing.css'

const SHARE = {
  title: 'Bricolage · free exercises from Human Mode',
  text: 'Free exercises for the problem you cannot solve with what is officially in your job description. Rummage through what you already carry. From Jeffrey Sanchez-Burks.',
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
        Before the gap list, inventory one material. Tap a lane.
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

function OverlookedResourcePrompt() {
  const [challenge, setChallenge] = useState('')
  const [drawn, setDrawn] = useState(null)
  const [move, setMove] = useState('')

  function draw() {
    setDrawn(drawResource(drawn?.index ?? -1))
    setMove('')
  }

  return (
    <div
      className="mk-practice-box"
      style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '1rem 1.1rem' }}
    >
      <p className="mk-card-meta" style={{ color: 'var(--slate)', marginBottom: '0.5rem' }}>
        Exercise A · Overlooked resource deck
      </p>
      <p className="mk-muted" style={{ marginBottom: '0.75rem' }}>
        Everyone tells you to think outside the box. Work mode locked the boxes worth opening. Name
        the stuck problem, then draw a card from what you already carry.
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
        style={taStyle}
      />
      <button type="button" className="mk-btn mk-btn-navy" onClick={draw}>
        Draw a card →
      </button>
      {drawn && (
        <div style={{ marginTop: '0.9rem' }}>
          <p className="mk-card-meta" style={{ color: 'var(--slate)' }}>
            {drawn.suit}
          </p>
          <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{drawn.card}</p>
          <label
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--navy)',
              marginBottom: '0.35rem',
            }}
          >
            One usable next move (not the perfect plan)
          </label>
          <textarea
            value={move}
            onChange={(e) => setMove(e.target.value)}
            rows={2}
            placeholder="What will you try this week because of this card?"
            style={taStyle}
          />
          {move.trim() && (
            <p style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.9rem' }}>
              You foraged. Ship a rough version of that move this week.
            </p>
          )}
          <button
            type="button"
            className="mk-btn mk-btn-outline-navy"
            style={{ marginTop: '0.5rem' }}
            onClick={draw}
          >
            Draw again
          </button>
        </div>
      )}
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
    <div
      className="mk-practice-box"
      style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '1rem 1.1rem' }}
    >
      <p className="mk-card-meta" style={{ color: 'var(--slate)', marginBottom: '0.5rem' }}>
        Exercise B · 60-Second Memory Forage
      </p>
      <p className="mk-muted" style={{ marginBottom: '0.75rem' }}>
        Digital twin of the Bricolage Lab. Summon a specific person. Leave with a next move, not a
        story.
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
        Name the challenge (one sentence)
      </label>
      <textarea
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        rows={2}
        placeholder="e.g. Launch is blocked until headcount lands next quarter…"
        style={taStyle}
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
          <label
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--navy)',
              marginBottom: '0.35rem',
            }}
          >
            {done
              ? 'Time’s up. Write one usable next move.'
              : 'While the timer runs: who are you summoning?'}
          </label>
          <textarea
            value={move}
            onChange={(e) => setMove(e.target.value)}
            rows={3}
            placeholder={
              done
                ? 'One next move, not the perfect plan…'
                : 'Grandmother / former boss / child… How would they solve this?'
            }
            style={taStyle}
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

function PracticeBrowser() {
  const [n, setN] = useState(1)
  const p = PRACTICES.find((x) => x.n === n) || PRACTICES[0]
  return (
    <div>
      <p className="mk-muted" style={{ marginBottom: '0.5rem' }}>
        Five practices from the playbook. Open one. Run it this week.
      </p>
      <div className="mk-emotion-tabs">
        {PRACTICES.map((pr) => (
          <button
            key={pr.n}
            type="button"
            className={n === pr.n ? 'active' : ''}
            onClick={() => setN(pr.n)}
          >
            {pr.n}. {pr.title.split(' ').slice(0, 3).join(' ')}
            {pr.title.split(' ').length > 3 ? '…' : ''}
          </button>
        ))}
      </div>
      <p style={{ fontWeight: 700, color: 'var(--navy)', margin: '0.75rem 0 0.25rem' }}>{p.title}</p>
      <p style={{ fontStyle: 'italic', color: 'var(--navy)', marginBottom: '0.5rem' }}>“{p.line}”</p>
      <p className="mk-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        <strong>When:</strong> {p.when}
      </p>
      <ol style={{ margin: '0 0 0.5rem 1.15em', fontSize: '0.92rem', lineHeight: 1.45 }}>
        {p.steps.map((s) => (
          <li key={s} style={{ marginBottom: '0.25rem' }}>
            {s}
          </li>
        ))}
      </ol>
      <p style={{ fontSize: '0.85rem', color: '#8a3a32' }}>
        <strong>Anti-pattern:</strong> {p.anti}
      </p>
    </div>
  )
}

const taStyle = {
  width: '100%',
  padding: '0.55rem 0.65rem',
  border: '1px solid var(--line)',
  borderRadius: 6,
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  marginBottom: '0.75rem',
  resize: 'vertical',
}

export default function Bricolage() {
  useEffect(() => {
    document.title = 'Tap the Rest of You · Bricolage | Human Mode'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Free Bricolage exercises from Human Mode: 60-Second Memory Forage, overlooked-resource deck, five practices, and a full playbook PDF.'
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
          <h2>What’s inside</h2>
          <ul>
            {INSIDE.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                {' · '}
                {item.gloss}
              </li>
            ))}
          </ul>
          <div className="mk-stat">
            The room waits for ideal conditions. Meanwhile the people at the table have already
            solved stranger problems in other lives. That invitation is the skill.
          </div>
        </section>

        <section className="mk-section">
          <h2>Preview</h2>
          <div className="mk-preview">
            <div className="mk-preview-block navy">
              <h4>Cover</h4>
              <p className="mk-preview-title">Bricolage</p>
              <p className="mk-preview-sub">
                Tap the Rest of You. Lead with memory, tools, and people already in the room.
              </p>
            </div>
            <div className="mk-preview-block">
              <h4>Sample script · Inventory</h4>
              <p style={{ fontStyle: 'italic', color: 'var(--navy)', fontWeight: 600 }}>
                “Before we name what we don’t have, let’s name what we do, including who here has
                solved a cousin of this problem somewhere else.”
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Flip the first ten minutes. Then list the true gaps.
              </p>
            </div>
          </div>
          <div className="mk-cta-row" style={{ marginTop: '1.15rem' }}>
            <a className="mk-btn mk-btn-navy" href={LINKS.bricolagePdf} download>
              Download full playbook (PDF)
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.bricolagePocket} download>
              1-page pocket card
            </a>
          </div>
        </section>

        <section className="mk-section" id="exercises">
          <h2>Use it today</h2>
          <PracticeOfDay />
          <h3 style={{ marginTop: '1.25rem' }}>Interactive · Inventory a material</h3>
          <MaterialHelper />
          <h3 style={{ marginTop: '1.25rem' }}>Run the exercises</h3>
          <OverlookedResourcePrompt />
          <div style={{ marginTop: '1rem' }}>
            <ForageTimer />
          </div>
          <h3 style={{ marginTop: '1.25rem' }}>Five practices at a glance</h3>
          <PracticeBrowser />
          <h3 style={{ marginTop: '1.25rem' }}>30-day loop</h3>
          <div
            className="mk-grid-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
          >
            {WEEKLY_LOOP.map((w) => (
              <article key={w.week} className="mk-card">
                <span className="mk-card-meta">Week {w.week}</span>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{w.focus}</p>
              </article>
            ))}
          </div>
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
