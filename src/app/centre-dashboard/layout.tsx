import ManagerLayout from '@/components/centre-dashboard/ManagerLayout';

export const metadata = {
  title: 'Centre Dashboard | Diagnoxix',
  description: 'Diagnostic centre dashboard',
};

export default function CentreDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagerLayout basePath="/centre-dashboard">{children}</ManagerLayout>;
}
