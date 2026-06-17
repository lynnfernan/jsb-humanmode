import React, { useEffect, useState } from 'react'

export default function SceneDisplay({ scenario, onComplete }) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)

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

  const frameSuffix = frameIndex === 0 ? '.1' : '.2'
  const imagePath = `/images/${scenario.id}${frameSuffix}.jpg`

  return (
    <div className="scene-display">
      <img
        src={imagePath}
        alt={`${scenario.label} - Frame ${frameIndex + 1}`}
        className="scene-image"
        onLoad={() => setIsReady(true)}
      />
    </div>
  )
}
