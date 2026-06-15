import React from 'react'

export default function TopBar({ badge }) {
  return (
    <nav className="top-bar">
      <div className="top-bar-brand">
        <span className="top-bar-name">Jeffrey Sanchez-Burks</span>
        <span className="top-bar-tagline">Human Mode, Always</span>
      </div>
      {badge && <span className="top-bar-badge">{badge}</span>}
    </nav>
  )
}
