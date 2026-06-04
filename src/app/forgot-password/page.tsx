'use client';

import ForgotPassword from '@/components/ForgotPassword';
import { forgotPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  return <ForgotPassword onSubmit={forgotPassword} />;
}
