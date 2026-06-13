export type SyncState = 'SYNCED' | 'PENDING_INSERT' | 'PENDING_UPDATE' | 'PENDING_DELETE';

export interface GroceryItem {
  id: number; // Primary Key (Int)
  name: string;
  quantity: string;
  isBought: boolean;
  createdAt: number; // timestamp
  position: number;
  categoryId?: number;
  timesBought: number;
  userId?: string;
  isActive: boolean;
  listId?: string; // Foreign Key to GroceryList (UUID)
  unit?: string;
  notes?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

export interface GroceryList {
  id: string; // Primary Key (UUID)
  name: string;
  ownerId?: string;
  createdAt: number;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

export interface GroceryListMember {
  id: string; // Primary Key (UUID)
  listId: string;
  userId: string;
  role: string; // e.g., 'OWNER', 'MEMBER'
  joinedAt: number;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

export interface Store {
  id: number;
  name: string;
  position: number;
  isDefaultSupported: boolean;
  userId?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

export interface Category {
  id: number;
  name: string;
  position: number;
  userId?: string;
  icon?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

export interface GroceryItemStoreInfo {
  groceryItemId: number;
  storeId: number;
  price?: number;
  isAvailable: boolean;
  userId?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

// Synchronization Protocol Shapes

export type ChangeDeltaType = 'INSERT' | 'UPDATE' | 'DELETE';

export interface ChangeDelta<T = any> {
  id: number | string;
  type: ChangeDeltaType;
  version: number;
  data: T | null; // null for deletes
}

export interface SyncRequest {
  last_synced_at: string; // ISO 8601 string
  client_id: string; // Unique client identifier
  grocery_changes?: ChangeDelta<GroceryItem>[];
  list_changes?: ChangeDelta<GroceryList>[];
  member_changes?: ChangeDelta<GroceryListMember>[];
  store_changes?: ChangeDelta<Store>[];
  category_changes?: ChangeDelta<Category>[];
  store_info_changes?: ChangeDelta<GroceryItemStoreInfo>[];
}

export interface SyncResponse {
  last_synced_at: string; // ISO 8601 string from server
  grocery_changes?: ChangeDelta<GroceryItem>[];
  list_changes?: ChangeDelta<GroceryList>[];
  member_changes?: ChangeDelta<GroceryListMember>[];
  store_changes?: ChangeDelta<Store>[];
  category_changes?: ChangeDelta<Category>[];
  store_info_changes?: ChangeDelta<GroceryItemStoreInfo>[];
}
