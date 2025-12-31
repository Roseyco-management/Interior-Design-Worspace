# Path C: Hybrid Solution
## Frontend Demo + Architecture PRD

**Project:** AF Designs Interior Design Platform
**Path:** C - Hybrid (Custom Software + Keep Houzz for Selections)
**Deliverable:** Partial Frontend Demo + Architecture Diagram
**Purpose:** Sales demo showing the "best of both worlds" approach

---

## Executive Summary

Build a partial frontend demo showing custom software for **what makes sense to build**, while demonstrating how **Houzz Pro remains for selection boards** (which it does well).

**Key Concept:** Don't replace everything. Replace what's broken, keep what works.

### What Gets Built (Custom)
- CRM / Client Management
- Client Portal
- Contractor Portal
- Materials Database (with price scraping)
- Proposals & Invoicing
- Project Management Dashboard

### What Stays (Houzz Pro)
- Selection Boards
- Product Clipping (Chrome extension)
- Client selection approval workflow

---

## The Client Context

**Why Hybrid Makes Sense:**

1. **Houzz Pro selection boards are good** - Visual product boards with client approval workflow work well
2. **Chrome clipper is valuable** - Quickly clips products from any website
3. **But everything else is painful** - CRM in HoneyBook, contractors in Basecamp, scattered communication

**Hybrid solves:**
- Sales tax (TaxJar integration in custom invoicing)
- Price updates (materials database with scraping)
- Scattered communication (client portal)
- Multiple logins (centralized dashboard)

**Hybrid accepts:**
- Selection approval stays in Houzz
- One manual step: copy approved selections to custom platform for invoicing

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PATH C: HYBRID ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      CUSTOM PLATFORM (BUILD)                         │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐                │
│  │     CRM     │  │  Projects   │  │  Materials   │                │
│  │  (Clients,  │  │ (Dashboard, │  │  Database    │◄── Price       │
│  │   Leads)    │  │  Timeline)  │  │  + Scraper   │    Scraping    │
│  └─────────────┘  └─────────────┘  └──────────────┘                │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐                │
│  │  Proposals  │  │  Invoices   │  │   Budget     │                │
│  │  + TaxJar   │  │  + Stripe   │  │  Tracking    │                │
│  └─────────────┘  └─────────────┘  └──────────────┘                │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐                                   │
│  │   Client    │  │ Contractor  │                                   │
│  │   Portal    │  │   Portal    │                                   │
│  └─────────────┘  └─────────────┘                                   │
│                                                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Manual bridge (copy approved selections)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       HOUZZ PRO (KEEP)                               │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Selection Boards                          │   │
│  │  • Product clipping via Chrome extension                     │   │
│  │  • Visual selection boards per room                          │   │
│  │  • Client approval workflow                                  │   │
│  │  • Product images and details                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                             │
                             │ Integrations
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        INTEGRATIONS                                  │
│                                                                      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │QuickBooks │  │  TaxJar   │  │  Stripe   │  │ Ferguson  │       │
│  │   Sync    │  │  Tax API  │  │ Payments  │  │ Price API │       │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

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

### Houzz Integration Visual Style

Use **purple/pink highlighting** for all Houzz integration points:
```css
.houzz-integration {
  @apply bg-purple-100 border border-purple-300 text-purple-700;
}
```

---

## Pages to Build for Demo

### CUSTOM PLATFORM PAGES

#### 1. Dashboard (Home)
**Route:** `/`

Centralized command center showing everything at a glance.

**Components:**
- Header with logo, search, notifications, user avatar
- Sidebar navigation
- Stats cards:
  - Active Projects
  - Pending Client Actions (selections to review, invoices)
  - Outstanding Balance
  - This Month Revenue
- Quick links:
  - "View in Houzz" buttons for active projects (shows integration)
- Recent activity feed
- Upcoming tasks

**Key Differentiator:** Show "View Selections in Houzz" link for each project - emphasizes the hybrid approach.

---

#### 2. Clients
**Route:** `/clients`

CRM functionality (replaces HoneyBook).

**Components:**
- Client list with search/filter
- Client cards showing: Name, email, project status, total spent
- "New Client" button
- Pipeline view (Lead → Proposal → Active → Complete)

