'use client';

import BrandLogo from '@/components/BrandLogo';
import type { DashboardBasePath } from '@/lib/manager-routes';
import { Bell, ChevronDown, LogOut, Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ManagerHeaderProps {
  userName: string;
  basePath: DashboardBasePath;
  onLogout: () => void;
}

export default function ManagerHeader({
  userName,
  basePath,
  onLogout,
}: ManagerHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

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

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 rounded-full px-2 py-1.5 transition-colors hover:bg-[#f9fafb]"
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
              <ChevronDown
                className={`hidden h-4 w-4 text-[#667085] transition-transform sm:block ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#e4e7ec] bg-white shadow-lg"
              >
                <div className="border-b border-[#e4e7ec] px-4 py-3">
                  <p className="text-sm font-semibold text-[#1d2939]">{userName}</p>
                  <p className="mt-0.5 text-xs text-[#667085]">Account</p>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#1d2939] transition-colors hover:bg-[#f9fafb]"
                >
                  <LogOut className="h-4 w-4 text-[#667085]" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
