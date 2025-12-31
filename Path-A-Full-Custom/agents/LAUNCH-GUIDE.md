# Agent Launch Guide - Path A Refinement

## Overview

6 focused agents in 2 phases to refine the Path A demo.

| Phase | Agents | Can Run In Parallel |
|-------|--------|---------------------|
| **Phase 1** | 4 agents | Yes - all 4 simultaneously |
| **Phase 2** | 2 agents | Yes - both simultaneously |

**Total agents:** 6
**Phases:** 2 (Phase 2 starts after Phase 1 completes)

---

## Prerequisites

Make sure the demo is working before launching agents:

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo
npm run dev
# Verify http://localhost:3000 loads
```

---

## Phase 1: Core Improvements (4 Parallel Agents)

Launch all 4 terminals simultaneously. Each agent works on isolated parts.

### Terminal 1: Agent 1 - Dashboard

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-1-AGENT-1-DASHBOARD.md and execute all tasks. The demo is in ./demo/
```

**Agent 1 Output:**
- Rebuilt dashboard with interior design metrics
- New components in `src/components/dashboard/`

---

### Terminal 2: Agent 2 - Infrastructure

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-1-AGENT-2-INFRASTRUCTURE.md and execute all tasks. The demo is in ./demo/
```

**Agent 2 Output:**
- Reports page (`/reports`)
- Vendors page (`/vendors`)
- Settings page (`/settings`)
- Cleaned sidebar (no branding, Selection Boards nav added)

---

### Terminal 3: Agent 3 - KPI Bars

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-1-AGENT-3-KPI-BARS.md and execute all tasks. The demo is in ./demo/
```

**Agent 3 Output:**
- KPIBar component
- KPI bars added to 5 list pages

---

### Terminal 4: Agent 4 - Selection Boards

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-1-AGENT-4-SELECTION-BOARDS.md and execute all tasks. The demo is in ./demo/
```

**Agent 4 Output:**
- Selection boards list page
- Selection board builder with drag-and-drop
- All board components

---

## Phase 1 Completion Check

Before starting Phase 2, verify all Phase 1 work:

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo
npm run dev
```

Check:
- [ ] Dashboard shows interior design metrics (not generic CRM)
- [ ] `/reports` loads without 404
- [ ] `/vendors` loads without 404
- [ ] `/settings` loads without 404
- [ ] Sidebar has "Selection Boards" nav item
- [ ] Sidebar has no "Purchase Plan" widget
- [ ] `/selection-boards` shows board grid
- [ ] Can open a board in the builder
- [ ] Drag-and-drop works in builder
- [ ] KPI bars visible on Clients, Projects, Materials, Proposals, Invoices pages

**If anything is broken, fix it before Phase 2.**

---

## Phase 2: Integration & Polish (2 Parallel Agents)

Launch after Phase 1 is complete and verified.

### Terminal 5: Agent 5 - Client Portal Integration

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-2-AGENT-5-CLIENT-PORTAL-INTEGRATION.md and execute all tasks. The demo is in ./demo/

Note: Phase 1 is complete. Selection Boards feature exists in src/components/selection-boards/
```

**Agent 5 Output:**
- Selection Boards section in Client Portal
- Board viewing for clients
- Approve/Request Changes functionality

---

### Terminal 6: Agent 6 - Polish

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom
claude
```

**Prompt:**
```
Read agents/PHASE-2-AGENT-6-POLISH.md and execute all tasks. The demo is in ./demo/

Note: Phase 1 is complete. All pages exist. Your job is animations and mobile fixes.
```

**Agent 6 Output:**
- Framer Motion on all pages
- Mobile responsiveness fixes
- Overall polish

---

## Final Verification

After Phase 2 completes:

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo
npm run dev
```

### Desktop Check (1440px width)
- [ ] Dashboard - custom metrics, chart, activities
- [ ] Clients - KPI bar + table
- [ ] Projects - KPI bar + list
- [ ] Materials - KPI bar + catalog
- [ ] Selection Boards - board grid
- [ ] Board Builder - drag-and-drop works
- [ ] Proposals - KPI bar + list
- [ ] Invoices - KPI bar + list
- [ ] Reports - charts
- [ ] Vendors - table
- [ ] Settings - form
- [ ] Client Portal - Selection Boards section
- [ ] Client Portal - can approve boards
- [ ] Page transitions smooth

### Mobile Check (375px width)
- [ ] All pages load
- [ ] No horizontal scroll
- [ ] Sidebar collapses
- [ ] Touch targets usable
- [ ] Selection board builder handled (message or responsive)

### Animation Check
- [ ] Pages fade in
- [ ] Animations smooth (60fps)
- [ ] No janky/slow transitions

---

## Troubleshooting

### Agent runs out of context
The prompts are designed to be minimal. If an agent still runs out:
1. Tell it to focus on the most critical items first
2. Split the work further if needed

### Merge conflicts
Agents work on different files, so conflicts should be rare. If they happen:
1. Check which agent's changes are more recent
2. Manually merge if needed

### Something is broken after Phase 1
Fix it before Phase 2. Don't let issues compound.

### Build errors
```bash
npm run build
```
Fix any TypeScript/build errors before marking phase complete.

---

## Agent Prompt Files

All prompts are in:
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/agents/

├── PHASE-1-AGENT-1-DASHBOARD.md
├── PHASE-1-AGENT-2-INFRASTRUCTURE.md
├── PHASE-1-AGENT-3-KPI-BARS.md
├── PHASE-1-AGENT-4-SELECTION-BOARDS.md
├── PHASE-2-AGENT-5-CLIENT-PORTAL-INTEGRATION.md
├── PHASE-2-AGENT-6-POLISH.md
└── LAUNCH-GUIDE.md (this file)
```

---

## Time Estimates

| Agent | Estimated Time |
|-------|----------------|
| Agent 1 - Dashboard | 30-60 min |
| Agent 2 - Infrastructure | 45-90 min |
| Agent 3 - KPI Bars | 30-45 min |
| Agent 4 - Selection Boards | 60-120 min |
| Agent 5 - Client Portal | 30-60 min |
| Agent 6 - Polish | 45-90 min |

**Phase 1 total (parallel):** ~1-2 hours (limited by Agent 4)
**Phase 2 total (parallel):** ~45-90 min

**Total wall clock time:** ~2-3 hours (if everything goes smoothly)
