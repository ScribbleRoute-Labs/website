import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Redirect wildcards back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
