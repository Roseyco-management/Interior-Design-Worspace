// Mock data for AF Designs Interior Design Platform

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: 'lead' | 'active' | 'completed' | 'inactive';
  currentProject?: string;
  totalSpent?: number;
  totalValue: number;
  avatar?: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  clientId?: string;
  clientName?: string;
  address: string;
  status: 'active' | 'pending' | 'completed' | 'design' | 'selections' | 'ordering' | 'installation' | 'complete';
  budget: number;
  spent: number;
  startDate: string;
  targetCompletion?: string;
  houzzUrl: string;
  rooms?: string[];
  selectionsCount: number;
  approvedSelectionsCount?: number;
}

export interface Material {
  id: string;
  name: string;
  sku: string;
  vendor: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  lastUpdated: string;
  image: string;
  leadTime: string;
  dimensions?: string;
  vendorUrl: string;
}

export interface ProposalItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Proposal {
  id: string;
  number: string;
  name?: string;
  project: string;
  projectId?: string;
  projectName?: string;
  client: string;
  clientName?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  tax?: number;
  total: number;
  taxJurisdiction?: string;
  items: ProposalItem[];
  createdAt: string;
  sentAt?: string;
  signedAt?: string;
}

export interface Invoice {
  id: string;
  number: string;
  project: string;
  projectId?: string;
  projectName?: string;
  client: string;
  clientName?: string;
  description: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  amount: number;
  dueDate: string;
  issueDate: string;
  paidAt?: string;
  quickbooksSynced: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: string;
  from?: string;
  fromAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  read?: boolean;
  isDesigner?: boolean;
}

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Oak Street, Austin, TX 78701',
    status: 'active',
    currentProject: 'Modern Kitchen Renovation',
    totalValue: 45000,
    avatar: '/images/user/user-01.jpg',
    createdAt: '2024-08-15',
    lastContact: '2025-01-12',
    notes: 'Prefers modern, minimalist designs. Very responsive via email.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@techcorp.com',
    phone: '(555) 234-5678',
    address: '456 Maple Ave, Austin, TX 78702',
    status: 'active',
    currentProject: 'Master Suite Redesign',
    totalValue: 78500,
    avatar: '/images/user/user-02.jpg',
    createdAt: '2024-06-20',
    lastContact: '2025-01-10'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@gmail.com',
    phone: '(555) 345-6789',
    address: '789 Pine Lane, Austin, TX 78703',
    status: 'active',
    currentProject: 'Full Home Renovation',
    totalValue: 125000,
    avatar: '/images/user/user-03.jpg',
    createdAt: '2024-03-10',
    lastContact: '2025-01-08'
  },
  {
    id: '4',
    name: 'David Williams',
    email: 'dwilliams@email.com',
    phone: '(555) 456-7890',
    address: '321 Cedar Blvd, Austin, TX 78704',
    status: 'completed',
    totalValue: 32000,
    avatar: '/images/user/user-04.jpg',
    createdAt: '2023-11-05',
    lastContact: '2024-08-30'
  },
  {
    id: '5',
    name: 'Jennifer Taylor',
    email: 'jtaylor@company.com',
    phone: '(555) 567-8901',
    address: '654 Birch St, Austin, TX 78705',
    status: 'lead',
    totalValue: 0,
    avatar: '/images/user/user-05.jpg',
    createdAt: '2025-01-02',
    lastContact: '2025-01-02'
  },
  {
    id: '6',
    name: 'Robert Martinez',
    email: 'rmartinez@mail.com',
    phone: '(555) 678-9012',
    address: '987 Elm Court, Austin, TX 78706',
    status: 'lead',
    totalValue: 0,
    createdAt: '2025-01-10',
    lastContact: '2025-01-10'
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.foster@email.com',
    phone: '(555) 789-0123',
    address: '147 Willow Way, Austin, TX 78707',
    status: 'active',
    currentProject: 'Living Room Update',
    totalValue: 18500,
    createdAt: '2024-09-22',
    lastContact: '2025-01-11'
  },
  {
    id: '8',
    name: 'Christopher Lee',
    email: 'chris.lee@business.com',
    phone: '(555) 890-1234',
    address: '258 Ash Drive, Austin, TX 78708',
    status: 'inactive',
    totalValue: 56000,
    createdAt: '2023-07-14',
    lastContact: '2024-02-15'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    clientId: '1',
    address: '123 Oak Street, Austin, TX 78701',
    status: 'active',
    budget: 55000,
    spent: 12500,
    startDate: '2024-11-01',
    targetCompletion: '2025-03-15',
    houzzUrl: 'https://www.houzz.com/pro/projects/kitchen-renovation',
    rooms: ['Kitchen', 'Pantry'],
    selectionsCount: 24,
    approvedSelectionsCount: 18
  },
  {
    id: '2',
    name: 'Master Suite Redesign',
    client: 'Michael Chen',
    clientId: '2',
    address: '456 Maple Ave, Austin, TX 78702',
    status: 'active',
    budget: 85000,
    spent: 45000,
    startDate: '2024-09-15',
    targetCompletion: '2025-02-28',
    houzzUrl: 'https://www.houzz.com/pro/projects/master-suite',
    rooms: ['Master Bedroom', 'Master Bath', 'Walk-in Closet'],
    selectionsCount: 42,
    approvedSelectionsCount: 42
  },
  {
    id: '3',
    name: 'Full Home Renovation',
    client: 'Emily Rodriguez',
    clientId: '3',
    address: '789 Pine Lane, Austin, TX 78703',
    status: 'pending',
    budget: 200000,
    spent: 25000,
    startDate: '2024-12-01',
    targetCompletion: '2025-08-30',
    houzzUrl: 'https://www.houzz.com/pro/projects/full-home',
    rooms: ['Living Room', 'Kitchen', 'Dining Room', 'Master Suite', 'Guest Rooms'],
    selectionsCount: 8,
    approvedSelectionsCount: 0
  },
  {
    id: '4',
    name: 'Living Room Update',
    client: 'Amanda Foster',
    clientId: '7',
    address: '147 Willow Way, Austin, TX 78707',
    status: 'active',
    budget: 25000,
    spent: 22000,
    startDate: '2024-10-15',
    targetCompletion: '2025-01-20',
    houzzUrl: 'https://www.houzz.com/pro/projects/living-room',
    rooms: ['Living Room'],
    selectionsCount: 15,
    approvedSelectionsCount: 15
  },
  {
    id: '5',
    name: 'Office Conversion',
    client: 'David Williams',
    clientId: '4',
    address: '321 Cedar Blvd, Austin, TX 78704',
    status: 'completed',
    budget: 35000,
    spent: 32000,
    startDate: '2024-05-01',
    targetCompletion: '2024-08-30',
    houzzUrl: 'https://www.houzz.com/pro/projects/office',
    rooms: ['Home Office'],
    selectionsCount: 20,
    approvedSelectionsCount: 20
  }
];

