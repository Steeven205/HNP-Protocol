"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-line", href: "/hotel" },
  { label: "Incoming Requests", icon: "fa-inbox", href: "/hotel/requests" },
  { label: "Yield Configuration", icon: "fa-sliders", href: "/hotel/yield" },
  { label: "Performance", icon: "fa-chart-bar", href: "/hotel/performance" },
];

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Hotel Sidebar */}
      <aside className="flex w-64 min-h-screen flex-col justify-between bg-gradient-to-b from-sky-dark to-navy-800 text-white px-4 py-6">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 px-4 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold backdrop-blur-sm">
              R
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Rateflow</p>
              <p className="text-[11px] text-white/60">Hotel Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/hotel"
                  ? pathname === "/hotel"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center text-[13px]`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Hotel Identity */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center gap-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-bold">
              <i className="fa-solid fa-hotel text-[13px]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Le Marais Boutique Hotel</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3, 4].map((star) => (
                  <i key={star} className="fa-solid fa-star text-[9px] text-amber-300" />
                ))}
                <span className="text-[10px] text-white/50 ml-1">Paris 3e</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
