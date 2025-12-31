// Mock Data for AF Designs Interior Design Platform

// ============ CLIENTS ============
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Lead' | 'Past';
  totalSpent: number;
  currentProjectId?: string;
  avatar?: string;
  notes?: string;
  createdAt: string;
  preferredContact?: 'email' | 'phone' | 'text';
  lastContactDate?: string;
}

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Sarah Dickey',
    email: 'sarah.dickey@email.com',
    phone: '(555) 123-4567',
    address: '1234 Oak Street, Austin, TX 78701',
    status: 'Active',
    totalSpent: 45200,
    currentProjectId: 'p1',
    createdAt: '2024-06-15',
    notes: 'Referred by Jennifer Gosche. Very particular about modern minimalist style.',
  },
  {
    id: 'c2',
    name: 'Michael & Jennifer Gosche',
    email: 'gosche.family@email.com',
    phone: '(555) 234-5678',
    address: '5678 Maple Avenue, Austin, TX 78702',
    status: 'Active',
    totalSpent: 78500,
    currentProjectId: 'p2',
    createdAt: '2024-03-10',
    notes: 'Long-term client. Third project together.',
  },
  {
    id: 'c3',
    name: 'Robert Chen',
    email: 'rchen@techcorp.com',
    phone: '(555) 345-6789',
    address: '910 Congress Ave, Austin, TX 78701',
    status: 'Active',
    totalSpent: 32100,
    currentProjectId: 'p3',
    createdAt: '2024-08-20',
  },
  {
    id: 'c4',
    name: 'Amanda Martinez',
    email: 'amanda.m@gmail.com',
    phone: '(555) 456-7890',
    address: '2345 Riverside Dr, Austin, TX 78704',
    status: 'Active',
    totalSpent: 28750,
    currentProjectId: 'p4',
    createdAt: '2024-09-05',
  },
  {
    id: 'c5',
    name: 'David & Lisa Thompson',
    email: 'thompson.dl@email.com',
    phone: '(555) 567-8901',
    address: '789 Lake View Blvd, Austin, TX 78703',
    status: 'Active',
    totalSpent: 156000,
    currentProjectId: 'p5',
    createdAt: '2023-11-15',
    notes: 'Full home renovation. Budget conscious but appreciates quality.',
  },
  {
    id: 'c6',
    name: 'Emily Watson',
    email: 'ewatson@designstudio.com',
    phone: '(555) 678-9012',
    address: '456 Design District, Austin, TX 78705',
    status: 'Lead',
    totalSpent: 0,
    createdAt: '2024-11-28',
    notes: 'Interested in home office redesign. Meeting scheduled for next week.',
  },
  {
    id: 'c7',
    name: 'James & Maria Rodriguez',
    email: 'jmrodriguez@email.com',
    phone: '(555) 789-0123',
    address: '321 Sunset Blvd, Austin, TX 78746',
    status: 'Past',
    totalSpent: 89400,
    createdAt: '2023-05-10',
  },
  {
    id: 'c8',
    name: 'Catherine O\'Brien',
    email: 'cobrien@lawfirm.com',
    phone: '(555) 890-1234',
    address: '654 Downtown Plaza, Austin, TX 78701',
    status: 'Past',
    totalSpent: 42300,
    createdAt: '2023-08-22',
  },
  {
    id: 'c9',
    name: 'William Park',
    email: 'wpark@consulting.com',
    phone: '(555) 901-2345',
    address: '987 Hill Country Way, Austin, TX 78738',
    status: 'Lead',
    totalSpent: 0,
    createdAt: '2024-12-01',
    notes: 'New construction - wants full interior design services.',
  },
  {
    id: 'c10',
    name: 'Patricia & George Miller',
    email: 'millers@email.com',
    phone: '(555) 012-3456',
    address: '147 Garden Grove, Austin, TX 78745',
    status: 'Active',
    totalSpent: 67800,
    currentProjectId: 'p6',
    createdAt: '2024-07-18',
  },
  {
    id: 'c11',
    name: 'Daniel Kim',
    email: 'dkim@startup.io',
    phone: '(555) 234-5670',
    address: '258 Tech Park Dr, Austin, TX 78758',
    status: 'Active',
    totalSpent: 18500,
    currentProjectId: 'p7',
    createdAt: '2024-10-05',
  },
  {
    id: 'c12',
    name: 'Nicole Anderson',
    email: 'nicole.a@realtor.com',
    phone: '(555) 345-6780',
    address: '369 Realty Row, Austin, TX 78731',
    status: 'Past',
    totalSpent: 34200,
    createdAt: '2023-02-14',
  },
];

