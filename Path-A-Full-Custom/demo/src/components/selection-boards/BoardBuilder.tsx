'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SelectionBoard, BoardItem, Product, statusColors, statusLabels } from '@/types/selection-board';
import BoardCanvas from './BoardCanvas';
import BoardComments from './BoardComments';
import ProductSidebar from './ProductSidebar';

interface BoardBuilderProps {
  board: SelectionBoard;
  products: Product[];
}

export default function BoardBuilder({ board: initialBoard, products }: BoardBuilderProps) {
  const [board, setBoard] = useState<SelectionBoard>(initialBoard);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Calculate total
  const totalValue = board.items.reduce((sum, item) => sum + item.product.price, 0);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show toast notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Handle dropping a new product onto canvas
  const handleDrop = useCallback((product: Product, position: { x: number; y: number }) => {
    const newItem: BoardItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      position,
      size: { width: 140, height: 'auto' as unknown as number },
      product,
    };

    setBoard((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }, []);

  // Handle quick-add from mobile (places item at default position)
  const handleQuickAdd = useCallback((product: Product) => {
    // Calculate a default position - stagger items to avoid overlap
    const itemCount = board.items.length;
    const row = Math.floor(itemCount / 4);
    const col = itemCount % 4;
    const position = {
      x: 40 + col * 160,
      y: 40 + row * 200,
    };

    const newItem: BoardItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      position,
      size: { width: 140, height: 'auto' as unknown as number },
      product,
    };

    setBoard((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    showNotification(`${product.name} added to board`, 'success');
  }, [board.items.length]);

  // Handle moving an existing item
  const handleMove = useCallback((itemId: string, position: { x: number; y: number }) => {
    setBoard((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, position } : item
      ),
    }));
  }, []);

  // Handle removing an item
  const handleRemove = useCallback((itemId: string) => {
    setBoard((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  }, []);

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    showNotification('Board saved successfully!', 'success');
  };

  // Handle send to client
  const handleSendToClient = async () => {
    setIsSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBoard((prev) => ({
      ...prev,
      status: 'pending',
      sentAt: new Date().toISOString().split('T')[0],
    }));
    setIsSending(false);
    showNotification('Board sent to client!', 'success');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/selection-boards"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-800"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {board.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {board.projectName} &bull; {board.clientName}
              </p>
            </div>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[board.status]}`}>
              {statusLabels[board.status]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </button>
            <button
              onClick={handleSendToClient}
              disabled={isSending || board.items.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send to Client
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop only notice */}
        <div className="lg:hidden p-4 bg-amber-50 border border-amber-200 rounded-xl dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              For the best experience, use a desktop or larger screen for the board builder.
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Canvas */}
          <div>
            <BoardCanvas
              items={board.items}
              onDrop={handleDrop}
              onMove={handleMove}
              onRemove={handleRemove}
            />

            {/* Board Summary */}
            <div className="mt-4 flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {board.items.length} {board.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Board Total</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
              <BoardComments boardId={board.id} comments={[]} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:h-[calc(100vh-240px)] lg:sticky lg:top-24">
            <ProductSidebar products={products} onQuickAdd={handleQuickAdd} />
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
              showToast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {showToast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {showToast.message}
          </div>
        )}
      </div>
    </DndProvider>
  );
}
