'use client';

import { getCurrentUser, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import type { User } from '@/types/auth';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#fafbff]">
      <ManagerSidebar onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ManagerHeader userName={user.name || 'Admin User'} />
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
