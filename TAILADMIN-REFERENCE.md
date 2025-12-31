# TailAdmin Pro Reference Guide

## Source Location
```
/Users/arnispiekus/Work/TailAdminPro/
```

## Overview

TailAdmin Pro is a Next.js 15 admin dashboard with extensive pre-built components. **Use this instead of building from scratch.** Copy the template and modify it.

---

## Quick Start for Agents

```bash
# Copy TailAdmin Pro as your demo base
cp -r /Users/arnispiekus/Work/TailAdminPro/* ./demo/

# Install dependencies
cd demo
npm install

# Add Framer Motion for animations
npm install framer-motion

# Run development server
npm run dev
```

---

## Tech Stack (Already Configured)

| Feature | Package | Version |
|---------|---------|---------|
| Framework | Next.js | 15.4.3 |
| React | React | 19.0.0 |
| CSS | Tailwind CSS | 4.0.0 |
| Charts | ApexCharts | 4.3.0 |
| Calendar | FullCalendar | 6.1.15 |
| Drag & Drop | react-dnd | 16.0.1 |
| File Upload | react-dropzone | 14.3.5 |
| Date Picker | flatpickr | 4.6.13 |
| Maps | react-jvectormap | 1.0.4 |
| Carousel | Swiper | 11.2.0 |

**Add for this project:**
```bash
npm install framer-motion  # Animations (Apple/Revolut style)
```

---

## Component Directory Map

### Layout (Use These!)
```
src/layout/
├── AppHeader.tsx       → Top navigation bar
├── AppSidebar.tsx      → Left sidebar navigation (MODIFY THIS)
├── Backdrop.tsx        → Modal/drawer backdrop
└── SidebarWidget.tsx   → Sidebar bottom widget
```

### UI Components
```
src/components/ui/
├── alert/              → Success/error/warning alerts
├── avatar/             → User avatars, initials
├── badge/              → Status badges (Active, Pending, etc.)
├── button/             → All button variants
├── card/               → Container cards
├── dropdown/           → Dropdown menus
├── modal/              → Modal dialogs
├── pagination/         → Page navigation
├── table/              → Basic tables
├── tabs/               → Tab navigation
├── tooltip/            → Hover tooltips
└── notification/       → Toast notifications
```

### CRM Components (PERFECT FOR THIS PROJECT!)
```
src/components/crm/
├── CrmMetrics.tsx           → Dashboard metric cards
├── CrmRecentOrderTable.tsx  → Orders/transactions table
├── CrmStatisticsChart.tsx   → Statistics with chart
├── EstimatedRevenue.tsx     → Revenue projections
├── SalePieChart.tsx         → Pie chart for breakdowns
└── UpcomingSchedule.tsx     → Scheduled events/appointments
```

### Invoice Components (USE FOR PROPOSALS/INVOICES!)
```
src/components/invoice/
├── CreateInvoiceTable.tsx   → Line items editor
├── InvoiceList.tsx          → List of invoices (40KB - full featured!)
├── InvoiceMain.tsx          → Invoice detail view
├── InvoiceMetrics.tsx       → Invoice statistics
├── InvoiceSidebar.tsx       → Invoice sidebar filters
└── InvoiceTable.tsx         → Invoice table view
```

### Ecommerce Components (USE FOR MATERIALS LIBRARY!)
```
src/components/ecommerce/
├── ProductListTable.tsx     → Product catalog (35KB - very full featured!)
├── AddProductForm.tsx       → Add/edit product form
├── TransactionList.tsx      → Transaction history
├── RecentOrders.tsx         → Recent orders table
├── MonthlySalesChart.tsx    → Sales charts
└── billing/                 → Billing-related components
```

### Chat Components (USE FOR CLIENT PORTAL MESSAGING!)
```
src/components/chats/
├── ChatList.tsx             → Chat conversation list (15KB)
├── ChatBox.tsx              → Message display area
├── ChatBoxHeader.tsx        → Chat header with user info
├── ChatBoxSendForm.tsx      → Message input with attachments
├── ChatSidebar.tsx          → Chat sidebar
└── ChatHeader.tsx           → Top-level chat header
```

### File Manager (USE FOR DOCUMENTS/ASSETS!)
```
src/components/file-manager/
├── AllFolders.tsx           → Folder grid view
├── AllMediaCard.tsx         → Media/document cards
├── FileCard.tsx             → Individual file display
├── FolderCard.tsx           → Folder card component
├── RecentFileTable.tsx      → Recent files table
└── StorageDetailsChart.tsx  → Storage usage visualization
```

### Form Components
```
src/components/form/
├── Select.tsx               → Dropdown select
├── MultiSelect.tsx          → Multi-option select (9KB)
├── date-picker.tsx          → Date picker
├── input/                   → Text inputs, textarea
├── switch/                  → Toggle switches
└── form-elements/           → Various form elements
```

