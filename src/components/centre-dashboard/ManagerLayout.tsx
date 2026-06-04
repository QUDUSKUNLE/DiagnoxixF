'use client';

import { getCurrentUser, getPostLoginPath, logout } from '@/lib/auth';
import type { DashboardBasePath } from '@/lib/manager-routes';
import type { User } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    const isAdmin = currentUser.type === 'DIAGNOSTIC_CENTRE_OWNER';
    const isCentreManager = currentUser.type === 'DIAGNOSTIC_CENTRE_MANAGER';

    if (currentUser.type === 'PATIENT') {
      router.replace(getPostLoginPath(currentUser));
      return;
    }

    if (onAdminPortal && !isAdmin) {
      router.replace(getPostLoginPath(currentUser));
      return;
    }
    if (!onAdminPortal && isAdmin) {
      router.replace('/admin');
      return;
    }
    if (!onAdminPortal && !isCentreManager) {
      router.replace(getPostLoginPath(currentUser));
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
      <ManagerSidebar basePath={basePath} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ManagerHeader
          basePath={basePath}
          userName={user.name || user.email || 'User'}
          onLogout={handleLogout}
        />
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
