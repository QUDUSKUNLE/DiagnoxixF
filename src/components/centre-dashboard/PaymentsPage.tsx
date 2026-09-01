'use client';

import { ChevronLeft, ChevronRight, Eye, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type PaymentTab = 'patient' | 'centre';
type PaymentStatus = 'Success' | 'Pending' | 'Failed';

interface PaymentRow {
  id: string;
  patient: string;
  amount: number;
  method: string;
  date: string;
  status: PaymentStatus;
}

interface PaymentDetail extends PaymentRow {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  centreName: string;
  amountPaid: number;
  subtotal: number;
  platformFee: number;
  centreEarnings: number;
  gateway: string;
  referenceId: string;
  cardType: string;
  last4: string;
  bookingId: string;
  bookingTest: string;
  bookingStatus: string;
}

const summaryCards = [
  { label: "Today's Collections", value: '₦1,320,000' },
  { label: 'Pending Payouts', value: '₦285,000' },
  { label: 'Completed Payouts', value: '₦4,560,000' },
  { label: 'Platform Fees', value: '₦456,000' },
];

const patientPayments: PaymentRow[] = [
  {
    id: 'TX-88321',
    patient: 'John A.',
    amount: 5000,
    method: 'Card',
    date: '21 Jan',
    status: 'Success',
  },
  {
    id: 'TX-88322',
    patient: 'Amaka O.',
    amount: 4500,
    method: 'Bank Transfer',
    date: '21 Jan',
    status: 'Success',
  },
  {
    id: 'TX-88323',
    patient: 'Emeka N.',
    amount: 12000,
    method: 'Opay',
    date: '21 Jan',
    status: 'Pending',
  },
  {
    id: 'TX-88324',
    patient: 'Fatima B.',
    amount: 0,
    method: 'MRI',
    date: '20 Jan',
    status: 'Failed',
  },
  {
    id: 'TX-88325',
    patient: 'Daniel K.',
    amount: 7800,
    method: 'Wallet',
    date: '19 Jan',
    status: 'Success',
  },
];

const centrePayouts: PaymentRow[] = [
  {
    id: 'PY-1182',
    patient: 'Medix Lab',
    amount: 180000,
    method: 'Bank Transfer',
    date: '21 Jan',
    status: 'Success',
  },
  {
    id: 'PY-1183',
    patient: 'Carepoint Diagnostics',
    amount: 96000,
    method: 'Bank Transfer',
    date: '20 Jan',
    status: 'Pending',
  },
  {
    id: 'PY-1184',
    patient: 'Alpha Scan Centre',
    amount: 120000,
    method: 'Card',
    date: '20 Jan',
    status: 'Failed',
  },
  {
    id: 'PY-1185',
    patient: 'Blue River Lab',
    amount: 220000,
    method: 'Bank Transfer',
    date: '19 Jan',
    status: 'Success',
  },
  {
    id: 'PY-1186',
    patient: 'Greenline Clinic',
    amount: 150000,
    method: 'Wallet',
    date: '18 Jan',
    status: 'Pending',
  },
];

const statusClasses: Record<PaymentStatus, string> = {
  Success: 'bg-[#dff6ee] text-[#1f8f66]',
  Pending: 'bg-[#fef3d9] text-[#b66a00]',
  Failed: 'bg-[#ffe6ea] text-[#c7405a]',
};

const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

function getPaymentDetail(row: PaymentRow, tab: PaymentTab): PaymentDetail {
  const centreName = tab === 'patient' ? 'MediLab Diagnostics' : row.patient;
  const patientName = tab === 'patient' ? row.patient : 'MediLab Diagnostics';
  const paymentMethod = row.method;
  const originalAmount = row.amount || 5000;
  const platformFee = Math.round(originalAmount * 0.1);

  return {
    ...row,
    patientName,
    patientEmail: tab === 'patient' ? 'john@email.com' : 'finance@medilab.com',
    patientPhone: tab === 'patient' ? '+234 812 678 6899' : '+234 803 345 7712',
    centreName,
    amountPaid: originalAmount,
    subtotal: originalAmount,
    platformFee,
    centreEarnings: originalAmount - platformFee,
    gateway: 'Paystack',
    referenceId: `PSK_${row.id.replace(/[^0-9]/g, '').slice(-6)}`,
    cardType: paymentMethod.includes('Card') ? 'Master Card' : 'Debit Card',
    last4: '4242',
    bookingId: `BK-${row.id.replace(/[^0-9]/g, '').slice(-5)}`,
    bookingTest: row.method === 'MRI' ? 'Blood Test' : 'Blood Test',
    bookingStatus: row.status === 'Failed' ? 'Cancelled' : 'Completed',
  };
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<PaymentTab>('patient');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentDetail | null>(null);

  const rows = useMemo(
    () => (activeTab === 'patient' ? patientPayments : centrePayouts),
    [activeTab],
  );

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      [row.id, row.patient, row.method, row.date].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery, rows]);

  const handleOpenDetail = (row: PaymentRow) => {
    setSelectedPayment(getPaymentDetail(row, activeTab));
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[clamp(2rem,3vw,3rem)] font-bold tracking-[-0.06em] text-[#101828]">
          Payments &amp; Payouts
        </h1>
        <p className="mt-2 text-base text-[#667085]">Manage financial transactions</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#e4e7ec] bg-[#f5f7fb] px-5 py-5 shadow-[0_1px_0_rgba(16,24,40,0.02)]"
          >
            <p className="text-base text-[#475467]">{card.label}</p>
            <p className="mt-4 text-[clamp(2rem,2.4vw,3rem)] font-bold tracking-[-0.06em] text-[#101828]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-[#dfe4ea] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3 text-[#98a2b3]">
          <Search className="h-6 w-6" />
        </div>
        <input
          type="text"
          aria-label="Search patient"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Input to search Patient by name, phone, or ID."
          className="flex-1 border-0 bg-transparent text-base text-[#101828] placeholder:text-[#667085] focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#667085] hover:bg-[#f5f7fb]"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="rounded-[22px] border border-[#e4e7ec] bg-[#f3f4f6] p-1">
        <div className="flex w-full max-w-md gap-1 rounded-[18px] bg-transparent">
          {[
            { key: 'patient', label: 'Patient Payments' },
            { key: 'centre', label: 'Centre Payouts' },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as PaymentTab)}
                className={`flex-1 rounded-2xl px-5 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-[#101828] shadow-sm'
                    : 'text-[#475467] hover:text-[#101828]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#f5f7fb] text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
                <th className="px-5 py-4">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#d0d5dd] bg-white" />
                </th>
                <th className="px-4 py-4">Transaction ID</th>
                <th className="px-4 py-4">{activeTab === 'patient' ? 'Patient' : 'Centre'}</th>
                <th className="px-4 py-4">Amount (₦)</th>
                <th className="px-4 py-4">Method</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#101828]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-base text-[#667085]">
                    No transactions match your search.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleOpenDetail(row)}
                    className="cursor-pointer border-t border-[#e4e7ec] transition-colors hover:bg-[#f9fafb]"
                  >
                    <td className="px-5 py-5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#d0d5dd] bg-white" />
                    </td>
                    <td className="px-4 py-5 text-sm font-medium text-[#101828]">{row.id}</td>
                    <td className="px-4 py-5 text-sm text-[#344054]">{row.patient}</td>
                    <td className="px-4 py-5 text-sm font-medium text-[#101828]">
                      {row.amount === 0 ? '₦0' : `₦${row.amount.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-5 text-sm text-[#344054]">{row.method}</td>
                    <td className="px-4 py-5 text-sm text-[#344054]">{row.date}</td>
                    <td className="px-4 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <button
                        type="button"
                        aria-label={`View ${row.id}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenDetail(row);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#101828] transition-colors hover:border-[#98a2b3]"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pb-2">
        <p className="text-sm text-[#667085]">Showing 1-5 from 100 data</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#101828] transition-colors hover:bg-[#f5f7fb]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                currentPage === page
                  ? 'bg-[#101828] text-white'
                  : 'border border-[#d0d5dd] bg-white text-[#101828] hover:bg-[#f5f7fb]'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((page) => Math.min(3, page + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#101828] transition-colors hover:bg-[#f5f7fb]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#111827]/25 p-0 backdrop-blur-[1px]">
          <div className="relative flex h-screen w-full max-w-[440px] flex-col overflow-hidden border-l border-[#e4e7ec] bg-[#f3f4f6] shadow-[0_20px_60px_rgba(15,23,42,0.28)]">
            <div className="flex items-center justify-between border-b border-[#e4e7ec] bg-white px-3 py-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#667085]">
                  Transaction Details
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                aria-label="Close payment details"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d0d5dd] bg-white text-[#475467] transition-colors hover:bg-[#f9fafb]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="rounded-[18px] bg-white p-4 shadow-sm ring-1 ring-[#e4e7ec]">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="mt-1 text-[1.6rem] font-bold tracking-[-0.05em] text-[#101828]">
                      {selectedPayment.id}
                    </h2>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses[selectedPayment.status]}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <section className="rounded-xl border border-[#e4e7ec] bg-[#f8fafc] p-3">
                    <h3 className="mb-3 text-sm font-semibold text-[#101828]">Transaction Summary</h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Status</span>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[selectedPayment.status]}`}>
                          {selectedPayment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Amount Paid</span>
                        <span className="font-semibold text-[#101828]">{formatCurrency(selectedPayment.amountPaid)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Payment Method</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.method}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Transaction Date</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.date}</span>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#e4e7ec] bg-[#f8fafc] p-3">
                    <h3 className="mb-3 text-sm font-semibold text-[#101828]">Participants</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-[11px] text-[#475467]">Patient</p>
                        <p className="text-sm font-semibold text-[#101828]">{selectedPayment.patientName}</p>
                        <p className="text-[11px] text-[#667085]">{selectedPayment.patientEmail}</p>
                        <p className="text-[11px] text-[#667085]">{selectedPayment.patientPhone}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] text-[#475467]">Centre</p>
                        <p className="text-sm font-semibold text-[#101828]">{selectedPayment.centreName}</p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#e4e7ec] bg-[#f8fafc] p-3">
                    <h3 className="mb-3 text-sm font-semibold text-[#101828]">Payment Breakdown</h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Subtotal</span>
                        <span className="font-semibold text-[#101828]">{formatCurrency(selectedPayment.subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Platform Fee</span>
                        <span className="font-semibold text-[#101828]">{formatCurrency(selectedPayment.platformFee)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Centre Earnings</span>
                        <span className="font-semibold text-[#101828]">{formatCurrency(selectedPayment.centreEarnings)}</span>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#e4e7ec] bg-[#f8fafc] p-3">
                    <h3 className="mb-3 text-sm font-semibold text-[#101828]">Payment Provider Info</h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Gateway</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.gateway}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Reference ID</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.referenceId}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Card Type</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.cardType}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Last 4 Digits</span>
                        <span className="font-semibold text-[#101828]">•••• {selectedPayment.last4}</span>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#e4e7ec] bg-[#f8fafc] p-3">
                    <h3 className="mb-3 text-sm font-semibold text-[#101828]">Related Booking</h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Booking ID</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.bookingId}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Test</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.bookingTest}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[#475467]">
                        <span>Status</span>
                        <span className="font-semibold text-[#101828]">{selectedPayment.bookingStatus}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#1f6ae1] bg-white px-3 py-2.5 text-sm font-semibold text-[#1f6ae1] transition-colors hover:bg-[#eff6ff]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Bookings
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