---

#### 3. Client Detail
**Route:** `/clients/[id]`

Single client view.

**Tabs:**
- Overview (contact info, notes)
- Projects (their projects with links)
- Documents (contracts, proposals, invoices)
- Messages (threaded communication - KEY FEATURE)
- Payments

**Key Feature:** Messages tab shows all communication in one place (solves scattered Canva/email problem).

---

#### 4. Projects
**Route:** `/projects`

Project list.

**Components:**
- Project cards with: Name, client, status, budget, progress
- Status filter (Design, Selections, Ordering, Installation, Complete)
- Each card has "Houzz Selections" quick link

---

#### 5. Project Detail
**Route:** `/projects/[id]`

Single project workspace.

**Tabs:**
- **Overview:** Summary, budget, timeline
- **Mood Boards:** Embedded Canva or uploaded images (with comments - solves scattered feedback)
- **Selections:** Link to Houzz + import tool
- **Proposals:** This project's proposals
- **Invoices:** This project's invoices
- **Tasks:** To-dos
- **Files:** Documents
- **Contractors:** Assigned contractors

**Key Section - Selections Tab:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  SELECTIONS                                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Selection boards are managed in Houzz Pro.                         │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  🔗 Open Selections in Houzz Pro                             │  │
│  │     Kitchen Selections (12 items, 8 approved)                │  │
│  │     Master Bath Selections (18 items, 15 approved)           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                      │
│  APPROVED SELECTIONS (imported for invoicing)                       │
│                                                                      │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐          │
│  │ Product 1 │ │ Product 2 │ │ Product 3 │ │ Product 4 │          │
│  │ $1,200    │ │ $450      │ │ $890      │ │ $2,100    │          │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘          │
│                                                                      │
│  [+ Import from Houzz] [+ Add from Materials Library]               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 6. Materials Library
**Route:** `/materials`

Product database with price tracking (KEY DIFFERENTIATOR).

**Components:**
- Search with filters (category, vendor, price range)
- Product grid showing:
  - Image
  - Name
  - Vendor
  - Current price
  - **Price change indicator** (↑ or ↓ if changed since last update)
  - Last updated date
- "Add Product" button
- "Run Price Update" button (shows scraper concept)

**Key Feature:** Price change badges showing "Price increased $50 on Dec 15"

---

#### 7. Product Detail
**Route:** `/materials/[id]`

Single product view.

**Components:**
- Image gallery
- Product info (name, SKU, vendor, dimensions, lead time)
- **Price History Chart** (simple line chart showing price over time)
- "Last scraped: 2 hours ago" indicator
- Link to vendor website
- "Add to Proposal" button

---

#### 8. Proposals
**Route:** `/proposals`

Proposal list.

**Components:**
- List showing: Name, client, amount, status, date
- Filters by status
- "New Proposal" button

---

#### 9. Proposal Detail / Editor
**Route:** `/proposals/[id]`

Create/edit proposal.

**Components:**
- Client/project info
- Line items table:
  - Product (from materials library)
  - Quantity
  - Unit price
  - **Tax (auto-calculated with TaxJar badge)**
  - Line total
- Add line item (search materials library)
- Subtotal, Tax, Total
- Terms section
- Signature area (for e-sign)

**Key Feature:** Tax line shows "Calculated by TaxJar" with breakdown on hover.

---

#### 10. Invoices
**Route:** `/invoices`

Invoice list.

**Components:**
- List with: Number, client, amount, status (Paid, Pending, Overdue)
- "Synced to QuickBooks" badges

---

#### 11. Invoice Detail
**Route:** `/invoices/[id]`

Single invoice.

**Components:**
- Invoice details
- Line items
- Payment status
- "Pay Now" button (Stripe)
- **"Synced to QuickBooks"** indicator

---

### PORTAL PAGES (Show Client/Contractor Experience)

#### 12. Client Portal Preview
**Route:** `/portal/client`

What the CLIENT sees. **Different visual style** (lighter, simpler).

