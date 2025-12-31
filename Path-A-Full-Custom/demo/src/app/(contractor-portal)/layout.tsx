'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ContractorSidebar } from '@/components/contractor-portal';
import { PortalProfileDropdown } from '@/components/portal-shared';

export default function ContractorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ContractorSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Page title - hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Contractor Portal</h1>
              </div>

              {/* Mobile logo - shown only on mobile */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AF</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Contractor Portal</span>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors dark:hover:bg-amber-900/20 dark:hover:text-amber-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>

                {/* User info with dropdown */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mike R.</span>
                  <PortalProfileDropdown
                    user={{ name: 'Mike Rodriguez', role: 'Installer', initials: 'MR' }}
                    accentColor="amber"
                    currentPortal="contractor"
                  />
                </div>

                {/* Mobile profile dropdown */}
                <div className="sm:hidden">
                  <PortalProfileDropdown
                    user={{ name: 'Mike Rodriguez', role: 'Installer', initials: 'MR' }}
                    accentColor="amber"
                    currentPortal="contractor"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 mt-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 AF Designs. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/contractor-portal/help" className="text-sm text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400">
                  Help
                </Link>
                <Link href="/" className="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                  Back to Main Site
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
