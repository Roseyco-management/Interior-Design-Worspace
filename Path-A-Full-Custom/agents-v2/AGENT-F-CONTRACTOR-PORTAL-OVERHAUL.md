# Agent F: Contractor Portal Overhaul

## Your Task
Overhaul the Contractor Portal: add sidebar navigation and improve the task management features.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Current Contractor Portal pages (likely in `src/app/(admin)/contractor-portal/` or separate layout)
2. Client Portal sidebar (for reference on sidebar pattern)

## Major Changes Needed

### 1. Replace Header Nav with Sidebar

**Current:** Menu items in header
**New:** Sidebar navigation like the Client Portal (but orange theme)

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌──────────────┐                                                   │
│ │ AF           │  Contractor Portal                                │
│ │ Designs      │  ─────────────────────────────────────────────── │
│ │              │                                                   │
│ │ MENU         │  [Page Content Here]                             │
│ │              │                                                   │
│ │ 🏠 Dashboard │                                                   │
│ │ ✅ My Tasks  │                                                   │
│ │ 📁 Projects  │                                                   │
│ │ 📅 Schedule  │                                                   │
│ │ ⏱️ Timesheet │                                                   │
│ │ 💬 Messages  │                                                   │
│ │              │                                                   │
│ │ ───────────  │                                                   │
│ │              │                                                   │
│ │ 👤 Mike R.   │                                                   │
│ │    Installer │                                                   │
│ └──────────────┘                                                   │
└────────────────────────────────────────────────────────────────────┘
```

**Sidebar Specs:**
- Orange accent color (`#f59e0b` / amber-500)
- Collapsible on mobile (hamburger menu)
- Show contractor name and role at bottom
- "AF Designs" branding at top
- Active page highlighted in orange

### 2. Improve Dashboard Layout

**Current:** Basic layout
**New:** Comprehensive dashboard with sections

```
┌─────────────────────────────────────────────────────────────────┐
│ Welcome back, Mike!                                              │
│ Here's what's on your plate today                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ Today's Schedule                                           │   │
│ │                                                            │   │
│ │ 9:00 AM  Kitchen Install - Johnson Residence              │   │
│ │          📍 123 Main St • Est. 4 hours                    │   │
│ │                                                            │   │
│ │ 2:00 PM  Final Walkthrough - Chen Home                    │   │
│ │          📍 456 Oak Ave • Est. 1 hour                     │   │
│ │                                                            │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌─────────────────────────┐ ┌─────────────────────────────────┐ │
│ │ Quick Actions           │ │ Assigned Projects               │ │
│ │                         │ │                                 │ │
│ │ ┌─────────┐ ┌─────────┐│ │ Johnson Kitchen Remodel  Active │ │
│ │ │ 📷      │ │ 💬      ││ │ 3 tasks remaining               │ │
│ │ │ Upload  │ │ Message ││ │                                 │ │
│ │ │ Photos  │ │ Designer││ │ Chen Living Room        Active │ │
│ │ └─────────┘ └─────────┘│ │ 1 task remaining                │ │
│ │ ┌─────────┐ ┌─────────┐│ │                                 │ │
│ │ │ ⚠️      │ │ ⏱️      ││ │ Martinez Master Bath   Upcoming │ │
│ │ │ Report  │ │ Log     ││ │ Starts Jan 15                   │ │
│ │ │ Issue   │ │ Time    ││ │                                 │ │
│ │ └─────────┘ └─────────┘│ └─────────────────────────────────┘ │
│ └─────────────────────────┘                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. My Tasks Page with Filters

**New tasks page structure:**

```
┌─────────────────────────────────────────────────────────────────┐
│ My Tasks                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Filter: [All ▼] [Pending] [In Progress] [Completed]             │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ ☐ Install pendant lights over island                      │   │
│ │   Johnson Kitchen Remodel • Due: Dec 30                   │   │
│ │   ●Pending                                                │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ ☑ Mount wall sconces in dining area                       │   │
│ │   Johnson Kitchen Remodel • Completed: Dec 28             │   │
│ │   ✓Completed                                              │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ ◐ Assemble and position dining table                      │   │
│ │   Chen Living Room • Due: Jan 5                           │   │
│ │   ●In Progress                                            │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ ☐ Install bathroom vanity                                 │   │
│ │   Martinez Master Bath • Due: Jan 18                      │   │
│ │   ●Pending                                                │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Task Features:**
- Checkbox to mark complete
- Status filter tabs (All, Pending, In Progress, Completed)
- Task shows: description, project name, due date, status badge
- Click task to expand for details

### 4. Create Contractor Sidebar Layout

```typescript
// src/app/contractor-portal/layout.tsx

export default function ContractorPortalLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <ContractorSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
```

### 5. Contractor Sidebar Component

