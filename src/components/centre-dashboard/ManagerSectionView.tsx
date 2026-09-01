import CentresPage from '@/components/centre-dashboard/CentresPage';
import ManagerSectionPlaceholder from '@/components/centre-dashboard/ManagerSectionPlaceholder';
import ManagersPage from '@/components/centre-dashboard/ManagersPage';
import PaymentsPage from '@/components/centre-dashboard/PaymentsPage';
import VerificationsPage from '@/components/centre-dashboard/VerificationsPage';
import type { DashboardBasePath } from '@/lib/manager-routes';
import { managerSections } from '@/lib/manager-routes';
import { notFound } from 'next/navigation';

interface ManagerSectionViewProps {
  section: string;
  basePath: DashboardBasePath;
}

export default function ManagerSectionView({ section, basePath }: ManagerSectionViewProps) {
  const config = managerSections[section];

  if (!config) {
    notFound();
  }

  // Render dedicated pages for specific sections
  if (section === 'centres') {
    return <CentresPage />;
  }
  if (section === 'managers') {
    return <ManagersPage />;
  }
  if (section === 'payments') {
    return <PaymentsPage />;
  }
  if (section === 'verifications') {
    return <VerificationsPage />;
  }

  return (
    <ManagerSectionPlaceholder
      title={config.title}
      description={config.description}
      basePath={basePath}
    />
  );
}
