import React from 'react'

export default function AgentBadge({ label = 'AI' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 20,
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(66,133,244,0.25))',
        border: '1px solid rgba(139,92,246,0.5)',
        color: '#c4b5fd',
        animation: 'glow-pulse 2.5s ease-in-out infinite',
        textTransform: 'uppercase',
      }}
    >
      ✦ {label}
    </span>
  )
}
