'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { KPIBar } from '@/components/common/KPIBar';
import { ContractorCard } from '@/components/contractors/ContractorCard';
import { AddContractorModal } from '@/components/contractors/AddContractorModal';
import { AssignJobModal } from '@/components/contractors/AssignJobModal';
import { TimesheetView } from '@/components/contractors/TimesheetView';
import { useState } from 'react';

// KPI Icons
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CurrencyDollarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Mock Data
const mockContractors = [
  {
    id: 'con1',
    name: 'Mike Rodriguez',
    email: 'mike@email.com',
    phone: '(555) 123-4567',
    location: 'Riverside, CA',
    specialty: 'Installer',
    hourlyRate: 45,
    status: 'active' as const,
    currentProject: 'Johnson Kitchen Remodel',
    hoursThisWeek: 32,
    rating: 5,
    totalJobs: 12,
    specialties: ['Installation', 'Assembly', 'Delivery']
  },
  {
    id: 'con2',
    name: 'Sarah Chen',
    email: 'sarah@email.com',
    phone: '(555) 234-5678',
    location: 'Downtown, CA',
    specialty: 'Painter',
    hourlyRate: 40,
    status: 'available' as const,
    lastProject: { name: 'Chen Living Room', completedDate: '2024-12-20' },
    hoursThisWeek: 0,
    rating: 4,
    totalJobs: 8,
    specialties: ['Interior Painting', 'Touch-ups', 'Wall Prep']
  },
  {
    id: 'con3',
    name: 'James Wilson',
    email: 'james@email.com',
    phone: '(555) 345-6789',
    location: 'Eastside, CA',
    specialty: 'Electrician',
    hourlyRate: 65,
    status: 'active' as const,
    currentProject: 'Martinez Master Bath',
    hoursThisWeek: 24,
    rating: 5,
    totalJobs: 15,
    specialties: ['Lighting Installation', 'Wiring', 'Fixtures']
  },
  {
    id: 'con4',
    name: 'Lisa Park',
    email: 'lisa@email.com',
    phone: '(555) 456-7890',
    location: 'Westside, CA',
    specialty: 'General',
    hourlyRate: 35,
    status: 'available' as const,
    lastProject: { name: 'Williams Entry', completedDate: '2024-12-10' },
    hoursThisWeek: 0,
    rating: 4,
    totalJobs: 6,
    specialties: ['Assembly', 'Delivery', 'Light Installation']
  }
];

const mockTimesheetEntries = [
  { date: 'Mon, Dec 23', project: 'Johnson Kitchen', tasks: ['Cabinet install'], hours: 8, status: 'approved' as const },
  { date: 'Tue, Dec 24', project: 'Johnson Kitchen', tasks: ['Counter install'], hours: 8, status: 'approved' as const },
  { date: 'Wed, Dec 25', project: '-', tasks: ['Holiday'], hours: 0, status: 'approved' as const },
  { date: 'Thu, Dec 26', project: 'Johnson Kitchen', tasks: ['Lighting prep'], hours: 6, status: 'pending' as const },
  { date: 'Fri, Dec 27', project: 'Johnson Kitchen', tasks: ['Fixture install'], hours: 8, status: 'pending' as const },
  { date: 'Sat, Dec 28', project: 'Chen Living Room', tasks: ['Furniture delivery'], hours: 4, status: 'pending' as const },
];

const contractorKPIs = [
  { label: 'Total Contractors', value: 4, icon: <UsersIcon />, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { label: 'Active Today', value: 3, icon: <CheckCircleIcon />, iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400' },
  { label: 'Jobs This Month', value: 12, icon: <BriefcaseIcon />, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
  { label: 'Paid This Month', value: '$8.2K', icon: <CurrencyDollarIcon />, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
];

type Specialty = 'All' | 'Installer' | 'Painter' | 'Electrician' | 'Plumber' | 'Carpenter' | 'General';

export default function ContractorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<Specialty>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<typeof mockContractors[0] | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showTimesheetModal, setShowTimesheetModal] = useState(false);

  const filteredContractors = mockContractors.filter((contractor) => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || contractor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const specialties: Specialty[] = ['All', 'Installer', 'Painter', 'Electrician', 'Plumber', 'Carpenter', 'General'];

  const handleAssignJob = (contractor: typeof mockContractors[0]) => {
    setSelectedContractor(contractor);
    setShowAssignModal(true);
  };

  const handleViewTimesheet = (contractor: typeof mockContractors[0]) => {
    setSelectedContractor(contractor);
    setShowTimesheetModal(true);
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contractors</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage contractors, timesheets, and job assignments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Contractor
          </button>
        </div>

        {/* KPI Bar */}
        <KPIBar items={contractorKPIs} />

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search contractors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value as Specialty)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty === 'All' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contractors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredContractors.map((contractor, index) => (
            <ContractorCard
              key={contractor.id}
              contractor={contractor}
              onAssignJob={handleAssignJob}
              onViewTimesheet={handleViewTimesheet}
              index={index}
            />
          ))}
        </div>

        {filteredContractors.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No contractors found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddContractorModal onClose={() => setShowAddModal(false)} />
      )}

      {showAssignModal && selectedContractor && (
        <AssignJobModal
          contractor={selectedContractor}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedContractor(null);
          }}
        />
      )}

      {showTimesheetModal && selectedContractor && (
        <TimesheetView
          contractorId={selectedContractor.id}
          contractorName={selectedContractor.name}
          entries={mockTimesheetEntries}
          hourlyRate={selectedContractor.hourlyRate}
          isModal={true}
          onClose={() => {
            setShowTimesheetModal(false);
            setSelectedContractor(null);
          }}
        />
      )}
    </PageWrapper>
  );
}
