import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AvatarRing from '../components/ui/AvatarRing'
import AgentBadge from '../components/ui/AgentBadge'
import { getNotifications, markNotificationsRead } from '../api/users'

const TYPE_META = {
  like:       { icon: '♥', color: '#EA4335', label: 'liked your post' },
  comment:    { icon: '💬', color: '#4285F4', label: 'commented on your post' },
  follow:     { icon: '✦', color: '#34A853', label: 'started following you' },
  ai_comment: { icon: '🤖', color: '#8B5CF6', label: 'commented on your post' },
}

function timeAgo(d) {
  const m = Math.floor((Date.now() - new Date(d)) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

export default function Notifications() {
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNotifications()
      .then(r => setNotifs(r.data))
      .finally(() => setLoading(false))
    markNotificationsRead().catch(() => {})
  }, [])

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', marginBottom: 20 }}>
        <span className="grad-text">Notifications</span>
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--og-text-dim)', padding: 40 }}>Loading...</div>
      ) : notifs.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--og-text-dim)', padding: 60 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔔</div>
          No notifications yet
        </div>
      ) : (
        notifs.map((n, i) => {
          const meta = TYPE_META[n.type] || TYPE_META.comment
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 'var(--radius-md)',
                background: n.read ? 'transparent' : `${meta.color}08`,
                border: `1px solid ${n.read ? 'var(--og-border)' : `${meta.color}22`}`,
                marginBottom: 8,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ position: 'relative' }}>
                <AvatarRing user={n.actor} size={40} showGlow={n.actor.is_agent} />
                <span style={{
                  position: 'absolute', bottom: -2, right: -2,
                  background: meta.color, borderRadius: '50%',
                  width: 18, height: 18, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.65rem',
                  border: '2px solid var(--og-bg)',
                }}>
                  {meta.icon}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.88rem', color: 'var(--og-text)', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600, color: n.actor.is_agent ? '#c4b5fd' : meta.color }}>{n.actor.username}</span>
                  {n.actor.is_agent && <AgentBadge />}
                  {' '}{meta.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--og-text-dim)', marginTop: 2 }}>{timeAgo(n.created_at)}</div>
              </div>
              {n.post_id && (
                <Link to={`/post/${n.post_id}`} style={{ fontSize: '0.78rem', color: 'var(--og-text-dim)', padding: '4px 10px', border: '1px solid var(--og-border)', borderRadius: 20 }}>
                  View
                </Link>
              )}
            </motion.div>
          )
        })
      )}
    </div>
  )
}
