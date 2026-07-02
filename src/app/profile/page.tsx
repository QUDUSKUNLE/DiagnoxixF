'use client';

import { API_ENDPOINTS, apiCall } from '@/lib/api-config';
import { getCurrentUser, updateCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nin, setNin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/login');
      return;
    }

    setEmail(user.email || '');
    setFirstName(user.name?.split(' ')[0] ?? '');
    setLastName(user.name?.split(' ').slice(1).join(' ') ?? '');
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage('');

    const payload = {
      first_name: firstName,
      last_name: lastName,
      nin,
      phone_number: phoneNumber,
    };

    try {
      await apiCall<any>(API_ENDPOINTS.ACCOUNT_PROFILE, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      updateCurrentUser({ name: `${firstName} ${lastName}`.trim() || email });
      setMessage('Profile successfully updated.');
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#e4e7ec] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1d2939]">Profile</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Update your account details and keep your profile information current.
          </p>
        </div>

        {message ? (
          <div className="mb-4 rounded-xl bg-[#ecfdf5] px-4 py-3 text-sm text-[#166534]">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-xl bg-[#fee2e2] px-4 py-3 text-sm text-[#991b1b]">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#1d2939]">First name</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
                placeholder="First name"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1d2939]">Last name</span>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
                placeholder="Last name"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-[#1d2939]">Email address</span>
            <input
              value={email}
              disabled
              className="mt-2 w-full rounded-2xl border border-[#e4e7ec] bg-[#f3f4f6] px-4 py-3 text-sm text-[#667085]"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[#1d2939]">NIN</span>
            <input
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
              placeholder="1234567891011"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[#1d2939]">Phone number</span>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e4e7ec] bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
              placeholder="+23470311787767"
            />
          </label>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-[#1f6ae1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1555c0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

