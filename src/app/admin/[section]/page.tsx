import ManagerSectionView from '@/components/centre-dashboard/ManagerSectionView';
import { managerSections } from '@/lib/manager-routes';

export function generateStaticParams() {
  return Object.keys(managerSections).map((section) => ({ section }));
}

export default async function AdminDashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <ManagerSectionView section={section} basePath="/admin" />;
}
