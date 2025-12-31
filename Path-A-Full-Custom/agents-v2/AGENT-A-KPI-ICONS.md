# Agent A: Global KPI Icons

## Your Task
Add icons to all KPI cards across 6 pages to match the dashboard style.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Dashboard page - see how KPIs have icons (colored circle backgrounds)
2. The KPIBar component (likely in `src/components/common/` or similar)

## The Problem
The dashboard KPIs have nice icons with colored circular backgrounds. But the KPIs on other pages (Clients, Projects, Materials, Proposals, Invoices, Reports) are plain text without icons.

## Reference: Dashboard KPI Style
```
┌──────────────┐
│  (🔵 icon)   │  ← Icon with colored circle background
│              │
│  8           │  ← Large number
│  Active      │  ← Label
│  Projects    │
└──────────────┘
```

## Pages to Update

### 1. Clients Page
KPIs: Total Clients, Active Projects, New This Month, Lifetime Value
Icons: 👥 Users, 📁 Folder, ✨ Sparkle/New, 💰 Dollar

### 2. Projects Page
KPIs: Active Projects, In Progress, Completed (YTD), Overdue
Icons: 📁 Folder, 🔄 Progress, ✅ Check, ⚠️ Alert

### 3. Materials Library Page
KPIs: Total Items, Price Increases, Price Drops, Vendors
Icons: 📦 Package, 📈 TrendUp (red), 📉 TrendDown (green), 🏪 Store

### 4. Proposals Page
KPIs: Pending Review, Approved (MTD), Total Value, Conversion Rate
Icons: ⏳ Clock, ✅ Check, 💵 Dollar, 📊 Chart
**Note:** If there are KPIs at bottom too, REMOVE them. Only 4 KPIs at top.

### 5. Invoices Page
KPIs: Outstanding, Paid (MTD), Revenue (MTD), Overdue
Icons: 📄 File, ✅ Check, 💰 Dollar, ⚠️ Alert
**Note:** If there are too many KPIs, reduce to 4 most important.

### 6. Reports Page
KPIs: Total Revenue (YTD), Active Projects, Total Clients, Avg. Project Value
Icons: 💰 Dollar, 📁 Folder, 👥 Users, 📊 Chart

## Implementation

Update the KPIBar component or each page's KPI section to include icons:

```typescript
interface KPIItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string; // e.g., 'bg-blue-100'
  iconColor: string; // e.g., 'text-blue-600'
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

// Example KPI card with icon
<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
  <div className="flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center`}>
      <span className={item.iconColor}>{item.icon}</span>
    </div>
    <div>
      <p className="text-2xl font-semibold">{item.value}</p>
      <p className="text-sm text-gray-500">{item.label}</p>
    </div>
  </div>
</div>
```

## Icon Colors by Type

| Type | Background | Icon Color |
|------|------------|------------|
| Primary/Count | `bg-blue-100` | `text-blue-600` |
| Success/Positive | `bg-green-100` | `text-green-600` |
| Warning/Pending | `bg-yellow-100` | `text-yellow-600` |
| Danger/Overdue | `bg-red-100` | `text-red-600` |
| Money/Revenue | `bg-emerald-100` | `text-emerald-600` |
| Neutral | `bg-gray-100` | `text-gray-600` |

## Use Existing Icons

TailAdmin has icons in `src/icons/`. Use those or Heroicons if available. Common ones:
- Users, Folder, Document, Check, Clock, Alert, TrendUp, TrendDown, CurrencyDollar, ChartBar

## Success Criteria

- [ ] Clients page KPIs have icons with colored backgrounds
- [ ] Projects page KPIs have icons with colored backgrounds
- [ ] Materials page KPIs have icons with colored backgrounds
- [ ] Proposals page has exactly 4 KPIs at top with icons (remove bottom KPIs if present)
- [ ] Invoices page has exactly 4 KPIs with icons (reduce if too many)
- [ ] Reports page KPIs have icons with colored backgrounds
- [ ] All icons match the dashboard style
- [ ] Colors are appropriate (green for positive, red for alerts, etc.)

## Don't Touch

- Dashboard (already has icons)
- Page content below KPIs
- Other functionality
