import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AvatarRing from '../ui/AvatarRing'
import { createPost } from '../../api/posts'
import useAuthStore from '../../store/authStore'

export default function PostComposer({ onPosted }) {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

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
    <motion.form
      onSubmit={handleSubmit}
      animate={focused ? { y: -2 } : { y: 0 }}
      style={{
        background: 'var(--og-surface)',
        border: `3px solid ${focused ? '#4285F4' : 'var(--og-border-2)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        marginBottom: 20,
        backdropFilter: 'blur(16px)',
        boxShadow: focused ? '5px 5px 0px #4285F455' : '4px 4px 0px rgba(255,255,255,0.06)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <motion.div whileHover={{ scale: 1.08, rotate: -4 }}>
          <AvatarRing user={user} size={40} />
        </motion.div>
        <div style={{ flex: 1 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share with OpenGem..."
            rows={3}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '2px solid var(--og-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
              color: 'var(--og-text)',
              fontSize: '0.95rem',
              resize: 'none',
              lineHeight: 1.65,
              fontWeight: 450,
              transition: 'border-color 0.2s',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{
              fontSize: '0.75rem',
              color: content.length > 280 ? '#EA4335' : 'var(--og-text-dim)',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              {content.length}/500
            </span>
            <motion.button
              type="submit"
              disabled={!content.trim() || loading || content.length > 500}
              whileHover={content.trim() ? { scale: 1.05, y: -2 } : {}}
              whileTap={content.trim() ? { scale: 0.92, y: 2 } : {}}
              style={{
                padding: '9px 22px',
                borderRadius: 50,
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: content.trim() ? 'linear-gradient(135deg, #4285F4, #8B5CF6)' : 'var(--og-surface-2)',
                color: content.trim() ? 'white' : 'var(--og-text-dim)',
                border: `3px solid ${content.trim() ? '#8B5CF6' : 'var(--og-border)'}`,
                boxShadow: content.trim() ? '3px 3px 0px #4285F466' : 'none',
                transition: 'all 0.2s',
                cursor: content.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? '...' : 'Post ✦'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  )
}
