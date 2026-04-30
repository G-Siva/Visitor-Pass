import { useState } from 'react'
import {
  PageWrapper, PageHeader, Card, Field,
  SearchBar, SearchField, SmallInput, SmallSelect, SearchButton,
  SuccessBanner, ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')

export default function PreApprovalPass() {
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    visitorsNumber: '',
    visitorsName: '',
    visitorCompany: '',
    departmentCode: '',
    purpose: '',
    visitorsType: '',
    areaOfVisit: '',
    visitFrom: '',
    visitTo: '',
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSave = () => setSaved(true)
  const handleCancel = () => {
    setSaved(false)
    setForm({ visitorsNumber: '', visitorsName: '', visitorCompany: '', departmentCode: '', purpose: '', visitorsType: '', areaOfVisit: '', visitFrom: '', visitTo: '' })
  }

  const S = { padding: '7px 10px', fontSize: 13 }

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

        {/* Search + Info banner row - FIXED FOR MOBILE */}
        <div 
          className="search-info-row" 
          style={{
            display: 'flex',
            flexDirection: 'row', 
            gap: 16, 
            marginBottom: 16 
          }}
        >
          <div style={{ flex: '1 1 auto' }}>
            <SearchBar>
              <SearchField label="Search by Visitor No">
                <SmallInput placeholder="e.g. 83" />
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

          {/* Info Banner - Improved mobile alignment */}
          <div style={{
            background: 'var(--gold-light)',
            border: '1px solid #e8d5a0',
            borderRadius: 8,
            padding: '12px 16px',
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            flexShrink: 0,
            alignItems: 'flex-start',        // Better vertical alignment
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

        {/* All fields — Responsive Grid (unchanged) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px 16px'
        }}>
          <Field label="Visitors Number" required>
            <input value={form.visitorsNumber} onChange={set('visitorsNumber')} placeholder="Auto-generated" style={S} />
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

      <SuccessBanner
        message={saved ? 'Pre-approval pass saved successfully!' : ''}
        onDismiss={() => setSaved(false)}
      />

      <ActionButtons onSave={handleSave} onCancel={handleCancel} />
    </PageWrapper>
  )
}