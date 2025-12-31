'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { KPIBar } from '@/components/common/KPIBar';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const reportKPIs = [
  {
    label: "Total Revenue (YTD)",
    value: 563000,
    change: "+12%",
    changeType: "positive" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    label: "Active Projects",
    value: 8,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    label: "Total Clients",
    value: 24,
    change: "+3 new",
    changeType: "positive" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    label: "Avg. Project Value",
    value: 35750,
    change: "+8%",
    changeType: "positive" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400"
  }
];

// Mock Data
const projectsByStatus = [
  { status: 'Active', count: 8 },
  { status: 'Completed', count: 24 },
  { status: 'On Hold', count: 2 },
  { status: 'Planning', count: 4 },
];

const revenueByClient = [
  { client: 'Mitchell', revenue: 45000 },
  { client: 'Wong', revenue: 38000 },
  { client: 'Henderson', revenue: 32000 },
  { client: 'Chen', revenue: 28000 },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 28000 },
  { month: 'Feb', revenue: 32000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 35000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 48000 },
  { month: 'Jul', revenue: 52000 },
  { month: 'Aug', revenue: 45000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 62000 },
  { month: 'Nov', revenue: 55000 },
  { month: 'Dec', revenue: 68000 },
];

export default function ReportsPage() {
  // Pie Chart Options
  const pieOptions: ApexOptions = {
    colors: ['#465fff', '#7592ff', '#c2d1ff', '#dde9ff'],
    labels: projectsByStatus.map((p) => p.status),
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Projects',
              formatter: () => projectsByStatus.reduce((acc, p) => acc + p.count, 0).toString(),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: 'Outfit',
      fontSize: '14px',
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };
  const pieSeries = projectsByStatus.map((p) => p.count);

  // Bar Chart Options
  const barOptions: ApexOptions = {
    colors: ['#465fff'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `$${(val / 1000).toFixed(0)}K`,
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories: revenueByClient.map((r) => r.client),
      labels: {
        formatter: (val: string) => `$${(Number(val) / 1000).toFixed(0)}K`,
        style: {
          fontFamily: 'Outfit',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Outfit',
        },
      },
    },
    grid: {
      borderColor: '#e5e7eb',
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  };
  const barSeries = [
    {
      name: 'Revenue',
      data: revenueByClient.map((r) => r.revenue),
    },
  ];

  // Line Chart Options
  const lineOptions: ApexOptions = {
    colors: ['#465fff'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: monthlyRevenue.map((m) => m.month),
      labels: {
        style: {
          fontFamily: 'Outfit',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${(val / 1000).toFixed(0)}K`,
        style: {
          fontFamily: 'Outfit',
        },
      },
    },
    grid: {
      borderColor: '#e5e7eb',
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  };
  const lineSeries = [
    {
      name: 'Revenue',
      data: monthlyRevenue.map((m) => m.revenue),
    },
  ];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">Business analytics and insights</p>
        </div>

        {/* KPI Bar */}
        <KPIBar items={reportKPIs} />

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Projects by Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Projects by Status
            </h3>
            <div className="flex justify-center">
              <ReactApexChart options={pieOptions} series={pieSeries} type="donut" height={300} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {projectsByStatus.map((p, idx) => (
                <div key={p.status} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pieOptions.colors?.[idx] }}
                  ></span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {p.status}: {p.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Client */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Revenue by Client
            </h3>
            <ReactApexChart options={barOptions} series={barSeries} type="bar" height={300} />
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue Trend
          </h3>
          <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={350} />
        </div>
      </div>
    </PageWrapper>
  );
}
