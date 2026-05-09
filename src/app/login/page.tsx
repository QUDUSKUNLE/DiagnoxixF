'use client';

import { isAuthenticated, login, register } from '@/lib/auth';
import { LoginCredentials, RegisterData } from '@/types/auth';
import { Lock, Mail, Phone, Stethoscope, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: 'john@example.com',
    password: 'password123',
  });
  const [registerForm, setRegisterForm] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(loginForm);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(registerForm);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-black dark:via-zinc-900 dark:to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Welcome to Diagnoxix AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Sign in to access your bookings' : 'Create your account'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 bg-white dark:bg-zinc-800 p-1 rounded-xl mb-6 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-4 py-2 rounded-lg transition-all ${
              isLogin
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-4 py-2 rounded-lg transition-all ${
              !isLogin
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

