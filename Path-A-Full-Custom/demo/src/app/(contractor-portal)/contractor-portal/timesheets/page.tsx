'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  hours: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  notes?: string;
}

export default function TimesheetsPage() {
  const [selectedWeek] = useState('Feb 5 - Feb 11, 2024');

  const timeEntries: TimeEntry[] = [
    { id: '1', date: '2024-02-05', project: 'Davidson Kitchen Renovation', task: 'Demo & Prep', hours: 8, status: 'Approved' },
    { id: '2', date: '2024-02-06', project: 'Davidson Kitchen Renovation', task: 'Demo & Prep', hours: 7.5, status: 'Approved' },
    { id: '3', date: '2024-02-07', project: 'Thompson Master Bath', task: 'Plumbing Rough-in', hours: 6, status: 'Approved' },
    { id: '4', date: '2024-02-08', project: 'Davidson Kitchen Renovation', task: 'Cabinet Installation', hours: 8, status: 'Pending' },
    { id: '5', date: '2024-02-09', project: 'Davidson Kitchen Renovation', task: 'Cabinet Installation', hours: 0, status: 'Pending', notes: 'In Progress' },
  ];

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const approvedHours = timeEntries.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.hours, 0);
  const pendingHours = timeEntries.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.hours, 0);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timesheets</h1>
          <p className="text-gray-500">Track and submit your work hours</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Entry
        </button>
      </div>

      {/* Week Selector */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 dark:bg-gray-800 dark:border-gray-700">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="font-semibold text-gray-900 dark:text-white">{selectedWeek}</p>
          <p className="text-sm text-gray-500">Current Week</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Total Hours</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalHours}h</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{approvedHours}h</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-3xl font-bold text-amber-600">{pendingHours}h</p>
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Task</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Hours</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {timeEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-white">{formatDate(entry.date)}</p>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{entry.project}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{entry.task}</td>
                <td className="px-6 py-4">
                  {entry.hours > 0 ? (
                    <span className="font-medium text-gray-900 dark:text-white">{entry.hours}h</span>
                  ) : (
                    <span className="text-gray-400 text-sm">{entry.notes}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    entry.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    entry.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {entry.status === 'Pending' && entry.hours === 0 ? (
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600">
                      Clock Out
                    </button>
                  ) : entry.status === 'Pending' ? (
                    <button className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100">
                      Edit
                    </button>
                  ) : (
                    <button className="text-sm text-gray-400 hover:text-gray-600">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 shadow-lg shadow-amber-500/30">
          Submit Week for Approval
        </button>
      </div>

      {/* Info */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Timesheet Guidelines</p>
            <p className="text-sm text-gray-500 mt-1">
              Submit your timesheet by Sunday each week. Include all hours worked and any notes about the tasks performed.
              Approved timesheets are processed for payment on the following Friday.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
