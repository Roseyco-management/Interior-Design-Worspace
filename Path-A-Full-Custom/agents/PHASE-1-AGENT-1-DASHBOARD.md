# Agent 1: Dashboard Rebuild

## Your Only Task
Rebuild the dashboard to show interior design metrics instead of generic CRM data.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read (ONLY these files)
1. `src/app/(admin)/(home)/page.tsx` - Current dashboard (or find the main dashboard page)
2. One CRM metric component for reference (e.g., `src/components/crm/CrmMetrics.tsx`)

**DO NOT explore the entire codebase. Read only what you need.**

## What to Build

Replace the current generic dashboard with this layout:

```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Active   │ │ Pending  │ │ Revenue  │ │ Overdue  │       │
│  │ Projects │ │ Proposals│ │ This Mo  │ │ Invoices │       │
│  │    8     │ │    3     │ │  $47.2K  │ │    2     │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│  ┌─────────────────────────────┐ ┌─────────────────────┐   │
│  │ Upcoming Deadlines          │ │ Recent Activity     │   │
│  │ • Kitchen install - 3 days  │ │ • Invoice #1042 paid│   │
│  │ • Final walkthrough - 5 days│ │ • Proposal sent     │   │
│  │ • Client meeting - 1 week   │ │ • Material ordered  │   │
│  └─────────────────────────────┘ └─────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Revenue (Last 6 Months)                              │   │
│  │ [Bar chart - use ApexCharts, already installed]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components to Create

Create in `src/components/dashboard/`:

1. **DesignMetrics.tsx** - 4 metric cards (Active Projects, Pending Proposals, Revenue, Overdue)
2. **UpcomingDeadlines.tsx** - List of upcoming deadlines with days remaining
3. **RecentActivity.tsx** - Activity feed with timestamps
4. **RevenueChart.tsx** - ApexCharts bar chart (6 months)

## Mock Data

```typescript
const metrics = {
  activeProjects: 8,
  pendingProposals: 3,
  revenueThisMonth: 47200,
  overdueInvoices: 2
};

const deadlines = [
  { task: "Kitchen cabinet installation", project: "Mitchell Residence", daysUntil: 3 },
  { task: "Final walkthrough", project: "Wong Loft", daysUntil: 5 },
  { task: "Client meeting", project: "Henderson Remodel", daysUntil: 7 },
  { task: "Material delivery", project: "Chen Beach House", daysUntil: 10 }
];

const activities = [
  { action: "Invoice #1042 paid", time: "2 hours ago", amount: "$4,500" },
  { action: "Proposal sent to Wong", time: "Yesterday" },
  { action: "Materials ordered", time: "Yesterday", vendor: "Restoration Hardware" },
  { action: "Project completed", time: "3 days ago", project: "Smith Kitchen" }
];

const revenueData = [
  { month: "Jul", amount: 32000 },
  { month: "Aug", amount: 41000 },
  { month: "Sep", amount: 38000 },
  { month: "Oct", amount: 52000 },
  { month: "Nov", amount: 44000 },
  { month: "Dec", amount: 47200 }
];
```

## Style Requirements

- Use existing TailAdmin card styles (`bg-white rounded-lg shadow-sm p-6`)
- Metric cards: Large number, small label below
- Clean whitespace, not cramped
- Responsive: 4 columns on desktop, 2 on tablet, 1 on mobile

## Success Criteria

- [ ] Dashboard shows interior design metrics (not CRM)
- [ ] 4 metric cards at top
- [ ] Upcoming deadlines list
- [ ] Recent activity feed
- [ ] Revenue chart (ApexCharts)
- [ ] Responsive layout
- [ ] Page loads without errors

## Don't Touch

- Sidebar navigation (another agent handles this)
- Other pages
- Global styles
