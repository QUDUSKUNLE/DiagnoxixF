// src/components/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-blue-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Find <span className="text-blue-600">diagnostic centres</span> near you.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Negotiate prices. Book instantly.
        </p>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          A real-time healthcare marketplace that connects patients with verified diagnostic centres fast, transparent, and trusted.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 text-lg font-medium">
            Get the App
          </Link>
          <Link href="/join" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 text-lg font-medium">
            Join as a Diagnostic Center
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Patients</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
            <div className="text-gray-600">Centres</div>
          </div>
        </div>
      </div>
    </section>
  );
}
