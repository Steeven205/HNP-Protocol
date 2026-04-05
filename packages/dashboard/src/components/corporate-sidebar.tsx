"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-pie", href: "/corporate/dashboard" },
  { label: "Book Travel", icon: "fa-plane-departure", href: "/corporate/book", accent: true },
  { label: "My Bookings", icon: "fa-suitcase", href: "/corporate/bookings" },
  { label: "Team Bookings", icon: "fa-users", href: "/corporate/team" },
  { label: "Travel Policy", icon: "fa-file-contract", href: "/corporate/policy" },
  { label: "Analytics", icon: "fa-chart-bar", href: "/corporate/analytics" },
  { label: "Shadow Reports", icon: "fa-flask", href: "/corporate/shadow" },
  { label: "Settings", icon: "fa-cog", href: "/corporate/settings" },
];

export function CorporateSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-white/10 glass-panel flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div className="w-8 h-8 rounded bg-emerald flex items-center justify-center text-navy-deep font-bold text-lg mr-3">
          <i className="fa-solid fa-bolt" />
        </div>
        <span className="font-display text-xl font-semibold tracking-wide text-white">
          Rateflow<br />
          <span className="text-xs font-mono text-emerald font-normal">Corporate</span>
        </span>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full bg-navy-deep/50 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-emerald transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                isActive
                  ? "bg-emerald/10 text-emerald"
                  : item.accent
                  ? "text-white hover:bg-white/5"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center ${isActive ? "text-emerald" : item.accent ? "text-emerald" : ""}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-bold text-sm">SM</div>
          <div>
            <div className="text-sm font-medium text-white">Sophie Martin</div>
            <div className="text-xs text-slate-400">Sales Manager &bull; TechCorp</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
