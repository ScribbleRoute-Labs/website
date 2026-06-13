import { useState } from 'react'
import { ChevronDown, CheckSquare, Square, Check, MapPin, ClipboardList } from 'lucide-react'
import type { GroceryItem, Store } from '@/types/grocery'
import { cn } from '@/utils/cn'

// Mock Stores list
const STORES: Store[] = [
  { id: 1, name: 'Trader Joe\'s', position: 1, isDefaultSupported: true, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 2, name: 'Whole Foods', position: 2, isDefaultSupported: false, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 3, name: 'Costco', position: 3, isDefaultSupported: false, sync_state: 'SYNCED', version: 1, is_deleted: false },
]

// Mock active items for the selected store
const INITIAL_SHOPPING_ITEMS: GroceryItem[] = [
  { id: 201, name: 'Trader Joe\'s Bananas', quantity: '1 bunch', isBought: false, createdAt: Date.now(), position: 1, categoryId: 1, timesBought: 12, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 202, name: 'Havarti Cheese slice', quantity: '1 pack', isBought: false, createdAt: Date.now(), position: 2, categoryId: 2, timesBought: 8, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 203, name: 'Sourdough Bagels', quantity: '2 packs', isBought: false, createdAt: Date.now(), position: 3, categoryId: 3, timesBought: 5, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 204, name: 'Cold Brew Coffee', quantity: '1 bottle', isBought: false, createdAt: Date.now(), position: 4, categoryId: 4, timesBought: 15, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 205, name: 'Ribeye Steak', quantity: '2 lb', isBought: true, createdAt: Date.now(), position: 5, categoryId: 5, timesBought: 20, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 206, name: 'Frozen Berries', quantity: '1 bag', isBought: true, createdAt: Date.now(), position: 6, categoryId: 6, timesBought: 4, isActive: true, listId: '1', sync_state: 'SYNCED', version: 1, is_deleted: false },
]

const CATEGORIES = [
  { id: 1, name: 'Produce' },
  { id: 2, name: 'Dairy & Eggs' },
  { id: 3, name: 'Bakery' },
  { id: 4, name: 'Pantry' },
  { id: 5, name: 'Meat & Seafood' },
  { id: 6, name: 'Frozen' },
]

