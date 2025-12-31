'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import BoardBuilder from '@/components/selection-boards/BoardBuilder';
import { SelectionBoard, Product } from '@/types/selection-board';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Mock products for the sidebar
const mockProducts: Product[] = [
  // Seating
  {
    id: 'prod1',
    name: 'Cloud Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    price: 4500,
    vendor: 'Restoration Hardware',
    category: 'Seating',
  },
  {
    id: 'prod4',
    name: 'Leather Accent Chair',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    price: 650,
    vendor: 'West Elm',
    category: 'Seating',
  },
  // Lighting
  {
    id: 'prod2',
    name: 'Sputnik Chandelier',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    price: 890,
    vendor: 'West Elm',
    category: 'Lighting',
  },
  {
    id: 'prod5',
    name: 'Brass Floor Lamp',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    price: 450,
    vendor: 'Pottery Barn',
    category: 'Lighting',
  },
  {
    id: 'prod9',
    name: 'Modern Pendant Light',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    price: 380,
    vendor: 'West Elm',
    category: 'Lighting',
  },
  {
    id: 'prod12',
    name: 'Wall Sconce Pair',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    price: 420,
    vendor: 'Rejuvenation',
    category: 'Lighting',
  },
  // Tables
  {
    id: 'prod3',
    name: 'Marble Dining Table',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop',
    price: 2200,
    vendor: 'CB2',
    category: 'Tables',
  },
  {
    id: 'prod11',
    name: 'Coffee Table',
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&h=400&fit=crop',
    price: 890,
    vendor: 'Pottery Barn',
    category: 'Tables',
  },
  // Rugs
  {
    id: 'prod6',
    name: 'Wool Area Rug 8x10',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    price: 1200,
    vendor: 'Restoration Hardware',
    category: 'Rugs',
  },
  // Decor
  {
    id: 'prod7',
    name: 'Ceramic Vase Set',
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
    price: 180,
    vendor: 'CB2',
    category: 'Decor',
  },
  {
    id: 'prod10',
    name: 'Velvet Throw Pillows',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
    price: 95,
    vendor: 'CB2',
    category: 'Decor',
  },
  {
    id: 'prod13',
    name: 'Wall Art',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    price: 450,
    vendor: 'Minted',
    category: 'Decor',
  },
  {
    id: 'prod14',
    name: 'Oversized Wall Mirror',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
    price: 498,
    vendor: 'Anthropologie',
    category: 'Decor',
  },
  // Window
  {
    id: 'prod8',
    name: 'Linen Curtains',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
    price: 320,
    vendor: 'Pottery Barn',
    category: 'Window',
  },
  // Textiles
  {
    id: 'prod15',
    name: 'Cashmere Throw Blanket',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    price: 298,
    vendor: 'Nordstrom',
    category: 'Textiles',
  },
];

// Mock boards data
const mockBoards: Record<string, SelectionBoard> = {
  '1': {
    id: '1',
    name: 'Kitchen Lighting',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    roomArea: 'Kitchen',
    status: 'approved',
    items: [
      {
        id: 'item1',
        productId: 'prod2',
        position: { x: 40, y: 40 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod2',
          name: 'Sputnik Chandelier',
          image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
          price: 890,
          vendor: 'West Elm',
          category: 'Lighting',
        },
      },
      {
        id: 'item2',
        productId: 'prod9',
        position: { x: 200, y: 60 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod9',
          name: 'Modern Pendant Light',
          image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
          price: 380,
          vendor: 'West Elm',
          category: 'Lighting',
        },
      },
      {
        id: 'item3',
        productId: 'prod12',
        position: { x: 360, y: 80 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod12',
          name: 'Wall Sconce Pair',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
          price: 420,
          vendor: 'Rejuvenation',
          category: 'Lighting',
        },
      },
    ],
    totalValue: 1690,
    createdAt: '2025-12-15',
    sentAt: '2025-12-18',
  },
  '2': {
    id: '2',
    name: 'Living Room Furniture',
    clientId: 'c2',
    projectId: 'p2',
    projectName: 'Downtown Loft',
    clientName: 'James Wong',
    roomArea: 'Living Room',
    status: 'pending',
    items: [
      {
        id: 'item4',
        productId: 'prod1',
        position: { x: 50, y: 50 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod1',
          name: 'Cloud Sofa',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
          price: 4500,
          vendor: 'Restoration Hardware',
          category: 'Seating',
        },
      },
      {
        id: 'item5',
        productId: 'prod4',
        position: { x: 220, y: 80 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod4',
          name: 'Leather Accent Chair',
          image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
          price: 650,
          vendor: 'West Elm',
          category: 'Seating',
        },
      },
    ],
    totalValue: 5150,
    createdAt: '2025-12-20',
    sentAt: '2025-12-22',
  },
  '3': {
    id: '3',
    name: 'Master Bath Fixtures',
    clientId: 'c3',
    projectId: 'p3',
    projectName: 'Suburban Remodel',
    clientName: 'The Hendersons',
    roomArea: 'Master Bath',
    status: 'draft',
    items: [],
    totalValue: 0,
    createdAt: '2025-12-28',
  },
  '4': {
    id: '4',
    name: 'Dining Room',
    clientId: 'c4',
    projectId: 'p4',
    projectName: 'Beach House',
    clientName: 'Marcus Chen',
    roomArea: 'Dining Room',
    status: 'pending',
    items: [],
    totalValue: 0,
    createdAt: '2025-12-26',
    sentAt: '2025-12-28',
  },
  new: {
    id: 'new',
    name: 'New Selection Board',
    clientId: '',
    projectId: '',
    projectName: 'Select Project',
    clientName: 'Select Client',
    status: 'draft',
    items: [],
    totalValue: 0,
    createdAt: new Date().toISOString().split('T')[0],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SelectionBoardBuilderPage({ params }: PageProps) {
  const { id } = use(params);
  const board = mockBoards[id] || mockBoards['new'];

  return (
    <motion.div
      className="min-h-[calc(100vh-100px)]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <BoardBuilder board={board} products={mockProducts} />
    </motion.div>
  );
}
