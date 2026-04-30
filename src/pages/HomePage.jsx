export default function HomePage({ setActive }) {
  const cards = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      title: 'Pre-Approval Pass',
      desc: 'Register and manage pre-approved visitor entries with authorization details before their arrival.',
      page: 'preapproval',
      tag: 'Gate Pass',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
      ),
      title: 'Visitor Pass',
      desc: 'Issue real-time visitor gate passes with full details, material tracking, and print capability.',
      page: 'visitor',
      tag: 'Gate Pass',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      title: 'Reports',
      desc: 'View and export gate pass records, visitor logs, and analytics across any date range.',
      page: 'home',
      tag: 'Analytics',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title: 'Admin Panel',
      desc: 'Configure departments, visitor types, safety slogans, user roles, and system settings.',
      page: 'home',
      tag: 'Admin',
    },
  ]

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  const isMobile = window.innerWidth < 768 // ✅ added

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: isMobile ? '28px 16px' : '48px 24px'
    }}>

      {/* Welcome */}
      <div style={{ marginBottom: isMobile ? 28 : 44 }}>
        <p style={{
          fontSize: isMobile ? 11 : 13,
          color: 'var(--muted)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 8
        }}>
          {today}
        </p>

        <h1 className="playfair" style={{
          fontSize: isMobile ? 26 : 36,
          color: 'var(--green)',
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: 12
        }}>
          Welcome back, Admin
        </h1>

        <p style={{
          color: 'var(--muted)',
          fontSize: isMobile ? 14 : 15,
          maxWidth: 520,
          lineHeight: 1.7
        }}>
          Manage visitor gate entries and pre-approvals for Tamilnadu Petroproducts Limited from one central dashboard.
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 16,
        marginBottom: isMobile ? 24 : 40
      }}>
        {[
          { label: "Today's Passes", value: '24', color: 'var(--green)' },
          { label: 'Pending Approvals', value: '7', color: '#b45309' },
          { label: 'Total This Month', value: '312', color: '#1d4ed8' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--surface)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            padding: isMobile ? '16px' : '20px 22px',
          }}>
            <div style={{
              fontSize: isMobile ? 11 : 12,
              color: 'var(--muted)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 8
            }}>
              {stat.label}
            </div>
            <div className="playfair" style={{
              fontSize: isMobile ? 26 : 32,
              fontWeight: 600,
              color: stat.color
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick access cards */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 16
        }}>
          Quick Access
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 16
        }}>
          {cards.map(card => (
            <div
              key={card.title}
              onClick={() => setActive(card.page)}
              style={{
                background: 'var(--surface)',
                borderRadius: 12,
                border: '1px solid var(--border)',
                padding: isMobile ? '18px' : '24px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                if (!isMobile) {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,92,42,0.1)'
                  e.currentTarget.style.borderColor = '#a5d6a7'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={e => {
                if (!isMobile) {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 14
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  background: 'var(--green-light)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {card.icon}
                </div>

                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--green)',
                  background: 'var(--green-light)',
                  padding: '3px 10px',
                  borderRadius: 20,
                  letterSpacing: '0.04em',
                }}>
                  {card.tag}
                </span>
              </div>

              <h3 className="playfair" style={{
                fontSize: isMobile ? 16 : 18,
                color: '#1a1a1a',
                marginBottom: 8
              }}>
                {card.title}
              </h3>

              <p style={{
                fontSize: 13,
                color: 'var(--muted)',
                lineHeight: 1.65
              }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}