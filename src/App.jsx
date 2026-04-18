import React, { useState } from 'react'
import LeadCapture from './components/LeadCapture.jsx'
import Instructions from './components/Instructions.jsx'
import SceneDisplay from './components/SceneDisplay.jsx'
import QuestionSliders from './components/QuestionSliders.jsx'
import FaceGrid from './components/FaceGrid.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Results from './components/Results.jsx'
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

function BrandBar() {
  return (
    <>
      <div className="brand-name">Jeffrey Sanchez-Burks</div>
      <div className="brand-tagline">Human Mode, Always</div>
    </>
  )
}

function PracticeFeedback({ scenario, response, practiceIndex, onNext, totalPractice }) {
  return (
    <div>
      <FaceGrid emotions={scenario.faces} size={90} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          margin: '1.5rem 0',
        }}
      >
        {[
          {
            label: 'Positive Reactions',
            color: '#2e7d32',
            bg: '#e8f5e9',
            user: response.posEstimate,
            actual: scenario.correctPositive,
          },
          {
            label: 'Negative Reactions',
            color: '#c62828',
            bg: '#ffebee',
            user: response.negEstimate,
            actual: scenario.correctNegative,
          },
        ].map(({ label, color, bg, user, actual }) => (
          <div
            key={label}
            style={{ background: bg, borderRadius: '12px', padding: '1.1rem', textAlign: 'center' }}
          >
            <h4 style={{ fontSize: '0.78rem', color, marginBottom: '0.5rem' }}>{label}</h4>
            <div style={{ fontFamily: 'Sofia Sans', fontWeight: 700, fontSize: '1.4rem', color }}>
              Your: {user}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.25rem' }}>
              Actual: <strong>{actual}%</strong>
            </div>
            <div
              style={{
                marginTop: '0.4rem',
                fontSize: '0.78rem',
                color: Math.abs(user - actual) <= 15 ? '#2e7d32' : '#c62828',
                fontWeight: 600,
              }}
            >
              {Math.abs(user - actual) === 0
                ? 'Perfect!'
                : Math.abs(user - actual) <= 15
                ? 'Close!'
                : `Off by ${Math.abs(user - actual)}%`}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn" onClick={onNext}>
          {practiceIndex + 1 < totalPractice ? 'Next Practice →' : 'Begin Assessment →'}
        </button>
      </div>
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

  /* ── Lead capture ── */
  const handleLead = (data) => {
    setLeadData(data)
    setPhase(P.INSTRUCTIONS)
  }

  /* ── Practice ── */
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
      setPracticeIndex((i) => i + 1)
      setPracticeResponse(null)
      setPhase(P.PRACTICE_SCENE)
    } else {
      setPhase(P.QUIZ_INTRO)
    }
  }

  /* ── Quiz ── */
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

  /* ── Retake ── */
  const handleRetake = () => {
    setPracticeIndex(0)
    setQuizIndex(0)
    setResponses([])
    setPracticeResponse(null)
    setPhase(P.INSTRUCTIONS)
  }

  const currentPractice = PRACTICE_SCENARIOS[practiceIndex]
  const currentQuiz = QUIZ_SCENARIOS[quizIndex]

  /* ─────────────── Render ─────────────── */

  if (phase === P.LEAD) return <LeadCapture onSubmit={handleLead} />

  if (phase === P.INSTRUCTIONS) return <Instructions onStart={startPractice} />

  /* Practice phases */
  if ([P.PRACTICE_SCENE, P.PRACTICE_Q, P.PRACTICE_FB].includes(phase)) {
    return (
      <div className="quiz-card">
        <div className="card-header">
          <BrandBar />
          <span className="badge badge-practice">
            Practice {practiceIndex + 1} of {PRACTICE_SCENARIOS.length}
          </span>
          <h2 style={{ fontSize: '1.25rem' }}>
            {phase === P.PRACTICE_FB ? 'How Did You Do?' : 'Watch the Reaction'}
          </h2>
        </div>

        {phase === P.PRACTICE_SCENE && (
          <SceneDisplay
            key={`p-scene-${practiceIndex}`}
            scenario={currentPractice}
            onComplete={() => setPhase(P.PRACTICE_Q)}
          />
        )}

        {phase === P.PRACTICE_Q && (
          <QuestionSliders onSubmit={handlePracticeAnswer} isPractice />
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
    )
  }

  /* Quiz intro */
  if (phase === P.QUIZ_INTRO) {
    return (
      <div className="quiz-card" style={{ maxWidth: 540, textAlign: 'center' }}>
        <div className="card-header">
          <BrandBar />
          <span className="badge">Ready to Begin</span>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Assessment Starting</h1>
          <p style={{ color: '#578ead', fontSize: '0.9rem' }}>
            Practice complete! The main assessment has {QUIZ_SCENARIOS.length} scenes.
            <br />
            No feedback is given during the assessment — do your best!
          </p>
        </div>
        <button className="btn" onClick={startQuiz} style={{ minWidth: 220, fontSize: '1.05rem' }}>
          Start Assessment →
        </button>
      </div>
    )
  }

  /* Quiz scene / question */
  if ([P.QUIZ_SCENE, P.QUIZ_Q].includes(phase)) {
    return (
      <div className="quiz-card">
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <BrandBar />
        </div>

        <ProgressBar current={quizIndex + 1} total={QUIZ_SCENARIOS.length} />

        <h2
          style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
            color: '#1c4b61',
          }}
        >
          {phase === P.QUIZ_SCENE ? 'Watch the Reaction' : 'Estimate the Reactions'}
        </h2>

        {phase === P.QUIZ_SCENE && (
          <SceneDisplay
            key={`q-scene-${quizIndex}`}
            scenario={currentQuiz}
            onComplete={() => setPhase(P.QUIZ_Q)}
          />
        )}

        {phase === P.QUIZ_Q && (
          <QuestionSliders onSubmit={handleQuizAnswer} isPractice={false} />
        )}
      </div>
    )
  }

  /* Results */
  if (phase === P.RESULTS) {
    const scores = computeScores(responses, QUIZ_SCENARIOS)
    return <Results scores={scores} leadData={leadData} onRetake={handleRetake} />
  }

  return null
}
