"use client";

import { integrations } from "@/lib/demo-data";

export default function IntegrationsPage() {
  const connected = integrations.filter((i) => i.status === "connected");
  const available = integrations.filter((i) => i.status === "available");

  return (
    <>
      {/* Header */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Integrations &amp; Connectors</h1>
          <p className="text-sm text-slate-500 mt-0.5">Connect your PMS, channel managers, and payment systems</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-emerald">
            <i className="fa-solid fa-plug text-[10px]" />
            {connected.length} connected
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Connected Integrations */}
        <section className="animate-fade-up">
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
            <i className="fa-solid fa-circle-check text-emerald mr-2" />
            Connected
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {connected.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 border-emerald/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center">
                      <i className={`fa-solid ${integration.icon} text-emerald text-lg`} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium">{integration.name}</h3>
                      <span className="badge badge-emerald text-[10px] mt-1">
                        <i className="fa-solid fa-circle text-[6px]" />
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    <i className="fa-solid fa-sync text-emerald mr-1 text-[10px]" />
                    Last sync: {integration.lastSync}
                  </span>
                  <button className="px-3 py-1.5 rounded-md text-xs border border-red/20 text-red hover:bg-red/10 transition-colors">
                    <i className="fa-solid fa-unlink mr-1 text-[10px]" />
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Integrations */}
        <section className="animate-fade-up delay-200">
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
            <i className="fa-solid fa-puzzle-piece text-slate-400 mr-2" />
            Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {available.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                      <i className={`fa-solid ${integration.icon} text-slate-400 text-lg`} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium">{integration.name}</h3>
                      <span className="badge badge-slate text-[10px] mt-1">
                        <i className="fa-solid fa-circle text-[6px]" />
                        Available
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{integration.description}</p>
                <div className="flex items-center justify-end">
                  <button className="btn-emerald px-4 py-1.5 rounded-md text-xs font-medium">
                    <i className="fa-solid fa-plug mr-1" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
