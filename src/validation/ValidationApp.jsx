import React, { useState, useEffect } from 'react'
import SceneDisplay from '../components/SceneDisplay.jsx'
import QuestionSliders from '../components/QuestionSliders.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { PRACTICE_SCENARIOS, QUIZ_SCENARIOS } from '../data/scenarios.js'
import { computeScores } from '../utils/scoring.js'
import { captureProlificPid, computeCode } from './prolific.js'

/**
 * Emotional Aperture — Validation Study build
 *
 * Same instrument as production EAM (stills, 1750+1750, radios, scoring keys).
 * Stripped for pilot / real-user validation:
 *   - No lead capture, email, or PDF report
 *   - No personal name branding, book, newsletter, or Pulse Check CTA
 *   - Prolific: reads PROLIFIC_PID from URL, shows confirmation code only on final results
 *
 * Live path: /eam-validation  (aliases: /validation, /eam-pilot)
 */

const VALIDATION_TITLE = 'Emotional Aperture Measure — Validation Study'
const VALIDATION_DESCRIPTION =
  'Skills-based assessment of how well you recognize emotional reactions in groups. Validation build for research pilot testing.'

/** Remove author / book / brand language from shared scoring copy (validation UI only). */
function sanitizeForValidation(text) {
  if (!text) return ''
  return text
    .replace(/\bJeffrey Sanchez-Burks\b/gi, 'researchers')
    .replace(/\bJ\.\s*Sanchez-Burks\b/gi, 'researchers')
    .replace(/\bSanchez-Burks framework\b/gi, 'research framework')
    .replace(/\bSanchez-Burks\b/gi, 'researchers')
    .replace(/\bHuman Mode:\s*Unlock Your Unique Edge and Transform Your World of Work\b/gi, 'related research')
    .replace(/\bHuman Mode, Always\b/gi, '')
    .replace(/\bHuman Mode\b/gi, 'this research')
    .replace(/\bHarperCollins\b/gi, '')
    .replace(/\bthe Scan Routine\b/gi, 'a deliberate scanning practice')
    .replace(/\bScan Routine\b/gi, 'scanning practice')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const P = {
  START: 'start',
  INSTRUCTIONS: 'instructions',
  PRACTICE_SCENE: 'practice-scene',
  PRACTICE_Q: 'practice-question',
  PRACTICE_COMPLETE: 'practice-complete',
  QUIZ_SCENE: 'quiz-scene',
  QUIZ_Q: 'quiz-question',
  RESULTS: 'results',
}

function ValidationBar({ badge }) {
  return (
    <nav className="top-bar">
      <div className="top-bar-brand">
        <span className="top-bar-name">Emotional Aperture Measure™</span>
        <span className="top-bar-tagline">Validation study</span>
      </div>
      {badge && <span className="top-bar-badge">{badge}</span>}
    </nav>
  )
}

export default function ValidationApp() {
  const [phase, setPhase] = useState(P.START)
  const [participantCode, setParticipantCode] = useState('')
  /** Prolific ID from URL (?PROLIFIC_PID=) + sessionStorage for in-flow navigation / refresh */
  const [prolificPid, setProlificPid] = useState(null)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [responses, setResponses] = useState([])
  const [copied, setCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  // Capture Prolific ID on first mount (URL first, then sessionStorage)
  useEffect(() => {
    const pid = captureProlificPid()
    if (pid) {
      setProlificPid(pid)
      // Prefill optional facilitator field when empty so copy-results JSON stays useful
      setParticipantCode((prev) => (prev.trim() ? prev : pid))
    }
  }, [])

  // Neutral browser tab + meta (shared index.html still brands production EAM)
  useEffect(() => {
    const prevTitle = document.title
    document.title = VALIDATION_TITLE
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') || ''
    if (meta) meta.setAttribute('content', VALIDATION_DESCRIPTION)
    return () => {
      document.title = prevTitle
      if (meta) meta.setAttribute('content', prevDesc)
    }
  }, [])

  const startPractice = () => {
    setPracticeIndex(0)
    setPhase(P.PRACTICE_SCENE)
  }

  const handlePracticeAnswer = () => {
    if (practiceIndex + 1 < PRACTICE_SCENARIOS.length) {
      setPracticeIndex((i) => i + 1)
      setPhase(P.PRACTICE_SCENE)
    } else {
      setPhase(P.PRACTICE_COMPLETE)
    }
  }

  const startQuiz = () => {
    setQuizIndex(0)
    setResponses([])
    setPhase(P.QUIZ_SCENE)
  }

  const handleQuizAnswer = (resp) => {
    const updated = [...responses, resp]
    setResponses(updated)
    if (quizIndex + 1 < QUIZ_SCENARIOS.length) {
      setQuizIndex((i) => i + 1)
      setPhase(P.QUIZ_SCENE)
    } else {
      setPhase(P.RESULTS)
    }
  }

  const handleRetake = () => {
    setPracticeIndex(0)
    setQuizIndex(0)
    setResponses([])
    setCopied(false)
    setPhase(P.INSTRUCTIONS)
  }

  const handleStartOver = () => {
    setPracticeIndex(0)
    setQuizIndex(0)
    setResponses([])
    setCopied(false)
    setPhase(P.START)
  }

  const currentPractice = PRACTICE_SCENARIOS[practiceIndex]
  const currentQuiz = QUIZ_SCENARIOS[quizIndex]

  // ── Start (no email / name gate) ──
  if (phase === P.START) {
    return (
      <div className="app-shell">
        <ValidationBar badge="Pilot" />
        <div className="page">
          <div className="card">
            <div className="card-hero">
              <span className="eyebrow-light">Read the Room · Validation pilot</span>
              <h1 className="display">Emotional Aperture Measure™</h1>
              <p
                style={{
                  color: 'rgba(241,241,226,0.75)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  marginTop: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                Validation study build · research pilot only
              </p>
              <p
                style={{
                  color: 'rgba(241,241,226,0.8)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                }}
              >
                A skills-based assessment of how well you recognize emotional
                reactions in groups. This version is for testing only: no email,
                no report delivery, no marketing follow-up.
              </p>
            </div>

            <div className="card-body">
              {prolificPid ? (
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                  }}
                >
                  Prolific session linked. A confirmation code will appear only
                  after you finish the full assessment.
                </p>
              ) : (
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                  }}
                >
                  Optional: enter a participant code if your study facilitator
                  gave you one. You can leave this blank. Prolific participants
                  should arrive via the study link that includes PROLIFIC_PID.
                </p>
              )}

              <div className="field">
                <label htmlFor="participantCode">
                  {prolificPid ? 'Prolific ID' : 'Participant code (optional)'}
                </label>
                <input
                  id="participantCode"
                  type="text"
                  placeholder={prolificPid ? prolificPid : 'e.g. P017'}
                  value={participantCode}
                  onChange={(e) => setParticipantCode(e.target.value)}
                  autoComplete="off"
                  readOnly={Boolean(prolificPid)}
                  style={
                    prolificPid
                      ? { background: '#f4f7f9', color: 'var(--ink)' }
                      : undefined
                  }
                />
              </div>

              <button
                className="btn btn-full"
                type="button"
                onClick={() => setPhase(P.INSTRUCTIONS)}
              >
                Begin Assessment →
              </button>

              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  marginTop: '1.25rem',
                  lineHeight: 1.6,
                }}
              >
                About 8 minutes · Practice rounds included · Scores stay on this
                device unless you copy them at the end
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Instructions ──
  if (phase === P.INSTRUCTIONS) {
    return (
      <div className="app-shell">
        <ValidationBar badge="Instructions" />
        <div className="page">
          <div className="card">
            <div className="card-body">
              <ol className="instruction-steps" style={{ marginBottom: '1.5rem' }}>
                <li className="instruction-step">
                  <div className="step-number">1</div>
                  <div className="step-text">
                    <strong>What You&apos;ll See</strong>
                    <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                      You&apos;re going to look at a number of different groups
                      consisting of four people. For each group, you&apos;ll see
                      two photos: one taken BEFORE an event (like an
                      announcement) and one AFTER. Treat them like back-to-back
                      movie frames, and see how their reactions changed. Note
                      that some people will show positive reactions, some will
                      show negative reactions, and some will show no reaction at
                      all (remaining neutral).
                    </div>
                  </div>
                </li>

                <li className="instruction-step">
                  <div className="step-number">2</div>
                  <div className="step-text">
                    <strong>How to Score</strong>
                    <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                      Positive and negative reactions do not need to add up to
                      100%. For example, 25% of the group might show positive
                      emotions while only 25% show negative emotions—the
                      remaining 50% could appear neutral. Answer what you
                      actually see, not what you think should add up.
                    </div>
                  </div>
                </li>

                <li className="instruction-step">
                  <div className="step-number">3</div>
                  <div className="step-text">
                    <strong>What to Expect</strong>
                    <div style={{ marginTop: '0.5rem', fontWeight: 400 }}>
                      You&apos;ll complete 2 practice rounds first to get
                      familiar with the format. Emotional reactions appear and
                      disappear quickly, just like in real life. This takes
                      about 8 minutes total. When you&apos;re ready, click the
                      arrow to begin.
                    </div>
                  </div>
                </li>
              </ol>

              <button
                className="btn btn-full"
                onClick={startPractice}
                style={{ marginTop: '1.5rem' }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Practice ──
  if ([P.PRACTICE_SCENE, P.PRACTICE_Q].includes(phase)) {
    return (
      <div className="app-shell">
        <ValidationBar
          badge={`Practice ${practiceIndex + 1} of ${PRACTICE_SCENARIOS.length}`}
        />
        <div className="page">
          <div className="card">
            {phase === P.PRACTICE_SCENE && (
              <div
                className="card-body"
                style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
              >
                <SceneDisplay
                  key={`p-scene-${practiceIndex}`}
                  scenario={currentPractice}
                  onComplete={() => setPhase(P.PRACTICE_Q)}
                />
              </div>
            )}

            {phase === P.PRACTICE_Q && (
              <div className="card-body">
                <span
                  className="eyebrow"
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Practice Round {practiceIndex + 1}
                </span>
                <h2
                  className="display-dark"
                  style={{
                    textAlign: 'center',
                    marginBottom: '1.25rem',
                    fontSize: '1.3rem',
                  }}
                >
                  What did you see?
                </h2>
                <QuestionSliders onSubmit={handlePracticeAnswer} isPractice />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Practice complete ──
  if (phase === P.PRACTICE_COMPLETE) {
    return (
      <div className="app-shell">
        <ValidationBar badge="Ready" />
        <div className="page">
          <div className="card">
            <div
              className="card-body"
              style={{
                textAlign: 'center',
                paddingTop: '2.5rem',
                paddingBottom: '2.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  color: 'var(--ink)',
                }}
              >
                You have completed the practice trials. You should now have a
                sense for how quickly the emotional reactions appear and
                disappear.
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  color: 'var(--ink)',
                }}
              >
                Now, to begin the 17-question Emotional Aperture assessment,
                click below.
              </p>
              <button className="btn btn-full" onClick={() => startQuiz()}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz ──
  if ([P.QUIZ_SCENE, P.QUIZ_Q].includes(phase)) {
    return (
      <div className="app-shell">
        <ValidationBar />
        <ProgressBar current={quizIndex + 1} total={QUIZ_SCENARIOS.length} />
        <div className="page">
          <div className="card">
            {phase === P.QUIZ_SCENE && (
              <div
                className="card-body"
                style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
              >
                <SceneDisplay
                  key={`q-scene-${quizIndex}`}
                  scenario={currentQuiz}
                  onComplete={() => setPhase(P.QUIZ_Q)}
                />
              </div>
            )}

            {phase === P.QUIZ_Q && (
              <div className="card-body">
                <span
                  className="eyebrow"
                  style={{ textAlign: 'center', display: 'block' }}
                >
                  Scene {quizIndex + 1} of {QUIZ_SCENARIOS.length}
                </span>
                <h2
                  className="display-dark"
                  style={{
                    textAlign: 'center',
                    marginBottom: '1.25rem',
                    fontSize: '1.3rem',
                  }}
                >
                  What did you see?
                </h2>
                <QuestionSliders
                  onSubmit={handleQuizAnswer}
                  isPractice={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Results (scores only — no email / report / book / newsletter) ──
  if (phase === P.RESULTS) {
    const scores = computeScores(responses, QUIZ_SCENARIOS)

    if (!scores) {
      return (
        <div className="app-shell">
          <ValidationBar badge="Results" />
          <div className="page">
            <div className="card">
              <div className="card-body">
                <p>Unable to calculate results. Please try the assessment again.</p>
                <button className="btn btn-full" onClick={handleStartOver}>
                  Start over
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const profile = scores.profile
    const hasPositiveBias = scores.avgPosBias > 8
    const hasNegativeBias = scores.avgPosBias < -8
    const focusArea = hasPositiveBias
      ? 'Recognizing negative emotional signals and distress that might be masked by optimism bias.'
      : hasNegativeBias
        ? 'Validating positive emotions and building on moments of connection without overreading tension.'
        : 'Mixed distributions — balanced attention to positive and negative cues.'

    const neutralInsight = sanitizeForValidation(profile.insight)
    const neutralStrength = sanitizeForValidation(profile.strength)

    // Confirmation code only on true final results, from Prolific PID (not optional facilitator code)
    const confirmationCode =
      prolificPid && prolificPid.length > 0 ? computeCode(prolificPid) : null

    const payload = {
      build: 'eam-validation',
      completedAt: new Date().toISOString(),
      prolificPid: prolificPid || null,
      confirmationCode,
      participantCode: participantCode.trim() || null,
      overallAccuracy: scores.overallAccuracy,
      totalPoints: scores.totalPoints,
      maxPoints: scores.maxPoints,
      posAccuracy: scores.posAccuracy,
      negAccuracy: scores.negAccuracy,
      profile: profile?.name,
      avgPosBias: scores.avgPosBias,
      responses,
      itemScores: scores.itemScores,
    }

    const copyResults = async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } catch {
        // Fallback for older browsers / insecure context
        const ta = document.createElement('textarea')
        ta.value = JSON.stringify(payload, null, 2)
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    }

    return (
      <div className="app-shell">
        <ValidationBar badge="Results" />
        <div className="page">
          <div className="card">
            <div className="card-hero" style={{ paddingBottom: '2rem' }}>
              <span className="eyebrow-light">Validation complete</span>
              <h1
                className="display"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                  marginBottom: '1.5rem',
                }}
              >
                {profile.name}
              </h1>
              <p
                style={{
                  color: 'rgba(241,241,226,0.85)',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                {profile.tagline}
              </p>
            </div>

            <div className="card-body">
              {/* Prolific completion gate — only on this true final screen */}
              {confirmationCode ? (
                <div
                  style={{
                    background: 'var(--navy)',
                    color: 'var(--cream)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.5rem 1.25rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'Saira, system-ui, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      opacity: 0.85,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Study confirmation
                  </div>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      marginBottom: '0.75rem',
                      opacity: 0.9,
                    }}
                  >
                    You have finished the Emotional Aperture task. Enter this code
                    on the study page to continue.
                  </p>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '2.25rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#fff',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Your confirmation code: {confirmationCode}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{
                      marginTop: '0.75rem',
                      borderColor: 'rgba(241,241,226,0.45)',
                      color: 'var(--cream)',
                    }}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(confirmationCode)
                        setCodeCopied(true)
                        setTimeout(() => setCodeCopied(false), 2000)
                      } catch {
                        /* ignore */
                      }
                    }}
                  >
                    {codeCopied ? '✓ Copied' : 'Copy code'}
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    background: '#fdf6e3',
                    border: '1px solid #e8d9a8',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem 1.15rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                  }}
                >
                  No Prolific ID was found on this session. If you are in a Prolific
                  study, return via the study link that includes{' '}
                  <code style={{ fontSize: '0.85em' }}>PROLIFIC_PID</code> so a
                  confirmation code can be generated.
                </div>
              )}

              {(prolificPid || participantCode.trim()) && (
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {prolificPid ? 'Prolific ID' : 'Participant code'}:{' '}
                  <strong style={{ color: 'var(--ink)' }}>
                    {prolificPid || participantCode.trim()}
                  </strong>
                </p>
              )}

              <div
                style={{
                  background: '#f9f7f2',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    fontFamily: 'Saira',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Overall Emotional Aperture Score
                </div>
                <div
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    lineHeight: 1,
                  }}
                >
                  {scores.overallAccuracy}%
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    marginTop: '0.75rem',
                  }}
                >
                  {scores.totalPoints} of {scores.maxPoints} emotional reads
                  exactly right
                  {scores.benchmarks?.overall != null && (
                    <> &middot; Average score: {scores.benchmarks.overall}%</>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    background: '#f5f9fc',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Positive accuracy
                  </div>
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                    }}
                  >
                    {scores.posAccuracy}%
                  </div>
                </div>
                <div
                  style={{
                    background: '#f5f9fc',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Negative accuracy
                  </div>
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                    }}
                  >
                    {scores.negAccuracy}%
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#f5f9fc',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  borderLeft: '4px solid var(--slate)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    color: 'var(--ink)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {neutralInsight}
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '1rem',
                  }}
                >
                  Strengths &amp; development areas
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                  }}
                >
                  <strong>Strength:</strong> {neutralStrength || profile.strength}
                </p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.7,
                  }}
                >
                  <strong>Focus area:</strong> {focusArea}
                </p>
              </div>

              <div
                style={{
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                  }}
                >
                  Thank you for completing this validation session. No email was
                  collected and no report was sent.
                </p>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={copyResults}
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                >
                  {copied ? '✓ Copied results JSON' : 'Copy results for researcher'}
                </button>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--muted)',
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  Optional: paste the JSON into a study log. Scores are not
                  uploaded automatically.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <button
                  className="btn btn-full"
                  type="button"
                  onClick={handleRetake}
                >
                  Take assessment again
                </button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={handleStartOver}
                  style={{ width: '100%' }}
                >
                  Back to start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
