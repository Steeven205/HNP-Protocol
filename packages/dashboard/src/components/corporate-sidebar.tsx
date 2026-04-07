"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-pie", href: "/corporate/dashboard" },
  { label: "Book Travel", icon: "fa-plane-departure", href: "/corporate/book" },
  { label: "My Bookings", icon: "fa-suitcase", href: "/corporate/bookings" },
  { label: "Team", icon: "fa-users", href: "/corporate/team" },
  { label: "Shadow Reports", icon: "fa-flask", href: "/corporate/shadow" },
];

const settingsItems = [
  { label: "Travel Policy", icon: "fa-file-contract", href: "/corporate/policy" },
  { label: "Integrations", icon: "fa-plug", href: "/corporate/settings/integrations" },
  { label: "Team Management", icon: "fa-user-gear", href: "/corporate/settings/team" },
  { label: "Billing", icon: "fa-credit-card", href: "/corporate/settings/billing" },
  { label: "General", icon: "fa-cog", href: "/corporate/settings" },
];

export function CorporateSidebar() {
  const pathname = usePathname();

  function NavLink({ item }: { item: { label: string; icon: string; href: string } }) {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 -mx-3 px-6 py-2.5 text-[13px] font-medium no-underline transition-all ${
          isActive
            ? "bg-emerald text-white"
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
      {/* Logo */}
      <div className="pt-8 pb-8 px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img src="/logo.svg" alt="Rateflow" className="w-9 h-9" />
          <span className="font-bold text-[18px] text-[#222]">Rateflow</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto flex flex-col">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        {/* Flexible spacer */}
        <div className="flex-1" />
      </nav>

      {/* Settings — directly above profile */}
      <div className="px-3 pt-3 pb-2 border-t border-[#E5E7EB]">
        <div className="px-3 mb-2 text-[10px] font-semibold text-[#B0B0B0] uppercase tracking-wider">Settings</div>
        <div className="space-y-0.5">
          {settingsItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 -mx-3 px-6 py-2 text-[12px] font-medium no-underline transition-all ${
                  isActive
                    ? "bg-emerald text-white"
                    : "text-[#717171] hover:bg-[#EEEEEE] hover:text-[#222]"
                }`}
              >
                <i className={`fa-solid ${item.icon} w-4 text-center text-[11px] ${isActive ? "text-white" : "text-[#B0B0B0]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-5 border-t border-[#EBEBEB]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#222] text-white flex items-center justify-center text-[11px] font-semibold">SM</div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#222] truncate">Sophie Martin</div>
            <div className="text-[11px] text-[#717171] truncate">TechCorp SAS</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
