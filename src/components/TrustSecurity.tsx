// src/components/TrustSecurity.tsx
export default function TrustSecurity() {
  return (
    <section className="relative overflow-hidden bg-blue-950 text-white py-20">
      <div className="absolute inset-0 bg-[url('/images/trust-bg.svg')] bg-cover bg-center opacity-15" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid justify-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div className="mx-auto w-full max-w-2xl space-y-8 lg:mx-0">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Trust & Security
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-2xl shadow-blue-950/20">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Trust & Security</p>
                <h2 className="text-5xl font-semibold leading-tight text-white">
                  Your Health Data is Protected
                </h2>

                <div className="inline-flex rounded-full bg-blue-100/20 px-6 py-3 text-xl font-semibold text-blue-100 ring-1 ring-white/15">
                  Protected
                </div>

                <p className="text-lg leading-8 text-slate-200">
                  We take security seriously. From verified centres to encrypted data, DiagnoxixAI is built on trust.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl space-y-8 lg:mx-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[32px] bg-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-sm uppercase tracking-[0.2em] text-blue-200">Verified Centres</div>
              </div>
              <div className="rounded-[32px] bg-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm uppercase tracking-[0.2em] text-blue-200">Uptime</div>
              </div>
              <div className="rounded-[32px] bg-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-2">5,000+</div>
                <div className="text-sm uppercase tracking-[0.2em] text-blue-200">Happy Patients</div>
              </div>
              <div className="rounded-[32px] bg-white/10 p-6">
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm uppercase tracking-[0.2em] text-blue-200">Average Rating</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="text-xl font-semibold text-white mb-3">Verified Centres</div>
                <p className="text-slate-200">
                  Every diagnostic centre undergoes rigorous verification including license checks, equipment certification, and quality audits.
                </p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="text-xl font-semibold text-white mb-3">Data Protection</div>
                <p className="text-slate-200">
                  Your medical records are encrypted and stored securely. Only you control who sees your health information.
                </p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="text-xl font-semibold text-white mb-3">Medical Compliance</div>
                <p className="text-slate-200">
                  All centres adhere to Nigerian healthcare regulations and international diagnostic standards.
                </p>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="text-xl font-semibold text-white mb-3">24/7 Support</div>
                <p className="text-slate-200">
                  Our dedicated support team is available round the clock to resolve any issues or disputes.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-4">Compliant with</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white">NDPR</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white">ISO 27001</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white">NAFDAC</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white">MDCN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
