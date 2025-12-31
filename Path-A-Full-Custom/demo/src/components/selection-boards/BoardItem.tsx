'use client';

import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { BoardItem as BoardItemType, DragTypes } from '@/types/selection-board';

interface BoardItemProps {
  item: BoardItemType;
  onRemove: (id: string) => void;
}

export default function BoardItem({ item, onRemove }: BoardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.BOARD_ITEM,
    item: { id: item.id, type: DragTypes.BOARD_ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item.id]);

  drag(ref);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: item.position.x,
        top: item.position.y,
        width: item.size.width,
      }}
      className={`rounded-lg shadow-md cursor-move group hover:shadow-xl transition-all dark:shadow-gray-900/50 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item.id);
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
        title="Remove item"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Product Image Only */}
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div class="w-full h-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            `;
          }}
        />
      </div>

      {/* Hover Tooltip with Name and Price */}
      {showTooltip && !isDragging && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full z-20 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="font-medium">{item.product.name}</p>
            <p className="text-brand-300">{formatCurrency(item.product.price)}</p>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
