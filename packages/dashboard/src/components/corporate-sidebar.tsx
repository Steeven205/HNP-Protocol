"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-pie", href: "/corporate/dashboard" },
  { label: "Book Travel", icon: "fa-plane-departure", href: "/corporate/book" },
  { label: "My Bookings", icon: "fa-suitcase", href: "/corporate/bookings" },
  { label: "Team", icon: "fa-users", href: "/corporate/team" },
  { label: "Policy", icon: "fa-file-contract", href: "/corporate/policy" },
  { label: "Shadow Reports", icon: "fa-flask", href: "/corporate/shadow" },
];

export function CorporateSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-screen bg-[#F7F7F7] border-r border-[#EBEBEB] flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 mb-2">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <img src="/logo.svg" alt="Rateflow" className="w-8 h-8" />
          <span className="font-display font-bold text-[17px] text-[#222]">Rateflow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-all ${
                isActive
                  ? "bg-white text-[#222] shadow-sm"
                  : "text-[#717171] hover:bg-white/70 hover:text-[#222]"
              }`}
            >
              <i className={`fa-solid ${item.icon} w-4 text-center text-[12px] ${isActive ? "text-emerald" : "text-[#B0B0B0]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#EBEBEB]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#222] text-white flex items-center justify-center text-[11px] font-semibold">SM</div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#222] truncate">Sophie Martin</div>
            <div className="text-[11px] text-[#717171] truncate">TechCorp SAS</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
