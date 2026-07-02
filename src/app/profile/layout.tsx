'use client';

import ManagerHeader from '@/components/centre-dashboard/ManagerHeader';
import ManagerSidebar from '@/components/centre-dashboard/ManagerSidebar';
import { getCurrentUser, logout } from '@/lib/auth';
import type { User } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (currentUser.type === 'PATIENT') {
      router.replace('/download-app');
      return;
    }

    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  const basePath = user.type === 'DIAGNOSTIC_CENTRE_OWNER' ? '/admin' : '/centre-dashboard';

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
