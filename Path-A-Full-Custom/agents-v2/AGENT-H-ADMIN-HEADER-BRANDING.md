# Agent H: Admin Header & Branding Fix

## Your Task
Fix the admin portal header: change branding, update header actions, remove quick tips, and change profile picture to icon.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Admin header component (look for Header.tsx or similar in layout components)
2. Mobile header/sidebar components
3. Client Portal header (for reference - it has the correct pattern)

## Changes Needed

### 1. Change "TailAdmin" to "AF Designs"

**Current (Mobile):** Shows "TailAdmin" with TailAdmin logo
**New:** Should show "AF Designs" with AF logo (like Client Portal has)

Find wherever "TailAdmin" is referenced and change to "AF Designs". This includes:
- Mobile header text
- Any logo references
- Page title/metadata if applicable

### 2. Replace 3-Dot Menu with Profile + Notifications Buttons

**Current:** 3-dot menu that opens dropdown with Night mode, Notifications, Profile
**New:** Two separate icon buttons like Client Portal has:
- Notification bell icon (with red dot indicator)
- Profile icon button (circular, with initials or user icon)

```
CURRENT:                          NEW (like Client Portal):
┌────────────────────────┐       ┌────────────────────────┐
│ ☰  TailAdmin    [···]  │       │ ☰  AF Designs  🔔 👤   │
└────────────────────────┘       └────────────────────────┘
```

**Reference the Client Portal header** - it already has this pattern with the bell icon and "JD" profile circle.

### 3. Update Profile Dropdown Menu

When clicking the profile button, show dropdown with:
- Profile
- Account Settings
- Night Mode toggle
- Switch Portals → (submenu or links to Client Portal, Contractor Portal)
- Sign Out

```
┌─────────────────────┐
│ 👤 Angie Finton     │
│    Admin            │
├─────────────────────┤
│ Profile             │
│ Account Settings    │
│ Night Mode    [○──] │
├─────────────────────┤
│ Switch Portal →     │
│   • Client Portal   │
│   • Contractor      │
├─────────────────────┤
│ Sign Out            │
└─────────────────────┘
```

### 4. Remove Quick Tips Section

Find and remove the "Quick Tip" or "Tips" section that appears on the dashboard/sidebar. This should be removed from:
- Desktop view
- Mobile view
- Sidebar (if it's there)

### 5. Change Profile Picture to Profile Icon

**Current:** Shows a photo of "Musharof"
**New:** Show a profile icon or initials circle instead

Options:
- Use initials "AF" for Angie Finton in a colored circle
- Use a generic UserIcon from Heroicons

```
CURRENT:              NEW:
┌──────┐             ┌──────┐
│ 📷   │             │  AF  │  ← Initials in circle
│photo │             │      │
└──────┘             └──────┘

OR:
┌──────┐
│ 👤   │  ← User icon
└──────┘
```

Update the name from "Musharof" to "Angie Finton" or just "AF Designs" for the admin.

## Implementation Reference

Look at how the Client Portal header is implemented. It has:
- "AF" logo badge (green rounded square with "AF")
- "Client Portal" text
- Bell icon with notification dot
- "JD" initials circle for profile

Replicate this pattern for the admin but with:
- Blue theme (not green)
- "AF Designs" text (not "Client Portal")
- "AF" initials (for Angie Finton) or generic user icon

## Component Updates

### Header Component
```typescript
// Example structure
<header className="flex items-center justify-between px-4 py-3 bg-white border-b">
  {/* Left: Hamburger + Logo */}
  <div className="flex items-center gap-3">
    <button onClick={toggleSidebar}>
      <Bars3Icon className="w-6 h-6" />
    </button>
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">AF</span>
      </div>
      <span className="font-semibold">AF Designs</span>
    </div>
  </div>

  {/* Right: Notifications + Profile */}
  <div className="flex items-center gap-2">
    <button className="relative p-2 rounded-full hover:bg-gray-100">
      <BellIcon className="w-6 h-6 text-gray-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </button>
    <ProfileDropdown />
  </div>
</header>
```

### Profile Dropdown Component
```typescript
export function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
      >
        <span className="text-blue-600 font-medium">AF</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2">
          <div className="px-4 py-2 border-b">
            <p className="font-medium">Angie Finton</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>

          <div className="py-1">
            <DropdownItem href="/profile">Profile</DropdownItem>
            <DropdownItem href="/settings">Account Settings</DropdownItem>
            <NightModeToggle />
          </div>

          <div className="py-1 border-t">
            <p className="px-4 py-1 text-xs text-gray-500 uppercase">Switch Portal</p>
            <DropdownItem href="/client-portal">Client Portal</DropdownItem>
            <DropdownItem href="/contractor-portal">Contractor Portal</DropdownItem>
          </div>

          <div className="py-1 border-t">
            <DropdownItem href="/logout" className="text-red-600">Sign Out</DropdownItem>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Success Criteria

- [ ] Mobile header shows "AF Designs" (not "TailAdmin")
- [ ] Logo is "AF" in blue rounded square (not TailAdmin logo)
- [ ] 3-dot menu replaced with Notifications bell + Profile button
- [ ] Notification bell has red indicator dot
- [ ] Profile button shows initials "AF" (not photo)
- [ ] Profile dropdown shows: Profile, Account Settings, Night Mode, Switch Portals, Sign Out
- [ ] Switch Portals has links to Client Portal and Contractor Portal
- [ ] Quick Tips section removed from dashboard
- [ ] Quick Tips removed from sidebar (if present)
- [ ] Name shows "Angie Finton" or "AF Designs" (not "Musharof")
- [ ] Works on both desktop and mobile

## Don't Touch

- Client Portal (already correct)
- Contractor Portal (different agent)
- Page content below header
- Sidebar navigation items
