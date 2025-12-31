'use client';

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const revenueData = [
  { month: 'Jan', amount: 28000 },
  { month: 'Feb', amount: 35000 },
  { month: 'Mar', amount: 38000 },
  { month: 'Apr', amount: 32000 },
  { month: 'May', amount: 45000 },
  { month: 'Jun', amount: 48000 },
  { month: 'Jul', amount: 52000 },
  { month: 'Aug', amount: 44000 },
  { month: 'Sep', amount: 58000 },
  { month: 'Oct', amount: 62000 },
  { month: 'Nov', amount: 55000 },
  { month: 'Dec', amount: 68000 }
];

export default function RevenueChart() {
  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: revenueData.map(d => d.month),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${(val / 1000).toFixed(0)}K`,
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Revenue",
      data: revenueData.map(d => d.amount),
    },
  ];

  // Calculate total revenue for the year
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.amount, 0);
  const avgMonthlyRevenue = totalRevenue / 12;

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 12 months performance</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg. ${avgMonthlyRevenue.toLocaleString()}/mo
          </p>
        </div>
      </div>
      <div className="p-5">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </div>
    </div>
  );
}
