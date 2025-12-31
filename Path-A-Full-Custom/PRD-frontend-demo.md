# Path A: Full Custom Software
## Frontend Demo PRD

**Project:** AF Designs Interior Design Platform
**Path:** A - Full Custom Software Replacement
**Deliverable:** Interactive Frontend Demo (No Backend Required)
**Purpose:** Sales demo to show client what the complete custom solution would look like

---

## Executive Summary

Build a complete frontend demo of a custom interior design management platform that would replace ALL of the client's current software (Houzz Pro, HoneyBook, Basecamp, Canva).

This is a **clickable prototype** - pages should navigate to each other, but no actual data persistence or backend logic is needed. Use realistic mock data throughout.

---

## The Client Context

**Angie Finton** is a solo interior designer who currently uses:
- Houzz Pro ($65/mo → increasing to $249-495/mo) - Selection boards, materials, proposals, invoices
- HoneyBook ($30/mo) - CRM, contracts
- Basecamp ($30/mo) - Contractor coordination
- Canva - Mood boards
- Dropbox - File storage

**Pain Points:**
1. Sales tax - manually entering rates per vendor/product
2. Price updates - products go stale, manual updating
3. Contracts - repetitive template work
4. Moving clients between 5 different systems
5. Scattered client communication
6. Reports don't work in Houzz

**This demo shows:** What it would look like if everything was in ONE custom platform.

---

## Tech Stack for Demo

| Layer | Technology |
|-------|------------|
| Base Template | **TailAdmin Pro** (copy from `/Users/arnispiekus/Work/TailAdminPro/`) |
| Framework | Next.js 15 (App Router) - included in TailAdmin |
| Styling | Tailwind CSS 4.0 - included in TailAdmin |
| Components | TailAdmin UI components (already styled) |
| Animations | **Framer Motion** (add this: `npm install framer-motion`) |
| Charts | ApexCharts - included in TailAdmin |
| Icons | TailAdmin icons (66 custom icons in `src/icons/`) |

**IMPORTANT:** Start by copying TailAdmin Pro, then modify. See `/TAILADMIN-REFERENCE.md` for component mapping.

**No backend required** - all data is mock/hardcoded.

---

## Design Philosophy

**MUST READ:** `/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md`

### Key Design Requirements

1. **Clarity** - 3-5 key metrics on dashboard, generous whitespace
2. **Consistency** - Same patterns everywhere, buttons look like buttons
3. **Depth & Animation** - Framer Motion on all page transitions, modals slide up
4. **Responsive** - **Desktop AND mobile optimized** (both must work!)
5. **Touch Targets** - 44x44px minimum on mobile
6. **Performance** - Only animate `transform` and `opacity` (GPU-accelerated)

---

## Pages to Build

### 1. Dashboard (Home)
**Route:** `/`

The main landing page after login. Shows overview of everything.

**Components:**
- Header with logo, search, notifications bell, user avatar dropdown
- Sidebar navigation (collapsible)
- Stats cards:
  - Active Projects (number)
  - Pending Approvals (number)
  - Outstanding Invoices (amount)
  - This Month Revenue (amount)
- Recent Activity feed (list of recent actions)
- Upcoming Tasks (next 5 tasks with due dates)
- Quick Actions buttons (New Project, New Client, etc.)

**Mock Data:**
- 8 active projects
- 3 pending approvals
- $12,450 outstanding invoices
- $34,200 this month revenue

---

### 2. Clients (CRM)
**Route:** `/clients`

List of all clients with search/filter.

**Components:**
- Page header with "New Client" button
- Search bar
- Filter dropdown (All, Active, Past)
- Client cards or table rows showing:
  - Client name
  - Email
  - Phone
  - Active project (if any)
  - Total spent (lifetime)
  - Status badge (Active, Lead, Past)
- Pagination

**Mock Data:** 12-15 clients with realistic names and data

---

