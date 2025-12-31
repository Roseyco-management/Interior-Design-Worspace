# Agent D: Selection Boards Refinement

## Your Task
Refine the Selection Boards feature with better organization, cleaner canvas, and comments.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Selection Boards list page
2. Selection Board builder page
3. Board components in `src/components/selection-boards/`

## Changes Needed

### 1. Organize by Client → Project → Boards

Currently boards are flat. Need hierarchy: **Client → Project → Boards**

**Update List Page Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│ Selection Boards                              [+ New Board] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 🔽 Sarah Mitchell - Riverside Residence          3 boards   │
│    ├── Kitchen Lighting (8 items) ●Approved                 │
│    ├── Living Room Furniture (12 items) ●Pending            │
│    └── Master Bath (4 items) ●Draft                         │
│                                                              │
│ 🔽 James Wong - Downtown Loft                    2 boards   │
│    ├── Main Living Space (15 items) ●Approved               │
│    └── Home Office (6 items) ●Pending                       │
│                                                              │
│ ▶ The Hendersons - Suburban Remodel              1 board    │
│                                                              │
│ ▶ Marcus Chen - Beach House                      2 boards   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Data Structure:**
```typescript
interface SelectionBoardGroup {
  clientId: string;
  clientName: string;
  projectName: string;
  boards: SelectionBoard[];
}
```

**Behavior:**
- Collapsed by default, click to expand
- Show board count per client/project
- Can still filter/search across all boards

### 2. Canvas Styling Changes

**Current:** Gray dashed border, items show name + price
**New:** White/clean background, items show IMAGE ONLY

```
BEFORE:                          AFTER:
┌─────────────────────┐         ┌─────────────────────┐
│ ┌───────┐           │         │ ┌───────┐           │
│ │ image │           │         │ │       │           │
│ │───────│           │         │ │ image │           │
│ │ Name  │           │         │ │ only  │           │
│ │ $450  │           │         │ │       │           │
│ └───────┘           │         │ └───────┘           │
│    (gray bg)        │         │    (white bg)       │
└─────────────────────┘         └─────────────────────┘
```

**Canvas changes:**
- Background: `bg-white` (not gray)
- Border: subtle `border border-gray-200` (not dashed)
- Rounded corners: `rounded-xl`

**Item changes:**
- Show ONLY the image on canvas
- Remove name and price labels from canvas items
- Keep name/price in the sidebar product picker (important for selecting)
- On hover: show small tooltip with name/price
- Items should have subtle shadow: `shadow-md`

### 3. Add Comments Section

Below the canvas, add a comments section for designer-client discussion:

```
┌─────────────────────────────────────────────────────────────┐
│ Kitchen Lighting                    [Save] [Send to Client] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │              [WHITE CANVAS WITH IMAGES]              │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  3 items                              Board Total: $1,690   │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Comments                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 Sarah Mitchell • Dec 28, 2024                    │   │
│  │ "Love the chandelier! Can we see a brass option     │   │
│  │  for the pendants instead of chrome?"               │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 AF Designs • Dec 28, 2024                        │   │
│  │ "Absolutely! I've swapped them out. The brass       │   │
│  │  complements the chandelier beautifully."           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Add a comment...                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                              [Post Comment] │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Comment Structure:**
```typescript
interface BoardComment {
  id: string;
  boardId: string;
  author: {
    name: string;
    role: 'designer' | 'client';
    avatar?: string;
  };
  content: string;
  createdAt: string;
}
```

### 4. Update "New Board" Flow

When creating a new board, require:
1. Select Client (dropdown)
2. Select Project (dropdown, filtered by client)
3. Board Name (text input)
4. Room/Area (optional, e.g., "Kitchen", "Living Room")

```
┌─────────────────────────────────────────────────────────────┐
│ Create New Selection Board                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Client *                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Select a client...                              ▼   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Project *                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Select a project...                             ▼   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Board Name *                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ e.g., Kitchen Lighting                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Room/Area (optional)                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ e.g., Kitchen, Living Room, Master Bath             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│                            [Cancel]  [Create Board]         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Mock Data Updates

```typescript
const boardsByClient = [
  {
    clientId: 'c1',
    clientName: 'Sarah Mitchell',
    projectName: 'Riverside Residence',
    boards: [
      { id: 'b1', name: 'Kitchen Lighting', items: 8, status: 'approved', total: 1650 },
      { id: 'b2', name: 'Living Room Furniture', items: 12, status: 'pending', total: 12400 },
      { id: 'b3', name: 'Master Bath', items: 4, status: 'draft', total: 2800 },
    ]
  },
  {
    clientId: 'c2',
    clientName: 'James Wong',
    projectName: 'Downtown Loft',
    boards: [
      { id: 'b4', name: 'Main Living Space', items: 15, status: 'approved', total: 28500 },
      { id: 'b5', name: 'Home Office', items: 6, status: 'pending', total: 4200 },
    ]
  },
  // ... more
];

const mockComments: BoardComment[] = [
  {
    id: 'cm1',
    boardId: 'b1',
    author: { name: 'Sarah Mitchell', role: 'client' },
    content: 'Love the chandelier! Can we see a brass option for the pendants instead of chrome?',
    createdAt: '2024-12-28T10:30:00'
  },
  {
    id: 'cm2',
    boardId: 'b1',
    author: { name: 'AF Designs', role: 'designer' },
    content: "Absolutely! I've swapped them out. The brass complements the chandelier beautifully.",
    createdAt: '2024-12-28T14:15:00'
  }
];
```

## Components to Create/Update

### Update: `BoardCanvas.tsx`
- Change background to white
- Change border to subtle solid
- Items show image only (no text labels)

### Update: `BoardItem.tsx`
- Remove name/price display
- Add hover tooltip with name + price
- Add subtle shadow

### Create: `BoardComments.tsx`
```typescript
export function BoardComments({ boardId }: { boardId: string }) {
  // Comment list + input form
}
```

### Create: `ClientProjectTree.tsx`
```typescript
export function ClientProjectTree({ groups, onSelectBoard }: Props) {
  // Collapsible tree view grouped by client/project
}
```

### Update: `NewBoardModal.tsx` or create page
- Add client/project dropdowns
- Filter projects by selected client

## Success Criteria

- [ ] Boards list organized by Client → Project
- [ ] Collapsible groups showing board count
- [ ] Canvas background is white (not gray)
- [ ] Canvas border is subtle solid (not dashed)
- [ ] Items on canvas show IMAGE ONLY
- [ ] Hovering item shows tooltip with name/price
- [ ] Comments section below canvas
- [ ] Can post new comments (mock save)
- [ ] Comments show author, timestamp, content
- [ ] New board form has client/project dropdowns
- [ ] Board total still displays correctly
- [ ] Drag and drop still works

## Don't Touch

- Product sidebar (keep name/price there)
- Other pages
- Client Portal (another agent handles that)
