import ManagerSectionPlaceholder from '@/components/centre-dashboard/ManagerSectionPlaceholder';
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

  return (
    <ManagerSectionPlaceholder
      title={config.title}
      description={config.description}
      basePath={basePath}
    />
  );
}