// ============ PROJECTS ============
export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: 'Design' | 'Selections' | 'Ordering' | 'Installation' | 'Complete';
  budgetEstimated: number;
  budgetSpent: number;
  startDate: string;
  targetCompletion: string;
  address: string;
  description: string;
  progress: number;
  lastUpdated: string;
}

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Dickey Kitchen Remodel',
    clientId: 'c1',
    clientName: 'Sarah Dickey',
    status: 'Selections',
    budgetEstimated: 65000,
    budgetSpent: 28500,
    startDate: '2024-10-01',
    targetCompletion: '2025-02-28',
    address: '1234 Oak Street, Austin, TX 78701',
    description: 'Complete kitchen renovation including custom cabinetry, new appliances, and marble countertops.',
    progress: 45,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'p2',
    name: 'Gosche Master Suite',
    clientId: 'c2',
    clientName: 'Michael & Jennifer Gosche',
    status: 'Ordering',
    budgetEstimated: 95000,
    budgetSpent: 62300,
    startDate: '2024-08-15',
    targetCompletion: '2025-01-31',
    address: '5678 Maple Avenue, Austin, TX 78702',
    description: 'Master bedroom and bathroom renovation with walk-in closet expansion.',
    progress: 68,
    lastUpdated: '2024-12-27',
  },
  {
    id: 'p3',
    name: 'Chen Home Office',
    clientId: 'c3',
    clientName: 'Robert Chen',
    status: 'Design',
    budgetEstimated: 35000,
    budgetSpent: 4200,
    startDate: '2024-11-20',
    targetCompletion: '2025-03-15',
    address: '910 Congress Ave, Austin, TX 78701',
    description: 'Executive home office with built-in shelving and custom desk.',
    progress: 15,
    lastUpdated: '2024-12-26',
  },
  {
    id: 'p4',
    name: 'Martinez Living Room',
    clientId: 'c4',
    clientName: 'Amanda Martinez',
    status: 'Selections',
    budgetEstimated: 42000,
    budgetSpent: 15800,
    startDate: '2024-10-10',
    targetCompletion: '2025-02-15',
    address: '2345 Riverside Dr, Austin, TX 78704',
    description: 'Living room and dining area redesign with focus on entertainment and hosting.',
    progress: 38,
    lastUpdated: '2024-12-29',
  },
  {
    id: 'p5',
    name: 'Thompson Full Home Renovation',
    clientId: 'c5',
    clientName: 'David & Lisa Thompson',
    status: 'Installation',
    budgetEstimated: 285000,
    budgetSpent: 198500,
    startDate: '2024-03-01',
    targetCompletion: '2025-02-01',
    address: '789 Lake View Blvd, Austin, TX 78703',
    description: 'Complete home renovation including all living spaces, 4 bedrooms, and outdoor areas.',
    progress: 82,
    lastUpdated: '2024-12-30',
  },
  {
    id: 'p6',
    name: 'Miller Guest Suite',
    clientId: 'c10',
    clientName: 'Patricia & George Miller',
    status: 'Ordering',
    budgetEstimated: 78000,
    budgetSpent: 45200,
    startDate: '2024-09-01',
    targetCompletion: '2025-01-15',
    address: '147 Garden Grove, Austin, TX 78745',
    description: 'Guest suite addition with private bathroom and kitchenette.',
    progress: 58,
    lastUpdated: '2024-12-25',
  },
  {
    id: 'p7',
    name: 'Kim Studio Apartment',
    clientId: 'c11',
    clientName: 'Daniel Kim',
    status: 'Design',
    budgetEstimated: 25000,
    budgetSpent: 3800,
    startDate: '2024-11-15',
    targetCompletion: '2025-03-01',
    address: '258 Tech Park Dr, Austin, TX 78758',
    description: 'Modern studio apartment redesign maximizing space efficiency.',
    progress: 20,
    lastUpdated: '2024-12-28',
  },
  {
    id: 'p8',
    name: 'Rodriguez Outdoor Living',
    clientId: 'c7',
    clientName: 'James & Maria Rodriguez',
    status: 'Complete',
    budgetEstimated: 92000,
    budgetSpent: 89400,
    startDate: '2023-04-01',
    targetCompletion: '2023-09-30',
    address: '321 Sunset Blvd, Austin, TX 78746',
    description: 'Outdoor kitchen, patio, and pool area design.',
    progress: 100,
    lastUpdated: '2023-10-05',
  },
];

