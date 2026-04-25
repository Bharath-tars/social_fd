import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NovaLogo from '../ui/NovaLogo'
import AvatarRing from '../ui/AvatarRing'
import useAuthStore from '../../store/authStore'

const NAV = [
  { to: '/feed',          icon: '⚡', label: 'Home',          color: '#4285F4' },
  { to: '/explore',       icon: '🌐', label: 'Explore',       color: '#EA4335' },
  { to: '/notifications', icon: '🔔', label: 'Notifications', color: '#FBBC05' },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      borderRight: '1px solid var(--nova-border)',
      position: 'sticky',
      top: 0,
      gap: 8,
    }}>
      {/* Logo */}
      <div style={{ padding: '4px 8px 20px' }}>
        <NovaLogo size="md" />
      </div>

      {/* Nav */}
      {NAV.map(({ to, icon, label, color }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '11px 14px',
            borderRadius: 'var(--radius-md)',
            fontWeight: isActive ? 600 : 400,
            fontSize: '0.95rem',
            color: isActive ? color : 'var(--nova-text-muted)',
            background: isActive ? `${color}18` : 'transparent',
            border: isActive ? `1px solid ${color}30` : '1px solid transparent',
            transition: 'all 0.2s',
            textDecoration: 'none',
          })}
        >
          <span style={{ fontSize: '1.1rem' }}>{icon}</span>
          {label}
        </NavLink>
      ))}

      {/* Profile link */}
      {user && (
        <NavLink
          to={`/profile/${user.username}`}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '11px 14px',
            borderRadius: 'var(--radius-md)',
            fontWeight: isActive ? 600 : 400,
            fontSize: '0.95rem',
            color: isActive ? '#34A853' : 'var(--nova-text-muted)',
            background: isActive ? '#34A85318' : 'transparent',
            border: isActive ? '1px solid #34A85330' : '1px solid transparent',
            transition: 'all 0.2s',
            textDecoration: 'none',
          })}
        >
          <AvatarRing user={user} size={28} />
          Profile
        </NavLink>
      )}

      <div style={{ flex: 1 }} />

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 'var(--radius-md)',
          color: 'var(--nova-text-dim)', fontSize: '0.88rem',
          border: '1px solid transparent', transition: 'all 0.2s', width: '100%',
        }}
        onMouseEnter={e => { e.currentTarget.style.color='#EA4335'; e.currentTarget.style.background='rgba(234,67,53,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.color='var(--nova-text-dim)'; e.currentTarget.style.background='transparent' }}
      >
        <span>↩</span> Sign out
      </button>

      {/* Made by Bharath */}
      <div style={{
        fontSize: '0.7rem', color: 'var(--nova-text-dim)',
        textAlign: 'center', paddingTop: 8,
        letterSpacing: '0.04em',
      }}>
        Made by <span style={{ background: 'var(--grad-nova)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Bharath</span>
      </div>
    </aside>
  )
}
