'use client';

import ForgotPassword from '@/components/ForgotPassword';
import Header from '@/components/Header';
import { forgotPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="login" showNav={false} />
      <ForgotPassword onSubmit={forgotPassword} />
    </div>
);
}
