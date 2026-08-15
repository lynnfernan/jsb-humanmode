import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HumilityApp from './humility/HumilityApp.jsx'
import ValidationApp from './validation/ValidationApp.jsx'
import QuietUnderstanding from './marketing/QuietUnderstanding.jsx'
import CompetentHumilityPlaybook from './marketing/CompetentHumilityPlaybook.jsx'
import Bricolage from './marketing/Bricolage.jsx'
import Hub from './marketing/Hub.jsx'
import './index.css'
import './humility.css'

/**
 * Routing (SPA — vercel.json rewrites all paths to index.html)
 *
 *   /                         → Emotional Aperture Measure™ (EAM) — CANONICAL · Read the Room
 *   /competent-humility       → Competent Humility Pulse Check · Drop the Certainty Theater
 *   /comphum                  → Competent Humility playbook companion
 *   /quiet                    → Quiet Understanding · Skip the Pep Talk
 *   /bricolage                → Bricolage exercises · Tap the Rest of You
 *   /hub                      → The Human Mode, Always™ Field Kit
 * Static PDFs: /playbooks/*.pdf
 */
function Root() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (
    path === '/hub' ||
    path === '/human-mode-hub' ||
    path === '/starter-kit' ||
    path === '/human-mode-starter-kit' ||
    path === '/field-kit' ||
    path === '/human-mode-field-kit'
  ) {
    return <Hub />
  }

  if (
    path === '/comphum' ||
    path === '/playbooks/competent-humility' ||
    path === '/competent-humility-playbook' ||
    path === '/playbook-c' ||
    path === '/confident-humble'
  ) {
    return <CompetentHumilityPlaybook />
  }

  if (
    path === '/playbooks/quiet-understanding' ||
    path === '/quiet-understanding' ||
    path === '/quiet' ||
    path === '/playbook-d'
  ) {
    return <QuietUnderstanding />
  }

  if (
    path === '/bricolage' ||
    path === '/tap-the-rest-of-you' ||
    path === '/playbook-b' ||
    path === '/bricoleur' ||
    path === '/playbooks/becoming-a-bricoleur' ||
    path === '/becoming-a-bricoleur'
  ) {
    return <Bricolage />
  }

  if (
    path === '/eam-validation' ||
    path === '/validation' ||
    path === '/eam-pilot'
  ) {
    return <ValidationApp />
  }

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
