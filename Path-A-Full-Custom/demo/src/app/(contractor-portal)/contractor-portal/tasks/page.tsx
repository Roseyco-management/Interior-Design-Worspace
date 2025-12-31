'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type TaskStatus = 'all' | 'pending' | 'in_progress' | 'completed';

interface Task {
  id: string;
  description: string;
  project: string;
  dueDate?: string;
  completedDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const mockTasks: Task[] = [
  {
    id: 't1',
    description: 'Install pendant lights over island',
    project: 'Johnson Kitchen Remodel',
    dueDate: '2024-12-30',
    status: 'pending'
  },
  {
    id: 't2',
    description: 'Mount wall sconces in dining area',
    project: 'Johnson Kitchen Remodel',
    completedDate: '2024-12-28',
    status: 'completed'
  },
  {
    id: 't3',
    description: 'Assemble and position dining table',
    project: 'Chen Living Room',
    dueDate: '2025-01-05',
    status: 'in_progress'
  },
  {
    id: 't4',
    description: 'Install bathroom vanity',
    project: 'Martinez Master Bath',
    dueDate: '2025-01-18',
    status: 'pending'
  },
  {
    id: 't5',
    description: 'Replace cabinet hardware',
    project: 'Johnson Kitchen Remodel',
    dueDate: '2025-01-02',
    status: 'pending'
  },
  {
    id: 't6',
    description: 'Install under-cabinet lighting',
    project: 'Johnson Kitchen Remodel',
    completedDate: '2024-12-26',
    status: 'completed'
  }
];

const filterTabs: { label: string; value: TaskStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StatusBadge({ status }: { status: Task['status'] }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  const labels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'pending' ? 'bg-yellow-500' :
        status === 'in_progress' ? 'bg-blue-500' :
        'bg-green-500'
      }`}></span>
      {labels[status]}
    </span>
  );
}

function TaskCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
        checked
          ? 'bg-green-500 border-green-500 text-white'
          : 'border-gray-300 hover:border-amber-400 dark:border-gray-600'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

export default function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<TaskStatus>('all');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newStatus = task.status === 'completed' ? 'pending' : 'completed';
          return {
            ...task,
            status: newStatus,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
            dueDate: newStatus === 'pending' ? task.dueDate : undefined
          };
        }
        return task;
      })
    );
  };

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
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
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your assigned tasks</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === tab.value
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                activeFilter === tab.value
                  ? 'bg-amber-600'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {taskCounts[tab.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {activeFilter === 'all'
                ? "You don't have any tasks assigned yet."
                : `No ${activeFilter.replace('_', ' ')} tasks.`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
            >
              <div
                className="p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
              >
                <TaskCheckbox
                  checked={task.status === 'completed'}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-sm text-amber-600 dark:text-amber-400">{task.project}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {task.status === 'completed'
                        ? `Completed: ${formatDate(task.completedDate!)}`
                        : `Due: ${formatDate(task.dueDate!)}`
                      }
                    </span>
                  </div>
                </div>
                <StatusBadge status={task.status} />
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedTask === task.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expanded Details */}
              {expandedTask === task.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3"
                >
                  <div className="pl-10 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Project</p>
                        <p className="font-medium text-gray-900 dark:text-white">{task.project}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Status</p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">{task.status.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {task.status !== 'completed' && (
                        <>
                          <button
                            onClick={() => handleToggleComplete(task.id)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                          >
                            Mark Complete
                          </button>
                          <button className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30">
                            Upload Photo
                          </button>
                        </>
                      )}
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
