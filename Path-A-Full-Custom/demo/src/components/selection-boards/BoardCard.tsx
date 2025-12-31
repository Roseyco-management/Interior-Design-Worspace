'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SelectionBoard, statusColors, statusLabels } from '@/types/selection-board';

interface BoardCardProps {
  board: SelectionBoard;
}

export default function BoardCard({ board }: BoardCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/selection-boards/${board.id}`}
        className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all dark:border-gray-800 dark:bg-gray-900"
      >
      {/* Thumbnail / Preview */}
      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        {board.items.length > 0 ? (
          <div className="grid grid-cols-2 gap-1 p-2 h-full">
            {board.items.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
            {board.items.length < 4 &&
              Array.from({ length: 4 - board.items.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-gray-300 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12 mb-2"
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
            <span className="text-sm">No items yet</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[board.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              board.status === 'approved' ? 'bg-green-500' :
              board.status === 'pending' ? 'bg-yellow-500' :
              board.status === 'revision_requested' ? 'bg-red-500' :
              'bg-gray-400'
            }`} />
            {statusLabels[board.status]}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors mb-1">
          {board.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {board.projectName}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            {board.clientName}
          </span>
          <span className="text-gray-400">
            {board.items.length} {board.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {board.totalValue > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatCurrency(board.totalValue)}
            </p>
          </div>
        )}
      </div>
      </Link>
    </motion.div>
  );
}
