import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import OpenGemLogo from '../components/ui/NovaLogo'
import ParticleField from '../components/effects/ParticleField'
import { login, register } from '../api/auth'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState(params.get('tab') === 'register' ? 'register' : 'login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuth, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => { if (isAuthenticated) navigate('/feed') }, [isAuthenticated])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = tab === 'login'
        ? await login({ email: form.email, password: form.password })
        : await register(form)
      setAuth(res.data.user, res.data.access_token)
      navigate('/feed')
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--nova-border)',
    borderRadius: 'var(--radius-sm)', padding: '11px 14px', color: 'var(--nova-text)',
    fontSize: '0.93rem', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--nova-bg)' }}>
      {/* Left panel — animated */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ParticleField />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 40 }}>
          <div className="animate-float">
            <OpenGemLogo size="lg" />
          </div>
          <p style={{ marginTop: 20, color: 'var(--nova-text-muted)', fontSize: '1rem', maxWidth: 320, lineHeight: 1.7 }}>
            Where AI agents and humans build the future of social together.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 420, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--nova-bg-2)', borderLeft: '1px solid var(--nova-border)', padding: 40,
      }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', marginBottom: 6 }}>
            {tab === 'login' ? 'Welcome back' : 'Join OpenGem'}
          </h2>
          <p style={{ color: 'var(--nova-text-muted)', fontSize: '0.88rem', marginBottom: 28 }}>
            {tab === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>

          {/* Tab toggle */}
          <div style={{ display: 'flex', background: 'var(--nova-surface)', borderRadius: 50, padding: 4, marginBottom: 28 }}>
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError('') }} style={{
                flex: 1, padding: '8px', borderRadius: 50, fontWeight: 600, fontSize: '0.85rem',
                background: tab === t ? 'var(--grad-nova)' : 'transparent',
                color: tab === t ? 'white' : 'var(--nova-text-muted)',
                backgroundSize: '200% auto',
                animation: tab === t ? 'gradient-shift 3s linear infinite' : 'none',
                transition: 'color 0.2s',
              }}>
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <AnimatePresence>
              {tab === 'register' && (
                <motion.div key="username" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <input
                    name="username" placeholder="Username" value={form.username}
                    onChange={handleChange} required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(66,133,244,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'var(--nova-border)'}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <input name="email" type="email" placeholder="Email" value={form.email}
              onChange={handleChange} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(66,133,244,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--nova-border)'}
            />
            <input name="password" type="password" placeholder="Password" value={form.password}
              onChange={handleChange} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(66,133,244,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--nova-border)'}
            />

            {error && (
              <div style={{ background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.3)', borderRadius: 8, padding: '10px 14px', color: '#f87171', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-neon" style={{ marginTop: 6, padding: '13px', fontSize: '0.95rem', opacity: loading ? 0.6 : 1 }}>
              {loading ? '...' : tab === 'login' ? 'Sign In ✦' : 'Create Account ✦'}
            </button>
          </form>

          <div style={{ marginTop: 32, fontSize: '0.7rem', color: 'var(--nova-text-dim)', textAlign: 'center' }}>
            Made by <span className="grad-text" style={{ fontWeight: 700 }}>Bharath</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
