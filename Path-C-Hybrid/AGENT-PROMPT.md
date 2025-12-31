# Agent C Prompt: Hybrid Solution Demo

## Your Mission

You are building a **partial frontend demo** showing the hybrid approach: custom software for some functions, Houzz Pro kept for selection boards.

## CRITICAL: Use TailAdmin Pro (Don't Build From Scratch!)

We have TailAdmin Pro available at:
```
/Users/arnispiekus/Work/TailAdminPro/
```

**Copy it first, then modify it.** This will save 80% of development time.

---

## Required Reading (In Order)

1. **`/TAILADMIN-REFERENCE.md`** - Component mapping and usage guide
2. **`/Path-C-Hybrid/PRD-hybrid-demo.md`** - Complete requirements
3. **`/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md`** - Design philosophy (MUST FOLLOW)
4. `/meeting-transcript.md` - Client context (optional)

---

## Quick Start

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-C-Hybrid

# Copy TailAdmin Pro as your base
cp -r /Users/arnispiekus/Work/TailAdminPro/* ./demo/

cd demo

# Install dependencies
npm install

# Add Framer Motion for premium animations
npm install framer-motion

# Start dev server
npm run dev
```

---

## Key Concept: Show the Bridge

This demo MUST clearly communicate:

1. **What's CUSTOM** → CRM, Materials Library, Portals, Proposals
2. **What stays in HOUZZ** → Selection boards, product sourcing
3. **How they CONNECT** → "View in Houzz" links, import tools

**Use purple/pink highlighting** for all Houzz integration points to make them immediately visible.

---

## Design Philosophy Requirements

Follow the Apple/Revolut design principles document. Key points:

### Clarity
- Show only what user needs for current task
- Generous whitespace - never fill every pixel
- 3-5 key metrics on dashboard, not 20 widgets

### Consistency
- Buttons look like buttons
- Actions in expected locations (delete = red, confirm = blue)
- Same patterns everywhere (lists behave identically)

### Depth & Animation
- Use Framer Motion for all page transitions
- Modals slide up from bottom (mobile) or fade in (desktop)
- Subtle shadows for depth (never harsh)
- All animations 200-400ms, GPU-accelerated (transform, opacity only)

### Mobile-First & Responsive
- **Desktop AND mobile optimized** - both must work perfectly
- 44x44px minimum touch targets
- Primary actions at bottom on mobile
- Test on both screen sizes

---

## Visual Differentiation (IMPORTANT!)

| Area | Primary Color | Notes |
|------|--------------|-------|
| Designer Platform | Blue (default) | Dark sidebar |
| Client Portal | Green `#10b981` | Light/simple layout |
| Contractor Portal | Orange `#f59e0b` | Very minimal |
| **Houzz Integration** | Purple `#a855f7` / Pink `#ec4899` | Highlight boxes |

### Houzz Reference Styling

Create a reusable component for Houzz links:

```typescript
// HouzzLink.tsx
export function HouzzLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 bg-purple-100 border border-purple-300 rounded-lg text-purple-700 hover:bg-purple-200 transition-colors"
      target="_blank"
    >
      <HouzzIcon className="w-4 h-4" />
      {children}
    </a>
  );
}
```

---

## What to Build (Modify TailAdmin)

### 1. Sidebar Navigation
Modify `src/layout/AppSidebar.tsx`:
- Dashboard
- Clients (CRM)
- Projects (with Selections tab!)
- Materials Library
- Proposals
- Client Portal (preview)
- Contractor Portal (preview)
- How It Works (architecture diagram)
- Settings

### 2. Dashboard
Start with: `src/app/(admin)/(home)/crm/page.tsx`
- Adapt for interior design metrics
- Add Houzz Quick Links card (purple highlight):
  - "Open Houzz Pro →"
  - "View Selection Boards →"
  - "Browse Products →"

### 3. Projects Page with Selections Tab (KEY!)
Start with: `src/components/invoice/InvoiceList.tsx`
- Project list with status
- Project detail with tabs:
  - Overview
  - **Selections** ← MOST IMPORTANT TAB
  - Materials
  - Documents

**Selections Tab Content:**
```
┌─────────────────────────────────────────────────┐
│ Selections                                       │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 🟣 Houzz Selection Boards                   │ │
│ │                                              │ │
│ │ [View in Houzz Pro →]                        │ │
│ │                                              │ │
│ │ Last synced: Dec 30, 2025 2:45 PM           │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ Imported Items (12)                    [Import] │
│ ┌────────────────────────────────────────────┐  │
│ │ Chandelier - Price $450                    │  │
│ │ Sofa - Price $2,800                        │  │
│ └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 4. Materials Library (KEY DIFFERENTIATOR!)
Start with: `src/components/ecommerce/ProductListTable.tsx`
- Product catalog with images
- **Price change tracking** (badges showing +/- from last check)
- "Last updated" timestamps
- Vendor information
- "View on Vendor Site" links

**Price Change Badge Examples:**
```typescript
<Badge variant="success">↓ $50</Badge>    // Price dropped
<Badge variant="danger">↑ $120</Badge>     // Price increased
<Badge variant="secondary">No change</Badge>
```

### 5. Proposals
Start with: `src/components/invoice/`
- Line items from Materials Library
- **TaxJar badge** showing auto tax calculation
- Status workflow

### 6. Client Portal (Separate Layout)
- Green accent color theme
- Simple layout, mobile-first
- **Centralized messaging** (use `src/components/chats/`)
  - All communication in one place
  - Thread history
- Dashboard, Messages, Documents, Approvals

### 7. Contractor Portal (Minimal)
- Orange accent color
- Very simple: Tasks, Messages
- Mobile-optimized

### 8. "How It Works" Page (Architecture Diagram)
Create a visual explanation page showing:
```
┌─────────────────────────────────────────────────────────┐
│              How the Hybrid System Works                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│    ┌──────────────┐        ┌──────────────┐             │
│    │   CUSTOM     │        │   HOUZZ      │             │
│    │   PLATFORM   │  ←──→  │   PRO        │             │
│    └──────────────┘        └──────────────┘             │
│          │                       │                       │
│    ┌─────┴─────┐           ┌────┴────┐                  │
│    │ CRM       │           │Selections│                  │
│    │ Materials │           │Sourcing  │                  │
│    │ Proposals │           │Chrome Ext│                  │
│    │ Invoices  │           └──────────┘                  │
│    │ Portals   │                                         │
│    └───────────┘                                         │
│                                                          │
│    [Legend]                                              │
│    🔵 Built custom - full control                        │
│    🟣 Stays in Houzz - what works, stays                │
│    ↔️ Manual bridge - import/export tools                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Framer Motion Implementation

Add to every page:

```typescript
'use client';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      {/* Page content */}
    </motion.div>
  );
}
```

For modals (iOS-style sheet):
```typescript
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
>
  {/* Modal content */}
</motion.div>
```

---

## Priority Order (If Time Limited)

1. Copy TailAdmin Pro and get it running
2. Modify sidebar navigation
3. Dashboard with Houzz quick links (purple highlight)
4. **Materials Library with price tracking** (key feature!)
5. **Project detail with Selections tab** (shows Houzz integration)
6. Client Portal with centralized messaging
7. "How It Works" architecture page
8. Proposals
9. Clients list
10. Contractor Portal

---

## Success Criteria

- Clear visual distinction between custom and Houzz parts
- "View in Houzz" links feel natural, not clunky
- Purple/pink highlighting makes integration points obvious
- Client portal shows value of centralized communication
- Materials library shows price tracking feature
- **Feels pragmatic, not over-engineered**
- Framer Motion animations on all transitions
- **Works on both desktop AND mobile** (test both!)

---

## Don't Worry About

- Authentication
- Real backend
- File uploads
- PDF generation
- Actual Houzz integration (just mock links)
- Real price scraping

---

## Output Location

All work goes in: `/Path-C-Hybrid/demo/`

Test with: `npm run dev` → http://localhost:3000
