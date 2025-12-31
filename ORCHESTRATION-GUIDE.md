# Orchestration Guide
## AF Designs - Three Path Demo Build

**Created:** December 31, 2025
**Updated:** December 31, 2025
**Purpose:** Guide for launching and managing three parallel agent builds

---

## CRITICAL: Use TailAdmin Pro + Design Philosophy

Agents A and C should use **TailAdmin Pro** as their base template instead of building from scratch:
```
/Users/arnispiekus/Work/TailAdminPro/
```

They must also follow the **Apple/Revolut Design Principles**:
```
/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md
```

**Requirements:**
- Framer Motion for animations
- Desktop AND mobile responsive
- 44x44px minimum touch targets

See `/TAILADMIN-REFERENCE.md` for component mapping.

---

## Project Structure

```
Interior-Design-Worspace/
├── ORCHESTRATION-GUIDE.md          ← You are here
├── TAILADMIN-REFERENCE.md          ← TailAdmin component mapping (NEW!)
├── PDR-all-options.md              ← Combined PRD (reference)
├── meeting-transcript.md           ← Original client meeting
├── perplexity-research-dec2025.md  ← Technical research
│
├── Path-A-Full-Custom/
│   ├── PRD-frontend-demo.md        ← Full requirements (updated)
│   ├── AGENT-PROMPT.md             ← Agent instructions (updated)
│   └── demo/                       ← Agent builds here
│
├── Path-B-Automation/
│   ├── PRD-automation-flowchart.md ← Full requirements
│   ├── AGENT-PROMPT.md             ← Agent instructions
│   └── diagrams/                   ← Agent outputs here
│
└── Path-C-Hybrid/
    ├── PRD-hybrid-demo.md          ← Full requirements (updated)
    ├── AGENT-PROMPT.md             ← Agent instructions (updated)
    └── demo/                       ← Agent builds here
```

---

## External Resources

| Resource | Location |
|----------|----------|
| TailAdmin Pro | `/Users/arnispiekus/Work/TailAdminPro/` |
| Design Philosophy | `/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md` |

---

## How to Launch Agents

### Terminal 1: Agent A (Full Custom Demo)

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom

# Launch Claude Code
claude

# Give this prompt:
"Read AGENT-PROMPT.md first (it has the setup instructions), then read PRD-frontend-demo.md. Use TailAdmin Pro as your base and build the frontend demo in ./demo/"
```

### Terminal 2: Agent B (Automation Flowcharts)

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-B-Automation

# Launch Claude Code
claude

# Give this prompt:
"Read AGENT-PROMPT.md and PRD-automation-flowchart.md, then create the flowchart diagrams in ./diagrams/"
```

### Terminal 3: Agent C (Hybrid Demo)

```bash
cd /Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-C-Hybrid

# Launch Claude Code
claude

# Give this prompt:
"Read AGENT-PROMPT.md first (it has the setup instructions), then read PRD-hybrid-demo.md. Use TailAdmin Pro as your base and build the frontend demo in ./demo/"
```

---

## What Each Agent Produces

| Agent | Output | Base | Est. Time |
|-------|--------|------|-----------|
| **A** | Full frontend demo | TailAdmin Pro | 4-6 hours (faster with template) |
| **B** | Flowchart diagrams | Mermaid/React Flow | 2-4 hours |
| **C** | Partial frontend demo | TailAdmin Pro | 5-8 hours (faster with template) |

---

## Agent A: Full Custom Demo

**Goal:** Show what a complete custom platform would look like

**Using:** TailAdmin Pro + Framer Motion + Design Philosophy

**Key Pages:**
- Dashboard (from TailAdmin CRM dashboard)
- Clients (from ProductListTable)
- Projects (from InvoiceList + Tasks)
- Materials Library (from ProductListTable + price tracking)
- Proposals (from Invoice components + TaxJar badge)
- Invoices (from Invoice components + QuickBooks indicator)
- Client Portal (Chat components, green theme)
- Contractor Portal (minimal, orange theme)

**Success:** Client can visualize the complete replacement solution with premium feel

---

## Agent B: Automation Flowcharts

**Goal:** Show what automation can accomplish with existing tools

**Key Diagrams:**
1. Lead → Project automation
2. Contractor notifications
3. Weekly digest
4. Invoice reminders
5. Tax rate lookup
6. System architecture overview

**Critical Message:** Houzz Pro CANNOT be automated (no API)

**Success:** Client understands automation is limited but possible

---

## Agent C: Hybrid Demo

**Goal:** Show the "best of both worlds" approach

**Using:** TailAdmin Pro + Framer Motion + Design Philosophy

**Key Differentiators:**
- "View in Houzz" buttons (purple/pink highlight)
- Materials library with price change tracking
- Client portal with centralized messaging
- Selections tab showing Houzz integration
- "How It Works" architecture page

