/**
 * Decodes a Google ID token (JWT) to extract the sub (user ID) claim.
 */
export function getUserIdFromToken(token: string): string {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const decoded = JSON.parse(jsonPayload)
    return decoded.sub || ''
  } catch (error) {
    console.error('Failed to parse Google ID token:', error)
    return ''
  }
}

/**
 * Gets or generates a stable client UUID for synchronization and authentication.
 */
export function getClientUuid(): string {
  let id = localStorage.getItem('grocery_client_id')
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('grocery_client_id', id)
  }
  return id
}
