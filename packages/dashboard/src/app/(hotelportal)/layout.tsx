import { HotelSidebar } from "@/components/hotel-sidebar";

export default function HotelPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-navy-deep text-slate-100 font-mono">
      {/* Background gradient & mesh */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, #1A2942, #0A1628)" }} />
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-mesh" />
      <div className="relative z-10 flex h-screen w-full overflow-hidden">
        <HotelSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
