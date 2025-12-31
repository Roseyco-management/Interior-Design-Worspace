'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { projects, formatCurrency, formatDate, getClientById, selectionBoards, tasks } from '@/lib/mock-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type TabType = 'overview' | 'selections' | 'budget' | 'timeline' | 'documents';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!project) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project not found</h2>
            <Link href="/projects" className="text-brand-500 hover:underline mt-2 inline-block">
              Back to Projects
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const client = getClientById(project.clientId);
  const projectBoards = selectionBoards.filter(b => b.projectId === projectId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  const statusColors = {
    Design: 'bg-purple-100 text-purple-700',
    Selections: 'bg-blue-100 text-blue-700',
    Ordering: 'bg-amber-100 text-amber-700',
    Installation: 'bg-orange-100 text-orange-700',
    Complete: 'bg-green-100 text-green-700',
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'selections', label: 'Selections' },
    { id: 'budget', label: 'Budget' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'documents', label: 'Documents' },
  ];

  // Budget breakdown mock data
  const budgetCategories = [
    { name: 'Lighting', budgeted: 15000, spent: 12500 },
    { name: 'Furniture', budgeted: 45000, spent: 38000 },
    { name: 'Plumbing', budgeted: 8000, spent: 7200 },
    { name: 'Flooring', budgeted: 12000, spent: 11800 },
    { name: 'Countertops', budgeted: 8000, spent: 8500 },
    { name: 'Labor', budgeted: 25000, spent: 18000 },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link
              href="/projects"
              className="mt-1 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <Link href={`/clients/${project.clientId}`} className="hover:text-brand-500">
                  {project.clientName}
                </Link>
                <span>•</span>
                <span>Due {formatDate(project.targetCompletion)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-12 lg:ml-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
              Share with Client
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
              Create Invoice
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
            <span className="text-sm font-bold text-brand-500">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-brand-500 h-3 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-brand-500 text-brand-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Project Description */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Description</h2>
                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              </div>

              {/* Selection Boards Preview */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Selection Boards</h2>
                  <button
                    onClick={() => setActiveTab('selections')}
                    className="text-sm text-brand-500 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectBoards.slice(0, 2).map((board) => (
                    <div
                      key={board.id}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{board.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          board.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          board.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {board.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{board.itemCount} items</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h2>
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className="text-sm text-brand-500 hover:underline"
                  >
                    View Timeline
                  </button>
                </div>
                <div className="space-y-3">
                  {projectTasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="checkbox"
                        checked={task.status === 'Complete'}
                        readOnly
                        className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${task.status === 'Complete' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">Due {formatDate(task.dueDate)}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-700' :
                        task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Budget Overview */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Spent</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(project.budgetSpent)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Budget</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(project.budgetEstimated)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className={`h-2 rounded-full ${
                          (project.budgetSpent / project.budgetEstimated) > 0.9 ? 'bg-red-500' :
                          (project.budgetSpent / project.budgetEstimated) > 0.75 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((project.budgetSpent / project.budgetEstimated) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500">Remaining</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(project.budgetEstimated - project.budgetSpent)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              {client && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client</h2>
                  <Link href={`/clients/${client.id}`} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                      {client.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-brand-500">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </Link>
                </div>
              )}

              {/* Quick Actions */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Add Selection</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Generate Invoice</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Share with Client</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">{projectBoards.length} selection boards</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Board
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectBoards.map((board) => (
                <div
                  key={board.id}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{board.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        board.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        board.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {board.status ?? 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{board.itemCount ?? board.items.length} items • {formatCurrency(board.totalValue ?? 0)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Updated {formatDate(board.lastUpdated ?? board.updatedAt)}</span>
                      <button className="text-brand-500 hover:text-brand-600 text-sm font-medium">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(project.budgetEstimated)}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Spent</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(project.budgetSpent)}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(project.budgetEstimated - project.budgetSpent)}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">% Used</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((project.budgetSpent / project.budgetEstimated) * 100)}%
                </p>
              </div>
            </div>

            {/* Budget by Category */}
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Budget by Category</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Budgeted</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {budgetCategories.map((cat) => (
                    <tr key={cat.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{formatCurrency(cat.budgeted)}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{formatCurrency(cat.spent)}</td>
                      <td className="px-6 py-4">
                        <span className={cat.budgeted - cat.spent < 0 ? 'text-red-600' : 'text-green-600'}>
                          {formatCurrency(cat.budgeted - cat.spent)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                              className={`h-2 rounded-full ${
                                (cat.spent / cat.budgeted) > 1 ? 'bg-red-500' :
                                (cat.spent / cat.budgeted) > 0.9 ? 'bg-amber-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((cat.spent / cat.budgeted) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{Math.round((cat.spent / cat.budgeted) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">{projectTasks.length} tasks</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>

            {/* Timeline View */}
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {projectTasks.map((task, index) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          task.status === 'Complete' ? 'bg-green-100 text-green-600' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {task.status === 'Complete' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        {index < projectTasks.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${
                            task.status === 'Complete' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            task.priority === 'High' ? 'bg-red-100 text-red-700' :
                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-400">Due: {formatDate(task.dueDate)}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            task.status === 'Complete' ? 'bg-green-100 text-green-700' :
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Documents</h3>
            <p className="text-gray-500 mb-4">Store contracts, drawings, photos, and other project files</p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
              Upload Document
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
