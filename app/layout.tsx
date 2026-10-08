import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import GlassDock from "@/components/GlassDock";

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
  const securityScript = `
    (function() {
      // 1. Disable Right-Click context menu
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      }, { capture: true });

      // 2. Disable DevTools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
      document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123 || e.key === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        // Ctrl+U (View Source), Ctrl+S (Save)
        if ((e.ctrlKey || e.metaKey) && ['u', 'U', 's', 'S'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, { capture: true });

      // 3. Prevent text selection and image drag
      document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
      }, { capture: true });

      document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
      }, { capture: true });
    })();
  `;

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: securityScript }} />
      </head>
      <body className="min-h-screen text-slate-100 antialiased selection:bg-transparent selection:text-transparent">
        {/* Bulletproof Full-Screen Background Layer for iOS & Android */}
        <div className="fixed inset-0 -z-50 pointer-events-none bg-[#0B0E14] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
            style={{
              backgroundImage:
                "linear-gradient(rgba(11, 14, 20, 0.55), rgba(11, 14, 20, 0.55)), url('/images/bg-main.jpg')",
            }}
          />
        </div>

        {/* Content Wrapper without sidebar padding */}
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 pb-32 sm:pb-36">
            {children}
          </main>

          <footer className="py-6 px-4 sm:px-8 text-center text-xs text-slate-400 border-t border-white/5 bg-[#0B0E14]/40 backdrop-blur-md pb-24 sm:pb-12">
            <p>
              © {new Date().getFullYear()} StashrNode Cloud Systems. High-frequency Minecraft & game server infrastructure.
            </p>
          </footer>
        </div>

        {/* Ultra-Modern Floating Glass Dock */}
        <GlassDock />
      </body>
    </html>
  );
}
