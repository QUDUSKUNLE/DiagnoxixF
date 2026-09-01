'use client';

import {
  mockPatients,
  patientStats,
  type PatientRecord,
  type PatientStatus,
} from '@/lib/patients-data';
import {
  Download,
  MoreHorizontal,
  Search,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const statusFilters: Array<{ value: PatientStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'inactive', label: 'Inactive' },
];

function statusStyles(status: PatientStatus) {
  switch (status) {
    case 'active':
      return 'bg-[#ecfdf3] text-[#039855]';
    case 'pending':
      return 'bg-[#fef5ed] text-[#f2994a]';
    case 'inactive':
      return 'bg-[#f2f4f7] text-[#667085]';
  }
}

function PatientAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f6ae1]/10 text-sm font-semibold text-[#1f6ae1]">
      {initials}
    </div>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'all'>('all');

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mockPatients.filter((patient) => {
      const matchesStatus =
        statusFilter === 'all' || patient.status === statusFilter;
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1d2939]">Patients</h1>
        <p className="mt-1 text-lg font-medium text-[#4c545f]">
          View and manage all registered patients
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatMini
          icon={Users}
          label="Total Patients"
          value={patientStats.total.toLocaleString()}
        />
        <StatMini
          icon={UserCheck}
          label="Active Patients"
          value={patientStats.active.toLocaleString()}
        />
        <StatMini
          icon={UserPlus}
          label="New This Month"
          value={patientStats.newThisMonth.toLocaleString()}
        />
        <StatMini
          icon={Users}
          label="With Bookings"
          value={patientStats.withBookings.toLocaleString()}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#e4e7ec] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full rounded-full border border-[#e4e7ec] bg-[#f9fafb] py-2.5 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-[#e4e7ec] bg-[#f9fafb] p-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    statusFilter === filter.value
                      ? 'bg-white text-[#1f6ae1] shadow-sm'
                      : 'text-[#667085] hover:text-[#1d2939]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e4e7ec] px-4 py-2.5 text-sm font-medium text-[#1d2939] transition-colors hover:bg-[#f9fafb]"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-[#f9fafb]">
                <th className="px-6 py-4 font-semibold text-[#667085]">Patient</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Email</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Phone</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Bookings</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Last Activity</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Status</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-[#667085]"
                  >
                    No patients match your search or filters.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#e4e7ec] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#667085]">
            Showing{' '}
            <span className="font-semibold text-[#1d2939]">
              {filteredPatients.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-[#1d2939]">
              {mockPatients.length}
            </span>{' '}
            patients
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1f6ae1] px-3 py-1.5 text-sm font-medium text-white"
            >
              1
            </button>
            <button
              type="button"
              className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] hover:bg-[#f9fafb]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e4e7ec] bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f4f7]">
        <Icon className="h-6 w-6 text-[#1f6ae1]" />
      </div>
      <div>
        <p className="text-xs text-[#667085]">{label}</p>
        <p className="text-xl font-bold text-[#1d2939]">{value}</p>
      </div>
    </div>
  );
}

function PatientRow({ patient }: { patient: PatientRecord }) {
  return (
    <tr className="border-b border-[#e4e7ec] last:border-0 hover:bg-[#f9fafb]/80">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <PatientAvatar name={patient.name} />
          <div>
            <p className="font-semibold text-[#1d2939]">{patient.name}</p>
            <p className="text-xs text-[#667085]">Joined {patient.registeredAt}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-[#667085]">{patient.email}</td>
      <td className="px-6 py-4 text-[#667085]">{patient.phone}</td>
      <td className="px-6 py-4 font-medium text-[#1d2939]">{patient.bookings}</td>
      <td className="px-6 py-4 text-[#667085]">{patient.lastActivity}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles(patient.status)}`}
        >
          {patient.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-xs font-medium text-[#1f6ae1] hover:bg-[#f9fafb]"
          >
            View
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#667085] hover:bg-[#f2f4f7]"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
