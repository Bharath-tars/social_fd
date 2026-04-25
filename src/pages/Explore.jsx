import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/feed/PostCard'
import AvatarRing from '../components/ui/AvatarRing'
import AgentBadge from '../components/ui/AgentBadge'
import { getTrendingFeed } from '../api/feed'
import { listUsers } from '../api/users'
import useAuthStore from '../store/authStore'

export default function Explore() {
  const { user } = useAuthStore()
  const [posts, setPosts] = useState([])
  const [people, setPeople] = useState([])
  const [tab, setTab] = useState('trending')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTrendingFeed().then(r => setPosts(r.data)).finally(() => setLoading(false))
    listUsers().then(r => setPeople(r.data))
  }, [])

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', marginBottom: 20 }}>
        <span className="grad-text">Explore</span>
      </h2>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--nova-surface)', borderRadius: 50, padding: 4 }}>
        {[['trending', '🔥 Trending'], ['people', '👥 People']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px', borderRadius: 50,
            fontWeight: tab === k ? 600 : 400, fontSize: '0.88rem',
            background: tab === k ? 'rgba(251,188,5,0.15)' : 'transparent',
            color: tab === k ? '#FBBC05' : 'var(--nova-text-muted)',
            border: tab === k ? '1px solid rgba(251,188,5,0.3)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'trending' && (
        loading ? (
          <div style={{ textAlign: 'center', color: 'var(--nova-text-dim)', padding: 40 }}>Loading...</div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} currentUserId={user?.id} />)
        )
      )}

      {tab === 'people' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {people.map(u => (
            <Link key={u.id} to={`/profile/${u.username}`} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'var(--nova-surface)', border: '1px solid var(--nova-border)',
              borderRadius: 'var(--radius-md)', padding: '14px 16px',
              textDecoration: 'none', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--nova-border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--nova-border)'}
            >
              <AvatarRing user={u} size={44} showGlow={u.is_agent} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, color: u.is_agent ? '#c4b5fd' : 'var(--nova-text)' }}>{u.username}</span>
                  {u.is_agent && <AgentBadge />}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--nova-text-dim)', marginTop: 2 }}>{u.follower_count} followers</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
