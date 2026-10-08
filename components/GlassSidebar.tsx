"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Server,
  LifeBuoy,
  Settings,
  Menu,
  X,
  Activity,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function GlassSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Invoices & Billing",
      href: "/invoices",
      icon: CreditCard,
      badge: "1 Due",
    },
    {
      name: "Game Nodes",
      href: "/dashboard",
      icon: Server,
    },
    {
      name: "Support Desk",
      href: "/invoices",
      icon: LifeBuoy,
    },
    {
      name: "Settings",
      href: "/dashboard",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛏</span>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-cyan bg-clip-text text-transparent">
            StashrNode
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Floating Glass Sidebar */}
      <aside
        className={`fixed top-4 bottom-4 left-4 z-40 w-72 glass-sidebar flex flex-col justify-between p-6 transition-all duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Status */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="size-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-xl shadow-glow group-hover:scale-105 transition-transform">
                ⛏
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  StashrNode
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                    Pro
                  </span>
                </h1>
                <p className="text-xs text-slate-400">High-Performance Billing</p>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Telemetry Status Card */}
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full size-3 bg-brand-emerald"></span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Cluster Online
                </span>
                <span className="text-[11px] font-mono text-brand-cyan">
                  99.98%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Frankfurt & Mumbai Nodes
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-cyan/15 text-white border border-brand-cyan/30 shadow-[0_0_15px_rgba(0,184,255,0.2)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`size-4 ${
                        isActive ? "text-brand-cyan" : "text-slate-400"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Account Section */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-8 rounded-lg bg-gradient-to-br from-brand-cyan to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                SN
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  Admin User
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  ops@stashrnode.live
                </p>
              </div>
            </div>
            <Link
              href="/invoices"
              title="View Invoices"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="size-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