// Mock Materials
export const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Carrara Marble Countertop',
    sku: 'CRRA-MAR-001',
    vendor: 'Ferguson',
    category: 'Countertops',
    currentPrice: 4500,
    previousPrice: 4200,
    priceChange: 300,
    lastUpdated: '2025-01-12',
    image: '/images/products/countertop.jpg',
    leadTime: '4-6 weeks',
    dimensions: '120" x 26"',
    vendorUrl: 'https://www.ferguson.com/product/carrara-marble'
  },
  {
    id: '2',
    name: 'Kohler Sous Kitchen Faucet',
    sku: 'KOH-SOUS-560',
    vendor: 'Ferguson',
    category: 'Plumbing',
    currentPrice: 649,
    previousPrice: 699,
    priceChange: -50,
    lastUpdated: '2025-01-10',
    image: '/images/products/faucet.jpg',
    leadTime: '1-2 weeks',
    vendorUrl: 'https://www.ferguson.com/product/kohler-sous'
  },
  {
    id: '3',
    name: 'Visual Comfort Chandelier',
    sku: 'VC-CHD-8842',
    vendor: 'Circa Lighting',
    category: 'Lighting',
    currentPrice: 2850,
    previousPrice: 2850,
    priceChange: 0,
    lastUpdated: '2025-01-08',
    image: '/images/products/chandelier.jpg',
    leadTime: '8-10 weeks',
    vendorUrl: 'https://www.circalighting.com/chandelier'
  },
  {
    id: '4',
    name: 'Restoration Hardware Sofa',
    sku: 'RH-CLOUD-SECT',
    vendor: 'RH',
    category: 'Furniture',
    currentPrice: 8950,
    previousPrice: 8450,
    priceChange: 500,
    lastUpdated: '2025-01-05',
    image: '/images/products/sofa.jpg',
    leadTime: '10-12 weeks',
    dimensions: '118" x 42" x 32"',
    vendorUrl: 'https://www.rh.com/cloud-sofa'
  },
  {
    id: '5',
    name: 'Ann Sacks Zellige Tile',
    sku: 'AS-ZEL-WHT-4',
    vendor: 'Ann Sacks',
    category: 'Tile',
    currentPrice: 45,
    previousPrice: 42,
    priceChange: 3,
    lastUpdated: '2025-01-11',
    image: '/images/products/tile.jpg',
    leadTime: '6-8 weeks',
    dimensions: '4" x 4"',
    vendorUrl: 'https://www.annsacks.com/zellige'
  },
  {
    id: '6',
    name: 'Sub-Zero Refrigerator 48"',
    sku: 'SZ-PRO-48',
    vendor: 'Ferguson',
    category: 'Appliances',
    currentPrice: 18500,
    previousPrice: 17800,
    priceChange: 700,
    lastUpdated: '2025-01-09',
    image: '/images/products/refrigerator.jpg',
    leadTime: '6-8 weeks',
    vendorUrl: 'https://www.subzero-wolf.com/refrigerator'
  },
  {
    id: '7',
    name: 'Custom Roman Shade',
    sku: 'CUST-ROM-001',
    vendor: 'The Shade Store',
    category: 'Window Treatments',
    currentPrice: 850,
    previousPrice: 850,
    priceChange: 0,
    lastUpdated: '2025-01-06',
    image: '/images/products/shade.jpg',
    leadTime: '3-4 weeks',
    vendorUrl: 'https://www.theshadestore.com'
  },
  {
    id: '8',
    name: 'Benjamin Moore Paint - Simply White',
    sku: 'BM-OC-117',
    vendor: 'Benjamin Moore',
    category: 'Paint',
    currentPrice: 89,
    previousPrice: 85,
    priceChange: 4,
    lastUpdated: '2025-01-12',
    image: '/images/products/paint.jpg',
    leadTime: '1-2 days',
    vendorUrl: 'https://www.benjaminmoore.com/simply-white'
  }
];

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: '1',
    number: 'PROP-2024-001',
    name: 'Kitchen Renovation Phase 1',
    project: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    status: 'accepted',
    subtotal: 35000,
    taxRate: 8.25,
    taxAmount: 2887.50,
    total: 37887.50,
    taxJurisdiction: 'Austin, TX',
    items: [
      { description: 'Design Services', quantity: 1, rate: 5000, amount: 5000 },
      { description: 'Carrara Marble Countertops', quantity: 1, rate: 4500, amount: 4500 },
      { description: 'Custom Cabinetry', quantity: 1, rate: 18000, amount: 18000 },
      { description: 'Appliance Package', quantity: 1, rate: 7500, amount: 7500 }
    ],
    createdAt: '2024-11-15',
    sentAt: '2024-11-16',
    signedAt: '2024-11-20'
  },
  {
    id: '2',
    number: 'PROP-2025-001',
    name: 'Master Suite Materials',
    project: 'Master Suite Redesign',
    client: 'Michael Chen',
    status: 'sent',
    subtotal: 42000,
    taxRate: 8.25,
    taxAmount: 3465,
    total: 45465,
    taxJurisdiction: 'Austin, TX',
    items: [
      { description: 'Design Services', quantity: 1, rate: 8000, amount: 8000 },
      { description: 'Bedroom Furniture', quantity: 1, rate: 15000, amount: 15000 },
      { description: 'Bathroom Fixtures', quantity: 1, rate: 12000, amount: 12000 },
      { description: 'Window Treatments', quantity: 1, rate: 7000, amount: 7000 }
    ],
    createdAt: '2025-01-05',
    sentAt: '2025-01-06'
  },
  {
    id: '3',
    number: 'PROP-2024-015',
    name: 'Full Home Design Retainer',
    project: 'Full Home Renovation',
    client: 'Emily Rodriguez',
    status: 'viewed',
    subtotal: 25000,
    taxRate: 8.25,
    taxAmount: 2062.50,
    total: 27062.50,
    taxJurisdiction: 'Austin, TX',
    items: [
      { description: 'Design Retainer - Phase 1', quantity: 1, rate: 25000, amount: 25000 }
    ],
    createdAt: '2024-12-10',
    sentAt: '2024-12-11'
  },
  {
    id: '4',
    number: 'PROP-2024-012',
    name: 'Living Room Furniture',
    project: 'Living Room Update',
    client: 'Amanda Foster',
    status: 'accepted',
    subtotal: 18500,
    taxRate: 8.25,
    taxAmount: 1526.25,
    total: 20026.25,
    taxJurisdiction: 'Austin, TX',
    items: [
      { description: 'RH Cloud Sectional', quantity: 1, rate: 8950, amount: 8950 },
      { description: 'Accent Chairs (2)', quantity: 2, rate: 2400, amount: 4800 },
      { description: 'Coffee Table', quantity: 1, rate: 2850, amount: 2850 },
      { description: 'Area Rug', quantity: 1, rate: 1900, amount: 1900 }
    ],
    createdAt: '2024-10-20',
    sentAt: '2024-10-21',
    signedAt: '2024-10-25'
  },
  {
    id: '5',
    number: 'PROP-2025-002',
    name: 'Kitchen Appliances Package',
    project: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    status: 'draft',
    subtotal: 28000,
    taxRate: 8.25,
    taxAmount: 2310,
    total: 30310,
    taxJurisdiction: 'Austin, TX',
    items: [
      { description: 'Sub-Zero Refrigerator 48"', quantity: 1, rate: 18500, amount: 18500 },
      { description: 'Wolf Range 36"', quantity: 1, rate: 6500, amount: 6500 },
      { description: 'Miele Dishwasher', quantity: 1, rate: 3000, amount: 3000 }
    ],
    createdAt: '2025-01-10'
  }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2025-001',
    project: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    description: 'Design Services - Phase 1',
    status: 'paid',
    amount: 12500,
    dueDate: '2024-12-15',
    issueDate: '2024-11-25',
    paidAt: '2024-12-12',
    quickbooksSynced: true,
    createdAt: '2024-11-25'
  },
  {
    id: '2',
    number: 'INV-2025-002',
    project: 'Master Suite Redesign',
    client: 'Michael Chen',
    description: 'Furniture & Materials Deposit',
    status: 'paid',
    amount: 25000,
    dueDate: '2024-12-20',
    issueDate: '2024-12-01',
    paidAt: '2024-12-18',
    quickbooksSynced: true,
    createdAt: '2024-12-01'
  },
  {
    id: '3',
    number: 'INV-2025-003',
    project: 'Master Suite Redesign',
    client: 'Michael Chen',
    description: 'Progress Payment - Fixtures',
    status: 'pending',
    amount: 20000,
    dueDate: '2025-01-25',
    issueDate: '2025-01-05',
    quickbooksSynced: true,
    createdAt: '2025-01-05'
  },
  {
    id: '4',
    number: 'INV-2025-004',
    project: 'Full Home Renovation',
    client: 'Emily Rodriguez',
    description: 'Design Retainer',
    status: 'overdue',
    amount: 25000,
    dueDate: '2025-01-01',
    issueDate: '2024-12-15',
    quickbooksSynced: true,
    createdAt: '2024-12-15'
  },
  {
    id: '5',
    number: 'INV-2025-005',
    project: 'Living Room Update',
    client: 'Amanda Foster',
    description: 'Final Payment',
    status: 'paid',
    amount: 22000,
    dueDate: '2025-01-10',
    issueDate: '2024-12-28',
    paidAt: '2025-01-08',
    quickbooksSynced: true,
    createdAt: '2024-12-28'
  },
  {
    id: '6',
    number: 'INV-2025-006',
    project: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    description: 'Appliances Package',
    status: 'draft',
    amount: 15000,
    dueDate: '2025-02-01',
    issueDate: '2025-01-12',
    quickbooksSynced: false,
    createdAt: '2025-01-12'
  }
];