// ============ MATERIALS / PRODUCTS ============
export interface Product {
  id: string;
  name: string;
  sku: string;
  vendorId: string;
  vendorName: string;
  category: 'Lighting' | 'Plumbing' | 'Tile' | 'Furniture' | 'Appliances' | 'Fabrics' | 'Hardware' | 'Flooring' | 'Countertops' | 'Cabinetry';
  price: number;
  previousPrice?: number;
  priceChangePercent?: number;
  image: string;
  dimensions?: string;
  leadTime: string;
  lastUpdated: string;
  usedInProjects: number;
  description?: string;
}

export const products: Product[] = [
  // Lighting
  {
    id: 'prod1',
    name: 'Arteriors Zanadoo Chandelier',
    sku: 'ART-89520',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Lighting',
    price: 2450,
    previousPrice: 2200,
    priceChangePercent: 11.4,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    dimensions: '36" W x 42" H',
    leadTime: '4-6 weeks',
    lastUpdated: '2024-12-15',
    usedInProjects: 3,
    description: 'Modern sculptural chandelier with antique brass finish',
  },
  {
    id: 'prod2',
    name: 'Visual Comfort Goodman Pendant',
    sku: 'VC-TOB5090',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Lighting',
    price: 895,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    dimensions: '18" diameter',
    leadTime: '2-3 weeks',
    lastUpdated: '2024-12-20',
    usedInProjects: 7,
  },
  {
    id: 'prod3',
    name: 'Kelly Wearstler Precision Sconce',
    sku: 'KW-SC1234',
    vendorId: 'v2',
    vendorName: 'Build.com',
    category: 'Lighting',
    price: 650,
    previousPrice: 680,
    priceChangePercent: -4.4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    leadTime: '3-4 weeks',
    lastUpdated: '2024-12-18',
    usedInProjects: 5,
  },
  // Plumbing
  {
    id: 'prod4',
    name: 'Kohler Purist Faucet',
    sku: 'K-14406-4',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Plumbing',
    price: 785,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
    leadTime: '1-2 weeks',
    lastUpdated: '2024-12-22',
    usedInProjects: 12,
  },
  {
    id: 'prod5',
    name: 'Waterworks Henry Shower System',
    sku: 'WW-HEN-001',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Plumbing',
    price: 4250,
    previousPrice: 3950,
    priceChangePercent: 7.6,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop',
    leadTime: '6-8 weeks',
    lastUpdated: '2024-12-10',
    usedInProjects: 4,
  },
  // Tile
  {
    id: 'prod6',
    name: 'Clé Zellige Tile - Weathered White',
    sku: 'CLE-ZEL-WW',
    vendorId: 'v3',
    vendorName: 'Clé Tile',
    category: 'Tile',
    price: 35,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
    dimensions: '4" x 4" per piece',
    leadTime: '2-3 weeks',
    lastUpdated: '2024-12-25',
    usedInProjects: 8,
    description: 'Price per square foot. Handmade Moroccan zellige tile.',
  },
  {
    id: 'prod7',
    name: 'Ann Sacks Carrara Marble Hex',
    sku: 'AS-CAR-HEX',
    vendorId: 'v4',
    vendorName: 'Ann Sacks',
    category: 'Tile',
    price: 48,
    previousPrice: 45,
    priceChangePercent: 6.7,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=400&fit=crop',
    leadTime: '3-4 weeks',
    lastUpdated: '2024-12-08',
    usedInProjects: 6,
  },
  // Furniture
  {
    id: 'prod8',
    name: 'RH Cloud Modular Sofa',
    sku: 'RH-CLD-MOD',
    vendorId: 'v5',
    vendorName: 'Restoration Hardware',
    category: 'Furniture',
    price: 8950,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    dimensions: '120" W x 40" D x 32" H',
    leadTime: '10-12 weeks',
    lastUpdated: '2024-12-05',
    usedInProjects: 4,
  },
  {
    id: 'prod9',
    name: 'West Elm Andes Sectional',
    sku: 'WE-AND-SEC',
    vendorId: 'v6',
    vendorName: 'West Elm',
    category: 'Furniture',
    price: 4299,
    previousPrice: 4599,
    priceChangePercent: -6.5,
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=400&fit=crop',
    dimensions: '113" W x 89" D x 34" H',
    leadTime: '8-10 weeks',
    lastUpdated: '2024-12-20',
    usedInProjects: 6,
  },
  {
    id: 'prod10',
    name: 'CB2 Gwyneth Dining Table',
    sku: 'CB2-GWY-DT',
    vendorId: 'v7',
    vendorName: 'CB2',
    category: 'Furniture',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    dimensions: '84" L x 42" W x 30" H',
    leadTime: '4-6 weeks',
    lastUpdated: '2024-12-15',
    usedInProjects: 3,
  },
  // Appliances
  {
    id: 'prod11',
    name: 'Wolf 48" Gas Range',
    sku: 'WOLF-GR486G',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Appliances',
    price: 12850,
    previousPrice: 12450,
    priceChangePercent: 3.2,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    dimensions: '48" W x 28" D x 36" H',
    leadTime: '6-8 weeks',
    lastUpdated: '2024-12-01',
    usedInProjects: 5,
  },
  {
    id: 'prod12',
    name: 'Sub-Zero 48" Built-in Refrigerator',
    sku: 'SZ-BI48SD',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Appliances',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    dimensions: '48" W x 24" D x 84" H',
    leadTime: '8-10 weeks',
    lastUpdated: '2024-11-28',
    usedInProjects: 4,
  },
  // Countertops
  {
    id: 'prod13',
    name: 'Calacatta Gold Marble Slab',
    sku: 'CAL-GOLD-SLB',
    vendorId: 'v8',
    vendorName: 'Arizona Tile',
    category: 'Countertops',
    price: 185,
    previousPrice: 175,
    priceChangePercent: 5.7,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=400&fit=crop',
    leadTime: '2-3 weeks',
    lastUpdated: '2024-12-12',
    usedInProjects: 7,
    description: 'Price per square foot. Premium Italian marble.',
  },
  {
    id: 'prod14',
    name: 'Caesarstone Empira White',
    sku: 'CS-5151',
    vendorId: 'v8',
    vendorName: 'Arizona Tile',
    category: 'Countertops',
    price: 95,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop',
    leadTime: '1-2 weeks',
    lastUpdated: '2024-12-22',
    usedInProjects: 9,
    description: 'Price per square foot. Engineered quartz.',
  },
  // Hardware
  {
    id: 'prod15',
    name: 'Emtek Select Cabinet Pull - Satin Brass',
    sku: 'EMT-SEL-SB',
    vendorId: 'v2',
    vendorName: 'Build.com',
    category: 'Hardware',
    price: 42,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    dimensions: '6" length',
    leadTime: '1 week',
    lastUpdated: '2024-12-24',
    usedInProjects: 15,
  },
  // More products...
  {
    id: 'prod16',
    name: 'Rejuvenation Eastmoreland Pendant',
    sku: 'REJ-EAST-PD',
    vendorId: 'v9',
    vendorName: 'Rejuvenation',
    category: 'Lighting',
    price: 549,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    leadTime: '2-4 weeks',
    lastUpdated: '2024-12-18',
    usedInProjects: 4,
  },
  {
    id: 'prod17',
    name: 'Brizo Litze Pull-Down Faucet',
    sku: 'BRZ-64063LF',
    vendorId: 'v1',
    vendorName: 'Ferguson',
    category: 'Plumbing',
    price: 1150,
    previousPrice: 1050,
    priceChangePercent: 9.5,
    image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=400&fit=crop',
    leadTime: '2-3 weeks',
    lastUpdated: '2024-12-10',
    usedInProjects: 6,
  },
  {
    id: 'prod18',
    name: 'Stark Carpet - Woven Sisal',
    sku: 'STK-SIS-NAT',
    vendorId: 'v10',
    vendorName: 'Stark Carpet',
    category: 'Flooring',
    price: 28,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    leadTime: '3-4 weeks',
    lastUpdated: '2024-12-20',
    usedInProjects: 3,
    description: 'Price per square foot. Natural fiber.',
  },
];

