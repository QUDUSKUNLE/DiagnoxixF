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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1d2939]">Dashboard</h1>
        <p className="mt-1 text-lg font-medium text-[#4c545f]">
          Welcome back, Admin
        </p>
      </div>

      <AlertBanner
        message="3 payout requests awaiting approval"
        actionLabel="View Payout"
        onAction={() => {}}
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
    </div>
  );
}
