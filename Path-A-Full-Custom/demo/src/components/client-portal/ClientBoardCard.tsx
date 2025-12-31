'use client';

import Link from 'next/link';
import { SelectionBoard } from '@/types/selection-board';

interface ClientBoardCardProps {
  board: SelectionBoard;
}

export default function ClientBoardCard({ board }: ClientBoardCardProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isPending = board.status === 'pending';
  const isApproved = board.status === 'approved';
  const isRevisionRequested = board.status === 'revision_requested';

  // Calculate mini canvas scale to fit preview
  const calculateMiniCanvasScale = () => {
    if (board.items.length === 0) return 1;

    let maxX = 0;
    let maxY = 0;

    board.items.forEach(item => {
      const right = item.position.x + item.size.width;
      const bottom = item.position.y + item.size.height;
      if (right > maxX) maxX = right;
      if (bottom > maxY) maxY = bottom;
    });

    // Target preview size
    const previewWidth = 320;
    const previewHeight = 180;

    const scaleX = previewWidth / (maxX + 20);
    const scaleY = previewHeight / (maxY + 20);

    return Math.min(scaleX, scaleY, 0.5); // Cap at 0.5 scale
  };

  const miniScale = calculateMiniCanvasScale();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700 group">
      {/* Mini Canvas Preview */}
      <div className="aspect-[16/9] bg-gray-50 dark:bg-gray-700/50 relative overflow-hidden">
        {board.items.length > 0 ? (
          <div className="absolute inset-0 p-3">
            {/* Mini Canvas Container */}
            <div
              className="relative w-full h-full bg-white rounded-lg overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-600"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            >
              {/* Render mini items */}
              {board.items.map((item) => (
                <div
                  key={item.id}
                  className="absolute rounded shadow-sm overflow-hidden border border-gray-100 dark:border-gray-600"
                  style={{
                    left: item.position.x * miniScale + 8,
                    top: item.position.y * miniScale + 8,
                    width: item.size.width * miniScale,
                    height: item.size.height * miniScale,
                  }}
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
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {isApproved && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shadow-sm dark:bg-green-900/30 dark:text-green-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Approved
            </span>
          )}
          {isPending && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 shadow-sm dark:bg-amber-900/30 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Review
            </span>
          )}
          {isRevisionRequested && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 shadow-sm dark:bg-red-900/30 dark:text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Revision Requested
            </span>
          )}
        </div>

        {/* Items count badge */}
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm dark:bg-gray-800/90 dark:text-gray-300">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {board.items.length} {board.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{board.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sent: {formatDate(board.sentAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Value</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(board.totalValue)}
            </p>
          </div>
          <Link
            href={`/client-portal/selections/${board.id}`}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isPending
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {isPending ? 'Review & Respond' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
