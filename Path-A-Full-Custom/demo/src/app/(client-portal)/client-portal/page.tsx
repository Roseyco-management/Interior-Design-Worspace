'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ClientPortalDashboard() {
  // Mock data for client view
  const project = {
    name: 'Modern Kitchen Renovation',
    status: 'Selections',
    progress: 45,
    designer: 'Amanda Foster',
    nextMilestone: 'Cabinet Selection Approval',
    nextMilestoneDate: '2024-02-15',
  };

  const pendingApprovals = [
    { id: '1', name: 'Kitchen Cabinet Selection', items: 5, dueDate: '2024-02-10' },
    { id: '2', name: 'Countertop Materials', items: 3, dueDate: '2024-02-12' },
  ];

  const recentMessages = [
    { id: '1', from: 'Amanda Foster', preview: 'I\'ve updated the lighting selections...', time: '2 hours ago', unread: true },
    { id: '2', from: 'Amanda Foster', preview: 'The countertop samples will arrive...', time: 'Yesterday', unread: false },
  ];

  const invoices = [
    { id: '1', number: 'INV-2024-001', amount: 15000, status: 'Paid', date: '2024-01-15' },
    { id: '2', number: 'INV-2024-002', amount: 8500, status: 'Due', date: '2024-02-01' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-emerald-100 mb-6">Here&apos;s an overview of your project progress</p>

        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-emerald-100 text-sm">Current Project</p>
              <h2 className="text-xl font-semibold">{project.name}</h2>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-emerald-100 text-sm">Status</p>
                <p className="font-medium">{project.status}</p>
              </div>
              <div>
                <p className="text-emerald-100 text-sm">Progress</p>
                <p className="font-medium">{project.progress}%</p>
              </div>
              <Link
                href="/client-portal/project"
                className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/client-portal/selections"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Review Selections</span>
        </Link>
        <Link
          href="/client-portal/messages"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Messages</span>
        </Link>
        <Link
          href="/client-portal/documents"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Documents</span>
        </Link>
        <Link
          href="/client-portal/invoices"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">Invoices</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <Link
                key={approval.id}
                href="/client-portal/selections"
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{approval.name}</p>
                  <p className="text-sm text-gray-500">{approval.items} items to review</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Due {approval.dueDate}</p>
                  <span className="text-emerald-600 text-sm font-medium">Review →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
            <Link href="/client-portal/messages" className="text-sm text-emerald-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <Link
                key={message.id}
                href="/client-portal/messages"
                className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                  message.unread
                    ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/20'
                    : 'border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-medium flex-shrink-0">
                  AF
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white">{message.from}</p>
                    <span className="text-xs text-gray-400">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                </div>
                {message.unread && (
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
          <Link href="/client-portal/invoices" className="text-sm text-emerald-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Invoice</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-4 font-medium text-gray-900 dark:text-white">{invoice.number}</td>
                  <td className="py-4 text-gray-500">{invoice.date}</td>
                  <td className="py-4 text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {invoice.status === 'Due' ? (
                      <button className="px-3 py-1 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600">
                        Pay Now
                      </button>
                    ) : (
                      <button className="text-sm text-emerald-600 hover:underline">
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Designer Contact */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg font-semibold">
              AF
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{project.designer}</p>
              <p className="text-sm text-gray-500">Your Project Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/client-portal/messages"
              className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50"
            >
              Send Message
            </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
