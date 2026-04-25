import React from 'react'

// OpenGem — O·p·e·n in Google colors, G·e·m in Gemini purple gradient
const WORD = [
  { letter: 'O', color: '#4285F4' },
  { letter: 'p', color: '#EA4335' },
  { letter: 'e', color: '#FBBC05' },
  { letter: 'n', color: '#34A853' },
  { letter: 'G', color: '#8B5CF6' },
  { letter: 'e', color: '#a78bfa' },
  { letter: 'm', color: '#c4b5fd' },
]

export default function OpenGemLogo({ size = 'md', animated = true }) {
  const sizes = { sm: { font: '1.2rem', gap: 0 }, md: { font: '1.8rem', gap: 0 }, lg: { font: '3rem', gap: 0 } }
  const s = sizes[size] || sizes.md

  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: s.font,
        letterSpacing: '0.02em',
        display: 'inline-flex',
        gap: s.gap,
      }}
    >
      {WORD.map(({ letter, color }, i) => (
        <span
          key={i}
          style={{
            color,
            display: 'inline-block',
            animation: animated ? `float ${2.5 + i * 0.25}s ease-in-out infinite` : 'none',
            textShadow: `0 0 18px ${color}66`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}
