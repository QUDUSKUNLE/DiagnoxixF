// src/app/about/page.tsx
import AboutUsPage from '@/components/AboutUsPage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="about" />
      <AboutUsPage />
      <Footer />
    </div>
  );
}
