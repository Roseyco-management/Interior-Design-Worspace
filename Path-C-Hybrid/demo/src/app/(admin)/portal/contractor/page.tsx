'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper, FadeIn, StaggerContainer, StaggerItem } from '@/components/hybrid/PageWrapper';
import { mockProjects, mockContractorTasks, ContractorTask } from '@/data/mockData';

function TaskCard({ task }: { task: ContractorTask }) {
  const [isComplete, setIsComplete] = useState(task.status === 'completed');

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50 dark:bg-red-900/10',
    medium: 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/10',
    low: 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/10',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-600',
    'in-progress': 'bg-orange-100 text-orange-700',
    completed: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-l-4 ${priorityColors[task.priority]} overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => setIsComplete(!isComplete)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              isComplete
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300 hover:border-orange-500'
            }`}
          >
            {isComplete && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-semibold ${isComplete ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                {task.task}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{task.project}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-600' :
                task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {task.priority} priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectAccessCard({ project }: { project: typeof mockProjects[0] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.address}</p>
        </div>
        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          Active
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Client</span>
          <span className="font-medium text-gray-900 dark:text-white">{project.client}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Start Date</span>
          <span className="font-medium text-gray-900 dark:text-white">{new Date(project.startDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
          View Details
        </button>
        <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ScheduleItem({ time, title, location }: { time: string; title: string; location: string }) {
  return (
    <div className="flex gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="text-orange-600 font-semibold text-sm w-16">{time}</div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
      </div>
    </div>
  );
}

export default function ContractorPortalPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasks = mockContractorTasks.filter(task =>
    filter === 'all' || task.status === filter
  );

  const pendingCount = mockContractorTasks.filter(t => t.status === 'pending').length;
  const inProgressCount = mockContractorTasks.filter(t => t.status === 'in-progress').length;
  const completedCount = mockContractorTasks.filter(t => t.status === 'completed').length;

  const activeProjects = mockProjects.filter(p => p.status === 'active').slice(0, 2);

  return (
    <PageWrapper>
      {/* Orange Theme Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contractor Portal</h1>
            <p className="text-orange-100">Welcome back, Mike&apos;s Construction</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-orange-100 text-sm">Active Projects</p>
            <p className="text-3xl font-bold">{activeProjects.length}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-orange-100 text-sm">Pending Tasks</p>
            <p className="text-3xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-orange-100 text-sm">In Progress</p>
            <p className="text-3xl font-bold">{inProgressCount}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-orange-100 text-sm">Completed</p>
            <p className="text-3xl font-bold">{completedCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks - Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Tasks</h2>
                <div className="flex gap-2">
                  {(['all', 'pending', 'in-progress', 'completed'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filter === status
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <StaggerContainer className="space-y-3">
                {filteredTasks.map(task => (
                  <StaggerItem key={task.id}>
                    <TaskCard task={task} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p>No tasks found</p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Assigned Projects */}
          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assigned Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProjects.map(project => (
                  <ProjectAccessCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Today&apos;s Schedule</h3>
                <span className="text-sm text-orange-600 font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="space-y-1">
                <ScheduleItem
                  time="8:00 AM"
                  title="Kitchen Cabinet Delivery"
                  location="Miller Residence"
                />
                <ScheduleItem
                  time="10:30 AM"
                  title="Site Walkthrough"
                  location="Downtown Loft"
                />
                <ScheduleItem
                  time="2:00 PM"
                  title="Tile Installation"
                  location="Miller Residence"
                />
              </div>
            </div>
          </FadeIn>

          {/* Quick Actions */}
          <FadeIn delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium">Log Hours</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Upload Photos</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">Message Designer</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Report Issue</span>
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Notifications */}
          <FadeIn delay={0.5}>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 dark:text-orange-300">Material Delivery Update</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    Kitchen cabinets arriving tomorrow between 8-10 AM at Miller Residence.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageWrapper>
  );
}
