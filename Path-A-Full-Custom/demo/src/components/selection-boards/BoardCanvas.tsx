'use client';

import { useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { BoardItem as BoardItemType, Product, DragTypes } from '@/types/selection-board';
import BoardItem from './BoardItem';

interface BoardCanvasProps {
  items: BoardItemType[];
  onDrop: (product: Product, position: { x: number; y: number }) => void;
  onMove: (itemId: string, position: { x: number; y: number }) => void;
  onRemove: (itemId: string) => void;
}

export default function BoardCanvas({ items, onDrop, onMove, onRemove }: BoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [DragTypes.PRODUCT, DragTypes.BOARD_ITEM],
    drop: (item: { product?: Product; id?: string; type?: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (offset && canvasRect) {
        const x = Math.max(0, offset.x - canvasRect.left - 60); // Offset to center
        const y = Math.max(0, offset.y - canvasRect.top - 60);

        if (item.product) {
          // New product dropped from sidebar
          onDrop(item.product, { x, y });
        } else if (item.id && item.type === DragTypes.BOARD_ITEM) {
          // Existing item moved within canvas
          onMove(item.id, { x, y });
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [onDrop, onMove]);

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      canvasRef.current = node;
      drop(node);
    },
    [drop]
  );

  const isActive = isOver && canDrop;

  return (
    <div
      ref={setRefs}
      className={`relative min-h-[500px] lg:min-h-[600px] rounded-xl border transition-colors ${
        isActive
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
          : canDrop
          ? 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
      }`}
    >
      {items.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          <p className="text-lg font-medium mb-1">Drag products here</p>
          <p className="text-sm">Select products from the sidebar and drag them onto the canvas</p>
        </div>
      )}

      {items.map((item) => (
        <BoardItem
          key={item.id}
          item={item}
          onRemove={onRemove}
        />
      ))}

      {/* Drop indicator overlay */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-500/10 rounded-xl pointer-events-none">
          <div className="bg-brand-500 text-white px-4 py-2 rounded-lg font-medium">
            Drop to add
          </div>
        </div>
      )}
    </div>
  );
}
