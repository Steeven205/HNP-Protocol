import Link from "next/link";

export default function TravelerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-[20px] border-b border-[#E2E6F0]">
        <Link href="/book" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 bg-navy-800 rounded-[10px] flex items-center justify-center text-white font-display font-extrabold text-base">
            R
          </div>
          <span className="font-display font-bold text-lg text-navy-800">Rateflow</span>
        </Link>

        {/* User avatar placeholder */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:inline">Sophie Chen</span>
          <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-800 text-sm font-semibold">
            SC
          </div>
        </div>
      </header>

      {/* Centered content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
