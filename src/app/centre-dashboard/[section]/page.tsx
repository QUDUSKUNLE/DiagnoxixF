import ManagerSectionPlaceholder from '@/components/centre-dashboard/ManagerSectionPlaceholder';
import { notFound } from 'next/navigation';

const sections: Record<string, { title: string; description: string }> = {
  centres: {
    title: 'Diagnostic Centres',
    description: 'View and manage registered diagnostic centres on the platform.',
  },
  bookings: {
    title: 'Bookings',
    description: 'Monitor and manage all diagnostic test bookings.',
  },
  payments: {
    title: 'Payments',
    description: 'Review payouts, transactions, and payment approvals.',
  },
  verifications: {
    title: 'Verifications',
    description: 'Approve centre credentials and pending verification requests.',
  },
  roles: {
    title: 'Roles & Permissions',
    description: 'Configure admin roles and access permissions.',
  },
  settings: {
    title: 'Settings & Security',
    description: 'Platform settings, security policies, and integrations.',
  },
  support: {
    title: 'Support',
    description: 'Handle support tickets and centre inquiries.',
  },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function CentreManagerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const config = sections[section];

  if (!config) {
    notFound();
  }

  return (
    <ManagerSectionPlaceholder
      title={config.title}
      description={config.description}
    />
  );
}
