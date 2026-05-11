// src/app/login/page.tsx
import Login from '@/components/Login';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="login" />
      <Login />
      {/* <Footer /> */}
    </div>
  );
}
