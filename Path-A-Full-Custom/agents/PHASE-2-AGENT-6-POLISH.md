# Agent 6: Polish - Animations & Mobile

## Your Task
Final polish pass: Add Framer Motion animations to all pages and verify mobile responsiveness.

**IMPORTANT:** This is Phase 2. Run this AFTER Phase 1 agents complete. All pages must exist first.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Check if framer-motion is installed: `package.json`
2. Briefly scan page files to understand structure (don't deep dive)

**If framer-motion is not installed:**
```bash
npm install framer-motion
```

---

## Task 1: Add Page Transitions

Every page should have a smooth fade-in animation when navigating.

### The Pattern

Add this to EVERY page component:

```typescript
'use client';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 }
};

export default function PageName() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1]  // Material Design easing
      }}
    >
      {/* Existing page content */}
    </motion.div>
  );
}
```

### Pages to Update

Go through each page and wrap content in motion.div:

**Main Platform:**
- [ ] Dashboard (`/`)
- [ ] Clients (`/clients`)
- [ ] Projects (`/projects`)
- [ ] Materials Library (`/materials`)
- [ ] Selection Boards (`/selection-boards`)
- [ ] Selection Board Builder (`/selection-boards/[id]`)
- [ ] Proposals (`/proposals`)
- [ ] Invoices (`/invoices`)
- [ ] Reports (`/reports`)
- [ ] Vendors (`/vendors`)
- [ ] Settings (`/settings`)

**Client Portal:**
- [ ] Client Dashboard
- [ ] Client Messages
- [ ] Client Documents
- [ ] Client Selection Boards
- [ ] Client Board Detail

**Contractor Portal:**
- [ ] Contractor Tasks
- [ ] Contractor Messages

---

## Task 2: Modal Animations

If there are modals/dialogs, add slide-up animation (iOS-style):

```typescript
import { motion, AnimatePresence } from 'framer-motion';

// Wrap modal in AnimatePresence for exit animations
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300
        }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 md:relative md:rounded-lg md:max-w-lg md:mx-auto md:my-20"
      >
        {/* Modal content */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## Task 3: Micro-interactions (Optional but Nice)

If time permits, add subtle animations to:

**Buttons on hover:**
```typescript
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="..."
>
  Button Text
</motion.button>
```

**Cards on hover:**
```typescript
<motion.div
  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
  className="..."
>
  Card content
</motion.div>
```

**List item stagger (for lists):**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

---

## Task 4: Mobile Responsiveness Check

Test every page at 375px width (iPhone SE size). Fix issues you find.

### Common Issues to Look For:

1. **Tables overflowing** → Wrap in `overflow-x-auto` container
2. **Text too large** → Use responsive text: `text-sm md:text-base`
3. **Buttons too small** → Minimum 44x44px touch target
4. **Horizontal overflow** → Check for fixed widths, use `max-w-full`
5. **Sidebar not collapsing** → Should be hidden or hamburger menu on mobile
6. **Forms too wide** → Stack inputs vertically on mobile

### Selection Board Builder Special Case

The drag-and-drop builder might not work well on mobile. Two options:

**Option A:** Show a "Desktop recommended" message on mobile:
```typescript
<div className="block md:hidden p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-4">
  For the best experience, please use a desktop or tablet to edit selection boards.
</div>
```

**Option B:** Stack canvas and sidebar vertically on mobile (sidebar above canvas)

Choose based on what works better.

### Responsive Breakpoints

TailAdmin uses standard Tailwind breakpoints:
- Mobile: default (no prefix)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

---

## Testing Checklist

For each page, verify:

- [ ] Page has fade-in animation
- [ ] No console errors
- [ ] Looks good at 1440px (desktop)
- [ ] Looks good at 768px (tablet)
- [ ] Looks good at 375px (mobile)
- [ ] Touch targets are large enough (44px)
- [ ] No horizontal scroll on mobile
- [ ] Text is readable on mobile

---

## Animation Guidelines (Apple/Revolut Style)

- **Duration:** 200-400ms (never slower)
- **Easing:** Use `[0.4, 0.0, 0.2, 1]` (Material/Apple curve)
- **Properties:** Only animate `transform` and `opacity` (GPU accelerated)
- **Subtlety:** Animations should be felt, not seen. No bouncing, no overshooting.

**DON'T:**
- Animate color, background, border (causes repaint)
- Use bounce effects
- Make animations longer than 400ms
- Animate everything all the time

---

## Success Criteria

- [ ] Every page has fade-in animation
- [ ] Animations are smooth (60fps)
- [ ] Animations are subtle (not distracting)
- [ ] All pages work on mobile viewport
- [ ] No horizontal scroll issues
- [ ] Touch targets are 44px minimum
- [ ] Selection board builder has mobile handling
- [ ] No console errors related to framer-motion
- [ ] Demo feels polished and professional

---

## Don't Touch

- Business logic
- Data/mock data
- API calls
- Core functionality

Only add animations and fix responsive issues.
