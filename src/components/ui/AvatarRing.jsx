import React from 'react'

export default function AvatarRing({ user, size = 40, showGlow = false }) {
  const color = user?.avatar_color || '#4285F4'
  const initials = (user?.username || '?').slice(0, 2).toUpperCase()

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        boxShadow: showGlow ? `0 0 12px ${color}88, 0 0 24px ${color}44` : `0 0 6px ${color}44`,
        background: `${color}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.35,
        color,
        fontFamily: 'var(--font-display)',
        flexShrink: 0,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {initials}
    </div>
  )
}
