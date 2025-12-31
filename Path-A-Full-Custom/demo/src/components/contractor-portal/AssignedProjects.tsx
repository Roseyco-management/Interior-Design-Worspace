'use client';

import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'upcoming' | 'completed';
  tasksRemaining?: number;
  startDate?: string;
}

interface AssignedProjectsProps {
  projects: Project[];
}

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
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function AssignedProjects({ projects }: AssignedProjectsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assigned Projects</h3>
        <Link
          href="/contractor-portal/projects"
          className="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
        >
          View All
        </Link>
      </div>
      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p>No projects assigned</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-amber-50/50 transition-colors cursor-pointer dark:bg-gray-700/50 dark:hover:bg-amber-900/10"
            >
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-900 dark:text-white">{project.name}</span>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                {project.tasksRemaining !== undefined && project.tasksRemaining > 0
                  ? `${project.tasksRemaining} task${project.tasksRemaining > 1 ? 's' : ''} remaining`
                  : project.startDate
                    ? `Starts ${project.startDate}`
                    : 'All tasks complete'
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
