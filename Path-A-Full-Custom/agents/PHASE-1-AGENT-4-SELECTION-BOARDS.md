# Agent 4: Selection Boards Feature

## Your Task
Build the complete Selection Boards feature - this is the most important new feature in the demo.

Selection boards are how interior designers present product options to clients. Think Pinterest-style boards with furniture, lighting, fabrics arranged visually.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read (ONLY these files)
1. Materials/Products page - to understand product data structure
2. One example of react-dnd usage in TailAdmin (search for `useDrag` or `useDrop`)
3. Basic page structure from any existing page

**DO NOT explore the entire codebase. Read only what you need.**

**Note:** Another agent is adding "Selection Boards" to the sidebar navigation. You just need to create the pages and components.

---

## What to Build

### 1. Selection Boards List Page

**Location:** `src/app/(admin)/selection-boards/page.tsx`

Grid of board cards:
```
┌─────────────────────────────────────────────────────────────┐
│ Selection Boards                              [+ New Board] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │ ░░░░░░░░░ │ │ ░░░░░░░░░ │ │ ░░░░░░░░░ │ │ ░░░░░░░░░ │   │
│  │ ░ thumb ░ │ │ ░ thumb ░ │ │ ░ thumb ░ │ │ ░ thumb ░ │   │
│  │ ░░░░░░░░░ │ │ ░░░░░░░░░ │ │ ░░░░░░░░░ │ │ ░░░░░░░░░ │   │
│  │           │ │           │ │           │ │           │   │
│  │ Kitchen   │ │ Living    │ │ Master    │ │ Dining    │   │
│  │ Lighting  │ │ Room      │ │ Bath      │ │ Room      │   │
│  │ ───────── │ │ ───────── │ │ ───────── │ │ ───────── │   │
│  │ Mitchell  │ │ Wong      │ │ Henderson │ │ Chen      │   │
│  │ 8 items   │ │ 12 items  │ │ 6 items   │ │ 9 items   │   │
│  │ ●Approved │ │ ●Pending  │ │ ●Draft    │ │ ●Pending  │   │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Selection Board Builder Page

**Location:** `src/app/(admin)/selection-boards/[id]/page.tsx`

Interactive builder with drag-and-drop:
```
┌─────────────────────────────────────────────────────────────┐
│ ← Back    Kitchen Lighting          [Save] [Send to Client] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────┐  ┌──────────────────┐  │
│  │                                 │  │ Add Products     │  │
│  │      DRAG & DROP CANVAS         │  │                  │  │
│  │                                 │  │ [Search...]      │  │
│  │  ┌─────────┐  ┌─────────┐      │  │                  │  │
│  │  │ ░░░░░░░ │  │ ░░░░░░░ │      │  │ ┌──────────────┐ │  │
│  │  │Chandelier  │ Pendant  │      │  │ │ ░░ Sofa ░░░ │ │  │
│  │  │  $450   │  │  $180   │      │  │ │    $4,500    │ │  │
│  │  └─────────┘  └─────────┘      │  │ └──────────────┘ │  │
│  │                                 │  │ ┌──────────────┐ │  │
│  │       ┌─────────┐              │  │ │ ░░ Chair ░░░ │ │  │
│  │       │ ░░░░░░░ │              │  │ │    $650      │ │  │
│  │       │  Sconce │              │  │ └──────────────┘ │  │
│  │       │  $220   │              │  │ ┌──────────────┐ │  │
│  │       └─────────┘              │  │ │ ░░ Table ░░░ │ │  │
│  │                                 │  │ │    $2,200    │ │  │
│  └─────────────────────────────────┘  │ └──────────────┘ │  │
│                                        │                  │  │
│  Board Total: $850          3 items   │ Drag to canvas → │  │
│                                        └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Types

```typescript
// src/types/selection-board.ts

interface SelectionBoard {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  clientName: string;
  status: 'draft' | 'pending' | 'approved' | 'revision_requested';
  items: BoardItem[];
  totalValue: number;
  createdAt: string;
  sentAt?: string;
}

interface BoardItem {
  id: string;
  productId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  product: Product;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  vendor: string;
  category: string;
}
```

---

## Components to Create

### `src/components/selection-boards/BoardCard.tsx`
Card for the list view showing board thumbnail, name, client, item count, status.

### `src/components/selection-boards/BoardCanvas.tsx`
The main drop zone where items are placed. Uses `useDrop` from react-dnd.

### `src/components/selection-boards/BoardItem.tsx`
Draggable item on the canvas. Shows product image, name, price. Can be repositioned.

### `src/components/selection-boards/ProductSidebar.tsx`
Right sidebar with searchable list of products. Items are draggable onto canvas.

### `src/components/selection-boards/DraggableProduct.tsx`
Product card in sidebar that can be dragged. Uses `useDrag` from react-dnd.

### `src/components/selection-boards/BoardBuilder.tsx`
Main builder component that combines canvas + sidebar + header.

---

## React DnD Implementation

TailAdmin already has react-dnd installed. Here's the pattern:

```typescript
// Wrap your builder page with DndProvider
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function BoardBuilderPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardBuilder boardId={params.id} />
    </DndProvider>
  );
}
```

```typescript
// DraggableProduct.tsx - Products in sidebar
import { useDrag } from 'react-dnd';

export function DraggableProduct({ product }: { product: Product }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PRODUCT',
    item: { product },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-grab ${isDragging ? 'opacity-50' : ''}`}
    >
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>${product.price}</p>
    </div>
  );
}
```

```typescript
// BoardCanvas.tsx - Drop zone
import { useDrop } from 'react-dnd';

