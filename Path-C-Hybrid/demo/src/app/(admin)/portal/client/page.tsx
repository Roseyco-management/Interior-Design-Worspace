'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { HouzzCard, HouzzLink } from '@/components/hybrid/HouzzLink';
import { mockMessages, mockInvoices, mockProjects, Message } from '@/data/mockData';

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isOwn
            ? 'bg-emerald-600 text-white rounded-br-md'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            {message.sender}
          </p>
        )}
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-emerald-200' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: typeof mockProjects[0] }) {
  const statusColors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
    design: 'bg-purple-100 text-purple-700',
    selections: 'bg-indigo-100 text-indigo-700',
    ordering: 'bg-orange-100 text-orange-700',
    installation: 'bg-amber-100 text-amber-700',
    complete: 'bg-green-100 text-green-700',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.address}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Started {new Date(project.startDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="text-sm">
          <span className="text-gray-500">Selections: </span>
          <span className="font-medium text-gray-900 dark:text-white">{project.selectionsCount} items</span>
        </div>
        <HouzzLink href={project.houzzUrl}>
          View Selection Board
        </HouzzLink>
      </div>
    </div>
  );
}

function InvoiceRow({ invoice }: { invoice: typeof mockInvoices[0] }) {
  const statusColors = {
    paid: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    overdue: 'bg-red-100 text-red-700',
    draft: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{invoice.number}</p>
        <p className="text-sm text-gray-500">{invoice.description}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</p>
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
          {invoice.status}
        </span>
      </div>
    </div>
  );
}

export default function ClientPortalPage() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const clientProjects = mockProjects.slice(0, 2); // Mock: client sees their projects
  const clientInvoices = mockInvoices.filter(inv => inv.status !== 'draft').slice(0, 3);
  const pendingBalance = clientInvoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <PageWrapper>
      {/* Green Theme Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">JD</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Jennifer!</h1>
            <p className="text-emerald-100">Your design journey is 65% complete</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-emerald-100 text-sm">Active Projects</p>
            <p className="text-3xl font-bold">{clientProjects.length}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-emerald-100 text-sm">Pending Approvals</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-emerald-100 text-sm">Outstanding Balance</p>
            <p className="text-3xl font-bold">${pendingBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages - Main Column */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[500px] flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
                  AF
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AF Designs Team</h3>
                  <p className="text-xs text-emerald-600">Usually replies within an hour</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.sender === 'You'}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">View Documents</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="font-medium">Make a Payment</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Schedule Meeting</span>
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Houzz Integration */}
          <FadeIn delay={0.3}>
            <HouzzCard className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Your Selection Boards</h3>
                  <p className="text-xs text-purple-600">View on Houzz Pro</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Access your curated selection boards to review and approve items for your project.
              </p>
              <HouzzLink href="https://pro.houzz.com" className="w-full justify-center">
                Open Selection Boards
              </HouzzLink>
            </HouzzCard>
          </FadeIn>
        </div>
      </div>

      {/* Projects Section */}
      <FadeIn delay={0.4}>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Invoices Section */}
      <FadeIn delay={0.5}>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            {clientInvoices.map(invoice => (
              <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </div>
        </div>
      </FadeIn>
    </PageWrapper>
  );
}
