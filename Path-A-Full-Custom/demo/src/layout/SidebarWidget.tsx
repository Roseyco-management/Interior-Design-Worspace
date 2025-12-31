import React from "react";

export default function SidebarWidget() {
  return (
    <div className="pb-20">
      <div className="mx-auto rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 px-4 py-5 text-center border border-brand-200 dark:border-brand-800">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-brand-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white text-sm">
          Quick Tip
        </h3>
        <p className="text-gray-600 text-xs dark:text-gray-400">
          Use Selection Boards to present product options to clients for approval.
        </p>
      </div>
    </div>
  );
}
