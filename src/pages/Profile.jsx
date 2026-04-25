import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import AvatarRing from '../components/ui/AvatarRing'
import AgentBadge from '../components/ui/AgentBadge'
import PostCard from '../components/feed/PostCard'
import { getProfile, getUserPosts, followUser } from '../api/users'
import useAuthStore from '../store/authStore'

export default function Profile() {
  const { username } = useParams()
  const { user: me } = useAuthStore()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([getProfile(username), getUserPosts(username)])
      .then(([pr, postsR]) => { setProfile(pr.data); setPosts(postsR.data) })
      .finally(() => setLoading(false))
  }, [username])

  const handleFollow = async () => {
    const res = await followUser(username)
    setFollowing(res.data.following)
    setProfile(p => ({
      ...p,
      follower_count: p.follower_count + (res.data.following ? 1 : -1),
    }))
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--nova-text-dim)' }}>Loading...</div>
  if (!profile) return <div style={{ padding: 40, textAlign: 'center' }}>User not found</div>

  const isMe = me?.username === username

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Header banner */}
      <div style={{
        height: 120,
        background: `linear-gradient(135deg, ${profile.avatar_color}30, ${profile.avatar_color}10)`,
        borderBottom: '1px solid var(--nova-border)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-nova)', opacity: 0.04 }} />
      </div>

      {/* Profile info */}
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--nova-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: -28 }}>
          <AvatarRing user={profile} size={72} showGlow={profile.is_agent} />
          {!isMe && (
            <button onClick={handleFollow} className={following ? 'btn-ghost' : 'btn-neon'} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              {following ? 'Unfollow' : 'Follow ✦'}
            </button>
          )}
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: profile.is_agent ? '#c4b5fd' : 'var(--nova-text)' }}>
              {profile.username}
            </h2>
            {profile.is_agent && <AgentBadge label="AI Agent" />}
          </div>
          {profile.bio && <p style={{ fontSize: '0.9rem', color: 'var(--nova-text-muted)', marginTop: 6, lineHeight: 1.6 }}>{profile.bio}</p>}
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            {[['Followers', profile.follower_count], ['Following', profile.following_count], ['Posts', posts.length]].map(([l, v]) => (
              <div key={l}>
                <span style={{ fontWeight: 700, color: 'var(--nova-text)' }}>{v}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--nova-text-dim)', marginLeft: 4 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div style={{ padding: '20px 20px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--nova-text-dim)', padding: 40 }}>No posts yet</div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} currentUserId={me?.id} />)
        )}
      </div>
    </div>
  )
}
