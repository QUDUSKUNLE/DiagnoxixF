// src/app/admin/page.tsx
'use client';

import { getCurrentUser, logout } from '@/lib/auth';
import { mockCenters, mockTestTypes } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { User } from '@/types/auth';
import {
  BarChart3,
  Building2,
  Calendar,
  FileText,
  LogOut,
  Settings,
  Stethoscope,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const currentUser = getCurrentUser();

    console.log(currentUser, "&&&&&&&")
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  // Mock admin stats
  const stats = {
    totalCenters: mockCenters.length,
    totalTests: mockTestTypes.length,
    totalBookings: 42, // Mock
    revenue: 1250000, // Mock
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 p-3 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Diagnoxix AI
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Admin Panel</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('centers')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'centers'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Centers
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'tests'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Tests
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Users
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Centers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalCenters}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Test Types</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalTests}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatCurrency(stats.revenue)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">Welcome to the admin dashboard. Select a tab above to manage different aspects of the system.</p>
          </div>
        )}

        {activeTab === 'centers' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Diagnostic Centers</h2>
            <div className="space-y-4">
              {mockCenters.map(center => (
                <div key={center.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{center.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{center.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {center.rating}/5</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{center.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Test Types</h2>
            <div className="space-y-4">
              {mockTestTypes.map(test => (
                <div key={test.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{test.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    {test.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">User Management</h2>
            <p className="text-gray-600 dark:text-gray-400">User management features coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
