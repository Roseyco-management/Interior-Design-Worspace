'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ClientBoardCard from '@/components/client-portal/ClientBoardCard';
import { SelectionBoard } from '@/types/selection-board';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Mock boards data (same as admin but filtered for client view)
const mockBoards: SelectionBoard[] = [
  {
    id: '1',
    name: 'Kitchen Lighting',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    status: 'approved',
    items: [
      {
        id: 'item1',
        productId: 'prod1',
        position: { x: 20, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod1',
          name: 'Sputnik Chandelier',
          image: 'https://picsum.photos/seed/chandelier/200/200',
          price: 890,
          vendor: 'West Elm',
          category: 'Lighting',
        },
      },
      {
        id: 'item2',
        productId: 'prod2',
        position: { x: 180, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod2',
          name: 'Brass Pendant',
          image: 'https://picsum.photos/seed/pendant/200/200',
          price: 450,
          vendor: 'CB2',
          category: 'Lighting',
        },
      },
    ],
    totalValue: 1650,
    createdAt: '2025-12-15',
    sentAt: '2025-12-18',
  },
  {
    id: '2',
    name: 'Living Room Furniture',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    status: 'pending',
    items: [
      {
        id: 'item3',
        productId: 'prod3',
        position: { x: 20, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod3',
          name: 'Cloud Sofa',
          image: 'https://picsum.photos/seed/sofa/200/200',
          price: 4500,
          vendor: 'Restoration Hardware',
          category: 'Seating',
        },
      },
      {
        id: 'item4',
        productId: 'prod4',
        position: { x: 180, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod4',
          name: 'Marble Coffee Table',
          image: 'https://picsum.photos/seed/table/200/200',
          price: 2200,
          vendor: 'CB2',
          category: 'Tables',
        },
      },
      {
        id: 'item5',
        productId: 'prod5',
        position: { x: 340, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod5',
          name: 'Floor Lamp',
          image: 'https://picsum.photos/seed/lamp/200/200',
          price: 650,
          vendor: 'West Elm',
          category: 'Lighting',
        },
      },
      {
        id: 'item6',
        productId: 'prod6',
        position: { x: 20, y: 220 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod6',
          name: 'Area Rug',
          image: 'https://picsum.photos/seed/rug/200/200',
          price: 1800,
          vendor: 'Loloi',
          category: 'Rugs',
        },
      },
      {
        id: 'item7',
        productId: 'prod7',
        position: { x: 180, y: 220 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod7',
          name: 'Accent Chair',
          image: 'https://picsum.photos/seed/chair/200/200',
          price: 1250,
          vendor: 'Article',
          category: 'Seating',
        },
      },
      {
        id: 'item8',
        productId: 'prod8',
        position: { x: 340, y: 220 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod8',
          name: 'Side Table',
          image: 'https://picsum.photos/seed/sidetable/200/200',
          price: 380,
          vendor: 'West Elm',
          category: 'Tables',
        },
      },
      {
        id: 'item9',
        productId: 'prod9',
        position: { x: 500, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod9',
          name: 'Throw Pillows (Set)',
          image: 'https://picsum.photos/seed/pillows/200/200',
          price: 220,
          vendor: 'Pottery Barn',
          category: 'Accessories',
        },
      },
      {
        id: 'item10',
        productId: 'prod10',
        position: { x: 500, y: 220 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod10',
          name: 'Wall Art',
          image: 'https://picsum.photos/seed/art/200/200',
          price: 400,
          vendor: 'Minted',
          category: 'Art',
        },
      },
    ],
    totalValue: 12400,
    createdAt: '2025-12-20',
    sentAt: '2025-12-22',
  },
  {
    id: '6',
    name: 'Bedroom Essentials',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    status: 'pending',
    items: [
      {
        id: 'item11',
        productId: 'prod11',
        position: { x: 20, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod11',
          name: 'Upholstered Bed Frame',
          image: 'https://picsum.photos/seed/bed/200/200',
          price: 2400,
          vendor: 'Crate & Barrel',
          category: 'Bedroom',
        },
      },
      {
        id: 'item12',
        productId: 'prod12',
        position: { x: 180, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod12',
          name: 'Nightstand Pair',
          image: 'https://picsum.photos/seed/nightstand/200/200',
          price: 890,
          vendor: 'West Elm',
          category: 'Bedroom',
        },
      },
      {
        id: 'item13',
        productId: 'prod13',
        position: { x: 340, y: 20 },
        size: { width: 140, height: 180 },
        product: {
          id: 'prod13',
          name: 'Table Lamps (Pair)',
          image: 'https://picsum.photos/seed/tablelamp/200/200',
          price: 320,
          vendor: 'CB2',
          category: 'Lighting',
        },
      },
    ],
    totalValue: 3610,
    createdAt: '2025-12-24',
    sentAt: '2025-12-26',
  },
];

// Filter boards for client view (only pending and approved, not drafts)
// In a real app, this would filter by the logged-in client
const clientBoards = mockBoards.filter(
  (board) => board.status !== 'draft' && board.clientName === 'Sarah Mitchell'
);

type FilterStatus = 'all' | 'pending' | 'approved';

export default function SelectionsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredBoards = clientBoards.filter((board) => {
    if (filterStatus === 'all') return true;
    return board.status === filterStatus;
  });

  const pendingCount = clientBoards.filter((b) => b.status === 'pending').length;
  const approvedCount = clientBoards.filter((b) => b.status === 'approved').length;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Selection Boards</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your designer has sent you selection boards to review.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium dark:bg-amber-900/30 dark:text-amber-400">
              {pendingCount} pending review
            </span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filterStatus === 'all'
              ? 'bg-emerald-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Boards ({clientBoards.length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filterStatus === 'pending'
              ? 'bg-emerald-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilterStatus('approved')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filterStatus === 'approved'
              ? 'bg-emerald-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Approved ({approvedCount})
        </button>
      </div>

      {/* Boards Grid */}
      {filteredBoards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBoards.map((board) => (
            <ClientBoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No boards found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filterStatus === 'pending'
              ? 'No boards pending your review.'
              : filterStatus === 'approved'
              ? 'No approved boards yet.'
              : 'Your designer hasn\'t sent any selection boards yet.'}
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 dark:bg-emerald-900/50 dark:text-emerald-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-emerald-900 dark:text-emerald-300">
              How selection boards work
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
              Your designer curates products for each room or area of your project. Review each board,
              and either approve the selections or request changes with your feedback. Once approved,
              your designer will proceed with ordering.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
