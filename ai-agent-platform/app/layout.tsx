import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WoulfAI - AI Employees That Actually Work",
  description: "Deploy intelligent AI agents for warehouse management, sales, finance, marketing, and customer support. Automate your operations 24/7.",
  keywords: "AI agents, warehouse management, WMS, sales automation, CFO automation, marketing AI, customer support AI",
  openGraph: {
    title: "WoulfAI - AI Employees That Actually Work",
    description: "Deploy intelligent AI agents that handle your operations 24/7.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased">{children}</body>
    </html>
  );
}
