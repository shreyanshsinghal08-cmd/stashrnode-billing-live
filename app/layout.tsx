import type { Metadata } from "next";
import "./globals.css";
import GlassSidebar from "@/components/GlassSidebar";

export const metadata: Metadata = {
  title: "StashrNode Billing & Cloud Infrastructure",
  description: "Next.js 14 Glassmorphism Billing & High-Performance Node Orchestration",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen text-slate-100 antialiased selection:bg-brand-cyan selection:text-black">
        <GlassSidebar />
        <div className="lg:pl-80 min-h-screen flex flex-col pt-16 lg:pt-0">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <footer className="py-6 px-8 text-center text-xs text-slate-400 border-t border-white/5 bg-[#0B0E14]/40 backdrop-blur-md">
            <p>
              © {new Date().getFullYear()} StashrNode Cloud Systems. Built for high-frequency Minecraft & game server workloads.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
