'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import { products, projects, selectionBoards, formatCurrency, formatDate, Product } from '@/lib/mock-data';
import PageWrapper from '@/components/common/PageWrapper';
import { use } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Extended mock data for the detail page
interface ExtendedProduct extends Product {
  finish?: string;
  vendorUrl: string;
  priceHistory: { date: string; price: number }[];
  notes: string;
}

// Generate mock extended data for products
function getExtendedProductData(product: Product): ExtendedProduct {
  const basePrice = product.previousPrice || product.price;
  const months = ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

  // Generate price history based on actual product data
  const priceHistory = months.map((date, index) => {
    if (index < 4) {
      return { date, price: basePrice };
    } else if (index === 4) {
      return { date, price: product.previousPrice || basePrice };
    } else {
      return { date, price: product.price };
    }
  });

  return {
    ...product,
    finish: product.category === 'Lighting' ? 'Antique Brass' :
            product.category === 'Plumbing' ? 'Polished Chrome' :
            product.category === 'Hardware' ? 'Satin Brass' : undefined,
    vendorUrl: `https://${product.vendorName.toLowerCase().replace(/[^a-z]/g, '')}.com/product/${product.sku}`,
    priceHistory,
    notes: product.usedInProjects > 0
      ? `Great for various projects. Used in ${product.usedInProjects} projects so far. Order ${product.leadTime.includes('6') || product.leadTime.includes('8') || product.leadTime.includes('10') ? '2-3 weeks' : '1 week'} early due to lead time.`
      : 'No notes yet. Add notes to help track important details about this product.',
  };
}

// Get projects using this material
function getProjectsUsingMaterial(productId: string) {
  const projectsUsingMaterial: { project: string; board: string; client: string }[] = [];

  selectionBoards.forEach(board => {
    const hasProduct = board.items.some(item => item.productId === productId);
    if (hasProduct) {
      const project = projects.find(p => p.id === board.projectId);
      if (project) {
        projectsUsingMaterial.push({
          project: project.name,
          board: board.name,
          client: project.clientName,
        });
      }
    }
  });

  return projectsUsingMaterial;
}

// Price Card Component
function PriceCard({ material }: { material: ExtendedProduct }) {
  const priceChange = material.priceChangePercent;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(material.price)}
        </span>
        {(material.category === 'Tile' || material.category === 'Countertops' || material.category === 'Flooring') && (
          <span className="text-sm text-gray-500">/sq ft</span>
        )}
      </div>

      {material.previousPrice && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-400 line-through">
            was {formatCurrency(material.previousPrice)}
          </span>
          {priceChange && (
            <span className={`text-sm font-medium ${priceChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {priceChange > 0 ? '↑' : '↓'} {priceChange > 0 ? '+' : ''}{priceChange}%
            </span>
          )}
        </div>
      )}

      {!material.previousPrice && !priceChange && (
        <div className="mb-3">
          <span className="text-sm text-gray-500">No change</span>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Updated: {formatDate(material.lastUpdated)}
      </div>
    </div>
  );
}

// Price History Chart Component
function PriceHistoryChart({ data }: { data: { date: string; price: number }[] }) {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 300,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    colors: ['#465FFF'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    markers: {
      size: 5,
      colors: ['#465FFF'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
    xaxis: {
      type: 'category',
      categories: data.map(d => {
        const [, month] = d.date.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[parseInt(month) - 1];
      }),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#6B7280'],
        },
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: 'Price',
      data: data.map(d => d.price),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price History</h2>
      <div className="w-full">
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

// Used In Projects Component
function UsedInProjects({ projects }: { projects: { project: string; board: string; client: string }[] }) {
  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Used In Projects</h2>
        <p className="text-gray-500 dark:text-gray-400">This material hasn&apos;t been used in any projects yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Used In Projects</h2>
      <ul className="space-y-3">
        {projects.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
            <span className="font-medium">{item.project}</span>
            <span className="text-gray-400">-</span>
            <span>{item.board}</span>
            <span className="text-gray-400 text-sm">({item.client})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Notes Section Component
function NotesSection({ initialNotes }: { initialNotes: string }) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Mock save - in real app this would call an API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        placeholder="Add notes about this product..."
      />
      <div className="flex items-center justify-end mt-3 gap-3">
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400">Notes saved!</span>
        )}
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

// Back Arrow Icon
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

// Main Page Component
export default function MaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Find the product by ID
  const baseProduct = products.find(p => p.id === id);

  if (!baseProduct) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The material you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Materials
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const material = getExtendedProductData(baseProduct);
  const projectsUsingMaterial = getProjectsUsingMaterial(material.id);

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Back button */}
        <Link
          href="/materials"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Materials
        </Link>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Price Change Badge */}
              {material.priceChangePercent && (
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium ${
                  material.priceChangePercent > 0
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {material.priceChangePercent > 0 ? '↑' : '↓'} {Math.abs(material.priceChangePercent)}%
                </div>
              )}
              {/* Placeholder for product image */}
              <div className="text-center">
                <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 dark:text-gray-500">{material.category}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{material.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{material.category} &bull; {material.vendorName}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">SKU: {material.sku}</p>
            </div>

            {/* Description */}
            {material.description && (
              <p className="text-gray-600 dark:text-gray-300">{material.description}</p>
            )}

            {/* Specs */}
            <div className="space-y-2">
              {material.dimensions && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Dimensions:</span>
                  <span className="text-gray-900 dark:text-white">{material.dimensions}</span>
                </div>
              )}
              {material.finish && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Finish:</span>
                  <span className="text-gray-900 dark:text-white">{material.finish}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Lead Time:</span>
                <span className="text-gray-900 dark:text-white">{material.leadTime}</span>
              </div>
            </div>

            {/* Price card */}
            <PriceCard material={material} />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={material.vendorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View on Vendor Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to Selection Board
              </button>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <PriceHistoryChart data={material.priceHistory} />

        {/* Used In Projects */}
        <UsedInProjects projects={projectsUsingMaterial} />

        {/* Notes */}
        <NotesSection initialNotes={material.notes} />
      </motion.div>
    </PageWrapper>
  );
}
