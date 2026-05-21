import type {
  ActivityItem,
  ChartPoint,
  MetricStat,
  PlatformMetric,
} from '@/components/centre-dashboard/types';

export const dashboardMetrics: MetricStat[] = [
  {
    id: 'bookings',
    label: 'Total Bookings Today',
    value: '128',
    badge: { text: '+12%', variant: 'success' },
  },
  {
    id: 'revenue',
    label: 'Total Revenue Today',
    value: '₦1,320,000',
    badge: { text: '+8%', variant: 'success' },
  },
  {
    id: 'centres',
    label: 'Active Centres',
    value: '342',
    badge: { text: '+3', variant: 'success' },
  },
  {
    id: 'verifications',
    label: 'Pending Verifications',
    value: '21',
    badge: { text: '5 urgent (>48h)', variant: 'warning' },
  },
];

export const bookingChartData: ChartPoint[] = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 55 },
  { label: 'Wed', value: 38 },
  { label: 'Thu', value: 61 },
  { label: 'Fri', value: 48 },
  { label: 'Sat', value: 72 },
  { label: 'Sun', value: 35 },
];

export const revenueChartData: ChartPoint[] = [
  { label: 'Mon', value: 180 },
  { label: 'Tue', value: 220 },
  { label: 'Wed', value: 195 },
  { label: 'Thu', value: 250 },
  { label: 'Fri', value: 210 },
  { label: 'Sat', value: 280 },
  { label: 'Sun', value: 165 },
];

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'New centre registered',
    subtitle: 'Alpha Diagnostics',
    time: '2 mins ago',
  },
  {
    id: '2',
    title: 'Withdrawal requested',
    subtitle: '₦75,000 (Medilab)',
    time: '15 mins ago',
  },
  {
    id: '3',
    title: 'Verification approved',
    subtitle: 'PrimeCare Labs',
    time: '1 hour ago',
  },
  {
    id: '4',
    title: 'New patient registered',
    subtitle: 'John Adewale',
    time: '2 hours ago',
  },
  {
    id: '5',
    title: 'New centre registered',
    subtitle: 'HealthFirst Labs',
    time: '3 hours ago',
  },
];

export const platformMetrics: PlatformMetric[] = [
  {
    id: 'abv',
    label: 'Avg. Booking Value',
    value: '₦8,500',
    badge: { text: '+5%', variant: 'success' },
  },
  {
    id: 'cancel',
    label: 'Cancellation Rate',
    value: '4.2%',
    badge: { text: '-0.8%', variant: 'success' },
  },
  {
    id: 'activation',
    label: 'Centre Activation',
    value: '89%',
    badge: { text: '+2%', variant: 'success' },
  },
  {
    id: 'response',
    label: 'Avg. Response Time',
    value: '2.4h',
    badge: { text: '-12%', variant: 'success' },
  },
];
