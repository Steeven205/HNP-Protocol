import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  title: "HNP Protocol — Hotel Negotiation Protocol",
  description: "AI-to-AI hotel negotiation platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-surface text-slate-800 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
