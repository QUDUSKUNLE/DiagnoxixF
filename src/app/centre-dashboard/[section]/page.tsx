import ManagerSectionView from '@/components/centre-dashboard/ManagerSectionView';
import { managerSections } from '@/lib/manager-routes';

const centreDashboardSections = Object.keys(managerSections).filter(
  (section) => section !== 'centres'
);

export function generateStaticParams() {
  return centreDashboardSections.map((section) => ({ section }));
}

export default async function CentreDashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <ManagerSectionView section={section} basePath="/centre-dashboard" />;
}
