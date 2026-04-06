import { CorporateSidebar } from "@/components/corporate-sidebar";
import { TopHeader } from "@/components/top-header";

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <CorporateSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader user={{ name: "Sophie Martin", initials: "SM", company: "TechCorp SAS" }} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
