import type { Metadata } from "next";
import DesignMetrics from "@/components/dashboard/DesignMetrics";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RevenueChart from "@/components/dashboard/RevenueChart";

export const metadata: Metadata = {
  title: "Dashboard | AF Designs - Interior Design Management",
  description: "Interior design business dashboard with project metrics and revenue tracking",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here&apos;s your interior design business overview.</p>
      </div>

      {/* Metric Cards */}
      <DesignMetrics />

      {/* Middle Row: Deadlines and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines />
        <RecentActivity />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
}
