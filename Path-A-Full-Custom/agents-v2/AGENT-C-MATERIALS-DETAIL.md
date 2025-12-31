# Agent C: Materials Detail Page

## Your Task
Create a material detail page to fix the 404 error when clicking on a material item.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Materials Library page to understand the data structure
2. One product/material card component

## The Problem
When you click on a material in the Materials Library, you get a 404 error. We need a detail page.

## Create: Material Detail Page

**Location:** `src/app/(admin)/materials/[id]/page.tsx`

### Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Materials                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────────────┐  ┌────────────────────────────────┐  │
│  │                   │  │ Arteriors Zanadoo Chandelier   │  │
│  │                   │  │                                │  │
│  │   [Product        │  │ Category: Lighting             │  │
│  │    Image]         │  │ Vendor: Ferguson               │  │
│  │                   │  │ SKU: ART-89520                 │  │
│  │                   │  │                                │  │
│  │                   │  │ ┌────────────────────────────┐ │  │
│  │                   │  │ │ $2,450.00                  │ │  │
│  │                   │  │ │ was $2,200.00  ↑ +11.4%    │ │  │
│  │                   │  │ │ Updated: Dec 15, 2024      │ │  │
│  │                   │  │ └────────────────────────────┘ │  │
│  └───────────────────┘  │                                │  │
│                          │ Lead Time: 4-6 weeks          │  │
│                          │                                │  │
│                          │ [View on Vendor Site ↗]       │  │
│                          │ [Add to Selection Board]      │  │
│                          └────────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Price History                                        │    │
│  │ ┌─────────────────────────────────────────────────┐ │    │
│  │ │ [Line chart showing price over time]            │ │    │
│  │ └─────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Used In Projects                                     │    │
│  │                                                      │    │
│  │ • Dickey Kitchen Remodel - Kitchen Lighting board   │    │
│  │ • Martinez Living Room - Main selections            │    │
│  │ • Thompson Full Home - Dining room                  │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Notes                                                │    │
│  │ ┌─────────────────────────────────────────────────┐ │    │
│  │ │ Great for high ceilings. Client loved this in   │ │    │
│  │ │ the Mitchell project. Order 2 weeks early.      │ │    │
│  │ └─────────────────────────────────────────────────┘ │    │
│  │                                         [Save Note] │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Sections

1. **Header** - Back button, product image, basic info
2. **Pricing** - Current price, previous price, change percentage, last updated
3. **Actions** - View on vendor site, Add to Selection Board
4. **Price History** - Line chart showing price changes over time (use ApexCharts)
5. **Used In Projects** - List of projects/selection boards using this material
6. **Notes** - Text area for designer notes about this product

## Mock Data

```typescript
const material = {
  id: 'art-89520',
  name: 'Arteriors Zanadoo Chandelier',
  category: 'Lighting',
  vendor: 'Ferguson',
  sku: 'ART-89520',
  image: 'https://picsum.photos/seed/chandelier/400/400',
  currentPrice: 2450,
  previousPrice: 2200,
  priceChange: 11.4,
  priceChangeType: 'increase',
  lastUpdated: '2024-12-15',
  leadTime: '4-6 weeks',
  vendorUrl: 'https://ferguson.com/product/art-89520',
  description: 'Modern brass chandelier with 12 arms. Perfect for dining rooms and entryways with high ceilings.',
  dimensions: '36" W x 36" D x 24" H',
  finish: 'Antique Brass',
  priceHistory: [
    { date: '2024-07', price: 2100 },
    { date: '2024-08', price: 2100 },
    { date: '2024-09', price: 2150 },
    { date: '2024-10', price: 2200 },
    { date: '2024-11', price: 2200 },
    { date: '2024-12', price: 2450 },
  ],
  usedInProjects: [
    { project: 'Dickey Kitchen Remodel', board: 'Kitchen Lighting', client: 'Sarah Dickey' },
    { project: 'Martinez Living Room', board: 'Main Selections', client: 'Amanda Martinez' },
    { project: 'Thompson Full Home', board: 'Dining Room', client: 'David Thompson' },
  ],
  notes: 'Great for high ceilings. Client loved this in the Mitchell project. Order 2 weeks early due to long lead time.'
};
```

## Component Structure

```typescript
// src/app/(admin)/materials/[id]/page.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function MaterialDetailPage({ params }: { params: { id: string } }) {
  // In real app, fetch material by params.id
  const material = mockMaterials.find(m => m.id === params.id) || mockMaterials[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <Link href="/materials" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Materials
      </Link>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <img src={material.image} alt={material.name} className="w-full rounded-lg" />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{material.name}</h1>
            <p className="text-gray-500">{material.category} • {material.vendor}</p>
            <p className="text-sm text-gray-400">SKU: {material.sku}</p>
          </div>

          {/* Price card */}
          <PriceCard material={material} />

          {/* Actions */}
          <div className="flex gap-3">
            <a href={material.vendorUrl} target="_blank" className="btn-secondary">
              View on Vendor Site ↗
            </a>
            <button className="btn-primary">
              Add to Selection Board
            </button>
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      <PriceHistoryChart data={material.priceHistory} />

      {/* Used In Projects */}
      <UsedInProjects projects={material.usedInProjects} />

      {/* Notes */}
      <NotesSection notes={material.notes} />
    </motion.div>
  );
}
```

## Price Change Styling

```typescript
// Price increase = red/warning
<span className="text-red-600">↑ +11.4%</span>

// Price decrease = green/good
<span className="text-green-600">↓ -5.2%</span>

// No change = gray
<span className="text-gray-500">No change</span>
```

## Update Materials List Page

Make sure clicking a material card navigates to `/materials/[id]`:

```typescript
<Link href={`/materials/${material.id}`}>
  <MaterialCard material={material} />
</Link>
```

## Success Criteria

- [ ] Clicking material in list goes to detail page (no 404)
- [ ] Detail page shows product image
- [ ] Detail page shows name, category, vendor, SKU
- [ ] Price section shows current price, previous price, change %
- [ ] "View on Vendor Site" button exists
- [ ] "Add to Selection Board" button exists
- [ ] Price history chart displays (ApexCharts line chart)
- [ ] "Used In Projects" section shows where material is used
- [ ] Notes section with save functionality (mock)
- [ ] Back button returns to materials list
- [ ] Page has Framer Motion animation
- [ ] Responsive layout

## Don't Touch

- Materials list page (except adding link wrapper to cards)
- Other pages
- Sidebar navigation