// ============ VENDORS ============
export interface Vendor {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  accountNumber: string;
  taxRate: number;
  hasApi: boolean;
  website: string;
  totalOrders: number;
}

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Ferguson',
    contactName: 'Mark Stevens',
    email: 'mstevens@ferguson.com',
    phone: '(800) 555-1234',
    accountNumber: 'FRG-78542',
    taxRate: 8.25,
    hasApi: true,
    website: 'https://ferguson.com',
    totalOrders: 156,
  },
  {
    id: 'v2',
    name: 'Build.com',
    contactName: 'Sarah Johnson',
    email: 'sjohnson@build.com',
    phone: '(800) 555-2345',
    accountNumber: 'BLD-12345',
    taxRate: 8.25,
    hasApi: true,
    website: 'https://build.com',
    totalOrders: 89,
  },
  {
    id: 'v3',
    name: 'Clé Tile',
    contactName: 'Maria Garcia',
    email: 'maria@cletile.com',
    phone: '(510) 555-3456',
    accountNumber: 'CLE-9876',
    taxRate: 9.5,
    hasApi: false,
    website: 'https://cletile.com',
    totalOrders: 34,
  },
  {
    id: 'v4',
    name: 'Ann Sacks',
    contactName: 'Jennifer Williams',
    email: 'jwilliams@annsacks.com',
    phone: '(800) 555-4567',
    accountNumber: 'ANN-5432',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://annsacks.com',
    totalOrders: 45,
  },
  {
    id: 'v5',
    name: 'Restoration Hardware',
    contactName: 'Michael Brown',
    email: 'mbrown@rh.com',
    phone: '(800) 555-5678',
    accountNumber: 'RH-78901',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://rh.com',
    totalOrders: 67,
  },
  {
    id: 'v6',
    name: 'West Elm',
    contactName: 'Lisa Davis',
    email: 'ldavis@westelm.com',
    phone: '(866) 555-6789',
    accountNumber: 'WE-34567',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://westelm.com',
    totalOrders: 78,
  },
  {
    id: 'v7',
    name: 'CB2',
    contactName: 'David Wilson',
    email: 'dwilson@cb2.com',
    phone: '(800) 555-7890',
    accountNumber: 'CB2-23456',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://cb2.com',
    totalOrders: 42,
  },
  {
    id: 'v8',
    name: 'Arizona Tile',
    contactName: 'Robert Martinez',
    email: 'rmartinez@arizonatile.com',
    phone: '(512) 555-8901',
    accountNumber: 'AZT-45678',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://arizonatile.com',
    totalOrders: 56,
  },
  {
    id: 'v9',
    name: 'Rejuvenation',
    contactName: 'Emily Thompson',
    email: 'ethompson@rejuvenation.com',
    phone: '(888) 555-9012',
    accountNumber: 'REJ-67890',
    taxRate: 0,
    hasApi: false,
    website: 'https://rejuvenation.com',
    totalOrders: 28,
  },
  {
    id: 'v10',
    name: 'Stark Carpet',
    contactName: 'James Lee',
    email: 'jlee@starkcarpet.com',
    phone: '(800) 555-0123',
    accountNumber: 'STK-89012',
    taxRate: 8.25,
    hasApi: false,
    website: 'https://starkcarpet.com',
    totalOrders: 19,
  },
];

