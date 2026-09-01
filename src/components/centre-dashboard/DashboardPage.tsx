'use client';

import ActivityFeed from '@/components/centre-dashboard/ActivityFeed';
import AlertBanner from '@/components/centre-dashboard/AlertBanner';
import MetricCard from '@/components/centre-dashboard/MetricCard';
import PlatformMetrics from '@/components/centre-dashboard/PlatformMetrics';
import SimpleBarChart from '@/components/centre-dashboard/SimpleBarChart';
import {
    bookingChartData,
    dashboardMetrics,
    platformMetrics,
    recentActivity,
    revenueChartData,
} from '@/lib/centre-dashboard-data';
import { Check, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

const payoutReview = {
  id: 'TX-88321',
  centreName: 'Medilab Diagnostics',
  status: 'Active',
  verification: 'Approved',
  requestedAmount: '₦50,000',
  walletBalance: '₦120,000',
  requestedDate: '18 Jan, 2026',
  payoutType: 'Manual Withdrawal',
  bankName: 'GTBank',
  accountName: 'Medilab Diagnostics Ltd',
  accountNumber: '0123****890',
  checks: [
    'Verification Approved',
    'No open disputes',
    'Sufficient balance',
  ],
};

export default function DashboardPage() {
  const [showPayoutReview, setShowPayoutReview] = useState(false);

  return (
    <div className="space-y-8">
      <AlertBanner
        message="3 payout requests awaiting approval"
        actionLabel="View Payout"
        onAction={() => setShowPayoutReview(true)}
      />

      <div className="flex flex-wrap gap-4">
        <MetricCard metric={dashboardMetrics[0]} iconKey="bookings" />
        <MetricCard metric={dashboardMetrics[1]} iconKey="revenue" />
        <MetricCard metric={dashboardMetrics[2]} iconKey="centres" />
        <MetricCard metric={dashboardMetrics[3]} iconKey="verifications" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SimpleBarChart
          title="Booking Trends"
          subtitle="Daily bookings this week"
          data={bookingChartData}
          highlightIndex={1}
        />
        <SimpleBarChart
          title="Revenue Overview"
          subtitle="Daily revenue (₦ thousands)"
          data={revenueChartData}
          valuePrefix="₦"
          highlightIndex={3}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeed
          title="Recent Activity"
          subtitle="Latest platform events"
          items={recentActivity}
        />
        <PlatformMetrics
          title="Platform Metrics"
          subtitle="Key performance indicators"
          metrics={platformMetrics}
        />
      </div>

      {showPayoutReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/20 backdrop-blur-[2px]">
          <div className="w-full max-w-[540px] rounded-[26px] border border-[#e4e7ec] bg-[#f7f8fa] p-4 shadow-[0_30px_70px_rgba(15,23,42,0.18)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#dbeafe]" />
              </div>
              <button
                type="button"
                onClick={() => setShowPayoutReview(false)}
                aria-label="Close payout review"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#475467] hover:bg-[#f9fafb]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-[#e4e7ec]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[1.8rem] font-bold tracking-[-0.05em] text-[#101828]">
                    Payout Request Review
                  </h2>
                  <p className="mt-1 text-sm text-[#667085]">{payoutReview.id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-4">
                  <div className="grid grid-cols-[1fr_auto] gap-3">
                    <div>
                      <p className="text-sm text-[#475467]">Centre Name</p>
                      <p className="mt-1 text-base font-semibold text-[#101828]">
                        {payoutReview.centreName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#475467]">Status</p>
                      <span className="mt-1 inline-flex rounded-full bg-[#e8f7ee] px-2.5 py-1 text-[11px] font-semibold text-[#1f8f66]">
                        {payoutReview.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
                    <div>
                      <p className="text-sm text-[#475467]">Verification</p>
                      <p className="mt-1 text-base font-semibold text-[#101828]">
                        {payoutReview.verification}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6] bg-white px-3 py-2 text-sm font-medium text-[#1f6ae1] shadow-sm"
                      >
                        <Check className="h-4 w-4 text-[#1f6ae1]" />
                        View Centre Profile
                      </button>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#101828]">Payout Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Requested Amount</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.requestedAmount}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Wallet Balance</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.walletBalance}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Requested Date</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.requestedDate}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Payout Type</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.payoutType}</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#101828]">Bank Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Bank Name</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.bankName}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Account Name</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.accountName}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#475467]">
                      <span>Account Number</span>
                      <span className="font-semibold text-[#101828]">{payoutReview.accountNumber}</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#101828]">Fraud Check Indicators</h3>
                  <ul className="space-y-2.5 text-sm">
                    {payoutReview.checks.map((check) => (
                      <li key={check} className="flex items-center gap-2 text-[#1f8f66]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[#1f8f66]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-medium text-[#1d2939]">{check}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPayoutReview(false)}
                    className="rounded-xl bg-[#ef4444] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_20px_rgba(239,68,68,0.2)] transition-opacity hover:opacity-95"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPayoutReview(false)}
                    className="rounded-xl bg-[#1f6ae1] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_20px_rgba(31,106,225,0.2)] transition-opacity hover:opacity-95"
                  >
                    Approve Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
