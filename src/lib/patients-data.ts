export type PatientStatus = 'active' | 'inactive' | 'pending';

export interface PatientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  lastActivity: string;
  registeredAt: string;
  status: PatientStatus;
}

export const patientStats = {
  total: 2847,
  active: 2654,
  newThisMonth: 186,
  withBookings: 1923,
};

export const mockPatients: PatientRecord[] = [
  {
    id: 'p-1',
    name: 'John Adewale',
    email: 'john.adewale@email.com',
    phone: '+234 801 234 5678',
    bookings: 4,
    lastActivity: '2 hours ago',
    registeredAt: 'Jan 12, 2026',
    status: 'active',
  },
  {
    id: 'p-2',
    name: 'Zainab Ali',
    email: 'zainab.ali@email.com',
    phone: '+234 802 345 6789',
    bookings: 2,
    lastActivity: 'Yesterday',
    registeredAt: 'Feb 3, 2026',
    status: 'active',
  },
  {
    id: 'p-3',
    name: 'Emeka Okafor',
    email: 'emeka.okafor@email.com',
    phone: '+234 803 456 7890',
    bookings: 0,
    lastActivity: '3 days ago',
    registeredAt: 'Mar 1, 2026',
    status: 'pending',
  },
  {
    id: 'p-4',
    name: 'Fatima Noor',
    email: 'fatima.noor@email.com',
    phone: '+234 804 567 8901',
    bookings: 7,
    lastActivity: '1 week ago',
    registeredAt: 'Nov 8, 2025',
    status: 'active',
  },
  {
    id: 'p-5',
    name: 'Ahmed Khalid',
    email: 'ahmed.khalid@email.com',
    phone: '+234 805 678 9012',
    bookings: 1,
    lastActivity: 'Jul 29, 2025',
    registeredAt: 'Jul 20, 2025',
    status: 'inactive',
  },
  {
    id: 'p-6',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+234 806 789 0123',
    bookings: 3,
    lastActivity: '5 days ago',
    registeredAt: 'Dec 15, 2025',
    status: 'active',
  },
  {
    id: 'p-7',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+234 807 890 1234',
    bookings: 5,
    lastActivity: 'Today',
    registeredAt: 'Apr 2, 2026',
    status: 'active',
  },
  {
    id: 'p-8',
    name: 'Grace Etim',
    email: 'grace.etim@email.com',
    phone: '+234 808 901 2345',
    bookings: 0,
    lastActivity: 'Never',
    registeredAt: 'Apr 18, 2026',
    status: 'pending',
  },
];
