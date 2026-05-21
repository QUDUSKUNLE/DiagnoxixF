import { Building2, Calendar, Package, ShieldAlert, TrendingUp } from 'lucide-react';
import type { MetricStat } from './types';

const iconMap = {
  bookings: Calendar,
  revenue: Package,
  centres: Building2,
  verifications: ShieldAlert,
} as const;

interface MetricCardProps {
  metric: MetricStat;
  iconKey: keyof typeof iconMap;
}

export default function MetricCard({ metric, iconKey }: MetricCardProps) {
  const Icon = iconMap[iconKey];

  return (
    <div className="flex min-w-[200px] flex-1 flex-col gap-4 rounded-2xl border border-[#e4e7ec] bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f4f7]">
        <Icon className="h-6 w-6 text-[#1f6ae1]" />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-[#667085]">{metric.label}</p>
          <p className="mt-1 text-2xl font-bold text-[#1d2939]">{metric.value}</p>
        </div>
        {metric.badge && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              metric.badge.variant === 'success'
                ? 'bg-[#ecfdf3] text-[#039855]'
                : 'bg-[#fef5ed] text-[#f2994a]'
            }`}
          >
            {metric.badge.variant === 'success' && (
              <TrendingUp className="h-3 w-3" />
            )}
            {metric.badge.text}
          </span>
        )}
      </div>
    </div>
  );
}
