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
  user_id: string
  client_uuid: string
  google_auth_token: string
  use_cookie?: boolean
}

export interface LoginResponse {
  user_id: string
  email: string | null
  refresh_token: string
}

export interface RefreshRequest {
  user_id: string
  client_uuid: string
  refresh_token: string
  use_cookie?: boolean
}

export interface RefreshResponse {
  refresh_token: string
}

