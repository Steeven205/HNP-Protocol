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
    <aside className="w-64 h-screen bg-navy-deep border-r border-white/10 flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald flex items-center justify-center text-white">
            <i className="fa-solid fa-chart-line" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-white">Rateflow</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-emerald text-sm" />
          <input
            type="text"
            placeholder="Search negotiations..."
            className="w-full bg-navy-mid border border-white/10 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald transition-colors"
          />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-colors ${
                isActive
                  ? "bg-emerald/10 text-emerald"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Settings section */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</div>
          {settingsItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-emerald/10 text-emerald"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 glass-card p-3 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-sm">MD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Marie Dupont</p>
            <p className="text-xs text-slate-400 truncate">Revenue Manager</p>
            <p className="text-xs text-emerald truncate mt-0.5">Le Marais Group</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
