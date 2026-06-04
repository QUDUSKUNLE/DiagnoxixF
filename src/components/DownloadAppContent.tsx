import AppStoreBadges from '@/components/AppStoreBadges';
import BrandLogo from '@/components/BrandLogo';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Search, Smartphone } from 'lucide-react';
import Link from 'next/link';

const appFeatures = [
  {
    icon: Search,
    title: 'Find diagnostic centres',
    description: 'Search by location, test type, and price near you.',
  },
  {
    icon: Calendar,
    title: 'Book tests easily',
    description: 'Schedule appointments and manage bookings in one place.',
  },
  {
    icon: MapPin,
    title: 'Compare and choose',
    description: 'View ratings, availability, and transparent pricing.',
  },
];

interface DownloadAppContentProps {
  userEmail?: string;
  onLogout?: () => void;
}

export default function DownloadAppContent({
  userEmail,
  onLogout,
}: DownloadAppContentProps) {
  const playStoreUrl =
    process.env.NEXT_PUBLIC_PLAY_STORE_URL || 'https://play.google.com/store';
  const appStoreUrl =
    process.env.NEXT_PUBLIC_APP_STORE_URL || 'https://apps.apple.com';

  return (
    <div className='bg-white'>
      <header className="border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
          <BrandLogo href="/" />
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-[#e4e7ec] px-4 py-2 text-sm font-medium text-[#667085] transition-colors hover:bg-[#f9fafb] hover:text-[#1d2939]"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              Log in
            </Link>
          )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex-1 max-w-4xl px-6 py-12 sm:py-16">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1f6ae1]/10">
            <Smartphone className="h-8 w-8 text-[#1f6ae1]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1d2939] sm:text-3xl">
            Get the DiagnoxixAI mobile app
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#4c545f]">
            {userEmail
              ? 'Your account is set up for the patient experience. Download our app to find centres, book diagnostic tests, and manage your care on the go.'
              : 'Download our app to find diagnostic centres, book tests, and manage appointments. The web portal is for centres and administrators.'}
          </p>
          {userEmail && (
            <p className="mt-3 text-sm text-[#667085]">
              Signed in as{' '}
              <span className="font-semibold text-[#1d2939]">{userEmail}</span>
            </p>
          )}
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
          {appFeatures.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="rounded-2xl border border-[#e4e7ec] bg-white p-5 text-center sm:text-left"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2f4f7] sm:mx-0">
                <Icon className="h-5 w-5 text-[#1f6ae1]" />
              </div>
              <h2 className="text-sm font-semibold text-[#1d2939]">{title}</h2>
              <p className="mt-1 text-xs text-[#667085]">{description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-[#e4e7ec] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-[#1d2939]">
            Download for iOS or Android
          </p>
          <p className="mt-1 text-sm text-[#667085]">
            Tap a store below to install the app on your device.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreBadges
              playStoreUrl={playStoreUrl}
              appStoreUrl={appStoreUrl}
              badgeClassName="h-14 w-44 object-contain"
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-[#667085]">
          Questions about your account?{' '}
          <Link
            href="/contact"
            className="font-medium text-[#1f6ae1] hover:underline"
          >
            Contact support
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
