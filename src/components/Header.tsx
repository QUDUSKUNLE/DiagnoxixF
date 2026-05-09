// src/components/Header.tsx
import Link from 'next/link';

export default function Header({ active = 'home' }: { active?: string }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="DiagnoxixAI" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-blue-600">DiagnoxixAI</span>
          </Link>

          {/* Navigation */}
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

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Login
            </Link>
            <Link href="/get-started" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
