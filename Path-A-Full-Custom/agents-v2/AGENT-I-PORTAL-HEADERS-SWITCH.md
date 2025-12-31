# Agent I: Portal Headers & Switch Portals

## Your Task
Add profile icon to Contractor Portal header and add "Switch Portals" functionality to both Client and Contractor portals.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Client Portal header (has the correct pattern with bell + profile)
2. Contractor Portal header (missing profile icon)
3. Profile dropdown components in both portals

## Changes Needed

### 1. Add Profile Icon to Contractor Portal Header

**Current:** Contractor Portal only has notification bell, no profile icon
**New:** Add profile icon like Client Portal has

```
CURRENT (Contractor):             NEW (like Client Portal):
┌────────────────────────┐       ┌────────────────────────┐
│ ☰  Contractor   🔔     │       │ ☰  Contractor   🔔 MR  │
└────────────────────────┘       └────────────────────────┘
```

The Client Portal has:
- Bell icon (🔔) with notification dot
- Profile circle with initials "JD"

Contractor Portal should have the same pattern:
- Bell icon with notification dot
- Profile circle with initials "MR" (Mike Rodriguez) in orange/amber color

### 2. Add Switch Portals to Client Portal

Add "Switch Portals" option to the Client Portal profile dropdown so users can navigate to:
- Admin Portal (main dashboard)
- Contractor Portal

```
Client Portal Profile Dropdown:
┌─────────────────────┐
│ 👤 John Davis       │
│    Client           │
├─────────────────────┤
│ Profile             │
│ Account Settings    │
├─────────────────────┤
│ Switch Portal →     │  ← ADD THIS
│   • Admin Portal    │
│   • Contractor      │
├─────────────────────┤
│ Sign Out            │
└─────────────────────┘
```

### 3. Add Switch Portals to Contractor Portal

Add "Switch Portals" option to the Contractor Portal profile dropdown:

```
Contractor Portal Profile Dropdown:
┌─────────────────────┐
│ 👤 Mike Rodriguez   │
│    Installer        │
├─────────────────────┤
│ Profile             │
│ Account Settings    │
├─────────────────────┤
│ Switch Portal →     │  ← ADD THIS
│   • Admin Portal    │
│   • Client Portal   │
├─────────────────────┤
│ Sign Out            │
└─────────────────────┘
```

## Implementation

### Contractor Portal Header Update

```typescript
// Add profile button next to notifications
<header className="flex items-center justify-between px-4 py-3 bg-white border-b">
  {/* Left side - hamburger + logo */}
  <div className="flex items-center gap-3">
    <button onClick={toggleSidebar}>
      <Bars3Icon className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">AF</span>
      </div>
      <span className="font-semibold">Contractor Portal</span>
    </div>
  </div>

  {/* Right side - notifications + profile */}
  <div className="flex items-center gap-2">
    {/* Notification bell */}
    <button className="relative p-2 rounded-full hover:bg-gray-100">
      <BellIcon className="w-6 h-6 text-gray-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </button>

    {/* Profile - ADD THIS */}
    <ContractorProfileDropdown />
  </div>
</header>
```

### Profile Dropdown with Switch Portals

```typescript
// Reusable for both portals
interface PortalDropdownProps {
  user: { name: string; role: string; initials: string };
  accentColor: string; // 'emerald' for client, 'amber' for contractor
  currentPortal: 'client' | 'contractor';
}

export function PortalProfileDropdown({ user, accentColor, currentPortal }: PortalDropdownProps) {
  const [open, setOpen] = useState(false);

  const otherPortals = [
    { label: 'Admin Portal', href: '/' },
    currentPortal === 'client'
      ? { label: 'Contractor Portal', href: '/contractor-portal' }
      : { label: 'Client Portal', href: '/client-portal' },
  ];

  const bgColor = accentColor === 'emerald' ? 'bg-emerald-100' : 'bg-amber-100';
  const textColor = accentColor === 'emerald' ? 'text-emerald-600' : 'text-amber-600';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}
      >
        <span className={`${textColor} font-medium`}>{user.initials}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
          {/* User info */}
          <div className="px-4 py-2 border-b">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          {/* Profile links */}
          <div className="py-1">
            <DropdownLink href={`/${currentPortal}-portal/profile`}>Profile</DropdownLink>
            <DropdownLink href={`/${currentPortal}-portal/settings`}>Account Settings</DropdownLink>
          </div>

          {/* Switch Portals */}
          <div className="py-1 border-t">
            <p className="px-4 py-1 text-xs text-gray-500 uppercase tracking-wide">Switch Portal</p>
            {otherPortals.map(portal => (
              <DropdownLink key={portal.href} href={portal.href}>
                {portal.label}
              </DropdownLink>
            ))}
          </div>

          {/* Sign out */}
          <div className="py-1 border-t">
            <DropdownLink href="/logout" className="text-red-600">
              Sign Out
            </DropdownLink>
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownLink({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${className}`}
    >
      {children}
    </Link>
  );
}
```

### Usage in Client Portal

```typescript
<PortalProfileDropdown
  user={{ name: 'John Davis', role: 'Client', initials: 'JD' }}
  accentColor="emerald"
  currentPortal="client"
/>
```

### Usage in Contractor Portal

```typescript
<PortalProfileDropdown
  user={{ name: 'Mike Rodriguez', role: 'Installer', initials: 'MR' }}
  accentColor="amber"
  currentPortal="contractor"
/>
```

## Color Reference

**Client Portal (Green/Emerald):**
- Profile bg: `bg-emerald-100`
- Profile text: `text-emerald-600`
- Initials: "JD" (John Davis)

**Contractor Portal (Orange/Amber):**
- Profile bg: `bg-amber-100`
- Profile text: `text-amber-600`
- Initials: "MR" (Mike Rodriguez)

## Success Criteria

- [ ] Contractor Portal header has profile icon (not just notification bell)
- [ ] Contractor profile icon shows "MR" initials in amber/orange circle
- [ ] Contractor profile dropdown appears when clicking profile
- [ ] Contractor dropdown has: Profile, Account Settings, Switch Portal, Sign Out
- [ ] Client Portal dropdown has "Switch Portal" section
- [ ] Switch Portal shows links to Admin Portal and the other portal
- [ ] Clicking switch portal links navigates correctly
- [ ] Colors match portal themes (emerald for client, amber for contractor)
- [ ] Works on both desktop and mobile
- [ ] Dropdown closes when clicking outside

## Don't Touch

- Admin Portal (different agent)
- Sidebar navigation
- Page content
- Other portal functionality
