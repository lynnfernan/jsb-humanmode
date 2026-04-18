import React from 'react'

export default function Instructions({ onStart }) {
  return (
    <div className="quiz-card">
      <div className="card-header">
        <div className="brand-name">Jeffrey Sanchez-Burks</div>
        <div className="brand-tagline">Human Mode, Always</div>
        <span className="badge">EAM™ Assessment</span>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>How This Works</h1>
        <p style={{ color: '#578ead', fontSize: '0.9rem' }}>Read carefully before beginning.</p>
      </div>

      <ol
        style={{
          paddingLeft: '1.3rem',
          fontSize: '0.9rem',
          lineHeight: 1.8,
          color: '#1c4b61',
        }}
      >
        <li style={{ marginBottom: '1rem' }}>
          You'll see a series of brief two-part scenes. First, a group of four people{' '}
          <strong>before</strong> an organizational event — then their <strong>reaction</strong> to it.
          Each clip lasts about 2 seconds, just like real-world emotional displays.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          After each scene, use the sliders to estimate:{' '}
          <strong>what percentage of the group showed a positive reaction?</strong> And{' '}
          <strong>what percentage showed a negative reaction?</strong>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          Positive and negative reactions <strong>do not need to add up to 100%</strong> — some
          people may remain neutral.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          Treat what you see as the group's genuine feelings. There are no trick questions.
        </li>
        <li>
          You'll begin with <strong>2 practice rounds</strong> with feedback before the main
          22-scene assessment.
        </li>
      </ol>

      <div
        className="info-box"
        style={{ marginTop: '1.5rem', color: '#578ead', fontSize: '0.85rem' }}
      >
        <strong style={{ color: '#1c4b61' }}>Time estimate:</strong> approximately 8 minutes to
        complete.
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn" onClick={onStart} style={{ minWidth: '240px', fontSize: '1.05rem' }}>
          Begin Practice Trials →
        </button>
      </div>
    </div>
  )
}
