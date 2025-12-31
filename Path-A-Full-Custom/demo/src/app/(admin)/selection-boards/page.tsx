'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ClientProjectTree from '@/components/selection-boards/ClientProjectTree';
import NewBoardModal from '@/components/selection-boards/NewBoardModal';
import { SelectionBoard, SelectionBoardGroup } from '@/types/selection-board';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Mock boards data organized by client/project
const mockBoards: SelectionBoard[] = [
  {
    id: 'b1',
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
    id: 'b2',
    name: 'Living Room Furniture',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    roomArea: 'Living Room',
    status: 'pending',
    items: Array(12).fill(null).map((_, i) => ({
      id: `item-lr-${i}`,
      productId: `prod-lr-${i}`,
      position: { x: 20 + (i % 4) * 160, y: 20 + Math.floor(i / 4) * 200 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-lr-${i}`,
        name: `Furniture ${i + 1}`,
        image: `https://picsum.photos/seed/furniture${i}/200/200`,
        price: 800 + i * 100,
        vendor: 'West Elm',
        category: 'Furniture',
      },
    })),
    totalValue: 12400,
    createdAt: '2025-12-20',
    sentAt: '2025-12-22',
  },
  {
    id: 'b3',
    name: 'Master Bath',
    clientId: 'c1',
    projectId: 'p1',
    projectName: 'Riverside Residence',
    clientName: 'Sarah Mitchell',
    roomArea: 'Master Bath',
    status: 'draft',
    items: Array(4).fill(null).map((_, i) => ({
      id: `item-mb-${i}`,
      productId: `prod-mb-${i}`,
      position: { x: 20 + i * 160, y: 20 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-mb-${i}`,
        name: `Bath Fixture ${i + 1}`,
        image: `https://picsum.photos/seed/bath${i}/200/200`,
        price: 500 + i * 200,
        vendor: 'CB2',
        category: 'Fixtures',
      },
    })),
    totalValue: 2800,
    createdAt: '2025-12-28',
  },
  {
    id: 'b4',
    name: 'Main Living Space',
    clientId: 'c2',
    projectId: 'p2',
    projectName: 'Downtown Loft',
    clientName: 'James Wong',
    roomArea: 'Main Living',
    status: 'approved',
    items: Array(15).fill(null).map((_, i) => ({
      id: `item-ml-${i}`,
      productId: `prod-ml-${i}`,
      position: { x: 20 + (i % 5) * 160, y: 20 + Math.floor(i / 5) * 200 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-ml-${i}`,
        name: `Item ${i + 1}`,
        image: `https://picsum.photos/seed/loft${i}/200/200`,
        price: 1500 + i * 200,
        vendor: 'Restoration Hardware',
        category: 'Furniture',
      },
    })),
    totalValue: 28500,
    createdAt: '2025-12-10',
    sentAt: '2025-12-12',
  },
  {
    id: 'b5',
    name: 'Home Office',
    clientId: 'c2',
    projectId: 'p2',
    projectName: 'Downtown Loft',
    clientName: 'James Wong',
    roomArea: 'Office',
    status: 'pending',
    items: Array(6).fill(null).map((_, i) => ({
      id: `item-ho-${i}`,
      productId: `prod-ho-${i}`,
      position: { x: 20 + (i % 3) * 160, y: 20 + Math.floor(i / 3) * 200 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-ho-${i}`,
        name: `Office Item ${i + 1}`,
        image: `https://picsum.photos/seed/office${i}/200/200`,
        price: 600 + i * 150,
        vendor: 'Herman Miller',
        category: 'Office',
      },
    })),
    totalValue: 4200,
    createdAt: '2025-12-22',
    sentAt: '2025-12-24',
  },
  {
    id: 'b6',
    name: 'Family Room',
    clientId: 'c3',
    projectId: 'p3',
    projectName: 'Suburban Remodel',
    clientName: 'The Hendersons',
    roomArea: 'Family Room',
    status: 'draft',
    items: [],
    totalValue: 0,
    createdAt: '2025-12-28',
  },
  {
    id: 'b7',
    name: 'Outdoor Living',
    clientId: 'c4',
    projectId: 'p4',
    projectName: 'Beach House',
    clientName: 'Marcus Chen',
    roomArea: 'Outdoor',
    status: 'pending',
    items: Array(8).fill(null).map((_, i) => ({
      id: `item-ol-${i}`,
      productId: `prod-ol-${i}`,
      position: { x: 20 + (i % 4) * 160, y: 20 + Math.floor(i / 4) * 200 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-ol-${i}`,
        name: `Outdoor Item ${i + 1}`,
        image: `https://picsum.photos/seed/outdoor${i}/200/200`,
        price: 400 + i * 100,
        vendor: 'Pottery Barn',
        category: 'Outdoor',
      },
    })),
    totalValue: 6200,
    createdAt: '2025-12-25',
    sentAt: '2025-12-26',
  },
  {
    id: 'b8',
    name: 'Master Bedroom',
    clientId: 'c4',
    projectId: 'p4',
    projectName: 'Beach House',
    clientName: 'Marcus Chen',
    roomArea: 'Master Bedroom',
    status: 'approved',
    items: Array(10).fill(null).map((_, i) => ({
      id: `item-mb2-${i}`,
      productId: `prod-mb2-${i}`,
      position: { x: 20 + (i % 5) * 160, y: 20 + Math.floor(i / 5) * 200 },
      size: { width: 140, height: 180 },
      product: {
        id: `prod-mb2-${i}`,
        name: `Bedroom Item ${i + 1}`,
        image: `https://picsum.photos/seed/bedroom${i}/200/200`,
        price: 700 + i * 150,
        vendor: 'West Elm',
        category: 'Bedroom',
      },
    })),
    totalValue: 12500,
    createdAt: '2025-12-18',
    sentAt: '2025-12-20',
  },
];

