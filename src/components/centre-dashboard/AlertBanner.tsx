'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  message: string;
  actionLabel: string;
  onAction?: () => void;
}

export default function AlertBanner({
  message,
  actionLabel,
  onAction,
}: AlertBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#f9d0ac] bg-[#fef5ed] px-4 py-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 shrink-0 text-[#f2994a]" />
        <p className="text-sm font-medium text-[#f2994a]">{message}</p>
      </div>
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-bold text-[#f2994a] hover:underline"
        >
          {actionLabel}
        </button>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e4e7ec]/80 text-[#1f2937] hover:bg-[#e4e7ec]"
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
