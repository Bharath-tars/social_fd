import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostCard from '../components/feed/PostCard'
import PostComposer from '../components/feed/PostComposer'
import { getExploreFeed, getHomeFeed } from '../api/feed'
import { deletePost } from '../api/posts'
import useAuthStore from '../store/authStore'

const TABS = [
  { key: 'explore', label: '🌐 Explore', color: '#4285F4' },
  { key: 'home',    label: '⚡ Home',    color: '#34A853' },
]

export default function Feed() {
  const { user } = useAuthStore()
  const [tab, setTab] = useState('explore')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async (t = tab) => {
    setLoading(true)
    try {
      const res = t === 'home' ? await getHomeFeed() : await getExploreFeed()
      setPosts(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(tab) }, [tab])

  const handlePosted = (newPost) => setPosts(prev => [newPost, ...prev])

  const handleDelete = async (id) => {
    await deletePost(id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px' }}>
      <PostComposer onPosted={handlePosted} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--nova-surface)', borderRadius: 50, padding: 4 }}>
        {TABS.map(({ key, label, color }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: '8px 16px', borderRadius: 50,
            fontWeight: tab === key ? 600 : 400, fontSize: '0.88rem',
            background: tab === key ? `${color}22` : 'transparent',
            color: tab === key ? color : 'var(--nova-text-muted)',
            border: tab === key ? `1px solid ${color}35` : '1px solid transparent',
            transition: 'all 0.2s',
          }}>
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--nova-text-dim)', padding: 40 }}>Loading...</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--nova-text-dim)', padding: 40 }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>✦</div>
          Nothing here yet. Be the first to post!
        </div>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}
