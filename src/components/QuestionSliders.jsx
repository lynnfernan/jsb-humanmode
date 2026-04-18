import React, { useState } from 'react'

const MARKS = [0, 25, 50, 75, 100]

function Slider({ label, color, value, onChange }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '0.5rem',
        }}
      >
        <label
          style={{
            fontFamily: 'Saira, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#1c4b61',
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: 'Sofia Sans, sans-serif',
            fontWeight: 700,
            fontSize: '1.4rem',
            color,
            minWidth: '3.5rem',
            textAlign: 'right',
          }}
        >
          {value}%
        </span>
      </div>

      <div style={{ position: 'relative', paddingBottom: '0.25rem' }}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: color,
            cursor: 'pointer',
            height: '6px',
          }}
        />

        {/* Snap labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.3rem',
          }}
        >
          {MARKS.map((m) => (
            <button
              key={m}
              onClick={() => onChange(m)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.1rem 0.2rem',
                fontFamily: 'Sofia Sans, sans-serif',
                fontSize: '0.68rem',
                color: value === m ? color : '#aaa',
                fontWeight: value === m ? 700 : 400,
                cursor: 'pointer',
                transition: 'color 0.15s',
                flex: 1,
                textAlign: m === 0 ? 'left' : m === 100 ? 'right' : 'center',
              }}
            >
              {m}%
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function QuestionSliders({ onSubmit, isPractice }) {
  const [posEstimate, setPosEstimate] = useState(50)
  const [negEstimate, setNegEstimate] = useState(50)

  return (
    <div>
      <p
        style={{
          fontFamily: 'Sofia Sans, sans-serif',
          fontSize: '0.9rem',
          color: '#578ead',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: '1.75rem',
        }}
      >
        Estimate the proportion of the group that showed each reaction.
      </p>

      <div
        style={{
          background: '#f7f7f0',
          borderRadius: '12px',
          padding: '1.5rem 1.5rem 0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <Slider
          label="Positive emotional reaction"
          color="#2e7d32"
          value={posEstimate}
          onChange={setPosEstimate}
        />
        <Slider
          label="Negative emotional reaction"
          color="#c62828"
          value={negEstimate}
          onChange={setNegEstimate}
        />
        <p
          style={{
            fontSize: '0.75rem',
            color: '#aaa',
            fontStyle: 'italic',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Positive + negative do not need to total 100%
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn"
          onClick={() => onSubmit({ posEstimate, negEstimate })}
          style={{ minWidth: '200px' }}
        >
          {isPractice ? 'See Answer →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
