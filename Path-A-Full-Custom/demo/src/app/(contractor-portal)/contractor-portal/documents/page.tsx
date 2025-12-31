'use client';

import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'form';
  category: string;
  project?: string;
  size: string;
  date: string;
}

export default function ContractorDocumentsPage() {
  const documents: Document[] = [
    { id: '1', name: 'Contractor Agreement 2024.pdf', type: 'form', category: 'Contracts', size: '1.2 MB', date: '2024-01-01' },
    { id: '2', name: 'W-9 Form.pdf', type: 'form', category: 'Tax Forms', size: '450 KB', date: '2024-01-01' },
    { id: '3', name: 'Insurance Certificate.pdf', type: 'pdf', category: 'Compliance', size: '2.1 MB', date: '2024-01-15' },
    { id: '4', name: 'Kitchen Floor Plan - Davidson.pdf', type: 'pdf', category: 'Plans', project: 'Davidson Kitchen', size: '3.8 MB', date: '2024-02-01' },
    { id: '5', name: 'Cabinet Specifications.pdf', type: 'pdf', category: 'Specifications', project: 'Davidson Kitchen', size: '1.5 MB', date: '2024-02-05' },
    { id: '6', name: 'Safety Guidelines.pdf', type: 'pdf', category: 'Compliance', size: '890 KB', date: '2024-01-01' },
  ];

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13.5c0 .55-.45 1-1 1H7v1.5H5.5v-4h2c.55 0 1 .45 1 1v.5zm5-.5c0 1.1-.9 2-2 2h-1v1.5H9v-5h2.5c.83 0 1.5.67 1.5 1.5zm4.5 0c0 .55-.45 1-1 1h-1v.5h1v1h-1v1.5h-1.5v-5h2.5c.55 0 1 .45 1 1z"/>
          </svg>
        );
      case 'form':
        return (
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
        <p className="text-gray-500">Access project files and compliance documents</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Contracts</p>
              <p className="text-sm text-gray-500">2 documents</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Project Plans</p>
              <p className="text-sm text-gray-500">2 documents</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Compliance</p>
              <p className="text-sm text-gray-500">2 documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Documents */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">All Documents</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center dark:bg-gray-700">
                  {getIcon(doc.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{doc.category}</span>
                    {doc.project && (
                      <>
                        <span>•</span>
                        <span className="text-amber-600">{doc.project}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{formatDate(doc.date)}</span>
                <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-300">Need to update your documents?</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              Contact the project manager if you need to upload updated insurance certificates or other compliance documents.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
