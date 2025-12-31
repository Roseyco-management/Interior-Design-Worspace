'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { TimesheetView } from '@/components/contractors/TimesheetView';
import { ContractorSchedule } from '@/components/contractors/ContractorSchedule';
import { AssignJobModal } from '@/components/contractors/AssignJobModal';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock Data
const mockContractors: Record<string, {
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
}> = {
  con1: {
    id: 'con1',
    name: 'Mike Rodriguez',
    email: 'mike@email.com',
    phone: '(555) 123-4567',
    location: 'Riverside, CA',
    specialty: 'Installer',
    hourlyRate: 45,
    status: 'active',
    currentProject: 'Johnson Kitchen Remodel',
    hoursThisWeek: 32,
    rating: 5,
    totalJobs: 12,
    specialties: ['Installation', 'Assembly', 'Delivery']
  },
  con2: {
    id: 'con2',
    name: 'Sarah Chen',
    email: 'sarah@email.com',
    phone: '(555) 234-5678',
    location: 'Downtown, CA',
    specialty: 'Painter',
    hourlyRate: 40,
    status: 'available',
    lastProject: { name: 'Chen Living Room', completedDate: '2024-12-20' },
    hoursThisWeek: 0,
    rating: 4,
    totalJobs: 8,
    specialties: ['Interior Painting', 'Touch-ups', 'Wall Prep']
  },
  con3: {
    id: 'con3',
    name: 'James Wilson',
    email: 'james@email.com',
    phone: '(555) 345-6789',
    location: 'Eastside, CA',
    specialty: 'Electrician',
    hourlyRate: 65,
    status: 'active',
    currentProject: 'Martinez Master Bath',
    hoursThisWeek: 24,
    rating: 5,
    totalJobs: 15,
    specialties: ['Lighting Installation', 'Wiring', 'Fixtures']
  },
  con4: {
    id: 'con4',
    name: 'Lisa Park',
    email: 'lisa@email.com',
    phone: '(555) 456-7890',
    location: 'Westside, CA',
    specialty: 'General',
    hourlyRate: 35,
    status: 'available',
    lastProject: { name: 'Williams Entry', completedDate: '2024-12-10' },
    hoursThisWeek: 0,
    rating: 4,
    totalJobs: 6,
    specialties: ['Assembly', 'Delivery', 'Light Installation']
  }
};

const mockTimesheetEntries = [
  { date: 'Mon, Dec 23', project: 'Johnson Kitchen', tasks: ['Cabinet install'], hours: 8, status: 'approved' as const },
  { date: 'Tue, Dec 24', project: 'Johnson Kitchen', tasks: ['Counter install'], hours: 8, status: 'approved' as const },
  { date: 'Wed, Dec 25', project: '-', tasks: ['Holiday'], hours: 0, status: 'approved' as const },
  { date: 'Thu, Dec 26', project: 'Johnson Kitchen', tasks: ['Lighting prep'], hours: 6, status: 'pending' as const },
  { date: 'Fri, Dec 27', project: 'Johnson Kitchen', tasks: ['Fixture install'], hours: 8, status: 'pending' as const },
  { date: 'Sat, Dec 28', project: 'Chen Living Room', tasks: ['Furniture delivery'], hours: 4, status: 'pending' as const },
];

const mockScheduleEntries = [
  {
    id: 's1',
    date: '2024-12-30',
    startTime: '09:00',
    endTime: '13:00',
    title: 'Install pendant lights',
    project: 'Johnson Kitchen Remodel',
    address: '123 Main St'
  },
  {
    id: 's2',
    date: '2025-01-02',
    startTime: '10:00',
    endTime: '16:00',
    title: 'Full day installation',
    project: 'Chen Living Room',
    address: '456 Oak Ave'
  },
  {
    id: 's3',
    date: '2025-01-05',
    startTime: '08:00',
    endTime: '12:00',
    title: 'Fixture mounting',
    project: 'Martinez Master Bath',
    address: '789 Pine Blvd'
  },
];

const mockJobHistory = [
  { id: 'j1', name: 'Johnson Kitchen Remodel', status: 'In Progress', tasksRemaining: 3 },
  { id: 'j2', name: 'Chen Living Room', status: 'In Progress', tasksRemaining: 1 },
  { id: 'j3', name: 'Thompson Dining Room', status: 'Completed', completedDate: 'Dec 15' },
  { id: 'j4', name: 'Williams Entry', status: 'Completed', completedDate: 'Dec 8' },
];

type TabType = 'schedule' | 'timesheet' | 'jobs';

export default function ContractorDetailPage() {
  const params = useParams();
  const contractorId = params.id as string;
  const contractor = mockContractors[contractorId];
  const [activeTab, setActiveTab] = useState<TabType>('schedule');
  const [showAssignModal, setShowAssignModal] = useState(false);

  if (!contractor) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contractor not found</h2>
            <Link href="/contractors" className="text-brand-500 hover:underline mt-2 inline-block">
              Back to Contractors
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

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
        className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'schedule',
      label: 'Schedule',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'timesheet',
      label: 'Timesheet',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  // Week hours summary
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekHours = [8, 8, 6, 8, 4, 0, 0];
  const weekTotal = weekHours.reduce((a, b) => a + b, 0);

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link
              href="/contractors"
              className="mt-1 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold">
                {contractor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{contractor.name}</h1>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                    {status.label}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{contractor.specialty}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-12 lg:ml-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              Message
            </button>
          </div>
        </div>

        {/* Contractor Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{contractor.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">{contractor.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900 dark:text-white">{contractor.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Hourly Rate</p>
                <p className="font-medium text-gray-900 dark:text-white">${contractor.hourlyRate}/hr</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {contractor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Rating:</p>
                <div className="flex items-center gap-1">
                  {renderStars(contractor.rating)}
                  <span className="text-gray-500 ml-1">({contractor.totalJobs} completed jobs)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ContractorSchedule
              entries={mockScheduleEntries}
              onAddJob={() => setShowAssignModal(true)}
            />
          </motion.div>
        )}

        {activeTab === 'timesheet' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Week Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Week of Dec 23-29, 2024</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-center text-sm text-gray-500">
                      {weekDays.map((day) => (
                        <th key={day} className="pb-2 font-medium">{day}</th>
                      ))}
                      <th className="pb-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center text-gray-900 dark:text-white font-medium">
                      {weekHours.map((hours, i) => (
                        <td key={i} className={`py-2 ${hours === 0 ? 'text-gray-400' : ''}`}>
                          {hours}h
                        </td>
                      ))}
                      <td className="py-2 text-brand-600 font-bold">{weekTotal} hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Week Total: {weekTotal} hrs × ${contractor.hourlyRate}/hr = ${(weekTotal * contractor.hourlyRate).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Detailed Timesheet */}
            <TimesheetView
              contractorId={contractor.id}
              entries={mockTimesheetEntries}
              hourlyRate={contractor.hourlyRate}
            />
          </motion.div>
        )}

        {activeTab === 'jobs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Job History</h3>
              <Link href="/projects" className="text-sm text-brand-500 hover:underline">
                View All
              </Link>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockJobHistory.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{job.name}</p>
                        <p className="text-sm text-gray-500">
                          {job.status === 'Completed' ? (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Completed {job.completedDate}
                            </span>
                          ) : (
                            `${job.status} (${job.tasksRemaining} ${job.tasksRemaining === 1 ? 'task' : 'tasks'} remaining)`
                          )}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Assign Job Modal */}
      {showAssignModal && (
        <AssignJobModal
          contractor={contractor}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </PageWrapper>
  );
}
