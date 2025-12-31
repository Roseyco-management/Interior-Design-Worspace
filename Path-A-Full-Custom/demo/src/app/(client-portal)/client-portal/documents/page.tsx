'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'contract';
  category: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const documents: Document[] = [
    { id: '1', name: 'Design Agreement.pdf', type: 'contract', category: 'Contracts', size: '2.4 MB', uploadedAt: '2024-01-15', uploadedBy: 'Amanda Foster' },
    { id: '2', name: 'Kitchen Floor Plan.pdf', type: 'pdf', category: 'Drawings', size: '5.1 MB', uploadedAt: '2024-01-28', uploadedBy: 'Amanda Foster' },
    { id: '3', name: '3D Rendering - View 1.jpg', type: 'image', category: 'Renderings', size: '3.8 MB', uploadedAt: '2024-01-30', uploadedBy: 'Amanda Foster' },
    { id: '4', name: '3D Rendering - View 2.jpg', type: 'image', category: 'Renderings', size: '4.2 MB', uploadedAt: '2024-01-30', uploadedBy: 'Amanda Foster' },
    { id: '5', name: 'Material Specifications.pdf', type: 'pdf', category: 'Specifications', size: '1.8 MB', uploadedAt: '2024-02-05', uploadedBy: 'Amanda Foster' },
    { id: '6', name: 'Lighting Plan.pdf', type: 'pdf', category: 'Drawings', size: '2.2 MB', uploadedAt: '2024-02-08', uploadedBy: 'Amanda Foster' },
    { id: '7', name: 'Change Order #1.pdf', type: 'contract', category: 'Contracts', size: '890 KB', uploadedAt: '2024-02-10', uploadedBy: 'Michael Chen' },
  ];

  const categories = ['All', 'Contracts', 'Drawings', 'Renderings', 'Specifications'];

  const filteredDocuments = activeCategory === 'All'
    ? documents
    : documents.filter(doc => doc.category === activeCategory);

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13.5c0 .55-.45 1-1 1H7v1.5H5.5v-4h2c.55 0 1 .45 1 1v.5zm5-.5c0 1.1-.9 2-2 2h-1v1.5H9v-5h2.5c.83 0 1.5.67 1.5 1.5zm4.5 0c0 .55-.45 1-1 1h-1v.5h1v1h-1v1.5h-1.5v-5h2.5c.55 0 1 .45 1 1z"/>
          </svg>
        );
      case 'image':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'contract':
        return (
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-500">Access your project files and contracts</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center dark:bg-gray-700">
                {getIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{doc.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{doc.size}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs dark:bg-gray-700 dark:text-gray-400">
                    {doc.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(doc.uploadedAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-400">by {doc.uploadedBy}</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-500">No documents in this category yet.</p>
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{documents.length} Documents</p>
              <p className="text-sm text-gray-500">All your project files in one place</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
