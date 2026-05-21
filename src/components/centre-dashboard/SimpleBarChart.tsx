import type { ChartPoint } from './types';

interface SimpleBarChartProps {
  title: string;
  subtitle?: string;
  data: ChartPoint[];
  valuePrefix?: string;
  highlightIndex?: number;
}

export default function SimpleBarChart({
  title,
  subtitle,
  data,
  valuePrefix = '',
  highlightIndex,
}: SimpleBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-2xl border border-[#e4e7ec] bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#1d2939]">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-[#667085]">{subtitle}</p>
        )}
      </div>

      <div className="flex h-56 items-end justify-between gap-2 sm:gap-4">
        {data.map((point, index) => {
          const height = `${(point.value / max) * 100}%`;
          const highlighted = highlightIndex === index;

          return (
            <div
              key={point.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex h-full w-full items-end justify-center">
                {highlighted && (
                  <div className="absolute -top-12 rounded-lg bg-[#1f2937] px-2 py-1 text-xs text-white shadow-md">
                    <p className="font-medium">{point.label}</p>
                    <p>
                      {valuePrefix}
                      {point.value.toLocaleString()}
                    </p>
                  </div>
                )}
                <div
                  className={`w-full max-w-[48px] rounded-t-lg transition-all ${
                    highlighted
                      ? 'bg-[#1f6ae1]'
                      : 'bg-[#1f6ae1]/25 hover:bg-[#1f6ae1]/40'
                  }`}
                  style={{ height }}
                />
                {highlighted && (
                  <span className="absolute -bottom-1 h-2.5 w-2.5 rounded-full bg-[#1f6ae1] ring-4 ring-[#1f6ae1]/20" />
                )}
              </div>
              <span className="text-xs font-medium text-[#667085]">
                {point.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
