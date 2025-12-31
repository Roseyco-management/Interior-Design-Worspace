# Path B: Automation Only
## Workflow Flowchart PRD

**Project:** AF Designs Interior Design Platform
**Path:** B - Automation Only (Keep Existing Tools)
**Deliverable:** Visual Flowcharts showing automation workflows
**Purpose:** Sales demo to show client what automation can accomplish with existing tools

---

## Executive Summary

Create visual flowcharts/diagrams that demonstrate how automation (n8n/Zapier) can connect the client's EXISTING software tools without building any custom software.

This path keeps all current tools (Houzz Pro, HoneyBook, Basecamp, Canva, Dropbox) and adds an automation layer to reduce manual work.

**Deliverable:** A set of flowcharts (images or interactive) that can be presented to the client.

---

## The Client Context

**Current Software Stack (all kept):**
| Software | Purpose | Can Automate? |
|----------|---------|---------------|
| Houzz Pro | Selections, proposals, invoices | NO (no API) |
| HoneyBook | CRM, contracts | YES (via Zapier) |
| Basecamp | Contractor coordination | YES (full API) |
| Canva | Mood boards | LIMITED |
| Dropbox | File storage | YES |

**Key Limitation:** Houzz Pro has NO API. It remains a manual island in any automation.

---

## Flowcharts to Create

### Flowchart 1: Lead to Project Automation
**Title:** "New Lead → Automatic Project Setup"

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LEAD TO PROJECT AUTOMATION                        │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  New Lead    │
    │  (Website    │
    │   Form)      │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  HoneyBook   │
    │  Lead Created│
    │  (TRIGGER)   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   n8n/Zapier │
    │   Workflow   │
    └──────┬───────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌─────────────┐
│ Email   │  │ Add to      │
│ Notif   │  │ Google      │
│ to Angie│  │ Sheet       │
└─────────┘  │ (Lead       │
             │ Tracker)    │
             └─────────────┘

    ════════════════════════════════════════════════════════
    WHEN CONTRACT SIGNED:
    ════════════════════════════════════════════════════════

    ┌──────────────┐
    │  Contract    │
    │  Signed in   │
    │  HoneyBook   │
    │  (TRIGGER)   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   n8n/Zapier │
    └──────┬───────┘
           │
     ┌─────┼─────────────┐
     │     │             │
     ▼     ▼             ▼
┌───────┐ ┌─────────┐  ┌─────────────┐
│Create │ │ Add     │  │ Send        │
│Project│ │ Default │  │ Welcome     │
│in     │ │ Task    │  │ Email to    │
│Basecamp│ │ List    │  │ Client      │
└───────┘ └─────────┘  └─────────────┘

    ⚠️ MANUAL STEP REQUIRED:
    ┌─────────────────────────────────┐
    │  Create project in Houzz Pro   │
    │  (No API - must be manual)     │
    └─────────────────────────────────┘
```

**What This Automates:**
- Lead notification
- Lead tracking spreadsheet
- Basecamp project creation
- Default task list setup
- Welcome email

**What Stays Manual:**
- Houzz Pro project creation

---

### Flowchart 2: Contractor Task Assignment
**Title:** "Task Assigned → Contractor Notified"

```
┌─────────────────────────────────────────────────────────────────────┐
│                 CONTRACTOR NOTIFICATION AUTOMATION                   │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │  Angie Creates   │
    │  Task in         │
    │  Basecamp        │
    │  (Assigns to     │
    │   contractor)    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  Basecamp        │
    │  "Task Created"  │
    │  (TRIGGER)       │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │    n8n/Zapier    │
    │    Checks if     │
    │    assigned to   │
    │    contractor    │
    └────────┬─────────┘
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
┌────────────┐  ┌────────────┐
│  Email     │  │  SMS via   │
│  to        │  │  Twilio    │
│  Contractor│  │  (optional)│
└────────────┘  └────────────┘
       │
       ▼
┌────────────────────────────────────────┐
│  Email Content:                        │
│  "You have a new task for [Project]    │
│   Task: [Task Name]                    │
│   Due: [Due Date]                      │
│   View in Basecamp: [Link]"            │
└────────────────────────────────────────┘
```

**What This Automates:**
- Email notification to contractor when task assigned
- Optional SMS notification

**What Stays Manual:**
- Creating the task itself

---

### Flowchart 3: Weekly Digest
**Title:** "Automatic Weekly Project Summary"

```
┌─────────────────────────────────────────────────────────────────────┐
│                      WEEKLY DIGEST AUTOMATION                        │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │  Every Monday    │
    │  9:00 AM         │
    │  (SCHEDULE       │
    │   TRIGGER)       │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │    n8n/Zapier    │
    └────────┬─────────┘
             │
     ┌───────┼───────┐
     │       │       │
     ▼       ▼       ▼
