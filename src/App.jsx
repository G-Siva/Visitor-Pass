import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PreApprovalPass from './pages/PreApprovalPass'
import VisitorPass from './pages/VisitorPass'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [active, setActive] = useState('home')

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar active={active} setActive={setActive} onLogout={() => { setLoggedIn(false); setActive('home') }} />
      {active === 'home' && <HomePage setActive={setActive} />}
      {active === 'preapproval' && <PreApprovalPass />}
      {active === 'visitor' && <VisitorPass />}
    </div>
  )
}
