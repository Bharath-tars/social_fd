import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import OpenGemLogo from '../ui/OpenGemLogo'
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
      width: 248,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 14px',
      borderRight: '3px solid var(--og-border)',
      position: 'sticky',
      top: 0,
      gap: 6,
      background: 'rgba(14,14,24,0.85)',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Logo */}
      <div style={{ padding: '4px 10px 22px' }}>
        <OpenGemLogo size="md" />
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
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            fontWeight: isActive ? 800 : 500,
            fontSize: '0.95rem',
            color: isActive ? color : 'var(--og-text-muted)',
            background: isActive ? `${color}18` : 'transparent',
            border: isActive ? `3px solid ${color}` : '3px solid transparent',
            boxShadow: isActive ? `3px 3px 0px ${color}44` : 'none',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
          })}
        >
          {({ isActive }) => (
            <>
              <motion.div
                whileHover={{ rotate: [-4, 4, 0], scale: 1.15 }}
                transition={{ duration: 0.35 }}
                style={{
                  width: 34, height: 34,
                  borderRadius: 12,
                  background: isActive ? color : `${color}22`,
                  border: `2px solid ${isActive ? color : `${color}44`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {icon}
              </motion.div>
              {label}
            </>
          )}
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
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            fontWeight: isActive ? 800 : 500,
            fontSize: '0.95rem',
            color: isActive ? '#34A853' : 'var(--og-text-muted)',
            background: isActive ? '#34A85318' : 'transparent',
            border: isActive ? '3px solid #34A853' : '3px solid transparent',
            boxShadow: isActive ? '3px 3px 0px #34A85344' : 'none',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
          })}
        >
          <motion.div whileHover={{ scale: 1.12, rotate: -4 }}>
            <AvatarRing user={user} size={34} />
          </motion.div>
          Profile
        </NavLink>
      )}

      <div style={{ flex: 1 }} />

      {/* Logout */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.03, x: 2 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px', borderRadius: 'var(--radius-md)',
          color: 'var(--og-text-dim)', fontSize: '0.9rem',
          border: '3px solid transparent',
          fontWeight: 600,
          transition: 'all 0.2s',
          width: '100%',
          fontFamily: 'var(--font-display)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#EA4335'
          e.currentTarget.style.background = 'rgba(234,67,53,0.10)'
          e.currentTarget.style.borderColor = 'rgba(234,67,53,0.35)'
          e.currentTarget.style.boxShadow = '3px 3px 0px rgba(234,67,53,0.25)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--og-text-dim)'
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'transparent'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>↩</span> Sign out
      </motion.button>

      {/* Made by Bharath */}
      <div style={{
        fontSize: '0.72rem', color: 'var(--og-text-dim)',
        textAlign: 'center', paddingTop: 10,
        letterSpacing: '0.05em',
        border: '2px dashed var(--og-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px',
      }}>
        Made with <span style={{ color: '#EA4335' }}>♥</span> by{' '}
        <span style={{
          background: 'var(--grad-og)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 900,
          fontSize: '0.8rem',
        }}>Bharath</span>
      </div>
    </aside>
  )
}
