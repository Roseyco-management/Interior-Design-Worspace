'use client';

interface Appointment {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
}

interface TodayScheduleProps {
  appointments: Appointment[];
}

export function TodaySchedule({ appointments }: TodayScheduleProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today&apos;s Schedule</h3>
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No appointments scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-700/50">
              <div className="text-amber-600 font-medium whitespace-nowrap dark:text-amber-400">
                {apt.time}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{apt.title}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 dark:text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{apt.location}</span>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="whitespace-nowrap">Est. {apt.duration}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
