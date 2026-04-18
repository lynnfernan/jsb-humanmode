import React, { useState, useEffect } from 'react'
import FaceGrid from './FaceGrid'

const BEFORE_MS = 1500
const AFTER_MS = 2000

export default function SceneDisplay({ scenario, onComplete }) {
  const [stage, setStage] = useState('before')

  useEffect(() => {
    setStage('before')
    const t1 = setTimeout(() => setStage('after'), BEFORE_MS)
    const t2 = setTimeout(() => onComplete(), BEFORE_MS + AFTER_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id])

  const emotions =
    stage === 'before'
      ? ['neutral', 'neutral', 'neutral', 'neutral']
      : scenario.faces

  return (
    <div>
      {/* Stage label */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <span
          style={{
            background: stage === 'before' ? 'rgba(87,142,173,0.18)' : '#1c4b61',
            color: stage === 'before' ? '#1c4b61' : 'white',
            fontFamily: 'Saira, sans-serif',
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            padding: '0.25rem 0.85rem',
            borderRadius: '100px',
            textTransform: 'uppercase',
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          {stage === 'before' ? 'Before' : 'Reaction'}
        </span>
      </div>

      {/* Countdown dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '0.75rem' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#578ead',
              opacity: 0.4,
              animation: `pulse ${stage === 'before' ? '1.5s' : '2s'} ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <FaceGrid emotions={emotions} size={105} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