// Mock Messages for Client Portal
export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'AF Designs',
    content: 'Hi Sarah! I wanted to share the updated mood board for your kitchen. The carrara marble countertops will look stunning with the new cabinet color.',
    timestamp: '2025-01-12T10:30:00',
    isRead: true,
    isDesigner: true
  },
  {
    id: '2',
    sender: 'You',
    content: 'Love it! I have a question about the pendant lights - can we see them in person before ordering?',
    timestamp: '2025-01-12T11:45:00',
    isRead: true,
    isDesigner: false
  },
  {
    id: '3',
    sender: 'AF Designs',
    content: 'Absolutely! The showroom has them on display. I can schedule a visit for you this week. How does Thursday at 2pm work?',
    timestamp: '2025-01-12T14:15:00',
    isRead: true,
    isDesigner: true
  },
  {
    id: '4',
    sender: 'You',
    content: 'Thursday works perfectly. See you then!',
    timestamp: '2025-01-12T15:00:00',
    isRead: true,
    isDesigner: false
  },
  {
    id: '5',
    sender: 'AF Designs',
    content: 'Great! I have also uploaded the latest selection boards to Houzz for your review. Please approve the items you like so we can proceed with ordering.',
    timestamp: '2025-01-12T15:30:00',
    isRead: false,
    isDesigner: true
  }
];

