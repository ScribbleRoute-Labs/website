import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Resolve the API base URL from Vite environment variables or default to '/api'
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds default timeout
})

// Request interceptor to inject auth tokens or other global headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      console.warn('Unauthorized access - removing local session tokens...')
      localStorage.removeItem('auth_token')
    } else if (status === 403) {
      console.error('Access forbidden: Insufficient permissions.')
    } else if (status === 500) {
      console.error('Internal Server Error: Something went wrong on the server.')
    }

    return Promise.reject(error)
  }
)

export default api
