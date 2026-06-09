import type { ManagerNavId } from '@/components/centre-dashboard/types';
import type { LucideIcon } from 'lucide-react';
import {
    Building2,
    Calendar,
    CreditCard,
    Headphones,
    LayoutDashboard,
    Settings,
    ShieldCheck,
    UserCog,
    Users,
} from 'lucide-react';

export type DashboardBasePath = '/admin' | '/centre-dashboard';

export interface ManagerNavConfig {
  id: ManagerNavId;
  label: string;
  icon: LucideIcon;
  segment: string;
}

const mainNavConfig: ManagerNavConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, segment: '' },
  { id: 'patients', label: 'Patients', icon: Users, segment: 'patients' },
  { id: 'centres', label: 'Centres', icon: Building2, segment: 'centres' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, segment: 'bookings' },
  { id: 'payments', label: 'Payments', icon: CreditCard, segment: 'payments' },
  { id: 'verifications', label: 'Verifications', icon: ShieldCheck, segment: 'verifications' },
];

const secondaryNavConfig: ManagerNavConfig[] = [
  { id: 'roles', label: 'Roles & Permissions', icon: UserCog, segment: 'roles' },
  { id: 'settings', label: 'Settings & Security', icon: Settings, segment: 'settings' },
  { id: 'support', label: 'Support', icon: Headphones, segment: 'support' },
];

export function getManagerHref(basePath: DashboardBasePath, segment: string): string {
  const result = segment ? `${basePath}/${segment}` : basePath;
  return result;
}

export function getManagerNavItems(basePath: DashboardBasePath) {
  const navConfig =
    basePath === '/centre-dashboard'
      ? mainNavConfig.filter((item) => item.id !== 'centres')
      : // admin portal: remove patients and show "Managers" instead of "Bookings"
        mainNavConfig
          .filter((item) => item.id !== 'patients')
          .map((item) =>
            item.id === 'bookings'
              ? { ...item, label: 'Managers', segment: 'managers', icon: Users }
              : item,
          );

  const toItems = (config: ManagerNavConfig[]) =>
    config.map((item) => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      href: getManagerHref(basePath, item.segment),
    }));

  return {
    mainNav: toItems(navConfig),
    secondaryNav: toItems(secondaryNavConfig),
  };
}

export function isManagerNavActive(pathname: string, basePath: DashboardBasePath, href: string) {
  return href === basePath ? pathname === href : pathname.startsWith(href);
}

export const managerSections: Record<string, { title: string; description: string }> = {
  centres: {
    title: 'Diagnostic Centres',
    description: 'View and manage registered diagnostic centres on the platform.',
  },
  bookings: {
    title: 'Bookings',
    description: 'Monitor and manage all diagnostic test bookings.',
  },
  payments: {
    title: 'Payments',
    description: 'Review payouts, transactions, and payment approvals.',
  },
  verifications: {
    title: 'Verifications',
    description: 'Approve centre credentials and pending verification requests.',
  },
  managers: {
    title: 'Managers',
    description: 'View and manage centre managers and their access.',
  },
  roles: {
    title: 'Roles & Permissions',
    description: 'Configure admin roles and access permissions.',
  },
  settings: {
    title: 'Settings & Security',
    description: 'Platform settings, security policies, and integrations.',
  },
  support: {
    title: 'Support',
    description: 'Handle support tickets and centre inquiries.',
  },
};