// ============ PROPOSALS ============
export interface ProposalLineItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export interface Proposal {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Signed' | 'Expired';
  subtotal: number;
  taxTotal: number;
  total: number;
  createdAt: string;
  sentAt?: string;
  signedAt?: string;
  expiresAt: string;
  lineItems: ProposalLineItem[];
}

export const proposals: Proposal[] = [
  {
    id: 'prop1',
    number: 'PROP-2024-001',
    clientId: 'c1',
    clientName: 'Sarah Dickey',
    projectId: 'p1',
    projectName: 'Dickey Kitchen Remodel',
    status: 'Signed',
    subtotal: 45200,
    taxTotal: 3729,
    total: 48929,
    createdAt: '2024-09-28',
    sentAt: '2024-09-29',
    signedAt: '2024-10-01',
    expiresAt: '2024-10-29',
    lineItems: [
      { id: 'li1', productId: 'prod11', description: 'Wolf 48" Gas Range', quantity: 1, unitPrice: 12850, tax: 1060.13, total: 13910.13 },
      { id: 'li2', productId: 'prod12', description: 'Sub-Zero Refrigerator', quantity: 1, unitPrice: 18500, tax: 1526.25, total: 20026.25 },
      { id: 'li3', description: 'Custom Cabinetry - Design & Installation', quantity: 1, unitPrice: 8500, tax: 701.25, total: 9201.25 },
      { id: 'li4', productId: 'prod13', description: 'Calacatta Gold Marble - 30 sq ft', quantity: 30, unitPrice: 185, tax: 457.88, total: 5957.88 },
    ],
  },
  {
    id: 'prop2',
    number: 'PROP-2024-002',
    clientId: 'c2',
    clientName: 'Michael & Jennifer Gosche',
    projectId: 'p2',
    projectName: 'Gosche Master Suite',
    status: 'Signed',
    subtotal: 62300,
    taxTotal: 5139.75,
    total: 67439.75,
    createdAt: '2024-08-10',
    sentAt: '2024-08-11',
    signedAt: '2024-08-15',
    expiresAt: '2024-09-10',
    lineItems: [],
  },
  {
    id: 'prop3',
    number: 'PROP-2024-003',
    clientId: 'c4',
    clientName: 'Amanda Martinez',
    projectId: 'p4',
    projectName: 'Martinez Living Room',
    status: 'Sent',
    subtotal: 28500,
    taxTotal: 2351.25,
    total: 30851.25,
    createdAt: '2024-12-20',
    sentAt: '2024-12-21',
    expiresAt: '2025-01-20',
    lineItems: [
      { id: 'li5', productId: 'prod9', description: 'West Elm Andes Sectional', quantity: 1, unitPrice: 4299, tax: 354.67, total: 4653.67 },
      { id: 'li6', productId: 'prod10', description: 'CB2 Gwyneth Dining Table', quantity: 1, unitPrice: 1899, tax: 156.67, total: 2055.67 },
      { id: 'li7', description: 'Design Services - Living & Dining', quantity: 1, unitPrice: 5500, tax: 453.75, total: 5953.75 },
    ],
  },
  {
    id: 'prop4',
    number: 'PROP-2024-004',
    clientId: 'c3',
    clientName: 'Robert Chen',
    projectId: 'p3',
    projectName: 'Chen Home Office',
    status: 'Draft',
    subtotal: 18500,
    taxTotal: 1526.25,
    total: 20026.25,
    createdAt: '2024-12-28',
    expiresAt: '2025-01-28',
    lineItems: [],
  },
  {
    id: 'prop5',
    number: 'PROP-2024-005',
    clientId: 'c5',
    clientName: 'David & Lisa Thompson',
    projectId: 'p5',
    projectName: 'Thompson Full Home Renovation',
    status: 'Signed',
    subtotal: 198500,
    taxTotal: 16376.25,
    total: 214876.25,
    createdAt: '2024-02-25',
    sentAt: '2024-02-26',
    signedAt: '2024-03-01',
    expiresAt: '2024-03-25',
    lineItems: [],
  },
  {
    id: 'prop6',
    number: 'PROP-2024-006',
    clientId: 'c10',
    clientName: 'Patricia & George Miller',
    projectId: 'p6',
    projectName: 'Miller Guest Suite',
    status: 'Viewed',
    subtotal: 45200,
    taxTotal: 3729,
    total: 48929,
    createdAt: '2024-12-22',
    sentAt: '2024-12-23',
    expiresAt: '2025-01-22',
    lineItems: [],
  },
];

