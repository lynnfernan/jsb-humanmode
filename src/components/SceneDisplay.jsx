import React, { useEffect, useState } from 'react'

export default function SceneDisplay({ scenario, onComplete }) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (frameIndex >= 2) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setFrameIndex(i => i + 1)
    }, 1750)

    return () => clearTimeout(timer)
  }, [frameIndex, onComplete])

  const currentFrame = frameIndex === 0 ? scenario.frame1 : scenario.frame2
  const imagePath = `/images/${currentFrame}`

  return (
    <div className="scene-display">
      <img
        src={imagePath}
        alt={`${scenario.label} - Frame ${frameIndex + 1}`}
        className="scene-image"
      />
    </div>
  )
}
