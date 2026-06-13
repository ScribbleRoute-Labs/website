export interface User {
  id: string
  email: string
  name?: string
  picture?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
}

export interface LoginRequest {
  credential: string
}

export interface LoginResponse {
  user: User
  refresh_token: string
}

export interface RefreshRequest {
  refresh_token: string
}

export interface RefreshResponse {
  refresh_token: string
}