type FilterStatus = 'all' | 'draft' | 'pending' | 'approved' | 'revision_requested';

export default function SelectionBoardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);

  // Filter boards
  const filteredBoards = useMemo(() => {
    return mockBoards.filter((board) => {
      const matchesSearch =
        board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || board.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  // Group boards by client/project
  const groupedBoards = useMemo(() => {
    const groupMap = new Map<string, SelectionBoardGroup>();

    filteredBoards.forEach((board) => {
      const key = `${board.clientId}-${board.projectId}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          clientId: board.clientId,
          clientName: board.clientName,
          projectId: board.projectId,
          projectName: board.projectName,
          boards: [],
        });
      }
      groupMap.get(key)!.boards.push(board);
    });

    return Array.from(groupMap.values());
  }, [filteredBoards]);

  const statusCounts = {
    all: mockBoards.length,
    draft: mockBoards.filter((b) => b.status === 'draft').length,
    pending: mockBoards.filter((b) => b.status === 'pending').length,
    approved: mockBoards.filter((b) => b.status === 'approved').length,
    revision_requested: mockBoards.filter((b) => b.status === 'revision_requested').length,
  };

  const totalBoardCount = filteredBoards.length;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <PageBreadcrumb pageTitle="Selection Boards" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Selection Boards
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Create and manage product selections for your clients
              </p>
            </div>
            <button
              onClick={() => setIsNewBoardModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Board
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search boards, clients, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'draft', 'pending', 'approved', 'revision_requested'] as FilterStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      filterStatus === status
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    {status === 'all'
                      ? 'All'
                      : status === 'revision_requested'
                      ? 'Revision'
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="ml-1.5 text-xs opacity-75">({statusCounts[status]})</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Client/Project Tree */}
          <ClientProjectTree groups={groupedBoards} searchQuery={searchQuery} />

          {/* Results count */}
          {totalBoardCount > 0 && (
            <div className="text-center text-sm text-gray-500">
              Showing {totalBoardCount} of {mockBoards.length} boards
            </div>
          )}

          {/* Empty state for no boards */}
          {totalBoardCount === 0 && !searchQuery && filterStatus === 'all' && (
            <div className="text-center py-12">
              <button
                onClick={() => setIsNewBoardModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Board
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Board Modal */}
      <NewBoardModal
        isOpen={isNewBoardModalOpen}
        onClose={() => setIsNewBoardModalOpen(false)}
      />
    </motion.div>
  );
}
