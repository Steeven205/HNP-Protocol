"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-pie", href: "/hotel/dashboard" },
  { label: "Hotels", icon: "fa-hotel", href: "/hotel/hotels" },
  { label: "Negotiations", icon: "fa-handshake", href: "/hotel/negotiations" },
  { label: "Analytics", icon: "fa-chart-line", href: "/hotel/analytics" },
  { label: "Audit Trail", icon: "fa-clock-rotate-left", href: "/hotel/audit" },
];

const settingsItems = [
  { label: "Yield Config", icon: "fa-sliders", href: "/hotel/yield" },
  { label: "Integrations", icon: "fa-plug", href: "/hotel/integrations" },
  { label: "Team", icon: "fa-users", href: "/hotel/team-management" },
  { label: "Billing", icon: "fa-credit-card", href: "/hotel/billing" },
  { label: "Shadow Reports", icon: "fa-flask", href: "/hotel/shadow" },
];

export function HotelSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0F172A] border-r border-white/10 flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center text-white font-bold text-sm mr-3">
          <i className="fa-solid fa-chart-line" />
        </div>
        <div>
          <span className="font-semibold text-white text-sm tracking-wide">Rateflow</span>
          <span className="block text-[10px] text-emerald font-medium -mt-0.5">Hotel Agent</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald/50 transition-colors"
          />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[#1E293B] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center text-sm ${isActive ? "text-emerald" : ""}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="px-3 mb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Settings</div>
          {settingsItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#1E293B] text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center text-sm ${isActive ? "text-emerald" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-xs">MD</div>
          <div>
            <div className="text-sm font-medium text-white">Marie Dupont</div>
            <div className="text-xs text-slate-500">Le Marais Group</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
