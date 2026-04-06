import { CorporateNavbar } from "@/components/corporate-navbar";

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <CorporateNavbar />
      <main>{children}</main>
    </div>
  );
}
