import { TrendingDown, TrendingUp } from 'lucide-react';
import type { PlatformMetric } from './types';

interface PlatformMetricsProps {
  title: string;
  subtitle?: string;
  metrics: PlatformMetric[];
}

export default function PlatformMetrics({
  title,
  subtitle,
  metrics,
}: PlatformMetricsProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e4e7ec] bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#1d2939]">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-[#667085]">{subtitle}</p>
        )}
      </div>

      <ul className="flex flex-col divide-y divide-[#e4e7ec]">
        {metrics.map((metric) => (
          <li
            key={metric.id}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span className="text-sm font-medium text-[#1d2939]">
              {metric.label}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#1d2939]">
                {metric.value}
              </span>
              {metric.badge && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    metric.badge.variant === 'success'
                      ? 'bg-[#ecfdf3] text-[#039855]'
                      : 'bg-[#fef5ed] text-[#f2994a]'
                  }`}
                >
                  {metric.badge.variant === 'success' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.badge.text}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
