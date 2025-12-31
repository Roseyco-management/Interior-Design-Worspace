# Agent B: Dashboard Enhancements

## Your Task
Add two missing sections to the dashboard: **Quick Actions** and **Active Projects** with progress bars.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Current dashboard page (likely `src/app/(admin)/(home)/page.tsx` or similar)
2. Brief look at existing dashboard components

## Current State
The dashboard has:
- 4 KPI cards (good)
- Upcoming Deadlines (good)
- Recent Activity (good)
- Revenue chart (good but could be improved)

## What's Missing

### 1. Quick Actions Section

Add a "Quick Actions" card with common actions:

```
┌─────────────────────────────┐
│ Quick Actions               │
│                             │
│ ┌─────────┐ ┌─────────┐    │
│ │ 👤+     │ │ 📄      │    │
│ │ Add New │ │ Create  │    │
│ │ Client  │ │ Proposal│    │
│ └─────────┘ └─────────┘    │
│ ┌─────────┐ ┌─────────┐    │
│ │ 📦      │ │ 💵      │    │
│ │ Add     │ │ Send    │    │
│ │ Material│ │ Invoice │    │
│ └─────────┘ └─────────┘    │
└─────────────────────────────┘
```

**Actions:**
- Add New Client → links to `/clients` (or opens modal)
- Create Proposal → links to `/proposals`
- Add Material → links to `/materials`
- Send Invoice → links to `/invoices`

### 2. Active Projects Section

Add an "Active Projects" card showing projects with progress bars:

```
┌─────────────────────────────────────────────┐
│ Active Projects                    View All │
│                                             │
│ Modern Kitchen Renovation          Active   │
│ Budget Progress ████████░░░░░░░░░░ 45%     │
│ Selections: 18/24 approved                  │
│                                             │
│ Master Suite Redesign              Active   │
│ Budget Progress ████████████░░░░░░ 68%     │
│ Selections: 42/42 approved ✓                │
│                                             │
│ Full Home Renovation              Pending   │
│ Budget Progress ███░░░░░░░░░░░░░░░ 15%     │
│ Selections: 0/8 approved                    │
│                                             │
└─────────────────────────────────────────────┘
```

**For each project show:**
- Project name
- Status badge (Active, Pending, etc.)
- Budget progress bar with percentage
- Selections approved count

### 3. Improve Revenue Chart (Optional)

Current chart shows 6 months as bar chart. Consider:
- Change to line chart (smoother, more elegant)
- Show 12 months instead of 6
- Use the nice TailAdmin line chart style

## Layout Suggestion

```
┌─────────────────────────────────────────────────────────────┐
│ [KPI] [KPI] [KPI] [KPI]                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│ │ Upcoming        │ │ Recent          │ │ Quick          │ │
│ │ Deadlines       │ │ Activity        │ │ Actions        │ │
│ │                 │ │                 │ │                │ │
│ └─────────────────┘ └─────────────────┘ └────────────────┘ │
│                                                              │
│ ┌──────────────────────────────┐ ┌───────────────────────┐ │
│ │ Active Projects              │ │ Revenue Chart         │ │
│ │ (with progress bars)         │ │ (line, 12 months)     │ │
│ │                              │ │                       │ │
│ └──────────────────────────────┘ └───────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Mock Data

```typescript
const quickActions = [
  { label: 'Add New Client', icon: UserPlusIcon, href: '/clients' },
  { label: 'Create Proposal', icon: DocumentIcon, href: '/proposals' },
  { label: 'Add Material', icon: CubeIcon, href: '/materials' },
  { label: 'Send Invoice', icon: CurrencyDollarIcon, href: '/invoices' },
];

const activeProjects = [
  {
    name: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    status: 'active',
    budgetProgress: 45,
    budget: { spent: 28500, total: 65000 },
    selections: { approved: 18, total: 24 }
  },
  {
    name: 'Master Suite Redesign',
    client: 'Michael Chen',
    status: 'active',
    budgetProgress: 68,
    budget: { spent: 62300, total: 95000 },
    selections: { approved: 42, total: 42 }
  },
  {
    name: 'Full Home Renovation',
    client: 'Emily Rodriguez',
    status: 'pending',
    budgetProgress: 15,
    budget: { spent: 25000, total: 200000 },
    selections: { approved: 0, total: 8 }
  }
];

const revenueData = [
  { month: 'Jan', amount: 28000 },
  { month: 'Feb', amount: 35000 },
  { month: 'Mar', amount: 38000 },
  { month: 'Apr', amount: 32000 },
  { month: 'May', amount: 45000 },
  { month: 'Jun', amount: 48000 },
  { month: 'Jul', amount: 52000 },
  { month: 'Aug', amount: 44000 },
  { month: 'Sep', amount: 58000 },
  { month: 'Oct', amount: 62000 },
  { month: 'Nov', amount: 55000 },
  { month: 'Dec', amount: 68000 }
];
```

## Components to Create

### `src/components/dashboard/QuickActions.tsx`
```typescript
export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
          >
            <action.icon className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### `src/components/dashboard/ActiveProjects.tsx`
```typescript
export function ActiveProjects() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Active Projects</h3>
        <Link href="/projects" className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{project.name}</span>
              <StatusBadge status={project.status} />
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Budget Progress</span>
                <span>{project.budgetProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${project.budgetProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Selections: {project.selections.approved}/{project.selections.total} approved
              {project.selections.approved === project.selections.total && ' ✓'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Success Criteria

- [ ] Quick Actions section added with 4 action buttons
- [ ] Action buttons link to correct pages
- [ ] Active Projects section added with 3 projects
- [ ] Each project shows progress bar
- [ ] Each project shows selections count
- [ ] View All link goes to /projects
- [ ] Revenue chart shows 12 months (optional: switch to line chart)
- [ ] Layout is balanced and looks good
- [ ] Responsive on mobile

## Don't Touch

- KPI cards (already good)
- Upcoming Deadlines (already good)
- Recent Activity (already good)
- Sidebar navigation
- Other pages
