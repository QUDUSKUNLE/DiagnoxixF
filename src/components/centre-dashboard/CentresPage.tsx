"use client";

import { API_ENDPOINTS, apiCall, getApiUrl } from '@/lib/api-config';
import { getAuthToken } from '@/lib/auth';
import { Building2, Mail, MoreHorizontal, Phone, Search, Star } from 'lucide-react';
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

function CentreRow({ centre, onView, onArchive, onEdit }: { centre: any; onView?: (c: any) => void; onArchive?: (id: string) => void; onEdit?: (c: any) => void }) {
  return (
    <tr className="border-b border-[#e4e7ec] last:border-0 hover:bg-[#f9fafb]/80">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f6ae1]/10 text-sm font-semibold text-[#1f6ae1]">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-[#1d2939]">{centre.name}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-[#667085]">{centre.address}</td>
      <td className="px-6 py-4 text-[#667085]">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 whitespace-nowrap">
            <Phone className="h-4 w-4 text-[#9aa4b2]" />
            <span className="text-sm">{centre.phone}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#9aa4b2]" />
            <span className="truncate text-sm max-w-[220px]">{centre.email}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {typeof centre.rating === 'number' ? (
          <div className="inline-flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-medium text-[#1d2939]">{centre.rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-sm text-[#667085]">—</span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit?.(centre)} type="button" className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-xs font-medium text-[#0b5dd7] hover:bg-[#f3f8ff]">Edit</button>
          <button onClick={() => onView?.(centre)} type="button" className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-xs font-medium text-[#1f6ae1] hover:bg-[#f9fafb]">View</button>
          <button onClick={() => { if (confirm('Archive this centre?')) onArchive?.(centre.id); }} type="button" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Archive</button>
          <button type="button" className="rounded-lg p-1.5 text-[#667085] hover:bg-[#f2f4f7]" aria-label="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function CentresPage() {
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState<number | 'all'>('all');
  const [selectedCentre, setSelectedCentre] = useState<any | null>(null);
  const [centres, setCentres] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [total, setTotal] = useState<number>(0)
  const [newCentre, setNewCentre] = useState<any>({
    diagnostic_centre_name: '',
    admin_id: '',
    address: { street: '', city: '', state: '', country: '' },
    contact: { email: '', phone: [''] },
    test_prices: [{ price: '', test_type: 'BLOOD_TEST' }],
    doctors: [''],
    latitude: '',
    longitude: '',
  });
  const [editingCentre, setEditingCentre] = useState<any | null>(null);
  const [editDraft, setEditDraft] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdding) return;
    if (!('geolocation' in navigator)) return;
    // Only set if not already provided
    if (newCentre.latitude && newCentre.longitude) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setNewCentre((s: any) => ({ ...s, latitude: String(pos.coords.latitude), longitude: String(pos.coords.longitude) }));
      },
      () => {},
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, [isAdding]);

  // initialize edit draft when editingCentre is set
  useEffect(() => {
    if (!editingCentre) {
      setEditDraft(null);
      return;
    }

    const raw = editingCentre._payload || {};
    const payload = {
      diagnostic_centre_name: raw.diagnostic_centre_name ?? editingCentre.name ?? '',
      admin_id: raw.admin_id ?? raw.adminId ?? '',
      address: {
        street: raw.address?.street ?? raw.street ?? '',
        city: raw.address?.city ?? raw.city ?? '',
        state: raw.address?.state ?? raw.state ?? '',
        country: raw.address?.country ?? raw.country ?? '',
      },
      contact: {
        email: raw.contact?.email ?? raw.email ?? editingCentre.email ?? '',
        phone: Array.isArray(raw.contact?.phone) ? raw.contact.phone : (raw.contact?.phone ? [raw.contact.phone] : (editingCentre.phone ? [editingCentre.phone] : [''])),
      },
      test_prices: Array.isArray(raw.test_prices) && raw.test_prices.length > 0 ? raw.test_prices.map((t: any) => ({ price: t.price != null ? String(t.price) : '', test_type: t.test_type || t.type || 'BLOOD_TEST' })) : [{ price: '', test_type: 'BLOOD_TEST' }],
      doctors: Array.isArray(raw.doctors) ? raw.doctors : (editingCentre.doctors ?? []),
      latitude: raw.latitude ?? editingCentre.latitude ?? '',
      longitude: raw.longitude ?? editingCentre.longitude ?? '',
    };

    setEditDraft(payload);
  }, [editingCentre]);

  // fetch centres from backend API on mount
  // central fetch function so we can call it manually after setting token
  const loadCentres = async () => {
    setLoading(true);
    try {

      const json = await apiCall<any>(API_ENDPOINTS.DIAGNOSTIC_CENTRES_OWNER + '?page=1&per_page=10');
      // Debug log raw response
      const items = Array.isArray(json) ? json : (json.data.result || []);

      const mapped = items.map((it: any) => {
        const payload = it;
        const name = it.diagnostic_centre_name || it.name || '';
        let address = '';
        if (it.address) {
          if (typeof it.address === 'string') address = it.address;
          else address = [it.address.street, it.address.city, it.address.state, it.address.country].filter(Boolean).join(', ');
        } else if (it.address_text) address = it.address_text;

        const contactEmail = it.contact?.email || it.email || '';
        let phone = '';
        if (Array.isArray(it.contact?.phone)) phone = it.contact.phone[0] || '';
        else if (typeof it.contact?.phone === 'string') phone = it.contact.phone;
        else phone = it.phone || '';

        return {
          id: String(it.id || it._id || it.diagnostic_centre_id || name),
          name,
          address,
          phone,
          email: contactEmail,
          rating: typeof it.rating === 'number' ? it.rating : undefined,
          archived: it.archived ?? false,
          _payload: payload,
        };
      });

      setTotal(json.data.pagination.total)
      setCentres(mapped);
    } catch (err: any) {
      setLastError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCentres(); }, []);
  // capture global unhandled promise rejections (debug helper)

  const centreStats = useMemo(() => {
    const active = centres.filter((c) => !c.archived);
    const avg = (active.reduce((s, c) => s + (c.rating ?? 0), 0) / Math.max(1, total)) || 0;
    return { avg };
  }, [centres]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return centres.filter((c) => !c.archived).filter((c) => {
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q);

      const matchesRating =
        minRating === 'all' || (c.rating ?? 0) >= (minRating as number);

      return matchesQ && matchesRating;
    });
  }, [search, minRating, centres]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1d2939]">Diagnostic Centres</h1>
        <p className="mt-1 text-lg font-medium text-[#4c545f]">View and manage registered diagnostic centres</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatMini icon={Building2} label="Total Centres" value={total.toString()} />
        <div />
        <div />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#e4e7ec] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, address, email or phone..."
              className="w-full rounded-full border border-[#e4e7ec] bg-[#f9fafb] py-2.5 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#1f6ae1] focus:outline-none focus:ring-2 focus:ring-[#1f6ae1]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setIsAdding(true)} type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#e4e7ec] px-4 py-2.5 text-sm font-medium text-[#1f6ae1] transition-colors hover:bg-[#f9fafb]">
              Add Centre
            </button>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="rounded-xl border border-[#e4e7ec] bg-[#f9fafb] px-4 py-2.5 text-sm text-[#1d2937]"
            >
              <option value="all">All ratings</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#e4e7ec] bg-[#f9fafb]">
                <th className="px-6 py-4 font-semibold text-[#667085]">Centre</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Address</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Contact</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Rating</th>
                <th className="px-6 py-4 font-semibold text-[#667085]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[#667085]">Loading centres…</td>
                </tr>
              ) : lastError ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-red-700">
                    <div className="mx-auto max-w-md">
                      <p className="mb-3 text-lg font-medium">Failed to load centres</p>
                      <p className="mb-4 text-sm text-red-800">{lastError}</p>
                      <div className="flex justify-center">
                        <button type="button" onClick={() => { setLastError(null); loadCentres(); }} className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white">Retry</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[#667085]">No centres match your search or filters.</td>
                </tr>
              ) : (
                filtered.map((c) => <CentreRow key={c.id} centre={c} onView={setSelectedCentre} onEdit={setEditingCentre} onArchive={(id) => setCentres((prev) => prev.map(p => p.id === id ? { ...p, archived: true } : p))} />)
              )}
            </tbody>
          </table>
        </div>

        {selectedCentre && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedCentre(null)} />
            <div className="relative z-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#1d2939]">{selectedCentre.name}</h2>
                  <p className="mt-1 text-sm text-[#667085]">{selectedCentre.address}</p>
                </div>
                <button onClick={() => setSelectedCentre(null)} className="text-sm text-[#667085]">Close</button>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="inline-flex items-center gap-2 text-sm text-[#374151]">
                  <Phone className="h-4 w-4 text-[#9aa4b2]" />
                  <span>{selectedCentre.phone}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-[#374151]">
                  <Mail className="h-4 w-4 text-[#9aa4b2]" />
                  <span>{selectedCentre.email}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-[#374151]">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{typeof selectedCentre.rating === 'number' ? selectedCentre.rating.toFixed(1) : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsAdding(false)} />
            <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#1d2939]">Add Diagnostic Centre</h2>
                <button onClick={() => setIsAdding(false)} className="text-sm text-[#667085]">Close</button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setLastError(null);

                  const payload = {
                    address: {
                      street: newCentre.address.street,
                      city: newCentre.address.city,
                      state: newCentre.address.state,
                      country: newCentre.address.country,
                    },
                    admin_id: newCentre.admin_id === '' ? null : newCentre.admin_id,
                    available_tests: newCentre.test_prices.map((t: any) => ({ price: Number(t.price || 0), test_type: t.test_type })),
                    contact: { email: newCentre.contact.email, phone: newCentre.contact.phone.filter(Boolean) },
                    diagnostic_centre_name: newCentre.diagnostic_centre_name,
                    doctors: newCentre.doctors.filter(Boolean),
                    latitude: newCentre.latitude ? Number(newCentre.latitude) : undefined,
                    longitude: newCentre.longitude ? Number(newCentre.longitude) : undefined,
                  };
                  try {
                    const token = getAuthToken();
                    const res = await fetch(getApiUrl(API_ENDPOINTS.CREATE_DIAGNOSTIC_CENTRE), {
                      method: API_ENDPOINTS.POST_METHOD,
                      headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                      },
                      body: JSON.stringify(payload),
                    });

                    if (!res.ok) {
                      const txt = await res.text();
                      throw new Error(txt || res.statusText || `HTTP ${res.status}`);
                    }

                    const created = await res.json();
                    const it = created?.data || created || {};
                    const id = String(it.id || it._id || it.diagnostic_centre_id || Date.now());
                    const name = it.diagnostic_centre_name || it.name || payload.diagnostic_centre_name;
                    let address = '';
                    if (it.address) {
                      if (typeof it.address === 'string') address = it.address;
                      else address = [it.address.street, it.address.city, it.address.state, it.address.country].filter(Boolean).join(', ');
                    } else if (it.address_text) address = it.address_text;

                    let phone = '';
                    if (Array.isArray(it.contact?.phone)) phone = it.contact.phone[0] || '';
                    else if (typeof it.contact?.phone === 'string') phone = it.contact.phone;
                    else phone = (payload.contact.phone && payload.contact.phone[0]) || '';

                    const centre = {
                      id,
                      name,
                      address,
                      phone,
                      email: it.contact?.email || payload.contact.email || '',
                      rating: typeof it.rating === 'number' ? it.rating : undefined,
                      archived: it.archived ?? false,
                      _payload: it.id ? it : payload,
                    };

                    setCentres((prev) => [centre, ...prev]);
                    setNewCentre({ diagnostic_centre_name: '', admin_id: '', address: { street: '', city: '', state: '', country: '' }, contact: { email: '', phone: [''] }, test_prices: [{ price: '', test_type: 'BLOOD_TEST' }], doctors: [''], latitude: '', longitude: '' });
                    setIsAdding(false);
                  } catch (err: any) {
                    setLastError(err?.message || String(err));
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-4 grid gap-3"
              >
                <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569] placeholder:opacity-90" placeholder="Diagnostic centre name" value={newCentre.diagnostic_centre_name} onChange={(e) => setNewCentre((s: any) => ({ ...s, diagnostic_centre_name: e.target.value }))} required />
                <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569] placeholder:opacity-90" placeholder="Admin ID" value={newCentre.admin_id} onChange={(e) => setNewCentre((s: any) => ({ ...s, admin_id: e.target.value }))} />

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Street" value={newCentre.address.street} onChange={(e) => setNewCentre((s: any) => ({ ...s, address: { ...s.address, street: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="City" value={newCentre.address.city} onChange={(e) => setNewCentre((s: any) => ({ ...s, address: { ...s.address, city: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="State" value={newCentre.address.state} onChange={(e) => setNewCentre((s: any) => ({ ...s, address: { ...s.address, state: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Country" value={newCentre.address.country} onChange={(e) => setNewCentre((s: any) => ({ ...s, address: { ...s.address, country: e.target.value } }))} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Contact phone" value={newCentre.contact.phone[0]} onChange={(e) => setNewCentre((s: any) => ({ ...s, contact: { ...s.contact, phone: [e.target.value] } }))} />
                  <input type="email" className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Contact email" value={newCentre.contact.email} onChange={(e) => setNewCentre((s: any) => ({ ...s, contact: { ...s.contact, email: e.target.value } }))} />
                </div>

                <div className="space-y-2">
                  {newCentre.test_prices.map((t: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a]"
                        placeholder="Price"
                        value={t.price}
                        onChange={(e) => setNewCentre((s: any) => ({ ...s, test_prices: s.test_prices.map((at: any, i: number) => i === idx ? { ...at, price: e.target.value } : at) }))}
                      />
                      <select
                        className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a]"
                        value={t.test_type}
                        onChange={(e) => setNewCentre((s: any) => ({ ...s, test_prices: s.test_prices.map((at: any, i: number) => i === idx ? { ...at, test_type: e.target.value } : at) }))}
                      >
                        <option value="BLOOD_TEST">BLOOD_TEST</option>
                        <option value="URINE_TEST">URINE_TEST</option>
                        <option value="X_RAY">X_RAY</option>
                        <option value="MRI">MRI</option>
                        <option value="CT_SCAN">CT_SCAN</option>
                        <option value="ULTRASOUND">ULTRASOUND</option>
                        <option value="ECG">ECG</option>
                        <option value="EEG">EEG</option>
                        <option value="BIOPSY">BIOPSY</option>
                        <option value="SKIN_TEST">SKIN_TEST</option>
                        <option value="ALLERGY_TEST">ALLERGY_TEST</option>
                        <option value="GENETIC_TEST">GENETIC_TEST</option>
                        <option value="IMMUNOLOGY_TEST">IMMUNOLOGY_TEST</option>
                        <option value="HORMONE_TEST">HORMONE_TEST</option>
                        <option value="VIRAL_TEST">VIRAL_TEST</option>
                        <option value="BACTERIAL_TEST">BACTERIAL_TEST</option>
                        <option value="PARASITIC_TEST">PARASITIC_TEST</option>
                        <option value="FUNGAL_TEST">FUNGAL_TEST</option>
                        <option value="MOLECULAR_TEST">MOLECULAR_TEST</option>
                        <option value="TOXICOLOGY_TEST">TOXICOLOGY_TEST</option>
                        <option value="ECHO">ECHO</option>
                        <option value="COVID_19_TEST">COVID_19_TEST</option>
                        <option value="OTHER">OTHER</option>
                        <option value="BLOOD_SUGAR_TEST">BLOOD_SUGAR_TEST</option>
                        <option value="LIPID_PROFILE">LIPID_PROFILE</option>
                        <option value="HEMOGLOBIN_TEST">HEMOGLOBIN_TEST</option>
                        <option value="THYROID_TEST">THYROID_TEST</option>
                        <option value="LIVER_FUNCTION_TEST">LIVER_FUNCTION_TEST</option>
                        <option value="KIDNEY_FUNCTION_TEST">KIDNEY_FUNCTION_TEST</option>
                        <option value="URIC_ACID_TEST">URIC_ACID_TEST</option>
                        <option value="VITAMIN_D_TEST">VITAMIN_D_TEST</option>
                        <option value="VITAMIN_B12_TEST">VITAMIN_B12_TEST</option>
                        <option value="HEMOGRAM">HEMOGRAM</option>
                        <option value="COMPLETE_BLOOD_COUNT">COMPLETE_BLOOD_COUNT</option>
                        <option value="BLOOD_GROUPING">BLOOD_GROUPING</option>
                        <option value="HEPATITIS_B_TEST">HEPATITIS_B_TEST</option>
                        <option value="HEPATITIS_C_TEST">HEPATITIS_C_TEST</option>
                        <option value="HIV_TEST">HIV_TEST</option>
                        <option value="MALARIA_TEST">MALARIA_TEST</option>
                        <option value="DENGUE_TEST">DENGUE_TEST</option>
                        <option value="TYPHOID_TEST">TYPHOID_TEST</option>
                        <option value="COVID_19_ANTIBODY_TEST">COVID_19_ANTIBODY_TEST</option>
                        <option value="COVID_19_RAPID_ANTIGEN_TEST">COVID_19_RAPID_ANTIGEN_TEST</option>
                        <option value="COVID_19_RT_PCR_TEST">COVID_19_RT_PCR_TEST</option>
                        <option value="PREGNANCY_TEST">PREGNANCY_TEST</option>
                      </select>
                      <button type="button" onClick={() => setNewCentre((s: any) => ({ ...s, test_prices: s.test_prices.filter((_: any, i: number) => i !== idx) }))} className="text-sm text-red-600">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setNewCentre((s: any) => ({ ...s, test_prices: [...s.test_prices, { price: '', test_type: 'BLOOD_TEST' }] }))} className="text-sm text-[#1f6ae1]">Add test</button>
                </div>

                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-[#0f172a] font-medium">
                    <input className="h-4 w-4 accent-[#1f6ae1]" type="checkbox" checked={newCentre.doctors.includes('Male')} onChange={(e) => setNewCentre((s: any) => ({ ...s, doctors: e.target.checked ? Array.from(new Set([...s.doctors, 'Male'])) : s.doctors.filter((d: string) => d !== 'Male') }))} aria-label="Doctor Male" />
                    Doctor: Male
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#0f172a] font-medium">
                    <input className="h-4 w-4 accent-[#1f6ae1]" type="checkbox" checked={newCentre.doctors.includes('Female')} onChange={(e) => setNewCentre((s: any) => ({ ...s, doctors: e.target.checked ? Array.from(new Set([...s.doctors, 'Female'])) : s.doctors.filter((d: string) => d !== 'Female') }))} aria-label="Doctor Female" />
                    Doctor: Female
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Latitude" value={newCentre.latitude} onChange={(e) => setNewCentre((s: any) => ({ ...s, latitude: e.target.value }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Longitude" value={newCentre.longitude} onChange={(e) => setNewCentre((s: any) => ({ ...s, longitude: e.target.value }))} />
                </div>

                <div className="mt-3 flex gap-2">
                  <button type="submit" className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white">Create</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="rounded-lg border border-[#e4e7ec] px-4 py-2 text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingCentre && editDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setEditingCentre(null)} />
            <div className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#1d2939]">Update Diagnostic Centre</h2>
                <button onClick={() => setEditingCentre(null)} className="text-sm text-[#667085]">Close</button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const payload = {
                    address: {
                      street: editDraft.address.street,
                      city: editDraft.address.city,
                      state: editDraft.address.state,
                      country: editDraft.address.country,
                    },
                    admin_id: editDraft.admin_id,
                    test_prices: editDraft.test_prices.map((t: any) => ({ price: Number(t.price || 0), test_type: t.test_type })),
                    contact: { email: editDraft.contact.email, phone: editDraft.contact.phone.filter(Boolean) },
                    diagnostic_centre_name: editDraft.diagnostic_centre_name,
                    doctors: editDraft.doctors.filter(Boolean),
                    latitude: editDraft.latitude ? Number(editDraft.latitude) : undefined,
                    longitude: editDraft.longitude ? Number(editDraft.longitude) : undefined,
                  };

                  setCentres((prev) => prev.map((c) => {
                    if (c.id !== editingCentre.id) return c;
                    return {
                      ...c,
                      name: payload.diagnostic_centre_name,
                      address: `${payload.address.street}, ${payload.address.city}, ${payload.address.state}, ${payload.address.country}`,
                      phone: payload.contact.phone[0] ?? '',
                      email: payload.contact.email,
                      _payload: payload,
                    };
                  }));

                  setEditingCentre(null);
                }}
                className="mt-4 grid gap-3"
              >
                <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569] placeholder:opacity-90" placeholder="Diagnostic centre name" value={editDraft.diagnostic_centre_name} onChange={(e) => setEditDraft((s: any) => ({ ...s, diagnostic_centre_name: e.target.value }))} required />
                <input
                  className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569] placeholder:opacity-90 disabled:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-70"
                  placeholder="Admin ID"
                  value={editDraft.admin_id}
                  onChange={(e) => setEditDraft((s: any) => ({ ...s, admin_id: e.target.value }))}
                  disabled={Boolean(editDraft.admin_id)}
                />

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Street" value={editDraft.address.street} onChange={(e) => setEditDraft((s: any) => ({ ...s, address: { ...s.address, street: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="City" value={editDraft.address.city} onChange={(e) => setEditDraft((s: any) => ({ ...s, address: { ...s.address, city: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="State" value={editDraft.address.state} onChange={(e) => setEditDraft((s: any) => ({ ...s, address: { ...s.address, state: e.target.value } }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Country" value={editDraft.address.country} onChange={(e) => setEditDraft((s: any) => ({ ...s, address: { ...s.address, country: e.target.value } }))} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Contact phone" value={editDraft.contact.phone[0]} onChange={(e) => setEditDraft((s: any) => ({ ...s, contact: { ...s.contact, phone: [e.target.value] } }))} />
                  <input type="email" className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Contact email" value={editDraft.contact.email} onChange={(e) => setEditDraft((s: any) => ({ ...s, contact: { ...s.contact, email: e.target.value } }))} />
                </div>

                <div className="space-y-2">
                  {editDraft.test_prices.map((t: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a]" placeholder="Price" value={t.price} onChange={(e) => setEditDraft((s: any) => ({ ...s, test_prices: s.test_prices.map((at: any, i: number) => i === idx ? { ...at, price: e.target.value } : at) }))} />
                      <select className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a]" value={t.test_type} onChange={(e) => setEditDraft((s: any) => ({ ...s, test_prices: s.test_prices.map((at: any, i: number) => i === idx ? { ...at, test_type: e.target.value } : at) }))}>
                        <option value="BLOOD_TEST">BLOOD_TEST</option>
                        <option value="URINE_TEST">URINE_TEST</option>
                        <option value="X_RAY">X_RAY</option>
                        <option value="MRI">MRI</option>
                        <option value="CT_SCAN">CT_SCAN</option>
                        <option value="ULTRASOUND">ULTRASOUND</option>
                        <option value="ECG">ECG</option>
                        <option value="EEG">EEG</option>
                        <option value="BIOPSY">BIOPSY</option>
                        <option value="SKIN_TEST">SKIN_TEST</option>
                        <option value="ALLERGY_TEST">ALLERGY_TEST</option>
                        <option value="GENETIC_TEST">GENETIC_TEST</option>
                        <option value="IMMUNOLOGY_TEST">IMMUNOLOGY_TEST</option>
                        <option value="HORMONE_TEST">HORMONE_TEST</option>
                        <option value="VIRAL_TEST">VIRAL_TEST</option>
                        <option value="BACTERIAL_TEST">BACTERIAL_TEST</option>
                        <option value="PARASITIC_TEST">PARASITIC_TEST</option>
                        <option value="FUNGAL_TEST">FUNGAL_TEST</option>
                        <option value="MOLECULAR_TEST">MOLECULAR_TEST</option>
                        <option value="TOXICOLOGY_TEST">TOXICOLOGY_TEST</option>
                        <option value="ECHO">ECHO</option>
                        <option value="COVID_19_TEST">COVID_19_TEST</option>
                        <option value="OTHER">OTHER</option>
                        <option value="BLOOD_SUGAR_TEST">BLOOD_SUGAR_TEST</option>
                        <option value="LIPID_PROFILE">LIPID_PROFILE</option>
                        <option value="HEMOGLOBIN_TEST">HEMOGLOBIN_TEST</option>
                        <option value="THYROID_TEST">THYROID_TEST</option>
                        <option value="LIVER_FUNCTION_TEST">LIVER_FUNCTION_TEST</option>
                        <option value="KIDNEY_FUNCTION_TEST">KIDNEY_FUNCTION_TEST</option>
                        <option value="URIC_ACID_TEST">URIC_ACID_TEST</option>
                        <option value="VITAMIN_D_TEST">VITAMIN_D_TEST</option>
                        <option value="VITAMIN_B12_TEST">VITAMIN_B12_TEST</option>
                        <option value="HEMOGRAM">HEMOGRAM</option>
                        <option value="COMPLETE_BLOOD_COUNT">COMPLETE_BLOOD_COUNT</option>
                        <option value="BLOOD_GROUPING">BLOOD_GROUPING</option>
                        <option value="HEPATITIS_B_TEST">HEPATITIS_B_TEST</option>
                        <option value="HEPATITIS_C_TEST">HEPATITIS_C_TEST</option>
                        <option value="HIV_TEST">HIV_TEST</option>
                        <option value="MALARIA_TEST">MALARIA_TEST</option>
                        <option value="DENGUE_TEST">DENGUE_TEST</option>
                        <option value="TYPHOID_TEST">TYPHOID_TEST</option>
                        <option value="COVID_19_ANTIBODY_TEST">COVID_19_ANTIBODY_TEST</option>
                        <option value="COVID_19_RAPID_ANTIGEN_TEST">COVID_19_RAPID_ANTIGEN_TEST</option>
                        <option value="COVID_19_RT_PCR_TEST">COVID_19_RT_PCR_TEST</option>
                        <option value="PREGNANCY_TEST">PREGNANCY_TEST</option>
                      </select>
                      <button type="button" onClick={() => setEditDraft((s: any) => ({ ...s, test_prices: s.test_prices.filter((_: any, i: number) => i !== idx) }))} className="text-sm text-red-600">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setEditDraft((s: any) => ({ ...s, test_prices: [...s.test_prices, { price: '', test_type: 'BLOOD_TEST' }] }))} className="text-sm text-[#1f6ae1]">Add test</button>
                </div>

                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-[#0f172a] font-medium">
                    <input className="h-4 w-4 accent-[#1f6ae1]" type="checkbox" checked={editDraft.doctors.includes('Male')} onChange={(e) => setEditDraft((s: any) => ({ ...s, doctors: e.target.checked ? Array.from(new Set([...s.doctors, 'Male'])) : s.doctors.filter((d: string) => d !== 'Male') }))} />
                    Doctor: Male
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#0f172a] font-medium">
                    <input className="h-4 w-4 accent-[#1f6ae1]" type="checkbox" checked={editDraft.doctors.includes('Female')} onChange={(e) => setEditDraft((s: any) => ({ ...s, doctors: e.target.checked ? Array.from(new Set([...s.doctors, 'Female'])) : s.doctors.filter((d: string) => d !== 'Female') }))} />
                    Doctor: Female
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Latitude" value={editDraft.latitude} onChange={(e) => setEditDraft((s: any) => ({ ...s, latitude: e.target.value }))} />
                  <input className="rounded-md border border-[#e4e7ec] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#475569]" placeholder="Longitude" value={editDraft.longitude} onChange={(e) => setEditDraft((s: any) => ({ ...s, longitude: e.target.value }))} />
                </div>

                <div className="mt-3 flex gap-2">
                  <button type="submit" className="rounded-lg bg-[#1f6ae1] px-4 py-2 text-sm font-medium text-white">Update</button>
                  <button type="button" onClick={() => setEditingCentre(null)} className="rounded-lg border border-[#e4e7ec] px-4 py-2 text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-[#e4e7ec] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#667085]">
            Showing <span className="font-semibold text-[#1d2939]">{filtered.length}</span> of <span className="font-semibold text-[#1d2939]">{total}</span> centres
          </p>
          <div className="flex items-center gap-2">
            <button type="button" disabled className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] disabled:opacity-50">Previous</button>
            <button type="button" className="rounded-lg bg-[#1f6ae1] px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button type="button" className="rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-sm text-[#667085] hover:bg-[#f9fafb]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
