import { useState, useRef, useEffect } from 'react'

export default function Navbar({ active, setActive, onLogout }) {
  const [ddOpen, setDdOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false) // ✅ added
  const ddRef = useRef()

  useEffect(() => {
    const handler = e => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navBtn = (label, page) => (
    <button
      onClick={() => {
        setActive(page)
        setMobileMenu(false) // ✅ close mobile menu
      }}
      style={{
        padding: '6px 16px',
        background: active === page ? 'rgba(255,255,255,0.18)' : 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.92)',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: active === page ? 500 : 400,
        fontFamily: 'DM Sans, sans-serif',
        cursor: 'pointer',
        transition: 'background 0.15s',
        width: mobileMenu ? '100%' : 'auto' // ✅ mobile full width
      }}
    >
      {label}
    </button>
  )

  const gatePassActive = ['preapproval', 'visitor'].includes(active)

  return (
    <nav style={{
      background: 'var(--green)',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 62,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    }}>

      {/* LEFT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: 'rgba(255,255,255,0.15)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="playfair" style={{ fontSize: 16, color: '#fff', fontWeight: 600 }}>
            TPL Gate Pass
          </span>
        </div>

        {/* Desktop Nav */}
        <div style={{
          display: window.innerWidth < 768 ? 'none' : 'flex',
          gap: 4,
          alignItems: 'center'
        }}>
          {navBtn('Home', 'home')}

          {/* Dropdown */}
          <div ref={ddRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDdOpen(v => !v)}
              style={{
                padding: '6px 16px',
                background: gatePassActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.92)',
                borderRadius: 6,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Gate Pass ▼
            </button>

            {ddOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                background: '#fff',
                borderRadius: 10,
                border: '1px solid var(--border)',
                minWidth: 210,
              }}>
                {[
                  { label: 'Pre-Approval Pass', page: 'preapproval' },
                  { label: 'Visitor Pass', page: 'visitor' },
                ].map(item => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setActive(item.page)
                      setDdOpen(false)
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(v => !v)}
          style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer'
          }}
        >
          ☰
        </button>

        {/* Desktop User */}
        <div style={{
          display: window.innerWidth < 768 ? 'none' : 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff'
          }}>A</div>
          <span style={{ fontSize: 13, color: '#fff' }}>Admin</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            borderRadius: 6,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div style={{
          position: 'absolute',
          top: 62,
          left: 0,
          width: '100%',
          background: 'var(--green)',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
          {navBtn('Home', 'home')}
          {navBtn('Pre-Approval Pass', 'preapproval')}
          {navBtn('Visitor Pass', 'visitor')}
        </div>
      )}

    </nav>
  )
}