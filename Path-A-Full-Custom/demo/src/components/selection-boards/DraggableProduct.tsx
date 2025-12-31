'use client';

import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Product, DragTypes } from '@/types/selection-board';

interface DraggableProductProps {
  product: Product;
  isMobile?: boolean;
  onQuickAdd?: (product: Product) => void;
}

export default function DraggableProduct({ product, isMobile = false, onQuickAdd }: DraggableProductProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.PRODUCT,
    item: { product },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [product]);

  // Only apply drag on non-mobile
  if (!isMobile) {
    drag(ref);
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  return (
    <div
      ref={ref}
      className={`${isMobile ? '' : 'cursor-grab active:cursor-grabbing'} p-3 rounded-lg border border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Mobile layout: horizontal with Add button */}
      {isMobile ? (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <svg class="w-6 h-6 text-gray-300 m-auto mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                `;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {product.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {product.vendor}
            </p>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              {formatCurrency(product.price)}
            </p>
          </div>
          <button
            onClick={handleQuickAdd}
            className="flex-shrink-0 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Add
          </button>
        </div>
      ) : (
        /* Desktop layout: vertical card */
        <>
          <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                `;
              }}
            />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {product.vendor}
          </p>
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1">
            {formatCurrency(product.price)}
          </p>
        </>
      )}
    </div>
  );
}
