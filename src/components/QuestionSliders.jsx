import React, { useState } from 'react'

export default function QuestionSliders({ onSubmit, isPractice }) {
  const [pos, setPos] = useState(50)
  const [neg, setNeg] = useState(50)
  const [touched, setTouched] = useState(false)

  const total = pos + neg
  const isValid = total === 100

  const handlePos = (val) => {
    const v = Number(val)
    setPos(v)
    setNeg(100 - v)
    setTouched(true)
  }

  const handleNeg = (val) => {
    const v = Number(val)
    setNeg(v)
    setPos(100 - v)
    setTouched(true)
  }

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit({ posEstimate: pos, negEstimate: neg })
  }

  return (
    <div>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--muted)',
        textAlign: 'center',
        marginBottom: '1.5rem',
        lineHeight: 1.6,
      }}>
        What percentage of the group had each type of reaction?
      </p>

      <div className="slider-section">
        {/* Positive slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span className="slider-label slider-label-positive">Positive Reactions</span>
            <span className="slider-value" style={{ color: 'var(--positive)' }}>{pos}%</span>
          </div>
          <div className="slider-track">
            <div
              className="slider-fill-positive"
              style={{ width: `${pos}%` }}
            />
            <input
              type="range"
              className="positive"
              min={0}
              max={100}
              step={25}
              value={pos}
              onChange={e => handlePos(e.target.value)}
              style={{ position: 'absolute', top: '-8px', left: 0, width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
            {[0, 25, 50, 75, 100].map(v => (
              <span key={v} style={{ fontSize: '0.65rem', fontFamily: 'Saira', color: 'var(--muted)' }}>{v}%</span>
            ))}
          </div>
        </div>

        {/* Negative slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span className="slider-label slider-label-negative">Negative Reactions</span>
            <span className="slider-value" style={{ color: 'var(--negative)' }}>{neg}%</span>
          </div>
          <div className="slider-track">
            <div
              className="slider-fill-negative"
              style={{ width: `${neg}%` }}
            />
            <input
              type="range"
              className="negative"
              min={0}
              max={100}
              step={25}
              value={neg}
              onChange={e => handleNeg(e.target.value)}
              style={{ position: 'absolute', top: '-8px', left: 0, width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
            {[0, 25, 50, 75, 100].map(v => (
              <span key={v} style={{ fontSize: '0.65rem', fontFamily: 'Saira', color: 'var(--muted)' }}>{v}%</span>
            ))}
          </div>
        </div>
      </div>

      {/* Total indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        padding: '0.6rem 1rem',
        borderRadius: 'var(--radius-sm)',
        background: isValid ? 'var(--positive-bg)' : '#fef9e7',
      }}>
        <span style={{
          fontFamily: 'Saira',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isValid ? 'var(--positive)' : '#b45309',
        }}>
          {isValid ? '✓ Total: 100%' : `Total: ${total}% — must equal 100%`}
        </span>
      </div>

      <button
        className="btn btn-full"
        onClick={handleSubmit}
        disabled={!isValid}
        style={{ opacity: isValid ? 1 : 0.45 }}
      >
        {isPractice ? 'See How I Did →' : 'Next Scene →'}
      </button>
    </div>
  )
}
