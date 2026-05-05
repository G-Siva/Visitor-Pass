import { useState, useEffect } from 'react'
import { getAllPasses, getPassByNumber } from '../utils/store'
import {
  PageWrapper, PageHeader, Card, Field,
  SearchBar, SearchField, SmallSelect, SearchButton,
  ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')
const todayISO = new Date().toISOString().split('T')[0]

const S = { padding: '7px 10px', fontSize: 13 }

const emptyForm = {
  visitorsNumber: '', visitorName: '', visitorType: '',
  visitorCompany: '', address: '', toMeet: '', pouchId: '',
  areaOfVisit: '', mobileModel: '', mobileNumber: '',
  vehicleNumber: '', safetySlogan: '', purpose: '', remarks: '',
  passFrom: todayISO, passTo: todayISO, markOut: false,
}

export default function VisitorPass() {
  const [saved, setSaved] = useState(false)
  const [autoFilled, setAutoFilled] = useState(false)
  const [selectedPA, setSelectedPA] = useState('')
  const [passes, setPasses] = useState([])
  const [materials, setMaterials] = useState([{ id: 1, desc: '', qty: '' }])
  const [form, setForm] = useState(emptyForm)

  // Load pre-approval passes every time this page is visited
  useEffect(() => {
    setPasses(getAllPasses())
  }, [])

  const addRow = () => setMaterials(m => [...m, { id: Date.now(), desc: '', qty: '' }])
  const removeRow = id => { if (materials.length > 1) setMaterials(m => m.filter(r => r.id !== id)) }
  const updateRow = (id, field, val) => setMaterials(m => m.map(r => r.id === id ? { ...r, [field]: val } : r))

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const setCheck = field => e => setForm(f => ({ ...f, [field]: e.target.checked }))

  // When a PA number is selected, auto-fill from pre-approval data
  const handlePASelect = (e) => {
    const number = e.target.value
    setSelectedPA(number)
    setSaved(false)
    setAutoFilled(false)
    if (!number) { setForm(emptyForm); return }

    const pass = getPassByNumber(number)
    if (pass) {
      setForm(f => ({
        ...f,
        visitorName: pass.visitorsName || '',
        visitorType: pass.visitorsType || '',
        visitorCompany: pass.visitorCompany || '',
        areaOfVisit: pass.areaOfVisit || '',
        purpose: pass.purpose || '',
        passFrom: pass.visitFrom || todayISO,
        passTo: pass.visitTo || todayISO,
      }))
      setAutoFilled(true)
    }
  }

  const handleSave = () => setSaved(true)

  const handleCancel = () => {
    setSaved(false)
    setAutoFilled(false)
    setSelectedPA('')
    setForm(emptyForm)
    setMaterials([{ id: 1, desc: '', qty: '' }])
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Visitor Pass"
        subtitle="Issue and track visitor gate passes in real time"
        rightContent={
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>In Date Time</div>
            <div className="playfair" style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>{today}</div>
          </div>
        }
      />

      <Card style={{ marginBottom: 16 }}>

        {/* Search bar — PA number dropdown */}
        <SearchBar>
          <SearchField label="Pre-Approval Pass No">
            <SmallSelect value={selectedPA} onChange={handlePASelect}>
              <option value="">— Select PA Pass —</option>
              {passes.length === 0 && <option disabled>No pre-approval passes saved yet</option>}
              {passes.map(p => (
                <option key={p.passNumber} value={p.passNumber}>
                  {p.passNumber} — {p.visitorsName}
                </option>
              ))}
            </SmallSelect>
          </SearchField>
          <SearchField label="Department">
            <SmallSelect>
              <option value="">— Select —</option>
              <option>IT Department</option>
              <option>HR Department</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Security</option>
            </SmallSelect>
          </SearchField>
          <SearchField label="Visitor's No">
            <SmallSelect>
              <option value="">— Select —</option>
              <option>2025-2026</option>
              <option>2026-2027</option>
            </SmallSelect>
          </SearchField>
          <SearchButton />
        </SearchBar>

        {/* Auto-fill notice */}
        {autoFilled && (
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: 7, padding: '10px 14px', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, color: '#1d4ed8',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Details auto-filled from Pre-Approval Pass <strong>{selectedPA}</strong>. You can edit before saving.
          </div>
        )}

        {/* Main fields */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '10px 14px',
          marginBottom: 16,
        }}>
          <Field label="Visitor Name" required>
            <input value={form.visitorName} onChange={set('visitorName')} placeholder="Full name" style={S} />
          </Field>
          <Field label="Visitor Type" required>
            <select value={form.visitorType} onChange={set('visitorType')} style={S}>
              <option value="">— Select Type —</option>
              <option>Auditor</option>
              <option>Vendor</option>
              <option>Guest</option>
              <option>Contractor</option>
              <option>Government Official</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Visitor Company">
            <input value={form.visitorCompany} onChange={set('visitorCompany')} placeholder="Company" style={S} />
          </Field>
          <Field label="To Meet">
            <input value={form.toMeet} onChange={set('toMeet')} placeholder="Person to meet" style={S} />
          </Field>

          <Field label="Area of Visit">
            <input value={form.areaOfVisit} onChange={set('areaOfVisit')} placeholder="Area / Block" style={S} />
          </Field>
          <Field label="Mobile Model">
            <input value={form.mobileModel} onChange={set('mobileModel')} placeholder="Device model" style={S} />
          </Field>
          <Field label="Mobile Number">
            <input value={form.mobileNumber} onChange={set('mobileNumber')} placeholder="+91 XXXXX XXXXX" style={S} />
          </Field>
          <Field label="Vehicle Number">
            <input value={form.vehicleNumber} onChange={set('vehicleNumber')} placeholder="Reg. number" style={S} />
          </Field>

          <Field label="Pouch ID / Number">
            <input value={form.pouchId} onChange={set('pouchId')} placeholder="Pouch / ID no." style={S} />
          </Field>
          <Field label="Pass Valid From">
            <input type="date" value={form.passFrom} onChange={set('passFrom')} style={S} />
          </Field>
          <Field label="Pass Valid To">
            <input type="date" value={form.passTo} onChange={set('passTo')} style={S} />
          </Field>
          <Field label="Safety Slogan">
            <select value={form.safetySlogan} onChange={set('safetySlogan')} style={S}>
              <option value="">— Select —</option>
              <option>Safety First, Always</option>
              <option>Think Safe, Work Safe</option>
              <option>Zero Accidents, Zero Harm</option>
              <option>Protect Yourself, Protect Others</option>
              <option>Safety is Everyone's Responsibility</option>
            </select>
          </Field>

          <Field label="Address">
            <input value={form.address} onChange={set('address')} placeholder="Visitor address" style={S} />
          </Field>
          <Field label="Purpose">
            <input value={form.purpose} onChange={set('purpose')} placeholder="Purpose of visit" style={S} />
          </Field>
          <Field label="Remarks">
            <input value={form.remarks} onChange={set('remarks')} placeholder="Additional remarks" style={S} />
          </Field>
        </div>

        {/* Out time checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <input
            type="checkbox" id="markOut" checked={form.markOut}
            onChange={setCheck('markOut')}
            style={{ width: 'auto', margin: 0, cursor: 'pointer' }}
          />
          <label htmlFor="markOut" style={{ margin: 0, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
            Mark out time now
          </label>
        </div>

        {/* Materials Table */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Materials / Items Carried
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflowX: 'auto' }}>
            <div style={{
              minWidth: 520, display: 'grid',
              gridTemplateColumns: '50px 1fr 130px 70px 70px',
              background: 'var(--green)', color: '#fff',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {['Sl.No', 'Material Description', 'Quantity', 'Add', 'Del'].map(h => (
                <div key={h} style={{ padding: '10px 8px' }}>{h}</div>
              ))}
            </div>
            {materials.map((row, i) => (
              <div key={row.id} style={{
                minWidth: 520, display: 'grid',
                gridTemplateColumns: '50px 1fr 130px 70px 70px',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? '#fafaf8' : '#fff', alignItems: 'center',
              }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, padding: '10px 8px' }}>{i + 1}</span>
                <input value={row.desc} onChange={e => updateRow(row.id, 'desc', e.target.value)} placeholder="Item description" style={{ padding: '8px', fontSize: 13, border: 'none', width: '100%' }} />
                <input value={row.qty} onChange={e => updateRow(row.id, 'qty', e.target.value)} placeholder="Qty" style={{ padding: '8px', fontSize: 13, border: 'none', width: '100%' }} />
                <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                  <button onClick={addRow} style={{ padding: '6px 10px', background: 'var(--green-light)', border: '1px solid #c8e6c9', borderRadius: 5, color: 'var(--green)', fontSize: 18, cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => removeRow(row.id)} style={{ padding: '6px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 5, color: 'var(--danger)', fontSize: 18, cursor: materials.length === 1 ? 'not-allowed' : 'pointer', opacity: materials.length === 1 ? 0.5 : 1 }}>−</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Card>

      {/* Success banner */}
      {saved && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8,
          padding: '14px 18px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 14,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Visitor pass saved successfully!
        </div>
      )}

      <ActionButtons onSave={handleSave} onCancel={handleCancel} showPrint />
    </PageWrapper>
  )
}