# Agent 2: Infrastructure (New Pages + Sidebar Cleanup)

## Your Tasks
1. Create 3 missing pages (Reports, Vendors, Settings)
2. Clean up sidebar (remove branding, add Selection Boards nav item)

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read (ONLY these files)
1. `src/layout/AppSidebar.tsx` - Sidebar to modify
2. One existing page as template (e.g., `src/app/(admin)/clients/page.tsx` or similar)

**DO NOT explore the entire codebase. Read only what you need.**

---

## Task 1: Sidebar Cleanup

### Remove TailAdmin Branding

In `AppSidebar.tsx`:
- **Delete** the "Purchase Plan" or "Upgrade" widget at the bottom
- **Replace** any default avatar image with a generic user icon or initials "AF"
- **Remove** any TailAdmin-specific text/links

### Update Navigation Items

The sidebar should have these items (in order):
```
- Dashboard
- Clients
- Projects
- Materials Library
- Selection Boards    ← ADD THIS (links to /selection-boards)
- Proposals
- Invoices
- Reports            ← ADD THIS (links to /reports)
- Vendors            ← ADD THIS (links to /vendors)
─────────────────
- Client Portal
- Contractor Portal
─────────────────
- Settings           ← ADD THIS (links to /settings)
```

Use appropriate icons from the existing icon set.

---

## Task 2: Create Reports Page

**Location:** `src/app/(admin)/reports/page.tsx`

Simple analytics page with:
```
┌─────────────────────────────────────────────────────────────┐
│ Reports                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  │ Projects by Status       │  │ Revenue by Client       │  │
│  │ [Pie Chart]              │  │ [Bar Chart]             │  │
│  │ • Active: 8              │  │ Mitchell: $45K          │  │
│  │ • Completed: 24          │  │ Wong: $38K              │  │
│  │ • On Hold: 2             │  │ Henderson: $32K         │  │
│  └─────────────────────────┘  └─────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Monthly Revenue Trend                                │   │
│  │ [Line Chart - 12 months]                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Use ApexCharts (already installed) for charts.

---

## Task 3: Create Vendors Page

**Location:** `src/app/(admin)/vendors/page.tsx`

Simple vendor/supplier list:
```
┌─────────────────────────────────────────────────────────────┐
│ Vendors                                        [+ Add Vendor]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Name              │ Category    │ Contact    │ Notes │   │
│  ├───────────────────┼─────────────┼────────────┼───────┤   │
│  │ Restoration Hdwr  │ Furniture   │ 555-0101   │ ...   │   │
│  │ West Elm Trade    │ Lighting    │ 555-0102   │ ...   │   │
│  │ Pottery Barn Pro  │ Furniture   │ 555-0103   │ ...   │   │
│  │ Kravet Fabrics    │ Textiles    │ 555-0104   │ ...   │   │
│  │ Ann Sacks         │ Tile        │ 555-0105   │ ...   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Mock data for 6-8 vendors with name, category, contact, website, notes.

---

## Task 4: Create Settings Page

**Location:** `src/app/(admin)/settings/page.tsx`

Settings with tabs or sections:
```
┌─────────────────────────────────────────────────────────────┐
│ Settings                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Company] [Integrations] [Notifications] [Account]         │
│                                                              │
│  Company Profile                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Company Name: [AF Designs                         ] │   │
│  │ Email:        [angie@afdesigns.com               ] │   │
│  │ Phone:        [555-123-4567                      ] │   │
│  │ Address:      [123 Design Ave, Suite 100         ] │   │
│  │                                                     │   │
│  │                                    [Save Changes]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Integrations                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ QuickBooks    [Connected ✓]         [Disconnect]   │   │
│  │ TaxJar        [Connected ✓]         [Disconnect]   │   │
│  │ Stripe        [Not Connected]       [Connect]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Use TailAdmin's existing form components and tab components.

---

## Mock Data

### Vendors
```typescript
const vendors = [
  { name: "Restoration Hardware", category: "Furniture", contact: "555-0101", email: "trade@rh.com", website: "rh.com" },
  { name: "West Elm Trade", category: "Lighting", contact: "555-0102", email: "trade@westelm.com", website: "westelm.com" },
  { name: "Pottery Barn Pro", category: "Furniture", contact: "555-0103", email: "pro@potterybarn.com", website: "potterybarn.com" },
  { name: "Kravet Fabrics", category: "Textiles", contact: "555-0104", email: "orders@kravet.com", website: "kravet.com" },
  { name: "Ann Sacks", category: "Tile & Stone", contact: "555-0105", email: "trade@annsacks.com", website: "annsacks.com" },
  { name: "Visual Comfort", category: "Lighting", contact: "555-0106", email: "trade@?"visualcomfort.com", website: "?"visualcomfort.com" }
];
```

### Reports Data
```typescript
const projectsByStatus = [
  { status: "Active", count: 8 },
  { status: "Completed", count: 24 },
  { status: "On Hold", count: 2 },
  { status: "Planning", count: 4 }
];

const revenueByClient = [
  { client: "Mitchell", revenue: 45000 },
  { client: "Wong", revenue: 38000 },
  { client: "Henderson", revenue: 32000 },
  { client: "Chen", revenue: 28000 }
];
```

---

## Success Criteria

- [ ] Sidebar has no "Purchase Plan" widget
- [ ] Sidebar has no TailAdmin default avatar
- [ ] "Selection Boards" nav item added (links to /selection-boards)
- [ ] Reports page loads without 404
- [ ] Reports page has charts
- [ ] Vendors page loads without 404
- [ ] Vendors page has table with data
- [ ] Settings page loads without 404
- [ ] Settings page has form fields
- [ ] All new pages are responsive

## Don't Touch

- Dashboard (Agent 1 handles this)
- Existing pages (Clients, Projects, Materials, etc.)
- Client Portal / Contractor Portal layouts
