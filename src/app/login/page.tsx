// src/app/login/page.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Login from '@/components/Login';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="login" showNav={false} />
      <Login />
      <Footer />
    </div>
  );
}
