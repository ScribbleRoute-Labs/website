import { useState, useCallback, useRef } from 'react'
import api from '@/lib/axios'
import type { 
  GroceryItem, 
  GroceryList,
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
    localLists: GroceryList[] = [],
    localStores: Store[] = [],
    localCategories: Category[] = []
  ): Promise<SyncResponse | null> => {
    setIsSyncing(true)
    setError(null)

    try {
      const lastSyncedAt = localStorage.getItem('grocery_last_synced') || new Date(0).toISOString()
      
      // 1. Check KV status change flag to minimize payload size and query costs.
      // Default to true (pull data) if the endpoint returns 404 or fails.
      let hasRemoteChanges = true
      try {
        const checkRes = await api.get<{ hasChanges: boolean }>('/api/sync/check-status', {
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

      const listChanges: ChangeDelta<GroceryList>[] = localLists
        .filter(list => list.sync_state !== 'SYNCED')
        .map(list => {
          let deltaType: 'INSERT' | 'UPDATE' | 'DELETE' = 'UPDATE'
          if (list.sync_state === 'PENDING_INSERT') deltaType = 'INSERT'
          if (list.sync_state === 'PENDING_DELETE' || list.is_deleted) deltaType = 'DELETE'

          return {
            id: list.id,
            type: deltaType,
            version: list.version,
            data: deltaType === 'DELETE' ? null : list
          }
        })

      const storeChanges: ChangeDelta<Store>[] = localStores
        .filter(store => store.sync_state !== 'SYNCED')
        .map(store => {
          let deltaType: 'INSERT' | 'UPDATE' | 'DELETE' = 'UPDATE'
          if (store.sync_state === 'PENDING_INSERT') deltaType = 'INSERT'
          if (store.sync_state === 'PENDING_DELETE' || store.is_deleted) deltaType = 'DELETE'

          return {
            id: store.id,
            type: deltaType,
            version: store.version,
            data: deltaType === 'DELETE' ? null : store
          }
        })

      const categoryChanges: ChangeDelta<Category>[] = localCategories
        .filter(category => category.sync_state !== 'SYNCED')
        .map(category => {
          let deltaType: 'INSERT' | 'UPDATE' | 'DELETE' = 'UPDATE'
          if (category.sync_state === 'PENDING_INSERT') deltaType = 'INSERT'
          if (category.sync_state === 'PENDING_DELETE' || category.is_deleted) deltaType = 'DELETE'

          return {
            id: category.id,
            type: deltaType,
            version: category.version,
            data: deltaType === 'DELETE' ? null : category
          }
        })

      // Skip heavy network request if neither the remote server nor local client has changes
      const hasLocalChanges = 
        groceryChanges.length > 0 || 
        listChanges.length > 0 || 
        storeChanges.length > 0 || 
        categoryChanges.length > 0

      if (!hasRemoteChanges && !hasLocalChanges) {
        console.log('[Sync] Caching optimization hit. Client and remote match. Skipping sync payload.')
        setIsSyncing(false)
        return null
      }

      // 3. Construct synchronization protocol payload
      const syncRequest: SyncRequest = {
        last_synced_at: lastSyncedAt,
        client_id: clientId.current,
        scope: 'GROCERY',
        grocery_changes: groceryChanges,
        grocery_list_changes: listChanges,
        store_changes: storeChanges,
        category_changes: categoryChanges,
      }

      // 4. Transport payload to atomic sync endpoint
      const response = await api.post<SyncResponse>('/api/sync', syncRequest)
      const syncResponse = response.data

      // 5. Update local tracking states
      localStorage.setItem('grocery_last_synced', syncResponse.server_timestamp)
      
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
    let merged = [...localItems]

    remoteChanges.forEach(change => {
      const localIndex = merged.findIndex(item => item.id === change.id)

      if (change.type === 'DELETE') {
        if (localIndex !== -1) {
          merged.splice(localIndex, 1)
        }
        return
      }

      const remoteItem = change.data as GroceryItem
      if (!remoteItem) return

      if (localIndex === -1) {
        merged.push({
          ...remoteItem,
          sync_state: 'SYNCED'
        })
      } else {
        const localItem = merged[localIndex]
        
        if (change.version >= localItem.version) {
          merged[localIndex] = {
            ...remoteItem,
            sync_state: 'SYNCED'
          }
        } else {
          console.warn(`[Sync] Conflict detected for item ${localItem.name}. Client version (${localItem.version}) exceeds server (${change.version}). Keeping local changes.`)
        }
      }
    })

    merged = merged.filter(item => !(item.sync_state === 'PENDING_DELETE' && item.is_deleted))

    return merged.map(item => {
      if (item.sync_state === 'PENDING_INSERT' || item.sync_state === 'PENDING_UPDATE') {
        return {
          ...item,
          sync_state: 'SYNCED'
        }
      }
      return item
    })
  }, [])

  // Conflict Resolution helper for Lists
  const resolveListConflicts = useCallback((
    localLists: GroceryList[],
    remoteChanges: ChangeDelta<GroceryList>[] = []
  ): GroceryList[] => {
    let merged = [...localLists]

    remoteChanges.forEach(change => {
      const localIndex = merged.findIndex(list => list.id === change.id)

      if (change.type === 'DELETE') {
        if (localIndex !== -1) {
          merged.splice(localIndex, 1)
        }
        return
      }

      const remoteList = change.data as GroceryList
      if (!remoteList) return

      if (localIndex === -1) {
        merged.push({
          ...remoteList,
          sync_state: 'SYNCED'
        })
      } else {
        const localList = merged[localIndex]
        if (change.version >= localList.version) {
          merged[localIndex] = {
            ...remoteList,
            sync_state: 'SYNCED'
          }
        }
      }
    })

    merged = merged.filter(list => !(list.sync_state === 'PENDING_DELETE' && list.is_deleted))

    return merged.map(list => {
      if (list.sync_state === 'PENDING_INSERT' || list.sync_state === 'PENDING_UPDATE') {
        return {
          ...list,
          sync_state: 'SYNCED'
        }
      }
      return list
    })
  }, [])

  // Conflict Resolution helper for Stores
  const resolveStoreConflicts = useCallback((
    localStores: Store[],
    remoteChanges: ChangeDelta<Store>[] = []
  ): Store[] => {
    let merged = [...localStores]

    remoteChanges.forEach(change => {
      const localIndex = merged.findIndex(store => store.id === change.id)

      if (change.type === 'DELETE') {
        if (localIndex !== -1) {
          merged.splice(localIndex, 1)
        }
        return
      }

      const remoteStore = change.data as Store
      if (!remoteStore) return

      if (localIndex === -1) {
        merged.push({
          ...remoteStore,
          sync_state: 'SYNCED'
        })
      } else {
        const localStore = merged[localIndex]
        if (change.version >= localStore.version) {
          merged[localIndex] = {
            ...remoteStore,
            sync_state: 'SYNCED'
          }
        }
      }
    })

    merged = merged.filter(store => !(store.sync_state === 'PENDING_DELETE' && store.is_deleted))

    return merged.map(store => {
      if (store.sync_state === 'PENDING_INSERT' || store.sync_state === 'PENDING_UPDATE') {
        return {
          ...store,
          sync_state: 'SYNCED'
        }
      }
      return store
    })
  }, [])

  // Conflict Resolution helper for Categories
  const resolveCategoryConflicts = useCallback((
    localCategories: Category[],
    remoteChanges: ChangeDelta<Category>[] = []
  ): Category[] => {
    let merged = [...localCategories]

    remoteChanges.forEach(change => {
      const localIndex = merged.findIndex(category => category.id === change.id)

      if (change.type === 'DELETE') {
        if (localIndex !== -1) {
          merged.splice(localIndex, 1)
        }
        return
      }

      const remoteCategory = change.data as Category
      if (!remoteCategory) return

      if (localIndex === -1) {
        merged.push({
          ...remoteCategory,
          sync_state: 'SYNCED'
        })
      } else {
        const localCategory = merged[localIndex]
        if (change.version >= localCategory.version) {
          merged[localIndex] = {
            ...remoteCategory,
            sync_state: 'SYNCED'
          }
        }
      }
    })

    merged = merged.filter(category => !(category.sync_state === 'PENDING_DELETE' && category.is_deleted))

    return merged.map(category => {
      if (category.sync_state === 'PENDING_INSERT' || category.sync_state === 'PENDING_UPDATE') {
        return {
          ...category,
          sync_state: 'SYNCED'
        }
      }
      return category
    })
  }, [])

  return {
    syncNow,
    resolveConflicts,
    resolveListConflicts,
    resolveStoreConflicts,
    resolveCategoryConflicts,
    isSyncing,
    error
  }
}

export default useGrocerySync
