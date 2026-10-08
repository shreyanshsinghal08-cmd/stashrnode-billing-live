"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Server,
  Cpu,
  HardDrive,
  AlertTriangle,
  ArrowUpRight,
  Play,
  RotateCw,
  Users,
  Activity,
  ShieldCheck,
  CreditCard,
  Plus,
  CheckCircle2,
} from "lucide-react";
import RazorpayModal from "@/components/RazorpayModal";

export default function DashboardPage() {
  const [nodes, setNodes] = useState([
    {
      id: "node-1",
      name: "⛏ Stashr-SMP Survival",
      type: "Paper 1.20.4",
      status: "Running",
      players: "28 / 50",
      memory: "12 GB / 16 GB",
      cpu: "36%",
      tps: "20.0",
      ip: "play.stashrnode.live:25565",
      location: "Frankfurt (DE)",
    },
    {
      id: "node-2",
      name: "⚡ Velocity Proxy Gateway",
      type: "Velocity 3.3.0",
      status: "Running",
      players: "84 / 200",
      memory: "6.2 GB / 8 GB",
      cpu: "18%",
      tps: "20.0",
      ip: "eu.stashrnode.live:25577",
      location: "Mumbai (IN)",
    },
  ]);

  const [restartingId, setRestartingId] = useState<string | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isInvoiceSettled, setIsInvoiceSettled] = useState(false);

  const handleRestart = (id: string) => {
    setRestartingId(id);
    setTimeout(() => {
      setRestartingId(null);
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* Top Banner / Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Cluster Telemetry
              <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-mono">
                Live Fleet
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Real-time diagnostics and node orchestration powered by Next.js 14.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <Link
              href="/invoices"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-slate-200 transition-colors flex items-center gap-2"
            >
              <CreditCard className="size-4 text-cyan-400" />
              Billing Center
            </Link>
            <button
              onClick={() => alert("Server provisioner active. Select plan in billing.")}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm shadow-glow hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Plus className="size-4" />
              Deploy Node
            </button>
          </div>
        </div>

        {/* Invoice Status Banner (Interactive Static Demo) */}
        {!isInvoiceSettled ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-amber-200 flex items-center gap-2 flex-wrap">
                  Action Required: Pending Invoice #INV-2026-092
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    $15.00 USD
                  </span>
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                  Due in 3 days. Settle via Razorpay to maintain uninterrupted high-frequency node performance.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsRazorpayOpen(true)}
              className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-95"
            >
              Pay via Razorpay
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border border-emerald-500/30 backdrop-blur-xl flex items-center justify-between gap-4 shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-emerald-200">
                  Fleet Fully Settled & Secured
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                  Invoice #INV-2026-092 has been paid via Razorpay. Node resources are renewed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4 Metric Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
          {/* Active Nodes */}
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Active Nodes
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                <Server className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">2 / 2</p>
              <p className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Nodes Healthy
              </p>
            </div>
          </div>

          {/* CPU Usage */}
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                CPU Utilization
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <Cpu className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">32%</p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-1.5 rounded-full" style={{ width: "32%" }} />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-mono truncate">
                AMD Ryzen 9 7950X @ 5.7GHz
              </p>
            </div>
          </div>

          {/* RAM Usage */}
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Memory Allocation
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                <HardDrive className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                26.2 <span className="text-base font-normal text-slate-400">/ 32 GB</span>
              </p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-1.5 rounded-full" style={{ width: "81.8%" }} />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-mono truncate">
                DDR5 ECC 5600MHz Low-Latency
              </p>
            </div>
          </div>

          {/* Network SLA */}
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Network Telemetry
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                <Activity className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">18 ms</p>
              <p className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                <ShieldCheck className="size-3.5 shrink-0" />
                Cosmic Guard DDoS Active
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Minecraft Nodes Section */}
        <div id="nodes" className="space-y-4 scroll-mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Active Game Servers
              </h2>
              <p className="text-xs text-slate-400">
                Direct telemetry stream and power controls for provisioned Minecraft containers.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Auto-refresh: 5s
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {nodes.map((node) => {
              const isRestarting = restartingId === node.id;
              return (
                <div key={node.id} className="glass-panel p-4.5 sm:p-6 space-y-4">
                  {/* Node Title & Status Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2 truncate">
                        {node.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                          {node.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {node.location}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
                        isRestarting
                          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          isRestarting ? "bg-amber-400 animate-ping" : "bg-emerald-400"
                        }`}
                      />
                      {isRestarting ? "Restarting..." : "Online"}
                    </span>
                  </div>

                  {/* Node Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 sm:px-4 rounded-xl bg-black/30 border border-white/5 text-center">
                    <div>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
                        Players
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
                        <Users className="size-3.5 text-cyan-400" />
                        {node.players}
                      </p>
                    </div>
                    <div className="border-x border-white/5">
                      <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
                        Memory
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5 font-mono">
                        {node.memory.split(" / ")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
                        Tick Rate
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5 font-mono">
                        {node.tps} TPS
                      </p>
                    </div>
                  </div>

                  {/* Connection String */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 truncate">
                      {node.ip}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(node.ip);
                        alert("IP copied to clipboard!");
                      }}
                      className="text-[11px] font-semibold text-cyan-400 hover:underline shrink-0 ml-2 cursor-pointer"
                    >
                      Copy Address
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <button
                      onClick={() => handleRestart(node.id)}
                      disabled={isRestarting}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      <RotateCw className={`size-3.5 ${isRestarting ? "animate-spin" : ""}`} />
                      {isRestarting ? "Sending SIGTERM..." : "Restart Node"}
                    </button>

                    <button
                      onClick={() => alert(`Opening Web Shell console for ${node.name}`)}
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-xs font-semibold text-cyan-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="size-3.5" />
                      Console Shell
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Static Demo Razorpay Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        invoiceId="INV-2026-092"
        amount={15.0}
        itemName="Minecraft Node Pro (Ryzen 7950X, 16GB DDR5, 100GB NVMe)"
        onPaymentSuccess={() => {
          setIsInvoiceSettled(true);
        }}
      />
    </>
  );
}
