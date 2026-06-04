'use client';

import DownloadAppContent from '@/components/DownloadAppContent';
import { getCurrentUser, getPostLoginPath, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DownloadAppPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();

  useEffect(() => {
    const user = getCurrentUser();

    if (user && user.type !== 'PATIENT') {
      router.replace(getPostLoginPath(user));
      return;
    }

    setUserEmail(user?.email);
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!ready) return null;

  return (
    <DownloadAppContent
      userEmail={userEmail}
      onLogout={userEmail ? handleLogout : undefined}
    />
  );
}