**Sections:**
- Welcome, [Client Name]!
- Your Project: [Project Name]
- **Pending Items:**
  - Mood board to review (with comment button)
  - Proposal to sign
  - Invoice to pay
- Messages with designer
- Project timeline/status
- **"View Selections in Houzz"** button

**Key Feature:** All communication and action items in ONE place (not scattered across Canva links and emails).

---

#### 13. Contractor Portal Preview
**Route:** `/portal/contractor`

What CONTRACTORS see. Very simple interface.

**Components:**
- Assigned Projects
- Tasks This Week (with checkboxes)
- Upload Photo button
- Project Files (limited view)
- Message Designer

---

### DIAGRAM PAGE

#### 14. How It Works
**Route:** `/how-it-works`

Visual explanation page for the client showing the hybrid architecture.

**Content:**
- Architecture diagram (the one above)
- "What's Custom vs What's Houzz" comparison
- Workflow example: "How a project flows through the system"
- Cost comparison

---

## Navigation Structure

### Sidebar

```
Dashboard

CLIENTS
└─ All Clients

PROJECTS
└─ All Projects
└─ Materials Library

FINANCIALS
└─ Proposals
└─ Invoices

─────────────────
PORTAL PREVIEWS
└─ Client Portal
└─ Contractor Portal

─────────────────
HOW IT WORKS
(Architecture explanation)

─────────────────
Settings
```

---

## Key Features to Emphasize in Demo

### 1. Centralized Client Communication
Show the Messages tab - all conversations in one place, not scattered across Canva links and emails.

### 2. Materials Library with Price Tracking
- Products with "Price changed" badges
- Price history chart
- "Last updated" timestamps
- Show this solves the manual price update problem

### 3. Auto Tax Calculation
- TaxJar badge on proposals/invoices
- Hover to see tax breakdown
- "No more manual tax rate lookup"

### 4. QuickBooks Sync
- "Synced" badges on invoices
- Shows financial integration

### 5. Houzz Integration Points
- "View in Houzz" buttons throughout
- Selection import workflow
- Show it's NOT trying to replace Houzz selections

### 6. Client Portal
- Clean, simple interface
- All pending items in one place
- Solves the "where do I go?" problem for clients

---

## Mock Data Requirements

### Clients (8-10)
```
Name, email, phone, address
Status: Lead, Active, Past
Current project
Total spent
```

### Projects (6-8)
```
Name, client, status
Budget (estimated, spent)
Houzz project URL (mock)
Start date, completion target
```

### Products (25-35)
```
Name, SKU, vendor
Category (Lighting, Plumbing, Tile, etc.)
Current price
Previous price (for price change display)
Last updated date
Images
```

### Proposals (4-6)
```
Various statuses
Line items with tax calculated
```

### Invoices (5-8)
```
Various statuses
QuickBooks sync status
```

### Messages (mock thread)
```
Designer-client conversation thread
Timestamps
Read/unread status
```

---

## Visual Differentiation

### Main Platform (Designer View)
- Professional, feature-rich
- Dark sidebar
- Blue primary color
- Complex navigation

### Client Portal
- Lighter, friendlier
- Simpler navigation
- Green accent color
- Minimal features

### Contractor Portal
- Very simple
- Task-focused
- Orange accent color
- Almost no navigation

---

## Design Guidelines

