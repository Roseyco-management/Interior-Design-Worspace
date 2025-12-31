# Agent J: Product Images & Selection Boards

## Your Task
Update product images to be category-specific (matching product names) and optionally add mobile quick-add for Selection Boards.

## Demo Location
```
/Users/arnispiekus/Work/Github/Interior-Design-Worspace/Path-A-Full-Custom/demo/
```

## What to Read
1. Materials Library page and mock data
2. Selection Boards builder and product data
3. Any shared product/material data files

## Changes Needed

### 1. Update Materials Library Images

Currently images are random placeholders. Update to use category-specific images that match the product names.

**Use Unsplash source URLs for real product photos:**

```typescript
// Example image URLs by category
const categoryImages = {
  lighting: {
    chandelier: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    pendant: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    sconce: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    floorLamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    tableLamp: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400&h=400&fit=crop',
  },
  furniture: {
    sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    chair: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    table: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&h=400&fit=crop',
    diningTable: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    bed: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop',
    dresser: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=400&fit=crop',
    desk: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
  },
  decor: {
    rug: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    mirror: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
    artwork: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    vase: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
    curtains: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    pillows: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
  },
  kitchen: {
    faucet: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
    sink: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    cabinet: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop',
  },
  bathroom: {
    vanity: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop',
    tile: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
    mirror: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=400&fit=crop',
  },
  textiles: {
    fabric: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
    throw: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    bedding: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
  },
};
```

### 2. Update Mock Materials Data

Update the materials mock data to use appropriate images:

```typescript
const mockMaterials = [
  // LIGHTING
  {
    id: 'mat-1',
    name: 'Arteriors Zanadoo Chandelier',
    category: 'Lighting',
    vendor: 'Ferguson',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-2',
    name: 'Modern Pendant Light',
    category: 'Lighting',
    vendor: 'Lumens',
    price: 380,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-3',
    name: 'Brass Wall Sconce',
    category: 'Lighting',
    vendor: 'Circa',
    price: 210,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  },

  // FURNITURE
  {
    id: 'mat-4',
    name: 'Velvet Sectional Sofa',
    category: 'Furniture',
    vendor: 'RH',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-5',
    name: 'Mid-Century Lounge Chair',
    category: 'Furniture',
    vendor: 'DWR',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-6',
    name: 'Marble Coffee Table',
    category: 'Furniture',
    vendor: 'CB2',
    price: 899,
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-7',
    name: 'Oak Dining Table',
    category: 'Furniture',
    vendor: 'West Elm',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-8',
    name: 'Executive Desk',
    category: 'Furniture',
    vendor: 'Pottery Barn',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
  },

  // DECOR
  {
    id: 'mat-9',
    name: 'Persian Area Rug',
    category: 'Decor',
    vendor: 'Loloi',
    price: 650,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-10',
    name: 'Oversized Wall Mirror',
    category: 'Decor',
    vendor: 'Anthropologie',
    price: 498,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-11',
    name: 'Abstract Canvas Art',
    category: 'Decor',
    vendor: 'Minted',
    price: 350,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-12',
    name: 'Ceramic Vase Set',
    category: 'Decor',
    vendor: 'West Elm',
    price: 120,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
  },

  // KITCHEN
  {
    id: 'mat-13',
    name: 'Waterfall Kitchen Faucet',
    category: 'Kitchen',
    vendor: 'Kohler',
    price: 450,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
  },

  // BATHROOM
  {
    id: 'mat-14',
    name: 'Double Sink Vanity',
    category: 'Bathroom',
    vendor: 'Wayfair',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop',
  },

  // TEXTILES
  {
    id: 'mat-15',
    name: 'Linen Curtain Panels',
    category: 'Textiles',
    vendor: 'Pottery Barn',
    price: 180,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
  },
  {
    id: 'mat-16',
    name: 'Cashmere Throw Blanket',
    category: 'Textiles',
    vendor: 'Nordstrom',
    price: 298,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
  },
];
```

### 3. Update Selection Board Items

Update the Selection Board mock products to have matching images:

```typescript
const selectionBoardProducts = [
  // Kitchen Lighting Board
  {
    id: 'sb-1',
    name: 'Sputnik Chandelier',
    price: 890,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    category: 'Lighting',
  },
  {
    id: 'sb-2',
    name: 'Modern Pendant Light',
    price: 380,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    category: 'Lighting',
  },
  {
    id: 'sb-3',
    name: 'Wall Sconce Pair',
    price: 420,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Lighting',
  },

  // Living Room Furniture Board
  {
    id: 'sb-4',
    name: 'Sectional Sofa',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    category: 'Furniture',
  },
  {
    id: 'sb-5',
    name: 'Accent Chair',
    price: 850,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    category: 'Furniture',
  },
  {
    id: 'sb-6',
    name: 'Coffee Table',
    price: 650,
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&h=400&fit=crop',
    category: 'Furniture',
  },
  {
    id: 'sb-7',
    name: 'Floor Lamp',
    price: 320,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Lighting',
  },
  {
    id: 'sb-8',
    name: 'Area Rug',
    price: 580,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    category: 'Decor',
  },
  {
    id: 'sb-9',
    name: 'Throw Pillows Set',
    price: 180,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
    category: 'Decor',
  },
  {
    id: 'sb-10',
    name: 'Wall Art',
    price: 450,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    category: 'Decor',
  },
];
```

### 4. (Optional) Mobile Quick-Add for Selection Boards

Current issue: On mobile, users have to drag items from bottom of screen to top (canvas). Add a quick-add button for mobile.

**Mobile Quick Add UI:**

```
┌─────────────────────────────────────────┐
│ Products                                │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ┌─────┐  Sputnik Chandelier        │ │
│ │ │ img │  $890                       │ │
│ │ └─────┘              [+ Add]  ← NEW │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ┌─────┐  Modern Pendant            │ │
│ │ │ img │  $380                       │ │
│ │ └─────┘              [+ Add]  ← NEW │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Implementation:**

```typescript
// In product list item component
function ProductItem({ product, onAdd, isMobile }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">${product.price}</p>
      </div>

      {/* Show Add button on mobile, hide on desktop (use drag there) */}
      {isMobile && (
        <button
          onClick={() => onAdd(product)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg"
        >
          + Add
        </button>
      )}
    </div>
  );
}

// Detect mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Or use Tailwind responsive classes
<button className="md:hidden px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg">
  + Add
</button>
```

When "Add" is clicked on mobile:
1. Add item to canvas at a default position (e.g., center or next available spot)
2. Show toast "Item added to board"
3. User can then reposition if needed

## Files to Update

1. **Materials mock data** - Update images in materials library data
2. **Selection Boards mock data** - Update product images
3. **Product sidebar in Selection Boards** - Optionally add mobile quick-add button

## Image Naming Convention

Make sure image URLs match the product type:
- Chandelier → chandelier/pendant lighting image
- Sofa → sofa image
- Table → table image
- Rug → rug image
- Mirror → mirror image
- etc.

## Success Criteria

- [ ] Materials Library shows category-appropriate images
- [ ] Lighting products show lighting images (chandeliers, pendants, sconces)
- [ ] Furniture products show furniture images (sofas, chairs, tables)
- [ ] Decor products show decor images (rugs, mirrors, art)
- [ ] Selection Board products have matching images
- [ ] Images load properly (valid Unsplash URLs)
- [ ] (Optional) Mobile has "Add" button for quick-add to canvas
- [ ] (Optional) Quick-add places item on canvas at reasonable position

## Don't Touch

- Drag and drop functionality (keep working on desktop)
- Canvas positioning logic
- Product card styling (just update image URLs)
- Other pages
