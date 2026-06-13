import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import api, { registerUnauthorizedListener } from '@/lib/axios'
import type { User, AuthState } from '../types'

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  setAuthState: (state: { isAuthenticated: boolean; user: User | null }) => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthStateInternal] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  })

  const setAuthState = (state: { isAuthenticated: boolean; user: User | null }) => {
    setAuthStateInternal((prev) => ({
      ...prev,
      ...state,
    }))
  }

  // Session bootstrapping on app mount
  useEffect(() => {
    async function bootstrapSession() {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        setAuthStateInternal({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        })
        return
      }

      try {
        // Exchange refresh token for a fresh session cookie
        const response = await api.post<{ refresh_token: string }>('/refresh', {
          refresh_token: refreshToken,
        })

        // Store new refresh token
        localStorage.setItem('refresh_token', response.data.refresh_token)

        // Retrieve cached user profile
        const storedUser = localStorage.getItem('user_info')
        const user = storedUser ? JSON.parse(storedUser) : null

        setAuthStateInternal({
          isAuthenticated: true,
          user,
          isLoading: false,
        })
      } catch (error) {
        console.error('Session bootstrapping failed:', error)
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_info')
        setAuthStateInternal({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        })
      }
    }

    bootstrapSession()
  }, [])

  // Listen for global 401 unauthorized failures from the Axios interceptor
  useEffect(() => {
    registerUnauthorizedListener(() => {
      console.warn('Axios interceptor triggered 401 unauthorized - clearing local auth state.')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      setAuthStateInternal({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      })
    })
  }, [])

  const logout = async () => {
    setAuthStateInternal((prev) => ({ ...prev, isLoading: true }))
    try {
      // API call to clear HTTP-only cookies on backend
      await api.post('/logout')
    } catch (error) {
      console.error('Logout request failed on backend:', error)
    } finally {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      setAuthStateInternal({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        isLoading: authState.isLoading,
        setAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
