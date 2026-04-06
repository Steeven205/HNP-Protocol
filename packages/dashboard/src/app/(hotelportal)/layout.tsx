import { HotelSidebar } from "@/components/hotel-sidebar";
import { TopHeader } from "@/components/top-header";

export default function HotelPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <HotelSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader user={{ name: "Marie Dupont", initials: "MD", company: "Le Marais Group" }} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
