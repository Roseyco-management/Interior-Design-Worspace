'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Contractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialty: string;
  hourlyRate: number;
  status: 'active' | 'available' | 'unavailable';
  currentProject?: string;
  lastProject?: { name: string; completedDate: string };
  hoursThisWeek: number;
  rating: number;
  totalJobs: number;
  specialties: string[];
}

interface ContractorCardProps {
  contractor: Contractor;
  onAssignJob: (contractor: Contractor) => void;
  onViewTimesheet: (contractor: Contractor) => void;
  index?: number;
}

export function ContractorCard({ contractor, onAssignJob, onViewTimesheet, index = 0 }: ContractorCardProps) {
  const statusStyles = {
    active: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Active' },
    available: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Available' },
    unavailable: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500', label: 'Unavailable' },
  };

  const status = statusStyles[contractor.status];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-lg">
            {contractor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <Link
              href={`/contractors/${contractor.id}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 transition-colors"
            >
              {contractor.name}
            </Link>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-gray-500">{contractor.specialty}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {contractor.status === 'active' && contractor.currentProject && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Current:</span>
            <span className="text-gray-900 dark:text-white font-medium">{contractor.currentProject}</span>
          </div>
        )}
        {contractor.status === 'available' && contractor.lastProject && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Last Job:</span>
            <span className="text-gray-900 dark:text-white">
              {contractor.lastProject.name} (Completed {new Date(contractor.lastProject.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Hours This Week:</span>
          <span className="text-gray-900 dark:text-white font-medium">{contractor.hoursThisWeek} hrs</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Rating:</span>
          <div className="flex items-center gap-1">
            {renderStars(contractor.rating)}
            <span className="text-gray-500 ml-1">({contractor.totalJobs} jobs)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Link
          href={`/contractors/${contractor.id}`}
          className="flex-1 px-3 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          View Profile
        </Link>
        <button
          onClick={() => onAssignJob(contractor)}
          className="flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Assign Job
        </button>
        <button
          onClick={() => onViewTimesheet(contractor)}
          className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          Timesheet
        </button>
      </div>
    </motion.div>
  );
}
