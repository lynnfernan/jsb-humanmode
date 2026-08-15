import React, { useEffect } from 'react'
import {
  MkNav,
  PhraseOfTheDay,
  EmotionHelper,
  ShareBar,
  BookCta,
  LINKS,
  SHARE,
} from './components.jsx'
import './marketing.css'

export default function QuietUnderstanding() {
  useEffect(() => {
    document.title = 'Skip the Pep Talk · Quiet Understanding | Human Mode'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'A free 60-second field guide for the moment after someone tells you something hard. Phrasebook, exercises, research-backed.'
      )
    }
  }, [])

  return (
    <div className="mk-shell">
      <MkNav active="quiet" />
      <div className="mk-page">
        <header className="mk-hero">
          <span className="eyebrow">Skip the Pep Talk · Free field guide</span>
          <h1>Quiet Understanding</h1>
          <p className="mk-promise">
            A 60-second field guide for the moment after someone tells you something hard.
          </p>
          <p className="mk-sub">
            Three exercises, a phrasebook for anger, sadness, and dejection, and the two sentences
            that actually lower the temperature in a room — from Jeffrey Sanchez-Burks, author of{' '}
            <em>Human Mode</em>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-primary" href={LINKS.quietPdf} download>
              Download free PDF →
            </a>
            <a className="mk-btn mk-btn-secondary" href={LINKS.quietPocket} download>
              1-page pocket card
            </a>
          </div>
        </header>

        <section className="mk-section">
          <h2>What’s inside</h2>
          <ul>
            <li>
              <strong>Plan D</strong> — quiet understanding vs looking away, dismissing, or fixing
              too fast
            </li>
            <li>
              <strong>Research-backed</strong> — where quiet understanding was used, team negativity
              intensity fell <strong>21.2%</strong>
            </li>
            <li>
              <strong>Question vs sideways</strong> language (and why confident diagnosis fails)
            </li>
            <li>
              <strong>Phrasebook</strong> for anger, sadness, and dejection — try / avoid / 60
              seconds
            </li>
            <li>
              <strong>Three printable exercises</strong> — name your plan, rephrase diagnoses, one
              person / one week
            </li>
          </ul>
          <div className="mk-stat">
            Only <strong>23%</strong> of people respond with quiet understanding in hard emotional
            moments at work. The skill is smaller than you think — the first sentence is nearly all
            of it.
          </div>
        </section>

        <section className="mk-section">
          <h2>Preview</h2>
          <div className="mk-preview">
            <div className="mk-preview-block navy">
              <h4>Cover</h4>
              <p className="mk-preview-title">Quiet Understanding</p>
              <p className="mk-preview-sub">
                A field guide for the sixty seconds after someone tells you something hard.
              </p>
            </div>
            <div className="mk-preview-block">
              <h4>Sample phrase · Anger</h4>
              <p style={{ fontStyle: 'italic', color: 'var(--navy)', fontWeight: 600 }}>
                “What landed hardest?”
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Not: “I can see that you’re worried about the reorg.” Diagnose less. Ask more.
              </p>
            </div>
          </div>
          <div className="mk-cta-row" style={{ marginTop: '1.15rem' }}>
            <a className="mk-btn mk-btn-navy" href={LINKS.quietPdf} download>
              Download full guide (PDF)
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.quietPocket} download>
              1-page pocket card
            </a>
          </div>
        </section>

        <section className="mk-section">
          <h2>Use it today</h2>
          <PhraseOfTheDay />
          <h3>Interactive · What are they holding?</h3>
          <EmotionHelper />
        </section>

        <section className="mk-section">
          <h2>Share this guide</h2>
          <p className="mk-muted">
            Open download — no account required. Perfect for managers, Exec Ed, and team leave-behinds.
          </p>
          <ShareBar
            url={LINKS.quietUnderstanding}
            title={SHARE.quietTitle}
            text={SHARE.quietText}
          />
          <div className="mk-qr-row">
            <img
              src="/playbooks/qr-quiet-understanding.png"
              alt="QR code to Quiet Understanding landing page"
              width={120}
              height={120}
            />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>
                Scan or share the QR
              </p>
              <p className="mk-muted">
                Points to this page — download, pocket card, and practice tools in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="mk-section">
          <h2>Part of the Field Kit</h2>
          <p>
            Pair this guide with free practices: <strong>Read the Room</strong>,{' '}
            <strong>Tap the Rest of You</strong>, and <strong>Drop the Certainty Theater</strong>.
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-navy" href="/hub">
              Open Field Kit →
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/">
              Read the Room
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/bricolage">
              Tap the Rest of You
            </a>
            <a className="mk-btn mk-btn-outline-navy" href="/competent-humility">
              Drop the Certainty Theater
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
