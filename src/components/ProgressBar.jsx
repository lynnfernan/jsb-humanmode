import React from 'react'

export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.4rem',
          fontFamily: 'Saira, sans-serif',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#578ead',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scene {current} of {total}</span>
        <span>{pct}%</span>
      </div>

      <div
        style={{
          background: '#e4e4d4',
          borderRadius: '100px',
          height: '5px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #578ead 0%, #1c4b61 100%)',
            height: '100%',
            borderRadius: '100px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}
