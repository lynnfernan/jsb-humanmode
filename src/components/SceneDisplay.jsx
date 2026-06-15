import React, { useState, useEffect, useRef } from 'react'

// GIF display duration in ms — matches EZGif settings:
// Frame 1 (neutral): 1750ms + Frame 2 (emotional): 5000ms + buffer
const GIF_DISPLAY_MS = 7500

export default function SceneDisplay({ scenario, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(GIF_DISPLAY_MS / 1000))
  const [gifError, setGifError] = useState(false)
  const timerRef = useRef(null)
  const completeRef = useRef(false)

  useEffect(() => {
    completeRef.current = false
    setGifError(false)
    setSecondsLeft(Math.ceil(GIF_DISPLAY_MS / 1000))

    // Countdown
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Auto-advance after GIF completes
    const completeTimer = setTimeout(() => {
      if (!completeRef.current) {
        completeRef.current = true
        onComplete()
      }
    }, GIF_DISPLAY_MS)

    return () => {
      clearInterval(timerRef.current)
      clearTimeout(completeTimer)
    }
  }, [scenario.id])

  const gifPath = `/gifs/${scenario.gifFile}`

  return (
    <div>
      <p className="gif-instruction">Watch all four reactions carefully</p>

      <div className="gif-stage">
        {gifError ? (
          <div className="gif-placeholder">
            <div className="gif-placeholder-icon">🎬</div>
            <div className="gif-placeholder-text">{scenario.gifFile} — coming soon</div>
          </div>
        ) : (
          <img
            key={scenario.id}
            src={gifPath}
            alt={`Scene ${scenario.label || scenario.id}`}
            onError={() => setGifError(true)}
            style={{ width: '100%', display: 'block' }}
          />
        )}

        {secondsLeft > 0 && (
          <div className="gif-countdown">{secondsLeft}s</div>
        )}
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--muted)',
        lineHeight: 1.5,
        fontFamily: 'Saira',
      }}>
        The sliders will appear when the scene finishes.
      </p>
    </div>
  )
}
