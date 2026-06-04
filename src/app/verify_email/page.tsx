'use client';

import Header from '@/components/Header';
import VerifyEmail from '@/components/VerifyEmail';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Header active="login" showNav={false} />

      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    </div>
  );
}
