'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { KPIBar } from '@/components/common/KPIBar';
import { products, vendors, formatCurrency, formatDate } from '@/lib/mock-data';
import Link from 'next/link';
import { useState } from 'react';

const materialsKPIs = [
  {
    label: "Total Items",
    value: 156,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    label: "Price Increases",
    value: 8,
    change: "this month",
    changeType: "negative" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400"
  },
  {
    label: "Price Drops",
    value: 3,
    change: "this month",
    changeType: "positive" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    label: "Vendors",
    value: 12,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400"
  }
];

type ProductCategory = 'All' | 'Lighting' | 'Plumbing' | 'Tile' | 'Furniture' | 'Appliances' | 'Countertops' | 'Hardware' | 'Flooring';

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ProductCategory>('All');
  const [filterVendor, setFilterVendor] = useState<string>('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesVendor = filterVendor === 'All' || product.vendorId === filterVendor;
    return matchesSearch && matchesCategory && matchesVendor;
  });

  const categories: ProductCategory[] = ['All', 'Lighting', 'Plumbing', 'Tile', 'Furniture', 'Appliances', 'Countertops', 'Hardware', 'Flooring'];

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Materials Library</h1>
            <p className="text-gray-500 dark:text-gray-400">Your product catalog with real-time price tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/vendors"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            >
              Manage Vendors
            </Link>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <KPIBar items={materialsKPIs} />

        {/* Price Update Alert */}
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-amber-800 dark:text-amber-200">Price Updates Detected</p>
            <p className="text-sm text-amber-600 dark:text-amber-300">
              {products.filter(p => p.priceChangePercent).length} products have price changes since last check
            </p>
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">
            Review All
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as ProductCategory)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterVendor}
              onChange={(e) => setFilterVendor(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="All">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/materials/${product.id}`}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    `;
                  }}
                />
                {/* Price Change Badge */}
                {product.priceChangePercent && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    product.priceChangePercent > 0
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {product.priceChangePercent > 0 ? '↑' : '↓'} {Math.abs(product.priceChangePercent)}%
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 dark:bg-gray-900/90 dark:text-gray-300">
                  {product.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 mb-2">{product.vendorName}</p>
                <p className="text-xs text-gray-400 mb-3">SKU: {product.sku}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                      {product.category === 'Tile' || product.category === 'Countertops' || product.category === 'Flooring' ? (
                        <span className="text-xs font-normal text-gray-500">/sq ft</span>
                      ) : null}
                    </p>
                    {product.previousPrice && (
                      <p className="text-xs text-gray-400 line-through">{formatCurrency(product.previousPrice)}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Updated</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{formatDate(product.lastUpdated)}</p>
                  </div>
                </div>

                {product.usedInProjects > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500">
                      Used in <span className="font-medium text-brand-500">{product.usedInProjects} projects</span>
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Results count */}
        <div className="text-center text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </PageWrapper>
  );
}
