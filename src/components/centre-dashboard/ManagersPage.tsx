"use client";

import { API_ENDPOINTS, apiCall } from '@/lib/api-config';
import { Manager, ManagerResult } from '@/types';
import { Mail, MoreHorizontal, Phone, Search, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';


function StatMini({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
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

function ManagerRow({ manager, onView, onEdit, onViewCentre }: { manager: any; onView?: (m: any) => void; onEdit?: (m: any) => void; onViewCentre?: (c: any) => void }) {
  return (
    <tr className="border-b border-[#e4e7ec] last:border-0 hover:bg-[#f9fafb]/80">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f6ae1]/10 text-sm font-semibold text-[#1f6ae1]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-[#1d2939]">{manager.name}</p>
            <p className="text-xs text-[#667085]">{manager.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-[#667085]">{manager.phone || '—'}</td>
      <td className="px-6 py-4 text-[#667085]">
        {manager.centres && manager.centres.length > 0 ? (
          <div className="flex flex-col gap-1">
            {manager.centres.map((c: any) => (
              <button key={c.id} onClick={() => onViewCentre?.(c)} className="text-sm text-left text-[#1f6ae1] hover:underline">{c.name}</button>
            ))}
          </div>
        ) : (
          <span className="text-sm text-[#667085]">—</span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit?.(manager)} type="button" className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-xs font-medium text-[#0b5dd7] hover:bg-[#f3f8ff]">Edit</button>
          <button onClick={() => onView?.(manager)} type="button" className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-xs font-medium text-[#1f6ae1] hover:bg-[#f9fafb]">View</button>
          <button type="button" className="rounded-lg p-1.5 text-[#667085] hover:bg-[#f2f4f7]" aria-label="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ManagersPage() {
  const [search, setSearch] = useState('');
  const [managers, setManagers] = useState<any[]>([]);
  const [centres, setCentres] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedManager, setSelectedManager] = useState<any | null>(null);
  const [selectedCentre, setSelectedCentre] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingManager, setEditingManager] = useState<any | null>(null);
  const [editDraft, setEditDraft] = useState<any | null>(null);
  const [newManager, setNewManager] = useState<any>({ first_name: '', last_name: '', email: '' });
  const PER_PAGE = 10;

  const mapManagerItems = (items: Manager[]) =>
    items.map((it) => ({
      id: it.id,
      name: it.fullname?.trim() || it.email,
      email: it.email,
      phone: it.phone_number?.trim() || '',
      centres:
        it.diagnostic_centre_id && it.diagnostic_centre_name
          ? [{ id: it.diagnostic_centre_id, name: it.diagnostic_centre_name, address: '', raw: it }]
          : [],
      _payload: it,
    }));

  // Load *unassigned* centres from backend: admin=false
const loadUnassignedCentres = async (pageNum = 1, perPage = 50) => {
  try {
    const json = await apiCall<any>(
      `${API_ENDPOINTS.DIAGNOSTIC_CENTRES_OWNER}?page=${pageNum}&per_page=${perPage}&admin=false`
    );
    const items = Array.isArray(json.data?.result) ? json.data.result : [];
    setCentres(mapCentreItems(items));
  } catch (err: any) {
    console.warn('Failed to load unassigned centres for managers page', err);
  }
};

  const mapCentreItems = (items: any[]) =>
    items.map((it: any) => ({
      id: it.diagnostic_centre_id ?? it.id,
      name: it.diagnostic_centre_name ?? it.name ?? '',
      address: it.address ? [it.address.street, it.address.city, it.address.state, it.address.country].filter(Boolean).join(', ') : '',
      raw: it,
    }));

  const loadManagers = async (pageNum = page) => {
    setLoading(true);
    setLastError(null);
    try {
      const json = await apiCall<ManagerResult>(
        `${API_ENDPOINTS.GET_MANAGERS}?assigned=true&page=${pageNum}&per_page=${PER_PAGE}`
      );
      const items = Array.isArray(json.data.result) ? json.data.result : [];
      const pagination = json.data.pagination;

      setTotal(pagination.total);
      setTotalPages(pagination.total_pages);
      setPage(pageNum);

      const mapped = mapManagerItems(items);
      setManagers(mapped);

      // If centres weren't loaded from the centres API, derive options from managers' payloads.
      const derived = items.reduce((acc: any[], it: any) => {
        if (it.diagnostic_centre_id && it.diagnostic_centre_name) {
          acc.push({ id: it.diagnostic_centre_id, name: it.diagnostic_centre_name, address: '', raw: it });
        }
        return acc;
      }, []);
      if (derived.length) {
        setCentres((prev) => (prev && prev.length ? prev : derived));
      }
    } catch (err: any) {
      setLastError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManagers(1);
  }, []);

  useEffect(() => {
    loadUnassignedCentres();
  }, []);

  // Available centres = unassigned centres from backend.
// Ensure the editing manager's current centre is included (so they can keep it).
const availableCentres = useMemo(() => {
  const list = Array.isArray(centres) ? [...centres] : [];
  const cur = editDraft?.diagnostic_centre_id;
  if (cur && !list.find((c) => String(c.id) === String(cur))) {
    // derive current centre from editingManager (payload or centres array)
    const fromManager =
      editingManager?.centres?.[0] ||
      (editingManager?._payload && {
        id: editingManager._payload.diagnostic_centre_id,
        name: editingManager._payload.diagnostic_centre_name,
        raw: editingManager._payload,
      });
    if (fromManager && fromManager.id) {
      list.unshift({
        id: fromManager.id,
        name: fromManager.name || String(fromManager.id),
        address: fromManager.address || '',
        raw: fromManager.raw || {},
      });
    }
  }
  return list;
}, [centres, editDraft, editingManager]);

  useEffect(() => {
    if (!editingManager) {
      setEditDraft(null);
      return;
    }

    const raw = editingManager._payload || {};

    const fullname =
      raw.fullname ??
      raw.name ??
      editingManager.name ??
      editingManager.fullname ??
      editingManager.email ??
      '';

    const email = raw.email ?? editingManager.email ?? '';

    const phone_number =
      raw.phone_number ??
      raw.phone ??
      editingManager.phone_number ??
      editingManager.phone ??
      '';

    const diagnostic_centre_id =
      raw.diagnostic_centre_id ??
      raw.diagnosticCentreId ??
      editingManager.diagnostic_centre_id ??
      (editingManager.centres && editingManager.centres[0] ? editingManager.centres[0].id : '') ??
      '';

    setEditDraft({
      fullname,
      email,
      phone_number,
      diagnostic_centre_id,
    });
  }, [editingManager]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return managers.filter((m) => {
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone || '').includes(q) ||
        m.centres.some((c: { name: string }) => c.name.toLowerCase().includes(q))
      );
    });
  }, [search, managers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLastError(null);

    const payload = {
      email: newManager.email,
      first_name: newManager.first_name,
      last_name: newManager.last_name,
      user_type: 'DIAGNOSTIC_CENTRE_MANAGER',
    };

    try {
      const json = await apiCall<any>(
        `${API_ENDPOINTS.CREATE_MANAGERS}`,
        {
          method: API_ENDPOINTS.POST_METHOD,
          body: JSON.stringify(payload),
        }
      );

      const created = json.data || json;
      const manager = {
        id: created.id,
        name: `${newManager.first_name} ${newManager.last_name}`.trim() || newManager.email,
        email: newManager.email,
        phone: '',
        centres: [],
        _payload: created,
      };

      setManagers((prev) => [manager, ...prev]);
      setTotal((prevTotal) => {
        const nextTotal = prevTotal + 1;
        setTotalPages((prevPages) => Math.max(prevPages, Math.ceil(nextTotal / PER_PAGE)));
        return nextTotal;
      });
      setNewManager({ first_name: '', last_name: '', email: '' });
      setIsAdding(false);
    } catch (err: any) {
      setLastError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1d2939]">Managers</h1>
        <p className="mt-1 text-lg font-medium text-[#4c545f]">View and manage centre managers</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatMini icon={Users} label="Total Managers" value={String(total)} />
        <div />
        <div />
        <div />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#e4e7ec] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search managers by name, email or phone..." className="w-full rounded-full border border-[#e4e7ec] bg-[#f9fafb] py-2.5 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#9ca3af]" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setIsAdding(true)} type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#e4e7ec] px-4 py-2.5 text-sm font-medium text-[#1f6ae1] transition-colors hover:bg-[#f9fafb]">Add Manager</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-[#f9fafb]">
                <th className="px-6 py-4 font-semibold text-[#667085]">Manager</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Phone</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Centres</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && managers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-[#667085]">Loading managers…</td>
                </tr>
              ) : lastError ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-red-700">
                    <div className="mx-auto max-w-md">
                      <p className="mb-3 text-lg font-medium">Failed to load managers</p>
                      <p className="mb-4 text-sm text-red-800">{lastError}</p>
                      <div className="flex justify-center">
                        <button type="button" onClick={() => loadManagers(page)} className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white">Retry</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-[#667085]">No managers match your search.</td>
                </tr>
              ) : (
                filtered.map((m) => <ManagerRow key={m.id} manager={m} onView={setSelectedManager} onEdit={setEditingManager} onViewCentre={setSelectedCentre} />)
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#e4e7ec] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#667085]">
            Showing{' '}
            <span className="font-semibold text-[#1d2939]">
              {total === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)}
            </span>{' '}
            of <span className="font-semibold text-[#1d2939]">{total}</span> managers
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => loadManagers(page - 1)}
              className="cursor-pointer rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#1f6ae1] px-3 py-1.5 text-sm font-medium text-white"
              aria-current="page"
            >
              {page}
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => loadManagers(page + 1)}
              className="cursor-pointer rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {selectedManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedManager(null)} />
          <div className="relative z-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#1d2939]">{selectedManager.name}</h2>
                <p className="mt-1 text-sm text-[#667085]">{selectedManager.email}</p>
              </div>
              <button onClick={() => setSelectedManager(null)} className="text-sm text-[#667085]">Close</button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm text-[#374151]"><Phone className="h-4 w-4 text-[#9aa4b2]" /> <span>{selectedManager.phone || '—'}</span></div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-[#1d2939]">Assigned Centres</h3>
                <div className="mt-2 flex flex-col gap-2">
                  {selectedManager.centres && selectedManager.centres.length > 0 ? (
                    selectedManager.centres.map((c: any) => (
                      <div key={c.id} className="rounded-md border border-[#e4e7ec] p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#1d2939]">{c.name}</p>
                            {c.address ? <p className="text-sm text-[#667085]">{c.address}</p> : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#667085]">No centres assigned.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCentre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedCentre(null)} />
          <div className="relative z-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#1d2939]">{selectedCentre.name}</h2>
                {selectedCentre.address ? <p className="mt-1 text-sm text-[#667085]">{selectedCentre.address}</p> : null}
              </div>
              <button onClick={() => setSelectedCentre(null)} className="text-sm text-[#667085]">Close</button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="inline-flex items-center gap-2 text-sm text-[#374151]"><Phone className="h-4 w-4 text-[#9aa4b2]" /> <span>{selectedCentre.raw?.contact?.phone ? (Array.isArray(selectedCentre.raw.contact.phone) ? selectedCentre.raw.contact.phone[0] : selectedCentre.raw.contact.phone) : ''}</span></div>
              <div className="inline-flex items-center gap-2 text-sm text-[#374151]"><Mail className="h-4 w-4 text-[#9aa4b2]" /> <span>{selectedCentre.raw?.contact?.email || ''}</span></div>
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsAdding(false)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1d2939]">Add Manager</h2>
              <button onClick={() => setIsAdding(false)} className="text-sm text-[#667085]">Close</button>
            </div>

            {lastError && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{lastError}</div>}
            <form onSubmit={handleCreate} className="mt-4 grid gap-3">
              <div>
                <label className="block text-sm font-medium text-[#1d2939] mb-1.5">First Name</label>
                <input
                  className="w-full rounded-md border border-[#e4e7ec] px-4 py-2.5 text-sm text-[#1d2939] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20 transition-colors"
                  placeholder="Enter first name"
                  value={newManager.first_name}
                  onChange={(e) => setNewManager((s: any) => ({ ...s, first_name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1d2939] mb-1.5">Last Name</label>
                <input
                  className="w-full rounded-md border border-[#e4e7ec] px-4 py-2.5 text-sm text-[#1d2939] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20 transition-colors"
                  placeholder="Enter last name"
                  value={newManager.last_name}
                  onChange={(e) => setNewManager((s: any) => ({ ...s, last_name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1d2939] mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-[#e4e7ec] px-4 py-2.5 text-sm text-[#1d2939] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20 transition-colors"
                  placeholder="Enter email address"
                  value={newManager.email}
                  onChange={(e) => setNewManager((s: any) => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>

              <div className="mt-3 flex gap-2">
                <button type="submit" disabled={loading} className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white hover:bg-[#1555c0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="rounded-lg border border-[#e4e7ec] px-4 py-2 text-sm hover:bg-[#f9fafb] transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingManager && editDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditingManager(null)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1d2939]">Update Manager</h2>
              <button onClick={() => setEditingManager(null)} className="text-sm text-[#667085]">Close</button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setLastError(null);

                const centre = centres.find((c) => c.id === editDraft.diagnostic_centre_id);
                const assignPayload = {
                  diagnostic_centre_id: String(editDraft.diagnostic_centre_id || ''),
                  manager_id: String(editingManager.id),
                };

                try {
                  if (assignPayload.diagnostic_centre_id) {
                    const json = await apiCall<any>(API_ENDPOINTS.ASSIGN_MANAGER, {
                      method: API_ENDPOINTS.POST_METHOD,
                      body: JSON.stringify(assignPayload),
                    });
                    const response = json.data || json;
                    const assignedCentre =
                      centres.find((c) => c.id === assignPayload.diagnostic_centre_id) ||
                      (response?.diagnostic_centre || response?.centre) ||
                      {
                        id: assignPayload.diagnostic_centre_id,
                        name: editDraft.diagnostic_centre_id,
                        address: '',
                        raw: response,
                      };

                    setManagers((prev) => prev.map((m) => {
                      if (m.id !== editingManager.id) return m;
                      return {
                        ...m,
                        name: editDraft.fullname?.trim() || editDraft.email,
                        email: editDraft.email,
                        phone: editDraft.phone_number?.trim() || '',
                        centres: [{
                          id: assignedCentre.id,
                          name: assignedCentre.name || assignedCentre.id,
                          address: assignedCentre.address || '',
                          raw: assignedCentre.raw || centre?.raw || m.centres[0]?.raw,
                        }],
                        _payload: { ...m._payload, ...assignPayload },
                      };
                    }));
                    setCentres((prev) => prev.filter((c) => String(c.id) !== String(assignPayload.diagnostic_centre_id)));
                  } else {
                    const unassignedCentre = editingManager.centres?.[0] || centres.find((c) => String(c.id) === String(editDraft.diagnostic_centre_id));
                    const unassignPayload = {
                      diagnostic_centre_id: String(editingManager.centres?.[0]?.id || editDraft.diagnostic_centre_id || ''),
                    };
                    if (unassignPayload.diagnostic_centre_id) {
                      await apiCall<any>(API_ENDPOINTS.UNASSIGN_MANAGER, {
                        method: API_ENDPOINTS.POST_METHOD,
                        body: JSON.stringify(unassignPayload),
                      });
                    }

                    setManagers((prev) => prev.map((m) => {
                      if (m.id !== editingManager.id) return m;
                      return {
                        ...m,
                        name: editDraft.fullname?.trim() || editDraft.email,
                        email: editDraft.email,
                        phone: editDraft.phone_number?.trim() || '',
                        centres: [],
                        _payload: { ...m._payload, diagnostic_centre_id: null, diagnostic_centre_name: null },
                      };
                    }));
                    if (unassignedCentre?.id) {
                      setCentres((prev) =>
                        prev.some((c) => String(c.id) === String(unassignedCentre.id))
                          ? prev
                          : [unassignedCentre, ...prev]
                      );
                    }
                  }

                  setEditingManager(null);
                } catch (err: any) {
                  setLastError(err?.message || String(err));
                } finally {
                  setLoading(false);
                }
              }}
              className="mt-4 grid gap-3"
            >
              <input
                className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]"
                placeholder="Full name"
                value={editDraft.fullname}
                onChange={(e) => setEditDraft((s: any) => ({ ...s, fullname: e.target.value }))}
              />
              <input
                type="email"
                className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569] disabled:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-70"
                placeholder="Email"
                value={editDraft.email}
                onChange={(e) => setEditDraft((s: any) => ({ ...s, email: e.target.value }))}
                disabled
              />
              <input
                className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]"
                placeholder="Phone"
                value={editDraft.phone_number}
                onChange={(e) => setEditDraft((s: any) => ({ ...s, phone_number: e.target.value }))}
              />
              <select
                value={editDraft.diagnostic_centre_id}
                onChange={(e) => setEditDraft((s: any) => ({ ...s, diagnostic_centre_id: e.target.value }))}
                className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a]"
              >
                <option value="">No centre assigned</option>
                {(() => {
                  const cur = editDraft?.diagnostic_centre_id;
                  if (cur && !centres.find((x) => x.id === cur)) {
                    const fromManager =
                      editingManager?.centres?.[0] ||
                      (editingManager?._payload && {
                        id: editingManager._payload.diagnostic_centre_id,
                        name: editingManager._payload.diagnostic_centre_name,
                      });
                    if (fromManager && fromManager.id) {
                      return (
                        <option key={fromManager.id} value={fromManager.id}>
                          {fromManager.name || fromManager.id}
                        </option>
                      );
                    }
                  }
                  return null;
                })()}
                {availableCentres.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name || c.id}
                  </option>
                ))}
              </select>

              <div className="mt-3 flex gap-2">
                <button type="submit" className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white">Assign</button>
                <button type="button" onClick={() => setEditingManager(null)} className="rounded-lg border border-[#e4e7ec] px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
