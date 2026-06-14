import { STORAGE_KEYS } from '@/config/storageKeys';
import { storage } from '@/utils/storage';

/**
 * Gets or generates a stable client UUID for synchronization and authentication.
 * Persists the generated UUID in localStorage.
 */
export function getClientUuid(): string {
  let id = storage.getItem<string>(STORAGE_KEYS.CLIENT_UUID, '');
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
    storage.setItem(STORAGE_KEYS.CLIENT_UUID, id);
  }
  return id;
}
