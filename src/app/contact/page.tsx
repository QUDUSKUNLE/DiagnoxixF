// src/app/contact/page.tsx
import ContactUsPage from '@/components/ContactUsPage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="contact" />
      <ContactUsPage />
      <Footer />
    </div>
  );
}
