import { useState } from 'react'
import api from '@/lib/axios'
import { useAuth } from './useAuth'
import type { LoginResponse, User } from '../types'
import { getUserIdFromToken, getClientUuid } from '../utils/authHelper'

export function useLogin() {
  const { setAuthState } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const userId = getUserIdFromToken(credential)
      const clientUuid = getClientUuid()

      const response = await api.post<LoginResponse>('/auth/login', {
        user_id: userId,
        client_uuid: clientUuid,
        google_auth_token: credential,
        use_cookie: true,
      })
      const { user_id, email, refresh_token } = response.data

      const user: User = {
        id: user_id,
        email: email || '',
      }

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