```typescript
// src/components/contractor-portal/ContractorSidebar.tsx

const contractorNavItems = [
  { label: 'Dashboard', href: '/contractor-portal', icon: HomeIcon },
  { label: 'My Tasks', href: '/contractor-portal/tasks', icon: CheckCircleIcon },
  { label: 'Projects', href: '/contractor-portal/projects', icon: FolderIcon },
  { label: 'Schedule', href: '/contractor-portal/schedule', icon: CalendarIcon },
  { label: 'Timesheet', href: '/contractor-portal/timesheet', icon: ClockIcon },
  { label: 'Messages', href: '/contractor-portal/messages', icon: ChatIcon },
];

export function ContractorSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <span className="text-xl font-semibold">AF Designs</span>
        <p className="text-sm text-gray-500">Contractor Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {contractorNavItems.map(item => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            activeClassName="bg-amber-50 text-amber-600 border-l-4 border-amber-500"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Contractor info */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 font-medium">MR</span>
          </div>
          <div>
            <p className="font-medium">Mike Rodriguez</p>
            <p className="text-sm text-gray-500">Installer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

### 6. Quick Actions Component

```typescript
// src/components/contractor-portal/QuickActions.tsx

const quickActions = [
  { label: 'Upload Photos', icon: CameraIcon, action: 'upload' },
  { label: 'Message Designer', icon: ChatIcon, action: 'message' },
  { label: 'Report Issue', icon: ExclamationIcon, action: 'report' },
  { label: 'Log Time', icon: ClockIcon, action: 'time' },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(action => (
          <button
            key={action.label}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors"
          >
            <action.icon className="w-6 h-6 text-amber-600 mb-2" />
            <span className="text-sm text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 7. Today's Schedule Component

```typescript
// src/components/contractor-portal/TodaySchedule.tsx

export function TodaySchedule({ appointments }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-amber-600 font-medium whitespace-nowrap">
              {apt.time}
            </div>
            <div className="flex-1">
              <p className="font-medium">{apt.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {apt.location} • Est. {apt.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 8. Assigned Projects Component

```typescript
// src/components/contractor-portal/AssignedProjects.tsx

export function AssignedProjects({ projects }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Assigned Projects</h3>
        <Link href="/contractor-portal/projects" className="text-sm text-amber-600">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {projects.map(project => (
          <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <span className="font-medium">{project.name}</span>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {project.tasksRemaining > 0
                ? `${project.tasksRemaining} tasks remaining`
                : project.startDate
                  ? `Starts ${project.startDate}`
                  : 'All tasks complete'
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Mock Data

```typescript
const mockContractor = {
  id: 'c1',
  name: 'Mike Rodriguez',
  role: 'Installer',
  avatar: 'MR'
};

const todaySchedule = [
  {
    id: 's1',
    time: '9:00 AM',
    title: 'Kitchen Install - Johnson Residence',
    location: '123 Main St, Riverside',
    duration: '4 hours'
  },
  {
    id: 's2',
    time: '2:00 PM',
    title: 'Final Walkthrough - Chen Home',
    location: '456 Oak Ave, Downtown',
    duration: '1 hour'
  }
];

const assignedProjects = [
  { id: 'p1', name: 'Johnson Kitchen Remodel', status: 'active', tasksRemaining: 3 },
  { id: 'p2', name: 'Chen Living Room', status: 'active', tasksRemaining: 1 },
  { id: 'p3', name: 'Martinez Master Bath', status: 'upcoming', startDate: 'Jan 15' }
];

const tasks = [
  {
    id: 't1',
    description: 'Install pendant lights over island',
    project: 'Johnson Kitchen Remodel',
    dueDate: '2024-12-30',
    status: 'pending'
  },
  {
    id: 't2',
    description: 'Mount wall sconces in dining area',
    project: 'Johnson Kitchen Remodel',
    completedDate: '2024-12-28',
    status: 'completed'
  },
  {
    id: 't3',
    description: 'Assemble and position dining table',
    project: 'Chen Living Room',
    dueDate: '2025-01-05',
    status: 'in_progress'
  },
  {
    id: 't4',
    description: 'Install bathroom vanity',
    project: 'Martinez Master Bath',
    dueDate: '2025-01-18',
    status: 'pending'
  }
];
```

## Color Theme Reminder

Contractor Portal uses **orange/amber** theme:
- Primary: `amber-500` (#f59e0b)
- Hover: `amber-600`
- Light bg: `amber-50`
- Border accent: `amber-500`

## Success Criteria

- [ ] Header nav replaced with sidebar
- [ ] Sidebar has orange/amber accent color
- [ ] Sidebar shows: Dashboard, My Tasks, Projects, Schedule, Timesheet, Messages
- [ ] Contractor name/role at bottom of sidebar
- [ ] Sidebar collapses on mobile
- [ ] Dashboard has Today's Schedule section
- [ ] Dashboard has Quick Actions (Upload Photos, Message Designer, Report Issue, Log Time)
- [ ] Dashboard has Assigned Projects section
- [ ] My Tasks page has filter tabs (All, Pending, In Progress, Completed)
- [ ] Tasks have checkboxes to mark complete
- [ ] Tasks show project name, due date, status
- [ ] Orange theme consistent throughout
- [ ] Responsive on mobile

## Don't Touch

- Admin pages
- Client Portal (another agent handles that)
- Main admin sidebar
- Other portals

