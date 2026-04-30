import { useState } from 'react'
import {
  PageWrapper, PageHeader, Card, FieldRow, Field,
  SearchBar, SearchField, SmallSelect, SearchButton,
  SuccessBanner, ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')
const todayISO = new Date().toISOString().split('T')[0]

export default function VisitorPass() {
  const [saved, setSaved] = useState(false)
  const [materials, setMaterials] = useState([{ id: 1, desc: '', qty: '' }])

  const isMobile = window.innerWidth < 768 // ✅ added

  const addRow = () => setMaterials(m => [...m, { id: Date.now(), desc: '', qty: '' }])
  const removeRow = id => { if (materials.length > 1) setMaterials(m => m.filter(r => r.id !== id)) }
  const updateRow = (id, field, val) => setMaterials(m => m.map(r => r.id === id ? { ...r, [field]: val } : r))

  const [form, setForm] = useState({
    visitorsNumber: '1',
    visitorName: '',
    visitorType: 'Auditor',
    visitorCompany: '',
    address: '',
    toMeet: '',
    pouchId: '',
    areaOfVisit: '',
    mobileModel: '',
    mobileNumber: '',
    vehicleNumber: '',
    safetySlogan: '',
    purpose: '',
    remarks: '',
    passFrom: todayISO,
    passTo: todayISO,
    markOut: false,
  })

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const setCheck = field => e => setForm(f => ({ ...f, [field]: e.target.checked }))

  const handleSave = () => setSaved(true)
  const handleCancel = () => setSaved(false)

  return (
    <PageWrapper>
      <PageHeader
        title="Visitor Pass"
        subtitle="Issue and track visitor gate passes in real time"
        rightContent={
          <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
              In Date Time
            </div>
            <div className="playfair" style={{ fontSize: isMobile ? 14 : 15, color: 'var(--green)', fontWeight: 600 }}>
              {today} — 05:53:30
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
          <div style={{ width: isMobile ? '100%' : 'auto' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>Department</div>
            <SmallSelect width={isMobile ? '100%' : 160}>
              <option value="">— Select —</option>
              <option>IT Department</option>
              <option>HR Department</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Security</option>
            </SmallSelect>
          </div>

          <div style={{ width: isMobile ? '100%' : 'auto' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>Pre-Approval Pass No</div>
            <SmallSelect width={isMobile ? '100%' : 170}>
              <option value="">— Select —</option>
              <option>PA-001</option>
              <option>PA-002</option>
              <option>PA-083</option>
            </SmallSelect>
          </div>

          <div style={{ width: isMobile ? '100%' : 'auto' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>Visitor's No</div>
            <SmallSelect width={isMobile ? '100%' : 130}>
              <option value="">— Select —</option>
              <option>2025-2026</option>
              <option>2026-2027</option>
            </SmallSelect>
          </div>

          <SearchButton />
        </SearchBar>

        {/* Form fields */}
        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Visitors Number">
            <input value={form.visitorsNumber} onChange={set('visitorsNumber')} placeholder="Visitor number" />
          </Field>
          <Field label="Visitor Name" required>
            <input value={form.visitorName} onChange={set('visitorName')} placeholder="Full name of visitor" />
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Visitor Type" required>
            <select value={form.visitorType} onChange={set('visitorType')}>
              <option>Auditor</option>
              <option>Vendor</option>
              <option>Guest</option>
              <option>Contractor</option>
              <option>Government Official</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Visitor Company">
            <input value={form.visitorCompany} onChange={set('visitorCompany')} placeholder="Company or organization" />
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Address">
            <textarea value={form.address} onChange={set('address')} placeholder="Visitor's full address..." />
          </Field>
          <Field label="To Meet">
            <input value={form.toMeet} onChange={set('toMeet')} placeholder="Name of person to meet" />
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Pouch ID / Number">
            <input value={form.pouchId} onChange={set('pouchId')} placeholder="Pouch or ID document number" />
          </Field>
          <Field label="Area of Visit">
            <input value={form.areaOfVisit} onChange={set('areaOfVisit')} placeholder="Specific area, block, or floor" />
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Mobile Model">
            <input value={form.mobileModel} onChange={set('mobileModel')} placeholder="Device model (if carrying)" />
          </Field>
          <Field label="Mobile Number">
            <input value={form.mobileNumber} onChange={set('mobileNumber')} placeholder="+91 XXXXX XXXXX" />
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Vehicle Number">
            <input value={form.vehicleNumber} onChange={set('vehicleNumber')} placeholder="Vehicle registration number" />
          </Field>
          <Field label="Safety Slogan">
            <select value={form.safetySlogan} onChange={set('safetySlogan')}>
              <option value="">— Select Safety Slogan —</option>
              <option>Safety First, Always</option>
              <option>Think Safe, Work Safe</option>
              <option>Zero Accidents, Zero Harm</option>
              <option>Protect Yourself, Protect Others</option>
              <option>Safety is Everyone's Responsibility</option>
            </select>
          </Field>
        </FieldRow>

        <FieldRow style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Purpose">
            <textarea value={form.purpose} onChange={set('purpose')} placeholder="Purpose of this visit..." />
          </Field>
          <Field label="Remarks">
            <textarea value={form.remarks} onChange={set('remarks')} placeholder="Any additional remarks..." />
          </Field>
        </FieldRow>

        <FieldRow cols={3} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : undefined, gap: 12 }}>
          <Field label="Pass Valid From">
            <input type="date" value={form.passFrom} onChange={set('passFrom')} />
          </Field>
          <Field label="Pass Valid To">
            <input type="date" value={form.passTo} onChange={set('passTo')} />
          </Field>
          <Field label="Out Date Time">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8 }}>
              <input
                type="checkbox"
                id="markOut"
                checked={form.markOut}
                onChange={setCheck('markOut')}
                style={{ width: 'auto', margin: 0, cursor: 'pointer' }}
              />
              <label htmlFor="markOut" style={{ margin: 0, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
                Mark out time now
              </label>
            </div>
          </Field>
        </FieldRow>

        {/* Materials table */}
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 10 }}>
            Materials / Items Carried
          </div>

          <div style={{ overflowX: isMobile ? 'auto' : 'hidden' }}>
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', minWidth: isMobile ? 600 : 'auto' }}>

              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr 160px 60px 60px',
                background: 'var(--green)',
                padding: '10px 14px',
                gap: 12,
              }}>
                {['Sl.No', 'Material Description', 'Quantity', 'Add', 'Del'].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {materials.map((row, i) => (
                <div key={row.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 160px 60px 60px',
                  padding: '8px 14px',
                  gap: 12,
                  alignItems: 'center',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                }}>
                  <span>{i + 1}</span>

                  <input value={row.desc} onChange={e => updateRow(row.id, 'desc', e.target.value)} />

                  <input value={row.qty} onChange={e => updateRow(row.id, 'qty', e.target.value)} />

                  <button onClick={addRow}>+</button>

                  <button onClick={() => removeRow(row.id)}>−</button>
                </div>
              ))}

            </div>
          </div>
        </div>

      </Card>

      <SuccessBanner message={saved ? 'Visitor pass saved successfully!' : ''} onDismiss={() => setSaved(false)} />

      <ActionButtons onSave={handleSave} onCancel={handleCancel} showPrint />
    </PageWrapper>
  )
}