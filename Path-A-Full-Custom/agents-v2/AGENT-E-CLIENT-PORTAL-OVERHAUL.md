# Agent E: Client Portal Overhaul

## Your Task
Overhaul the Client Portal: add sidebar navigation and show actual mood board canvas layout.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Current Client Portal pages (likely in `src/app/(admin)/client-portal/` or separate layout)
2. Selection Board builder canvas component (to understand layout)

## Major Changes Needed

### 1. Replace Header Nav with Sidebar

**Current:** Menu items in header (Dashboard, My Project, Selection Boards, Documents, Messages, Invoices)

**New:** Sidebar navigation like the main admin app

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌──────────────┐                                                   │
│ │ AF           │  Client Portal                                    │
│ │ Designs      │  ─────────────────────────────────────────────── │
│ │              │                                                   │
│ │ MENU         │  [Page Content Here]                             │
│ │              │                                                   │
│ │ 🏠 Dashboard │                                                   │
│ │ 📁 My Project│                                                   │
│ │ 🎨 Selections│                                                   │
│ │ 📄 Documents │                                                   │
│ │ 💬 Messages  │                                                   │
│ │ 💵 Invoices  │                                                   │
│ │              │                                                   │
│ │ ───────────  │                                                   │
│ │              │                                                   │
│ │ 👤 John D.   │                                                   │
│ │    Client    │                                                   │
│ └──────────────┘                                                   │
└────────────────────────────────────────────────────────────────────┘
```

**Sidebar Specs:**
- Green accent color (`#10b981` / emerald-500)
- Collapsible on mobile (hamburger menu)
- Show client name at bottom
- "AF Designs" branding at top
- Active page highlighted in green

### 2. Show Actual Mood Board Canvas (Not Photo Grid)

**Current:** Selection boards show as a simple grid of product photos
**New:** Show the actual canvas layout as the designer arranged it

```
CURRENT (Bad):                    NEW (Good):
┌───────────────────────┐        ┌───────────────────────────┐
│ Kitchen Lighting      │        │ Kitchen Lighting          │
│                       │        │                           │
│ ┌─────┐ ┌─────┐      │        │ ┌─────────────────────┐   │
│ │ img │ │ img │      │        │ │                     │   │
│ └─────┘ └─────┘      │        │ │  [Canvas showing    │   │
│ ┌─────┐ ┌─────┐      │        │ │   items as          │   │
│ │ img │ │ img │      │        │ │   designer          │   │
│ └─────┘ └─────┘      │        │ │   arranged them]    │   │
│                       │        │ │                     │   │
│ (just a photo grid)   │        │ └─────────────────────┘   │
└───────────────────────┘        │                           │
                                  │ Total: $1,690            │
                                  └───────────────────────────┘
```

**Implementation:**
- Reuse the canvas display from Selection Boards
- Make it READ-ONLY (no drag/drop for clients)
- Show items at their saved positions
- Items should show image only (matching admin canvas)
- Below canvas: show item list with names/prices for reference

### 3. Selection Boards Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Selection Boards                                             │
│ Review and approve your design selections                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Kitchen Lighting                     ●Pending Review │     │
│ │ Sent: Dec 22, 2024                                   │     │
│ │                                                      │     │
│ │ ┌─────────────────────────────────────────────────┐ │     │
│ │ │ [Actual canvas layout - read only]              │ │     │
│ │ │                                                  │ │     │
│ │ │    ┌─────┐  ┌─────┐                            │ │     │
│ │ │    │ img │  │ img │                            │ │     │
│ │ │    └─────┘  └─────┘                            │ │     │
│ │ │         ┌─────┐                                │ │     │
│ │ │         │ img │                                │ │     │
│ │ │         └─────┘                                │ │     │
│ │ └─────────────────────────────────────────────────┘ │     │
│ │                                                      │     │
│ │ Items:                                               │     │
│ │ • Sputnik Chandelier - $890                         │     │
│ │ • Modern Pendant Light - $380                       │     │
│ │ • Wall Sconce Pair - $420                           │     │
│ │                                                      │     │
│ │ Total: $1,690                                        │     │
│ │                                                      │     │
│ │ ┌─────────────────────────────────────────────────┐ │     │
│ │ │ Your Feedback:                                   │ │     │
│ │ │ ┌─────────────────────────────────────────────┐ │ │     │
│ │ │ │ Optional comments...                        │ │ │     │
│ │ │ └─────────────────────────────────────────────┘ │ │     │
│ │ └─────────────────────────────────────────────────┘ │     │
│ │                                                      │     │
│ │        [Request Changes]      [✓ Approve Selections] │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                              │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Living Room Furniture                   ✓ Approved   │     │
│ │ Approved: Dec 20, 2024                               │     │
│ │ ...                                                  │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4. Create Client Sidebar Layout

Create a new layout for client portal with sidebar:

```typescript
// src/app/client-portal/layout.tsx

export default function ClientPortalLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <ClientSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
```

### 5. Client Sidebar Component

```typescript
// src/components/client-portal/ClientSidebar.tsx

const clientNavItems = [
  { label: 'Dashboard', href: '/client-portal', icon: HomeIcon },
  { label: 'My Project', href: '/client-portal/project', icon: FolderIcon },
  { label: 'Selections', href: '/client-portal/selections', icon: SwatchIcon },
  { label: 'Documents', href: '/client-portal/documents', icon: DocumentIcon },
  { label: 'Messages', href: '/client-portal/messages', icon: ChatIcon },
  { label: 'Invoices', href: '/client-portal/invoices', icon: CurrencyIcon },
];

export function ClientSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <span className="text-xl font-semibold">AF Designs</span>
        <p className="text-sm text-gray-500">Client Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {clientNavItems.map(item => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            activeClassName="bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Client info */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-600 font-medium">JD</span>
          </div>
          <div>
            <p className="font-medium">John Davis</p>
            <p className="text-sm text-gray-500">Client</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

### 6. Read-Only Canvas Component

```typescript
// src/components/client-portal/ReadOnlyCanvas.tsx

export function ReadOnlyCanvas({ items }: { items: BoardItem[] }) {
  return (
    <div className="relative w-full h-[400px] bg-white rounded-xl border border-gray-200">
      {items.map(item => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: item.position.x,
            top: item.position.y,
            width: item.size.width,
          }}
          className="shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
```

## Color Theme Reminder

Client Portal uses **green/emerald** theme:
- Primary: `emerald-500` (#10b981)
- Hover: `emerald-600`
- Light bg: `emerald-50`
- Border accent: `emerald-500`

## Success Criteria

- [ ] Header nav replaced with sidebar
- [ ] Sidebar has green accent color
- [ ] Sidebar shows: Dashboard, My Project, Selections, Documents, Messages, Invoices
- [ ] Client name/avatar at bottom of sidebar
- [ ] Sidebar collapses on mobile
- [ ] Selection boards show actual canvas layout (not photo grid)
- [ ] Canvas is read-only (no drag/drop)
- [ ] Items list with names/prices shown below canvas
- [ ] Approve/Request Changes buttons work
- [ ] Feedback textarea exists
- [ ] Green theme consistent throughout
- [ ] Responsive on mobile

## Don't Touch

- Admin Selection Boards builder
- Main admin sidebar
- Other portals
