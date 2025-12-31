'use client';

import { motion } from 'framer-motion';
import { TodaySchedule, QuickActions, AssignedProjects } from '@/components/contractor-portal';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Mock data
const mockContractor = {
  id: 'c1',
  name: 'Mike Rodriguez',
  role: 'Installer',
  avatar: 'MR'
};

const todaySchedule = [
  {
    id: 's1',
    time: '9:00 AM',
    title: 'Kitchen Install - Johnson Residence',
    location: '123 Main St, Riverside',
    duration: '4 hours'
  },
  {
    id: 's2',
    time: '2:00 PM',
    title: 'Final Walkthrough - Chen Home',
    location: '456 Oak Ave, Downtown',
    duration: '1 hour'
  }
];

const assignedProjects = [
  { id: 'p1', name: 'Johnson Kitchen Remodel', status: 'active' as const, tasksRemaining: 3 },
  { id: 'p2', name: 'Chen Living Room', status: 'active' as const, tasksRemaining: 1 },
  { id: 'p3', name: 'Martinez Master Bath', status: 'upcoming' as const, startDate: 'Jan 15' }
];

export default function ContractorPortalDashboard() {
  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions here
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {mockContractor.name.split(' ')[0]}!</h1>
        <p className="text-amber-100">Here&apos;s what&apos;s on your plate today</p>
      </div>

      {/* Today's Schedule - Full width on top */}
      <TodaySchedule appointments={todaySchedule} />

      {/* Two column layout for Quick Actions and Assigned Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions onAction={handleQuickAction} />
        <AssignedProjects projects={assignedProjects} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900/30">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">32h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Clock In/Out Status */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-300">Currently Clocked Out</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">Last session: 8 hours (Yesterday)</p>
            </div>
          </div>
          <button className="px-6 py-3 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 shadow-lg shadow-amber-500/30 transition-colors">
            Clock In Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
