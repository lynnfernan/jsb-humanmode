import React, { useState } from 'react'
import LeadCapture from './components/LeadCapture.jsx'
import Instructions from './components/Instructions.jsx'
import SceneDisplay from './components/SceneDisplay.jsx'
import QuestionSliders from './components/QuestionSliders.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Results from './components/Results.jsx'
import TopBar from './components/TopBar.jsx'
import { PRACTICE_SCENARIOS, QUIZ_SCENARIOS } from './data/scenarios.js'
import { computeScores } from './utils/scoring.js'

const P = {
  LEAD: 'lead',
  INSTRUCTIONS: 'instructions',
  PRACTICE_SCENE: 'practice-scene',
  PRACTICE_Q: 'practice-question',
  PRACTICE_FB: 'practice-feedback',
  QUIZ_INTRO: 'quiz-intro',
  QUIZ_SCENE: 'quiz-scene',
  QUIZ_Q: 'quiz-question',
  RESULTS: 'results',
}

function PracticeFeedback({ scenario, response, practiceIndex, onNext, totalPractice }) {
  const items = [
    {
      label: 'Positive Reactions',
      colorClass: 'positive',
      user: response.posEstimate,
      actual: scenario.correctPositive,
    },
    {
      label: 'Negative Reactions',
      colorClass: 'negative',
      user: response.negEstimate,
      actual: scenario.correctNegative,
    },
  ]

  return (
    <div className="card-body">
      <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
        Practice {practiceIndex + 1} — How Did You Do?
      </span>
      <h2 className="display-dark" style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
        Here's what was actually there.
      </h2>

      <div className="feedback-grid">
        {items.map(({ label, colorClass, user, actual }) => {
          const diff = Math.abs(user - actual)
          const isClose = diff <= 15
          const isPerfect = diff === 0
          return (
            <div
              key={label}
              className={`feedback-card feedback-card-${colorClass}`}
            >
              <div className="feedback-card-label">{label}</div>
              <div className="feedback-your">{user}%</div>
              <div className="feedback-actual">Actual: <strong>{actual}%</strong></div>
              <div
                className="feedback-delta"
                style={{ color: isPerfect ? 'var(--positive)' : isClose ? 'var(--slate)' : 'var(--negative)' }}
              >
                {isPerfect ? '✓ Perfect' : isClose ? `Close — off by ${diff}%` : `Off by ${diff}%`}
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.5rem', textAlign: 'center' }}>
        {practiceIndex + 1 < totalPractice
          ? 'One more practice round before the real assessment begins.'
          : "You're ready. The assessment works the same way — no feedback until the end."}
      </p>

      <button className="btn btn-full" onClick={onNext}>
        {practiceIndex + 1 < totalPractice ? 'Next Practice →' : 'Begin Assessment →'}
      </button>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState(P.LEAD)
  const [leadData, setLeadData] = useState(null)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceResponse, setPracticeResponse] = useState(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [responses, setResponses] = useState([])

  // Lead capture
  const handleLead = (data) => {
    setLeadData(data)
    setPhase(P.INSTRUCTIONS)
  }

  // Practice flow
  const startPractice = () => {
    setPracticeIndex(0)
    setPhase(P.PRACTICE_SCENE)
  }

  const handlePracticeAnswer = (resp) => {
    setPracticeResponse(resp)
    setPhase(P.PRACTICE_FB)
  }

  const handlePracticeNext = () => {
    if (practiceIndex + 1 < PRACTICE_SCENARIOS.length) {
      setPracticeIndex(i => i + 1)
      setPracticeResponse(null)
      setPhase(P.PRACTICE_SCENE)
    } else {
      setPhase(P.QUIZ_INTRO)
    }
  }

  // Quiz flow
  const startQuiz = () => {
    setQuizIndex(0)
    setResponses([])
    setPhase(P.QUIZ_SCENE)
  }

  const handleQuizAnswer = (resp) => {
    const updated = [...responses, resp]
    setResponses(updated)
    if (quizIndex + 1 < QUIZ_SCENARIOS.length) {
      setQuizIndex(i => i + 1)
      setPhase(P.QUIZ_SCENE)
    } else {
      setPhase(P.RESULTS)
    }
  }

  // Retake
  const handleRetake = () => {
    setPracticeIndex(0)
    setQuizIndex(0)
    setResponses([])
    setPracticeResponse(null)
    setPhase(P.INSTRUCTIONS)
  }

  const currentPractice = PRACTICE_SCENARIOS[practiceIndex]
  const currentQuiz = QUIZ_SCENARIOS[quizIndex]

  // ── Lead ──
  if (phase === P.LEAD) return <LeadCapture onSubmit={handleLead} />

  // ── Instructions ──
  if (phase === P.INSTRUCTIONS) {
    return <Instructions onStart={startPractice} firstName={leadData?.firstName} />
  }

  // ── Practice ──
  if ([P.PRACTICE_SCENE, P.PRACTICE_Q, P.PRACTICE_FB].includes(phase)) {
    return (
      <div className="app-shell">
        <TopBar badge={`Practice ${practiceIndex + 1} of ${PRACTICE_SCENARIOS.length}`} />
        <div className="page">
          <div className="card">
            {phase === P.PRACTICE_SCENE && (
              <div className="card-body" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <SceneDisplay
                  key={`p-scene-${practiceIndex}`}
                  scenario={currentPractice}
                  onComplete={() => setPhase(P.PRACTICE_Q)}
                />
              </div>
            )}

            {phase === P.PRACTICE_Q && (
              <div className="card-body">
                <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
                  Practice Round {practiceIndex + 1}
                </span>
                <h2 className="display-dark" style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
                  What did you see?
                </h2>
                <QuestionSliders onSubmit={handlePracticeAnswer} isPractice />
              </div>
            )}

            {phase === P.PRACTICE_FB && practiceResponse && (
              <PracticeFeedback
                scenario={currentPractice}
                response={practiceResponse}
                practiceIndex={practiceIndex}
                totalPractice={PRACTICE_SCENARIOS.length}
                onNext={handlePracticeNext}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz intro ──
  if (phase === P.QUIZ_INTRO) {
    return (
      <div className="app-shell">
        <TopBar badge="Ready" />
        <div className="page">
          <div className="card">
            <div className="card-hero">
              <span className="eyebrow-light">Practice complete</span>
              <h1 className="display">The real assessment starts now.</h1>
              <p style={{ color: 'rgba(241,241,226,0.75)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '1rem' }}>
                {QUIZ_SCENARIOS.length} scenes. No feedback until the end. 
                Do your best — there are no trick questions.
              </p>
            </div>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <p className="body-lg" style={{ marginBottom: '1.5rem' }}>
                You've calibrated your eye. Now we measure your natural aperture 
                across a range of emotional distributions — from subtle to obvious, 
                uniform to mixed.
              </p>
              <button className="btn" style={{ minWidth: 220 }} onClick={startQuiz}>
                Start Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz scene / question ──
  if ([P.QUIZ_SCENE, P.QUIZ_Q].includes(phase)) {
    return (
      <div className="app-shell">
        <TopBar />
        <ProgressBar current={quizIndex + 1} total={QUIZ_SCENARIOS.length} />
        <div className="page">
          <div className="card">
            {phase === P.QUIZ_SCENE && (
              <div className="card-body" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <SceneDisplay
                  key={`q-scene-${quizIndex}`}
                  scenario={currentQuiz}
                  onComplete={() => setPhase(P.QUIZ_Q)}
                />
              </div>
            )}

            {phase === P.QUIZ_Q && (
              <div className="card-body">
                <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
                  Scene {quizIndex + 1} of {QUIZ_SCENARIOS.length}
                </span>
                <h2 className="display-dark" style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
                  What did you see?
                </h2>
                <QuestionSliders onSubmit={handleQuizAnswer} isPractice={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Results ──
  if (phase === P.RESULTS) {
    const scores = computeScores(responses, QUIZ_SCENARIOS)
    return <Results scores={scores} leadData={leadData} onRetake={handleRetake} />
  }

  return null
}
