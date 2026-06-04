'use client';

import Header from '@/components/Header';
import ResendVerification from '@/components/ResendVerification';


export default function ResendVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header active="login" showNav={false} />
      <ResendVerification />
    </div>
  )
}
  
