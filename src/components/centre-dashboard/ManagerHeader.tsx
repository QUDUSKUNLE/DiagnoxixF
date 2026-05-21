'use client';

import BrandLogo from '@/components/BrandLogo';
import type { DashboardBasePath } from '@/lib/manager-routes';
import { Bell, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';

interface ManagerHeaderProps {
  userName: string;
  basePath: DashboardBasePath;
}

export default function ManagerHeader({ userName, basePath }: ManagerHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e4e7ec] bg-white px-6 py-4 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-6">
          <BrandLogo href={basePath} className="h-8 w-auto" />
          <label className="relative flex flex-1 max-w-xl items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#9ca3af]" />
            <input
              type="search"
              placeholder="Search or type command..."
              className="w-full rounded-full border border-[#e4e7ec] bg-[#f9fafb] py-2.5 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="relative rounded-full border border-[#e4e7ec] bg-white p-3 text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#f2994a]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-full transition-colors hover:bg-[#f9fafb]"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-[#e4e7ec]">
              <Image
                src="/images/logo.svg"
                alt=""
                width={44}
                height={44}
                className="h-full w-full object-cover p-2"
              />
            </div>
            <span className="hidden text-sm font-semibold text-[#344054] sm:inline">
              {userName}
            </span>
            <ChevronDown className="hidden h-4 w-4 text-[#667085] sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
