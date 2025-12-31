'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ClientProjectPage() {
  const project = {
    name: 'Modern Kitchen Renovation',
    description: 'Complete kitchen renovation featuring custom cabinetry, quartz countertops, and modern appliances. The design emphasizes clean lines, functionality, and a light, airy feel.',
    status: 'Selections',
    progress: 45,
    startDate: '2024-01-15',
    estimatedCompletion: '2024-04-30',
    budget: 125000,
    spent: 48500,
  };

  const milestones = [
    { id: '1', name: 'Design Phase', status: 'Completed', date: '2024-01-30' },
    { id: '2', name: 'Material Selections', status: 'In Progress', date: '2024-02-28' },
    { id: '3', name: 'Ordering & Lead Time', status: 'Upcoming', date: '2024-03-15' },
    { id: '4', name: 'Demo & Prep', status: 'Upcoming', date: '2024-03-25' },
    { id: '5', name: 'Installation', status: 'Upcoming', date: '2024-04-15' },
    { id: '6', name: 'Final Walkthrough', status: 'Upcoming', date: '2024-04-30' },
  ];

  const team = [
    { name: 'Amanda Foster', role: 'Lead Designer', avatar: 'AF' },
    { name: 'Michael Chen', role: 'Project Manager', avatar: 'MC' },
    { name: 'Sarah Johnson', role: 'Installation Lead', avatar: 'SJ' },
  ];

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {project.status}
              </span>
            </div>
            <p className="text-gray-500 max-w-2xl">{project.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/client-portal/messages"
              className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              Message Designer
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
            <span className="text-sm font-bold text-emerald-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Timeline</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      milestone.status === 'In Progress' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {milestone.status === 'Completed' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : milestone.status === 'In Progress' ? (
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        milestone.status === 'Completed' ? 'bg-green-300' : 'bg-gray-200 dark:bg-gray-700'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        milestone.status === 'Completed' ? 'text-gray-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {milestone.name}
                      </h3>
                      <span className={`text-sm ${
                        milestone.status === 'In Progress' ? 'text-emerald-600 font-medium' : 'text-gray-400'
                      }`}>
                        {formatDate(milestone.date)}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      milestone.status === 'Completed' ? 'text-green-600' :
                      milestone.status === 'In Progress' ? 'text-emerald-600' :
                      'text-gray-400'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/client-portal/selections"
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pending Approvals</p>
                <p className="text-sm text-amber-600">2 selections need review</p>
              </div>
            </Link>
            <Link
              href="/client-portal/documents"
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Documents</p>
                <p className="text-sm text-gray-500">View project files</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Spent</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(project.spent)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Total Budget</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(project.budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(project.spent / project.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-xl font-bold text-emerald-600">{formatCurrency(project.budget - project.spent)}</p>
              </div>
            </div>
          </div>

          {/* Key Dates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Dates</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Project Start</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(project.startDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Est. Completion</span>
                <span className="text-sm font-medium text-emerald-600">{formatDate(project.estimatedCompletion)}</span>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Team</h2>
            <div className="space-y-3">
              {team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
