import React from 'react'

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
const LETTERS = ['N', 'O', 'V', 'A']

export default function NovaLogo({ size = 'md', animated = true }) {
  const sizes = { sm: { font: '1.2rem', gap: 1 }, md: { font: '1.8rem', gap: 2 }, lg: { font: '3rem', gap: 3 } }
  const s = sizes[size] || sizes.md

  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: s.font,
        letterSpacing: '0.05em',
        display: 'inline-flex',
        gap: s.gap,
      }}
    >
      {LETTERS.map((letter, i) => (
        <span
          key={letter}
          style={{
            color: COLORS[i],
            display: 'inline-block',
            animation: animated ? `float ${2.5 + i * 0.4}s ease-in-out infinite` : 'none',
            textShadow: `0 0 20px ${COLORS[i]}66`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}
