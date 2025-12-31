"use client";

import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface PortalProfileDropdownProps {
  user: {
    name: string;
    role: string;
    initials: string;
  };
  accentColor: "emerald" | "amber";
  currentPortal: "client" | "contractor";
}

export function PortalProfileDropdown({
  user,
  accentColor,
  currentPortal,
}: PortalProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const otherPortals =
    currentPortal === "client"
      ? [
          { label: "Admin Portal", href: "/" },
          { label: "Contractor Portal", href: "/contractor-portal" },
        ]
      : [
          { label: "Admin Portal", href: "/" },
          { label: "Client Portal", href: "/client-portal" },
        ];

  const bgColorClasses = {
    emerald: "bg-emerald-100 dark:bg-emerald-900/30",
    amber: "bg-amber-100 dark:bg-amber-900/30",
  };

  const textColorClasses = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
  };

  const hoverColorClasses = {
    emerald: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    amber: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full ${bgColorClasses[accentColor]} flex items-center justify-center dropdown-toggle transition-colors ${hoverColorClasses[accentColor]}`}
      >
        <span className={`${textColorClasses[accentColor]} font-medium text-sm`}>
          {user.initials}
        </span>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        {/* User info header */}
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
        </div>

        {/* Profile links */}
        <ul className="py-1">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href={`/${currentPortal}-portal/profile`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href={`/${currentPortal}-portal/settings`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Account Settings
            </DropdownItem>
          </li>
        </ul>

        {/* Switch Portals section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-1">
          <p className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
            Switch Portal
          </p>
          {otherPortals.map((portal) => (
            <DropdownItem
              key={portal.href}
              onItemClick={closeDropdown}
              tag="a"
              href={portal.href}
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              {portal.label}
            </DropdownItem>
          ))}
        </div>

        {/* Sign out */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-1">
          <DropdownItem
            onItemClick={closeDropdown}
            tag="a"
            href="/signin"
            className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
}

export default PortalProfileDropdown;
