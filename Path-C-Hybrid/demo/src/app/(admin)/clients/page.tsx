'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper, FadeIn, StaggerContainer, StaggerItem } from '@/components/hybrid/PageWrapper';
import { HouzzLink } from '@/components/hybrid/HouzzLink';
import { mockClients, mockProjects, Client } from '@/data/mockData';

function ClientStatusBadge({ status }: { status: Client['status'] }) {
  const statusConfig = {
    active: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    lead: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-300' },
  };

  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ClientCard({ client, onClick }: { client: Client; onClick: () => void }) {
  const clientProjects = mockProjects.filter(p => p.client === client.name);
  const initials = client.name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{client.name}</h3>
            <ClientStatusBadge status={client.status} />
          </div>
          <p className="text-sm text-gray-500 truncate">{client.email}</p>
          <p className="text-sm text-gray-400">{client.phone}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500">Projects: </span>
            <span className="font-medium text-gray-900 dark:text-white">{clientProjects.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Total Value: </span>
            <span className="font-medium text-gray-900 dark:text-white">${client.totalValue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {client.lastContact && (
        <div className="mt-3 text-xs text-gray-400">
          Last contact: {new Date(client.lastContact).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}

function ClientDetail({ client, onClose }: { client: Client; onClose: () => void }) {
  const clientProjects = mockProjects.filter(p => p.client === client.name);
  const initials = client.name.split(' ').map(n => n[0]).join('');

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
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{client.name}</h2>
              <ClientStatusBadge status={client.status} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{client.email}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-900 dark:text-white">{client.phone}</p>
            </div>
            {client.address && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 col-span-2">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="font-medium text-gray-900 dark:text-white">{client.address}</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{clientProjects.length}</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">${client.totalValue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Value</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {clientProjects.reduce((sum, p) => sum + p.selectionsCount, 0)}
              </p>
              <p className="text-sm text-gray-500">Selections</p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Projects</h3>
            <div className="space-y-3">
              {clientProjects.map(project => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      project.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {project.status}
                    </span>
                    <HouzzLink href={project.houzzUrl} size="sm">
                      Selections
                    </HouzzLink>
                  </div>
                </div>
              ))}
              {clientProjects.length === 0 && (
                <p className="text-center text-gray-500 py-4">No projects yet</p>
              )}
            </div>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Notes</h3>
              <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                {client.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between">
          <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Edit Client
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Send Message
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Project
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredClients = mockClients.filter(client => {
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const leadClients = mockClients.filter(c => c.status === 'lead').length;
  const totalValue = mockClients.reduce((sum, c) => sum + c.totalValue, 0);

  return (
    <PageWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your client relationships</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockClients.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold text-emerald-600">{activeClients}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New Leads</p>
                <p className="text-2xl font-bold text-blue-600">{leadClients}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalValue / 1000).toFixed(0)}k</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  placeholder="Search clients..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'lead', 'completed', 'inactive'].map(status => (
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
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Client Grid */}
      <FadeIn delay={0.3}>
        <StaggerContainer className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          <AnimatePresence>
            {filteredClients.map(client => (
              <StaggerItem key={client.id}>
                <ClientCard client={client} onClick={() => setSelectedClient(client)} />
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500">No clients found</p>
          </div>
        )}
      </FadeIn>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetail
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
