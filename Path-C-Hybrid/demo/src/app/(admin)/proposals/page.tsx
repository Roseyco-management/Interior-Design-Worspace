'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { mockProposals, Proposal } from '@/data/mockData';

function TaxJarBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full">
      <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
      </svg>
      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">TaxJar Calculated</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Proposal['status'] }) {
  const statusConfig = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft' },
    sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent' },
    viewed: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Viewed' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Accepted' },
    declined: { bg: 'bg-red-100', text: 'text-red-700', label: 'Declined' },
  };

  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

function ProposalRow({ proposal, onClick }: { proposal: Proposal; onClick: () => void }) {
  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(proposal.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

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
          <p className="font-medium text-gray-900 dark:text-white">{proposal.number}</p>
          <p className="text-sm text-gray-500">{proposal.project}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-900 dark:text-white">{proposal.client}</p>
      </td>
      <td className="px-6 py-4">
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">${proposal.total.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Tax: ${proposal.taxAmount.toLocaleString()}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={proposal.status} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
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

function ProposalDetail({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{proposal.number}</h2>
              <p className="text-sm text-gray-500">{proposal.project}</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Client Info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium text-gray-900 dark:text-white">{proposal.client}</p>
            </div>
            <StatusBadge status={proposal.status} />
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Line Items</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {proposal.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white">{item.description}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">${item.rate.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${proposal.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Tax ({proposal.taxRate}%)</span>
                  <TaxJarBadge />
                </div>
                <span className="text-gray-900 dark:text-white">${proposal.taxAmount.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">${proposal.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Tax Breakdown Info */}
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">TaxJar Integration</h4>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  Sales tax calculated automatically based on {proposal.taxJurisdiction || 'client location'}.
                  Includes state, county, and local tax rates.
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
            {proposal.status === 'draft' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send to Client
              </button>
            )}
            {proposal.status === 'accepted' && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Create Invoice
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProposalsPage() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProposals = mockProposals.filter(proposal => {
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    const matchesSearch =
      proposal.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPending = mockProposals.filter(p => p.status === 'sent' || p.status === 'viewed').reduce((sum, p) => sum + p.total, 0);
  const totalAccepted = mockProposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + p.total, 0);

  return (
    <PageWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Proposals</h1>
          <p className="text-gray-500 dark:text-gray-400">Create and manage client proposals</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Proposal
        </button>
      </div>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Total Proposals</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockProposals.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Pending Value</p>
            <p className="text-2xl font-bold text-blue-600">${totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm text-gray-500">Accepted Value</p>
            <p className="text-2xl font-bold text-emerald-600">${totalAccepted.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
              </svg>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">TaxJar</p>
            </div>
            <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Auto Tax Calc</p>
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
                  placeholder="Search proposals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'draft', 'sent', 'viewed', 'accepted', 'declined'].map(status => (
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {filteredProposals.map(proposal => (
                    <ProposalRow
                      key={proposal.id}
                      proposal={proposal}
                      onClick={() => setSelectedProposal(proposal)}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredProposals.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">No proposals found</p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProposal && (
          <ProposalDetail
            proposal={selectedProposal}
            onClose={() => setSelectedProposal(null)}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
