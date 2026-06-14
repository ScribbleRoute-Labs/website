import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  ShoppingBag, 
  Calendar, 
  CheckSquare, 
  Settings as SettingsIcon, 
  RefreshCw, 
  ChevronDown, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useGrocerySync } from '@/features/sync/hooks/useGrocerySync'
import type { GroceryItem, GroceryList, Store, Category } from '@/types/grocery'

export function DashboardLayout() {
  const location = useLocation()
  const currentPath = location.pathname

  // Unified items state loaded from localStorage (defaults to empty)
  const [items, setItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('grocery_items')
    return saved ? JSON.parse(saved) : []
  })

  // Unified lists state loaded from localStorage (defaults to empty)
  const [lists, setLists] = useState<GroceryList[]>(() => {
    const saved = localStorage.getItem('grocery_lists')
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Main Grocery List', sync_state: 'SYNCED', version: 1, is_deleted: false, createdAt: Date.now() }
    ]
  })

  // Unified stores state loaded from localStorage (defaults to empty)
  const [stores, setStores] = useState<Store[]>(() => {
    const saved = localStorage.getItem('grocery_stores')
    return saved ? JSON.parse(saved) : []
  })

  // Unified categories state loaded from localStorage (defaults to empty)
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('grocery_categories')
    return saved ? JSON.parse(saved) : []
  })

  // Persist items locally
  useEffect(() => {
    localStorage.setItem('grocery_items', JSON.stringify(items))
  }, [items])

  // Persist lists locally
  useEffect(() => {
    localStorage.setItem('grocery_lists', JSON.stringify(lists))
  }, [lists])

  // Persist stores locally
  useEffect(() => {
    localStorage.setItem('grocery_stores', JSON.stringify(stores))
  }, [stores])

  // Persist categories locally
  useEffect(() => {
    localStorage.setItem('grocery_categories', JSON.stringify(categories))
  }, [categories])

  const { 
    syncNow, 
    resolveConflicts, 
    resolveListConflicts, 
    resolveStoreConflicts, 
    resolveCategoryConflicts, 
    isSyncing 
  } = useGrocerySync()

  const [activeListId, setActiveListId] = useState('1')
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false)
  
  // Sync state tracking (stored as ISO 8601 string)
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(() => {
    const saved = localStorage.getItem('grocery_last_synced')
    return saved || new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // default to 25h ago (stale)
  })
  const [syncStatus, setSyncStatus] = useState<'synced' | 'stale' | 'syncing'>('stale')
  const [showSyncTooltip, setShowSyncTooltip] = useState(false)

  const activeList = lists.find(l => l.id === activeListId) || lists[0] || { id: '1', name: 'Main Grocery List' }

  // Update status when syncing triggers in background
  useEffect(() => {
    if (isSyncing) {
      setSyncStatus('syncing')
    }
  }, [isSyncing])

  useEffect(() => {
    // Check if stale (> 24 hours)
    const checkStale = () => {
      const now = Date.now()
      const lastSyncedMs = Date.parse(lastSyncedAt)
      const diffMs = now - lastSyncedMs
      const diffHours = diffMs / (1000 * 60 * 60)
      if (diffHours > 24) {
        setSyncStatus('stale')
      } else {
        setSyncStatus('synced')
      }
    }

    checkStale()
    const interval = setInterval(checkStale, 60000) // check every minute
    return () => clearInterval(interval)
  }, [lastSyncedAt])

  // Triggers manual sync using the real syncNow hook
  const handleManualSync = async () => {
    if (isSyncing) return
    setSyncStatus('syncing')
    
    try {
      const response = await syncNow(items, lists, stores, categories)
      if (response) {
        const mergedItems = resolveConflicts(items, response.remote_grocery_changes)
        setItems(mergedItems)

        const mergedLists = resolveListConflicts(lists, response.remote_grocery_list_changes)
        setLists(mergedLists)

        const mergedStores = resolveStoreConflicts(stores, response.remote_store_changes)
        setStores(mergedStores)

        const mergedCategories = resolveCategoryConflicts(categories, response.remote_category_changes)
        setCategories(mergedCategories)

        setLastSyncedAt(response.server_timestamp)
        localStorage.setItem('grocery_last_synced', response.server_timestamp)
      }
      setSyncStatus('synced')
    } catch (err) {
      console.error('[Sync] Manual sync failed:', err)
      setSyncStatus('stale')
    }
  }

  // Trigger initial sync on mount to pull server data
  useEffect(() => {
    handleManualSync()
  }, [])

  // Helper to format last synced text
  const getSyncedTimeString = () => {
    const lastSyncedMs = Date.parse(lastSyncedAt)
    const diffMin = Math.floor((Date.now() - lastSyncedMs) / 60000)
    if (diffMin < 1) return 'just now'
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const navItems = [
    {
      path: '/grocery',
      label: 'Need',
      icon: ShoppingBag,
    },
    {
      path: '/grocery/planning',
      label: 'Planning',
      icon: Calendar,
    },
    {
      path: '/grocery/shopping',
      label: 'Shopping',
      icon: CheckSquare,
    },
    {
      path: '/grocery/settings',
      label: 'Settings',
      icon: SettingsIcon,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between items-center font-sans antialiased selection:bg-primary selection:text-black">
      {/* Mobile container wrapper (App Frame) */}
      <div className="w-full max-w-md min-h-screen bg-black flex flex-col relative border-x border-[#1a1a1a] shadow-[0_0_50px_0_rgba(208,188,255,0.05)] pb-[72px]">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-[#1a1a1a] h-14 flex items-center justify-between px-4">
          {/* List Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
              className="flex items-center gap-1.5 text-base font-semibold py-1.5 px-2.5 rounded-lg bg-surface-tile border border-neutral-800 active:scale-95 transition-all cursor-pointer"
            >
              <span className="truncate max-w-[150px]">{activeList.name}</span>
              <ChevronDown className="w-4 h-4 text-secondary" />
            </button>

            {isListDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsListDropdownOpen(false)} />
                <div className="absolute left-0 mt-2 w-56 bg-surface-tile border border-neutral-800 rounded-lg shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  {lists.map((list) => (
                    <button
                      key={list.id}
                      onClick={() => {
                        setActiveListId(list.id)
                        setIsListDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-neutral-800 transition-colors",
                        list.id === activeListId ? "text-primary font-medium" : "text-text-muted"
                      )}
                    >
                      {list.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title & Sync Feedback */}
          <div className="flex items-center gap-3">
            {/* Sync Status Button */}
            <div className="relative">
              <button
                onClick={handleManualSync}
                onMouseEnter={() => setShowSyncTooltip(true)}
                onMouseLeave={() => setShowSyncTooltip(false)}
                onClickCapture={() => setShowSyncTooltip(!showSyncTooltip)}
                className="p-2 rounded-lg bg-surface-tile border border-neutral-800 active:scale-95 hover:border-neutral-700 transition-all cursor-pointer relative"
                aria-label="Sync status"
              >
                <RefreshCw className={cn(
                  "w-4 h-4 transition-all duration-700",
                  syncStatus === 'syncing' && "animate-spin text-primary",
                  syncStatus === 'synced' && "text-emerald-500",
                  syncStatus === 'stale' && "text-yellow-500 animate-pulse"
                )} />
                {syncStatus === 'stale' && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-500" />
                )}
              </button>

              {showSyncTooltip && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-tile border border-neutral-800 p-2.5 rounded-lg shadow-lg z-50 text-xs text-text-muted animate-in fade-in duration-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    {syncStatus === 'synced' && (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-semibold text-emerald-500">Synced</span>
                      </>
                    )}
                    {syncStatus === 'stale' && (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="font-semibold text-yellow-500">Stale state</span>
                      </>
                    )}
                    {syncStatus === 'syncing' && (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
                        <span className="font-semibold text-primary">Syncing...</span>
                      </>
                    )}
                  </div>
                  <p>Last synced: {getSyncedTimeString()}</p>
                  <p className="mt-1 text-[10px] text-neutral-500">Tap icon to force upload/download changes.</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Primary Page Outlet */}
        <main className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth">
          <Outlet context={{ activeListId, handleManualSync, syncStatus, items, setItems, lists, setLists, stores, setStores, categories, setCategories }} />
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 w-full max-w-md bg-black/90 backdrop-blur-lg border-t border-[#1a1a1a] h-[68px] flex items-center justify-around px-2 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const Icon = item.icon
            // Check if active (match exact path or subpaths for nested routes)
            const isActive = currentPath === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all cursor-pointer group active:scale-95"
              >
                <div className={cn(
                  "p-1.5 rounded-full transition-all group-hover:bg-neutral-900",
                  isActive ? "bg-primary/10 text-primary scale-110" : "text-text-muted"
                )}>
                  <Icon className="w-5 h-5 transition-transform" />
                </div>
                <span className={cn(
                  "text-[10px] font-medium tracking-wide mt-1 transition-colors",
                  isActive ? "text-primary font-semibold" : "text-text-muted group-hover:text-neutral-300"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

      </div>
    </div>
  )
}
