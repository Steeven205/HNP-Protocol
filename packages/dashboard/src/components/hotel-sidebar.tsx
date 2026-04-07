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
        className={`flex items-center gap-3 -mx-3 px-6 py-2.5 text-[13px] font-medium no-underline transition-all ${
          isActive
            ? "bg-emerald text-white rounded-none"
            : "text-[#717171] hover:bg-[#EEEEEE] hover:text-[#222]"
        }`}
      >
        <i className={`fa-solid ${item.icon} w-4 text-center text-[12px] ${isActive ? "text-white" : "text-[#B0B0B0]"}`} />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <aside className="w-[240px] h-screen bg-[#F7F7F7] border-r border-[#EBEBEB] flex flex-col flex-shrink-0 hidden md:flex">
      {/* Logo — pushed down */}
      <div className="pt-8 pb-8 px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img src="/logo.svg" alt="Rateflow" className="w-9 h-9" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[18px] text-[#222]">Rateflow</span>
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

        {/* Spacer */}
        <div className="flex-1 min-h-[60px]" />

        {/* Settings section — lower */}
        <div className="mt-auto pt-8 border-t border-[#E5E7EB]">
          <div className="px-3 mb-3 text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider">Settings</div>
          <div className="space-y-0.5">
            {settingsItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-5 border-t border-[#EBEBEB]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald text-white flex items-center justify-center text-[11px] font-semibold">MD</div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#222] truncate">Marie Dupont</div>
            <div className="text-[11px] text-[#717171] truncate">Le Marais Group</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
