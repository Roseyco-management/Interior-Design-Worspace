'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectionBoardGroup, statusColors, statusLabels } from '@/types/selection-board';

interface ClientProjectTreeProps {
  groups: SelectionBoardGroup[];
  searchQuery?: string;
}

export default function ClientProjectTree({ groups, searchQuery = '' }: ClientProjectTreeProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // When searching, auto-expand all groups
  const isExpanded = (groupKey: string) => {
    if (searchQuery) return true;
    return expandedGroups.has(groupKey);
  };

  if (groups.length === 0) {
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No boards found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {searchQuery ? 'Try adjusting your search or filters' : 'Create your first selection board to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {groups.map((group) => {
        const groupKey = `${group.clientId}-${group.projectId}`;
        const expanded = isExpanded(groupKey);

        return (
          <div
            key={groupKey}
            className="border border-gray-200 rounded-xl overflow-hidden dark:border-gray-800"
          >
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(groupKey)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <motion.svg
                  animate={{ rotate: expanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {group.clientName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {group.projectName}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {group.boards.length} {group.boards.length === 1 ? 'board' : 'boards'}
              </span>
            </button>

            {/* Boards List */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 dark:border-gray-800">
                    {group.boards.map((board, index) => (
                      <Link
                        key={board.id}
                        href={`/selection-boards/${board.id}`}
                        className={`flex items-center justify-between p-4 pl-12 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800 ${
                          index < group.boards.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Tree connector */}
                          <div className="relative">
                            <div className="absolute -left-6 top-1/2 w-4 border-t border-gray-300 dark:border-gray-700" />
                            {index < group.boards.length - 1 && (
                              <div className="absolute -left-6 top-1/2 h-full border-l border-gray-300 dark:border-gray-700" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {board.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {board.items.length} {board.items.length === 1 ? 'item' : 'items'}
                              {board.totalValue > 0 && ` • ${formatCurrency(board.totalValue)}`}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[board.status]}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              board.status === 'approved'
                                ? 'bg-green-500'
                                : board.status === 'pending'
                                ? 'bg-yellow-500'
                                : board.status === 'revision_requested'
                                ? 'bg-red-500'
                                : 'bg-gray-400'
                            }`}
                          />
                          {statusLabels[board.status]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
