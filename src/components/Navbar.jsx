import { useState, useRef, useEffect } from 'react'

export default function Navbar({ active, setActive, onLogout }) {
  const [ddOpen, setDdOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const ddRef = useRef()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (ddRef.current && !ddRef.current.contains(e.target)) {
        setDdOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navBtn = (label, page) => (
    <button
      onClick={() => {
        setActive(page)
        setMobileMenu(false)
      }}
      style={{
        padding: '10px 16px',
        background: active === page ? 'rgba(255,255,255,0.18)' : 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.92)',
        borderRadius: 6,
        fontSize: 14,
        fontWeight: active === page ? 500 : 400,
        fontFamily: 'DM Sans, sans-serif',
        cursor: 'pointer',
        transition: 'background 0.15s',
        width: mobileMenu ? '100%' : 'auto',
        textAlign: mobileMenu ? 'left' : 'center',
      }}
    >
      {label}
    </button>
  )

  const isGatePassActive = ['preapproval', 'visitor'].includes(active)

  return (
    <nav style={{
      background: 'var(--green)',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    }}>

      {/* LEFT SIDE - Logo + Desktop Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Logo */}
        <div style={{ 
          fontWeight: 700, 
          fontSize: 20, 
          color: '#fff',
          fontFamily: 'DM Sans, serif'
        }}>
          TPL Gate Pass
        </div>

        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          gap: 6,
          alignItems: 'center',
          marginLeft: 20
        }} className="desktop-nav">
          {navBtn('Home', 'home')}

          {/* Gate Pass Dropdown */}
          <div ref={ddRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDdOpen(v => !v)}
              style={{
                padding: '10px 16px',
                background: isGatePassActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.92)',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: isGatePassActive ? 500 : 400,
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Gate Pass {ddOpen ? '▲' : '▼'}
            </button>

            {ddOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                background: '#fff',
                borderRadius: 10,
                border: '1px solid var(--border)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                minWidth: 220,
                overflow: 'hidden',
                zIndex: 101,
              }}>
                <button
                  onClick={() => { setActive('preapproval'); setDdOpen(false); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  Pre-Approval Pass
                </button>
                <button
                  onClick={() => { setActive('visitor'); setDdOpen(false); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  Visitor Pass
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(v => !v)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 26,
            cursor: 'pointer',
            padding: '4px 8px',
          }}
          className="mobile-hamburger"
        >
          ☰
        </button>

        {/* Desktop User Info */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: 10
        }} className="desktop-user">
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
          }}>
            A
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>Admin</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>IT Department</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: 6,
            fontSize: 13.5,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Logout
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div style={{
          position: 'absolute',
          top: 64,
          left: 0,
          width: '100%',
          background: 'var(--green)',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 99,
        }}>
          {navBtn('Home', 'home')}
          {navBtn('Pre-Approval Pass', 'preapproval')}
          {navBtn('Visitor Pass', 'visitor')}
        </div>
      )}

      {/* Media Queries for Responsive Behavior */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
          .desktop-user {
            display: flex !important;
          }
        }

        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
          .desktop-user {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}