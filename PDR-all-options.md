# Product Design Requirements (PDR)
## AF Designs - Interior Design Workflow Solution

**Client:** Angie Finton (AF Designs)
**Date:** December 31, 2025
**Version:** 1.0

---

# Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Path A: Full Custom Software](#path-a-full-custom-software)
4. [Path B: Automation Only](#path-b-automation-only)
5. [Path C: Hybrid Solution](#path-c-hybrid-solution)
6. [Comparison Matrix](#comparison-matrix)
7. [Recommendation](#recommendation)

---

# Executive Summary

## The Client

**Angie Finton** is a solo interior designer based in Missouri operating AF Designs. She handles everything herself: design, project management, contractor coordination, ordering, and sourcing. Typical projects are $40K-$60K kitchen/bathroom renovations.

## The Problem

Angie currently uses **5+ different software platforms** that don't communicate with each other:

| Software | Monthly Cost | Primary Use |
|----------|-------------|-------------|
| Houzz Pro | ~$65 (grandfathered) | Selection boards, materials library, proposals, invoicing, POs |
| HoneyBook | ~$30 | CRM, leads, contracts |
| Basecamp | ~$30 | Contractor coordination, to-dos |
| Canva | Free/Pro | Mood boards, presentations |
| Dropbox | ~$10-15 | File storage |
| **Total** | **~$135-150/month** | |

**Critical Issue:** Houzz Pro's grandfathered pricing will expire, jumping to **$249-$495/month**.

## Key Pain Points (from meeting)

1. **Sales Tax Management** - Manually entering tax rates for every vendor/product (biggest time sink)
2. **Price Updates** - Products in materials library go stale, manual updating needed
3. **Contract Creation** - Repetitive template work
4. **Moving Clients Between Systems** - HoneyBook → Houzz transition is tedious
5. **Context Switching** - 5+ different logins and workflows
6. **Reports Not Working** - Houzz reports are buggy/limited
7. **Client Communication Scattered** - Canva links, Houzz portal, email

## The Three Proposed Solutions

| Path | Description | Est. Cost | Timeline |
|------|-------------|-----------|----------|
| **A: Full Custom** | Replace all software with custom solution | $50K-$100K+ | 6-12 months |
| **B: Automation Only** | Keep existing tools, connect with automation | $2-5K + $150/mo | 2-4 weeks |
| **C: Hybrid** | Custom software for core functions, keep Houzz for selections | $15-30K | 3-5 months |

---

# Current State Analysis

## Angie's Current Workflow

### Phase 1: Lead & Client Acquisition
```
Lead comes in (Houzz marketplace, referral)
    ↓
Enter lead in HoneyBook
    ↓
Send contract via HoneyBook
    ↓
Client signs contract
    ↓
Manually create project in Houzz Pro
    ↓
Manually create project in Basecamp (if contractors involved)
```

### Phase 2: Design & Selection
```
Create mood boards in Canva
    ↓
Share Canva link with client (comments scattered)
    ↓
Browse vendor websites (Ferguson, Build.com, etc.)
    ↓
Clip products using Houzz Pro Chrome extension
    ↓
Build selection boards in Houzz Pro
    ↓
Client reviews via Houzz client portal
    ↓
Client approves/rejects selections
```

### Phase 3: Ordering & Project Management
```
Create proposals in Houzz Pro (from selections)
    ↓
Manually calculate sales tax per vendor/product
    ↓
Create purchase orders in Houzz Pro
    ↓
Track budget in Houzz Pro
    ↓
Coordinate with contractors via Basecamp
    ↓
Create invoices in Houzz Pro
    ↓
Track payments
```

### Phase 4: Financials
```
Houzz Pro tracks income/expenses
    ↓
QuickBooks Online Dashboard (linked)
    ↓
Manual reconciliation
    ↓
Tax reporting (sales tax liability reports broken in Houzz)
```

## Current Software Deep Dive

### Houzz Pro (Primary Platform)
**What she uses it for:**
- Selection boards (product collections for clients)
- Materials library / Product catalog
- Mood boards (but prefers Canva)
- Proposals
- Invoices
- Purchase orders
- Budget tracking
- Client portal (selections approval)
- Vendor management
- Notes per project
- Floor plans (basic)

**What works well:**
- Chrome extension for clipping products from any website
- Client portal for selection approvals
- Selection boards are well-designed
- Integrated with her workflow

**What doesn't work:**
- Sales tax reports broken
- Price updates are manual
- Reports generally unreliable
- Will become expensive ($249-495/mo)
- No API for automation

### HoneyBook (CRM)
**What she uses it for:**
- Lead management
- Contract creation and signing
- Initial proposals
- Client onboarding flow

**What works well:**
- Contract templates
- E-signatures
- Professional appearance

**What doesn't work:**
- Separate from project management
- Manual transfer to Houzz after contract signed

### Basecamp (Contractor Coordination)
**What she uses it for:**
- Subcontractor communication
- To-do lists for contractors
- Task assignments
- File sharing with contractors

**What works well:**
- Simple interface
- Contractors understand it

**What doesn't work:**
- Another separate system
- Not connected to project timeline in Houzz

### Canva (Design Presentations)
**What she uses it for:**
- Mood boards (more creative than Houzz)
- Design presentations for clients
- Visual concepts

**What works well:**
- Beautiful output
- Creative flexibility

**What doesn't work:**
- Comments scattered across multiple Canva links
- Not connected to selections
- No approval workflow

---

# Path A: Full Custom Software

## Overview

Replace all existing software with a single custom-built platform designed specifically for interior design workflows.

**Philosophy:** One platform to rule them all.

## What Gets Replaced

| Current Software | Replaced By |
|-----------------|-------------|
| Houzz Pro | Custom platform |
| HoneyBook | Custom platform |
| Basecamp | Custom platform |
| Canva (partially) | Custom platform (mood boards) |
| Dropbox | Custom platform (file storage) |

## Feature Requirements

### 1. Client Relationship Management (CRM)

#### 1.1 Lead Management
- Lead capture form (embeddable on website)
- Lead source tracking (Houzz, referral, website, etc.)
- Lead status pipeline (New → Contacted → Meeting Scheduled → Proposal Sent → Won/Lost)
- Automated follow-up reminders
- Lead scoring (optional)

#### 1.2 Client Database
- Contact information (name, email, phone, address)
- Project history
- Communication log
- Document storage per client
- Tags/categories
- Notes

#### 1.3 Contracts
- Contract templates (design agreement, hourly, flat fee)
- E-signature integration (DocuSign or similar)
- Contract status tracking
- Automatic reminders for unsigned contracts
- PDF generation

### 2. Project Management

#### 2.1 Project Dashboard
- Active projects list
- Project status (Design, Selections, Ordering, Installation, Complete)
- Budget overview per project
- Timeline/milestones
- Quick actions

#### 2.2 Project Details
- Project information (client, address, scope, budget)
- Room/area breakdown
- Timeline with milestones
- Budget tracking (estimated vs actual)
- Linked documents
- Activity log

#### 2.3 Tasks & To-Dos
- Task creation with due dates
- Assignment (self, client, contractor)
- Task dependencies
- Recurring tasks
- Task templates per project phase
- Notifications/reminders

### 3. Materials Library & Product Database

#### 3.1 Product Catalog
- Searchable database of products
- Categories (Lighting, Plumbing, Tile, Furniture, etc.)
- Product details:
  - Name
  - SKU/Model number
  - Vendor
  - Price (current)
  - Price history
  - Images (multiple)
  - Dimensions
  - Lead time
  - URL to vendor page
  - Notes
- Favorites/collections
- Recently used

#### 3.2 Vendor Management
- Vendor database (Ferguson, Build.com, local suppliers, etc.)
- Contact information per vendor
- Account numbers
- Tax rates per vendor
- Notes
- Order history

#### 3.3 Price Scraping System
- Automated weekly/daily price updates
- API integration for vendors with APIs (Ferguson)
- Web scraping for vendors without APIs
- Price change alerts
- Price history tracking
- Manual override option

#### 3.4 Product Import
- Manual entry form
- Bulk import via CSV
- URL import (paste product URL, scrape details)
- Integration with vendor catalogs

### 4. Selection Boards

#### 4.1 Board Creation
- Create boards per room/area
- Drag-and-drop product placement
- Visual layout options (grid, freeform)
- Background options
- Annotations/notes on items
- Grouping items

#### 4.2 Board Sharing
- Share via client portal
- PDF export
- Image export
- Presentation mode

#### 4.3 Selection Workflow
- Client approval per item
- Client comments per item
- Status tracking (Pending, Approved, Rejected, Ordered)
- Revision history
- Notifications on client actions

### 5. Mood Boards

#### 5.1 Board Creation
- Freeform canvas
- Image upload from device
- Image import from URL
- Color palettes
- Text annotations
- Shapes and lines

#### 5.2 Sharing
- Client portal access
- PDF export
- Image export
- Comments/feedback

### 6. Proposals & Estimates

#### 6.1 Proposal Creation
- Pull products from selection boards
- Line item pricing
- Automatic tax calculation (TaxJar integration)
- Markup/margin settings
- Labor costs
- Deposit requirements
- Terms and conditions
- Professional formatting

#### 6.2 Proposal Workflow
- Send via client portal
- E-signature integration
- Approval tracking
- Convert approved proposal to project budget

### 7. Invoicing & Payments

#### 7.1 Invoice Creation
- Create from proposal/project
- Line items (products, labor, fees)
- Automatic tax calculation
- Payment schedule (deposits, progress, final)
- Professional templates

#### 7.2 Payment Tracking
- Payment status per invoice
- Payment reminders (automated)
- Partial payment support
- Payment methods (credit card via Stripe, ACH, check)
- Payment history

#### 7.3 QuickBooks Integration
- Sync invoices to QuickBooks
- Sync payments
- Sync clients
- Two-way sync

### 8. Purchase Orders

#### 8.1 PO Creation
- Create from approved selections
- Vendor-specific POs
- Automatic pricing from product database
- Shipping address selection
- Notes to vendor

#### 8.2 PO Tracking
- PO status (Draft, Sent, Acknowledged, Shipped, Received)
- Tracking numbers
- Expected delivery dates
- Receiving confirmation
- Discrepancy tracking

### 9. Budget Management

#### 9.1 Project Budget
- Budget categories (by room, by category)
- Estimated vs actual tracking
- Committed costs (POs sent but not received)
- Remaining budget
- Budget alerts (% spent thresholds)

#### 9.2 Reporting
- Project profitability
- Category spending
- Vendor spending
- Sales tax liability
- Time period reports

### 10. Client Portal

#### 10.1 Client Access
- Secure login for each client
- Project-specific access
- Mobile-friendly

#### 10.2 Client Features
- View mood boards
- View and approve selection boards
- Comment on selections
- View proposals and sign
- View invoices and pay
- View project timeline/status
- Upload files (inspiration, measurements)
- Message designer

#### 10.3 Notifications
- Email notifications for new items to review
- Reminder emails for pending approvals
- Payment reminders

### 11. Contractor Portal

#### 11.1 Contractor Database
- Contractor profiles (name, company, trade, contact)
- Insurance/license tracking
- Rating/notes from past projects
- Availability calendar (optional)

#### 11.2 Project Access
- Invite contractors to specific projects
- Role-based access (what they can see)
- Limited view (only their tasks, relevant files)

#### 11.3 Contractor Features
- View assigned tasks
- Mark tasks complete
- Upload progress photos
- View relevant project documents
- Message designer/team
- View schedule

### 12. Calendar & Scheduling

#### 12.1 Calendar
- View by day/week/month
- Project milestones
- Tasks with due dates
- Appointments/meetings
- Installation dates
- Delivery dates

#### 12.2 Integrations
- Google Calendar sync
- Outlook sync (optional)

### 13. File Management

#### 13.1 Project Files
- Folder structure per project
- Upload from device
- Drag-and-drop
- File preview
- Version history (optional)

#### 13.2 File Types
- Images
- PDFs
- Floor plans (CAD files, images)
- Contracts
- Invoices
- Receipts

#### 13.3 Storage
- Cloud storage (AWS S3, Cloudflare R2, or similar)
- Adequate storage per project
- File sharing via links

### 14. Reporting & Analytics

#### 14.1 Financial Reports
- Income by period
- Expenses by period
- Profit by project
- Outstanding invoices (A/R aging)
- Outstanding bills (A/P aging)
- Sales tax liability by period

#### 14.2 Project Reports
- Projects by status
- Project timeline accuracy
- Budget accuracy
- Client satisfaction (if tracked)

#### 14.3 Product Reports
- Most used products
- Products with price changes
- Vendor spending

### 15. Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| QuickBooks Online | Accounting sync | High |
| TaxJar | Sales tax automation | High |
| Stripe | Payment processing | High |
| DocuSign/HelloSign | E-signatures | Medium |
| Google Calendar | Calendar sync | Medium |
| Ferguson API | Product/pricing data | Medium |
| Canva API | Mood board export (optional) | Low |

### 16. Technical Requirements

#### 16.1 Platform
- Web application (responsive for tablet/mobile use)
- Modern browser support (Chrome, Safari, Firefox, Edge)
- No native mobile app required initially

#### 16.2 Performance
- Page load < 3 seconds
- Support for 50+ active projects
- Support for 10,000+ products in library

#### 16.3 Security
- SSL/TLS encryption
- Secure authentication (email/password, 2FA optional)
- Role-based access control
- Data backup (daily)
- GDPR-compliant (if applicable)

#### 16.4 Hosting
- Cloud hosting (AWS, Vercel, or similar)
- 99.9% uptime target
- US-based servers

## Technology Stack (Recommended)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js + React | Fast, modern, good DX |
| Styling | Tailwind CSS | Rapid development |
| Backend | Next.js API Routes or Node.js | Full-stack JS |
| Database | Supabase (PostgreSQL) | Real-time, auth built-in, affordable |
| File Storage | Supabase Storage or Cloudflare R2 | Cost-effective |
| Payments | Stripe | Industry standard |
| Email | Resend or SendGrid | Transactional email |
| Auth | Supabase Auth or Clerk | Secure, easy to implement |
| Hosting | Vercel | Easy deployment, good performance |

## Cost Estimate

### Development Costs

| Component | Estimated Hours | Cost @ $100/hr |
|-----------|-----------------|----------------|
| CRM & Client Management | 80-120 | $8,000-$12,000 |
| Project Management | 60-80 | $6,000-$8,000 |
| Materials Library & Scraper | 100-150 | $10,000-$15,000 |
| Selection Boards | 80-120 | $8,000-$12,000 |
| Mood Boards | 40-60 | $4,000-$6,000 |
| Proposals & Invoicing | 60-80 | $6,000-$8,000 |
| Client Portal | 60-80 | $6,000-$8,000 |
| Contractor Portal | 40-60 | $4,000-$6,000 |
| Integrations | 60-100 | $6,000-$10,000 |
| Admin & Settings | 20-40 | $2,000-$4,000 |
| Testing & QA | 40-60 | $4,000-$6,000 |
| **Total Development** | **640-950 hrs** | **$64,000-$95,000** |

### Ongoing Costs

| Item | Monthly Cost |
|------|-------------|
| Hosting (Vercel Pro) | $20-50 |
| Database (Supabase Pro) | $25 |
| File Storage | $10-20 |
| Email (Resend) | $20 |
| TaxJar | $99-199 |
| Stripe fees | 2.9% + $0.30 per transaction |
| Maintenance/Support | $200-500 |
| **Total Monthly** | **~$375-800** |

### Total First Year Cost
- Development: $64,000-$95,000
- Monthly costs (12 months): $4,500-$9,600
- **Total Year 1: $68,500-$104,600**

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1: Foundation | 6-8 weeks | Auth, CRM, basic project management |
| Phase 2: Core Features | 8-10 weeks | Materials library, selection boards, proposals |
| Phase 3: Financial | 4-6 weeks | Invoicing, payments, QuickBooks integration |
| Phase 4: Portals | 4-6 weeks | Client portal, contractor portal |
| Phase 5: Polish | 2-4 weeks | Testing, bug fixes, refinements |
| **Total** | **24-34 weeks** | **6-8 months** |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Budget/timeline overrun | Strict feature prioritization, phased approach |
| Data migration from Houzz | Loss of historical data | Manual export/import, accept some data loss |
| User adoption | Client doesn't use new system | Extensive training, gradual rollout |
| Scraper breaks | Price data becomes stale | Multiple fallback vendors, manual override, alerts |
| Integration changes | Third-party APIs change | Abstract integrations, monitor for changes |

---

# Path B: Automation Only

## Overview

Keep all existing software platforms. Add an automation layer to connect them where possible and streamline manual tasks.

**Philosophy:** Work smarter with what you have.

## What Stays the Same

| Software | Status | Notes |
|----------|--------|-------|
| Houzz Pro | KEEP | Primary platform - no automation possible |
| HoneyBook | KEEP | CRM - can automate |
| Basecamp | KEEP | Contractor coordination - can automate |
| Canva | KEEP | Mood boards - can automate (limited) |
| Dropbox | KEEP | File storage |

## What Gets Added

| Addition | Purpose | Cost |
|----------|---------|------|
| n8n (self-hosted) | Automation engine | $0 (self-hosted) or $20-50/mo (cloud) |
| TaxJar | Sales tax automation | $99-199/mo |
| Custom tax calculator | If TaxJar integration not possible with Houzz | $500-1000 one-time |

## Automation Workflows

### Workflow 1: Lead to Project Creation
```
TRIGGER: New inquiry in HoneyBook
    ↓
ACTION: Create task in personal to-do (Basecamp or other)
    ↓
ACTION: Send notification email to Angie
    ↓
WAIT: Contract signed in HoneyBook
    ↓
ACTION: Create project in Basecamp
    ↓
ACTION: Add standard task list template to Basecamp project
    ↓
ACTION: Send welcome email to client with next steps
```

**Limitation:** Cannot auto-create project in Houzz Pro (no API)

### Workflow 2: Contract Signed Onboarding
```
TRIGGER: Contract signed in HoneyBook
    ↓
ACTION: Update client status in HoneyBook
    ↓
ACTION: Create Basecamp project
    ↓
ACTION: Add client to Basecamp project (if they need access)
    ↓
ACTION: Send onboarding questionnaire to client
    ↓
ACTION: Create calendar event for kickoff meeting
```

### Workflow 3: Contractor Notification
```
TRIGGER: Task assigned to contractor in Basecamp
    ↓
ACTION: Send email notification to contractor
    ↓
ACTION: Send SMS notification (optional, via Twilio)
```

### Workflow 4: Weekly Project Summary
```
TRIGGER: Every Monday at 9am
    ↓
ACTION: Pull active projects from Basecamp
    ↓
ACTION: Compile summary of tasks due this week
    ↓
ACTION: Send digest email to Angie
```

### Workflow 5: Invoice Reminder
```
TRIGGER: Invoice in HoneyBook unpaid for X days
    ↓
ACTION: Send reminder email to client
    ↓
REPEAT: Every 7 days until paid
```

### Workflow 6: Tax Rate Lookup (Manual Trigger)
```
TRIGGER: Manual - Angie enters address + product category
    ↓
ACTION: Query TaxJar API for tax rate
    ↓
ACTION: Return tax rate to Angie
    ↓
(Angie manually enters in Houzz Pro)
```

## What CANNOT Be Automated

| Task | Reason | Workaround |
|------|--------|------------|
| Create project in Houzz Pro | No API | Manual |
| Update products in Houzz library | No API | Manual |
| Create selection boards | No API | Manual |
| Generate proposals in Houzz | No API | Manual |
| Create invoices in Houzz | No API | Manual |
| Sync Houzz to QuickBooks | No API | Manual or use Houzz's native QB integration |
| Auto-update product prices | No API | Manual |

## Cost Estimate

### Setup Costs

| Item | Cost |
|------|------|
| n8n setup and configuration | $1,000-2,000 |
| Workflow development (5-10 workflows) | $1,500-3,000 |
| TaxJar setup | $200-500 |
| Testing and documentation | $500-1,000 |
| **Total Setup** | **$3,200-$6,500** |

### Ongoing Costs

| Item | Monthly Cost |
|------|-------------|
| Houzz Pro | $65 (current) → $249-495 (future) |
| HoneyBook | $30 |
| Basecamp | $30 |
| n8n Cloud (or self-hosted $0) | $0-50 |
| TaxJar | $99-199 |
| Server for n8n (if self-hosted) | $20-40 |
| **Total Monthly** | **$244-814** |

**Note:** When Houzz grandfathered pricing expires, monthly cost jumps significantly.

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Setup n8n | 1 week | Platform ready |
| Build workflows | 2-3 weeks | All automations working |
| Testing | 1 week | Verified and documented |
| **Total** | **4-5 weeks** | |

## Limitations & Honest Assessment

### What This Path Solves
- Reduces manual work for client onboarding
- Automates contractor notifications
- Provides tax rate lookup tool
- Reduces context switching somewhat

### What This Path Does NOT Solve
- Still manually entering data in Houzz
- Still manually updating prices
- Still juggling multiple platforms
- Will still pay for Houzz (eventually expensive)
- Houzz remains an island in the workflow

### When Houzz Pricing Changes
Currently: ~$135/month total
After Houzz increase: ~$380-650/month total

**This path becomes less attractive when Houzz pricing increases.**

---

# Path C: Hybrid Solution

## Overview

Build custom software for the functions that benefit most from integration, while keeping Houzz Pro for selection boards (which it does well).

**Philosophy:** Best of both worlds - custom where it matters, existing where it works.

## What Gets Built vs What Stays

| Function | Solution | Rationale |
|----------|----------|-----------|
| **Selection Boards** | KEEP HOUZZ | Houzz does this well, Chrome extension is valuable |
| CRM | BUILD CUSTOM | Enables full automation, replaces HoneyBook |
| Client Portal | BUILD CUSTOM | Centralized communication, solves Canva chaos |
| Contractor Portal | BUILD CUSTOM | Replaces Basecamp, integrated with projects |
| Materials Database | BUILD CUSTOM | Solves price update problem, central source of truth |
| Proposals/Invoices | BUILD CUSTOM | Tax automation, QuickBooks integration |
| Mood Boards | CANVA (keep) + Portal display | Canva is good, just display in portal |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOM PLATFORM                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    CRM      │  │   Projects  │  │  Materials  │        │
│  │  (Clients)  │  │ Management  │  │  Database   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Proposals  │  │  Invoicing  │  │   Budget    │        │
│  │             │  │  & Payments │  │  Tracking   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │   Client    │  │ Contractor  │                          │
│  │   Portal    │  │   Portal    │                          │
│  └─────────────┘  └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
            │                │                │
            ▼                ▼                ▼
    ┌───────────┐    ┌───────────┐    ┌───────────┐
    │ QuickBooks│    │  TaxJar   │    │  Stripe   │
    │   API     │    │   API     │    │   API     │
    └───────────┘    └───────────┘    └───────────┘
            │
            ▼
    ┌───────────────────────────────────────────────┐
    │              HOUZZ PRO (kept)                  │
    │   - Selection Boards                          │
    │   - Product Clipping (Chrome extension)       │
    │   - Client selection approval                 │
    │                                               │
    │   (Manual data entry from custom platform)    │
    └───────────────────────────────────────────────┘
```

## Workflow with Hybrid Solution

### New Lead to Project
```
Lead comes in (website form, referral, Houzz marketplace)
    ↓
Auto-captured in Custom CRM
    ↓
Create proposal in Custom Platform
    ↓
Client reviews/signs via Client Portal
    ↓
Project auto-created in Custom Platform
    ↓
Angie manually creates project in Houzz Pro (for selections)
```

### Design & Selection Process
```
Create mood board in Canva
    ↓
Upload/link mood board to Custom Platform
    ↓
Client views mood board in Client Portal, leaves comments
    ↓
Browse vendor websites, clip products via Houzz Chrome extension
    ↓
Build selection boards in Houzz Pro
    ↓
Client approves selections in Houzz Pro
    ↓
Angie copies approved items to Custom Platform (or bulk import)
```

**Note:** This is the one manual step - copying from Houzz to Custom Platform. Could potentially be streamlined with a simple import tool.

### Ordering & Financials
```
In Custom Platform:
    - Create proposals with products (from materials database)
    - Auto-calculate tax via TaxJar
    - Send to client via Client Portal
    - Client approves and pays deposit
    - Generate POs (if applicable)
    - Track budget
    - Invoice remaining balance
    - All syncs to QuickBooks
```

### Contractor Coordination
```
Assign contractors to project in Custom Platform
    ↓
Contractors access Contractor Portal
    ↓
View tasks, mark complete, upload photos
    ↓
Angie receives notifications
```

## Feature Requirements (Hybrid-Specific)

### 1. CRM (Replaces HoneyBook)
Same as Path A, but simpler since focused on interior design workflow.

- Lead capture and pipeline
- Client database
- Contract templates with e-signature
- Communication log
- **Integration: Auto-capture leads from website form**

### 2. Project Management
Simplified version of Path A.

- Project dashboard
- Project status tracking
- Budget tracking (high-level)
- Timeline/milestones
- Task management
- **Link to Houzz Pro project (just a URL/reference)**

### 3. Materials Database (Key Differentiator)

#### 3.1 Product Catalog
- Searchable database
- Product details (name, SKU, vendor, price, images, dimensions)
- Categories and tags
- **Price scraping system:**
  - Weekly cron job to update prices from known vendors
  - Ferguson API integration for real-time pricing
  - Web scraping fallback for other vendors
  - Price change alerts
  - Price history

#### 3.2 Vendor Database
- Vendor information
- Tax rates per vendor (used for estimates)
- Account numbers
- Notes

#### 3.3 Product Import Options
- Manual entry
- CSV import
- **URL import:** Paste product URL → scrape details automatically
- Bulk update from vendor catalogs

### 4. Client Portal (Key Differentiator)

#### 4.1 Client Dashboard
- Project overview
- Pending items to review
- Messages/communication
- Documents

#### 4.2 Features
- View mood boards (embedded from Canva or uploaded)
- Comment on mood boards (centralized, not scattered Canva links)
- View proposals
- E-sign contracts
- View and pay invoices
- View project timeline
- Upload files (inspiration, measurements)
- **Message designer (threaded conversations)**

#### 4.3 What Client Portal Does NOT Have
- Selection board approval (stays in Houzz)

**Rationale:** Houzz's selection approval workflow is good and integrated with their product system. Duplicating it is unnecessary.

### 5. Contractor Portal

#### 5.1 Features
- View assigned projects
- View tasks and due dates
- Mark tasks complete
- Upload progress photos
- View relevant documents
- Message designer
- **Simple, mobile-friendly interface**

### 6. Proposals & Invoicing

Same as Path A:
- Create proposals from materials database
- TaxJar integration for auto tax calculation
- E-signature
- Convert to invoice
- Payment tracking
- Stripe integration
- **QuickBooks sync**

### 7. Houzz Integration (Manual Bridge)

Since Houzz has no API, we create tools to minimize manual work:

#### 7.1 Product Import Tool
- Enter Houzz selection board URL
- Scrape product details from Houzz page (if possible)
- Or: Simple form to quickly add approved products to custom platform
- Bulk entry mode

#### 7.2 Project Link
- Custom platform stores Houzz project URL
- Quick link to jump to Houzz project
- Notes field for Houzz-specific info

### 8. Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| QuickBooks Online | Accounting sync | High |
| TaxJar | Sales tax automation | High |
| Stripe | Payments | High |
| Ferguson API | Product/pricing | Medium |
| Google Calendar | Calendar sync | Medium |
| Canva API | Mood board embedding | Low |

## Technology Stack

Same as Path A:
- Next.js + React frontend
- Supabase backend
- Vercel hosting
- Stripe payments

Plus:
- Python scripts for price scraping (can run on same server or separate cron service)
- Puppeteer/Playwright for web scraping where needed

## Cost Estimate

### Development Costs

| Component | Estimated Hours | Cost @ $100/hr |
|-----------|-----------------|----------------|
| CRM & Client Management | 60-80 | $6,000-$8,000 |
| Project Management | 40-60 | $4,000-$6,000 |
| Materials Database & Scraper | 80-120 | $8,000-$12,000 |
| Client Portal | 60-80 | $6,000-$8,000 |
| Contractor Portal | 30-50 | $3,000-$5,000 |
| Proposals & Invoicing | 50-70 | $5,000-$7,000 |
| Integrations | 40-60 | $4,000-$6,000 |
| Testing & QA | 30-40 | $3,000-$4,000 |
| **Total Development** | **390-560 hrs** | **$39,000-$56,000** |

**Simplified estimate: $40,000-$55,000**

### Ongoing Costs

| Item | Monthly Cost |
|------|-------------|
| Houzz Pro | $65 → $249-495 (when grandfathered ends) |
| Hosting (Vercel, Supabase) | $50-75 |
| TaxJar | $99-199 |
| Stripe fees | 2.9% + $0.30 per transaction |
| Maintenance | $100-300 |
| **Total Monthly** | **~$315-570** (current Houzz) |
| **Total Monthly** | **~$500-1,070** (future Houzz pricing) |

### Comparison to Current Costs

| Scenario | Monthly Cost |
|----------|-------------|
| Current (all existing tools) | ~$135-150 |
| Current + Houzz price increase | ~$380-450 |
| Hybrid (current Houzz pricing) | ~$315-570 |
| Hybrid (future Houzz pricing) | ~$500-1,070 |
| Full Custom (Path A) | ~$375-800 |

**Key Insight:** The Hybrid path costs more than Full Custom in ongoing fees because you're still paying for Houzz. The trade-off is lower upfront development cost.

### When Does Full Custom Make Sense Over Hybrid?

Break-even calculation (rough):
- Hybrid saves ~$15,000-$40,000 upfront vs Full Custom
- Full Custom saves ~$185-270/month vs Hybrid (after Houzz increases)
- Break-even: 55-215 months (4.5-18 years)

**Conclusion:** Hybrid makes financial sense unless:
1. Houzz pricing increases significantly more
2. Selection boards become a pain point
3. Angie wants full independence from Houzz

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1: Foundation | 4-5 weeks | Auth, CRM, basic project management |
| Phase 2: Core | 5-7 weeks | Materials database, client portal, proposals |
| Phase 3: Portals & Polish | 3-4 weeks | Contractor portal, integrations, testing |
| **Total** | **12-16 weeks** | **3-4 months** |

## Advantages of Hybrid Approach

1. **Lower upfront cost** than full custom
2. **Keep what works** - Houzz selection boards and Chrome clipper
3. **Solves the main pain points:**
   - Sales tax (TaxJar integration)
   - Price updates (materials database with scraping)
   - Scattered communication (client portal)
   - Contract hassle (built-in e-sign)
   - Context switching (centralized dashboard)
4. **Faster to build** than full custom
5. **Less risk** - can validate approach before building more

## Disadvantages of Hybrid Approach

1. **Still paying for Houzz** (expensive when grandfathered ends)
2. **Manual bridge** between Houzz and custom platform
3. **Two systems to learn** for Angie
4. **Client uses two portals** (Houzz for selections, custom for everything else)
5. **If Houzz shuts down or changes significantly**, still need to migrate

---

# Comparison Matrix

## Feature Comparison

| Feature | Path A (Full Custom) | Path B (Automation) | Path C (Hybrid) |
|---------|---------------------|---------------------|-----------------|
| CRM/Client Management | Custom | HoneyBook | Custom |
| Contracts & E-Sign | Custom | HoneyBook | Custom |
| Project Management | Custom | Basecamp | Custom |
| Materials Library | Custom + Scraping | Houzz (manual) | Custom + Scraping |
| Selection Boards | Custom | Houzz | Houzz |
| Mood Boards | Custom | Canva | Canva + Portal display |
| Client Portal | Custom | Houzz | Custom |
| Contractor Portal | Custom | Basecamp | Custom |
| Proposals | Custom | Houzz | Custom |
| Invoicing | Custom | Houzz | Custom |
| QuickBooks Sync | Yes | Via Houzz | Yes |
| Tax Automation | TaxJar | TaxJar (manual lookup) | TaxJar |
| Price Auto-Update | Yes | No | Yes |

## Cost Comparison

| Cost Type | Path A | Path B | Path C |
|-----------|--------|--------|--------|
| **Development** | $64K-$95K | $3K-$6K | $39K-$56K |
| **Monthly (now)** | $375-800 | $244-350 | $315-570 |
| **Monthly (Houzz increase)** | $375-800 | $430-650 | $500-1,070 |
| **Year 1 Total** | $68K-$105K | $6K-$10K | $43K-$63K |
| **Year 2+ Annual** | $4.5K-$9.6K | $5.2K-$7.8K | $6K-$12.8K |

## Timeline Comparison

| Path | Timeline |
|------|----------|
| Path A | 6-8 months |
| Path B | 4-5 weeks |
| Path C | 3-4 months |

## Risk Comparison

| Risk | Path A | Path B | Path C |
|------|--------|--------|--------|
| Development risk | High | Low | Medium |
| Budget overrun risk | High | Low | Medium |
| Adoption risk | Medium | Low (nothing changes) | Medium |
| Vendor dependency | Low | High (Houzz) | Medium (Houzz for selections) |
| Long-term flexibility | High | Low | Medium |

## Pain Point Resolution

| Pain Point | Path A | Path B | Path C |
|------------|--------|--------|--------|
| Sales tax manual entry | SOLVED | PARTIAL | SOLVED |
| Price updates manual | SOLVED | NOT SOLVED | SOLVED |
| Contract creation tedious | SOLVED | PARTIAL | SOLVED |
| Moving clients between systems | SOLVED | PARTIAL | MOSTLY SOLVED |
| Context switching | SOLVED | NOT SOLVED | MOSTLY SOLVED |
| Reports broken in Houzz | SOLVED | NOT SOLVED | SOLVED (for custom features) |
| Scattered client communication | SOLVED | NOT SOLVED | SOLVED |

---

# Recommendation

## For Angie (AF Designs)

Based on the analysis, **Path C (Hybrid)** appears to be the best fit for the following reasons:

### Why Path C?

1. **Solves the biggest pain points** (sales tax, price updates, client communication) without the full cost and risk of Path A

2. **Preserves what works** - Houzz's selection boards and Chrome clipper are genuinely useful and would be expensive to replicate

3. **Reasonable investment** - $40K-$55K is significant but justified by productivity gains and cost savings when Houzz increases pricing

4. **Manageable timeline** - 3-4 months is achievable and allows for validation

5. **Path to full custom if needed** - If Houzz becomes untenable, the custom platform foundation is already built

### Why Not Path A?

- Higher cost ($64K-$95K) with more risk
- Longer timeline (6-8 months)
- Selection boards are hard to replicate well
- Chrome clipper would need custom development
- May be over-engineering for a solo practitioner

### Why Not Path B?

- Doesn't solve the core pain points (price updates, scattered communication)
- Houzz remains an island
- When Houzz pricing increases, costs nearly match Path C without the benefits
- Limited long-term value

## Alternative Recommendation: Phased Approach

If budget is a concern, consider building Path C in phases:

**Phase 1: MVP (~$20K)**
- CRM with contracts
- Client portal (basic)
- Materials database (manual entry, no scraping)
- QuickBooks integration

**Phase 2: Enhancements (~$15K)**
- Price scraping system
- Contractor portal
- Enhanced client portal

**Phase 3: Polish (~$10K)**
- Advanced reporting
- Additional integrations
- Mobile optimization

This allows validation after Phase 1 before committing to full build.

---

# Appendix

## A. User Stories (Path C)

### As Angie (Designer)

1. I want to capture leads automatically so I don't miss inquiries
2. I want to send contracts that clients can sign online so I save time
3. I want a central dashboard so I can see all my projects at a glance
4. I want automatic tax calculation so I don't manually look up rates
5. I want price alerts when products change so I don't quote outdated prices
6. I want clients to have one place to message me so communication isn't scattered
7. I want contractors to see their tasks so I don't have to chase them

### As a Client

1. I want to see my project status so I know what's happening
2. I want to view and comment on mood boards in one place
3. I want to sign contracts online so I don't have to print/scan
4. I want to pay invoices online so it's convenient
5. I want to message my designer easily

### As a Contractor

1. I want to see what tasks are assigned to me
2. I want to mark tasks complete
3. I want to upload progress photos
4. I want to access project files I need

## B. Data Migration Considerations

### From HoneyBook
- Export client list (CSV)
- Export contracts (PDF backup)
- Import clients to custom platform

### From Basecamp
- Export project data
- Export task lists
- Import relevant projects to custom platform

### From Houzz Pro
- No export available
- Manual data entry or start fresh
- Historical projects can remain in Houzz

## C. Glossary

| Term | Definition |
|------|------------|
| Selection Board | A curated collection of products for a specific room/project for client approval |
| Mood Board | A visual collage representing the design direction (colors, textures, style) |
| PO (Purchase Order) | A formal order document sent to vendors to purchase products |
| FF&E | Furniture, Fixtures, and Equipment |
| Scraping | Automatically extracting data from websites |
| API | Application Programming Interface - allows software to communicate |
| CRM | Customer Relationship Management |
| E-signature | Electronic signature for contracts |
