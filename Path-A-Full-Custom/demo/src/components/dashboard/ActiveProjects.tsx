'use client';

import Link from 'next/link';

interface Project {
  name: string;
  client: string;
  status: 'active' | 'pending' | 'completed';
  budgetProgress: number;
  budget: { spent: number; total: number };
  selections: { approved: number; total: number };
}

const activeProjects: Project[] = [
  {
    name: 'Modern Kitchen Renovation',
    client: 'Sarah Johnson',
    status: 'active',
    budgetProgress: 45,
    budget: { spent: 28500, total: 65000 },
    selections: { approved: 18, total: 24 }
  },
  {
    name: 'Master Suite Redesign',
    client: 'Michael Chen',
    status: 'active',
    budgetProgress: 68,
    budget: { spent: 62300, total: 95000 },
    selections: { approved: 42, total: 42 }
  },
  {
    name: 'Full Home Renovation',
    client: 'Emily Rodriguez',
    status: 'pending',
    budgetProgress: 15,
    budget: { spent: 25000, total: 200000 },
    selections: { approved: 0, total: 8 }
  }
];

function getStatusBadge(status: Project['status']) {
  const styles = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  };

  const labels = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function getProgressColor(progress: number): string {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 25) return 'bg-amber-500';
  return 'bg-gray-400';
}

export default function ActiveProjects() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View All
        </Link>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <div
              key={project.name}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                  <span>Budget Progress</span>
                  <span className="font-medium">{project.budgetProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.budgetProgress)}`}
                    style={{ width: `${project.budgetProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ${project.budget.spent.toLocaleString()} of ${project.budget.total.toLocaleString()}
                </p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selections: {project.selections.approved}/{project.selections.total} approved
                {project.selections.approved === project.selections.total && project.selections.total > 0 && (
                  <span className="ml-1 text-green-600 dark:text-green-400">✓</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
