'use client';

import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

interface Invoice {
  id: string;
  number: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
}

export default function ClientInvoicesPage() {
  const invoices: Invoice[] = [
    { id: '1', number: 'INV-2024-001', description: 'Design Retainer - January', amount: 5000, status: 'Paid', issueDate: '2024-01-01', dueDate: '2024-01-15', paidDate: '2024-01-12' },
    { id: '2', number: 'INV-2024-002', description: 'Design Phase Completion', amount: 10000, status: 'Paid', issueDate: '2024-01-28', dueDate: '2024-02-12', paidDate: '2024-02-10' },
    { id: '3', number: 'INV-2024-003', description: 'Material Deposit - Cabinetry', amount: 15000, status: 'Due', issueDate: '2024-02-01', dueDate: '2024-02-15' },
    { id: '4', number: 'INV-2024-004', description: 'Material Deposit - Countertops', amount: 8500, status: 'Due', issueDate: '2024-02-05', dueDate: '2024-02-20' },
  ];

  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const totalDue = invoices.filter(i => i.status === 'Due' || i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <p className="text-gray-500">View and pay your project invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Amount Due</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalDue)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Total Invoiced</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalPaid + totalDue)}</p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.number}</p>
                    <p className="text-sm text-gray-500">Issued {formatDate(invoice.issueDate)}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{invoice.description}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {invoice.status === 'Paid' ? (
                      <span className="text-green-600">Paid {formatDate(invoice.paidDate!)}</span>
                    ) : (
                      formatDate(invoice.dueDate)
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      {invoice.status !== 'Paid' && (
                        <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Methods</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 9.761c0 .536-.065 1.084-.169 1.627-.847 4.419-3.746 5.946-7.449 5.946h-.572c-.453 0-.838.334-.908.789l-.803 5.09c-.054.316-.322.539-.64.539h-2.9c-.363 0-.637-.335-.588-.706l.203-1.287c.07-.455.456-.787.908-.787h.572c3.703 0 6.602-1.527 7.449-5.946.104-.543.169-1.091.169-1.627 0-1.743-.645-3.138-1.842-4.056-1.197-.918-2.912-1.377-5.118-1.377h-4.571c-.363 0-.637.335-.588.706l2.178 13.76c.07.455.456.787.908.787h2.9c.318 0 .586-.223.64-.539l.803-5.09c.07-.455.455-.789.908-.789h.572c3.703 0 6.602-1.527 7.449-5.946.104-.543.169-1.091.169-1.627z"/>
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-300">PayPal</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-300">Credit Card</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-300">Bank Transfer</span>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-emerald-900 dark:text-emerald-300">Questions about billing?</p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
              Contact our billing team at billing@afdesigns.com or message your designer directly.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
