import { useState } from 'react'
import { savePass, getAllPasses } from '../utils/store'
import {
  PageWrapper, PageHeader, Card, Field,
  SearchBar, SearchField, SmallSelect, SearchButton,
  ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')

const emptyForm = {
  visitorsNumber: '', visitorsName: '', visitorCompany: '',
  departmentCode: '', purpose: '', visitorsType: '',
  areaOfVisit: '', visitFrom: '', visitTo: '',
}

export default function PreApprovalPass() {
  const [saved, setSaved] = useState(false)
  const [generatedNumber, setGeneratedNumber] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)

  const S = { padding: '7px 10px', fontSize: 13 }
  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSave = () => {
    setError('')
    if (!form.visitorsName.trim()) {
      setError('Visitor Name is required.')
      return
    }
    const number = savePass(form)
    setGeneratedNumber(number)
    setForm(f => ({ ...f, visitorsNumber: number }))
    setSaved(true)
  }

  const handleCancel = () => {
    setSaved(false)
    setGeneratedNumber('')
    setError('')
    setForm(emptyForm)
  }

  // Search existing passes
  const [passes] = useState(() => getAllPasses())
  const [selectedPass, setSelectedPass] = useState('')

  const handleSearch = (e) => {
    const number = e.target.value
    setSelectedPass(number)
    if (!number) { setForm(emptyForm); return }
    const pass = getAllPasses().find(p => p.passNumber === number)
    if (pass) setForm({ ...pass })
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Pre-Approval Pass"
        subtitle="Register and manage pre-approved visitor entries"
        rightContent={
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Date</div>
            <div className="playfair" style={{ fontSize: 16, color: 'var(--green)', fontWeight: 600 }}>{today}</div>
          </div>
        }
      />

      <Card style={{ marginBottom: 16 }}>

        {/* Search + Info row */}
        <div className="search-info-row" style={{ display: 'flex', flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: '1 1 auto' }}>
            <SearchBar>
              <SearchField label="Search Existing Pass">
                <SmallSelect value={selectedPass} onChange={handleSearch}>
                  <option value="">— Select Pass —</option>
                  {passes.length === 0 && <option disabled>No saved passes yet</option>}
                  {passes.map(p => (
                    <option key={p.passNumber} value={p.passNumber}>
                      {p.passNumber} — {p.visitorsName}
                    </option>
                  ))}
                </SmallSelect>
              </SearchField>
              <SearchField label="Financial Year">
                <SmallSelect>
                  <option>2026-2027</option>
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                </SmallSelect>
              </SearchField>
              <SearchButton />
            </SearchBar>
          </div>

          <div style={{
            background: 'var(--gold-light)', border: '1px solid #e8d5a0',
            borderRadius: 8, padding: '12px 16px',
            display: 'flex', gap: 24, flexWrap: 'wrap',
            flexShrink: 0, alignItems: 'flex-start', marginBottom: 14,
          }}>
            <div>
              <div style={{ fontSize: 10, color: '#8b6914', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>Approval Date</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#5c4010' }}>{today}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#8b6914', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>To Meet</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Kumaragurubaran</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>IT Manager</div>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px 16px',
        }}>
          <Field label="Pass Number">
            <input
              value={form.visitorsNumber || generatedNumber}
              readOnly
              placeholder="Auto-generated on save"
              style={{ ...S, background: '#f5f4f0', color: 'var(--green)', fontWeight: 600, cursor: 'not-allowed' }}
            />
          </Field>
          <Field label="Visitors Name" required>
            <input value={form.visitorsName} onChange={set('visitorsName')} placeholder="Enter full name" style={S} />
          </Field>
          <Field label="Visitor Company">
            <input value={form.visitorCompany} onChange={set('visitorCompany')} placeholder="Company or organization" style={S} />
          </Field>

          <Field label="Department Code">
            <select value={form.departmentCode} onChange={set('departmentCode')} style={S}>
              <option value="">— Select Department —</option>
              <option>IT Department</option>
              <option>HR Department</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Security</option>
              <option>Maintenance</option>
            </select>
          </Field>
          <Field label="Visitors Type">
            <select value={form.visitorsType} onChange={set('visitorsType')} style={S}>
              <option value="">— Select Type —</option>
              <option>Auditor</option>
              <option>Vendor</option>
              <option>Guest</option>
              <option>Contractor</option>
              <option>Government Official</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Area of Visit">
            <input value={form.areaOfVisit} onChange={set('areaOfVisit')} placeholder="Area or building block" style={S} />
          </Field>

          <Field label="Visit From">
            <input type="date" value={form.visitFrom} onChange={set('visitFrom')} style={S} />
          </Field>
          <Field label="Visit To">
            <input type="date" value={form.visitTo} onChange={set('visitTo')} style={S} />
          </Field>
          <Field label="Purpose">
            <input value={form.purpose} onChange={set('purpose')} placeholder="Purpose of visit" style={S} />
          </Field>
        </div>

      </Card>

      {/* Error */}
      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8,
          padding: '12px 16px', color: '#b91c1c', fontSize: 14,
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {/* Success with generated number */}
      {saved && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8,
          padding: '14px 18px', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Pre-approval pass saved! Pass number assigned:
          </div>
          <div style={{
            background: 'var(--green)', color: '#fff',
            fontWeight: 700, fontSize: 16,
            padding: '6px 20px', borderRadius: 6,
            letterSpacing: '0.08em', fontFamily: 'monospace',
          }}>
            {generatedNumber}
          </div>
        </div>
      )}

      <ActionButtons onSave={handleSave} onCancel={handleCancel} />
    </PageWrapper>
  )
}