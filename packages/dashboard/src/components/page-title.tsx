"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  // Corporate
  "/corporate/dashboard": { title: "Dashboard", subtitle: "Overview of your travel program performance and savings" },
  "/corporate/book": { title: "Book Travel", subtitle: "Search and book hotels with AI-negotiated rates" },
  "/corporate/book/search": { title: "AI Negotiation", subtitle: "Your AI agent is negotiating the best rates in real-time" },
  "/corporate/book/confirm": { title: "Confirm Booking", subtitle: "Review and confirm your AI-negotiated reservation" },
  "/corporate/bookings": { title: "My Bookings", subtitle: "View and manage your upcoming and past reservations" },
  "/corporate/team": { title: "Team Bookings", subtitle: "Manage and approve travel bookings for your team" },
  "/corporate/policy": { title: "Travel Policy", subtitle: "Configure rate limits, approval rules, and compliance settings" },
  "/corporate/shadow": { title: "Shadow Reports", subtitle: "Compare Rateflow savings against your current RFP contracts" },
  "/corporate/settings": { title: "General Settings", subtitle: "Company profile, preferences, notifications, and API configuration" },
  "/corporate/settings/integrations": { title: "Integrations", subtitle: "Connect hotel distribution platforms and productivity tools" },
  "/corporate/settings/team": { title: "Team Management", subtitle: "Manage team members, roles, and access permissions" },
  "/corporate/settings/billing": { title: "Billing & Subscription", subtitle: "Manage your plan, view usage, and download invoices" },

  // Hotel
  "/hotel/dashboard": { title: "Dashboard", subtitle: "Revenue performance, occupancy metrics, and active negotiations" },
  "/hotel/hotels": { title: "Hotel Portfolio", subtitle: "Manage properties, rates, and performance across your network" },
  "/hotel/negotiations": { title: "Negotiations", subtitle: "Real-time AI negotiation monitoring and management" },
  "/hotel/audit": { title: "Audit Trail", subtitle: "Immutable SHA-256 signed records of all negotiation events" },
  "/hotel/yield": { title: "Yield Configuration", subtitle: "Configure pricing rules using natural language or manual controls" },
  "/hotel/integrations": { title: "Integrations", subtitle: "Connect PMS, channel managers, and distribution platforms" },
  "/hotel/team-management": { title: "Team Management", subtitle: "Manage team members, roles, and permissions" },
  "/hotel/billing": { title: "Billing & Subscription", subtitle: "Manage your plan, usage, and payment settings" },
  "/hotel/shadow": { title: "Shadow Analytics", subtitle: "Compare Rateflow performance against OTA channels" },
};

export function PageTitle() {
  const pathname = usePathname();

  // Find exact match or match by prefix for dynamic routes
  const config = pageTitles[pathname] ||
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key + "/"))?.[1];

  if (!config) return null;

  return (
    <div className="border-b border-[#F3F4F6] bg-white px-8 py-5 flex-shrink-0">
      <h1 className="text-[17px] font-bold text-[#111827]">{config.title}</h1>
      <p className="text-[13px] text-[#6B7280] mt-0.5">{config.subtitle}</p>
    </div>
  );
}
