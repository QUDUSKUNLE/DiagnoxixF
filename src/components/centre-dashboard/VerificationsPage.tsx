'use client';

import { ChevronLeft, ChevronRight, Eye, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type VerificationStatus = 'Pending' | 'Approved' | 'Rejected';
type DocumentType = 'CAC' | 'License' | 'Bank';

interface VerificationRow {
  id: string;
  centreName: string;
  centreAvatar: string;
  documentsUploaded: DocumentType[];
  submitted: string;
  status: VerificationStatus;
}

interface VerificationDetail extends VerificationRow {
  documentStatus: { name: string; approved: boolean }[];
}

const summaryCards = [
  { label: 'Pending Review', value: '21', color: 'text-orange-500' },
  { label: 'Approved This Month', value: '45', color: 'text-green-600' },
  { label: 'Rejected This Month', value: '8', color: 'text-red-500' },
];

const verificationData: VerificationRow[] = [
  {
    id: 'V-001',
    centreName: 'Alpha Labs',
    centreAvatar: 'AL',
    documentsUploaded: ['CAC', 'License', 'Bank'],
    submitted: '2 days ago',
    status: 'Pending',
  },
  {
    id: 'V-002',
    centreName: 'MedCheck Labs',
    centreAvatar: 'ML',
    documentsUploaded: ['CAC', 'License'],
    submitted: '3 days ago',
    status: 'Pending',
  },
  {
    id: 'V-003',
    centreName: 'QuickDiag',
    centreAvatar: 'QD',
    documentsUploaded: ['CAC'],
    submitted: '1 day ago',
    status: 'Pending',
  },
  {
    id: 'V-004',
    centreName: 'LifeCare Diagnostics',
    centreAvatar: 'LD',
    documentsUploaded: ['CAC', 'License', 'Bank'],
    submitted: '5 days ago',
    status: 'Approved',
  },
  {
    id: 'V-005',
    centreName: 'TestRight Labs',
    centreAvatar: 'TL',
    documentsUploaded: ['CAC', 'License'],
    submitted: '3 days ago',
    status: 'Rejected',
  },
];

const statusClasses: Record<VerificationStatus, string> = {
  Pending: 'bg-[#fef3d9] text-[#b66a00]',
  Approved: 'bg-[#dff6ee] text-[#1f8f66]',
  Rejected: 'bg-[#ffe6ea] text-[#c7405a]',
};

function getVerificationDetail(row: VerificationRow): VerificationDetail {
  const documentStatus = [
    { name: 'CAC Certificate', approved: row.documentsUploaded.includes('CAC') },
    { name: 'Operating License', approved: row.documentsUploaded.includes('License') },
    { name: 'Bank Account', approved: row.documentsUploaded.includes('Bank') },
  ];
  return {
    ...row,
    documentStatus,
  };
}

export default function VerificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<VerificationDetail | null>(null);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return verificationData;
    }

    return verificationData.filter((row) =>
      [row.id, row.centreName].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  const handleOpenDetail = (row: VerificationRow) => {
    setSelectedVerification(getVerificationDetail(row));
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[clamp(2rem,3vw,3rem)] font-bold tracking-[-0.06em] text-[#101828]">
          Verification
        </h1>
        <p className="mt-2 text-base text-[#667085]">Review and approve centre applications</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#e4e7ec] bg-[#f5f7fb] px-5 py-5 shadow-[0_1px_0_rgba(16,24,40,0.02)]"
          >
            <p className="text-base text-[#475467]">{card.label}</p>
            <p className={`mt-4 text-[clamp(2rem,2.4vw,3rem)] font-bold tracking-[-0.06em] ${card.color}`}>
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
          aria-label="Search centre"
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

      <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#f5f7fb] text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
                <th className="px-5 py-4">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#d0d5dd] bg-white" />
                </th>
                <th className="px-4 py-4">Centre</th>
                <th className="px-4 py-4">Documents Uploaded</th>
                <th className="px-4 py-4">Submitted</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#101828]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-base text-[#667085]">
                    No centres match your search.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t border-[#e4e7ec] transition-colors hover:bg-[#f9fafb]"
                  >
                    <td className="px-5 py-5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#d0d5dd] bg-white" />
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e7ec] text-sm font-semibold text-[#667085]">
                          {row.centreAvatar}
                        </div>
                        <span className="text-sm font-medium text-[#101828]">{row.centreName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-wrap gap-2">
                        {row.documentsUploaded.map((doc) => (
                          <span
                            key={doc}
                            className="inline-flex rounded-full bg-[#e4e7ec] px-3 py-1 text-xs font-medium text-[#475467]"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm text-[#344054]">{row.submitted}</td>
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
                        onClick={() => handleOpenDetail(row)}
                        aria-label={`Review ${row.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#1f6ae1] bg-white px-4 py-2 text-sm font-medium text-[#1f6ae1] shadow-sm transition-colors hover:bg-[#eff6ff]"
                      >
                        <Eye className="h-4 w-4" />
                        Review
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

      {selectedVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/20 backdrop-blur-[2px]">
          <div className="w-full max-w-[500px] rounded-[16px] border border-[#e4e7ec] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.28)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-[-0.05em] text-[#101828]">
                Verification Review
              </h2>
              <button
                type="button"
                onClick={() => setSelectedVerification(null)}
                aria-label="Close verification review"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#667085] transition-colors hover:bg-[#f5f7fb]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-[#e4e7ec] bg-[#f9fafb] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dbeafe] text-base font-semibold text-[#1f6ae1]">
                  {selectedVerification.centreAvatar}
                </div>
                <div>
                  <p className="font-semibold text-[#101828]">{selectedVerification.centreName}</p>
                  <p className="text-sm text-[#667085]">Submitted {selectedVerification.submitted}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-[#101828]">Document Status</h3>
              <div className="space-y-3">
                {selectedVerification.documentStatus.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between rounded-lg border border-[#e4e7ec] bg-[#f9fafb] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        {doc.approved ? (
                          <span className="text-lg text-green-500">✓</span>
                        ) : (
                          <span className="text-lg text-red-500">✕</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#101828]">{doc.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedVerification(null)}
                className="rounded-full border border-[#d0d5dd] bg-white px-4 py-3 text-base font-semibold text-[#ef4444] transition-colors hover:bg-[#fef2f2]"
              >
                ✕ Reject
              </button>
              <button
                type="button"
                onClick={() => setSelectedVerification(null)}
                className="rounded-full bg-[#1f6ae1] px-4 py-3 text-base font-semibold text-white shadow-[0_4px_12px_rgba(31,106,225,0.3)] transition-colors hover:bg-[#1e5bb8]"
              >
                ✓ Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