### 3. Client Detail
**Route:** `/clients/[id]`

Single client view with all their information.

**Tabs:**
- **Overview:** Contact info, notes, tags
- **Projects:** List of their projects (past and current)
- **Documents:** Contracts, proposals, invoices
- **Communication:** Message thread history
- **Payments:** Payment history

**Components:**
- Client header with name, avatar, contact buttons (email, phone)
- Tab navigation
- Content area based on selected tab

---

### 4. Projects List
**Route:** `/projects`

All projects with filters.

**Components:**
- Page header with "New Project" button
- View toggle (Grid / List)
- Filter by status: All, Design, Selections, Ordering, Installation, Complete
- Project cards showing:
  - Project name
  - Client name
  - Status badge
  - Budget (spent/total)
  - Progress bar
  - Last updated date

**Mock Data:** 8-10 projects in various stages

---

### 5. Project Detail
**Route:** `/projects/[id]`

Single project view - the main workspace.

**Tabs:**
- **Overview:** Project summary, timeline, budget snapshot
- **Selections:** Selection boards (product collections)
- **Mood Boards:** Design inspiration boards
- **Proposals:** Proposals for this project
- **Invoices:** Invoices for this project
- **Tasks:** To-do list
- **Files:** Project documents
- **Notes:** Project notes

**Key Sections in Overview:**
- Project info card (client, address, start date, status)
- Budget tracker (visual - spent vs remaining)
- Timeline/milestones
- Team members (designer, contractors assigned)

---

### 6. Selection Board View
**Route:** `/projects/[id]/selections/[boardId]`

Visual board of products for client approval.

**Components:**
- Board header with name, room (e.g., "Kitchen - Appliances")
- Grid of product cards:
  - Product image
  - Product name
  - Vendor
  - Price
  - Status badge (Pending, Approved, Rejected, Ordered)
  - Approve/Reject buttons (for demo, just visual)
- Sidebar showing:
  - Board total
  - Approval progress (X of Y approved)
  - Export/Share buttons

**Mock Data:** 8-12 products per board with images (use placeholder images)

---

### 7. Materials Library
**Route:** `/materials`

Searchable product database.

**Components:**
- Search bar with filters:
  - Category dropdown (Lighting, Plumbing, Tile, Furniture, etc.)
  - Vendor dropdown
  - Price range
- Grid of product cards:
  - Product image
  - Name
  - Vendor
  - Price
  - "Last Updated" date
  - Price change indicator (up/down arrow if changed)
- "Add Product" button
- Bulk actions

**Mock Data:** 30-50 products across categories

---

### 8. Product Detail
**Route:** `/materials/[id]`

Single product view.

**Components:**
- Image gallery (multiple images)
- Product info:
  - Name
  - SKU
  - Vendor
  - Current price
  - Price history chart (simple line chart)
  - Dimensions
  - Lead time
  - Link to vendor website
- "Add to Selection Board" button
- "Edit" button
- Usage section: "Used in X projects"

---

### 9. Vendors
**Route:** `/vendors`

Vendor database.

**Components:**
- Vendor list/table:
  - Vendor name
  - Contact info
  - Account number
  - Tax rate
  - Total orders (count)
  - "Has API" badge (for Ferguson, etc.)
- Search and filter
- "Add Vendor" button

**Mock Data:** 15-20 vendors (Ferguson, Build.com, local suppliers, etc.)

---

### 10. Proposals
**Route:** `/proposals`

All proposals.

**Components:**
- Proposal list showing:
  - Proposal name/number
  - Client
  - Project
  - Amount
  - Status (Draft, Sent, Viewed, Signed, Expired)
  - Date
- Filters by status
- "New Proposal" button

---

### 11. Proposal Detail / Editor
**Route:** `/proposals/[id]`

Create/view proposal.

