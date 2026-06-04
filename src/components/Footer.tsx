// src/components/Footer.tsx
import AppStoreBadges from '@/components/AppStoreBadges';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <img src="/images/logo.svg" alt="DiagnoxixAI" className="mb-4" />
          <p className="text-gray-400">Smarter access to diagnostic healthcare through real-time matching and transparent pricing.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/for-patients">For Patients</Link></li>
            <li><Link href="/for-centres">For Diagnostic Centres</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Download</h3>
          <AppStoreBadges href="/download-app" />
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        © 2026 DiagnoxixAI. All Rights Reserved.
      </div>
    </div>
  );
}
