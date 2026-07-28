import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HumilityApp from './humility/HumilityApp.jsx'
import './index.css'
import './humility.css'

/**
 * Routing (SPA — vercel.json rewrites all paths to index.html)
 *
 *   /                         → Emotional Aperture Measure™ (EAM) — CANONICAL
 *   /competent-humility       → Competent Humility Pulse Check
 *   /humility, /pulse-check   → aliases for Pulse Check
 *
 * Source of truth: ~/jsb-humanmode (this repo). Do NOT deploy the
 * website/client/humanmode GIF/slider fork over this domain.
 */
function Root() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (
    path === '/competent-humility' ||
    path === '/humility' ||
    path === '/pulse-check' ||
    path === '/competent-humility-pulse-check'
  ) {
    return <HumilityApp />
  }

  // Default: Emotional Aperture Measure (July 15 final / Qualtrics-aligned)
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
