'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { mockInvoices, Invoice } from '@/data/mockData';

function QuickBooksBadge({ synced }: { synced: boolean }) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
      synced
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }`}>
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>{synced ? 'QB Synced' : 'Pending Sync'}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Invoice['status'] }) {
  const statusConfig = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft' },
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
    paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Paid' },
    overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Overdue' },
  };

  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

function InvoiceRow({ invoice, onClick }: { invoice: Invoice; onClick: () => void }) {
  const dueDate = new Date(invoice.dueDate);
  const isOverdue = invoice.status === 'overdue';
  const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{invoice.number}</p>
          <p className="text-sm text-gray-500">{invoice.client}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-900 dark:text-white">{invoice.project}</p>
      </td>
      <td className="px-6 py-4 text-right">
        <p className="font-semibold text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={invoice.status} />
      </td>
      <td className="px-6 py-4 text-sm">
        <div className={isOverdue ? 'text-red-600' : 'text-gray-500'}>
          <p>{dueDate.toLocaleDateString()}</p>
          {invoice.status === 'pending' && (
            <p className="text-xs">
              {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Due today'}
            </p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <QuickBooksBadge synced={invoice.quickbooksSynced} />
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </td>
    </motion.tr>
  );
}

function InvoiceDetail({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{invoice.number}</h2>
              <p className="text-sm text-gray-500">{invoice.project}</p>
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

        {/* Content */}
        <div className="p-6">
          {/* Status & QuickBooks */}
          <div className="flex items-center justify-between mb-6">
            <StatusBadge status={invoice.status} />
            <QuickBooksBadge synced={invoice.quickbooksSynced} />
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Client</span>
              <span className="font-medium text-gray-900 dark:text-white">{invoice.client}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Description</span>
              <span className="font-medium text-gray-900 dark:text-white">{invoice.description}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Issue Date</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-500">Due Date</span>
              <span className={`font-medium ${invoice.status === 'overdue' ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                {new Date(invoice.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
          </div>

          {/* QuickBooks Info */}
          <div className={`mt-4 p-4 rounded-lg ${
            invoice.quickbooksSynced
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
          }`}>
            <div className="flex items-start gap-3">
              <svg className={`w-5 h-5 mt-0.5 ${invoice.quickbooksSynced ? 'text-emerald-600' : 'text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {invoice.quickbooksSynced ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <div>
                <h4 className={`font-medium text-sm ${invoice.quickbooksSynced ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}`}>
                  {invoice.quickbooksSynced ? 'Synced to QuickBooks' : 'Pending QuickBooks Sync'}
                </h4>
                <p className={`text-sm mt-1 ${invoice.quickbooksSynced ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {invoice.quickbooksSynced
                    ? 'This invoice is reflected in your QuickBooks account.'
                    : 'This invoice will sync to QuickBooks on the next scheduled sync.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between">
          <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Download PDF
          </button>
          <div className="flex gap-2">
            {invoice.status === 'pending' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Reminder
              </button>
            )}
            {invoice.status === 'pending' || invoice.status === 'overdue' && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Record Payment
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalOutstanding = mockInvoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);
  const overdueCount = mockInvoices.filter(i => i.status === 'overdue').length;
  const syncedCount = mockInvoices.filter(i => i.quickbooksSynced).length;

  return (
    <PageWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-400">Track payments and QuickBooks sync status</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync to QuickBooks
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Outstanding</p>
            <p className="text-2xl font-bold text-amber-600">${totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Paid (This Month)</p>
            <p className="text-2xl font-bold text-emerald-600">${totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">QuickBooks</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">{syncedCount}/{mockInvoices.length}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'draft', 'pending', 'paid', 'overdue'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Table */}
      <FadeIn delay={0.3}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QuickBooks</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {filteredInvoices.map(invoice => (
                    <InvoiceRow
                      key={invoice.id}
                      invoice={invoice}
                      onClick={() => setSelectedInvoice(invoice)}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
              <p className="text-gray-500">No invoices found</p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