**Success:** Client sees this is pragmatic, not over-engineered

---

## Design Requirements (Agents A & C)

### Must Have

1. **Framer Motion Animations**
   - Page transitions (opacity + y translate)
   - Modals slide up from bottom
   - 200-400ms duration
   - Only animate `transform` and `opacity`

2. **Responsive Design**
   - Desktop: Full sidebar, wide layouts
   - Mobile: Collapsible sidebar, stacked layouts
   - Touch targets: 44x44px minimum
   - Test BOTH before marking complete

3. **Apple/Revolut Quality**
   - Clarity: 3-5 metrics on dashboard, not 20
   - Whitespace: Generous, never crowded
   - Consistency: Same patterns everywhere

4. **Color Schemes**
   - Designer Platform: Blue (TailAdmin default)
   - Client Portal: Green `#10b981`
   - Contractor Portal: Orange `#f59e0b`
   - Houzz Links (Path C): Purple `#a855f7`

---

## Orchestrator Checklist

### Before Launch
- [x] All PRD files created
- [x] All AGENT-PROMPT files created (updated with TailAdmin)
- [x] Folders exist for demo output
- [x] TAILADMIN-REFERENCE.md created
- [x] Design philosophy document verified

### During Build
- [ ] Check in on Agent A progress
- [ ] Check in on Agent B progress
- [ ] Check in on Agent C progress
- [ ] Answer any questions agents have
- [ ] Verify agents are using TailAdmin Pro (not building from scratch)
- [ ] Verify agents are implementing Framer Motion
- [ ] Verify agents are testing mobile responsiveness

### After Build
- [ ] Review Agent A demo (`cd demo && npm run dev`)
- [ ] Review Agent B diagrams
- [ ] Review Agent C demo (`cd demo && npm run dev`)
- [ ] Test all demos on mobile viewport
- [ ] Verify animations are smooth (60fps)
- [ ] Collect all deliverables
- [ ] Prepare presentation for client

---

## Deployment Notes

### Path A & C Demos (Next.js + TailAdmin Pro)

Deploy to Vercel:
```bash
cd demo
vercel
```

Or run locally:
```bash
npm run dev
# Open http://localhost:3000
```

### Path B Diagrams

If images: Add to presentation directly
If React app: Deploy to Vercel same as above

---

## Client Presentation Order

Recommended order for presenting to client:

1. **Path B (Automation)** - Show first, cheapest option
   - "Here's what we can do with your existing tools"
   - Be honest about limitations

2. **Path C (Hybrid)** - Show second, middle ground
   - "Here's a smarter approach that keeps what works"
   - Emphasize materials library + client portal
   - Show the premium feel (animations, responsiveness)

3. **Path A (Full Custom)** - Show last, complete vision
   - "Here's what a complete solution looks like"
   - Reference back to pain points
   - Demonstrate mobile experience

4. **Comparison slide** - Let client choose
   - Side-by-side costs
   - What each solves

---

## Cost Summary for Client

| Path | Setup Cost | Monthly Cost | Solves |
|------|------------|--------------|--------|
| **B: Automation** | $3-6K | $300-400 (now) | Notifications, basic workflow |
| **C: Hybrid** | $40-55K | $315-570 (now) | Tax, prices, communication, PLUS Houzz |
| **A: Full Custom** | $65-95K | $375-800 | Everything (replaces Houzz) |

**Note:** Monthly costs increase when Houzz grandfathered pricing ends.

---

## Questions to Expect from Client

1. "Why can't you automate Houzz?"
   - No public API. It's a closed system.

2. "Can the custom platform do selection boards as well as Houzz?"
   - Possible but expensive to replicate. Chrome extension is hard.

3. "What happens when Houzz price goes up?"
   - Path A becomes more attractive. Path C still pays Houzz.

4. "Which do you recommend?"
   - Path C (Hybrid) for most clients. Best value.

5. "How long will this take?"
   - Path B: 4-5 weeks
   - Path C: 3-4 months
   - Path A: 6-8 months

---

## File Reference

| File | Purpose |
|------|---------|
| `TAILADMIN-REFERENCE.md` | Component mapping for TailAdmin Pro |
| `meeting-transcript.md` | Original client meeting |
| `Salesman-chat.md` | Earlier salesman conversation |
| `proposal.md` | Original proposal (outdated) |
| `perplexity.md` | Earlier research |
| `perplexity-2.md` | Earlier research |
| `perplexity-research-dec2025.md` | Latest research |
| `PDR-all-options.md` | Combined PRD |

### External Files

| File | Purpose |
|------|---------|
| `/Users/arnispiekus/Work/TailAdminPro/` | Template for demos |
| `/Users/arnispiekus/Work/Resources/design-philosophy/APPLE-REVOLUT-DESIGN-PRINCIPLES.md` | Design guidelines |
