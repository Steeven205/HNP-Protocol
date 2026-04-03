"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Negotiations", icon: "fa-handshake", href: "/negotiations" },
  { label: "Audit Trail", icon: "fa-shield-halved", href: "/audit" },
  { label: "Configuration", icon: "fa-sliders", href: "/configuration" },
  { label: "Team", icon: "fa-users", href: "/team" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 min-h-screen flex-col justify-between bg-navy-800 text-white px-4 py-6">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4 mt-4">
        <div className="flex items-center gap-3 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold">
            H
          </div>
          <div>
            <p className="text-sm font-semibold">HNP Protocol</p>
            <p className="text-xs text-white/50">AI-to-AI Negotiation</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
