import React, { useState } from 'react'

// Exact question format from original EAM instrument (Sanchez-Burks / UMich Qualtrics)
// Question: "Following the event, to what extent did these emotional reactions appear in the group?"
// Note: "Sum of positive and negative reactions may not equal 100% if some individuals had no reaction."
// Grid: Positive reactions / Negative reactions × 5 columns

const COLUMNS = [
  { value: 0,   label: 'None of the group', pct: '(0%)' },
  { value: 25,  label: 'About a quarter of the group', pct: '(25%)' },
  { value: 50,  label: 'About half of the group', pct: '(50%)' },
  { value: 75,  label: 'About three quarters of the group', pct: '(75%)' },
  { value: 100, label: 'All of the group', pct: '(100%)' },
]

const ROWS = [
  { key: 'pos', label: 'Positive', sublabel: 'reactions', color: 'var(--positive)', bg: 'var(--positive-bg)' },
  { key: 'neg', label: 'Negative', sublabel: 'reactions', color: 'var(--negative)', bg: 'var(--negative-bg)' },
]

export default function QuestionSliders({ onSubmit, isPractice }) {
  const [pos, setPos] = useState(null)
  const [neg, setNeg] = useState(null)

  const isValid = pos !== null && neg !== null

  const getValue = (key) => key === 'pos' ? pos : neg
  const setValue = (key, val) => key === 'pos' ? setPos(val) : setNeg(val)

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit({ posEstimate: pos, negEstimate: neg })
  }

  return (
    <div>
      {/* Exact question wording from original */}
      <p style={{
        fontSize: '0.95rem',
        color: 'var(--ink)',
        lineHeight: 1.65,
        marginBottom: '0.35rem',
        fontWeight: 700,
        fontFamily: 'Sofia Sans',
      }}>
        Following the event, to what extent did these emotional reactions appear in the group?
      </p>
      <p style={{
        fontSize: '0.78rem',
        color: 'var(--muted)',
        fontStyle: 'italic',
        marginBottom: '1.5rem',
        fontFamily: 'Saira',
        lineHeight: 1.5,
      }}>
        Note: Sum of positive and negative reactions may not equal 100% if some individuals had no reaction.
      </p>

      {/* Grid — mobile stacked, desktop table-like */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
          <thead>
            <tr>
              <th style={{ width: '18%' }} />
              {COLUMNS.map(col => (
                <th key={col.value} style={{
                  textAlign: 'center',
                  padding: '0 0.25rem 0.75rem',
                  fontFamily: 'Saira',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                  lineHeight: 1.4,
                  letterSpacing: '0.01em',
                }}>
                  {col.label}<br />
                  <span style={{ color: 'var(--muted)', fontWeight: 400 }}>{col.pct}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => {
              const selected = getValue(row.key)
              return (
                <tr key={row.key} style={{
                  borderTop: '1px solid #eef0ec',
                  background: selected !== null ? row.bg : 'transparent',
                  transition: 'background 0.15s',
                }}>
                  <td style={{
                    padding: '1rem 0.5rem 1rem 0',
                    fontFamily: 'Sofia Sans',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: row.color,
                    whiteSpace: 'nowrap',
                  }}>
                    {row.label}<br />
                    <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '0.78rem' }}>
                      {row.sublabel}
                    </span>
                  </td>
                  {COLUMNS.map(col => (
                    <td key={col.value} style={{ textAlign: 'center', padding: '1rem 0.25rem' }}>
                      <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input
                          type="radio"
                          name={`${row.key}-reaction`}
                          value={col.value}
                          checked={selected === col.value}
                          onChange={() => setValue(row.key, col.value)}
                          style={{
                            width: 20,
                            height: 20,
                            accentColor: row.color,
                            cursor: 'pointer',
                          }}
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {!isValid && (
        <p style={{
          textAlign: 'center',
          fontSize: '0.78rem',
          fontFamily: 'Saira',
          color: 'var(--muted)',
          margin: '1rem 0',
          letterSpacing: '0.03em',
          fontStyle: 'italic',
        }}>
          Please click the arrow below to continue
        </p>
      )}

      <div style={{ marginTop: '1.25rem' }}>
        <button
          className="btn btn-full"
          onClick={handleSubmit}
          disabled={!isValid}
          style={{ opacity: isValid ? 1 : 0.4 }}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
