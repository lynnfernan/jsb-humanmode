import React from 'react'
import FaceSvg from './FaceSvg'

export default function FaceGrid({ emotions, size = 100 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem',
        padding: '1.75rem',
        background: '#f7f7f0',
        borderRadius: '14px',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      {emotions.map((emotion, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <FaceSvg personIndex={i} emotion={emotion} size={size} />
        </div>
      ))}
    </div>
  )
}
