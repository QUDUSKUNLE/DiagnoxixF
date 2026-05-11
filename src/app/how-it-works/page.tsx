// src/app/how-it-works/page.tsx
import Header from '@/components/Header';
import HowItWorksPage from '@/components/HowItWorksPage';
import Footer from '@/components/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="how-it-works" />
      <HowItWorksPage />
      <Footer />
    </div>
  );
}
