import { useState, useEffect, useRef } from 'react'
import type { TouchEvent, FormEvent } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Plus, Minus, Trash2, Check, Sparkles, X, ShoppingBag } from 'lucide-react'
import type { GroceryItem, Category } from '@/types/grocery'
import { cn } from '@/utils/cn'

// Default fallback categories
const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Produce', color: '#8ADEAD' },
  { id: 2, name: 'Dairy & Eggs', color: '#FFD97D' },
  { id: 3, name: 'Bakery', color: '#FF9B85' },
  { id: 4, name: 'Pantry', color: '#90E0EF' },
  { id: 5, name: 'Meat & Seafood', color: '#EE6C4D' },
  { id: 6, name: 'Frozen', color: '#C18C5D' },
]

// Common suggestion names for autocomplete
const SUGGESTIONS = [
  'Apples', 'Almond Milk', 'Butter', 'Broccoli', 'Blueberries',
  'Chicken Breast', 'Cheddar Cheese', 'Eggs', 'Garlic', 'Hummus',
  'Lemon', 'Olive Oil', 'Onions', 'Pasta', 'Rice', 'Spinach',
  'Strawberries', 'Tomatoes', 'Tortillas', 'Water'
]

export function NeedPhase() {
  const { items, setItems, categories } = useOutletContext<{
    items: GroceryItem[]
    setItems: React.Dispatch<React.SetStateAction<GroceryItem[]>>
    categories: Category[]
  }>()

  const activeCategories = categories && categories.length > 0
    ? categories.map(cat => {
        const fallback = DEFAULT_CATEGORIES.find(d => d.id === cat.id)
        return {
          id: cat.id,
          name: cat.name,
          color: fallback?.color || '#C18C5D'
        }
      })
    : DEFAULT_CATEGORIES
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemQuantity, setNewItemQuantity] = useState('1')
  const [newItemCategory, setNewItemCategory] = useState<number>(1)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  
  // Slide out delete control state per item
  const [swipeDeleteId, setSwipeDeleteId] = useState<number | null>(null)
  
  // Track swipe touch positions
  const touchStartX = useRef<number | null>(null)
  const touchCurrentX = useRef<number | null>(null)

  // Suggestion filtering
  useEffect(() => {
    if (!newItemName.trim()) {
      setFilteredSuggestions([])
      return
    }
    const query = newItemName.toLowerCase()
    const matches = SUGGESTIONS.filter(
      s => s.toLowerCase().includes(query) && s.toLowerCase() !== query
    ).slice(0, 4)
    setFilteredSuggestions(matches)
  }, [newItemName])

  // Tap-to-toggle details & controls
  const handleTileClick = (itemId: number) => {
    if (swipeDeleteId) {
      setSwipeDeleteId(null)
      return
    }
    setExpandedItemId(expandedItemId === itemId ? null : itemId)
  }

  // Handle Swipe Interactions
  const handleTouchStart = (e: TouchEvent, _itemId: number) => {
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent, itemId: number) => {
    if (touchStartX.current === null) return
    touchCurrentX.current = e.touches[0].clientX
    
    const diffX = touchStartX.current - touchCurrentX.current
    // Swipe left (End-to-Start)
    if (diffX > 80) {
      setSwipeDeleteId(itemId)
    } else if (diffX < -50 && swipeDeleteId === itemId) {
      setSwipeDeleteId(null)
    }
  }

  const handleTouchEnd = () => {
    touchStartX.current = null
    touchCurrentX.current = null
  }

  // Quantity updates (Sets sync_state to PENDING_UPDATE)
  const updateQuantity = (itemId: number, increment: boolean) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      
      const currentQty = parseInt(item.quantity, 10)
      let nextQtyStr = item.quantity
      
      if (!isNaN(currentQty)) {
        const nextQty = increment ? currentQty + 1 : Math.max(1, currentQty - 1)
        // Keep unit if exists (e.g. "1 bunch" -> "2 bunch" or just "2")
        const unitPart = item.quantity.replace(/^\d+\s*/, '')
        nextQtyStr = unitPart ? `${nextQty} ${unitPart}` : `${nextQty}`
      } else {
        // Fallback for text quantities (toggle or parse)
        nextQtyStr = increment ? '2' : '1'
      }

      return {
        ...item,
        quantity: nextQtyStr,
        sync_state: item.sync_state === 'PENDING_INSERT' ? 'PENDING_INSERT' : 'PENDING_UPDATE',
        version: item.version + 1
      }
    }))
  }

  // Item deletion (Sets is_deleted = true and sync_state to PENDING_DELETE)
  const deleteItem = (itemId: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      return {
        ...item,
        is_deleted: true,
        isActive: false,
        sync_state: 'PENDING_DELETE',
        version: item.version + 1
      }
    }))
    setSwipeDeleteId(null)
    setExpandedItemId(null)
  }

  // Add Item to Need Phase
  const handleAddItem = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!newItemName.trim()) return

    const newItem: GroceryItem = {
      id: Date.now(), // Local client id
      name: newItemName.trim(),
      quantity: newItemQuantity || '1',
      isBought: false,
      createdAt: Date.now(),
      position: items.length + 1,
      categoryId: newItemCategory,
      timesBought: 0,
      isActive: true,
      listId: '1',
      sync_state: 'PENDING_INSERT',
      version: 1,
      is_deleted: false,
    }

    setItems(prev => [...prev, newItem])
    
    // Reset Form & Close bottom sheet
    setNewItemName('')
    setNewItemQuantity('1')
    setNewItemCategory(1)
    setIsAddOpen(false)
  }

  // Active (non-deleted, active) items
  const activeItems = items.filter(item => item.isActive && !item.is_deleted)

  // Group active items by category
  const itemsByCategory = activeCategories.reduce((acc, cat) => {
    const catItems = activeItems.filter(item => item.categoryId === cat.id)
    if (catItems.length > 0) {
      acc.push({ category: cat, items: catItems })
    }
    return acc;
  }, [] as { category: typeof activeCategories[0]; items: GroceryItem[] }[])

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      
      {/* Category lists */}
      {activeItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-surface-tile border border-neutral-800 flex items-center justify-center text-neutral-600 mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-300 mb-1">Your list is empty</h3>
          <p className="text-sm text-text-muted max-w-[240px]">Tap the floating action button below to add items you need.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {itemsByCategory.map(({ category, items }) => (
            <div key={category.id} className="space-y-2">
              {/* Category Header */}
              <div className="flex items-center gap-2 px-1">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: category.color }} 
                />
                <h4 className="text-xs font-bold tracking-widest text-text-muted uppercase">
                  {category.name}
                </h4>
                <span className="text-[10px] text-neutral-600 bg-neutral-900 px-1.5 py-0.5 rounded-full font-medium">
                  {items.length}
                </span>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const isExpanded = expandedItemId === item.id
                  const isSwiped = swipeDeleteId === item.id
                  const isPending = item.sync_state !== 'SYNCED'

                  return (
                    <div
                      key={item.id}
                      onTouchStart={(e) => handleTouchStart(e, item.id)}
                      onTouchMove={(e) => handleTouchMove(e, item.id)}
                      onTouchEnd={handleTouchEnd}
                      className={cn(
                        "relative h-12 rounded-lg bg-surface-tile border transition-all duration-200 overflow-hidden select-none touch-pan-y",
                        isExpanded ? "col-span-2 border-neutral-700 bg-neutral-900/40" : "border-neutral-900",
                        isPending && !isExpanded && "border-dashed border-primary/20"
                      )}
                    >
                      {/* Swipe Delete Red Overlay */}
                      <div 
                        onClick={() => deleteItem(item.id)}
                        className={cn(
                          "absolute top-0 right-0 h-full bg-red-600 flex items-center justify-center text-white font-semibold cursor-pointer transition-all duration-200 z-10",
                          isSwiped ? "w-16 opacity-100" : "w-0 opacity-0"
                        )}
                      >
                        <Trash2 className="w-5 h-5" />
                      </div>

                      {/* Main Tile Content */}
                      <div 
                        onClick={() => handleTileClick(item.id)}
                        className={cn(
                          "absolute inset-0 px-3 flex items-center justify-between cursor-pointer active:bg-neutral-800/40 transition-all",
                          isSwiped && "translate-x-[-64px]"
                        )}
                      >
                        <div className="flex items-center gap-2 overflow-hidden mr-2">
                          <span className="text-sm font-semibold truncate text-white">{item.name}</span>
                          {isPending && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted bg-black/40 px-2 py-0.5 rounded-md border border-neutral-800">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Control overlay for quantity adjust */}
                      {isExpanded && (
                        <div className="absolute inset-0 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between px-3 animate-in fade-in duration-100">
                          {/* Close Expanded Controls */}
                          <button 
                            onClick={() => setExpandedItemId(null)}
                            className="p-1.5 text-text-muted hover:text-white rounded-md hover:bg-neutral-800"
                          >
                            <Check className="w-4.5 h-4.5 text-primary" />
                          </button>

                          <div className="flex items-center gap-4">
                            <span className="text-xs font-medium text-text-muted">Qty: {item.quantity}</span>
                            <div className="flex items-center gap-1 bg-black/40 rounded-lg p-0.5 border border-neutral-800">
                              <button 
                                onClick={() => updateQuantity(item.id, false)}
                                className="p-1 text-text-muted hover:text-white hover:bg-surface-tile rounded-md active:scale-95"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateQuantity(item.id, true)}
                                className="p-1 text-text-muted hover:text-white hover:bg-surface-tile rounded-md active:scale-95"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button 
                            onClick={() => deleteItem(item.id)}
                            className="p-1.5 text-red-400 hover:text-red-500 rounded-md hover:bg-red-950/20"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsAddOpen(true)}
        className="fixed bottom-[84px] right-4 md:right-[calc(50vw-210px)] w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-35 cursor-pointer"
        aria-label="Add grocery item"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Slide-Up Bottom Sheet Modal */}
      {isAddOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsAddOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
          />
          {/* Bottom Sheet content */}
          <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-auto md:w-full md:max-w-md bg-surface-tile border-t border-neutral-800 rounded-t-2xl z-50 px-4 pt-4 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-250 ease-out">
            <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-white">Add Needed Item</h3>
              </div>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-text-muted hover:text-white rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Input name */}
              <div>
                <label htmlFor="item-name" className="sr-only">Item Name</label>
                <input
                  id="item-name"
                  type="text"
                  placeholder="What is needed? (e.g. Milk, Eggs)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  autoFocus
                  className="w-full bg-black/40 border border-neutral-800 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-white placeholder-neutral-600"
                />
              </div>

              {/* Suggestion Chips */}
              {filteredSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 animate-in fade-in duration-150">
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setNewItemName(suggestion)
                        setFilteredSuggestions([])
                      }}
                      className="text-xs bg-neutral-900 border border-neutral-800 hover:border-primary text-text-muted hover:text-primary rounded-full px-3 py-1 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Quantity and Category Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-text-muted block mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    className="w-full bg-black/40 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-bold text-text-muted block mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(parseInt(e.target.value, 10))}
                    className="w-full bg-black/40 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-white"
                  >
                    {activeCategories.map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-surface-tile text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#c0a9f5] text-black font-semibold rounded-lg py-2.5 mt-2 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                Add Item
              </button>
            </form>
          </div>
        </>
      )}

    </div>
  )
}
