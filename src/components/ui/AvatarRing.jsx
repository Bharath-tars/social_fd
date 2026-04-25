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
        border: `3px solid ${color}`,
        boxShadow: showGlow
          ? `0 0 14px ${color}99, 3px 3px 0px ${color}66`
          : `2px 2px 0px ${color}88`,
        background: `${color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: size * 0.34,
        color,
        fontFamily: 'var(--font-display)',
        flexShrink: 0,
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease',
      }}
    >
      {initials}
    </div>
  )
}
