// src/components/Header.tsx
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

type HeaderProps = {
  active?: string;
  /** When false, only the DiagnoxixAI logo is shown (e.g. login, admin). Default true for marketing pages. */
  showNav?: boolean;
};

export default function Header({ active = 'home', showNav = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <BrandLogo />

          {showNav && (
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`font-medium ${active === 'home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                Home
              </Link>
              <Link href="/how-it-works" className={`font-medium ${active === 'how-it-works' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                How it works
              </Link>
              <Link href="/about" className={`font-medium ${active === 'about' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                About Us
              </Link>
              <Link href="/contact" className={`font-medium ${active === 'contact' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'}`}>
                Contact
              </Link>
            </nav>
          )}

          {/* Buttons */}
          <div className={`flex items-center gap-4 ${
            active === 'login' ? 'invisible' : ''
          }`}>
            <Link
              href="/login"
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