// ============ INVOICES ============
export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Partial';
  subtotal: number;
  taxTotal: number;
  total: number;
  paidAmount: number;
  createdAt: string;
  sentAt?: string;
  dueDate: string;
  paidAt?: string;
  syncedToQuickBooks: boolean;
  lineItems: ProposalLineItem[];
}

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    number: 'INV-2024-001',
    clientId: 'c1',
    clientName: 'Sarah Dickey',
    projectId: 'p1',
    projectName: 'Dickey Kitchen Remodel',
    status: 'Paid',
    subtotal: 15000,
    taxTotal: 1237.50,
    total: 16237.50,
    paidAmount: 16237.50,
    createdAt: '2024-10-05',
    sentAt: '2024-10-05',
    dueDate: '2024-10-20',
    paidAt: '2024-10-18',
    syncedToQuickBooks: true,
    lineItems: [
      { id: 'ili1', description: 'Design Phase - 50% Deposit', quantity: 1, unitPrice: 15000, tax: 1237.50, total: 16237.50 },
    ],
  },
  {
    id: 'inv2',
    number: 'INV-2024-002',
    clientId: 'c2',
    clientName: 'Michael & Jennifer Gosche',
    projectId: 'p2',
    projectName: 'Gosche Master Suite',
    status: 'Paid',
    subtotal: 31150,
    taxTotal: 2569.88,
    total: 33719.88,
    paidAmount: 33719.88,
    createdAt: '2024-08-20',
    sentAt: '2024-08-20',
    dueDate: '2024-09-05',
    paidAt: '2024-09-02',
    syncedToQuickBooks: true,
    lineItems: [],
  },
  {
    id: 'inv3',
    number: 'INV-2024-003',
    clientId: 'c2',
    clientName: 'Michael & Jennifer Gosche',
    projectId: 'p2',
    projectName: 'Gosche Master Suite',
    status: 'Sent',
    subtotal: 31150,
    taxTotal: 2569.88,
    total: 33719.88,
    paidAmount: 0,
    createdAt: '2024-12-15',
    sentAt: '2024-12-16',
    dueDate: '2025-01-05',
    syncedToQuickBooks: true,
    lineItems: [],
  },
  {
    id: 'inv4',
    number: 'INV-2024-004',
    clientId: 'c5',
    clientName: 'David & Lisa Thompson',
    projectId: 'p5',
    projectName: 'Thompson Full Home Renovation',
    status: 'Partial',
    subtotal: 85000,
    taxTotal: 7012.50,
    total: 92012.50,
    paidAmount: 50000,
    createdAt: '2024-11-01',
    sentAt: '2024-11-02',
    dueDate: '2024-12-01',
    syncedToQuickBooks: true,
    lineItems: [],
  },
  {
    id: 'inv5',
    number: 'INV-2024-005',
    clientId: 'c10',
    clientName: 'Patricia & George Miller',
    projectId: 'p6',
    projectName: 'Miller Guest Suite',
    status: 'Overdue',
    subtotal: 22600,
    taxTotal: 1864.50,
    total: 24464.50,
    paidAmount: 0,
    createdAt: '2024-11-20',
    sentAt: '2024-11-21',
    dueDate: '2024-12-10',
    syncedToQuickBooks: true,
    lineItems: [],
  },
  {
    id: 'inv6',
    number: 'INV-2024-006',
    clientId: 'c3',
    clientName: 'Robert Chen',
    projectId: 'p3',
    projectName: 'Chen Home Office',
    status: 'Draft',
    subtotal: 4200,
    taxTotal: 346.50,
    total: 4546.50,
    paidAmount: 0,
    createdAt: '2024-12-28',
    dueDate: '2025-01-15',
    syncedToQuickBooks: false,
    lineItems: [],
  },
  {
    id: 'inv7',
    number: 'INV-2024-007',
    clientId: 'c7',
    clientName: 'James & Maria Rodriguez',
    projectId: 'p8',
    projectName: 'Rodriguez Outdoor Living',
    status: 'Paid',
    subtotal: 89400,
    taxTotal: 7375.50,
    total: 96775.50,
    paidAmount: 96775.50,
    createdAt: '2023-09-15',
    sentAt: '2023-09-16',
    dueDate: '2023-10-01',
    paidAt: '2023-09-28',
    syncedToQuickBooks: true,
    lineItems: [],
  },
  {
    id: 'inv8',
    number: 'INV-2024-008',
    clientId: 'c4',
    clientName: 'Amanda Martinez',
    projectId: 'p4',
    projectName: 'Martinez Living Room',
    status: 'Sent',
    subtotal: 8000,
    taxTotal: 660,
    total: 8660,
    paidAmount: 0,
    createdAt: '2024-12-26',
    sentAt: '2024-12-27',
    dueDate: '2025-01-15',
    syncedToQuickBooks: true,
    lineItems: [],
  },
];

