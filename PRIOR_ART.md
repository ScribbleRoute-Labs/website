PREVIOUS_ART.md
1. Core UX & Feature Architecture
Active Screens & Views
•
GroceryScreen (fyi.teddy.android.grocery.ui): The primary interface for grocery management, utilizing a three-phase workflow mediated by a bottom navigation bar.
◦
NEED Phase: Optimized for rapid item entry and quantity adjustment.
▪
Layout: LazyVerticalGrid (2 columns) grouped by categories.
▪
Components: NeedItemTile (48dp height, black surface 0xFF1A1A1A, 8dp rounded corners).
▪
Interaction: Tap to expand quantity controls (+/-); Swipe End-to-Start to delete (Red background).
◦
PLANNING Phase: Designed for list building with context awareness.
▪
Layout: Vertical stack with horizontal store filter chips at the top, a recommendation tray, and the main item list.
▪
Components: FilterChip for store selection; RecommendationTile for quick-add; PlanningItemTile.
▪
Interaction: Selecting a store filters recommendations. Tapping recommendations adds them to the active list.
◦
SHOPPING Phase: A high-velocity "in-store" mode.
▪
Layout: Store isolation header requiring store selection. Items displayed in a 2-column grid with collapsible category headers.
▪
Components: ShoppingCategoryHeader; ShoppingItemTile; "In Cart" section.
▪
Interaction: Tap to toggle "Bought" state (In-cart). Items in cart move to the bottom section and are rendered with 0.3f alpha and strikethrough. "Trip Complete" action clears in-cart items.
Interaction Patterns
•
Add Item: ModalBottomSheet (Dark 0xFF1A1A1A) triggered by FAB in NEED phase. Includes a TextField with real-time SuggestionChip row based on historical item names.
•
List Management: DropdownMenu for switching between shared lists. AddListDialog and ShareListDialog for collaborative features.
•
Sync Feedback: Sync icon in TopAppBar turns Yellow if the local state is considered stale (>24h since last sync).
Visual States
•
Empty State: Placeholder text in PlanningPhaseContent and ShoppingPhaseContent when no items or store is selected.
•
Loading/Success/Error: Managed via GroceryViewModel and StateFlow updates; UI reflects these through reactive composition.
2. Data Models & Domain Schema
The following TypeScript-compatible definitions represent the core Grocery entities. Note: GroceryItem currently uses an Int primary key, while newer list-related entities use UUID strings.
Plain text
type SyncState = 'SYNCED' | 'PENDING_INSERT' | 'PENDING_UPDATE' | 'PENDING_DELETE';

interface GroceryItem {
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
  listId?: string; // Foreign Key to GroceryList
  unit?: string;
  notes?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

interface GroceryList {
  id: string; // Primary Key (UUID)
  name: string;
  ownerId?: string;
  createdAt: number;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

interface GroceryListMember {
  id: string; // Primary Key (UUID)
  listId: string;
  userId: string;
  role: string; // e.g., 'OWNER', 'MEMBER'
  joinedAt: number;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

interface Store {
  id: number;
  name: string;
  position: number;
  isDefaultSupported: boolean;
  userId?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

interface Category {
  id: number;
  name: string;
  position: number;
  userId?: string;
  icon?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}

interface GroceryItemStoreInfo {
  groceryItemId: number;
  storeId: number;
  price?: number;
  isAvailable: boolean;
  userId?: string;
  sync_state: SyncState;
  version: number;
  is_deleted: boolean;
}
Show full code block
3. API & Synchronization Contracts
Synchronization Protocol
The app implements a Local-First Synchronization Engine using an atomic batch delta approach.
•
Endpoint: POST /api/sync
•
Request Payload (SyncRequest):
◦
last_synced_at: ISO 8601 string.
◦
client_id: Unique client identifier.
◦
*_changes: Arrays of ChangeDelta objects (e.g., grocery_changes, store_changes).
•
Delta Shape (ChangeDelta):
◦
id: Entity ID.
◦
type: INSERT, UPDATE, or DELETE.
◦
version: Current client-side version.
◦
data: Serialized JSON object of the entity (null for deletes).
State Machine Rules
1.
Local Mutation: Every write sets sync_state to PENDING_INSERT (new) or PENDING_UPDATE (existing). Deletions set is_deleted = true and sync_state = PENDING_DELETE.
2.
Upload: SyncWorker collects all non-SYNCED rows, converts them to DTOs, and sends them to the backend.
3.
Conflict Resolution: Handled via version incrementing on the server. The client replaces local rows with remote data if the server's version is higher.
4.
Cleanup: Upon successful sync, PENDING_DELETE rows are hard-deleted from the Room database.
4. Design System Tokens
The app follows a strict Dark Theme aesthetic.
Color Palette
•
Background/Surface: Color.Black (0xFF000000)
•
Primary: Purple80 (0xFFD0BCFF)
•
Secondary: PurpleGrey80 (0xFFCCC2DC)
•
Tertiary: Pink80 (0xFFEFB8C8)
•
Accent/Tiles: Dark Grey (0xFF1A1A1A)
•
Text (On Surface): Color.White (0xFFFFFFFF)
•
Subtext/Labels: Color.Gray (0xFF888888) or Color.DarkGray
Typography (Material3)
•
Titles: titleMedium (18.sp, Medium weight)
•
Headers: labelMedium (Uppercase, Gray) for category headings.
•
Body: bodyLarge (16.sp) for primary item names; bodyMedium (14.sp) for tile content.
•
Captions: labelSmall for units and metadata.
Layout & Shapes
•
Corner Radius: Standardized at 8.dp for tiles, chips, and dialogs.
•
Spacing Scale:
◦
4.dp: Tight grouping (e.g., text to icon).
◦
8.dp: Standard gutter/padding between grid items.
◦
16.dp: Major section separation.
•
Component Height: Standardized at 48.dp for interactive list/grid items to ensure touch target compliance.