**Components:**
- Proposal header (client, project, date, status)
- Line items table:
  - Product/Service
  - Description
  - Quantity
  - Unit Price
  - Tax (auto-calculated badge showing "TaxJar")
  - Total
- Add line item button
- Subtotal, Tax, Total display
- Terms and conditions section
- Signature area (for viewing signed proposals)
- Action buttons: Save Draft, Send to Client, Download PDF

**Key Feature to Highlight:** Tax is auto-calculated with a small "Powered by TaxJar" indicator

---

### 12. Invoices
**Route:** `/invoices`

All invoices.

**Components:**
- Invoice list showing:
  - Invoice number
  - Client
  - Amount
  - Status (Draft, Sent, Paid, Overdue)
  - Due date
  - Paid date (if paid)
- Filters by status
- "New Invoice" button

---

### 13. Invoice Detail
**Route:** `/invoices/[id]`

Single invoice view.

**Components:**
- Invoice header with status badge
- Client info
- Line items table
- Payment history (if partial payments)
- Payment button (shows Stripe integration concept)
- Send reminder button
- "Synced to QuickBooks" indicator

---

### 14. Client Portal Preview
**Route:** `/portal-preview`

Show what the CLIENT would see (different UI).

**Simpler interface showing:**
- Welcome message
- Current project status
- Pending items to review:
  - Mood boards to comment on
  - Proposals to sign
  - Invoices to pay
- Messages with designer
- Project timeline

**Note:** This is a preview - style it differently (maybe lighter theme) to show it's the client's view.

---

### 15. Contractor Portal Preview
**Route:** `/contractor-preview`

Show what CONTRACTORS would see.

**Simple interface showing:**
- Assigned projects
- Tasks for this week
- Mark task complete button
- Upload photos button
- Project files access
- Message designer

---

### 16. Calendar
**Route:** `/calendar`

Calendar view of tasks, milestones, deliveries.

**Components:**
- Month view calendar
- Events color-coded by type:
  - Tasks (blue)
  - Milestones (green)
  - Deliveries (orange)
  - Meetings (purple)
- Click event to see details
- "Google Calendar Sync" indicator

---

### 17. Reports
**Route:** `/reports`

Financial and project reports.

**Report Cards:**
- Revenue by Month (bar chart)
- Project Profitability (table)
- Outstanding Invoices (A/R aging)
- Sales Tax Liability (with "Export for Filing" button)
- Vendor Spending (pie chart)
- Products by Usage (table)

**Key Feature:** Sales Tax Liability report that actually works (unlike Houzz)

---

### 18. Settings
**Route:** `/settings`

App configuration.

**Sections:**
- Profile (name, email, avatar)
- Company Info (business name, address, logo)
- Integrations:
  - QuickBooks (Connected - green badge)
  - TaxJar (Connected - green badge)
  - Stripe (Connected - green badge)
  - Google Calendar (Connect button)
- Tax Settings (default rates, TaxJar config)
- Email Templates
- Contract Templates
- Notification Preferences

---

## Navigation Structure

### Sidebar Navigation

```
Dashboard
Clients
Projects
Materials
  └─ Products
  └─ Vendors
Financials
  └─ Proposals
  └─ Invoices
  └─ Reports
Calendar
Settings
---
Portal Previews (for demo)
  └─ Client Portal
  └─ Contractor Portal
```

---

## Design Guidelines

