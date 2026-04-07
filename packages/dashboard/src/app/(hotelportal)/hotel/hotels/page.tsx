"use client";

const hotelImages: Record<string, string> = {
  "Le Marais": "https://storage.googleapis.com/uxpilot-auth.appspot.com/c7fb650d8a-58ca76efa3a587bf197e.png",
  "Brussels": "https://storage.googleapis.com/uxpilot-auth.appspot.com/ca6f2c08af-b55bc92285ede584517a.png",
  "Lyon": "https://storage.googleapis.com/uxpilot-auth.appspot.com/7db313f086-9300a16d0c415264d455.png",
  "Amsterdam": "https://storage.googleapis.com/uxpilot-auth.appspot.com/aff41e02a8-a0702c9854e5bb48f526.png",
  "Madrid": "https://storage.googleapis.com/uxpilot-auth.appspot.com/fc2e755fdf-e26031796a4d5518b308.png",
  "Barcelona": "https://storage.googleapis.com/uxpilot-auth.appspot.com/fcf84a37be-719445fec079b6cdb273.png",
};

const demoHotels = [
  { id: "HTL-001", name: "Le Marais Boutique", city: "Paris, France", stars: 4, occ: 82, adr: 195, revpar: 159.90, vsBudget: "+8.2%", vsBudgetUp: true, perf: "top" },
  { id: "HTL-002", name: "Brussels Central", city: "Brussels, Belgium", stars: 4, occ: 76, adr: 168, revpar: 127.68, vsBudget: "+3.1%", vsBudgetUp: true, perf: "standard" },
  { id: "HTL-003", name: "Lyon Confluence", city: "Lyon, France", stars: 4, occ: 71, adr: 152, revpar: 107.92, vsBudget: "-2.4%", vsBudgetUp: false, perf: "attention" },
  { id: "HTL-004", name: "Amsterdam Centrum", city: "Amsterdam, Netherlands", stars: 4, occ: 84, adr: 178, revpar: 149.52, vsBudget: "+9.8%", vsBudgetUp: true, perf: "top" },
  { id: "HTL-005", name: "Madrid Sol", city: "Madrid, Spain", stars: 4, occ: 79, adr: 165, revpar: 130.35, vsBudget: "+5.6%", vsBudgetUp: true, perf: "top" },
  { id: "HTL-006", name: "Barcelona Gothic", city: "Barcelona, Spain", stars: 4, occ: 77, adr: 158, revpar: 121.66, vsBudget: "+2.8%", vsBudgetUp: true, perf: "standard" },
];

function getImageForHotel(name: string): string {
  for (const key of Object.keys(hotelImages)) {
    if (name.includes(key)) return hotelImages[key];
  }
  return hotelImages["Le Marais"];
}

export default function HotelsListPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[240px]">
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs" />
              <input type="text" placeholder="Search by name, city, ID..." className="w-full border border-[#E5E7EB] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#111827] focus:outline-none focus:border-emerald-500" />
            </div>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option>Country: All</option>
              <option>France</option>
              <option>Belgium</option>
              <option>Netherlands</option>
              <option>Spain</option>
            </select>
            <select className="border border-[#E5E7EB] rounded-lg py-2.5 px-4 text-sm text-[#111827] focus:outline-none focus:border-emerald-500">
              <option>Performance: All</option>
              <option>Top Performers</option>
              <option>Need Attention</option>
              <option>Standard</option>
            </select>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap">
            <i className="fa-solid fa-plus" /> Add Hotel
          </button>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoHotels.map((h) => (
          <div key={h.id} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-[#F3F4F6] overflow-hidden">
              <img className="w-full h-full object-cover" src={getImageForHotel(h.name)} alt={h.name} />
              {h.perf === "top" && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shadow">
                  <i className="fa-solid fa-trophy" />
                </div>
              )}
              {h.perf === "attention" && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm shadow">
                  <i className="fa-solid fa-triangle-exclamation" />
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#111827] mb-1">{h.name}</h3>
                  <p className="text-xs text-[#6B7280]">{h.city}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                  {Array.from({ length: h.stars }, (_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="font-mono text-xs text-[#9CA3AF]">{h.id}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">OCC</div>
                  <div className={`font-mono font-semibold ${h.occ >= 75 ? "text-emerald-600" : "text-amber-600"}`}>{h.occ}%</div>
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">ADR</div>
                  <div className="font-mono font-semibold text-[#111827]">€{h.adr}</div>
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">RevPAR</div>
                  <div className="font-mono font-semibold text-[#111827]">€{h.revpar.toFixed(2)}</div>
                </div>
              </div>

              <div className="mb-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                  h.vsBudgetUp
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}>
                  <i className={`fa-solid ${h.vsBudgetUp ? "fa-arrow-up" : "fa-arrow-down"}`} /> {h.vsBudget} vs Budget
                </span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
                <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] flex-1 px-4 py-2 rounded-lg text-xs font-medium">
                  View Details
                </button>
                <button className="border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] px-3 py-2 rounded-lg text-xs">
                  <i className="fa-solid fa-cog" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
