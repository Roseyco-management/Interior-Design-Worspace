'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface ScheduleItem {
  id: string;
  project: string;
  task: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<'week' | 'list'>('list');

  const schedule: ScheduleItem[] = [
    { id: '1', project: 'Davidson Kitchen Renovation', task: 'Cabinet Installation - Day 1', address: '123 Oak Lane, Austin TX', date: '2024-02-09', time: '8:00 AM', duration: '8 hours', status: 'In Progress' },
    { id: '2', project: 'Thompson Master Bath', task: 'Tile Demo', address: '456 Pine St, Austin TX', date: '2024-02-09', time: '9:00 AM', duration: '4 hours', status: 'Scheduled' },
    { id: '3', project: 'Davidson Kitchen Renovation', task: 'Cabinet Installation - Day 2', address: '123 Oak Lane, Austin TX', date: '2024-02-10', time: '8:00 AM', duration: '8 hours', status: 'Scheduled' },
    { id: '4', project: 'Martinez Living Room', task: 'Flooring Installation', address: '789 Elm Ave, Austin TX', date: '2024-02-12', time: '7:30 AM', duration: '16 hours', status: 'Scheduled' },
    { id: '5', project: 'Davidson Kitchen Renovation', task: 'Countertop Template', address: '123 Oak Lane, Austin TX', date: '2024-02-14', time: '10:00 AM', duration: '3 hours', status: 'Scheduled' },
    { id: '6', project: 'Chen Home Office', task: 'Built-in Installation', address: '321 Maple Dr, Austin TX', date: '2024-02-18', time: '8:00 AM', duration: '24 hours', status: 'Scheduled' },
  ];

  const groupedByDate = schedule.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h1>
          <p className="text-gray-500">Your upcoming jobs and appointments</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-white shadow dark:bg-gray-700' : ''
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'week' ? 'bg-white shadow dark:bg-gray-700' : ''
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {formatDate(date)}
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-amber-200 transition-all dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.status === 'In Progress' ? 'bg-green-100 text-green-600' :
                        item.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.project}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.status === 'In Progress' ? 'bg-green-100 text-green-700' :
                            item.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-amber-600 font-medium">{item.task}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {item.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.time} ({item.duration})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-16 lg:ml-0">
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
