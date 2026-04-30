import { useState } from 'react'

const CREDS = { username: 'admin', password: 'admin123' }

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isMobile = window.innerWidth < 768 // ✅ added

  const handleSubmit = () => {
    setError('')
    if (!username || !password) { setError('Please enter both username and password.'); return }
    setLoading(true)
    setTimeout(() => {
      if (username === CREDS.username && password === CREDS.password) {
        onLogin()
      } else {
        setError('Invalid credentials. Hint: admin / admin123')
        setLoading(false)
      }
    }, 700)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f4f0 0%, #e8f0ea 100%)',
      padding: isMobile ? '16px' : '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: isMobile ? 50 : 60,
            height: isMobile ? 50 : 60,
            borderRadius: 16,
            background: 'var(--green)',
            marginBottom: 18,
          }}>
            <svg width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="playfair" style={{
            fontSize: isMobile ? 24 : 30,
            color: 'var(--green)',
            fontWeight: 600,
            lineHeight: 1.2
          }}>
            Gate Pass System
          </h1>

          <p style={{
            color: 'var(--muted)',
            fontSize: isMobile ? 13 : 14,
            marginTop: 6
          }}>
            Tamilnadu Petroproducts Limited
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 14,
          border: '1px solid var(--border)',
          padding: isMobile ? '24px 18px' : '36px 40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--muted)',
              display: 'block',
              marginBottom: 6
            }}>
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--muted)',
              display: 'block',
              marginBottom: 6
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 6,
              padding: '10px 14px',
              color: '#b91c1c',
              fontSize: 13,
              marginBottom: 18,
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              background: loading ? '#6b8f72' : 'var(--green)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: isMobile ? 14 : 15,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: isMobile ? 11 : 12,
            color: 'var(--muted)',
            marginTop: 16
          }}>
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </div>

      </div>
    </div>
  )
}