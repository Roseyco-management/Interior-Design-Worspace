// Selection Board Types for Drag-and-Drop Builder

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  vendor: string;
  category: string;
}

export interface BoardItem {
  id: string;
  productId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  product: Product;
}

export interface SelectionBoard {
  id: string;
  name: string;
  clientId: string;
  projectId: string;
  projectName: string;
  clientName: string;
  roomArea?: string;
  status: 'draft' | 'pending' | 'approved' | 'revision_requested';
  items: BoardItem[];
  totalValue: number;
  createdAt: string;
  sentAt?: string;
}

// Grouped boards by client/project
export interface SelectionBoardGroup {
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  boards: SelectionBoard[];
}

// Comment structure for board discussions
export interface BoardComment {
  id: string;
  boardId: string;
  author: {
    name: string;
    role: 'designer' | 'client';
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

// Client data for dropdowns
export interface Client {
  id: string;
  name: string;
}

// Project data for dropdowns
export interface Project {
  id: string;
  name: string;
  clientId: string;
}

// Status styling helpers
export const statusColors: Record<SelectionBoard['status'], string> = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  revision_requested: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

export const statusLabels: Record<SelectionBoard['status'], string> = {
  draft: 'Draft',
  pending: 'Pending Approval',
  approved: 'Approved',
  revision_requested: 'Revision Requested'
};

// Drag types for react-dnd
export const DragTypes = {
  PRODUCT: 'PRODUCT',
  BOARD_ITEM: 'BOARD_ITEM'
} as const;