### Visual Style
- Clean, modern, professional
- Light mode (white/gray backgrounds)
- Primary color: Blue (#3B82F6 or similar)
- Accent colors for status badges:
  - Green: Approved, Paid, Complete
  - Yellow: Pending, In Progress
  - Red: Rejected, Overdue
  - Gray: Draft

### Components to Use (shadcn/ui)
- Card
- Button
- Table
- Tabs
- Badge
- Avatar
- Dialog (for modals)
- Dropdown Menu
- Input, Select, Textarea
- Calendar
- Chart (use recharts or similar)

### Responsive
- Desktop-first but should look okay on tablet
- Collapsible sidebar for smaller screens

---

## Mock Data Requirements

### Clients (12-15)
```
- Name, email, phone, address
- Status: Active, Lead, Past
- Total spent
- Current project (if any)
```

### Projects (8-10)
```
- Name (e.g., "Dickey Kitchen Remodel", "Gosche Master Bath")
- Client reference
- Status: Design, Selections, Ordering, Installation, Complete
- Budget: estimated, spent
- Start date, target completion
- Address
```

### Products (30-50)
```
- Name, SKU
- Vendor
- Category
- Price (current)
- Images (use placeholder or real product images)
- Dimensions
- Last updated date
```

### Vendors (15-20)
```
- Ferguson
- Build.com
- Crate & Barrel
- West Elm
- Restoration Hardware
- Local suppliers (made up names)
- Include tax rates per vendor
```

### Selection Boards (3-4 per project)
```
- Board name (e.g., "Kitchen - Appliances", "Master Bath - Fixtures")
- Products with approval status
```

### Proposals (5-8)
```
- Various statuses
- Line items from products
- Tax calculated
```

### Invoices (8-12)
```
- Various statuses
- Payment history for some
```

---

## Key Features to Highlight in Demo

These are the "wow" moments to emphasize:

1. **Single Dashboard** - Everything in one place
2. **Materials Library with Price Tracking** - Shows price history, auto-update indicators
3. **Auto Tax Calculation** - TaxJar badge on proposals/invoices
4. **Client Portal** - Clean interface for client approvals
5. **QuickBooks Sync** - "Synced" indicators
6. **Reports That Work** - Especially Sales Tax Liability
7. **Selection Boards** - Visual product approval workflow

---

## File Structure Suggestion

```
/app
  /page.tsx (Dashboard)
  /clients
    /page.tsx (Client list)
    /[id]/page.tsx (Client detail)
  /projects
    /page.tsx (Project list)
    /[id]/page.tsx (Project detail)
    /[id]/selections/[boardId]/page.tsx
  /materials
    /page.tsx (Products list)
    /[id]/page.tsx (Product detail)
  /vendors
    /page.tsx
  /proposals
    /page.tsx
    /[id]/page.tsx
  /invoices
    /page.tsx
    /[id]/page.tsx
  /calendar
    /page.tsx
  /reports
    /page.tsx
  /settings
    /page.tsx
  /portal-preview
    /page.tsx
  /contractor-preview
    /page.tsx
/components
  /ui (shadcn components)
  /layout
    /sidebar.tsx
    /header.tsx
  /dashboard
  /clients
  /projects
  /materials
  /financials
/lib
  /mock-data.ts (all mock data)
  /utils.ts
```

---

## Deliverables

1. **Fully navigable Next.js application**
   - All pages listed above
   - Working navigation between pages
   - Realistic mock data throughout

2. **No backend required**
   - All data hardcoded or in mock-data.ts
   - Forms can show success states but don't need to persist

3. **Professional appearance**
   - Should look like a real SaaS product
   - Consistent styling throughout
   - Responsive enough for tablet

4. **Demo-ready**
   - Can be deployed to Vercel for client presentation
   - Or run locally with `npm run dev`

---

## Out of Scope for Demo

- Actual authentication (fake logged-in state)
- Real database or API
- File uploads
- Email sending
- Payment processing
- PDF generation
- Actual integrations

---

## Estimated Effort

For an experienced developer:
- Core pages and navigation: 4-6 hours
- Mock data setup: 1-2 hours
- Styling and polish: 2-3 hours
- **Total: 8-12 hours**

---

## Success Criteria

The demo is successful if:
1. Client can see every major feature visualized
2. Navigation feels like a real app
3. Data looks realistic
4. Pain points (tax, price tracking, scattered systems) are clearly addressed
5. Client portal preview shows the "client experience"
