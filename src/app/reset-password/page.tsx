'use client';

import ResetPassword from '@/components/ResetPassword';
import { resetPassword } from '@/lib/auth';
import Header from '@/components/Header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get("email") || '';

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">The password reset link is invalid or has expired.</p>
          <a
            href="/forgot-password"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Request a New Link
          </a>
        </div>
      </div>
    );
  }

  const handleResetPassword = async (token: string, password: string, confirmPassword: string) => {
    await resetPassword({ token: token, email: email, password: password, confirmPassword: confirmPassword});
  };

  return <ResetPassword token={token} email={email} onSubmit={handleResetPassword} />;
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="login" showNav={false} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-gray-600">Loading...</div>
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
