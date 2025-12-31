'use client';

import React, { useState } from 'react';
import { PageWrapper, FadeIn } from '@/components/hybrid/PageWrapper';
import { mockMaterials, Material } from '@/data/mockData';

function PriceChangeBadge({ change }: { change: number }) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
        No change
      </span>
    );
  }

  const isIncrease = change > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
        isIncrease ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
      }`}
    >
      {isIncrease ? (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
      ${Math.abs(change).toLocaleString()}
    </span>
  );
}

function MaterialCard({ material }: { material: Material }) {
  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(material.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-white/90 rounded text-xs font-medium text-gray-600">
            {material.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{material.name}</h3>
            <p className="text-sm text-gray-500">{material.vendor}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${material.currentPrice.toLocaleString()}
            </span>
            {material.priceChange !== 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${material.previousPrice.toLocaleString()}
              </span>
            )}
          </div>
          <PriceChangeBadge change={material.priceChange} />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>SKU: {material.sku}</span>
          <span>{material.leadTime}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-400">
            Updated {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
          </span>
          <a
            href={material.vendorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            View on Vendor Site
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'increased' | 'decreased' | 'unchanged'>('all');

  const categories = ['all', ...new Set(mockMaterials.map(m => m.category))];

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;

    const matchesPriceFilter =
      priceFilter === 'all' ||
      (priceFilter === 'increased' && material.priceChange > 0) ||
      (priceFilter === 'decreased' && material.priceChange < 0) ||
      (priceFilter === 'unchanged' && material.priceChange === 0);

    return matchesSearch && matchesCategory && matchesPriceFilter;
  });

  const priceIncreased = mockMaterials.filter(m => m.priceChange > 0).length;
  const priceDecreased = mockMaterials.filter(m => m.priceChange < 0).length;

  return (
    <PageWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Materials Library</h1>
          <p className="text-gray-500 dark:text-gray-400">Track products and price changes across vendors</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Run Price Update
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Price Change Summary */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockMaterials.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Price Increased</p>
                <p className="text-2xl font-bold text-red-600">{priceIncreased}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Price Decreased</p>
                <p className="text-2xl font-bold text-emerald-600">{priceDecreased}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, vendors, SKUs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Change Filter */}
            <div className="w-full md:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value as typeof priceFilter)}
              >
                <option value="all">All Price Changes</option>
                <option value="increased">Price Increased</option>
                <option value="decreased">Price Decreased</option>
                <option value="unchanged">No Change</option>
              </select>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Materials Grid */}
      <FadeIn delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      </FadeIn>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </PageWrapper>
  );
}
