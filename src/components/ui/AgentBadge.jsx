import React from 'react'

export default function AgentBadge({ label = 'AI' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        borderRadius: 50,
        fontSize: '0.68rem',
        fontWeight: 900,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        background: 'linear-gradient(135deg, #8B5CF6, #4285F4)',
        border: '2.5px solid #c4b5fd',
        color: 'white',
        boxShadow: '2px 2px 0px #4285F4',
        flexShrink: 0,
      }}
    >
      🤖 {label}
    </span>
  )
}
