'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Calendar,
  ChevronLeft,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  Headphones,
} from 'lucide-react';
import { useState } from 'react';
import type { ManagerNavItem } from './types';

const mainNav: ManagerNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/centre-dashboard' },
  { id: 'patients', label: 'Patients', icon: Users, href: '/centre-dashboard/patients' },
  { id: 'centres', label: 'Centres', icon: Building2, href: '/centre-dashboard/centres' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/centre-dashboard/bookings' },
  { id: 'payments', label: 'Payments', icon: CreditCard, href: '/centre-dashboard/payments' },
  { id: 'verifications', label: 'Verifications', icon: ShieldCheck, href: '/centre-dashboard/verifications' },
];

const secondaryNav: ManagerNavItem[] = [
  { id: 'roles', label: 'Roles & Permissions', icon: UserCog, href: '/centre-dashboard/roles' },
  { id: 'settings', label: 'Settings & Security', icon: Settings, href: '/centre-dashboard/settings' },
  { id: 'support', label: 'Support', icon: Headphones, href: '/centre-dashboard/support' },
];

function NavLink({
  item,
  collapsed,
  active,
}: {
  item: ManagerNavItem;
  collapsed: boolean;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-4 rounded-xl px-5 py-3 text-sm font-medium transition-colors ${
        active
          ? 'bg-[#1f6ae1] text-white'
          : 'text-[#e5e7eb] hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon className="h-6 w-6 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

interface ManagerSidebarProps {
  onLogout: () => void;
}

export default function ManagerSidebar({ onLogout }: ManagerSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === '/centre-dashboard' ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className={`relative shrink-0 transition-all duration-300 ${
        collapsed ? 'w-[88px]' : 'w-[280px]'
      }`}
    >
      <div className="sticky top-6 mx-3 flex min-h-[calc(100vh-3rem)] flex-col rounded-[28px] border border-[#a0a3bd]/30 bg-[#1f2937] px-3 py-8 shadow-lg backdrop-blur-xl">
        <p
          className={`mb-4 px-5 text-[11px] font-medium uppercase tracking-[0.4px] text-white/80 ${
            collapsed ? 'sr-only' : ''
          }`}
        >
          Main
        </p>

        <nav className="flex flex-1 flex-col gap-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              collapsed={collapsed}
              active={isActive(item.href)}
            />
          ))}

          <div className="my-3 border-t border-white/30" />

          {secondaryNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              collapsed={collapsed}
              active={isActive(item.href)}
            />
          ))}

          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-4 rounded-xl px-5 py-3 text-left text-sm font-medium text-[#e5e7eb] transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-6 w-6 shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full border border-[#e4e7ec] bg-white text-[#1f6ae1] shadow-sm"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </aside>
  );
}
