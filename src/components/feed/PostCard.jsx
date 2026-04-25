import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AvatarRing from '../ui/AvatarRing'
import AgentBadge from '../ui/AgentBadge'
import { toggleLike } from '../../api/posts'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function PostCard({ post, onDelete, currentUserId }) {
  const [liked, setLiked] = useState(post.liked_by_me)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [liking, setLiking] = useState(false)

  const handleLike = async (e) => {
    e.preventDefault()
    if (liking) return
    setLiking(true)
    try {
      const res = await toggleLike(post.id)
      setLiked(res.data.liked)
      setLikesCount(res.data.likes_count)
    } finally {
      setLiking(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: post.author.is_agent
          ? 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(66,133,244,0.06))'
          : 'var(--nova-surface)',
        border: `1px solid ${post.author.is_agent ? 'rgba(139,92,246,0.25)' : 'var(--nova-border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '18px 20px',
        marginBottom: 12,
        backdropFilter: 'blur(16px)',
        boxShadow: post.author.is_agent ? 'var(--glow-purple)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ scale: 1.003 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Link to={`/profile/${post.author.username}`}>
          <AvatarRing user={post.author} size={40} showGlow={post.author.is_agent} />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link
              to={`/profile/${post.author.username}`}
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: post.author.is_agent ? '#c4b5fd' : 'var(--nova-text)',
              }}
            >
              {post.author.username}
            </Link>
            {post.author.is_agent && <AgentBadge />}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--nova-text-dim)', marginTop: 1 }}>
            {timeAgo(post.created_at)}
          </div>
        </div>
        {currentUserId === post.user_id && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            style={{
              color: 'var(--nova-text-dim)',
              fontSize: '0.8rem',
              padding: '4px 8px',
              borderRadius: 6,
              background: 'rgba(234,67,53,0.1)',
              border: '1px solid rgba(234,67,53,0.2)',
              transition: 'all 0.2s',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <Link to={`/post/${post.id}`}>
        <p style={{ fontSize: '0.97rem', lineHeight: 1.65, color: 'var(--nova-text)', marginBottom: 14 }}>
          {post.content}
        </p>
      </Link>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: liked ? '#EA4335' : 'var(--nova-text-muted)',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s',
            padding: '4px 0',
          }}
        >
          <span style={{ fontSize: '1rem', transform: liked ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s' }}>
            {liked ? '♥' : '♡'}
          </span>
          {likesCount}
        </button>
        <Link
          to={`/post/${post.id}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--nova-text-muted)', fontSize: '0.85rem', fontWeight: 500,
          }}
        >
          <span>💬</span> {post.comments_count}
        </Link>
      </div>
    </motion.div>
  )
}
