'use client';

const deadlines = [
  { task: "Kitchen cabinet installation", project: "Mitchell Residence", daysUntil: 3 },
  { task: "Final walkthrough", project: "Wong Loft", daysUntil: 5 },
  { task: "Client meeting", project: "Henderson Remodel", daysUntil: 7 },
  { task: "Material delivery", project: "Chen Beach House", daysUntil: 10 }
];

function getDaysLabel(days: number): string {
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days === 7) return '1 week';
  return `${days} days`;
}

function getUrgencyColor(days: number): string {
  if (days <= 3) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  if (days <= 5) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';
  return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
}

export default function UpcomingDeadlines() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-5 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h3>
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {deadlines.map((deadline, index) => (
            <li key={index} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{deadline.task}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{deadline.project}</p>
                </div>
              </div>
              <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getUrgencyColor(deadline.daysUntil)}`}>
                {getDaysLabel(deadline.daysUntil)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
