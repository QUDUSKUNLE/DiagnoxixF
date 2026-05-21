import ManagerLayout from '@/components/centre-dashboard/ManagerLayout';

export const metadata = {
  title: 'Admin Dashboard | Diagnoxix',
  description: 'Platform admin dashboard',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ManagerLayout basePath="/admin">{children}</ManagerLayout>;
}
