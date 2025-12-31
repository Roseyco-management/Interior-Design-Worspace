# Agent 3: KPI Bars on List Pages

## Your Only Task
Add KPI summary bars to the top of 5 list pages.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read (ONLY these files)
1. Find one list page to understand the structure (e.g., Clients or Projects page)
2. That's it - you're adding the same pattern to 5 pages

**DO NOT explore the entire codebase. Read only what you need.**

---

## The Pattern

Every list page should have a KPI bar at the TOP, before the table/list content.

### KPI Bar Component

Create a reusable component at `src/components/common/KPIBar.tsx`:

```typescript
interface KPIItem {
  label: string;
  value: string | number;
  change?: string; // e.g., "+12%" or "-5%"
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface KPIBarProps {
  items: KPIItem[];
}

export function KPIBar({ items }: KPIBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">{item.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-900">
              {typeof item.value === 'number' && item.label.includes('Revenue')
                ? `$${item.value.toLocaleString()}`
                : item.value}
            </p>
            {item.change && (
              <span className={`text-sm ${
                item.changeType === 'positive' ? 'text-green-600' :
                item.changeType === 'negative' ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {item.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Pages to Update

### 1. Clients Page
**Location:** Find the clients list page (likely `src/app/(admin)/clients/page.tsx`)

```typescript
const clientKPIs = [
  { label: "Total Clients", value: 24 },
  { label: "Active Projects", value: 8 },
  { label: "New This Month", value: 3, change: "+2", changeType: "positive" },
  { label: "Lifetime Value", value: 847000 }
];
```

### 2. Projects Page
**Location:** Find the projects list page

```typescript
const projectKPIs = [
  { label: "Active Projects", value: 8 },
  { label: "In Progress", value: 5 },
  { label: "Completed (YTD)", value: 24, change: "+18%", changeType: "positive" },
  { label: "Overdue", value: 1, changeType: "negative" }
];
```

### 3. Materials Library Page
**Location:** Find the materials/products page

```typescript
const materialsKPIs = [
  { label: "Total Items", value: 156 },
  { label: "Price Increases", value: 8, change: "this month", changeType: "negative" },
  { label: "Price Drops", value: 3, change: "this month", changeType: "positive" },
  { label: "Vendors", value: 12 }
];
```

### 4. Proposals Page
**Location:** Find the proposals list page

```typescript
const proposalKPIs = [
  { label: "Pending Review", value: 3 },
  { label: "Approved (MTD)", value: 5 },
  { label: "Total Value", value: 127500 },
  { label: "Conversion Rate", value: "78%", change: "+5%", changeType: "positive" }
];
```

### 5. Invoices Page
**Location:** Find the invoices list page

```typescript
const invoiceKPIs = [
  { label: "Outstanding", value: 4 },
  { label: "Paid (MTD)", value: 12 },
  { label: "Revenue (MTD)", value: 47200 },
  { label: "Overdue", value: 2, changeType: "negative" }
];
```

---

## Implementation Steps

For each page:

1. Import the KPIBar component
2. Add the KPI data array
3. Place `<KPIBar items={kpiData} />` at the top of the page content (after the page title, before the table)

Example structure:
```typescript
export default function ClientsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <button>+ Add Client</button>
      </div>

      {/* ADD KPI BAR HERE */}
      <KPIBar items={clientKPIs} />

      {/* Existing table/list content below */}
      <ClientsTable />
    </div>
  );
}
```

---

## Style Notes

- Cards should be white with subtle shadow
- 4 columns on desktop, 2 on tablet/mobile
- Numbers should be large and bold
- Labels should be small and gray
- Positive changes in green, negative in red
- Currency values formatted with $ and commas

---

## Success Criteria

- [ ] KPIBar component created and reusable
- [ ] Clients page has KPI bar with 4 metrics
- [ ] Projects page has KPI bar with 4 metrics
- [ ] Materials page has KPI bar with 4 metrics
- [ ] Proposals page has KPI bar with 4 metrics
- [ ] Invoices page has KPI bar with 4 metrics
- [ ] KPI bars are responsive (4 cols → 2 cols on mobile)
- [ ] All pages still load without errors

## Don't Touch

- Dashboard (Agent 1 handles this)
- Page content below the KPI bars
- Sidebar navigation
- New pages (Reports, Vendors, Settings - Agent 2 handles these)
