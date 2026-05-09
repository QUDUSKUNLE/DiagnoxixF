// src/app/page.tsx (New Landing Page)
import DecorativeBanner from '@/components/DecorativeBanner';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import TrustSecurity from '@/components/TrustSecurity';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="home"/>
      <HeroSection />
      <DecorativeBanner />
      <HowItWorks />
      <WhyChooseUs />
      <TrustSecurity />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
