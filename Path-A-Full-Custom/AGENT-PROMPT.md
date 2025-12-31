# Agent A Prompt: Full Custom Software Demo

## Your Mission

You are building a **frontend demo** for a full custom interior design management platform.

## CRITICAL: Use TailAdmin Pro (Don't Build From Scratch!)

We have TailAdmin Pro available at:
```
/Users/arnispiekus/Work/TailAdminPro/
```

**Copy it first, then modify it.** This will save 80% of development time.

---

## Required Reading (In Order)

1. **`/TAILADMIN-REFERENCE.md`** - Component mapping and usage guide
2. **`/Path-A-Full-Custom/PRD-frontend-demo.md`** - Complete requirements
3. **`/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md`** - Design philosophy (MUST FOLLOW)
4. `/meeting-transcript.md` - Client context (optional)

---

## Quick Start

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom

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

## What to Build (Modify TailAdmin)

### 1. Sidebar Navigation
Modify `src/layout/AppSidebar.tsx`:
- Dashboard
- Clients (CRM)
- Projects
- Materials Library
- Proposals
- Invoices
- Client Portal (preview)
- Contractor Portal (preview)
- Settings

### 2. Dashboard
Start with: `src/app/(admin)/(home)/crm/page.tsx`
- Adapt CRM metrics for interior design
- Active projects count
- Pending proposals
- Revenue this month
- Upcoming deadlines

### 3. Clients Page
Start with: `src/components/ecommerce/ProductListTable.tsx`
- Rename to ClientsTable
- Add contact info, project history
- Click opens client detail modal

### 4. Projects Page
Combine: `src/components/task/` + `src/components/invoice/InvoiceList.tsx`
- Project list with status badges
- Click for project detail (tabs: Overview, Materials, Documents, Timeline)

### 5. Materials Library (KEY DIFFERENTIATOR!)
Start with: `src/components/ecommerce/ProductListTable.tsx`
- Product catalog with images
- **Price tracking indicators** (price change badges)
- "Last updated" timestamps
- Vendor information

### 6. Proposals
Start with: `src/components/invoice/`
- List view from InvoiceList.tsx
- Create/edit from CreateInvoiceTable.tsx
- **Add TaxJar badge** showing auto tax calculation
- Status: Draft, Sent, Approved, Rejected

### 7. Invoices
Start with: `src/components/invoice/`
- Use mostly as-is
- **Add QuickBooks sync indicator** (badge or icon)
- Payment status tracking

### 8. Client Portal (Separate Layout)
- Create new layout with green accent color
- Use `src/components/chats/` for messaging
- Simple: Dashboard, Messages, Documents, Approvals
- Mobile-optimized

### 9. Contractor Portal (Separate Layout)
- Create minimal layout with orange accent color
- Very simple: Tasks, Messages
- Focus on mobile usability

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

## Color Scheme

| Area | Primary Color | Usage |
|------|--------------|-------|
| Designer Platform | Blue (default TailAdmin) | Main app |
| Client Portal | Green `#10b981` | Separate area |
| Contractor Portal | Orange `#f59e0b` | Separate area |
| Badges | Various | Status indicators |

---

## Priority Order (If Time Limited)

1. Copy TailAdmin Pro and get it running
2. Modify sidebar navigation
3. Dashboard (modify CRM dashboard)
4. Materials Library (show price tracking - key feature!)
5. Proposals (show TaxJar - key feature!)
6. Client Portal with messaging
7. Projects list/detail
8. Clients list
9. Invoices
10. Contractor Portal

---

## Success Criteria

- Fully navigable between all pages
- Realistic mock data throughout
- Framer Motion animations on page transitions and modals
- **Works on both desktop AND mobile** (test both!)
- Professional appearance matching Apple/Revolut quality
- Key differentiators visible:
  - Price tracking in Materials Library
  - TaxJar badge in Proposals
  - QuickBooks indicator in Invoices
  - Centralized messaging in Client Portal

---

## Don't Worry About

- Authentication (fake logged-in state)
- Real API calls
- Data persistence
- Actual file uploads
- PDF generation
- Real integrations

---

## Output Location

All work goes in: `/Path-A-Full-Custom/demo/`

Test with: `npm run dev` → http://localhost:3000