┌────────┐ ┌────────┐ ┌────────┐
│ Get    │ │ Get    │ │ Get    │
│ Active │ │ Tasks  │ │ Over-  │
│Projects│ │ Due    │ │ due    │
│ from   │ │ This   │ │ Tasks  │
│Basecamp│ │ Week   │ │        │
└────┬───┘ └───┬────┘ └───┬────┘
     │         │          │
     └────┬────┴──────────┘
          │
          ▼
    ┌──────────────────┐
    │  Compile Summary │
    │  Email           │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  Send to Angie   │
    └──────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  EMAIL EXAMPLE:                                                      │
│                                                                      │
│  Subject: Weekly Project Summary - Dec 30, 2025                      │
│                                                                      │
│  ACTIVE PROJECTS: 8                                                  │
│                                                                      │
│  TASKS DUE THIS WEEK:                                               │
│  • Dickey Kitchen - Order appliances (Due: Jan 2)                   │
│  • Gosche Bath - Tile delivery (Due: Jan 3)                         │
│  • Smith Living Room - Client review meeting (Due: Jan 4)           │
│                                                                      │
│  OVERDUE:                                                           │
│  • Johnson - Final invoice (3 days overdue)                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Flowchart 4: Invoice Reminder Automation
**Title:** "Unpaid Invoice → Automatic Reminders"

```
┌─────────────────────────────────────────────────────────────────────┐
│                    INVOICE REMINDER AUTOMATION                       │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │  Invoice Created │
    │  in HoneyBook    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  Invoice Sent    │
    │  to Client       │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  Wait 7 Days     │
    │  (DELAY)         │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  Check: Is       │
    │  Invoice Paid?   │
    └────────┬─────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌──────────┐  ┌──────────────────┐
│   YES    │  │       NO         │
│  (Stop)  │  │  Send Reminder   │
│          │  │  Email           │
└──────────┘  └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Wait 7 More     │
              │  Days            │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Check Again...  │
              │  (Repeat up to   │
              │   3 times)       │
              └──────────────────┘
```

---

### Flowchart 5: Tax Rate Lookup Tool
**Title:** "Manual Tax Lookup via TaxJar"

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TAX RATE LOOKUP (MANUAL TRIGGER)                │
└─────────────────────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────┐
    │  Angie needs to create invoice in    │
    │  Houzz Pro, needs tax rate           │
    └─────────────────┬────────────────────┘
                      │
                      ▼
    ┌──────────────────────────────────────┐
    │  Opens Tax Calculator Tool           │
    │  (Simple web form or Google Sheet)   │
    └─────────────────┬────────────────────┘
                      │
                      ▼
    ┌──────────────────────────────────────┐
    │  Enters:                             │
    │  • Customer Address                  │
    │  • Product Category                  │
    └─────────────────┬────────────────────┘
                      │
                      ▼
    ┌──────────────────────────────────────┐
    │  n8n calls TaxJar API                │
    └─────────────────┬────────────────────┘
                      │
                      ▼
    ┌──────────────────────────────────────┐
    │  Returns Tax Rate: 8.225%            │
    │                                      │
    │  Breakdown:                          │
    │  • State: 4.225%                     │
    │  • County: 2.5%                      │
    │  • City: 1.5%                        │
    └─────────────────┬────────────────────┘
                      │
                      ▼
    ┌──────────────────────────────────────┐
    │  ⚠️ MANUAL STEP:                     │
    │  Angie enters rate in Houzz Pro      │
    │  invoice manually                    │
    └──────────────────────────────────────┘
```

**Note:** This doesn't fully automate tax - it just provides a quick lookup tool.

---

### Flowchart 6: Overall System Architecture
**Title:** "Path B - System Overview"

```
┌─────────────────────────────────────────────────────────────────────┐
│                  PATH B: AUTOMATION ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────────────┘

                        ┌─────────────┐
                        │   n8n or    │
                        │   Zapier    │
                        │ (Automation │
                        │   Engine)   │
                        └──────┬──────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
       ▼                       ▼                       ▼
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  HoneyBook  │◄───────►│  Basecamp   │         │  TaxJar     │
│  (CRM)      │         │ (Tasks)     │         │  (Tax API)  │
│             │         │             │         │             │
│ ✓ API/Zapier│         │ ✓ Full API  │         │ ✓ Full API  │
└─────────────┘         └─────────────┘         └─────────────┘

       │                       │
       │                       │
       ▼                       ▼
┌─────────────┐         ┌─────────────┐
│  Email      │         │  Google     │
│  (Gmail)    │         │  Calendar   │
└─────────────┘         └─────────────┘


                    ════════════════════════
                         NOT CONNECTED
                    ════════════════════════

                        ┌─────────────┐
                        │  HOUZZ PRO  │
                        │             │
                        │  ✗ NO API   │
                        │             │
                        │ (Manual     │
                        │  Island)    │
                        │             │
                        │ • Selections│
                        │ • Proposals │
                        │ • Invoices  │
                        │ • Products  │
                        └─────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ⚠️  HOUZZ PRO CANNOT BE AUTOMATED                                  │
