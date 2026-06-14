import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Resolve the API base URL from Vite environment variables or default to '/api' in development
const baseURL = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL || 'https://api-rust.teddy.fyi/api')

export const api = axios.create({
  baseURL,
  withCredentials: true, // Native session cookies for cross-origin requests
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds default timeout
})

// Separate instance to perform refresh calls without interceptor loop recursion
const refreshApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

type UnauthorizedCallback = () => void
let unauthorizedListener: UnauthorizedCallback | null = null

export function registerUnauthorizedListener(callback: UnauthorizedCallback) {
  unauthorizedListener = callback
}

function triggerUnauthorized() {
  localStorage.removeItem('refresh_token')
  if (unauthorizedListener) {
    unauthorizedListener()
  } else {
    window.location.href = '/login'
  }
}

// Queue for handling parallel requests while token is refreshing
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason: unknown) => void
}> = []

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(null)
    }
  })
  failedQueue = []
}

// Request interceptor (can be used for additional headers if needed)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor with token refresh queueing
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const status = error.response?.status

    // Check if 401 and original request hasn't been retried yet
    if (status === 401 && originalRequest && !originalRequest._retry) {
      const currentPath = window.location.pathname
      const publicRoutes = ['/', '/login']

      // If we are on a public route, do not attempt to refresh or redirect
      if (publicRoutes.includes(currentPath)) {
        return Promise.reject(error)
      }

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        triggerUnauthorized()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await refreshApi.post<{ refresh_token: string }>('/auth/refresh', {
          refresh_token: refreshToken,
        })
        
        const newRefreshToken = response.data.refresh_token
        localStorage.setItem('refresh_token', newRefreshToken)

        processQueue(null)
        isRefreshing = false

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        isRefreshing = false
        triggerUnauthorized()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api

