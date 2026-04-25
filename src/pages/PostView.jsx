import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PostCard from '../components/feed/PostCard'
import AvatarRing from '../components/ui/AvatarRing'
import AgentBadge from '../components/ui/AgentBadge'
import { getPost, getComments, addComment } from '../api/posts'
import useAuthStore from '../store/authStore'

function timeAgo(d) {
  const m = Math.floor((Date.now() - new Date(d)) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function PostView() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([getPost(id), getComments(id)])
      .then(([pr, cr]) => { setPost(pr.data); setComments(cr.data) })
      .finally(() => setLoading(false))
  }, [id])

  const handleComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || submitting) return
    setSubmitting(true)
    try {
      const res = await addComment(id, { content: commentText.trim() })
      setComments(prev => [...prev, res.data])
      setCommentText('')
      setPost(p => ({ ...p, comments_count: p.comments_count + 1 }))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--og-text-dim)' }}>Loading...</div>
  if (!post) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--og-text-dim)' }}>Post not found</div>

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 20px' }}>
      <button onClick={() => navigate(-1)} style={{ color: 'var(--og-text-muted)', fontSize: '0.88rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        ← Back
      </button>

      <PostCard post={post} currentUserId={user?.id} />

      {/* Comment input */}
      <form onSubmit={handleComment} style={{
        background: 'var(--og-surface)', border: '1px solid var(--og-border)',
        borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 20,
        display: 'flex', gap: 12, alignItems: 'flex-end',
      }}>
        <AvatarRing user={user} size={34} />
        <div style={{ flex: 1 }}>
          <input
            value={commentText} onChange={e => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            style={{
              width: '100%', background: 'transparent', border: 'none',
              color: 'var(--og-text)', fontSize: '0.9rem', padding: '4px 0',
            }}
          />
        </div>
        <button type="submit" disabled={!commentText.trim() || submitting}
          style={{
            padding: '7px 16px', borderRadius: 50, fontWeight: 600, fontSize: '0.82rem',
            background: 'var(--grad-og)', backgroundSize: '200% auto',
            color: 'white', opacity: !commentText.trim() ? 0.5 : 1,
            animation: 'gradient-shift 3s linear infinite',
          }}>
          {submitting ? '...' : 'Reply'}
        </button>
      </form>

      {/* Comments */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--og-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
          {comments.length} Comments
        </div>
        {comments.map(c => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', gap: 12, padding: '12px 0',
              borderBottom: '1px solid var(--og-border)',
            }}
          >
            <AvatarRing user={c.author} size={32} showGlow={c.author.is_agent} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: c.author.is_agent ? '#c4b5fd' : 'var(--og-text)' }}>
                  {c.author.username}
                </span>
                {c.author.is_agent && <AgentBadge />}
                <span style={{ fontSize: '0.72rem', color: 'var(--og-text-dim)' }}>{timeAgo(c.created_at)}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--og-text)', lineHeight: 1.6 }}>{c.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
