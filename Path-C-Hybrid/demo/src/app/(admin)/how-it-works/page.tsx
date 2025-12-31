'use client';

import React from 'react';
import { PageWrapper, FadeIn, StaggerContainer, StaggerItem } from '@/components/hybrid/PageWrapper';
import { HouzzBadge, HouzzCard } from '@/components/hybrid/HouzzLink';

function ArchitectureNode({
  title,
  description,
  icon,
  color,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'gray';
  badge?: string;
}) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    green: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    gray: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  };

  const iconColors = {
    blue: 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-400',
    green: 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400',
    orange: 'bg-orange-100 dark:bg-orange-800 text-orange-600 dark:text-orange-400',
    gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${colors[color]}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            {badge && (
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                badge === 'Houzz Pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ConnectionLine({ direction = 'vertical' }: { direction?: 'vertical' | 'horizontal' }) {
  return direction === 'vertical' ? (
    <div className="flex justify-center py-2">
      <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-gray-300 dark:border-gray-600 rotate-45" />
      </div>
    </div>
  ) : (
    <div className="flex items-center px-2">
      <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-b-2 border-gray-300 dark:border-gray-600 -rotate-45" />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: 'custom' | 'houzz';
}) {
  return (
    <div className={`rounded-xl p-5 ${
      color === 'custom'
        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
        : 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${color === 'custom' ? 'bg-blue-500' : 'bg-purple-500'}`} />
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className={`w-4 h-4 mt-0.5 ${color === 'custom' ? 'text-blue-500' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              Hybrid Architecture
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              How the Platform Works
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A seamless blend of custom-built features and Houzz Pro integration,
              designed specifically for interior design workflows.
            </p>
          </FadeIn>
        </div>

        {/* Visual Architecture Diagram */}
        <FadeIn delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              System Architecture
            </h2>

            <div className="space-y-4">
              {/* User Layer */}
              <div className="grid grid-cols-3 gap-4">
                <ArchitectureNode
                  title="Designer"
                  description="Full platform access"
                  color="blue"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />
                <ArchitectureNode
                  title="Client Portal"
                  description="Project visibility & messaging"
                  color="green"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
                <ArchitectureNode
                  title="Contractor Portal"
                  description="Task management & access"
                  color="orange"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />
              </div>

              <ConnectionLine />

              {/* Core Platform */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AF Designs Platform</h3>
                    <p className="text-blue-100 text-sm">Custom-built core system</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-sm">
                  <div className="bg-white/10 rounded-lg py-2 px-3">
                    <p className="font-medium">CRM</p>
                    <p className="text-blue-200 text-xs">Client Management</p>
                  </div>
                  <div className="bg-white/10 rounded-lg py-2 px-3">
                    <p className="font-medium">Materials</p>
                    <p className="text-blue-200 text-xs">Price Tracking</p>
                  </div>
                  <div className="bg-white/10 rounded-lg py-2 px-3">
                    <p className="font-medium">Proposals</p>
                    <p className="text-blue-200 text-xs">With Tax Calc</p>
                  </div>
                  <div className="bg-white/10 rounded-lg py-2 px-3">
                    <p className="font-medium">Messaging</p>
                    <p className="text-blue-200 text-xs">Centralized</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                    API Bridge
                  </div>
                  <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
                </div>
              </div>

              {/* Houzz Integration */}
              <HouzzCard className="p-6" showLink={false}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Houzz Pro</h3>
                    <p className="text-purple-600 text-sm">Industry-leading selection boards</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="bg-purple-100 dark:bg-purple-800/50 rounded-lg py-2 px-3">
                    <p className="font-medium text-purple-800 dark:text-purple-300">Selection Boards</p>
                    <p className="text-purple-600 dark:text-purple-400 text-xs">Visual Curation</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-800/50 rounded-lg py-2 px-3">
                    <p className="font-medium text-purple-800 dark:text-purple-300">Client Approvals</p>
                    <p className="text-purple-600 dark:text-purple-400 text-xs">Comment & Approve</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-800/50 rounded-lg py-2 px-3">
                    <p className="font-medium text-purple-800 dark:text-purple-300">Vendor Catalog</p>
                    <p className="text-purple-600 dark:text-purple-400 text-xs">Product Database</p>
                  </div>
                </div>
              </HouzzCard>

              <ConnectionLine />

              {/* External Integrations */}
              <div className="grid grid-cols-3 gap-4">
                <ArchitectureNode
                  title="QuickBooks"
                  description="Financial sync"
                  color="gray"
                  badge="Integration"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <ArchitectureNode
                  title="TaxJar"
                  description="Tax calculation"
                  color="gray"
                  badge="Integration"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                />
                <ArchitectureNode
                  title="Email/SMS"
                  description="Notifications"
                  color="gray"
                  badge="Integration"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Feature Comparison */}
        <FadeIn delay={0.2}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              What&apos;s Custom vs. Houzz Pro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Custom-Built Features"
                color="custom"
                items={[
                  "Client relationship management",
                  "Materials library with price tracking",
                  "Proposal generation with TaxJar",
                  "Centralized messaging hub",
                  "Invoice tracking & QuickBooks sync",
                  "Client & Contractor portals",
                  "Project documentation",
                  "Custom reporting & analytics",
                ]}
              />
              <FeatureCard
                title="Houzz Pro Features"
                color="houzz"
                items={[
                  "Visual selection boards",
                  "Product sourcing & catalog",
                  "Client approval workflows",
                  "Moodboard creation",
                  "Vendor integrations",
                  "3D room visualization",
                  "Trade pricing access",
                  "Project photo galleries",
                ]}
              />
            </div>
          </div>
        </FadeIn>

        {/* Data Flow */}
        <FadeIn delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Data Flow Example
            </h2>

            <StaggerContainer className="space-y-4">
              {[
                { step: 1, title: "Designer curates selections", desc: "Using Houzz Pro's visual boards and product catalog", color: "purple" as const },
                { step: 2, title: "Client approves items", desc: "Through Houzz Pro's approval workflow", color: "purple" as const },
                { step: 3, title: "Approved items synced", desc: "Data bridges to custom platform via API", color: "blue" as const },
                { step: 4, title: "Proposal generated", desc: "Custom system creates proposal with TaxJar calculations", color: "blue" as const },
                { step: 5, title: "Invoice created & synced", desc: "Automatically syncs to QuickBooks", color: "blue" as const },
              ].map(({ step, title, desc, color }) => (
                <StaggerItem key={step}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      color === 'purple' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {step}
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                    {color === 'purple' && (
                      <HouzzBadge>Houzz Pro</HouzzBadge>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Benefits */}
        <FadeIn delay={0.4}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Best of Both Worlds</h3>
              <p className="text-sm text-gray-500">
                Keep Houzz Pro for what it does best, build custom for your unique needs.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cost Effective</h3>
              <p className="text-sm text-gray-500">
                Only build what you need, leverage existing tools for the rest.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Seamless Sync</h3>
              <p className="text-sm text-gray-500">
                Data flows automatically between systems, no manual entry.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageWrapper>
  );
}
