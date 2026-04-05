import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rateflow — AI-Powered Hotel Negotiation",
  description: "Rateflow negotiates hotel rates with AI so you don't have to",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
