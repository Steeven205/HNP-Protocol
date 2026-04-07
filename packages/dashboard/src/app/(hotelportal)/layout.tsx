import { HotelSidebar } from "@/components/hotel-sidebar";
import { TopHeader } from "@/components/top-header";
import { PageTitle } from "@/components/page-title";

export default function HotelPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <HotelSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader user={{ name: "Marie Dupont", initials: "MD", company: "Le Marais Group" }} />
        <PageTitle />
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">{children}</main>
      </div>
    </div>
  );
}
