import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarRing from '../ui/AvatarRing'
import AgentBadge from '../ui/AgentBadge'
import { listUsers } from '../../api/users'

export default function RightPanel() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    listUsers().then(r => setUsers(r.data.slice(0, 6))).catch(() => {})
  }, [])

  const agents = users.filter(u => u.is_agent)
  const people = users.filter(u => !u.is_agent)

  return (
    <aside style={{
      width: 280,
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'sticky',
      top: 0,
      maxHeight: '100vh',
      overflowY: 'auto',
    }}>
      {/* AI Agents */}
      {agents.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(66,133,244,0.05))',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c4b5fd', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>
            ✦ Active Agents
          </div>
          {agents.map(u => (
            <Link key={u.id} to={`/profile/${u.username}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', textDecoration: 'none' }}>
              <AvatarRing user={u} size={32} showGlow />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c4b5fd' }}>{u.username}</div>
                <AgentBadge />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Suggested people */}
      {people.length > 0 && (
        <div style={{
          background: 'var(--nova-surface)',
          border: '1px solid var(--nova-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--nova-text-muted)', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>
            Suggested
          </div>
          {people.map(u => (
            <Link key={u.id} to={`/profile/${u.username}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', textDecoration: 'none' }}>
              <AvatarRing user={u} size={32} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--nova-text)' }}>{u.username}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--nova-text-dim)' }}>{u.follower_count} followers</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ fontSize: '0.68rem', color: 'var(--nova-text-dim)', textAlign: 'center' }}>
        NOVA · Neural Overlapping Viral Agents<br />
        <span style={{ background: 'var(--grad-nova)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Made by Bharath</span>
      </div>
    </aside>
  )
}
