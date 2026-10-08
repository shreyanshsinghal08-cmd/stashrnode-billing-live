"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Server,
  Receipt,
  Shield,
  User,
  Sparkles,
  CheckCircle2,
  X,
  LogOut,
  Sliders,
} from "lucide-react";

export default function GlassDock() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Track window.location.hash via hashchange & popstate events
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  // Sync hash state when pathname changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
    }
  }, [pathname]);

  // Click handlers for Dashboard and Game Nodes
  const handleDashboardClick = (e: React.MouseEvent) => {
    setCurrentHash("");
    if (pathname === "/dashboard" || pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", "/dashboard");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNodesClick = (e: React.MouseEvent) => {
    setCurrentHash("#nodes");
    if (pathname === "/dashboard" || pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", "#nodes");
      }
      const nodesElem = document.getElementById("nodes");
      if (nodesElem) {
        nodesElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Active state logic
  const isDashboardActive =
    (pathname === "/dashboard" || pathname === "/") && currentHash !== "#nodes";
  const isNodesActive =
    (pathname === "/dashboard" || pathname === "/") && currentHash === "#nodes";
  const isInvoicesActive = pathname.startsWith("/invoices");
  const isAdminActive = pathname.startsWith("/admin");

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: isDashboardActive,
      onClick: handleDashboardClick,
    },
    {
      label: "Game Nodes",
      href: "/dashboard#nodes",
      icon: Server,
      active: isNodesActive,
      onClick: handleNodesClick,
    },
    {
      label: "Invoices",
      href: "/invoices",
      icon: Receipt,
      active: isInvoicesActive,
      badge: "1",
      onClick: () => setCurrentHash(""),
    },
    {
      label: "Admin Panel",
      href: "/admin",
      icon: Shield,
      active: isAdminActive,
      onClick: () => setCurrentHash(""),
    },
  ];

  return (
    <>
      {/* Floating Glass Dock Container */}
      <nav
        aria-label="Floating Navigation Dock"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]"
      >
        <div
          className="relative flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.7),0_0_20px_rgba(0,184,255,0.12)] transition-all duration-300 hover:border-cyan-400/30"
          style={{
            background: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
          }}
        >
          {/* Subtle Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none -z-10" />

          {/* Navigation Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <div key={item.label} className="relative group">
                {/* Floating Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-100 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl z-50">
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/90" />
                </div>

                <Link
                  href={item.href}
                  onClick={item.onClick}
                  className={`relative flex items-center justify-center size-11 sm:size-12 rounded-full transition-all duration-200 ease-out transform group-hover:scale-120 group-hover:-translate-y-1 active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-b from-cyan-400/25 to-blue-600/30 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,184,255,0.4)]"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="size-5 sm:size-5.5 stroke-[2]" />

                  {/* Notification Dot / Badge */}
                  {item.badge && (
                    <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-amber-400 ring-2 ring-slate-900 animate-pulse" />
                  )}

                  {/* Active Indicator Underline Pill */}
                  {isActive && (
                    <span className="absolute -bottom-1 size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00B8FF]" />
                  )}
                </Link>
              </div>
            );
          })}

          {/* Vertical Separator */}
          <div className="h-6 w-px bg-white/15 mx-0.5 sm:mx-1" />

          {/* User Profile Button */}
          <div className="relative group">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-100 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl z-50">
              Shreyansh (Admin)
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/90" />
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="relative flex items-center justify-center size-11 sm:size-12 rounded-full bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 transition-all duration-200 ease-out transform group-hover:scale-120 group-hover:-translate-y-1 active:scale-95 cursor-pointer"
              aria-label="Open User Profile"
            >
              <div className="size-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                S
              </div>
              <span className="absolute bottom-1 right-1 size-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Modal / Flyout */}
      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 border border-white/15 shadow-2xl relative"
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold text-black shadow-glow">
                SN
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                  Shreyansh Singhal
                  <CheckCircle2 className="size-4 text-cyan-400 inline" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  ops@stashrnode.live
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                    Super Administrator
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="mt-5 grid grid-cols-2 gap-3 p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Fleet</p>
                <p className="text-sm font-bold text-white">4 Nodes Online</p>
              </div>
              <div className="border-l border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">DDoS Shield</p>
                <p className="text-sm font-bold text-cyan-400">CosmicGuard L7</p>
              </div>
            </div>

            {/* Action Links */}
            <div className="mt-5 space-y-2">
              <Link
                href="/admin"
                onClick={() => setShowProfileModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="size-4 text-cyan-400" />
                  Cluster Orchestration
                </span>
                <span className="text-[10px] text-slate-400">Admin</span>
              </Link>

              <button
                onClick={() => {
                  alert("Client Demo Mode: Session lock simulated.");
                  setShowProfileModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold text-red-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
                Lock Demo Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
