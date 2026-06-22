import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { CanvasPage } from './CanvasPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Interactive Canvas Demo */}
      <Route path="/canvas" element={<CanvasPage />} />

      {/* Redirect wildcards back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
