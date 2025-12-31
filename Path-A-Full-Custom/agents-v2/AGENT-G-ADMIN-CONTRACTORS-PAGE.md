# Agent G: Admin Contractors Page

## Your Task
Create a new Contractors management page in the admin area for managing contractors, viewing timesheets, and assigning jobs.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Existing admin pages structure (Clients, Projects) for pattern reference
2. Admin sidebar navigation to understand where to add the link

## The Problem
The admin currently has no way to manage contractors. The Contractor Portal exists but there's no admin interface to:
- View all contractors
- Assign contractors to projects/tasks
- View timesheets and hours logged
- Manage contractor schedules

## Changes Needed

### 1. Add Contractors to Admin Sidebar

Add "Contractors" link to the admin sidebar navigation:

```
Admin Sidebar:
├── Dashboard
├── Clients
├── Projects
├── Materials
├── Selection Boards
├── Proposals
├── Invoices
├── Contractors  ← NEW
└── Reports
```

**Icon:** WrenchScrewdriverIcon or UserGroupIcon

### 2. Create Contractors List Page

**Location:** `src/app/(admin)/contractors/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│ Contractors                                      [+ Add Contractor] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ 🔵 4     │ │ 🟢 3     │ │ 🟠 12    │ │ 💰 $8.2K │            │
│ │ Total    │ │ Active   │ │ Jobs This│ │ Paid This│            │
│ │Contractors│ │ Today   │ │  Month   │ │   Month  │            │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│                                                                  │
│ Search: [________________]    Filter: [All Specialties ▼]       │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 👤 Mike Rodriguez                                          │   │
│ │    Installer • 🟢 Active                                   │   │
│ │                                                            │   │
│ │    Current: Johnson Kitchen Remodel                        │   │
│ │    Hours This Week: 32 hrs                                 │   │
│ │    Rating: ★★★★★ (12 jobs)                                │   │
│ │                                                            │   │
│ │    [View Profile] [Assign Job] [View Timesheet]           │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 👤 Sarah Chen                                              │   │
│ │    Painter • 🟡 Available                                  │   │
│ │                                                            │   │
│ │    Last Job: Chen Living Room (Completed Dec 20)          │   │
│ │    Hours This Week: 0 hrs                                  │   │
│ │    Rating: ★★★★☆ (8 jobs)                                 │   │
│ │                                                            │   │
│ │    [View Profile] [Assign Job] [View Timesheet]           │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ 👤 James Wilson                                            │   │
│ │    Electrician • 🟢 Active                                 │   │
│ │                                                            │   │
│ │    Current: Martinez Master Bath                           │   │
│ │    Hours This Week: 24 hrs                                 │   │
│ │    Rating: ★★★★★ (15 jobs)                                │   │
│ │                                                            │   │
│ │    [View Profile] [Assign Job] [View Timesheet]           │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Create Contractor Detail Page

**Location:** `src/app/(admin)/contractors/[id]/page.tsx`

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Contractors                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  👤 Mike Rodriguez                         [Edit] [Message] │ │
│ │     Installer • 🟢 Active                                   │ │
│ │                                                              │ │
│ │     📧 mike@email.com    📱 (555) 123-4567                  │ │
│ │     📍 Riverside, CA                                        │ │
│ │                                                              │ │
│ │     Specialties: Installation, Assembly, Delivery           │ │
│ │     Hourly Rate: $45/hr                                     │ │
│ │     Rating: ★★★★★ (12 completed jobs)                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │ 📅 SCHEDULE  │ │ ⏱️ TIMESHEET │ │ 📋 JOBS      │             │
│ └──────────────┘ └──────────────┘ └──────────────┘             │
│                                                                  │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│ Upcoming Schedule                                    [+ Add Job] │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ Dec 30 • 9:00 AM - 1:00 PM                                │   │
│ │ Install pendant lights - Johnson Kitchen Remodel          │   │
│ │ 📍 123 Main St                                            │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌───────────────────────────────────────────────────────────┐   │
│ │ Jan 2 • 10:00 AM - 4:00 PM                                │   │
│ │ Full day installation - Chen Living Room                   │   │
│ │ 📍 456 Oak Ave                                            │   │
│ └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│ Recent Timesheet                                     [View All]  │
│                                                                  │
│ Week of Dec 23-29, 2024                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun │ Total            │ │
│ │ 8h  │ 8h  │ 6h  │ 8h  │ 4h  │ 0   │ 0   │ 34 hrs          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ Week Total: 34 hrs × $45/hr = $1,530                            │
│                                                                  │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│ Job History                                          [View All]  │
│                                                                  │
│ • Johnson Kitchen Remodel - In Progress (3 tasks remaining)     │
│ • Chen Living Room - In Progress (1 task remaining)             │
│ • Thompson Dining Room - Completed Dec 15 ✓                     │
│ • Williams Entry - Completed Dec 8 ✓                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Timesheet View Component

```typescript
// src/components/contractors/TimesheetView.tsx

