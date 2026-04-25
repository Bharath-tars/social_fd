import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AvatarRing from '../ui/AvatarRing'
import AgentBadge from '../ui/AgentBadge'
import { toggleLike } from '../../api/posts'

const CARD_COLORS = ['#4285F4', '#EA4335', '#34A853', '#FBBC05']

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
  const [heartPop, setHeartPop] = useState(false)

  const accentColor = post.author.is_agent ? '#8B5CF6' : CARD_COLORS[post.id % 4]

  const handleLike = async (e) => {
    e.preventDefault()
    if (liking) return
    setLiking(true)
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 500)
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
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -4, x: -2 }}
      style={{
        background: post.author.is_agent
          ? 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(66,133,244,0.08))'
          : 'var(--og-surface)',
        border: `3px solid ${accentColor}`,
        borderRadius: 'var(--radius-lg)',
        padding: '20px 22px',
        marginBottom: 18,
        backdropFilter: 'blur(16px)',
        boxShadow: `5px 5px 0px ${accentColor}55`,
        transition: 'box-shadow 0.15s ease',
      }}
      onHoverStart={e => { e.target.style && (e.target.style.boxShadow = `7px 7px 0px ${accentColor}77`) }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Link to={`/profile/${post.author.username}`}>
          <motion.div whileHover={{ scale: 1.12, rotate: -3 }} whileTap={{ scale: 0.92 }}>
            <AvatarRing user={post.author} size={42} showGlow={post.author.is_agent} />
          </motion.div>
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Link
              to={`/profile/${post.author.username}`}
              style={{
                fontWeight: 800,
                fontSize: '0.97rem',
                color: post.author.is_agent ? '#c4b5fd' : 'var(--og-text)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {post.author.username}
            </Link>
            {post.author.is_agent && <AgentBadge />}
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--og-text-dim)',
            marginTop: 2,
            fontWeight: 600,
            letterSpacing: '0.03em',
          }}>
            {timeAgo(post.created_at)}
          </div>
        </div>
        {currentUserId === post.user_id && onDelete && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => onDelete(post.id)}
            style={{
              color: '#EA4335',
              fontSize: '0.82rem',
              padding: '5px 10px',
              borderRadius: 10,
              background: 'rgba(234,67,53,0.12)',
              border: '2px solid rgba(234,67,53,0.35)',
              fontWeight: 700,
            }}
          >
            ✕
          </motion.button>
        )}
      </div>

      {/* Content */}
      <Link to={`/post/${post.id}`}>
        <p style={{
          fontSize: '0.97rem',
          lineHeight: 1.7,
          color: 'var(--og-text)',
          marginBottom: 16,
          fontWeight: 450,
        }}>
          {post.content}
        </p>
      </Link>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 1.5, rotate: -10 }}
          animate={heartPop ? { scale: [1, 1.6, 0.9, 1.2, 1], rotate: [0, -15, 10, -5, 0] } : {}}
          transition={{ duration: 0.45 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            color: liked ? '#EA4335' : 'var(--og-text-muted)',
            fontSize: '0.88rem',
            fontWeight: 700,
            padding: '6px 12px',
            borderRadius: 50,
            border: `2px solid ${liked ? '#EA4335' : 'var(--og-border-2)'}`,
            background: liked ? 'rgba(234,67,53,0.12)' : 'transparent',
            transition: 'all 0.2s',
            boxShadow: liked ? '2px 2px 0px #EA4335' : 'none',
          }}
        >
          <span style={{ fontSize: '1.05rem' }}>
            {liked ? '♥' : '♡'}
          </span>
          {likesCount}
        </motion.button>

        <Link
          to={`/post/${post.id}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            color: 'var(--og-text-muted)', fontSize: '0.88rem', fontWeight: 700,
            padding: '6px 12px',
            borderRadius: 50,
            border: '2px solid var(--og-border-2)',
            transition: 'all 0.2s',
          }}
        >
          <span>💬</span> {post.comments_count}
        </Link>
      </div>
    </motion.div>
  )
}
