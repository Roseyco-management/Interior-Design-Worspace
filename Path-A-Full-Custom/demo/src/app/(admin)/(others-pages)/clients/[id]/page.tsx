'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { getClientById, getProjectsByClientId, formatCurrency, formatDate, invoices, proposals } from '@/lib/mock-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type TabType = 'overview' | 'projects' | 'financials' | 'documents' | 'notes';

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;
  const client = getClientById(clientId);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!client) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client not found</h2>
            <Link href="/clients" className="text-brand-500 hover:underline mt-2 inline-block">
              Back to Clients
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const clientProjects = getProjectsByClientId(clientId);
  const clientInvoices = invoices.filter(inv => inv.clientId === clientId);
  const clientProposals = proposals.filter(prop => prop.clientId === clientId);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'financials', label: 'Financials' },
    { id: 'documents', label: 'Documents' },
    { id: 'notes', label: 'Notes' },
  ];

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Lead: 'bg-blue-100 text-blue-700',
    Past: 'bg-gray-100 text-gray-700',
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link
              href="/clients"
              className="mt-1 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold">
                {client.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{client.name}</h1>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[client.status]}`}>
                    {client.status}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{client.email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-12 lg:ml-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
              Send Message
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
              Create Proposal
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
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
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{client.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{client.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{client.address}</p>
                  </div>
                  {client.preferredContact && (
                    <div>
                      <p className="text-sm text-gray-500">Preferred Contact</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{client.preferredContact}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
                  <Link href={`/projects?client=${clientId}`} className="text-sm text-brand-500 hover:underline">
                    View All
                  </Link>
                </div>
                {clientProjects.length > 0 ? (
                  <div className="space-y-3">
                    {clientProjects.slice(0, 3).map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                          <p className="text-sm text-gray-500">{project.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(project.budgetEstimated)}
                          </p>
                          <p className="text-sm text-gray-500">{project.progress}% complete</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No projects yet</p>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(client.totalSpent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{clientProjects.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Client Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(client.createdAt)}</p>
                  </div>
                  {client.lastContactDate && (
                    <div>
                      <p className="text-sm text-gray-500">Last Contact</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatDate(client.lastContactDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">New Project</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Create Proposal</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Send Email</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Schedule Meeting</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {clientProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <Link href={`/projects/${project.id}`} className="font-medium text-gray-900 dark:text-white hover:text-brand-500">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-brand-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatCurrency(project.budgetSpent)} / {formatCurrency(project.budgetEstimated)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.targetCompletion)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Total Billed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(clientInvoices.reduce((sum, inv) => sum + inv.total, 0))}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(clientInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0))}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatCurrency(clientInvoices.filter(inv => ['Sent', 'Overdue'].includes(inv.status)).reduce((sum, inv) => sum + inv.total, 0))}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Proposals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{clientProposals.length}</p>
              </div>
            </div>

            {/* Invoices */}
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Invoices</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {clientInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{invoice.number}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{invoice.projectName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{formatCurrency(invoice.total)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(invoice.dueDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Document Storage</h3>
            <p className="text-gray-500 mb-4">Store contracts, photos, and other project documents</p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
              Upload Document
            </button>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <textarea
                placeholder="Add a note about this client..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              ></textarea>
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                  Save Note
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-500 text-center">No notes yet. Add your first note above.</p>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
