'use client';

import { getCurrentUser, getPostLoginPath, login, register } from '@/lib/auth';
import { ApiUserType, LoginCredentials, RegisterData } from '@/types/auth';
import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    user_type: 'PATIENT',
  });

  function formatError(err: unknown): string {
    if (!err) return 'An unexpected error occurred';
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message || 'An unexpected error occurred';
    try {
      const e = err as any;
      if (e?.message) return String(e.message);
      if (e?.error?.message) return String(e.error.message);
      return JSON.stringify(e);
    } catch {
      return 'An unexpected error occurred';
    }
  }

  function renderError(err: string | null) {
    if (!err) return null;
    // Try parse JSON error payloads returned from the API
    try {
      const parsed = JSON.parse(err);
      // Array of messages
      if (Array.isArray(parsed)) {
        return (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg dark:bg-red-700">
            <ul className="list-disc pl-5 text-sm text-white">
              {parsed.map((m, i) => (
                <li key={i}>{String(m)}</li>
              ))}
            </ul>
          </div>
        );
      }

      // Object with message or error fields
      if (typeof parsed === 'object' && parsed !== null) {
        const primary = parsed.message ?? parsed.error?.message ?? null;
        const details = parsed.errors ?? parsed.error?.errors ?? null;

        return (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg dark:bg-red-700">
            {primary && <p className="text-sm text-white">{String(primary)}</p>}
            {details && Array.isArray(details) && (
              <ul className="list-disc pl-5 text-sm text-white mt-2">
                {details.map((d: any, i: number) => (
                  <li key={i}>{String(d)}</li>
                ))}
              </ul>
            )}
            {!primary && !details && (
              <pre className="text-xs text-white whitespace-pre-wrap">{JSON.stringify(parsed, null, 2)}</pre>
            )}
          </div>
        );
      }
    } catch {
      // not JSON
    }

    // Fallback: plain string
    return (
      <div className="mb-6 p-4 bg-red-600 text-white rounded-lg dark:bg-red-700">
        <p className="text-sm text-white">{err}</p>
      </div>
    );
  }

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      router.push(getPostLoginPath(user));
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await login(loginForm);
      router.push(getPostLoginPath(user));
    } catch (err: any) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await register(registerForm);
      setSuccess('Registration successful — please check your email to confirm your registration.');
    } catch (err: any) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              {isLogin ? 'Sign in to DiagnoxixAI' : 'Sign up for DiagnoxixAI'}
            </p>
          </div>

        {/* Toggle Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 border border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              isLogin
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              !isLogin
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {renderError(error)}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
              <Link
  href="/forgot-password"
  className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
>
  Forgot password?
</Link>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? 'Loging in...' : 'Sign in'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  First name
                </label>
                <input
                  type="text"
                  value={registerForm.first_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Last name
                </label>
                <input
                  type="text"
                  value={registerForm.last_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Account type
                </label>
                <select
                  value={registerForm.user_type}
                  onChange={(e) => setRegisterForm({ ...registerForm, user_type: e.target.value as ApiUserType })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                >
                  <option value="PATIENT">Patient</option>
                  <option value="DIAGNOSTIC_CENTRE_OWNER">Diagnostic Centre Owner</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Password
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Confirm password
                </label>
                <input
                  type="password"
                  value={registerForm.confirm_password}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirm_password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
          )}

          {/* Footer Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