export function ShoppingPhase() {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null)
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false)
  const [items, setItems] = useState<GroceryItem[]>(INITIAL_SHOPPING_ITEMS)
  const [isConfirmTripOpen, setIsConfirmTripOpen] = useState(false)

  const activeStore = STORES.find(s => s.id === selectedStoreId)

  // Toggle "Bought" state (Moves items in cart)
  const toggleBought = (itemId: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      return {
        ...item,
        isBought: !item.isBought,
        sync_state: 'PENDING_UPDATE',
        version: item.version + 1
      }
    }))
  }

  // Clear in-cart items (Complete trip workflow)
  const handleCompleteTrip = () => {
    setItems(prev => prev.map(item => {
      if (item.isBought) {
        return {
          ...item,
          isActive: false,
          sync_state: 'PENDING_UPDATE',
          version: item.version + 1
        }
      }
      return item
    }))
    setIsConfirmTripOpen(false)
  }

  // Filter items to show: only active items
  const activeItems = items.filter(item => item.isActive && !item.is_deleted)
  
  // Split items into "To Buy" (needed) vs "In Cart" (bought)
  const toBuyItems = activeItems.filter(item => !item.isBought)
  const inCartItems = activeItems.filter(item => item.isBought)

  // Group to-buy items by category
  const toBuyByCategory = CATEGORIES.reduce((acc, cat) => {
    const catItems = toBuyItems.filter(item => item.categoryId === cat.id)
    if (catItems.length > 0) {
      acc.push({ category: cat, items: catItems })
    }
    return acc
  }, [] as { category: typeof CATEGORIES[0]; items: GroceryItem[] }[])

  return (
    <div className="space-y-5 flex-1 flex flex-col min-h-0 animate-in fade-in duration-200">
      
      {/* Store Isolation Header */}
      <div className="relative">
        <label className="text-[10px] uppercase tracking-wider font-bold text-text-muted px-1 block mb-1">
          Active Store Isolation
        </label>
        <button
          onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
          className="w-full flex items-center justify-between text-base font-semibold py-3 px-4 rounded-xl bg-surface-tile border border-neutral-900 active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{activeStore ? activeStore.name : 'Select a store to start shopping'}</span>
          </div>
          <ChevronDown className="w-5 h-5 text-secondary" />
        </button>

        {isStoreDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsStoreDropdownOpen(false)} />
            <div className="absolute left-0 right-0 mt-2 bg-surface-tile border border-neutral-800 rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {STORES.map((store) => (
                <button
                  key={store.id}
                  onClick={() => {
                    setSelectedStoreId(store.id)
                    setIsStoreDropdownOpen(false)
                  }}
                  className={cn(
                    "w-full text-left px-5 py-3 hover:bg-neutral-800 transition-colors flex items-center gap-2",
                    store.id === selectedStoreId ? "text-primary font-semibold" : "text-text-muted"
                  )}
                >
                  <MapPin className="w-4 h-4" />
                  {store.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Shopping Layout */}
      {!selectedStoreId ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12">
          <div className="w-16 h-16 rounded-full bg-surface-tile border border-neutral-800 flex items-center justify-center text-neutral-600 mb-4">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-300 mb-1">High-Velocity Mode</h3>
          <p className="text-sm text-text-muted max-w-[240px]">Select which store you are physically at above to filter items and begin checkout.</p>
        </div>
      ) : (
        <div className="space-y-6 flex-1 flex flex-col min-h-0">
          
          {/* Active Needed Items */}
          <div className="space-y-4 flex-1 overflow-y-auto">
            {toBuyItems.length === 0 ? (
              <div className="text-center py-8">
                <Check className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-semibold text-white">All items captured!</h4>
                <p className="text-xs text-text-muted">Nice work. Proceed to complete your trip.</p>
              </div>
            ) : (
              toBuyByCategory.map(({ category, items }) => (
                <div key={category.id} className="space-y-2">
                  {/* Category Header */}
                  <h5 className="text-[10px] font-bold tracking-widest text-text-muted px-1 uppercase">
                    {category.name}
                  </h5>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleBought(item.id)}
                        className="flex items-center justify-between p-3 h-12 rounded-lg bg-surface-tile border border-neutral-950 active:scale-95 transition-all text-left cursor-pointer group"
                      >
                        <span className="text-sm font-semibold truncate text-white pr-2 group-hover:text-primary">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-text-muted bg-black/40 px-1.5 py-0.5 rounded border border-neutral-800">
                            {item.quantity}
                          </span>
                          <Square className="w-4 h-4 text-text-muted" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}

            {/* Collapsible/Faded "In Cart" Section */}
            {inCartItems.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center justify-between px-1">
                  <h5 className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
                    In Cart ({inCartItems.length})
                  </h5>
                </div>

                <div className="grid grid-cols-2 gap-2 opacity-35">
                  {inCartItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleBought(item.id)}
                      className="flex items-center justify-between p-3 h-12 rounded-lg bg-surface-tile border border-emerald-950 text-left line-through cursor-pointer"
                    >
                      <span className="text-sm font-medium truncate text-neutral-400">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-neutral-500 bg-black/40 px-1.5 py-0.5 rounded border border-neutral-800">
                          {item.quantity}
                        </span>
                        <CheckSquare className="w-4 h-4 text-emerald-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Complete Trip Action Bar */}
          {inCartItems.length > 0 && (
            <div className="sticky bottom-0 bg-black pt-2 pb-1 z-30">
              <button
                onClick={() => setIsConfirmTripOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                Complete Shopping Trip
              </button>
            </div>
          )}
        </div>
      )}

      {/* Complete Trip Confirmation Dialog */}
      {isConfirmTripOpen && (
        <>
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-sm bg-surface-tile border border-neutral-800 p-6 rounded-2xl z-50 shadow-2xl animate-in scale-in duration-200">
            <h3 className="text-base font-bold text-white mb-2">Complete Grocery Trip?</h3>
            <p className="text-xs text-text-muted mb-6">
              This will archive and clear all {inCartItems.length} checked items from the current shopping cart. Unchecked items will remain on your list.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsConfirmTripOpen(false)}
                className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Keep Shopping
              </button>
              <button
                onClick={handleCompleteTrip}
                className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Yes, Archive Trip
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
