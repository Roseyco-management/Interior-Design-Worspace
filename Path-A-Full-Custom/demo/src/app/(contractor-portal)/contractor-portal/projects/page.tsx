'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Project {
  id: string;
  name: string;
  client: string;
  address: string;
  status: 'active' | 'upcoming' | 'completed';
  tasksTotal: number;
  tasksCompleted: number;
  startDate: string;
  endDate?: string;
}

const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Johnson Kitchen Remodel',
    client: 'Sarah Johnson',
    address: '123 Main St, Riverside',
    status: 'active',
    tasksTotal: 8,
    tasksCompleted: 5,
    startDate: '2024-12-01'
  },
  {
    id: 'p2',
    name: 'Chen Living Room',
    client: 'Michael Chen',
    address: '456 Oak Ave, Downtown',
    status: 'active',
    tasksTotal: 5,
    tasksCompleted: 4,
    startDate: '2024-12-15'
  },
  {
    id: 'p3',
    name: 'Martinez Master Bath',
    client: 'Elena Martinez',
    address: '789 Pine Rd, Westside',
    status: 'upcoming',
    tasksTotal: 6,
    tasksCompleted: 0,
    startDate: '2025-01-15'
  },
  {
    id: 'p4',
    name: 'Thompson Home Office',
    client: 'David Thompson',
    address: '321 Elm St, Eastside',
    status: 'completed',
    tasksTotal: 4,
    tasksCompleted: 4,
    startDate: '2024-11-01',
    endDate: '2024-12-10'
  }
];

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };

  const labels = {
    active: 'Active',
    upcoming: 'Upcoming',
    completed: 'Completed',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const percentage = (completed / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>{completed}/{total} tasks</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <div
          className="h-full bg-amber-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const upcomingProjects = mockProjects.filter(p => p.status === 'upcoming');
  const completedProjects = mockProjects.filter(p => p.status === 'completed');

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View all your assigned projects</p>
      </div>

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Projects</h2>
          <div className="grid gap-4">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-amber-200 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:border-amber-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Client: {project.client}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.address}
                    </p>
                  </div>
                  <div className="w-full sm:w-48">
                    <ProgressBar completed={project.tasksCompleted} total={project.tasksTotal} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                  <Link
                    href="/contractor-portal/tasks"
                    className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
                  >
                    View Tasks
                  </Link>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    Project Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Projects */}
      {upcomingProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Projects</h2>
          <div className="grid gap-4">
            {upcomingProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client: {project.client}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Starts: {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.tasksTotal} tasks planned</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Completed Projects</h2>
          <div className="grid gap-4">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-75 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client: {project.client}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Completed: {new Date(project.endDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p>{project.tasksCompleted} tasks completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