### Table Components
```
src/components/tables/
├── BasicTables/             → Simple table layouts
└── DataTables/              → Advanced data tables with sorting/filtering
```

### Charts & Analytics
```
src/components/charts/       → Various chart types
src/components/analytics/    → Analytics dashboard components
```

### Calendar (USE FOR PROJECTS/SCHEDULING!)
```
src/components/calendar/     → FullCalendar integration
```

---

## Pre-built Pages to Leverage

### Dashboards (Pick One to Modify)
```
src/app/(admin)/(home)/
├── crm/page.tsx            → CRM dashboard (BEST FIT)
├── analytics/page.tsx       → Analytics dashboard
├── saas/page.tsx           → SaaS metrics dashboard
├── logistics/page.tsx      → Logistics/operations
├── marketing/page.tsx      → Marketing metrics
└── stocks/page.tsx         → Inventory/stocks
```

### Feature Pages
```
src/app/(admin)/(others-pages)/
├── (ecommerce)/            → Product, orders, cart pages
├── (email)/                → Email inbox/compose
├── (forms)/                → Form examples
├── (tables)/               → Table examples
├── (ai)/                   → AI chat interface
├── (support)/              → Support ticket system
└── (task)/                 → Task/kanban boards
```

### Auth Pages (ALREADY BUILT!)
```
src/app/(full-width-pages)/
├── signin/                 → Sign in page
├── signup/                 → Sign up page
├── reset-password/         → Password reset
├── two-step-verification/  → 2FA
└── error-page/            → Error pages (404, 500)
```

---

## Mapping TailAdmin to AF Designs Demo

### Path A: Full Custom Demo

| AF Designs Page | TailAdmin Starting Point | Notes |
|-----------------|-------------------------|-------|
| Dashboard | `crm/page.tsx` + `CrmMetrics.tsx` | Modify for interior design metrics |
| Clients | `ProductListTable.tsx` | Rename to clients, add contact info |
| Projects | `task/` + `InvoiceList.tsx` | Combine for project tracking |
| Materials Library | `ProductListTable.tsx` | Perfect fit! Add price tracking |
| Proposals | `InvoiceList.tsx` + `CreateInvoiceTable.tsx` | Add TaxJar badge |
| Invoices | `invoice/` components | Use as-is, add QuickBooks indicator |
| Client Portal | New layout + `ChatList.tsx` | Green accent theme |
| Contractor Portal | Minimal layout + `task/` | Orange accent theme |

### Path C: Hybrid Demo

Same as above, plus:
- Add "View in Houzz" buttons with purple/pink highlight
- Architecture diagram page (new, simple)
- Selections tab showing Houzz integration link

---

## How to Modify the Sidebar

Edit `src/layout/AppSidebar.tsx`:

```typescript
// Find the menu items array and replace with:
const menuItems = [
  { icon: "dashboard", label: "Dashboard", path: "/" },
  { icon: "users", label: "Clients", path: "/clients" },
  { icon: "folder", label: "Projects", path: "/projects" },
  { icon: "grid", label: "Materials", path: "/materials" },
  { icon: "file-text", label: "Proposals", path: "/proposals" },
  { icon: "invoice", label: "Invoices", path: "/invoices" },
  { icon: "user-circle", label: "Client Portal", path: "/client-portal" },
  { icon: "briefcase", label: "Contractor Portal", path: "/contractor-portal" },
  { icon: "settings", label: "Settings", path: "/settings" },
];
```

---

## Icons Available

TailAdmin includes 66 custom icons in `src/icons/`. Common ones:
- Dashboard, Users, Settings, Invoice
- Plus, Check, X, Arrow variants
- Chart types, Calendar, Messages
- File, Folder, Upload, Download

---

## Color Customization

Colors are defined in `src/app/globals.css` and Tailwind config.

For the demos:
- **Designer Platform**: Keep default blue theme
- **Client Portal**: Change primary to green (`#10b981`)
- **Contractor Portal**: Change primary to orange (`#f59e0b`)
- **Houzz References**: Add purple highlight class (`bg-purple-100 border-purple-300`)

---

## Key Files to NOT Modify

Keep these as-is (they work):
- `src/app/layout.tsx` - Root layout
- `src/context/` - Theme context
- `src/hooks/` - Custom hooks
- `src/utils/` - Utility functions
- `tailwind.config.ts` - Tailwind setup

---

## Adding Framer Motion Animations

After installing framer-motion, wrap page content:

```typescript
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page content */}
    </motion.div>
  );
}
```

For modals:
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

## Responsive Design Already Included

TailAdmin is built mobile-first with Tailwind breakpoints:
- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px
- `2xl:` → 1536px

The sidebar auto-collapses on mobile. Forms stack vertically. Tables scroll horizontally.

**Just verify and adjust as needed** - most responsiveness is already handled.

---

## Quick Reference Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Deploy to Vercel
vercel
```
