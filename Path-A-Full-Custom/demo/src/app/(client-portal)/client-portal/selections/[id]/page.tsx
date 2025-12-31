'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ClientBoardView from '@/components/client-portal/ClientBoardView';
import BoardApprovalForm from '@/components/client-portal/BoardApprovalForm';
import { SelectionBoard } from '@/types/selection-board';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Mock boards data (same as parent page)
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

export default function BoardDetailPage() {
  const params = useParams();
  const boardId = params.id as string;

  const [board, setBoard] = useState<SelectionBoard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching board data
    const foundBoard = mockBoards.find((b) => b.id === boardId);
    setBoard(foundBoard || null);
    setIsLoading(false);
  }, [boardId]);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleApprove = (feedback: string) => {
    console.log('Approving board:', boardId, 'Feedback:', feedback);
    // In a real app, this would call an API
    if (board) {
      setBoard({ ...board, status: 'approved' });
    }
  };

  const handleRequestChanges = (feedback: string) => {
    console.log('Requesting changes for board:', boardId, 'Feedback:', feedback);
    // In a real app, this would call an API
    if (board) {
      setBoard({ ...board, status: 'revision_requested' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="text-center py-12">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Board Not Found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          The selection board you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/client-portal/selections"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Boards
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Link */}
      <Link
        href="/client-portal/selections"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-400 dark:hover:text-emerald-400"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Boards
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{board.name}</h1>
              {board.status === 'approved' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approved
                </span>
              )}
              {board.status === 'pending' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Pending Review
                </span>
              )}
              {board.status === 'revision_requested' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Revision Requested
                </span>
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              From: <span className="font-medium text-gray-700 dark:text-gray-300">Angie (AF Designs)</span>
              {board.sentAt && <span className="mx-2">|</span>}
              {board.sentAt && <span>Sent: {formatDate(board.sentAt)}</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Board View */}
      <ClientBoardView board={board} />

      {/* Approval Form */}
      <BoardApprovalForm
        boardId={board.id}
        boardStatus={board.status}
        onApprove={handleApprove}
        onRequestChanges={handleRequestChanges}
      />
    </motion.div>
  );
}
