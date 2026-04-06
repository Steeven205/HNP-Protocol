"use client";

import { useState } from "react";

interface TopHeaderProps {
  user: { name: string; initials: string; company: string };
}

export function TopHeader({ user }: TopHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="h-20 border-b border-[#EBEBEB] bg-white flex items-center justify-between px-8 flex-shrink-0">
      {/* Left: Search bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0B0B0] text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookings, hotels, negotiations..."
            className="w-full bg-[#F7F7F7] border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm text-[#222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#DDDDDD] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Date, notifications, profile */}
      <div className="flex items-center gap-5">
        {/* Date & time */}
        <div className="hidden lg:block text-right">
          <div className="text-sm font-medium text-[#222]">{dateStr}</div>
          <div className="text-xs text-[#B0B0B0]">{timeStr}</div>
        </div>

        <div className="w-px h-8 bg-[#EBEBEB]" />

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-[#F7F7F7] transition-colors">
          <i className="fa-regular fa-bell text-lg text-[#484848]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red rounded-full ring-2 ring-white" />
        </button>

        {/* Help */}
        <button className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors hidden sm:flex">
          <i className="fa-regular fa-circle-question text-lg text-[#484848]" />
        </button>

        <div className="w-px h-8 bg-[#EBEBEB]" />

        {/* User profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#222] text-white flex items-center justify-center text-xs font-semibold group-hover:ring-2 group-hover:ring-[#EBEBEB] transition-all">
            {user.initials}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-[#222]">{user.name}</div>
            <div className="text-[11px] text-[#717171]">{user.company}</div>
          </div>
          <i className="fa-solid fa-chevron-down text-[10px] text-[#B0B0B0] hidden md:block" />
        </div>
      </div>
    </header>
  );
}
