"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-pie", href: "/hotel/dashboard" },
  { label: "Hotels", icon: "fa-hotel", href: "/hotel/hotels" },
  { label: "Negotiations", icon: "fa-handshake", href: "/hotel/negotiations" },
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

  function NavLink({ item }: { item: { label: string; icon: string; href: string } }) {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
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
  }

  return (
    <aside className="w-[240px] h-screen bg-[#F7F7F7] border-r border-[#EBEBEB] flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 mb-2">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 bg-[#222] rounded-lg flex items-center justify-center text-white">
            <i className="fa-solid fa-chart-line text-sm" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-[17px] text-[#222]">Rateflow</span>
            <span className="text-[10px] text-emerald font-semibold bg-emerald/10 px-1.5 py-0.5 rounded">Hotel</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        {/* Settings section */}
        <div className="mt-6 pt-4 border-t border-[#EBEBEB]">
          <div className="px-3 mb-2 text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider">Settings</div>
          <div className="space-y-0.5">
            {settingsItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#EBEBEB]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center text-[11px] font-semibold">MD</div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#222] truncate">Marie Dupont</div>
            <div className="text-[11px] text-[#717171] truncate">Le Marais Group</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
