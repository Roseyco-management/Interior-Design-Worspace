'use client';

import React from 'react';

interface HouzzLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HouzzLink({ href = "#", children, className = "", size = "md" }: HouzzLinkProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base"
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 font-medium ${sizeClasses[size]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <HouzzIcon className="w-4 h-4" />
      {children}
      <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

export function HouzzIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.73l7 3.5v7.04l-7-3.5V8.73zm9 10.54V12.23l7-3.5v7.04l-7 3.5z"/>
    </svg>
  );
}

export function HouzzCard({
  title,
  description,
  linkText = "View in Houzz Pro",
  linkHref = "#",
  children,
  className = "",
  showLink = true
}: {
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  children?: React.ReactNode;
  className?: string;
  showLink?: boolean;
}) {
  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-5 ${className}`}>
      {title && (
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
              <HouzzIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
          </div>
        </div>
      )}
      {children}
      {showLink && (
        <div className="mt-4">
          <HouzzLink href={linkHref}>{linkText}</HouzzLink>
        </div>
      )}
    </div>
  );
}

export function HouzzBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded">
      <HouzzIcon className="w-3 h-3" />
      {children}
    </span>
  );
}