│                                                                      │
│  These tasks remain 100% manual:                                    │
│  • Creating projects in Houzz                                       │
│  • Building selection boards                                        │
│  • Updating product prices                                          │
│  • Creating proposals                                               │
│  • Creating invoices                                                │
│  • Entering tax rates                                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Visual Style Guidelines

### For Flowcharts

**Option 1: Create as Images**
- Use a tool like Figma, Lucidchart, draw.io, or Whimsical
- Export as PNG/SVG
- Clean, professional appearance
- Color coding:
  - Blue: Software/systems
  - Green: Automated actions
  - Yellow: Manual steps required
  - Red: Cannot be automated

**Option 2: Create as Interactive Web Page**
- Use React Flow or similar library
- Clickable nodes with descriptions
- Animated flow showing data movement

**Option 3: Create as Mermaid Diagrams**
- Can be embedded in markdown
- Rendered automatically by many tools

---

## Comparison Summary to Include

Create a visual "What Gets Automated vs What Stays Manual" comparison:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PATH B: AUTOMATION SCORECARD                      │
└─────────────────────────────────────────────────────────────────────┘

AUTOMATED ✓                          STILL MANUAL ✗
─────────────────────                ─────────────────────
✓ Lead notifications                ✗ Houzz project creation
✓ Contract signed alerts            ✗ Selection boards
✓ Basecamp project creation         ✗ Product price updates
✓ Contractor task notifications     ✗ Proposals in Houzz
✓ Invoice reminders                 ✗ Invoices in Houzz
✓ Weekly digest emails              ✗ Tax rate entry
✓ Calendar sync                     ✗ Moving data between systems
✓ Tax rate lookup                   ✗ Client portal management

PAIN POINTS ADDRESSED:               PAIN POINTS NOT ADDRESSED:
───────────────────────              ────────────────────────────
✓ Some manual notifications         ✗ Sales tax automation
✓ Basic workflow automation         ✗ Price update automation
                                    ✗ Scattered client communication
                                    ✗ Multiple system juggling
```

---

## Cost Summary Visual

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PATH B: COSTS                                 │
└─────────────────────────────────────────────────────────────────────┘

SETUP COSTS (One-Time):
────────────────────────
n8n Configuration         $1,000 - $2,000
Workflow Development      $1,500 - $3,000
TaxJar Setup             $200 - $500
Testing                  $500 - $1,000
                         ─────────────────
TOTAL SETUP:             $3,200 - $6,500


MONTHLY COSTS:
────────────────────────
Houzz Pro (current)      $65 ──────┐
                                   ├── Will increase to $249-$495
HoneyBook                $30       │
Basecamp                 $30       │
n8n Cloud                $0-50     │
TaxJar                   $99-199   │
                         ──────────┘
TOTAL MONTHLY (now):     $224 - $374
TOTAL MONTHLY (future):  $408 - $804  ⚠️ When Houzz increases


COMPARISON:
────────────────────────
Current (no automation): ~$135/month
Path B (now):           ~$300/month (+$165)
Path B (future):        ~$600/month (when Houzz increases)
```

---

## Deliverables

1. **6 Flowchart Images** (or interactive diagrams)
   - Lead to Project
   - Contractor Notification
   - Weekly Digest
   - Invoice Reminders
   - Tax Rate Lookup
   - System Architecture Overview

2. **Comparison Visual**
   - What's automated vs what's manual

3. **Cost Summary Visual**
   - Setup and monthly costs

4. **Honest Assessment**
   - Clear about limitations (Houzz can't be automated)
   - Shows this path helps but doesn't solve core problems

---

## Presentation Notes

When presenting Path B to client:

1. **Be honest:** "This helps reduce some manual work, but Houzz Pro will remain a manual process because they don't offer an API."

2. **Highlight limitations:** Show the "Still Manual" list prominently.

3. **Cost reality:** "When your Houzz grandfathered pricing ends, this path costs nearly as much as Path C without solving the core problems."

4. **Best for:** "This path makes sense if you want minimal change and are okay with Houzz staying separate."

---

## Tool Recommendations for Creating Flowcharts

| Tool | Pros | Best For |
|------|------|----------|
| **Whimsical** | Beautiful, easy | Quick professional diagrams |
| **Figma** | Full design control | Custom branded visuals |
| **Lucidchart** | Classic flowcharts | Traditional diagrams |
| **draw.io** | Free, powerful | Budget option |
| **React Flow** | Interactive, code-based | Web-based presentation |
| **Mermaid** | Text-based, version control | Developer-friendly |

---

## Estimated Effort

- Flowchart creation: 2-4 hours
- Styling and polish: 1-2 hours
- **Total: 3-6 hours**
