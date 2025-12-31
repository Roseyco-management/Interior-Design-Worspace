'use client';

import { BoardItem } from '@/types/selection-board';

interface ReadOnlyCanvasProps {
  items: BoardItem[];
  compact?: boolean;
}

export default function ReadOnlyCanvas({ items, compact = false }: ReadOnlyCanvasProps) {
  // Calculate canvas dimensions based on items
  const calculateCanvasDimensions = () => {
    if (items.length === 0) {
      return { width: 700, height: 400 };
    }

    let maxX = 0;
    let maxY = 0;

    items.forEach(item => {
      const right = item.position.x + item.size.width;
      const bottom = item.position.y + item.size.height;
      if (right > maxX) maxX = right;
      if (bottom > maxY) maxY = bottom;
    });

    // Add padding
    return {
      width: Math.max(700, maxX + 40),
      height: Math.max(400, maxY + 40)
    };
  };

  const dimensions = calculateCanvasDimensions();
  const canvasHeight = compact ? 'h-[300px]' : 'h-[400px] lg:h-[500px]';

  return (
    <div
      className={`relative ${canvasHeight} bg-white rounded-xl border border-gray-200 overflow-auto dark:bg-gray-800 dark:border-gray-700`}
    >
      {/* Canvas Content */}
      <div
        className="relative min-w-full"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          minHeight: '100%'
        }}
      >
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #374151 1px, transparent 1px),
              linear-gradient(to bottom, #374151 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {items.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
            <svg
              className="w-12 h-12 mb-3"
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
            <p className="text-sm">No items in this board</p>
          </div>
        )}

        {/* Render Items at Their Saved Positions */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute group"
            style={{
              left: item.position.x,
              top: item.position.y,
              width: item.size.width,
            }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-shadow hover:shadow-lg dark:bg-gray-700 dark:border-gray-600">
              {/* Product Image */}
              <div
                className="w-full bg-gray-100 dark:bg-gray-600 overflow-hidden"
                style={{ height: item.size.height }}
              >
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
                    placeholder.innerHTML = `<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
                    target.parentElement!.appendChild(placeholder);
                  }}
                />
              </div>

              {/* Hover Info Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 dark:bg-gray-600">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-gray-300">{item.product.vendor}</p>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
