'use client';

import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { resendVerification } from '@/lib/auth';

export default function ResendVerificationPage() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') ?? '';

  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      await resendVerification(email);
      setStatus('success');
      setMessage('A new verification link has been sent to your email.');
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Unable to resend verification link. Please try again.');
    }
  }

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
              <h1 className="text-2xl font-semibold text-gray-900">Resend Verification Email</h1>
              <p className="mt-3 text-gray-600">
                Enter your email address and we’ll send you a fresh verification link.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending...' : 'Send new link'}
              </button>
            </form>

            {message ? (
              <p
                className={`mt-4 text-sm ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            ) : null}

            <div className="mt-6 text-center text-sm text-gray-500">
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
