import type { ActivityItem } from './types';

interface ActivityFeedProps {
  title: string;
  subtitle?: string;
  items: ActivityItem[];
}

export default function ActivityFeed({ title, subtitle, items }: ActivityFeedProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e4e7ec] bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#1d2939]">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-[#667085]">{subtitle}</p>
        )}
      </div>

      <ul className="flex flex-1 flex-col divide-y divide-[#e4e7ec]">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-semibold text-[#1d2939]">{item.title}</p>
              <p className="mt-1 text-sm text-[#667085]">{item.subtitle}</p>
            </div>
            <span className="shrink-0 text-xs text-[#667085]">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
