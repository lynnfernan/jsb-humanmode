import React from 'react'

const PERSONS = [
  // Alex — light skin, short brown hair
  { skin: '#FDBCB4', hair: '#7B4F2E', shirt: '#1c4b61', eyeColor: '#5C3D1E', hairStyle: 'short' },
  // Jordan — medium-dark skin, natural/afro hair
  { skin: '#8D5524', hair: '#1A0A00', shirt: '#578ead', eyeColor: '#1A0A00', hairStyle: 'afro' },
  // Casey — golden skin, long dark hair
  { skin: '#F1C27D', hair: '#2C1810', shirt: '#2d6a8a', eyeColor: '#3E2723', hairStyle: 'long' },
  // Morgan — tan skin, dark wavy hair
  { skin: '#C68642', hair: '#1A1A2E', shirt: '#0d3349', eyeColor: '#212121', hairStyle: 'wavy' },
]

function Hair({ style, color }) {
  switch (style) {
    case 'short':
      return (
        <path
          d="M23,62 C23,30 77,30 77,62 L77,46 C77,17 23,17 23,46 Z"
          fill={color}
        />
      )
    case 'afro':
      return (
        <ellipse cx="50" cy="36" rx="34" ry="27" fill={color} />
      )
    case 'long':
      return (
        <>
          <path d="M21,60 C21,25 79,25 79,60 L79,42 C79,12 21,12 21,42 Z" fill={color} />
          <rect x="16" y="54" width="11" height="56" rx="5.5" fill={color} />
          <rect x="73" y="54" width="11" height="56" rx="5.5" fill={color} />
        </>
      )
    case 'wavy':
      return (
        <path
          d="M23,58 C23,26 77,26 77,58 C79,30 71,13 50,13 C29,13 21,30 23,58 Z"
          fill={color}
        />
      )
    default:
      return null
  }
}

function Mouth({ emotion }) {
  const stroke = '#4a2e1a'
  const props = { stroke, strokeWidth: 2.8, fill: 'none', strokeLinecap: 'round' }

  if (emotion === 'positive') {
    return <path d="M 37,70 Q 50,82 63,70" {...props} />
  }
  if (emotion === 'negative') {
    return <path d="M 37,78 Q 50,66 63,78" {...props} />
  }
  // neutral
  return <line x1="38" y1="74" x2="62" y2="74" {...props} />
}

export default function FaceSvg({ personIndex = 0, emotion = 'neutral', size = 100 }) {
  const p = PERSONS[personIndex % PERSONS.length]

  return (
    <svg
      viewBox="0 0 100 130"
      width={size}
      height={Math.round(size * 1.3)}
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Shirt / torso */}
      <path d="M 5,130 L 16,102 Q 50,90 84,102 L 95,130 Z" fill={p.shirt} />

      {/* Neck */}
      <rect x="42" y="88" width="16" height="16" rx="3" fill={p.skin} />

      {/* Head */}
      <ellipse cx="50" cy="62" rx="27" ry="30" fill={p.skin} />

      {/* Hair (drawn on top of head) */}
      <Hair style={p.hairStyle} color={p.hair} />

      {/* Eyes — white sclera */}
      <ellipse cx="40" cy="57" rx="5" ry="4.5" fill="white" />
      <ellipse cx="60" cy="57" rx="5" ry="4.5" fill="white" />

      {/* Iris */}
      <circle cx="40" cy="57" r="3" fill={p.eyeColor} />
      <circle cx="60" cy="57" r="3" fill={p.eyeColor} />

      {/* Highlight */}
      <circle cx="41.5" cy="55.5" r="1.2" fill="white" />
      <circle cx="61.5" cy="55.5" r="1.2" fill="white" />

      {/* Eyebrows — subtle */}
      <path
        d={emotion === 'negative'
          ? 'M 35,48 Q 40,44 45,46 M 55,46 Q 60,44 65,48'
          : emotion === 'positive'
          ? 'M 35,47 Q 40,45 45,47 M 55,47 Q 60,45 65,47'
          : 'M 35,47 Q 40,46 45,47 M 55,47 Q 60,46 65,47'
        }
        stroke={p.hair}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Mouth */}
      <Mouth emotion={emotion} />
    </svg>
  )
}
