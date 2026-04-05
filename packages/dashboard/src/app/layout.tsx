import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rateflow — AI-Powered Hotel Negotiation",
  description: "Rateflow negotiates hotel rates with AI so you don't have to",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy-deep text-slate-100 antialiased font-mono overflow-x-hidden">
        {/* Background gradient & mesh - global */}
        <div className="fixed inset-0 z-0 opacity-80 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, #1A2942, #0A1628)" }} />
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-mesh" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
