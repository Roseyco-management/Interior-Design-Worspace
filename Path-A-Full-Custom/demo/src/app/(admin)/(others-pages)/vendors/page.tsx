'use client';

import PageWrapper from '@/components/common/PageWrapper';
import { useState } from 'react';

type Vendor = {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  website: string;
  notes: string;
};

const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Restoration Hardware',
    category: 'Furniture',
    contact: '555-0101',
    email: 'trade@rh.com',
    website: 'rh.com',
    notes: 'Trade account active. 20% designer discount.',
  },
  {
    id: '2',
    name: 'West Elm Trade',
    category: 'Lighting',
    contact: '555-0102',
    email: 'trade@westelm.com',
    website: 'westelm.com',
    notes: 'Good for modern pieces. Quick shipping.',
  },
  {
    id: '3',
    name: 'Pottery Barn Pro',
    category: 'Furniture',
    contact: '555-0103',
    email: 'pro@potterybarn.com',
    website: 'potterybarn.com',
    notes: 'Reliable for staging furniture.',
  },
  {
    id: '4',
    name: 'Kravet Fabrics',
    category: 'Textiles',
    contact: '555-0104',
    email: 'orders@kravet.com',
    website: 'kravet.com',
    notes: 'Premium fabric supplier. 4-6 week lead time.',
  },
  {
    id: '5',
    name: 'Ann Sacks',
    category: 'Tile & Stone',
    contact: '555-0105',
    email: 'trade@annsacks.com',
    website: 'annsacks.com',
    notes: 'High-end tile. Showroom visit recommended.',
  },
  {
    id: '6',
    name: 'Visual Comfort',
    category: 'Lighting',
    contact: '555-0106',
    email: 'trade@visualcomfort.com',
    website: 'visualcomfort.com',
    notes: 'Excellent chandeliers and pendants.',
  },
  {
    id: '7',
    name: 'Schumacher',
    category: 'Textiles',
    contact: '555-0107',
    email: 'designtrade@fschumacher.com',
    website: 'fschumacher.com',
    notes: 'Wallpaper and fabric. Designer exclusive.',
  },
  {
    id: '8',
    name: 'Arteriors Home',
    category: 'Accessories',
    contact: '555-0108',
    email: 'orders@arteriorshome.com',
    website: 'arteriorshome.com',
    notes: 'Unique decorative pieces and furniture.',
  },
];

const categories = ['All', 'Furniture', 'Lighting', 'Textiles', 'Tile & Stone', 'Accessories'];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || vendor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendors</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your suppliers and trade accounts</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Vendor
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Vendors Table */}
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                          {vendor.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{vendor.name}</p>
                          <a
                            href={`https://${vendor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand-500 hover:underline"
                          >
                            {vendor.website}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          vendor.category === 'Furniture'
                            ? 'bg-blue-100 text-blue-700'
                            : vendor.category === 'Lighting'
                            ? 'bg-yellow-100 text-yellow-700'
                            : vendor.category === 'Textiles'
                            ? 'bg-purple-100 text-purple-700'
                            : vendor.category === 'Tile & Stone'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {vendor.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">{vendor.contact}</p>
                      <p className="text-sm text-gray-500">{vendor.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {vendor.notes}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredVendors.length} of {vendors.length} vendors
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