interface TimesheetEntry {
  date: string;
  hours: number;
  project: string;
  tasks: string[];
  status: 'pending' | 'approved' | 'paid';
}

export function TimesheetView({ contractorId, entries }) {
  const weekTotal = entries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Timesheet</h3>
        <select className="text-sm border rounded-lg px-3 py-2">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-2">Date</th>
              <th className="pb-2">Project</th>
              <th className="pb-2">Tasks</th>
              <th className="pb-2">Hours</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.date} className="border-b">
                <td className="py-3">{entry.date}</td>
                <td className="py-3">{entry.project}</td>
                <td className="py-3 text-sm text-gray-500">{entry.tasks.join(', ')}</td>
                <td className="py-3">{entry.hours}h</td>
                <td className="py-3">
                  <StatusBadge status={entry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className="font-medium">Week Total: {weekTotal} hours</span>
        <button className="btn-primary">Approve & Pay</button>
      </div>
    </div>
  );
}
```

### 5. Assign Job Modal

```typescript
// src/components/contractors/AssignJobModal.tsx

export function AssignJobModal({ contractor, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          Assign Job to {contractor.name}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Select a project...</option>
              <option>Johnson Kitchen Remodel</option>
              <option>Chen Living Room</option>
              <option>Martinez Master Bath</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Task</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Select a task...</option>
              <option>Install pendant lights</option>
              <option>Mount wall sconces</option>
              <option>Assemble furniture</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input type="time" className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estimated Duration</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>Full day (8 hours)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              placeholder="Special instructions..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button className="btn-primary">Assign Job</button>
        </div>
      </div>
    </div>
  );
}
```

### 6. Add Contractor Modal

```typescript
// src/components/contractors/AddContractorModal.tsx

export function AddContractorModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Contractor</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" className="w-full border rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialty *</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Select specialty...</option>
              <option>Installer</option>
              <option>Painter</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Carpenter</option>
              <option>General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
            <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="45" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={2}
              placeholder="Additional notes about this contractor..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button className="btn-primary">Add Contractor</button>
        </div>
      </div>
    </div>
  );
}
```

## Mock Data

```typescript
const mockContractors = [
  {
    id: 'con1',
    name: 'Mike Rodriguez',
    email: 'mike@email.com',
    phone: '(555) 123-4567',
    location: 'Riverside, CA',
    specialty: 'Installer',
    hourlyRate: 45,
    status: 'active',
    currentProject: 'Johnson Kitchen Remodel',
    hoursThisWeek: 32,
    rating: 5,
    totalJobs: 12,
    specialties: ['Installation', 'Assembly', 'Delivery']
  },
  {
    id: 'con2',
    name: 'Sarah Chen',
    email: 'sarah@email.com',
    phone: '(555) 234-5678',
    location: 'Downtown, CA',
    specialty: 'Painter',
    hourlyRate: 40,
    status: 'available',
    lastProject: { name: 'Chen Living Room', completedDate: '2024-12-20' },
    hoursThisWeek: 0,
    rating: 4,
    totalJobs: 8,
    specialties: ['Interior Painting', 'Touch-ups', 'Wall Prep']
  },
  {
    id: 'con3',
    name: 'James Wilson',
    email: 'james@email.com',
    phone: '(555) 345-6789',
    location: 'Eastside, CA',
    specialty: 'Electrician',
    hourlyRate: 65,
    status: 'active',
    currentProject: 'Martinez Master Bath',
    hoursThisWeek: 24,
    rating: 5,
    totalJobs: 15,
    specialties: ['Lighting Installation', 'Wiring', 'Fixtures']
  },
  {
    id: 'con4',
    name: 'Lisa Park',
    email: 'lisa@email.com',
    phone: '(555) 456-7890',
    location: 'Westside, CA',
    specialty: 'General',
    hourlyRate: 35,
    status: 'available',
    lastProject: { name: 'Williams Entry', completedDate: '2024-12-10' },
    hoursThisWeek: 0,
    rating: 4.5,
    totalJobs: 6,
    specialties: ['Assembly', 'Delivery', 'Light Installation']
  }
];

