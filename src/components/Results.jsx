import React from 'react'

function ScoreRing({ score, label }) {
  const clamp = Math.min(100, Math.max(0, score))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          width: 168,
          height: 168,
          borderRadius: '50%',
          background: `conic-gradient(#1c4b61 0% ${clamp}%, #e4e4d4 ${clamp}% 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 134,
            height: 134,
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'Sofia Sans, sans-serif',
              fontWeight: 700,
              fontSize: '1.9rem',
              color: '#1c4b61',
              lineHeight: 1,
            }}
          >
            {score.toFixed(1)}%
          </span>
          <span
            style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: '0.65rem',
              color: '#578ead',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

function DeltaBadge({ score, benchmark }) {
  const diff = score - benchmark
  const isAbove = diff >= 0
  return (
    <span
      style={{
        background: isAbove ? '#e8f5e9' : '#ffebee',
        color: isAbove ? '#2e7d32' : '#c62828',
        fontFamily: 'Sofia Sans, sans-serif',
        fontWeight: 700,
        fontSize: '0.78rem',
        padding: '0.2rem 0.55rem',
        borderRadius: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      {isAbove ? '+' : ''}{diff.toFixed(1)}% vs avg
    </span>
  )
}

function AccuracyCard({ label, score, benchmark, color }) {
  return (
    <div
      style={{
        background: '#f7f7f0',
        borderRadius: '12px',
        padding: '1.25rem',
        borderLeft: `4px solid ${color}`,
      }}
    >
      <h4 style={{ fontSize: '0.82rem', color: '#578ead', marginBottom: '0.4rem' }}>{label}</h4>
      <div
        style={{
          fontFamily: 'Sofia Sans, sans-serif',
          fontWeight: 700,
          fontSize: '1.8rem',
          color,
          lineHeight: 1,
          marginBottom: '0.4rem',
        }}
      >
        {score.toFixed(1)}%
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: '#aaa' }}>Avg: {benchmark}%</span>
        <DeltaBadge score={score} benchmark={benchmark} />
      </div>
    </div>
  )
}

function BiasCard({ label, score, description }) {
  return (
    <div style={{ background: '#f7f7f0', borderRadius: '12px', padding: '1.25rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.5rem',
        }}
      >
        <h4 style={{ fontSize: '0.82rem', color: '#1c4b61', maxWidth: '70%' }}>{label}</h4>
        <span
          style={{
            fontFamily: 'Sofia Sans, sans-serif',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#578ead',
          }}
        >
          {score.toFixed(1)}%
        </span>
      </div>
      <p style={{ fontSize: '0.78rem', color: '#578ead', lineHeight: 1.55 }}>{description}</p>
    </div>
  )
}

export default function Results({ scores, leadData, onRetake }) {
  const {
    overallScore,
    posAccuracy,
    negAccuracy,
    pessimisticBias,
    roseTintedBias,
    posBlindSpot,
    negBlindSpot,
    benchmarks,
    n,
  } = scores

  return (
    <div className="quiz-card" style={{ maxWidth: 700 }}>
      {/* Header */}
      <div className="card-header">
        <div className="brand-name">Jeffrey Sanchez-Burks</div>
        <div className="brand-tagline">Human Mode, Always</div>
        <span className="badge">Your EAM™ Results</span>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
          Emotional Aperture Score
        </h1>
        {leadData?.name && (
          <p style={{ color: '#578ead', fontSize: '0.88rem' }}>Results for {leadData.name}</p>
        )}
      </div>

      {/* Overall gauge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <ScoreRing score={overallScore} label="EA Score" />
        <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center' }}>
          Average score: {benchmarks.overall}% &nbsp;·&nbsp; Based on {n} scenes &nbsp;·&nbsp; Higher = more accurate
        </p>
        <DeltaBadge score={overallScore} benchmark={benchmarks.overall} />
      </div>

      <div className="divider" />

      {/* Accuracy breakdown */}
      <h2 style={{ fontSize: '1.05rem', marginBottom: '0.85rem' }}>Accuracy Breakdown</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <AccuracyCard
          label="Positive Reactions"
          score={posAccuracy}
          benchmark={benchmarks.positive}
          color="#2e7d32"
        />
        <AccuracyCard
          label="Negative Reactions"
          score={negAccuracy}
          benchmark={benchmarks.negative}
          color="#c62828"
        />
      </div>

      <div className="divider" />

      {/* Overestimation biases */}
      <h2 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Overestimation Biases</h2>
      <p style={{ fontSize: '0.82rem', color: '#578ead', marginBottom: '0.85rem' }}>
        How often you overestimated the proportion of emotional reactions in a group.
      </p>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}
      >
        <BiasCard
          label='"Pessimistic" Bias'
          score={pessimisticBias}
          description="% of scenes where you overestimated negative reactions — you saw more distress than was present."
        />
        <BiasCard
          label='"Rose-Tinted" Bias'
          score={roseTintedBias}
          description="% of scenes where you overestimated positive reactions — you saw more enthusiasm than was present."
        />
      </div>

      <div className="divider" />

      {/* Blind spots */}
      <h2 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>Blind Spots</h2>
      <p style={{ fontSize: '0.82rem', color: '#578ead', marginBottom: '0.85rem' }}>
        How often you underestimated reactions — the emotions you tend to miss.
      </p>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}
      >
        <BiasCard
          label="Positive Blind Spot"
          score={posBlindSpot}
          description="% of scenes where you underestimated positive reactions — missed enthusiasm or agreement in the room."
        />
        <BiasCard
          label="Negative Blind Spot"
          score={negBlindSpot}
          description="% of scenes where you underestimated negative reactions — missed concern or resistance in the room."
        />
      </div>

      <div className="divider" />

      {/* Interpretation */}
      <div className="info-box" style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ marginBottom: '0.4rem' }}>What This Means</h4>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
          Your Emotional Aperture score reflects your capacity to accurately read the collective
          emotional climate in groups — a critical leadership and communication skill. Biases and
          blind spots highlight where systematic errors occur. For deeper development on Emotional
          Aperture, explore Jeffrey Sanchez-Burks' Human Mode leadership programs.
        </p>
      </div>

      {/* Email notice (placeholder) */}
      {leadData?.email && (
        <div
          style={{
            background: '#eef5fa',
            borderRadius: '10px',
            padding: '0.875rem 1.125rem',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#1c4b61',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ fontSize: '1rem' }}>📧</span>
          <span>
            Results will be emailed to <strong>{leadData.email}</strong> once delivery is
            configured.
          </span>
        </div>
      )}

      {/* Actions */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        <button className="btn" onClick={onRetake}>
          Retake Assessment
        </button>
        <button className="btn btn-outline" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.68rem',
          color: '#ccc',
          lineHeight: 1.6,
        }}
      >
        Copyright © 2008 J. Sanchez-Burks. All rights reserved.
        <br />
        EAM™ Emotional Aperture Measurement
      </p>
    </div>
  )
}
