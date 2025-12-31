'use client';

import PageWrapper from '@/components/common/PageWrapper';
import DesignMetrics from '@/components/dashboard/DesignMetrics';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import ActiveProjects from '@/components/dashboard/ActiveProjects';
import RevenueChart from '@/components/dashboard/RevenueChart';

export default function Dashboard() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here&apos;s your interior design business overview.</p>
        </div>

        {/* Metric Cards */}
        <DesignMetrics />

        {/* Middle Row: Deadlines, Activity, and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingDeadlines />
          <RecentActivity />
          <QuickActions />
        </div>

        {/* Bottom Row: Active Projects and Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveProjects />
          <RevenueChart />
        </div>
      </div>
    </PageWrapper>
  );
}
