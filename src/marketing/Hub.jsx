import React, { useEffect } from 'react'
import {
  MkNav,
  PhraseOfTheDay,
  EmotionHelper,
  ShareBar,
  BookCta,
  LINKS,
  BOOK_URL,
  SHARE,
} from './components.jsx'
import './marketing.css'

/** Source of truth: Desktop/Human-Mode-Hub-Copy-Spec.md §1–2. Verbatim punctuation. */
const HUB_CARDS = [
  {
    id: 'read-the-room',
    meta: 'Assessment + playbook · 8 min · Emotional Aperture',
    title: 'Read the Room',
    body: 'You left that meeting sure it went well. Two people in it had already checked out. Eight minutes with the measure I built shows you which faces you skip.',
    cta: { label: 'Take the assessment →', href: '/' },
    secondary: null,
    note: 'The playbook comes with your score.',
  },
  {
    id: 'tap-the-rest-of-you',
    meta: 'Exercises + playbook · Bricolage',
    title: 'Tap the Rest of You',
    body: 'Everyone tells you to think outside the box. Work mode locked the boxes worth opening: a summer job you hated at sixteen, your grandmother\u2019s garden, a film you\u2019d swear you forgot.',
    cta: { label: 'Start the exercises →', href: '/bricolage' },
    secondary: {
      label: 'Get the playbook',
      href: '/playbooks/bricolage-playbook.pdf',
      download: true,
    },
    note: null,
  },
  {
    id: 'drop-the-certainty-theater',
    meta: 'Pulse Check + playbook · 2 min · Competent Humility',
    title: 'Drop the Certainty Theater',
    body: 'There\u2019s a meeting this week where you\u2019ll sound more certain than you are. Two minutes, eight statements, and the sentence most of us swallow: \u201CI don\u2019t know yet. Let\u2019s work through this.\u201D',
    cta: { label: 'Start the Pulse Check →', href: '/competent-humility' },
    secondary: { label: 'Get the playbook', href: '/comphum' },
    note: null,
  },
  {
    id: 'skip-the-pep-talk',
    meta: 'Field guide · Quiet Understanding',
    title: 'Skip the Pep Talk',
    body: 'Someone tells you something hard and everything in you reaches for the bright side. Don\u2019t. Here\u2019s what to say in the sixty seconds after, for anger, for sadness, for dejection.',
    cta: { label: 'Get the field guide →', href: '/quiet' },
    secondary: {
      label: 'Pocket card',
      href: '/playbooks/quiet-understanding-pocket.pdf',
      download: true,
    },
    note: null,
  },
]

export default function Hub() {
  useEffect(() => {
    document.title =
      'The Human Mode, Always™ Field Kit · Free Practices | Jeffrey Sanchez-Burks'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Four free practices from Human Mode: Read the Room, Tap the Rest of You, Drop the Certainty Theater, and Skip the Pep Talk. No account required.'
      )
    }
  }, [])

  return (
    <div className="mk-shell">
      <MkNav active="hub" />
      <div className="mk-page">
        <header className="mk-hero">
          <span className="eyebrow">Free · No account · Human Mode</span>
          <h1>The Human Mode, Always™ Field Kit</h1>
          <p className="mk-promise">
            Four free practices: read the room, tap what you already carry, drop the certainty
            theater, and stay with someone when it gets hard.
          </p>
          <p className="mk-sub">
            From Jeffrey Sanchez-Burks, William Russell Kelly Professor at Michigan Ross and author
            of <em>Human Mode</em> (HarperCollins, 2027).
          </p>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-primary" href="#tools">
              Explore free practices →
            </a>
            <a
              className="mk-btn mk-btn-secondary"
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the book on Amazon
            </a>
          </div>
        </header>

        <section className="mk-section" id="tools">
          <h2>Start with the hard part</h2>
          <p className="mk-muted" style={{ marginBottom: '0.75rem' }}>
            Four practices from the book. Free, no account. Start with whichever one matches the
            meeting you{'\u2019'}re dreading this week.
          </p>
          <div
            className="mk-grid-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
          >
            {HUB_CARDS.map((card) => (
              <article className="mk-card" key={card.id}>
                <span className="mk-card-meta">{card.meta}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>

                <div className="mk-card-actions">
                  <a className="mk-btn mk-btn-navy" href={card.cta.href}>
                    {card.cta.label}
                  </a>

                  {card.secondary && (
                    <a
                      className="mk-card-link"
                      href={card.secondary.href}
                      {...(card.secondary.download ? { download: true } : {})}
                    >
                      {card.secondary.label}
                    </a>
                  )}
                </div>

                {card.note && <p className="mk-card-note">{card.note}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="mk-section">
          <h2>Quick downloads</h2>
          <div className="mk-cta-row">
            <a className="mk-btn mk-btn-navy" href={LINKS.comphumPdf} download>
              Competent Humility playbook
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.comphumPocket} download>
              Competent Humility pocket card
            </a>
            <a className="mk-btn mk-btn-navy" href={LINKS.quietPdf} download>
              Quiet Understanding guide
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.quietPocket} download>
              Quiet Understanding pocket card
            </a>
            <a className="mk-btn mk-btn-navy" href={LINKS.bricolagePdf} download>
              Bricolage playbook
            </a>
            <a className="mk-btn mk-btn-outline-navy" href={LINKS.bricolagePocket} download>
              Bricolage pocket card
            </a>
          </div>
          <div className="mk-qr-row">
            <img
              src="/playbooks/qr-hub.png"
              alt="QR code to The Human Mode, Always Field Kit"
              width={120}
              height={120}
            />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--navy)' }}>
                QR → The Human Mode, Always™ Field Kit
              </p>
              <p className="mk-muted">
                Use on slides, handouts, and Exec Ed leave-behinds. Open access, no login wall.
              </p>
            </div>
          </div>
        </section>

        <section className="mk-section">
          <h2>Practice now</h2>
          <PhraseOfTheDay />
          <h3>Interactive phrase helper (Quiet Understanding)</h3>
          <EmotionHelper />
          <p className="mk-muted" style={{ marginTop: '1rem' }}>
            Trap helper: <a href="/comphum">Drop the Certainty Theater →</a>
          </p>
        </section>

        <section className="mk-section">
          <h2>Share the Field Kit</h2>
          <ShareBar url={LINKS.hub} title={SHARE.hubTitle} text={SHARE.hubText} />
        </section>

        <BookCta />

        <footer className="mk-footer">Human Mode, Always.</footer>
      </div>
    </div>
  )
}
