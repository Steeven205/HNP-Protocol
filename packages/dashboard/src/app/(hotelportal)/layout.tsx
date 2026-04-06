import { HotelNavbar } from "@/components/hotel-navbar";

export default function HotelPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <HotelNavbar />
      <main>{children}</main>
    </div>
  );
}