const mockTimesheetEntries = [
  { date: 'Mon, Dec 23', project: 'Johnson Kitchen', tasks: ['Cabinet install'], hours: 8, status: 'approved' },
  { date: 'Tue, Dec 24', project: 'Johnson Kitchen', tasks: ['Counter install'], hours: 8, status: 'approved' },
  { date: 'Wed, Dec 25', project: '-', tasks: ['Holiday'], hours: 0, status: 'approved' },
  { date: 'Thu, Dec 26', project: 'Johnson Kitchen', tasks: ['Lighting prep'], hours: 6, status: 'pending' },
  { date: 'Fri, Dec 27', project: 'Johnson Kitchen', tasks: ['Fixture install'], hours: 8, status: 'pending' },
  { date: 'Sat, Dec 28', project: 'Chen Living Room', tasks: ['Furniture delivery'], hours: 4, status: 'pending' },
];

const contractorKPIs = [
  { label: 'Total Contractors', value: 4, icon: UsersIcon, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { label: 'Active Today', value: 3, icon: CheckCircleIcon, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { label: 'Jobs This Month', value: 12, icon: BriefcaseIcon, iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { label: 'Paid This Month', value: '$8.2K', icon: CurrencyDollarIcon, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
];
```

## Components to Create

1. **`src/app/(admin)/contractors/page.tsx`** - Contractors list page
2. **`src/app/(admin)/contractors/[id]/page.tsx`** - Contractor detail page
3. **`src/components/contractors/ContractorCard.tsx`** - Card component for list
4. **`src/components/contractors/TimesheetView.tsx`** - Timesheet table component
5. **`src/components/contractors/AssignJobModal.tsx`** - Modal for assigning jobs
6. **`src/components/contractors/AddContractorModal.tsx`** - Modal for adding contractors
7. **`src/components/contractors/ContractorSchedule.tsx`** - Schedule view component

## Update Sidebar Navigation

Add Contractors to the admin sidebar in `src/components/layout/Sidebar.tsx` or equivalent:

```typescript
const adminNavItems = [
  // ... existing items
  { label: 'Contractors', href: '/contractors', icon: WrenchScrewdriverIcon },
  // ... rest of items
];
```

## Success Criteria

- [ ] "Contractors" link added to admin sidebar
- [ ] Contractors list page created at `/contractors`
- [ ] List page has 4 KPIs with icons (Total, Active, Jobs, Paid)
- [ ] Each contractor card shows: name, specialty, status, current project, hours, rating
- [ ] "Add Contractor" button opens modal
- [ ] "Assign Job" button opens modal
- [ ] "View Timesheet" links to timesheet view
- [ ] Contractor detail page created at `/contractors/[id]`
- [ ] Detail page shows schedule, timesheet, job history
- [ ] Timesheet shows daily hours with approve/pay functionality
- [ ] Filter by specialty works
- [ ] Search by name works
- [ ] Page has Framer Motion animations
- [ ] Responsive on mobile

## Don't Touch

- Contractor Portal (different agent)
- Client Portal
- Other admin pages
- Main sidebar structure (just add the link)

