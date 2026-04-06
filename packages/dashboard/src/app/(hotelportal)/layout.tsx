import { HotelSidebar } from "@/components/hotel-sidebar";

export default function HotelPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <HotelSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
