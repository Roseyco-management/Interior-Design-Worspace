'use client';

interface Activity {
  action: string;
  time: string;
  amount?: string;
  vendor?: string;
  project?: string;
}

const activities: Activity[] = [
  { action: "Invoice #1042 paid", time: "2 hours ago", amount: "$4,500" },
  { action: "Proposal sent to Wong", time: "Yesterday" },
  { action: "Materials ordered", time: "Yesterday", vendor: "Restoration Hardware" },
  { action: "Project completed", time: "3 days ago", project: "Smith Kitchen" }
];

function getActivityIcon(action: string) {
  if (action.toLowerCase().includes('invoice') || action.toLowerCase().includes('paid')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (action.toLowerCase().includes('proposal')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }
  if (action.toLowerCase().includes('material') || action.toLowerCase().includes('ordered')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  }
  if (action.toLowerCase().includes('project') || action.toLowerCase().includes('completed')) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function getActivityColor(action: string): string {
  if (action.toLowerCase().includes('paid') || action.toLowerCase().includes('completed')) {
    return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
  }
  if (action.toLowerCase().includes('proposal')) {
    return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
  }
  if (action.toLowerCase().includes('material') || action.toLowerCase().includes('ordered')) {
    return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
  }
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
}

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-5 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${getActivityColor(activity.action)}`}>
                {getActivityIcon(activity.action)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.action}
                  {activity.amount && (
                    <span className="ml-1 text-green-600 dark:text-green-400">{activity.amount}</span>
                  )}
                </p>
                {activity.vendor && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.vendor}</p>
                )}
                {activity.project && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.project}</p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
