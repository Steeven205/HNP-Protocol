import { CorporateSidebar } from "@/components/corporate-sidebar";

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <CorporateSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
