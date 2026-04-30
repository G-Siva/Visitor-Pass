export function PageWrapper({ children }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 16px' }}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, rightContent }) {
  return (
    <div className="page-header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12 }}>
      <div>
        <h2 className="playfair" style={{ fontSize: 24, color: 'var(--green)', fontWeight: 600 }}>{title}</h2>
        {subtitle && <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{subtitle}</p>}
      </div>
      {rightContent}
    </div>
  )
}

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 12,
      border: '1px solid var(--border)',
      padding: '20px 16px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function FieldRow({ children, cols = 2 }) {
  return (
    <div className={`grid-${cols}`}>
      {children}
    </div>
  )
}

export function Field({ label, required, children }) {
  return (
    <div>
      <label style={{
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--muted)',
        display: 'block',
        marginBottom: 5,
        letterSpacing: '0.02em',
      }}>
        {label}{required && <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export function SuccessBanner({ message, onDismiss }) {
  if (!message) return null
  return (
    <div style={{
      background: '#f0fdf4', border: '1px solid #bbf7d0',
      borderRadius: 8, padding: '12px 16px', color: '#166534',
      fontSize: 14, marginBottom: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {message}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
      )}
    </div>
  )
}

export function ActionButtons({ onSave, onCancel, showPrint = false }) {
  return (
    <div className="action-buttons" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
      <button onClick={onSave} style={btnStyle('var(--green)', '#fff', 'none')}>Save</button>
      <button style={btnStyle('#fff', 'var(--green)', '1px solid var(--green)')}>Update</button>
      <button style={btnStyle('#fff', 'var(--danger)', '1px solid #fca5a5')}>Delete</button>
      <button onClick={onCancel} style={btnStyle('#f5f4f0', 'var(--muted)', '1px solid var(--border)')}>Cancel</button>
      {showPrint && (
        <button style={{ ...btnStyle('var(--gold)', '#fff', 'none'), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print Pass
        </button>
      )}
    </div>
  )
}

function btnStyle(bg, color, border) {
  return {
    padding: '10px 20px',
    background: bg,
    color,
    border: border || 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'DM Sans, sans-serif',
    cursor: 'pointer',
    flex: '1 1 auto',
    textAlign: 'center',
    minWidth: 80,
  }
}

export function SearchBar({ children }) {
  return (
    <div style={{
      background: 'var(--green-light)',
      border: '1px solid #c8e6c9',
      borderRadius: 8,
      padding: '14px 16px',
      marginBottom: 20,
    }}>
      <div className="search-bar-inner">
        {children}
      </div>
    </div>
  )
}

export function SearchField({ label, children }) {
  return (
    <div style={{ flex: '1 1 130px', minWidth: 0 }}>
      {label && <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>{label}</div>}
      {children}
    </div>
  )
}

export function SmallInput(props) {
  return <input {...props} style={{ padding: '8px 10px', fontSize: 13, width: '100%', ...(props.style || {}) }} />
}

export function SmallSelect({ width, children, ...props }) {
  return (
    <select {...props} style={{ padding: '8px 10px', fontSize: 13, width: '100%' }}>
      {children}
    </select>
  )
}

export function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 20px',
        background: 'var(--green)',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: 'DM Sans, sans-serif',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flex: '0 0 auto',
      }}
    >
      Search
    </button>
  )
}

export function InfoBanner({ left, right }) {
  return (
    <div style={{
      background: 'var(--gold-light)',
      border: '1px solid #e8d5a0',
      borderRadius: 8,
      padding: '14px 16px',
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
    }}>
      {left}
      {right}
    </div>
  )
}

export function InfoBannerItem({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#8b6914', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#5c4010' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</div>}
    </div>
  )
}