// Dashboard Stats
export const dashboardStats = {
  activeProjects: 4,
  pendingActions: 7,
  outstandingBalance: 45000,
  thisMonthRevenue: 84500
};

// Contractor Tasks (for Contractor Portal)
export interface ContractorTask {
  id: string;
  task: string;
  project: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export const mockContractorTasks: ContractorTask[] = [
  { id: '1', task: 'Install kitchen cabinets', project: 'Modern Kitchen Renovation', dueDate: '2025-01-18', status: 'pending', priority: 'high' },
  { id: '2', task: 'Tile backsplash installation', project: 'Modern Kitchen Renovation', dueDate: '2025-01-22', status: 'pending', priority: 'medium' },
  { id: '3', task: 'Paint master bedroom', project: 'Master Suite Redesign', dueDate: '2025-01-15', status: 'in-progress', priority: 'high' },
  { id: '4', task: 'Install bathroom fixtures', project: 'Master Suite Redesign', dueDate: '2025-01-25', status: 'pending', priority: 'medium' },
  { id: '5', task: 'Final walkthrough', project: 'Living Room Update', dueDate: '2025-01-20', status: 'completed', priority: 'low' },
  { id: '6', task: 'Countertop template', project: 'Modern Kitchen Renovation', dueDate: '2025-01-16', status: 'in-progress', priority: 'high' }
];
