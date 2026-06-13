import { useState } from 'react'
import api from '@/lib/axios'
import { useAuth } from './useAuth'
import type { LoginResponse } from '../types'

export function useLogin() {
  const { setAuthState } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post<LoginResponse>('/login', { credential })
      const { user, refresh_token } = response.data

      // Save credentials in local storage
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('user_info', JSON.stringify(user))

      // Update global context state
      setAuthState({
        isAuthenticated: true,
        user,
      })

      return user
    } catch (err: any) {
      const apiError =
        err instanceof Error
          ? err
          : new Error(err?.response?.data?.message || 'Authentication exchange failed.')
      setError(apiError)
      throw apiError
    } finally {
      setIsLoading(false)
    }
  }

  return {
    loginWithGoogle,
    isLoading,
    error,
  }
}
export default useLogin
