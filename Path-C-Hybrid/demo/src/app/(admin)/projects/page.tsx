'use client';

import React, { useState } from 'react';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { HouzzLink, HouzzCard, HouzzBadge } from '@/components/hybrid/HouzzLink';
import { mockProjects, mockMaterials } from '@/data/mockData';
import Link from 'next/link';

type ProjectStatus = 'active' | 'pending' | 'completed' | 'design' | 'selections' | 'ordering' | 'installation' | 'complete';

const statusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: 'Active', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  pending: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  completed: { label: 'Completed', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  design: { label: 'Design', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  selections: { label: 'Selections', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  ordering: { label: 'Ordering', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  installation: { label: 'Installation', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  complete: { label: 'Complete', color: 'text-green-700', bgColor: 'bg-green-100' }
};

function ProjectCard({ project, onSelect }: { project: typeof mockProjects[0]; onSelect: () => void }) {
  const status = statusConfig[project.status];
  const progress = Math.round((project.spent / project.budget) * 100);

  return (
    <div
      onClick={onSelect}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.clientName}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Budget</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progress > 90 ? 'bg-red-500' : progress > 75 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Rooms</span>
          <span className="text-gray-700 dark:text-gray-300">{project.rooms?.join(', ') || 'N/A'}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Target Completion</span>
          <span className="text-gray-700 dark:text-gray-300">
            {project.targetCompletion ? new Date(project.targetCompletion).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'TBD'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <HouzzBadge>
            {project.approvedSelectionsCount}/{project.selectionsCount} approved
          </HouzzBadge>
        </div>
        <HouzzLink href={project.houzzUrl} size="sm">
          Selections
        </HouzzLink>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: typeof mockProjects[0]; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'selections' | 'materials' | 'documents'>('overview');
  const status = statusConfig[project.status];
  const progress = Math.round((project.spent / project.budget) * 100);

  // Mock imported selections
  const importedSelections = mockMaterials.slice(0, 4);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'selections', label: 'Selections', badge: project.selectionsCount },
    { id: 'materials', label: 'Materials' },
    { id: 'documents', label: 'Documents' }
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                {status.label}
              </span>
            </div>
            <p className="text-gray-500">{project.clientName} &bull; {project.rooms?.join(', ') || 'No rooms specified'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-6">
        <nav className="flex gap-6 -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {'badge' in tab && tab.badge && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Budget Overview</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Total Budget</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Spent</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${project.spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                    <span className="font-semibold text-emerald-600">
                      ${(project.budget - project.spent).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{progress}% of budget used</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Timeline</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Start Date</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Target Completion</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {project.targetCompletion ? new Date(project.targetCompletion).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Status</span>
                    <span className={`font-semibold ${status.color}`}>{status.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selections' && (
          <div className="space-y-6">
            {/* Houzz Integration Card */}
            <HouzzCard
              title="Houzz Selection Boards"
              description="Manage product selections and client approvals"
              linkText="Open in Houzz Pro"
              linkHref={project.houzzUrl}
            >
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <p className="text-2xl font-bold text-gray-900">{project.selectionsCount}</p>
                  <p className="text-sm text-gray-500">Total Items</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <p className="text-2xl font-bold text-emerald-600">{project.approvedSelectionsCount}</p>
                  <p className="text-sm text-gray-500">Approved</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Last synced: Dec 30, 2025 2:45 PM
              </p>
            </HouzzCard>

            {/* Imported Selections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Imported Items ({importedSelections.length})
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    Import from Houzz
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    Add from Materials
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {importedSelections.map(item => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      ${item.currentPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500">Materials tracking coming soon...</p>
            <Link href="/materials" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
              View Materials Library
            </Link>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">Project documents will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = mockProjects.filter(
    p => statusFilter === 'all' || p.status === statusFilter
  );

  const statusCounts = {
    all: mockProjects.length,
    design: mockProjects.filter(p => p.status === 'design').length,
    selections: mockProjects.filter(p => p.status === 'selections').length,
    ordering: mockProjects.filter(p => p.status === 'ordering').length,
    installation: mockProjects.filter(p => p.status === 'installation').length,
    complete: mockProjects.filter(p => p.status === 'complete').length
  };

  return (
    <PageWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your interior design projects</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {/* Status Filter Pills */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'design', 'selections', 'ordering', 'installation', 'complete'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {status === 'all' ? 'All' : statusConfig[status].label}
              <span className="ml-1.5 opacity-75">({statusCounts[status]})</span>
            </button>
          ))}
        </div>
      </FadeIn>

      {selectedProject ? (
        <FadeIn>
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        </FadeIn>
      ) : (
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </FadeIn>
      )}
    </PageWrapper>
  );
}
