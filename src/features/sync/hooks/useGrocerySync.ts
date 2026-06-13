import { useState, useCallback, useRef } from 'react'
import api from '@/lib/axios'
import type { 
  GroceryItem, 
  Store, 
  Category, 
  ChangeDelta, 
  SyncRequest, 
  SyncResponse
} from '@/types/grocery'

interface UseGrocerySyncOptions {
  clientId?: string
  onSyncSuccess?: (response: SyncResponse) => void
  onSyncError?: (error: any) => void
}

export function useGrocerySync(options: UseGrocerySyncOptions = {}) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  // Client Identifier (saved or generated)
  const clientId = useRef<string>('')
  if (!clientId.current) {
    let id = localStorage.getItem('grocery_client_id')
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Math.random().toString(36).substring(2) + Date.now().toString(36)
      localStorage.setItem('grocery_client_id', id)
    }
    clientId.current = id
  }

  // Core Sync Trigger
  const syncNow = useCallback(async (
    localItems: GroceryItem[],
    _localStores: Store[] = [],
    _localCategories: Category[] = []
  ): Promise<SyncResponse | null> => {
    setIsSyncing(true)
    setError(null)

    try {
      const lastSyncedAt = localStorage.getItem('grocery_last_synced') || new Date(0).toISOString()
      
      // 1. Check KV status change flag to minimize payload size and query costs.
      // Default to true (pull data) if the endpoint returns 404 or fails.
      let hasRemoteChanges = true
      try {
        const checkRes = await api.get<{ hasChanges: boolean }>('/sync/check-status', {
          params: {
            client_id: clientId.current,
            last_synced_at: lastSyncedAt
          }
        })
        hasRemoteChanges = checkRes.data.hasChanges
      } catch (err: any) {
        // Fallback: If 404 (or other status) is returned, assume remote has changes to fetch silently
        if (err.response?.status === 404) {
          console.warn('[Sync] Status endpoint returned 404. Proceeding with full payload sync fallback.')
        } else {
          console.error('[Sync] Status check failed. Falling back to full sync.', err)
        }
        hasRemoteChanges = true
      }

      // 2. Identify and bundle local dirty mutations
      const groceryChanges: ChangeDelta<GroceryItem>[] = localItems
        .filter(item => item.sync_state !== 'SYNCED')
        .map(item => {
          let deltaType: 'INSERT' | 'UPDATE' | 'DELETE' = 'UPDATE'
          if (item.sync_state === 'PENDING_INSERT') deltaType = 'INSERT'
          if (item.sync_state === 'PENDING_DELETE' || item.is_deleted) deltaType = 'DELETE'

          return {
            id: item.id,
            type: deltaType,
            version: item.version,
            // Don't send data details on deletes
            data: deltaType === 'DELETE' ? null : item
          }
        })

      // Skip heavy network request if neither the remote server nor local client has changes
      const hasLocalChanges = groceryChanges.length > 0
      if (!hasRemoteChanges && !hasLocalChanges) {
        console.log('[Sync] Caching optimization hit. Client and remote match. Skipping sync payload.')
        setIsSyncing(false)
        return null
      }

      // 3. Construct synchronization protocol payload
      const syncRequest: SyncRequest = {
        last_synced_at: lastSyncedAt,
        client_id: clientId.current,
        grocery_changes: groceryChanges,
        // (Add store_changes, category_changes etc. here as schemas expand)
      }

      // 4. Transport payload to atomic sync endpoint
      const response = await api.post<SyncResponse>('/sync', syncRequest)
      const syncResponse = response.data

      // 5. Update local tracking states
      localStorage.setItem('grocery_last_synced', syncResponse.last_synced_at)
      
      if (options.onSyncSuccess) {
        options.onSyncSuccess(syncResponse)
      }

      setIsSyncing(false)
      return syncResponse

    } catch (err: any) {
      console.error('[Sync] Fatal sync execution error:', err)
      const errorObj = err instanceof Error ? err : new Error(err.message || 'Sync failed')
      setError(errorObj)
      setIsSyncing(false)
      
      if (options.onSyncError) {
        options.onSyncError(errorObj)
      }
      throw errorObj
    }
  }, [clientId, options])

  // Conflict Resolution helper to merge server changes into local state
  const resolveConflicts = useCallback((
    localItems: GroceryItem[],
    remoteChanges: ChangeDelta<GroceryItem>[] = []
  ): GroceryItem[] => {
    // Clone local list
    let merged = [...localItems]

    remoteChanges.forEach(change => {
      const localIndex = merged.findIndex(item => item.id === change.id)

      if (change.type === 'DELETE') {
        if (localIndex !== -1) {
          // Hard delete on local db if synced delete
          merged.splice(localIndex, 1)
        }
        return
      }

      const remoteItem = change.data as GroceryItem
      if (!remoteItem) return

      if (localIndex === -1) {
        // New item from server
        merged.push({
          ...remoteItem,
          sync_state: 'SYNCED'
        })
      } else {
        const localItem = merged[localIndex]
        
        // Conflict check: compare versions
        if (change.version >= localItem.version) {
          // Server wins
          merged[localIndex] = {
            ...remoteItem,
            sync_state: 'SYNCED'
          }
        } else {
          // Client has higher version, client changes win (will upload on next sync loop)
          // We keep local state dirty PENDING_UPDATE
          console.warn(`[Sync] Conflict detected for item ${localItem.name}. Client version (${localItem.version}) exceeds server (${change.version}). Keeping local changes.`)
        }
      }
    })

    // Clean up successfully synced local deletes (permanently purge)
    merged = merged.filter(item => !(item.sync_state === 'PENDING_DELETE' && item.is_deleted))

    // Set any pending items that were successfully synced to SYNCED
    return merged.map(item => {
      if (item.sync_state === 'PENDING_INSERT' || item.sync_state === 'PENDING_UPDATE') {
        // If it wasn't overwritten by server, it has been successfully received by server
        return {
          ...item,
          sync_state: 'SYNCED'
        }
      }
      return item
    })
  }, [])

  return {
    syncNow,
    resolveConflicts,
    isSyncing,
    error
  }
}

export default useGrocerySync
