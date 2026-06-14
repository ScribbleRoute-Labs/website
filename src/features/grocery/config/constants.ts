import type { Store, Category } from '@/types/grocery'

export const DEFAULT_STORES: Store[] = [
  { id: 1, name: "Trader Joe's", position: 1, isDefaultSupported: true, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 2, name: 'Whole Foods', position: 2, isDefaultSupported: false, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 3, name: 'Costco', position: 3, isDefaultSupported: false, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 4, name: 'Local Farmers Market', position: 4, isDefaultSupported: false, sync_state: 'SYNCED', version: 1, is_deleted: false },
]

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Produce', position: 1, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 2, name: 'Dairy & Eggs', position: 2, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 3, name: 'Bakery', position: 3, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 4, name: 'Pantry', position: 4, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 5, name: 'Meat & Seafood', position: 5, sync_state: 'SYNCED', version: 1, is_deleted: false },
  { id: 6, name: 'Frozen', position: 6, sync_state: 'SYNCED', version: 1, is_deleted: false },
]

export const CATEGORY_COLORS: Record<number, string> = {
  1: '#8ADEAD',      // Produce
  2: '#FFD97D',      // Dairy & Eggs
  3: '#FF9B85',      // Bakery
  4: '#90E0EF',      // Pantry
  5: '#EE6C4D',      // Meat & Seafood
  6: '#C18C5D',      // Frozen
}

export const DEFAULT_RECOMMENDATIONS = [
  { name: 'Organic Eggs', categoryId: 2, storeId: 1, timesBought: 45 },
  { name: 'Avocados', categoryId: 1, storeId: 1, timesBought: 38 },
  { name: 'Greek Yogurt', categoryId: 2, storeId: 2, timesBought: 29 },
  { name: 'Almond Butter', categoryId: 4, storeId: 2, timesBought: 18 },
  { name: 'Salmon Fillet', categoryId: 5, storeId: 3, timesBought: 22 },
  { name: 'Sourdough Loaf', categoryId: 3, storeId: 1, timesBought: 17 },
  { name: 'Rotisserie Chicken', categoryId: 5, storeId: 3, timesBought: 31 },
  { name: 'Organic Spinach', categoryId: 1, storeId: 2, timesBought: 26 },
  { name: 'Local Strawberries', categoryId: 1, storeId: 4, timesBought: 12 },
  { name: 'Artisanal Honey', categoryId: 4, storeId: 4, timesBought: 9 },
]
