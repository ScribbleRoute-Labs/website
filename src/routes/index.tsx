import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { LoginPage } from './LoginPage'
import { ArticlesPage } from './ArticlesPage'
import { AuthenticatedRoute } from './AuthenticatedRoute'
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout'
import { NeedPhase } from '@/features/grocery/components/NeedPhase'
import { PlanningPhase } from '@/features/grocery/components/PlanningPhase'
import { ShoppingPhase } from '@/features/grocery/components/ShoppingPhase'
import { SettingsPhase } from '@/features/grocery/components/SettingsPhase'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Articles Page */}
      <Route path="/articles" element={<ArticlesPage />} />

      {/* Public Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated /Grocery System Shell */}
      <Route 
        path="/grocery" 
        element={
          <AuthenticatedRoute>
            <DashboardLayout />
          </AuthenticatedRoute>
        }
      >
        {/* Needle List (Default) */}
        <Route index element={<NeedPhase />} />
        
        {/* Planning Phase list */}
        <Route path="planning" element={<PlanningPhase />} />
        
        {/* Shopping Phase list */}
        <Route path="shopping" element={<ShoppingPhase />} />
        
        {/* Sync Settings */}
        <Route path="settings" element={<SettingsPhase />} />
      </Route>

      {/* Redirect wildcards back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