### Colors
- Primary (Designer): Blue (#3B82F6)
- Client Portal: Green (#10B981)
- Contractor Portal: Orange (#F59E0B)
- Status badges:
  - Green: Approved, Paid, Complete
  - Yellow: Pending, In Progress
  - Red: Rejected, Overdue
  - Blue: Houzz-related items

### "Houzz Integration" Visual Treatment
Anywhere we reference Houzz, use a distinct style:
- Light purple/pink background
- Houzz logo icon (or house icon)
- Clear "Opens in Houzz" indicator

Example:
```
┌────────────────────────────────────────┐
│ 🏠 Kitchen Selections                  │
│    12 items • 8 approved               │
│    [View in Houzz Pro →]               │
└────────────────────────────────────────┘
```

---

## Workflow Diagram to Include

Show the typical project flow in the demo:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PROJECT WORKFLOW (HYBRID)                         │
└─────────────────────────────────────────────────────────────────────┘

1. LEAD CAPTURE                    │ CUSTOM PLATFORM
   New lead comes in               │ • Auto-captured
   ↓                               │ • Tracked in CRM
                                   │
2. CONTRACT                        │ CUSTOM PLATFORM
   Send contract                   │ • E-signature
   Client signs                    │ • Auto-creates project
   ↓                               │
                                   │
3. MOOD BOARDS                     │ CANVA + CUSTOM PORTAL
   Create in Canva                 │ • Upload/embed in portal
   Share via Client Portal         │ • Client comments in ONE place
   ↓                               │
                                   │
4. SELECTIONS                      │ HOUZZ PRO ←────────────┐
   Clip products (Chrome ext)      │                        │
   Build selection boards          │  (Houzz does this      │
   Client approves in Houzz        │   well - keep it!)     │
   ↓                               │                        │
                                   │                        │
5. IMPORT APPROVED                 │ MANUAL BRIDGE ─────────┘
   Copy approved selections        │ • Quick import tool
   to Custom Platform              │ • Or pull from Houzz URL
   ↓                               │
                                   │
6. PROPOSAL                        │ CUSTOM PLATFORM
   Create from materials           │ • Auto tax (TaxJar)
   Send via Client Portal          │ • E-signature
   Client signs                    │
   ↓                               │
                                   │
7. ORDERING                        │ CUSTOM PLATFORM
   Track POs                       │ • Budget tracking
   Manage deliveries               │ • Vendor management
   ↓                               │
                                   │
8. INVOICING                       │ CUSTOM PLATFORM
   Generate invoices               │ • Auto tax
   Client pays (Stripe)            │ • QuickBooks sync
   ↓                               │
                                   │
9. COMPLETE                        │ CUSTOM PLATFORM
   Project archived                │ • Full history
   Client becomes reference        │ • Reporting

```

---

## Comparison Visual to Include

```
┌─────────────────────────────────────────────────────────────────────┐
│              HYBRID SOLUTION: BEST OF BOTH WORLDS                    │
└─────────────────────────────────────────────────────────────────────┘

     CUSTOM PLATFORM                      HOUZZ PRO
     (New)                                (Keep)
     ─────────────────                    ─────────────────

     ✓ CRM & Client Database             ✓ Selection Boards
     ✓ Contracts with E-Sign             ✓ Product Clipping
     ✓ Client Portal (messaging!)        ✓ Client Selection Approval
     ✓ Contractor Portal
     ✓ Materials Database
     ✓ Price Tracking & Scraping
     ✓ Proposals (auto tax!)
     ✓ Invoicing (QuickBooks sync)
     ✓ Budget Tracking
     ✓ Reporting

     REPLACES:                            KEEPS:
     • HoneyBook ($30/mo)                 • Houzz Pro ($65 → $250+/mo)
     • Basecamp ($30/mo)
     • Scattered Canva links

```

---

## Deliverables

### 1. Frontend Demo Application
- All pages listed above
- Working navigation
- Mock data throughout
- Professional appearance

### 2. Architecture Diagram
- Clear visual showing custom vs Houzz
- Include in `/how-it-works` page

### 3. Workflow Diagram
- Project flow through hybrid system
- Shows where Houzz fits

### 4. Portal Previews
- Client portal (different style)
- Contractor portal (very simple)

---

## What This Demo DOESN'T Need

- Actual backend/database
- Real authentication
- Working file uploads
- Real integrations
- PDF generation
- Email sending

---

## Estimated Effort

For an experienced developer:
- Core pages: 4-5 hours
- Portals: 2-3 hours
- Architecture/workflow diagrams: 1-2 hours
- Styling and polish: 2-3 hours
- Mock data: 1-2 hours
- **Total: 10-15 hours**

---

## Success Criteria

The demo is successful if:

1. Client understands what's custom vs what stays in Houzz
2. The "bridge" between systems is clear and not scary
3. Pain points (tax, prices, communication) are clearly addressed
4. Client portal shows value of centralized communication
5. Materials library shows price tracking capability
6. The approach feels pragmatic, not over-engineered