export function BoardCanvas({ items, onDrop, onMove }: Props) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PRODUCT',
    drop: (item: { product: Product }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        onDrop(item.product, { x, y });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative min-h-[500px] bg-gray-50 rounded-lg border-2 border-dashed
        ${isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      {items.map(item => (
        <BoardItem key={item.id} item={item} onMove={onMove} />
      ))}
    </div>
  );
}
```

```typescript
// BoardItem.tsx - Items on canvas (also draggable for repositioning)
import { useDrag } from 'react-dnd';

export function BoardItem({ item, onMove, onRemove }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOARD_ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: item.position.x,
        top: item.position.y,
        width: item.size.width,
      }}
      className={`bg-white rounded-lg shadow-md p-2 cursor-move group
        ${isDragging ? 'opacity-50' : ''}`}
    >
      <button
        onClick={() => onRemove(item.id)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
      <img src={item.product.image} alt={item.product.name} className="w-full rounded" />
      <p className="text-sm font-medium mt-1">{item.product.name}</p>
      <p className="text-sm text-gray-500">${item.product.price}</p>
    </div>
  );
}
```

---

## Mock Data

```typescript
// Mock boards for list view
const mockBoards: SelectionBoard[] = [
  {
    id: '1',
    name: 'Kitchen Lighting',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    status: 'approved',
    items: [], // Would have items
    totalValue: 1650,
    createdAt: '2025-12-15',
    sentAt: '2025-12-18'
  },
  {
    id: '2',
    name: 'Living Room Furniture',
    projectId: 'p2',
    projectName: 'Downtown Loft',
    clientName: 'James Wong',
    status: 'pending',
    items: [],
    totalValue: 12400,
    createdAt: '2025-12-20',
    sentAt: '2025-12-22'
  },
  {
    id: '3',
    name: 'Master Bath Fixtures',
    projectId: 'p3',
    projectName: 'Suburban Remodel',
    clientName: 'The Hendersons',
    status: 'draft',
    items: [],
    totalValue: 3200,
    createdAt: '2025-12-28'
  },
  {
    id: '4',
    name: 'Dining Room',
    projectId: 'p4',
    projectName: 'Beach House',
    clientName: 'Marcus Chen',
    status: 'pending',
    items: [],
    totalValue: 8900,
    createdAt: '2025-12-26',
    sentAt: '2025-12-28'
  }
];

// Mock products for sidebar
const mockProducts: Product[] = [
  { id: 'prod1', name: 'Cloud Sofa', image: '/images/products/sofa.jpg', price: 4500, vendor: 'Restoration Hardware', category: 'Seating' },
  { id: 'prod2', name: 'Sputnik Chandelier', image: '/images/products/chandelier.jpg', price: 890, vendor: 'West Elm', category: 'Lighting' },
  { id: 'prod3', name: 'Marble Dining Table', image: '/images/products/table.jpg', price: 2200, vendor: 'CB2', category: 'Tables' },
  { id: 'prod4', name: 'Leather Accent Chair', image: '/images/products/chair.jpg', price: 650, vendor: 'West Elm', category: 'Seating' },
  { id: 'prod5', name: 'Brass Floor Lamp', image: '/images/products/lamp.jpg', price: 450, vendor: 'Pottery Barn', category: 'Lighting' },
  { id: 'prod6', name: 'Wool Area Rug 8x10', image: '/images/products/rug.jpg', price: 1200, vendor: 'Restoration Hardware', category: 'Rugs' },
  { id: 'prod7', name: 'Ceramic Vase Set', image: '/images/products/vase.jpg', price: 180, vendor: 'CB2', category: 'Decor' },
  { id: 'prod8', name: 'Linen Curtains', image: '/images/products/curtains.jpg', price: 320, vendor: 'Pottery Barn', category: 'Window' }
];
```

For product images, use placeholder images:
```typescript
// Use placeholder URLs like:
image: 'https://picsum.photos/seed/sofa/200/200'
image: 'https://picsum.photos/seed/chandelier/200/200'
// etc.
```

---

## Status Badges

```typescript
const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  revision_requested: 'bg-red-100 text-red-700'
};

const statusLabels = {
  draft: 'Draft',
  pending: 'Pending Approval',
  approved: 'Approved',
  revision_requested: 'Revision Requested'
};
```

---

## Key Interactions

1. **List Page:**
   - Click board card → Navigate to builder
   - Click "+ New Board" → Navigate to `/selection-boards/new`

2. **Builder Page:**
   - Drag product from sidebar → Drops onto canvas
   - Drag item on canvas → Repositions
   - Hover item → Show remove button
   - Click remove → Remove from board
   - Click "Save" → Show success toast
   - Click "Send to Client" → Change status to 'pending', show success

3. **New Board:**
   - Form to enter board name + select project
   - Then show empty builder

---

## Success Criteria

- [ ] List page shows grid of board cards
- [ ] Board cards show name, client, item count, status badge
- [ ] Clicking board card opens builder
- [ ] "+ New Board" button works
- [ ] Builder has canvas on left, product sidebar on right
- [ ] Can drag products from sidebar onto canvas
- [ ] Products appear where dropped
- [ ] Can drag items to reposition on canvas
- [ ] Hover shows remove button
- [ ] Can remove items from board
- [ ] Board total calculates correctly
- [ ] "Save" button shows success feedback
- [ ] "Send to Client" changes status
- [ ] Responsive: sidebar below canvas on mobile (or "desktop only" message)

---

## Don't Touch

- Sidebar navigation (Agent 2 handles this)
- Dashboard
- Other pages
- Client Portal (Phase 2 agent handles integration)
