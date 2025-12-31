'use client';

import { SelectionBoard, BoardItem } from '@/types/selection-board';
import ReadOnlyCanvas from './ReadOnlyCanvas';

interface ClientBoardViewProps {
  board: SelectionBoard;
}

export default function ClientBoardView({ board }: ClientBoardViewProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      {/* Canvas View - Shows items as designer arranged them */}
      {board.items.length > 0 ? (
        <>
          {/* Canvas */}
          <div className="p-4 md:p-6">
            <ReadOnlyCanvas items={board.items} />
          </div>

          {/* Items List - Reference list with names and prices */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-4 md:p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Items in this Selection Board
              </h3>
              <div className="space-y-3">
                {board.items.map((item: BoardItem) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-700/50 dark:hover:bg-gray-700"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-gray-200 dark:bg-gray-600 dark:border-gray-500">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          const placeholder = document.createElement('div');
                          placeholder.className = 'text-gray-300 dark:text-gray-500';
                          placeholder.innerHTML = `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
                          target.parentElement!.appendChild(placeholder);
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.product.vendor} • {item.product.category}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right">
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Board Summary */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">
                  {board.items.length} {board.items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Board Total</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(board.totalValue)}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-12 text-center">
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
            No items in this board
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your designer hasn&apos;t added any items yet.
          </p>
        </div>
      )}
    </div>
  );
}
