"use client";

import { integrations } from "@/lib/demo-data";

export default function IntegrationsPage() {
  const connected = integrations.filter((i) => i.status === "connected");
  const available = integrations.filter((i) => i.status === "available");

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222]">Integrations & Connectors</h1>
          <p className="text-[#717171] mt-1">Connect your PMS, channel managers, and payment systems</p>
        </div>
        <span className="badge badge-emerald">
          <i className="fa-solid fa-plug text-[10px]" />
          {connected.length} connected
        </span>
      </div>

      <div className="space-y-8">
        {/* Connected Integrations */}
        <section>
          <h2 className="text-lg font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-circle-check text-emerald mr-2" />
            Connected
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {connected.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center">
                    <i className={`fa-solid ${integration.icon} text-emerald text-lg`} />
                  </div>
                  <div>
                    <h3 className="text-[#222] font-medium">{integration.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald" />
                      <span className="text-xs text-[#717171]">Connected</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#717171] mb-4">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#B0B0B0]">
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
        <section>
          <h2 className="text-lg font-semibold text-[#222] mb-4">
            <i className="fa-solid fa-puzzle-piece text-[#B0B0B0] mr-2" />
            Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {available.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center">
                    <i className={`fa-solid ${integration.icon} text-[#B0B0B0] text-lg`} />
                  </div>
                  <div>
                    <h3 className="text-[#222] font-medium">{integration.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#DDDDDD]" />
                      <span className="text-xs text-[#717171]">Available</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#717171] mb-4">{integration.description}</p>
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
      </div>
    </div>
  );
}
