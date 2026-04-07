import { CorporateSidebar } from "@/components/corporate-sidebar";
import { TopHeader } from "@/components/top-header";
import { PageTitle } from "@/components/page-title";

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <CorporateSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader user={{ name: "Sophie Martin", initials: "SM", company: "TechCorp SAS" }} />
        <PageTitle />
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">{children}</main>
      </div>
    </div>
  );
}
