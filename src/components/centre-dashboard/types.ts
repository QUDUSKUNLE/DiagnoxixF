import type { LucideIcon } from 'lucide-react';

export type ManagerNavId =
  | 'dashboard'
  | 'patients'
  | 'centres'
  | 'bookings'
  | 'payments'
  | 'verifications'
  | 'roles'
  | 'settings'
  | 'support';

export interface ManagerNavItem {
  id: ManagerNavId;
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface MetricStat {
  id: string;
  label: string;
  value: string;
  badge?: {
    text: string;
    variant: 'success' | 'warning';
  };
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
}

export interface PlatformMetric {
  id: string;
  label: string;
  value: string;
  badge?: {
    text: string;
    variant: 'success' | 'warning';
  };
}

export interface ChartPoint {
  label: string;
  value: number;
}
