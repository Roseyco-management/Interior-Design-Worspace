# Agent 5: Client Portal - Selection Boards Integration

## Your Task
Add Selection Boards viewing and approval to the Client Portal.

**IMPORTANT:** This is Phase 2. Run this AFTER Phase 1 agents complete. The Selection Boards feature must exist first.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read (ONLY these files)
1. Client Portal layout/pages (likely in `src/app/(admin)/client-portal/` or similar)
2. Selection Boards components created by Agent 4 (in `src/components/selection-boards/`)
3. The BoardCard component to understand the data structure

**DO NOT explore the entire codebase. Read only what you need.**

---

## What to Build

Add a "Selection Boards" section to the Client Portal where clients can:
1. See boards sent to them
2. View board details
3. Approve or request changes

### Client Portal Navigation Update

Add "Selection Boards" to the client portal navigation:
```
Dashboard | Messages | Documents | Selection Boards | Approvals
```

### Selection Boards Section

**Location:** Add to client portal (e.g., `src/app/(admin)/client-portal/selections/page.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│ CLIENT PORTAL (Green theme)                                  │
├─────────────────────────────────────────────────────────────┤
│ Selection Boards                                             │
│                                                              │
│ Your designer has sent you selection boards to review.       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Kitchen Lighting                    Pending Review   │    │
│  │ Sent: Dec 22, 2025                                   │    │
│  │                                                      │    │
│  │ ┌───────┐ ┌───────┐ ┌───────┐                      │    │
│  │ │░░░░░░░│ │░░░░░░░│ │░░░░░░░│  +5 more             │    │
│  │ └───────┘ └───────┘ └───────┘                      │    │
│  │                                                      │    │
│  │ Total: $1,650                    [View & Respond]   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Living Room Furniture               ✓ Approved       │    │
│  │ Sent: Dec 18, 2025 | Approved: Dec 20, 2025         │    │
│  │                                                      │    │
│  │ ┌───────┐ ┌───────┐ ┌───────┐                      │    │
│  │ │░░░░░░░│ │░░░░░░░│ │░░░░░░░│  +9 more             │    │
│  │ └───────┘ └───────┘ └───────┘                      │    │
│  │                                                      │    │
│  │ Total: $12,400                         [View]       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Board Detail View (Client Perspective)

When client clicks "View & Respond":

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Boards                                             │
├─────────────────────────────────────────────────────────────┤
│ Kitchen Lighting                                             │
│ From: Angie (AF Designs) | Sent: Dec 22, 2025               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │     [Visual display of all items on the board]      │    │
│  │                                                      │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │    │
│  │  │Chandelier  │ Pendant  │  │ Sconce  │             │    │
│  │  │  $450   │  │  $180   │  │  $220   │             │    │
│  │  └─────────┘  └─────────┘  └─────────┘             │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Total: $1,650                                               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Your Feedback (optional)                             │    │
│  │ ┌─────────────────────────────────────────────────┐ │    │
│  │ │                                                  │ │    │
│  │ │ [Text area for comments]                        │ │    │
│  │ │                                                  │ │    │
│  │ └─────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  [Request Changes]                    [Approve Selections]   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Components to Create

### `src/components/client-portal/ClientBoardCard.tsx`
Simplified board card for client view - shows thumbnail preview, name, date, status, total.

### `src/components/client-portal/ClientBoardView.tsx`
Read-only view of the board with all items displayed. No editing - just viewing.

### `src/components/client-portal/BoardApprovalForm.tsx`
Comment textarea + Approve/Request Changes buttons.

---

## Interactions

1. **List View:**
   - Show only boards with status 'pending' or 'approved' (not drafts)
   - Pending boards show "View & Respond" button
   - Approved boards show "View" button

2. **Detail View:**
   - Display all items in a grid (not draggable - read only)
   - Show item name and price
   - Optional feedback textarea
   - "Approve Selections" → Sets status to 'approved', shows success message
   - "Request Changes" → Sets status to 'revision_requested', shows success message

3. **After Approval:**
   - Show green checkmark badge
   - Show approval date
   - Hide the approval buttons (already decided)

---

## Mock Data (Filter for Client)

The client should only see boards sent to them (status !== 'draft'):

```typescript
// Filter boards for client view
const clientBoards = mockBoards.filter(board =>
  board.status !== 'draft' && board.clientName === 'Sarah Mitchell'
);
```

---

## Green Theme Reminder

The Client Portal uses green accent color: `#10b981`

Apply to:
- Primary buttons: `bg-emerald-500 hover:bg-emerald-600`
- Active nav items
- Success states
- Links

---

## Success Criteria

- [ ] "Selection Boards" added to Client Portal navigation
- [ ] Selection boards list page shows pending and approved boards
- [ ] Board cards show thumbnail, name, status, total
- [ ] Clicking board opens detail view
- [ ] Detail view shows all items (read-only)
- [ ] Feedback textarea works
- [ ] "Approve Selections" button works (shows success)
- [ ] "Request Changes" button works (shows success)
- [ ] Approved boards show green checkmark
- [ ] Green theme consistent throughout
- [ ] Mobile responsive

---

## Don't Touch

- Main designer platform pages
- Selection Boards builder (that's for designers, not clients)
- Dashboard
- Sidebar navigation
