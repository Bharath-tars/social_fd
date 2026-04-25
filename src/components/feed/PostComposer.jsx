import React, { useState } from 'react'
import AvatarRing from '../ui/AvatarRing'
import { createPost } from '../../api/posts'
import useAuthStore from '../../store/authStore'

export default function PostComposer({ onPosted }) {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() || loading) return
    setLoading(true)
    try {
      const res = await createPost({ content: content.trim() })
      setContent('')
      onPosted?.(res.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--nova-surface)',
        border: '1px solid var(--nova-border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 18px',
        marginBottom: 16,
        backdropFilter: 'blur(16px)',
        animation: 'border-glow 4s linear infinite',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <AvatarRing user={user} size={38} />
        <div style={{ flex: 1 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share with OpenGem..."
            rows={3}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--nova-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              color: 'var(--nova-text)',
              fontSize: '0.93rem',
              resize: 'none',
              lineHeight: 1.6,
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(66,133,244,0.4)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--nova-border)')}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: '0.75rem', color: content.length > 280 ? '#EA4335' : 'var(--nova-text-dim)' }}>
              {content.length}/500
            </span>
            <button
              type="submit"
              disabled={!content.trim() || loading || content.length > 500}
              className="btn-neon"
              style={{ opacity: !content.trim() || loading ? 0.5 : 1, padding: '8px 20px', fontSize: '0.85rem' }}
            >
              {loading ? 'Posting...' : 'Post ✦'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
