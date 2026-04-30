import { useState } from 'react'
import logo from '../logo-tpl.png'

import { FaShield } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa6";

const CREDS = { username: 'admin', password: 'admin123' }

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    <>
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
        }
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #1a5c2a 0%, #2d7a3e 60%, #3a9e52 100%);
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
        }
        .login-left::before {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
          top: -100px;
          left: -100px;
        }
        .login-left::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
          bottom: -80px;
          right: -60px;
        }
        .login-right {
          width: 480px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f4f0;
          padding: 48px 40px;
        }
        @media (max-width: 768px) {
          .login-wrapper { flex-direction: column; }
          .login-left {
            flex: none;
            min-height: 220px;
            padding: 36px 24px;
          }
          .login-right {
            width: 100%;
            flex: 1;
            padding: 32px 20px;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="login-wrapper">

        {/* LEFT PANEL */}
        <div className="login-left">
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 360 }}>

            {/* Logo */}
            <div style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20,
              padding: '20px 32px',
              display: 'inline-block',
              marginBottom: 32,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <img src={logo} alt="TPL Logo" style={{ height: 56, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>

            <h2 className="playfair" style={{ fontSize: 28, color: '#fff', fontWeight: 600, lineHeight: 1.3, marginBottom: 14 }}>
              Gate Pass Management System
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.75 }}>
              Streamline visitor entry, pre-approvals, and gate passes for Tamilnadu Petroproducts Limited — all in one place.
            </p>

            {/* Decorative feature pills */}
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              {[
                { icon: <FaShield className='text-gray-200'/>, text: 'Pre-approval pass management' },
                { icon: <FaUser className='text-gray-200'/>, text: 'Real-time visitor gate passes' },
                { icon: <FaChartBar className='text-gray-200'/>, text: 'Reports & audit trail' },
              ].map(f => (
                <div key={f.text} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 30, padding: '8px 16px',
                  backdropFilter: 'blur(4px)',
                }}>
                  <span style={{ fontSize: 15 }}>{f.icon}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          <div style={{ width: '100%', maxWidth: 380 }}>

            <div style={{ marginBottom: 32 }}>
              <h1 className="playfair" style={{ fontSize: 26, color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>
                Welcome back
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>Sign in to your account to continue</p>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: 14,
              border: '1px solid var(--border)',
              padding: '32px 28px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
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
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
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
                  background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: 6, padding: '10px 14px',
                  color: '#b91c1c', fontSize: 13, marginBottom: 18,
                }}>
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%', padding: '12px',
                  background: loading ? '#6b8f72' : 'var(--green)',
                  color: '#fff', border: 'none', borderRadius: 8,
                  fontSize: 15, fontWeight: 500, letterSpacing: '0.02em',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 16 }}>
                Demo: <strong>admin</strong> / <strong>admin123</strong>
              </p>
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 24 }}>
              © {new Date().getFullYear()} Tamilnadu Petroproducts Limited
            </p>
          </div>
        </div>

      </div>
    </>
  )
}