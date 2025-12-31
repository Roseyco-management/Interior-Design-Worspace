# Perplexity Research - Interior Design Software Project
**Date:** December 31, 2025
**Purpose:** Technical validation for automation vs. custom software decision

---

## Table of Contents
1. [Houzz Pro API Status](#1-houzz-pro-api-status)
2. [HoneyBook API Capabilities](#2-honeybook-api-capabilities)
3. [Basecamp API Capabilities](#3-basecamp-api-capabilities)
4. [Vendor APIs (Ferguson, Build.com, Wayfair)](#4-vendor-apis)
5. [Alternative Interior Design Software with APIs](#5-alternative-interior-design-software)
6. [Browser Extension / Product Clipping](#6-browser-extension--product-clipping)
7. [Canva API Capabilities](#7-canva-api-capabilities)
8. [n8n Automation Capabilities](#8-n8n-automation-capabilities)
9. [Sales Tax Automation APIs](#9-sales-tax-automation-apis)
10. [QuickBooks API Integration](#10-quickbooks-api-integration)
11. [Custom CRM Development Costs](#11-custom-crm-development-costs)
12. [Key Findings Summary](#12-key-findings-summary)

---

## 1. Houzz Pro API Status

### Verdict: NO PUBLIC API

Houzz Pro has a **private API for specific integrations** like order fulfillment and e-commerce automation, but **NO public API, REST API, or webhooks** available for general developers or interior designers' software integrations.

### Key Details:
- **Private API for Fulfillment Only**: API credentials (SSL Token, API User Name, API App Name) exist for automating order fulfillment with third-party services like DropStream and Order Desk. Access requires enabling it in account settings for connected stores - not open developer signup.
- **No Public Documentation**: Official Houzz Pro updates (e.g., Q2 2024 features) mention no public REST API, webhooks, or developer portals.

### Available Workarounds:

| Type | Description | Limitation |
|------|-------------|------------|
| **Zapier Integration** | Connects Houzz Pro to apps like Google Drive for triggers/actions (e.g., create leads) | Relies on limited webhooks or polling, not full API access |
| **Web Scraping** | Tools like Apify, Crawlbase, or Octoparse can scrape Houzz data | Violates ToS, unreliable, no write access |

### Impact on Project:
This is the **critical blocker** for the automation path. Since most of Angie's workflow lives in Houzz Pro:
- Cannot auto-sync products
- Cannot auto-update prices
- Cannot pull reports programmatically
- Cannot integrate with other systems

**Sources:** DropStream Support, Houzz Pro Help, Zapier, Apify, Crawlbase

---

## 2. HoneyBook API Capabilities

### Verdict: LIMITED API VIA ZAPIER

HoneyBook provides developer documentation covering REST API endpoints, webhooks, and Zapier integration, though **direct public API access requires contacting support**.

### Key Capabilities:

| Feature | Availability |
|---------|--------------|
| REST API | Yes (OAuth/identity protocols) |
| Webhooks | Yes (for events like lead notifications, contract signing) |
| Zapier Integration | Primary method - use API Key from settings |
| Direct Public API | Not confirmed - may require support contact |

### Accessible Data Models (via Zapier/API):
- Client/Lead Data (contacts, inquiries)
- Project Data (workflows, meetings)
- Financial Data (invoices, payments, contracts, proposals)
- Calendar, files, automations, user/team data

### Limitations:
- No confirmed public developer program
- Rate limits undocumented
- Relies heavily on Zapier rather than direct API access
- No official SDKs

### Impact on Project:
HoneyBook **CAN be automated** via Zapier or n8n HTTP requests. This enables:
- Lead capture automation
- Contract signing notifications
- Client onboarding workflows
- Calendar sync

**Sources:** APITracker.io, Rollout.com, HoneyBook Blog

---

## 3. Basecamp API Capabilities

### Verdict: FULL REST API AVAILABLE

Basecamp's API (Basecamp 3 and 4) is a **fully documented REST API** using JSON serialization, supporting CRUD operations on all resources.

### Key Capabilities:

| Feature | Details |
|---------|---------|
| API Style | REST with JSON |
| Authentication | OAuth 2.0 |
| Rate Limits | Not specified in docs - test conservatively |
| Webhooks | Not explicitly documented - relies on polling |

### Available Endpoints:
- Projects (create, read, update, delete)
- To-dos and To-do Lists
- Messages and Message Boards
- Files and Attachments
- Comments
- Campfires (chat)
- Schedules
- People/Users
- Templates
- Groups

### What Can Be Automated:
- Task assignment, monitoring, updates, and progression
- File uploads/attachments
- Messaging and comments
- Schedule events
- People management
- Custom reporting/analytics

### Authentication Flow:
1. Register app at https://launchpad.37signals.com/integrations
2. Get Client ID/Secret and Redirect URI
3. Implement OAuth 2.0 flow
4. Access token expires ~2 weeks; use refresh token

### Impact on Project:
Basecamp **CAN be fully automated**. This enables:
- Auto-creating projects when contracts are signed
- Task automation for project phases
- Contractor notifications
- File syncing
- Progress tracking

**Sources:** Basecamp GitHub (bc3-api), Devzery, PyPI basecampapi, Make.com

---

## 4. Vendor APIs

### Ferguson Enterprises

### Verdict: API AVAILABLE (Developer Portal)

Ferguson provides a **Developer Portal** at developer.ferguson.com with a self-service platform for API access.

### Access Process:
1. Sign in at developer.ferguson.com
2. Create Team (1 team limit per account)
3. Create Team App and request specific API Products
4. Get API Keys (Key & Secret)

### Authentication:
- OAuth 2.0 Client Credentials Grant
- Base64-encode `Key:Secret` for Basic Auth header
- Tokens expire ~1 hour

### Available APIs:
- Product data
- Pricing (requires partnership evaluation)
- Inventory status
- Order fulfillment

### Limitations:
- API Catalog still under construction
- Full product/pricing access may require partnership evaluation
- Contact api.team@ferguson.com for custom requests

---

### Build.com / Wayfair

### Verdict: NO PUBLIC API

- **Build.com**: No official product catalog API. Third-party scraping services exist (Build with Ferguson Product Data API by Unwrangle) but not official.
- **Wayfair**: No API documentation, access details, or developer resources found.

### Impact on Project:
- Ferguson API could enable some product/pricing automation
- Build.com and Wayfair would require web scraping (unreliable, ToS violations)
- For custom software, would need to build a browser extension like Houzz Clipper

**Sources:** Ferguson Developer Portal, Unwrangle docs, Buildium API

---

## 5. Alternative Interior Design Software

### Verdict: NO INTERIOR-DESIGN-SPECIFIC SOFTWARE HAS PUBLIC APIs

Searched specifically for: Design Manager, Studio Designer, Ivy, DesignFiles

**None** of these interior design software platforms explicitly offer public APIs for developer access or integration capabilities.

### General Project Management Alternatives WITH APIs:

| Platform | Key Features | API Details | Pricing |
|----------|--------------|-------------|---------|
| **monday.com** | Customizable boards, client dashboards, time tracking | Open API for workflows and automations | ~$9/user/mo |
| **Asana** | Task management, timelines, client portals | Robust REST API | Free tier; $10.99/user/mo premium |
| **Jira** | Issue tracking, agile boards, custom fields | Comprehensive Atlassian API | Free small teams; $7.75/user/mo |
| **Zoho Projects** | Gantt charts, invoicing, client portals | Full API with webhooks | Free 3 users; $4/user/mo |
| **Autodesk Construction Cloud** | BIM integration, 3D plans, scheduling | Extensive APIs | Quote-based |
| **Procore** | Project management, budgeting, approvals | Open API for custom apps | Quote-based |

### Impact on Project:
If building custom software, there's **no off-the-shelf interior design platform with APIs** that could serve as a foundation. Would need to build from scratch or adapt general PM tools.

**Sources:** Foyr, TechnologyCounter, DesignFiles Blog, Capterra

---

## 6. Browser Extension / Product Clipping

### How Houzz Pro Clipper Works:

The Houzz Pro Clipper Chrome extension:
1. User clicks Houzz icon on any product image on vendor websites
2. Opens modal window to capture: images, descriptions, dimensions, price, SKU
3. AutoMate Smart Sourcing can auto-populate fields
4. Can clip up to 5 images at once (Instant Image Clipping)
5. Saves directly to Houzz Pro product library
6. Can assign to specific project/room

### Building a Custom Clipper:

**Option 1: Use Existing Extensions**
- **Web Scraper** (webscraper.io) - Point-and-click, exports to CSV/Excel
- **Agenty** - Batch URL scraping, scheduling, handles pagination

**Option 2: Build Custom Chrome Extension**
Requires:
- Chrome Extension API (manifest files, content scripts)
- DOM manipulation (JavaScript)
- Browser storage for scraped data
- Backend API to store clipped products

### Technical Considerations:
- Anti-scraping protections on many e-commerce sites
- Dynamic content and pagination handling
- Product data structure varies significantly across vendors
- Would need custom extraction rules per vendor

### Impact on Project:
For custom software, building a Houzz-like clipper is **feasible but significant work** (~$10-20K development). Existing scraping extensions could work for basic needs but lack the seamless UX of Houzz Clipper.

**Sources:** Web Scraper, ProWebScraper, Houzz Pro Help

---

## 7. Canva API Capabilities

### Verdict: FULL API AVAILABLE (Canva Connect APIs)

Canva provides comprehensive APIs launched in 2024 with ongoing enhancements.

### Key Capabilities:

| API | Status | Use Case |
|-----|--------|----------|
| Asset API | GA | Upload/sync images and assets |
| Folder API | GA | Organize files programmatically |
| Export API | GA | Export designs in various formats |
| Autofill API | Preview | Auto-generate designs from data |
| Brand Templates API | Preview | Create on-brand designs at scale |
| Design Editing API | Beta | Create/edit elements from prompts |
| Comment API | Preview | Manage feedback and approvals |
| Notification Webhooks | GA | Real-time collaboration events |

### Authentication:
- OAuth 2.0 based
- REST APIs

### Integrations:
- Slack, Salesforce, Workato, Zapier, Make
- Can sync assets from external systems
- Can trigger design creation from CRM data

### Impact on Project:
Canva **CAN be integrated** for mood board automation. Could:
- Auto-create mood boards from product selections
- Sync product images to Canva
- Export final designs programmatically
- Get notifications when designs are approved

**Sources:** Canva Newsroom, Canva.dev, TechCrunch

---

## 8. n8n Automation Capabilities

### Verdict: CAN CONNECT VIA HTTP REQUESTS

n8n does **NOT have native nodes** for HoneyBook or Basecamp as of late 2025. However, both can be connected via HTTP Request nodes.

### Basecamp Connection (Confirmed Working):
```
1. OAuth2 credentials via https://launchpad.37signals.com
2. API calls to https://3.basecampapi.com/{account_id}/
3. Requires User-Agent header
4. Community confirms it works despite no official node
```

### HoneyBook Connection:
- No native n8n node
- Use HTTP Request node with HoneyBook API
- Requires API key from HoneyBook developer docs
- Can use Zapier integration patterns as reference

### Example Workflow:
```
Poll HoneyBook for new projects → Create Basecamp project via API
```

### Alternative: Zapier
- HoneyBook + Basecamp already connected on Zapier
- Simpler but less customizable
- Cost: ~$20-50/month for workflows

### Impact on Project:
Automation IS possible for HoneyBook ↔ Basecamp workflows. The limitation remains **Houzz Pro cannot be included** in automation chains.

**Sources:** n8n Community, Zapier, Basecamp Integrations

---

## 9. Sales Tax Automation APIs

### Verdict: TAXJAR RECOMMENDED FOR SMALL BUSINESS

### TaxJar vs Avalara Comparison:

| Feature | TaxJar | Avalara |
|---------|--------|---------|
| **Pricing** | $19-$349/month (transparent) | Custom ($21K-$160K/year typical) |
| **Tax Lookup** | Address + product category | Address + advanced rules |
| **API Access** | Included in Professional plan ($99-$349/mo) | Included but complex |
| **Jurisdictions** | 11,000+ U.S. | Global coverage |
| **Best For** | Small business, U.S.-only | Enterprise, global |
| **Auto-filing** | Yes | Yes |

### TaxJar API Capabilities:
- Real-time tax calculations
- Address-based lookups (not just ZIP codes)
- Product tax codes/categories
- Exemption management
- Nexus tracking

### Integration Options:
- Direct REST API
- Shopify, WooCommerce, etc. plugins
- QuickBooks integration
- Custom invoicing systems

### Impact on Project:
Sales tax pain point **CAN be solved** with TaxJar API integration (~$99-349/month). Would auto-calculate tax rates when creating invoices based on customer address and product categories.

**Sources:** Genwise, Numeral, MikePaim, TaxJar

---

## 10. QuickBooks API Integration

### Verdict: FULL REST API AVAILABLE

QuickBooks Online provides comprehensive REST API for programmatic access.

### Base URL:
```
https://quickbooks.api.intuit.com/v3/company/{realmId}/{entity}
```

### Key Endpoints for Interior Design:

| Entity | Endpoint | Use Case |
|--------|----------|----------|
| Invoices | POST `/invoice` | Generate client bills |
| Purchase Orders | POST `/purchaseorder` | Sync vendor orders |
| Customers | POST/GET `/customer` | Manage client profiles |
| Projects | Various | Link invoices to projects |

### Authentication:
- OAuth 2.0
- Monthly limits: 500,000 CorePlus calls (Builder tier)
- Token refresh required

### Third-Party Wrappers:
- **Merge.dev**: Unified API with SDKs (Node.js, Python)
- **Conductor.is**: Real-time REST access
- **Apideck**: Unified accounting API

### Impact on Project:
QuickBooks **CAN be fully integrated** for:
- Invoice syncing
- Purchase order management
- Client data sync
- Financial reporting
- Project-based accounting

**Sources:** Intuit Developer, Coefficient.io, Merge.dev

---

## 11. Custom CRM Development Costs

### Verdict: $25K-$150K+ DEPENDING ON SCOPE

### Cost Breakdown by Complexity:

| Level | Cost Range | Features |
|-------|------------|----------|
| **MVP** | $25,000-$50,000 | Basic contact management, simple project tracking, invoicing |
| **Mid-Range** | $50,000-$80,000 | Workflow automation, materials library, client portal, analytics |
| **Full-Featured** | $80,000-$150,000+ | AI insights, multi-user, advanced reporting, mobile, extensive integrations |

### Key Cost Drivers for Interior Design Software:

1. **Feature Complexity**
   - Project management + invoicing + materials library = Mid-range
   - AI analytics and automation adds $50K-$70K+

2. **Integration Requirements**
   - Each third-party integration (QuickBooks, TaxJar, etc.) adds development time
   - Ferguson API, Canva API, etc.

3. **Data Architecture**
   - Materials library with searchable database, images, cost tracking
   - Custom reporting: +$10K-$30K

4. **Mobile Support**
   - Web only: $60K-$90K+
   - Web + Mobile: $50K-$150K+

### Ongoing Costs:
- Annual maintenance: $5,000-$20,000+
- Hosting: 15-20% of initial cost yearly
- Enterprise support: up to $300/user/month

### Recommendation:
Start with **Proof of Concept (PoC)** to validate approach before full development.

**Sources:** Cleveroad, SpaceoTechnologies, Webisoft, Apptunix

---

## 12. Key Findings Summary

### API Availability Matrix:

| Platform | Public API | Automation Possible | Notes |
|----------|------------|---------------------|-------|
| **Houzz Pro** | NO | NO | Critical blocker - no workaround |
| **HoneyBook** | Limited (Zapier) | YES | Via Zapier or HTTP requests |
| **Basecamp** | YES (Full REST) | YES | OAuth 2.0, well documented |
| **Ferguson** | YES (Dev Portal) | YES | May need partnership for full access |
| **Build.com** | NO | NO | Scraping only (ToS violation) |
| **Wayfair** | NO | NO | No access |
| **Canva** | YES (Full REST) | YES | Comprehensive APIs available |
| **QuickBooks** | YES (Full REST) | YES | Well documented, SDKs available |
| **TaxJar** | YES | YES | $99-349/month includes API |

### Critical Insight:

**The Houzz Pro API blocker fundamentally shapes the decision:**

1. **Automation Path**: Can automate HoneyBook ↔ Basecamp ↔ QuickBooks ↔ Canva, but **Houzz Pro remains an island**. Angie would still need to manually work in Houzz for:
   - Product clipping
   - Selection boards
   - Materials library
   - Proposals (if generated from selections)
   - Purchase orders (if tied to materials)

2. **Custom Software Path**: Could replace Houzz entirely with custom solution including:
   - Custom browser extension for product clipping
   - Materials library with price tracking
   - Selection boards
   - Client portal
   - Full integration with QuickBooks, TaxJar, etc.

   **Cost: $50K-$100K+ for MVP with all features**

### Recommended Hybrid Approach:

Given the findings, a **phased approach** may be optimal:

**Phase 1: Automation Layer ($2K-$5K setup + ~$150/month)**
- n8n or Zapier connecting: HoneyBook → Basecamp → QuickBooks
- TaxJar integration for tax automation
- Canva integration for mood boards
- Accept that Houzz remains manual

**Phase 2: Evaluate Custom Software Need**
- After 3-6 months, assess if Houzz limitations are still painful
- If yes, begin custom software planning
- Could build just the "materials library + clipper" component first

**Phase 3: Full Custom Solution (if needed)**
- Replace Houzz entirely
- Full integration of all workflows
- $50K-$100K investment

---

## Sources Summary

All research conducted via Perplexity MCP on December 31, 2025. Key sources include:
- Houzz Pro Help Documentation
- Ferguson Developer Portal (developer.ferguson.com)
- Basecamp GitHub (bc3-api)
- Canva Developer Documentation (canva.dev)
- QuickBooks Developer (developer.intuit.com)
- TaxJar Documentation
- n8n Community Forums
- APITracker.io
- Various software comparison sites (Capterra, G2, SoftwareAdvice)
