import { Routes, Route, Link } from 'react-router-dom'
import { AppProvider } from '@/providers/AppProvider'

export function App() {
  return (
    <AppProvider>
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ padding: '16px 24px', borderBottom: '1px solid #262626', display: 'flex', gap: '24px', backgroundColor: '#0a0a0a' }}>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
          <Link to="/sync" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Sync</Link>
        </nav>
        
        <main style={{ flex: 1, backgroundColor: '#0a0a0a', color: '#ffffff', padding: '24px' }}>
          <Routes>
            <Route path="/" element={<div><h1>Dashboard</h1><p>Sync control panel placeholder.</p></div>} />
            <Route path="/sync" element={<div><h1>Sync Settings</h1><p>Upstash/KV sync configuration placeholder.</p></div>} />
            <Route path="*" element={<div><h1>404</h1><p>Not Found</p><Link to="/" style={{ color: '#2563eb' }}>Go to Dashboard</Link></div>} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}

export default App
