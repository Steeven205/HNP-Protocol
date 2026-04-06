"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/hotel/dashboard" },
  { label: "Hotels", href: "/hotel/hotels" },
  { label: "Negotiations", href: "/hotel/negotiations" },
  { label: "Audit Trail", href: "/hotel/audit" },
  { label: "Yield", href: "/hotel/yield" },
  { label: "Integrations", href: "/hotel/integrations" },
  { label: "Billing", href: "/hotel/billing" },
  { label: "Team", href: "/hotel/team-management" },
  { label: "Shadow", href: "/hotel/shadow" },
];

export function HotelNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row: logo + actions */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 bg-[#222] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <i className="fa-solid fa-chart-line" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[#222]">Rateflow</span>
              <span className="text-[10px] text-emerald font-semibold ml-1.5 bg-emerald/10 px-1.5 py-0.5 rounded">Hotel</span>
            </div>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#717171] hover:text-[#222] transition-colors">
              <i className="fa-regular fa-bell text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red rounded-full" />
            </button>
            <div className="w-px h-6 bg-[#EBEBEB]" />
            <Link href="/hotel/dashboard" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center text-xs font-semibold">MD</div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-[#222]">Marie Dupont</div>
                <div className="text-xs text-[#717171]">Le Marais Group</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-tab no-underline ${isActive ? "nav-tab-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