// ============ SELECTION BOARDS ============
export interface SelectionItem {
  id: string;
  productId: string;
  productName: string;
  vendorName: string;
  price: number;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered';
  notes?: string;
}

export interface SelectionBoard {
  id: string;
  projectId: string;
  name: string;
  room: string;
  items: SelectionItem[];
  createdAt: string;
  updatedAt: string;
  status?: 'Pending' | 'Approved' | 'Draft';
  itemCount?: number;
  totalValue?: number;
  lastUpdated?: string;
}

export const selectionBoards: SelectionBoard[] = [
  {
    id: 'sb1',
    projectId: 'p1',
    name: 'Kitchen Appliances',
    room: 'Kitchen',
    items: [
      { id: 'si1', productId: 'prod11', productName: 'Wolf 48" Gas Range', vendorName: 'Ferguson', price: 12850, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', status: 'Approved' },
      { id: 'si2', productId: 'prod12', productName: 'Sub-Zero Refrigerator', vendorName: 'Ferguson', price: 18500, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop', status: 'Approved' },
    ],
    createdAt: '2024-10-05',
    updatedAt: '2024-10-15',
  },
  {
    id: 'sb2',
    projectId: 'p1',
    name: 'Countertops & Backsplash',
    room: 'Kitchen',
    items: [
      { id: 'si3', productId: 'prod13', productName: 'Calacatta Gold Marble', vendorName: 'Arizona Tile', price: 185, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=400&fit=crop', status: 'Approved' },
      { id: 'si4', productId: 'prod6', productName: 'Clé Zellige Tile', vendorName: 'Clé Tile', price: 35, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop', status: 'Pending' },
    ],
    createdAt: '2024-10-10',
    updatedAt: '2024-12-20',
  },
  {
    id: 'sb3',
    projectId: 'p2',
    name: 'Bathroom Fixtures',
    room: 'Master Bath',
    items: [
      { id: 'si5', productId: 'prod5', productName: 'Waterworks Henry Shower', vendorName: 'Ferguson', price: 4250, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop', status: 'Ordered' },
      { id: 'si6', productId: 'prod4', productName: 'Kohler Purist Faucet', vendorName: 'Ferguson', price: 785, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop', status: 'Ordered' },
    ],
    createdAt: '2024-08-20',
    updatedAt: '2024-11-05',
  },
  {
    id: 'sb4',
    projectId: 'p4',
    name: 'Living Room Furniture',
    room: 'Living Room',
    items: [
      { id: 'si7', productId: 'prod9', productName: 'West Elm Andes Sectional', vendorName: 'West Elm', price: 4299, image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=400&fit=crop', status: 'Pending' },
      { id: 'si8', productId: 'prod2', productName: 'Visual Comfort Pendant', vendorName: 'Ferguson', price: 895, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop', status: 'Pending' },
    ],
    createdAt: '2024-12-15',
    updatedAt: '2024-12-28',
  },
];

// ============ TASKS ============
export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'Todo' | 'In Progress' | 'Complete';
  assignee?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export const tasks: Task[] = [
  { id: 't1', projectId: 'p1', projectName: 'Dickey Kitchen', title: 'Finalize tile selection', dueDate: '2025-01-03', status: 'Todo', priority: 'High' },
  { id: 't2', projectId: 'p1', projectName: 'Dickey Kitchen', title: 'Order backsplash tile', dueDate: '2025-01-08', status: 'Todo', priority: 'Medium' },
  { id: 't3', projectId: 'p2', projectName: 'Gosche Master Suite', title: 'Schedule plumber for fixture install', dueDate: '2025-01-05', status: 'In Progress', priority: 'High' },
  { id: 't4', projectId: 'p5', projectName: 'Thompson Renovation', title: 'Final walkthrough', dueDate: '2025-01-20', status: 'Todo', priority: 'High' },
  { id: 't5', projectId: 'p4', projectName: 'Martinez Living Room', title: 'Present furniture options', dueDate: '2025-01-02', status: 'In Progress', priority: 'Medium' },
  { id: 't6', projectId: 'p3', projectName: 'Chen Home Office', title: 'Complete initial design concepts', dueDate: '2025-01-10', status: 'Todo', priority: 'Medium' },
  { id: 't7', projectId: 'p6', projectName: 'Miller Guest Suite', title: 'Follow up on overdue invoice', dueDate: '2024-12-30', status: 'In Progress', priority: 'High' },
];

// ============ ACTIVITY / MESSAGES ============
export interface Activity {
  id: string;
  type: 'invoice' | 'proposal' | 'message' | 'project' | 'approval';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export const recentActivity: Activity[] = [
  { id: 'a1', type: 'approval', title: 'Selection Approved', description: 'Sarah Dickey approved Wolf Range selection', timestamp: '2024-12-30T14:30:00', read: false },
  { id: 'a2', type: 'invoice', title: 'Invoice Paid', description: 'Dickey Kitchen - Invoice #001 paid in full', timestamp: '2024-12-30T10:15:00', read: false },
  { id: 'a3', type: 'message', title: 'New Message', description: 'Amanda Martinez sent a message about dining table', timestamp: '2024-12-29T16:45:00', read: true },
  { id: 'a4', type: 'proposal', title: 'Proposal Viewed', description: 'Patricia Miller viewed proposal PROP-2024-006', timestamp: '2024-12-29T11:20:00', read: true },
  { id: 'a5', type: 'project', title: 'Project Updated', description: 'Thompson Renovation moved to Installation phase', timestamp: '2024-12-28T09:00:00', read: true },
];

// ============ DASHBOARD METRICS ============
export const dashboardMetrics = {
  activeProjects: 7,
  pendingApprovals: 4,
  outstandingInvoices: 66056.38,
  thisMonthRevenue: 34200,
  revenueChange: 23,
  overdueInvoices: 1,
  proposalsPending: 2,
  tasksThisWeek: 5,
};

// ============ HELPER FUNCTIONS ============
export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProjectsByClientId(clientId: string): Project[] {
  return projects.filter(p => p.clientId === clientId);
}

export function getSelectionBoardsByProjectId(projectId: string): SelectionBoard[] {
  return selectionBoards.filter(sb => sb.projectId === projectId);
}

export function getTasksByProjectId(projectId: string): Task[] {
  return tasks.filter(t => t.projectId === projectId);
}

export function getInvoicesByClientId(clientId: string): Invoice[] {
  return invoices.filter(i => i.clientId === clientId);
}

export function getProposalsByClientId(clientId: string): Proposal[] {
  return proposals.filter(p => p.clientId === clientId);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
