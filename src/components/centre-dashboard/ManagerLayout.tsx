'use client';

import {
  canAccessAdminPortal,
  canAccessCentreDashboard,
  getCurrentUser,
  getPostLoginPath,
  logout,
} from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import type { DashboardBasePath } from '@/lib/manager-routes';
import type { User } from '@/types/auth';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

interface ManagerLayoutProps {
  children: React.ReactNode;
  basePath: DashboardBasePath;
}

export default function ManagerLayout({ children, basePath }: ManagerLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const onAdminPortal = basePath === '/admin';
    const isAdmin = currentUser.type === 'ADMIN';

    if (onAdminPortal && !isAdmin) {
      router.replace('/centre-dashboard');
      return;
    }
    if (!onAdminPortal && isAdmin) {
      router.replace('/admin');
      return;
    }

    setUser(currentUser);
  }, [router, basePath]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#fafbff]">
      <ManagerSidebar basePath={basePath} onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ManagerHeader basePath={basePath} userName={user.name || 'Admin User'} />
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
