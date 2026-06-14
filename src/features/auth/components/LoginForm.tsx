import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

interface GoogleIdCredentialResponse {
  credential?: string
  select_by?: string
}

interface GoogleIdConfiguration {
  client_id: string
  callback: (response: GoogleIdCredentialResponse) => void
  auto_select?: boolean
}

interface GoogleIdRenderButtonConfig {
  type?: string
  theme?: string
  size?: string
  text?: string
  shape?: string
  width?: number
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfiguration) => void
          renderButton: (element: HTMLElement, config: GoogleIdRenderButtonConfig) => void
          prompt: () => void
        }
      }
    }
  }
}

export function LoginForm() {
  const { loginWithGoogle, isLoading, error } = useLogin()
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [gsiError, setGsiError] = useState<string | null>(null)

  useEffect(() => {
    // Check if script is already present
    if (window.google?.accounts?.id) {
      setScriptLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      setScriptLoaded(true)
    }
    script.onerror = () => {
      setGsiError('Failed to load Google Identity Services SDK.')
    }
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !buttonRef.current || !window.google?.accounts?.id) {
      return
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: GoogleIdCredentialResponse) => {
          if (response.credential) {
            try {
              await loginWithGoogle(response.credential)
              navigate('/')
            } catch (err) {
              console.error('Google Sign-In exchange failed:', err)
            }
          }
        },
        auto_select: false,
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'filled_black',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 320,
      })
    } catch (err: unknown) {
      console.error('Failed to initialize Google Login button:', err)
      setGsiError('Failed to initialize Google Login button.')
    }
  }, [scriptLoaded, loginWithGoogle])

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {gsiError && (
        <div className="text-red-400 text-xs bg-red-950/20 border border-red-500/20 px-3 py-2.5 rounded-lg text-center max-w-xs">
          {gsiError}
        </div>
      )}

      {error && (
        <div className="text-red-400 text-xs bg-red-950/20 border border-red-500/20 px-3 py-2.5 rounded-lg text-center max-w-xs">
          {error.message}
        </div>
      )}

      {/* Google Login Button Target Mount Container */}
      <div
        ref={buttonRef}
        className="min-h-[48px] flex items-center justify-center transition-all duration-300"
        style={{ opacity: isLoading || !scriptLoaded ? 0.6 : 1 }}
      />

      {(isLoading || !scriptLoaded) && (
        <div className="text-xs text-text-muted animate-pulse">
          {isLoading ? 'Authenticating credentials...' : 'Bootstrapping Google Services...'}
        </div>
      )}
    </div>
  )
}
export default LoginForm
