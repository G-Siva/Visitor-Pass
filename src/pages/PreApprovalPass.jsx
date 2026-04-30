import { useState } from 'react'
import {
  PageWrapper, PageHeader, Card, FieldRow, Field,
  SearchBar, SearchField, SmallInput, SmallSelect, SearchButton,
  InfoBanner, InfoBannerItem, SuccessBanner, ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')

export default function PreApprovalPass() {
  const [saved, setSaved] = useState(false)

  const isMobile = window.innerWidth < 768 // ✅ added

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
    setSaved(false); 
    setForm({ visitorsNumber: '', visitorsName: '', visitorCompany: '', departmentCode: '', purpose: '', visitorsType: '', areaOfVisit: '', visitFrom: '', visitTo: '' }) 
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Pre-Approval Pass"
        subtitle="Register and manage pre-approved visitor entries"
        rightContent={
          <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
              Date
            </div>
            <div className="playfair" style={{ fontSize: isMobile ? 16 : 18, color: 'var(--green)', fontWeight: 600 }}>
              {today}
            </div>
          </div>
        }
      />

      <Card style={{ marginBottom: 20 }}>

        {/* Search bar */}
        <SearchBar style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10
        }}>
          <SearchField label="Search by Visitor No">
            <SmallInput placeholder="e.g. 83" width={isMobile ? '100%' : 100} />
          </SearchField>
          <SearchField label="Financial Year">
            <SmallSelect width={isMobile ? '100%' : 130}>
              <option>2026-2027</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
            </SmallSelect>
          </SearchField>
          <SearchButton />
        </SearchBar>

        {/* Info banner */}
        <InfoBanner
          left={
            <InfoBannerItem label="Approval Date &amp; Time" value={today} />
          }
          right={
            <div style={{ textAlign: isMobile ? 'left' : 'right', marginTop: isMobile ? 10 : 0 }}>
              <div style={{ fontSize: 11, color: '#8b6914', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>
                To Meet
              </div>
              <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: 'var(--green)' }}>
                Kumaragurubaran
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                IT Manager
              </div>
            </div>
          }
        />

        {/* Form fields */}

        <FieldRow style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : undefined,
          gap: 12
        }}>
          <Field label="Visitors Number" required>
            <input value={form.visitorsNumber} onChange={set('visitorsNumber')} placeholder="Auto-generated on save" />
          </Field>
          <Field label="Visitors Name" required>
            <input value={form.visitorsName} onChange={set('visitorsName')} placeholder="Enter full name" />
          </Field>
        </FieldRow>

        <FieldRow style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : undefined,
          gap: 12
        }}>
          <Field label="Visitor Company">
            <input value={form.visitorCompany} onChange={set('visitorCompany')} placeholder="Company or organization" />
          </Field>
          <Field label="Department Code">
            <select value={form.departmentCode} onChange={set('departmentCode')}>
              <option value="">— Select Department —</option>
              <option>IT Department</option>
              <option>HR Department</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Security</option>
              <option>Maintenance</option>
            </select>
          </Field>
        </FieldRow>

        <FieldRow style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : undefined,
          gap: 12
        }}>
          <Field label="Purpose">
            <textarea value={form.purpose} onChange={set('purpose')} placeholder="State the purpose of visit..." />
          </Field>
          <Field label="Visitors Type">
            <select value={form.visitorsType} onChange={set('visitorsType')}>
              <option value="">— Select Type —</option>
              <option>Auditor</option>
              <option>Vendor</option>
              <option>Guest</option>
              <option>Contractor</option>
              <option>Government Official</option>
              <option>Other</option>
            </select>
          </Field>
        </FieldRow>

        <FieldRow style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : undefined,
          gap: 12
        }}>
          <Field label="Area of Visit">
            <input value={form.areaOfVisit} onChange={set('areaOfVisit')} placeholder="Specific area or building block" />
          </Field>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 12
          }}>
            <Field label="Visit From">
              <input type="date" value={form.visitFrom} onChange={set('visitFrom')} />
            </Field>
            <Field label="Visit To">
              <input type="date" value={form.visitTo} onChange={set('visitTo')} />
            </Field>
          </div>
        </FieldRow>

      </Card>

      <SuccessBanner
        message={saved ? 'Pre-approval pass saved successfully!' : ''}
        onDismiss={() => setSaved(false)}
      />

      <ActionButtons onSave={handleSave} onCancel={handleCancel} />
    </PageWrapper>
  )
}