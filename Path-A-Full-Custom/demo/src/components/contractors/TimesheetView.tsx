'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimesheetEntry {
  date: string;
  hours: number;
  project: string;
  tasks: string[];
  status: 'pending' | 'approved' | 'paid';
}

interface TimesheetViewProps {
  contractorId: string;
  contractorName?: string;
  entries: TimesheetEntry[];
  hourlyRate?: number;
  onClose?: () => void;
  isModal?: boolean;
}

function StatusBadge({ status }: { status: 'pending' | 'approved' | 'paid' }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-blue-100 text-blue-700',
    paid: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function TimesheetView({
  contractorId: _contractorId,
  contractorName,
  entries,
  hourlyRate = 45,
  onClose,
  isModal = false,
}: TimesheetViewProps) {
  void _contractorId; // Reserved for API calls
  const [selectedPeriod, setSelectedPeriod] = useState('this-week');

  const weekTotal = entries.reduce((sum, e) => sum + e.hours, 0);
  const pendingEntries = entries.filter(e => e.status === 'pending');
  const pendingHours = pendingEntries.reduce((sum, e) => sum + e.hours, 0);

  const content = (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timesheet</h3>
          {contractorName && (
            <p className="text-sm text-gray-500">{contractorName}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
          </select>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Tasks</th>
              <th className="pb-3 font-medium">Hours</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {entries.map((entry, index) => (
              <motion.tr
                key={entry.date}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 text-sm text-gray-900 dark:text-white">{entry.date}</td>
                <td className="py-3 text-sm text-gray-900 dark:text-white">{entry.project}</td>
                <td className="py-3 text-sm text-gray-500">{entry.tasks.join(', ')}</td>
                <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{entry.hours}h</td>
                <td className="py-3">
                  <StatusBadge status={entry.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Week Total:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{weekTotal} hours</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Amount:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {weekTotal} hrs × ${hourlyRate}/hr = ${(weekTotal * hourlyRate).toLocaleString()}
              </span>
            </div>
          </div>
          {pendingHours > 0 && (
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
              Approve & Pay (${(pendingHours * hourlyRate).toLocaleString()})
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal && onClose) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl"
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return content;
}
