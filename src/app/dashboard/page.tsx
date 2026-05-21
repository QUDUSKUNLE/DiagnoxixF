'use client';

import { canAccessCentreDashboard, getCurrentUser, getPostLoginPath, logout } from '@/lib/auth';
import { mockCenters, mockTestTypes } from '@/lib/data';
import { formatCurrency, formatDistance } from '@/lib/utils';
import { Booking } from '@/types';
import { User } from '@/types/auth';
import { AlertCircle, Calendar, CheckCircle, Clock, LogOut, Mail, MapPin, Phone, Stethoscope, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock user bookings
const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    centerId: '1',
    testOfferingId: '1',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '+234-123-456-7890',
    timeSlot: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
  {
    id: 'booking-2',
    centerId: '2',
    testOfferingId: '6',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '+234-123-456-7890',
    timeSlot: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
  {
    id: 'booking-3',
    centerId: '3',
    testOfferingId: '10',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '+234-123-456-7890',
    timeSlot: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
  {
    id: 'booking-4',
    centerId: '4',
    testOfferingId: '13',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '+234-123-456-7890',
    timeSlot: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'user-1',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  useEffect(() => {
    const currentUser = getCurrentUser();
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

  const now = new Date();
  const upcomingBookings = bookings.filter(b => new Date(b.timeSlot) >= now && b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter(b => new Date(b.timeSlot) < now || b.status === 'completed' || b.status === 'cancelled');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'completed':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
    }
  };

  const renderBooking = (booking: Booking) => {
    const center = mockCenters.find(c => c.id === booking.centerId);
    const testType = mockTestTypes[0]; // Simplified for demo
    
    return (
      <div key={booking.id} className="bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon(booking.status)}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{testType.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{center?.name}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.timeSlot).toLocaleDateString('en-US', { 
              weekday: 'short',
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{new Date(booking.timeSlot).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a href={`tel:${center?.phone}`} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Phone className="w-4 h-4" />
            Contact Centre
          </a>
          {booking.status === 'confirmed' && (
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors ml-auto">
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-black dark:via-zinc-900 dark:to-black">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-blue-500 rounded-xl blur opacity-20"></div>
                <div className="relative bg-linear-to-br from-blue-600 to-blue-500 p-3 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Diagnoxix AI
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your diagnostic test bookings and view your history
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white dark:bg-zinc-800 p-1 rounded-xl mb-6 w-fit border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 rounded-lg transition-all font-medium ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Upcoming Tests ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 rounded-lg transition-all font-medium ${
              activeTab === 'past'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Past Tests ({pastBookings.length})
          </button>
        </div>

        {/* Bookings */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderBooking)
            ) : (
              <div className="text-center py-20 bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Upcoming Bookings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You don't have any upcoming test appointments
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Book a Test
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastBookings.length > 0 ? (
              pastBookings.map(renderBooking)
            ) : (
              <div className="text-center py-20 bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Past Bookings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your test history will appear here
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

