import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { getAllPasses, getPassByNumber, getAllVisitorPasses, saveVisitorPass } from '../utils/store'
import {
  PageWrapper, PageHeader, Card, Field,
  SearchBar, SearchField, SmallSelect, SearchButton,
  ActionButtons,
} from '../components/FormComponents'

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')
const todayISO = new Date().toISOString().split('T')[0]
const S = { padding: '7px 10px', fontSize: 13 }

const emptyForm = {
  visitorName: '', visitorType: '', visitorCompany: '',
  address: '', toMeet: '', pouchId: '', areaOfVisit: '',
  mobileModel: '', mobileNumber: '', vehicleNumber: '',
  safetySlogan: '', purpose: '', remarks: '',
  passFrom: todayISO, passTo: todayISO, markOut: false,
}

export default function VisitorPass() {
  const [saved, setSaved] = useState(false)
  const [autoFilled, setAutoFilled] = useState(false)
  const [selectedPA, setSelectedPA] = useState('')
  const [passes, setPasses] = useState([])
  const [materials, setMaterials] = useState([{ id: 1, desc: '', qty: '' }])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [totalSaved, setTotalSaved] = useState(0)

  useEffect(() => {
    setPasses(getAllPasses())
    setTotalSaved(getAllVisitorPasses().length)
  }, [])

  const addRow = () => setMaterials(m => [...m, { id: Date.now(), desc: '', qty: '' }])
  const removeRow = id => { if (materials.length > 1) setMaterials(m => m.filter(r => r.id !== id)) }
  const updateRow = (id, field, val) => setMaterials(m => m.map(r => r.id === id ? { ...r, [field]: val } : r))
  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const setCheck = field => e => setForm(f => ({ ...f, [field]: e.target.checked }))

  const handlePASelect = (e) => {
    const number = e.target.value
    setSelectedPA(number)
    setSaved(false)
    setAutoFilled(false)
    setError('')
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

  const handleSave = () => {
    setError('')
    if (!form.visitorName.trim()) { setError('Visitor Name is required.'); return }
    saveVisitorPass({ ...form, preApprovalPass: selectedPA }, materials)
    setTotalSaved(getAllVisitorPasses().length)
    setSaved(true)
  }

  const handleExport = () => {
    const allPasses = getAllVisitorPasses()
    if (allPasses.length === 0) { alert('No visitor passes saved yet.'); return }

    const mainData = allPasses.map((p, i) => ({
      'Sl.No': i + 1,
      'Pre-Approval Pass No': p.preApprovalPass || '—',
      'Visitor Name': p.visitorName,
      'Visitor Type': p.visitorType,
      'Visitor Company': p.visitorCompany,
      'Address': p.address,
      'To Meet': p.toMeet,
      'Pouch ID': p.pouchId,
      'Area of Visit': p.areaOfVisit,
      'Mobile Model': p.mobileModel,
      'Mobile Number': p.mobileNumber,
      'Vehicle Number': p.vehicleNumber,
      'Safety Slogan': p.safetySlogan,
      'Purpose': p.purpose,
      'Remarks': p.remarks,
      'Pass From': p.passFrom,
      'Pass To': p.passTo,
      'Marked Out': p.markOut ? 'Yes' : 'No',
      'Saved At': p.savedAt,
    }))

    const materialsData = []
    allPasses.forEach((p) => {
      (p.materials || []).filter(m => m.desc.trim()).forEach((m, i) => {
        materialsData.push({
          'Visitor Name': p.visitorName,
          'Pre-Approval Pass No': p.preApprovalPass || '—',
          'Sl.No': i + 1,
          'Material Description': m.desc,
          'Quantity': m.qty,
        })
      })
    })

    const wb = XLSX.utils.book_new()
    const ws1 = XLSX.utils.json_to_sheet(mainData)
    ws1['!cols'] = Object.keys(mainData[0]).map(() => ({ wch: 22 }))
    XLSX.utils.book_append_sheet(wb, ws1, 'Visitor Passes')

    if (materialsData.length > 0) {
      const ws2 = XLSX.utils.json_to_sheet(materialsData)
      ws2['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 8 }, { wch: 35 }, { wch: 12 }]
      XLSX.utils.book_append_sheet(wb, ws2, 'Materials')
    }

    const dateStr = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(wb, `VisitorPasses_Export_${dateStr}.xlsx`)
  }

  const handleCancel = () => {
    setSaved(false)
    setAutoFilled(false)
    setSelectedPA('')
    setError('')
    setForm(emptyForm)
    setMaterials([{ id: 1, desc: '', qty: '' }])
  }

  return (
    <>
      <style>{`
        .vp-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .vp-export-btn {
          padding: 8px 16px;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        @media (max-width: 768px) {
          .vp-header-right {
            justify-content: flex-start;
            gap: 10px;
          }
          .vp-export-btn {
            width: 100%;
            justify-content: center;
            padding: 10px;
          }
        }
      `}</style>

      <PageWrapper>
        <PageHeader
          title="Visitor Pass"
          subtitle="Issue and track visitor gate passes in real time"
          rightContent={
            <div className="vp-header-right">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Total Entries</div>
                <div className="playfair" style={{ fontSize: 20, color: 'var(--green)', fontWeight: 700, lineHeight: 1 }}>{totalSaved}</div>
              </div>
              <button className="vp-export-btn" onClick={handleExport}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export Excel
              </button>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>In Date Time</div>
                <div className="playfair" style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>{today}</div>
              </div>
            </div>
          }
        />

        <Card style={{ marginBottom: 16 }}>
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

          {autoFilled && (
            <div style={{
              background: '#eff6ff', border: '1px solid #bfdbfe',
              borderRadius: 7, padding: '10px 14px', marginBottom: 14,
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: 13, color: '#1d4ed8',
            }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Details auto-filled from <strong style={{ marginLeft: 3 }}>{selectedPA}</strong>. You can edit before saving.
            </div>
          )}

          {/* Responsive form grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <input type="checkbox" id="markOut" checked={form.markOut} onChange={setCheck('markOut')} style={{ width: 'auto', margin: 0, cursor: 'pointer' }} />
            <label htmlFor="markOut" style={{ margin: 0, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>Mark out time now</label>
          </div>

          {/* Materials table — scrollable on mobile */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Materials / Items Carried
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ minWidth: 480, display: 'grid', gridTemplateColumns: '44px 1fr 110px 52px 52px', background: 'var(--green)', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {['No', 'Material Description', 'Quantity', 'Add', 'Del'].map(h => (
                  <div key={h} style={{ padding: '10px 8px' }}>{h}</div>
                ))}
              </div>
              {materials.map((row, i) => (
                <div key={row.id} style={{ minWidth: 480, display: 'grid', gridTemplateColumns: '44px 1fr 110px 52px 52px', borderTop: i > 0 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? '#fafaf8' : '#fff', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, padding: '8px' }}>{i + 1}</span>
                  <input value={row.desc} onChange={e => updateRow(row.id, 'desc', e.target.value)} placeholder="Item description" style={{ padding: '8px', fontSize: 13, border: 'none', width: '100%', background: 'transparent' }} />
                  <input value={row.qty} onChange={e => updateRow(row.id, 'qty', e.target.value)} placeholder="Qty" style={{ padding: '8px', fontSize: 13, border: 'none', width: '100%', background: 'transparent' }} />
                  <div style={{ padding: '6px', display: 'flex', justifyContent: 'center' }}>
                    <button onClick={addRow} style={{ width: 32, height: 32, background: 'var(--green-light)', border: '1px solid #c8e6c9', borderRadius: 6, color: 'var(--green)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <div style={{ padding: '6px', display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => removeRow(row.id)} style={{ width: 32, height: 32, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: 'var(--danger)', fontSize: 20, cursor: materials.length === 1 ? 'not-allowed' : 'pointer', opacity: materials.length === 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>← Scroll horizontally if needed on small screens</p>
          </div>
        </Card>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#b91c1c', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg style={{ flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {saved && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 14 }}>
              <svg style={{ flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Entry saved! {totalSaved} total {totalSaved === 1 ? 'entry' : 'entries'} stored. Click <strong style={{ marginLeft: 3 }}>Export Excel</strong> to download all.
            </div>
          </div>
        )}

        <ActionButtons onSave={handleSave} onCancel={handleCancel} showPrint />
      </PageWrapper>
    </>
  )
}