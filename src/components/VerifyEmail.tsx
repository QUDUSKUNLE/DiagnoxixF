'use client';

import BrandLogo from '@/components/BrandLogo';
import { verifyEmail } from '@/lib/auth';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'missing'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (!token) {
      setStatus('missing');
      setMessage('Verification link is invalid or incomplete.');
      return;
    }

    async function verify() {
      try {
        await verifyEmail(token, email);
        setStatus('success');
        setMessage('Your email has been successfully confirmed.');
      } catch (err: any) {
        setStatus('error');
        setMessage(err?.message || 'Email verification failed. Please try again.');
      }
    }

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-[#e4e7ec] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <BrandLogo href="/" className="h-8 w-auto" />
        </div>
      </header>

      <main className="mx-auto flex-1 max-w-4xl px-6 py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              {status === 'success' ? (
                <CheckCircle className="mx-auto h-14 w-14 text-green-600" />
              ) : (
                <XCircle className="mx-auto h-14 w-14 text-red-600" />
              )}
              <h1 className="mt-6 text-2xl font-semibold text-gray-900">
                {status === 'success' ? 'Email Verified' : 'Email Verification'}
              </h1>
              <p className="mt-3 text-gray-600">
                {status === 'success'
                  ? `Your email${email ? ` (${email})` : ''} is confirmed.`
                  : message}
              </p>
            </div>

            {status === 'success' ? (
              <Link
                href="/login"
                className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue to Sign In
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  If the problem persists, request a new verification email.
                </p>
                <Link
  href={
    email
      ? `/resend-verification?email=${encodeURIComponent(email)}`
      : '/resend-verification'
  }
  className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
>
  Request a new link
</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
