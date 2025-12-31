'use client';

import React from 'react';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { HouzzCard, HouzzLink } from '@/components/hybrid/HouzzLink';
import { dashboardStats, mockProjects, mockInvoices } from '@/data/mockData';
import Link from 'next/link';

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}) {
  const changeColors = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-100'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: typeof mockProjects[0] }) {
  const statusColors = {
    active: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-emerald-100 text-emerald-700',
    design: 'bg-purple-100 text-purple-700',
    selections: 'bg-indigo-100 text-indigo-700',
    ordering: 'bg-orange-100 text-orange-700',
    installation: 'bg-amber-100 text-amber-700',
    complete: 'bg-green-100 text-green-700'
  };

  const progress = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
          <p className="text-sm text-gray-500">{project.clientName}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Budget Progress</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Selections: </span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {project.approvedSelectionsCount}/{project.selectionsCount} approved
          </span>
        </div>
        <HouzzLink href={project.houzzUrl} size="sm">
          View Selections
        </HouzzLink>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({
  title,
  description,
  time,
  type
}: {
  title: string;
  description: string;
  time: string;
  type: 'invoice' | 'proposal' | 'message' | 'project';
}) {
  const icons = {
    invoice: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    proposal: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    message: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    project: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )
  };

  const colors = {
    invoice: 'bg-emerald-100 text-emerald-600',
    proposal: 'bg-blue-100 text-blue-600',
    message: 'bg-purple-100 text-purple-600',
    project: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[type]}`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
    </div>
  );
}

export default function Dashboard() {
  const activeProjects = mockProjects.filter(p => p.status !== 'complete');
  const pendingInvoices = mockInvoices.filter(i => i.status === 'pending' || i.status === 'overdue');
  const overdueAmount = mockInvoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here is an overview of your design business.</p>
      </div>

      {/* Metrics Grid */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Active Projects"
            value={String(dashboardStats.activeProjects)}
            change="+2 this month"
            changeType="positive"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            }
          />
          <MetricCard
            title="Pending Actions"
            value={String(dashboardStats.pendingActions)}
            change="Needs attention"
            changeType="negative"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <MetricCard
            title="Outstanding Balance"
            value={`$${overdueAmount.toLocaleString()}`}
            change={pendingInvoices.length > 0 ? `${pendingInvoices.length} invoices` : 'All paid'}
            changeType={pendingInvoices.length > 0 ? 'negative' : 'positive'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <MetricCard
            title="This Month Revenue"
            value={`$${dashboardStats.thisMonthRevenue.toLocaleString()}`}
            change="+18% vs last month"
            changeType="positive"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Projects */}
        <FadeIn delay={0.2} className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h2>
              <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>
            <div className="grid gap-4">
              {activeProjects.slice(0, 3).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Houzz Quick Links */}
        <FadeIn delay={0.3}>
          <HouzzCard
            title="Houzz Pro"
            description="Selection boards & product sourcing"
          >
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between py-2 border-b border-purple-100">
                <span className="text-sm text-gray-600">Active Selection Boards</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-purple-100">
                <span className="text-sm text-gray-600">Pending Approvals</span>
                <span className="font-semibold text-purple-600">5</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Products Clipped This Week</span>
                <span className="font-semibold text-gray-900">24</span>
              </div>
            </div>
          </HouzzCard>
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn delay={0.4} className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <div>
              <ActivityItem
                title="Invoice Paid"
                description="Sarah Johnson paid $22,000 for Living Room Update"
                time="2h ago"
                type="invoice"
              />
              <ActivityItem
                title="Proposal Viewed"
                description="Emily Rodriguez viewed Full Home Design Retainer"
                time="4h ago"
                type="proposal"
              />
              <ActivityItem
                title="New Message"
                description="Michael Chen sent a message about Master Suite"
                time="6h ago"
                type="message"
              />
              <ActivityItem
                title="Selections Approved"
                description="Kitchen backsplash tiles approved by Sarah Johnson"
                time="1d ago"
                type="project"
              />
              <ActivityItem
                title="Invoice Sent"
                description="$20,000 invoice sent to Michael Chen"
                time="2d ago"
                type="invoice"
              />
            </div>
          </div>
        </FadeIn>

        {/* Quick Actions */}
        <FadeIn delay={0.5}>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/clients"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Add New Client</span>
              </Link>
              <Link
                href="/proposals"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Create Proposal</span>
              </Link>
              <Link
                href="/materials"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Add Material</span>
              </Link>
              <Link
                href="/invoices"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Send Invoice</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageWrapper>
  );
}
