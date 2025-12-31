'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Client, Project } from '@/types/selection-board';

interface NewBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for clients and projects
const mockClients: Client[] = [
  { id: 'c1', name: 'Sarah Mitchell' },
  { id: 'c2', name: 'James Wong' },
  { id: 'c3', name: 'The Hendersons' },
  { id: 'c4', name: 'Marcus Chen' },
  { id: 'c5', name: 'Patricia Miller' },
];

const mockProjects: Project[] = [
  { id: 'p1', name: 'Riverside Residence', clientId: 'c1' },
  { id: 'p2', name: 'Downtown Loft', clientId: 'c2' },
  { id: 'p3', name: 'Suburban Remodel', clientId: 'c3' },
  { id: 'p4', name: 'Beach House', clientId: 'c4' },
  { id: 'p5', name: 'Executive Suite', clientId: 'c5' },
  { id: 'p6', name: 'Riverside Guest House', clientId: 'c1' },
];

export default function NewBoardModal({ isOpen, onClose }: NewBoardModalProps) {
  const router = useRouter();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [boardName, setBoardName] = useState('');
  const [roomArea, setRoomArea] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Filter projects by selected client
  const filteredProjects = mockProjects.filter(
    (project) => project.clientId === selectedClientId
  );

  // Reset project selection when client changes
  useEffect(() => {
    setSelectedProjectId('');
  }, [selectedClientId]);

  const handleCreate = async () => {
    if (!selectedClientId || !selectedProjectId || !boardName.trim()) return;

    setIsCreating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, we would create the board and get the ID back
    const newBoardId = `new-${Date.now()}`;

    setIsCreating(false);
    onClose();

    // Navigate to the new board builder
    router.push(`/selection-boards/${newBoardId}`);
  };

  const handleClose = () => {
    setSelectedClientId('');
    setSelectedProjectId('');
    setBoardName('');
    setRoomArea('');
    onClose();
  };

  const isValid = selectedClientId && selectedProjectId && boardName.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New Selection Board
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-800"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Client Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">Select a client...</option>
                    {mockClients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    disabled={!selectedClientId}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="">
                      {selectedClientId
                        ? 'Select a project...'
                        : 'Select a client first'}
                    </option>
                    {filteredProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  {selectedClientId && filteredProjects.length === 0 && (
                    <p className="mt-1 text-sm text-amber-600">
                      No projects found for this client.
                    </p>
                  )}
                </div>

                {/* Board Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Board Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    placeholder="e.g., Kitchen Lighting"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                {/* Room/Area (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room/Area <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={roomArea}
                    onChange={(e) => setRoomArea(e.target.value)}
                    placeholder="e.g., Kitchen, Living Room, Master Bath"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!isValid || isCreating}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isCreating ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Board'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
