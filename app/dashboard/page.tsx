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
  Square,
  RotateCw,
  Terminal,
  Folder,
  Users,
  Activity,
  ShieldCheck,
  CreditCard,
  Plus,
  CheckCircle2,
  Copy,
  Check,
  X,
  Send,
  FileCode,
  FolderTree,
  Sparkles,
  Zap,
} from "lucide-react";
import RazorpayModal from "@/components/RazorpayModal";

interface MinecraftNode {
  id: string;
  name: string;
  subtitle: string;
  version: string;
  ip: string;
  status: "ONLINE" | "STARTING" | "OFFLINE";
  ramUsed: number;
  ramTotal: number;
  cpuPercent: number;
  playersOnline: number;
  playersMax: number;
  tps: string;
  location: string;
  iconEmoji: string;
}

export default function DashboardPage() {
  const [nodes, setNodes] = useState<MinecraftNode[]>([
    {
      id: "node-1",
      name: "Stashr-SMP Survival",
      subtitle: "PaperMC High-Frequency Survival Realm",
      version: "Paper 1.21.1",
      ip: "smp.stashrnode.live:25565",
      status: "ONLINE",
      ramUsed: 7.8,
      ramTotal: 12.0,
      cpuPercent: 36,
      playersOnline: 42,
      playersMax: 60,
      tps: "20.0",
      location: "Frankfurt (DE)",
      iconEmoji: "🌲",
    },
    {
      id: "node-2",
      name: "Titan Factions & PvP",
      subtitle: "Purpur Optimized Competitive Spigot",
      version: "Purpur 1.20.4",
      ip: "factions.stashrnode.live:25566",
      status: "ONLINE",
      ramUsed: 11.4,
      ramTotal: 16.0,
      cpuPercent: 54,
      playersOnline: 88,
      playersMax: 150,
      tps: "19.9",
      location: "Mumbai (IN)",
      iconEmoji: "⚔️",
    },
    {
      id: "node-3",
      name: "Cosmic Skyblock & Economy",
      subtitle: "Custom Island Generators & Minions Core",
      version: "Paper 1.21.0",
      ip: "sky.stashrnode.live:25567",
      status: "ONLINE",
      ramUsed: 4.6,
      ramTotal: 8.0,
      cpuPercent: 22,
      playersOnline: 31,
      playersMax: 80,
      tps: "20.0",
      location: "Singapore (SG)",
      iconEmoji: "☁️",
    },
    {
      id: "node-4",
      name: "Creative Hub & Architects",
      subtitle: "Sandboxed PlotMe & WorldEdit Cluster",
      version: "Fabric 1.21.1",
      ip: "build.stashrnode.live:25568",
      status: "OFFLINE",
      ramUsed: 0.0,
      ramTotal: 8.0,
      cpuPercent: 0,
      playersOnline: 0,
      playersMax: 50,
      tps: "0.0",
      location: "Virginia (US-East)",
      iconEmoji: "🏛️",
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isInvoiceSettled, setIsInvoiceSettled] = useState(false);

  // Modals state
  const [activeConsoleNode, setActiveConsoleNode] = useState<MinecraftNode | null>(null);
  const [activeFilesNode, setActiveFilesNode] = useState<MinecraftNode | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Console state
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[19:40:12 INFO]: Loading libraries, please wait...",
    "[19:40:14 INFO]: Loaded 28 custom plugins (LuckPerms, EssentialsX, CosmicGuard)",
    "[19:40:16 INFO]: Preparing start region for dimension minecraft:overworld",
    "[19:40:17 INFO]: Done (2.128s)! For help, type 'help'",
    "[19:40:22 INFO]: [CosmicGuard] Anti-DDoS Layer 7 rules verified: 0 dropped packets",
    "[19:40:30 INFO]: Timings reset successfully. TPS steady at 20.00",
  ]);
  const [commandInput, setCommandInput] = useState("");

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyIp = (id: string, ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedId(id);
    showToast(`Copied ${ip} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStart = (id: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "STARTING" } : n
      )
    );
    showToast(`Starting container ${id}... Allocating JVM memory heap.`);

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                status: "ONLINE",
                ramUsed: 3.4,
                cpuPercent: 18,
                playersOnline: 4,
                tps: "20.0",
              }
            : n
        )
      );
      showToast(`Node ${id} is now ONLINE and accepting player connections!`);
    }, 1800);
  };

  const handleStop = (id: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              status: "OFFLINE",
              ramUsed: 0.0,
              cpuPercent: 0,
              playersOnline: 0,
              tps: "0.0",
            }
          : n
      )
    );
    showToast(`Node ${id} gracefully shutdown (SIGTERM dispatched).`);
  };

  const handleRestart = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "STARTING" } : n))
    );
    showToast(`Restarting Node ${id}... Flushing chunk data.`);

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                status: "ONLINE",
                cpuPercent: Math.floor(Math.random() * 25) + 20,
                tps: "20.0",
              }
            : n
        )
      );
      showToast(`Node ${id} restarted successfully!`);
    }, 1600);
  };

  const handleSendConsoleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim();
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
    const newLogs = [
      ...consoleLogs,
      `[${timestamp} CONSOLE]: > ${cmd}`,
      `[${timestamp} INFO]: Command executed successfully: ${cmd}`,
    ];
    setConsoleLogs(newLogs);
    setCommandInput("");
  };

  const handleDeployNewServer = () => {
    const newId = `node-${nodes.length + 1}`;
    const newNode: MinecraftNode = {
      id: newId,
      name: "Bedrock & Java Velocity Proxy",
      subtitle: "Multi-Region Geyser & Floodgate Cluster",
      version: "Velocity 3.3.0",
      ip: `play.stashrnode.live:${25570 + nodes.length}`,
      status: "ONLINE",
      ramUsed: 2.1,
      ramTotal: 6.0,
      cpuPercent: 12,
      playersOnline: 15,
      playersMax: 200,
      tps: "20.0",
      location: "London (UK)",
      iconEmoji: "⚡",
    };
    setNodes((prev) => [...prev, newNode]);
    setIsDeployModalOpen(false);
    showToast("New high-performance Node provisioned successfully!");
  };

  // Live aggregated stats
  const onlineCount = nodes.filter((n) => n.status === "ONLINE").length;
  const totalRamUsed = nodes.reduce((sum, n) => sum + n.ramUsed, 0);
  const totalRamCap = nodes.reduce((sum, n) => sum + n.ramTotal, 0);
  const avgCpu = Math.round(
    nodes.reduce((sum, n) => sum + n.cpuPercent, 0) / (nodes.length || 1)
  );

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* Top Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 p-3.5 px-5 rounded-2xl bg-[#0f172a]/95 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,184,255,0.25)] backdrop-blur-xl animate-in slide-in-from-top-3 flex items-center gap-2.5">
            <Sparkles className="size-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

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
              onClick={() => setIsDeployModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm shadow-glow hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="size-4" />
              Deploy Node
            </button>
          </div>
        </div>

        {/* Invoice Status Banner */}
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

        {/* 4 Metric Cards - Dynamic & Mobile Optimized */}
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
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {onlineCount} / {nodes.length}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {Math.round((onlineCount / nodes.length) * 100)}% Fleet Online
              </p>
            </div>
          </div>

          {/* CPU Usage */}
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Avg CPU Load
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <Cpu className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{avgCpu}%</p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${avgCpu}%` }}
                />
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
                Memory In Use
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                <HardDrive className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {totalRamUsed.toFixed(1)}{" "}
                <span className="text-base font-normal text-slate-400">/ {totalRamCap} GB</span>
              </p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalRamUsed / totalRamCap) * 100)}%` }}
                />
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
                DDoS Mitigation
              </span>
              <div className="size-8 sm:size-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                <Activity className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">18 ms</p>
              <p className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-medium">
                <ShieldCheck className="size-3.5 shrink-0" />
                CosmicGuard L7 Active
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ENHANCED GAME NODES / ACTIVE MINECRAFT NODES SECTION (2-COL DESKTOP)     */}
        {/* ========================================================================= */}
        <div id="nodes" className="space-y-5 scroll-mt-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-white/10">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Your Active Minecraft Nodes
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {nodes.length} Instances
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                High-frequency AMD Ryzen 9 7950X instances with CosmicGuard DDoS mitigation & live controls.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry: 3s
              </span>

              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,184,255,0.15)] flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Plus className="size-3.5" />
                Deploy New Node
              </button>
            </div>
          </div>

          {/* 2-Column Responsive Grid on Desktop / 1-Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {nodes.map((node) => {
              const isOnline = node.status === "ONLINE";
              const isStarting = node.status === "STARTING";
              const isOffline = node.status === "OFFLINE";
              const isCopied = copiedId === node.id;
              const ramPercent = Math.min(100, Math.round((node.ramUsed / node.ramTotal) * 100));

              return (
                <div
                  key={node.id}
                  className="glass-panel p-5 sm:p-6 space-y-4.5 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,184,255,0.15)]"
                >
                  {/* Card Header: Emoji, Server Name, Version, Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="size-11 sm:size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
                        {node.iconEmoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base sm:text-lg text-white truncate">
                            {node.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{node.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300 font-semibold">
                            {node.version}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            📍 {node.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isOnline && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                          ONLINE
                        </span>
                      )}
                      {isStarting && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                          <RotateCw className="size-3 animate-spin text-amber-400" />
                          STARTING
                        </span>
                      )}
                      {isOffline && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                          <span className="size-2 rounded-full bg-slate-500" />
                          OFFLINE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Copyable IP:Port Box */}
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 group">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                        IP:
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-semibold text-slate-200 truncate select-none">
                        {node.ip}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyIp(node.id, node.ip)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isCopied
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-white/5 hover:bg-white/15 text-cyan-400 border border-white/10"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copy IP</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Telemetry Metrics & Progress Bars (RAM, CPU, Players) */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    {/* RAM Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <HardDrive className="size-3.5 text-cyan-400" />
                          RAM Allocation
                        </span>
                        <span className="font-mono text-slate-200 font-semibold">
                          {node.ramUsed.toFixed(1)} GB / {node.ramTotal.toFixed(1)} GB{" "}
                          <span className="text-slate-400 text-[11px]">({ramPercent}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            ramPercent > 85
                              ? "bg-gradient-to-r from-amber-400 to-red-500"
                              : "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                          }`}
                          style={{ width: `${ramPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* CPU Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Cpu className="size-3.5 text-indigo-400" />
                          CPU Load
                        </span>
                        <span className="font-mono text-slate-200 font-semibold">
                          {node.cpuPercent}%{" "}
                          <span className="text-slate-400 text-[11px]">(Ryzen 9)</span>
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            node.cpuPercent > 80
                              ? "bg-gradient-to-r from-amber-400 to-red-500"
                              : "bg-gradient-to-r from-cyan-400 to-indigo-500"
                          }`}
                          style={{ width: `${node.cpuPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom Micro Metrics (Players, TPS, SLA) */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Players</p>
                        <p className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
                          <Users className="size-3 text-cyan-400" />
                          {node.playersOnline} / {node.playersMax}
                        </p>
                      </div>

                      <div className="border-x border-white/5">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Tick Rate</p>
                        <p
                          className={`text-xs sm:text-sm font-bold mt-0.5 font-mono ${
                            parseFloat(node.tps) >= 19.5 ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          {node.tps} TPS
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Protection</p>
                        <p className="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5 flex items-center justify-center gap-1">
                          <ShieldCheck className="size-3" />
                          L7 DDoS
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Node Action Buttons: START, STOP, RESTART, CONSOLE, FILES */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {/* START */}
                      <button
                        onClick={() => handleStart(node.id)}
                        disabled={isOnline || isStarting}
                        className="py-2 px-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
                        title="Start Minecraft Server"
                      >
                        <Play className="size-3.5 fill-current" />
                        <span className="text-[10px] sm:text-xs">START</span>
                      </button>

                      {/* STOP */}
                      <button
                        onClick={() => handleStop(node.id)}
                        disabled={isOffline || isStarting}
                        className="py-2 px-1 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
                        title="Stop Minecraft Server"
                      >
                        <Square className="size-3.5 fill-current" />
                        <span className="text-[10px] sm:text-xs">STOP</span>
                      </button>

                      {/* RESTART */}
                      <button
                        onClick={() => handleRestart(node.id)}
                        disabled={isOffline || isStarting}
                        className="py-2 px-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer hover:scale-105 active:scale-95"
                        title="Restart Minecraft Server"
                      >
                        <RotateCw className={`size-3.5 ${isStarting ? "animate-spin" : ""}`} />
                        <span className="text-[10px] sm:text-xs">RESTART</span>
                      </button>

                      {/* CONSOLE */}
                      <button
                        onClick={() => setActiveConsoleNode(node)}
                        className="py-2 px-1 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(0,184,255,0.1)]"
                        title="Open Interactive Web Shell"
                      >
                        <Terminal className="size-3.5" />
                        <span className="text-[10px] sm:text-xs">CONSOLE</span>
                      </button>

                      {/* FILES */}
                      <button
                        onClick={() => setActiveFilesNode(node)}
                        className="py-2 px-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95"
                        title="Browse Server Files"
                      >
                        <Folder className="size-3.5" />
                        <span className="text-[10px] sm:text-xs">FILES</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE WEB CONSOLE MODAL                                             */}
      {/* ========================================================================= */}
      {activeConsoleNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveConsoleNode(null)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,184,255,0.2)] flex flex-col overflow-hidden max-h-[85vh]"
            style={{
              background: "rgba(10, 15, 28, 0.95)",
              backdropFilter: "blur(36px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-5 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Terminal className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    {activeConsoleNode.name} • Web Shell
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      LIVE TTY
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    PID: 84920 • JVM 21 LTS (64-bit) • PaperMC
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveConsoleNode(null)}
                className="size-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 bg-[#050811]/90 select-text">
              <div className="text-cyan-400 pb-2 border-b border-white/10 text-[11px]">
                Connected to StashrNode Daemon WebSocket [ws://daemon.stashrnode.live:8080/servers/{activeConsoleNode.id}]
              </div>
              {consoleLogs.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.includes("CONSOLE")
                      ? "text-yellow-300 font-bold"
                      : log.includes("CosmicGuard")
                      ? "text-cyan-400"
                      : "text-slate-300"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Command Input Bar */}
            <form
              onSubmit={handleSendConsoleCommand}
              className="p-3 sm:p-4 border-t border-white/10 bg-black/50 flex items-center gap-2"
            >
              <span className="text-cyan-400 font-mono font-bold text-sm pl-2">&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Type a server command (e.g. 'tps', 'list', 'say Hello Node')..."
                className="flex-1 bg-transparent border-none text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FILE EXPLORER MODAL                                                       */}
      {/* ========================================================================= */}
      {activeFilesNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveFilesNode(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,184,255,0.2)] flex flex-col overflow-hidden max-h-[85vh]"
            style={{
              background: "rgba(10, 15, 28, 0.95)",
              backdropFilter: "blur(36px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-5 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FolderTree className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {activeFilesNode.name} • File Manager
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Path: /var/lib/ptero/volumes/{activeFilesNode.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveFilesNode(null)}
                className="size-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* File List */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2 text-xs">
              {[
                { name: "plugins/", type: "folder", size: "28 items", date: "Today, 18:24" },
                { name: "world/", type: "folder", size: "1.4 GB", date: "Today, 19:40" },
                { name: "world_nether/", type: "folder", size: "380 MB", date: "Yesterday" },
                { name: "world_the_end/", type: "folder", size: "120 MB", date: "Yesterday" },
                { name: "server.properties", type: "file", size: "1.8 KB", date: "Oct 06, 2026" },
                { name: "paper-global.yml", type: "file", size: "4.2 KB", date: "Oct 06, 2026" },
                { name: "spigot.yml", type: "file", size: "3.1 KB", date: "Oct 06, 2026" },
                { name: "ops.json", type: "file", size: "0.4 KB", date: "Oct 07, 2026" },
                { name: "whitelist.json", type: "file", size: "0.2 KB", date: "Oct 07, 2026" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
                  onClick={() => showToast(`Selected ${item.name} for inspection`)}
                >
                  <div className="flex items-center gap-3">
                    {item.type === "folder" ? (
                      <Folder className="size-4 text-cyan-400 shrink-0" />
                    ) : (
                      <FileCode className="size-4 text-slate-400 shrink-0" />
                    )}
                    <span className="font-mono text-slate-200 font-medium">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                    <span>{item.size}</span>
                    <span className="hidden sm:inline">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-4 border-t border-white/10 bg-black/50 flex items-center justify-between text-xs text-slate-400">
              <span>9 objects • NVMe SSD Gen4</span>
              <button
                onClick={() => {
                  showToast("Uploading SFTP archive...");
                  setActiveFilesNode(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer"
              >
                Upload Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DEPLOY NEW NODE MODAL                                                     */}
      {/* ========================================================================= */}
      {isDeployModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsDeployModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,184,255,0.2)] space-y-5"
            style={{
              background: "rgba(10, 15, 28, 0.95)",
              backdropFilter: "blur(36px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Zap className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Deploy Minecraft Node</h3>
                  <p className="text-[11px] text-slate-400">Instant Provisioning on Ryzen 7950X</p>
                </div>
              </div>
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="size-7 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Velocity Proxy Gateway</h4>
                  <p className="text-xs text-slate-400">6 GB DDR5 • Geyser Bedrock Bridge</p>
                </div>
                <span className="text-cyan-400 font-extrabold text-sm">$8.00/mo</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between opacity-70">
                <div>
                  <h4 className="font-bold text-white text-sm">Extreme Modded Forge 1.20.1</h4>
                  <p className="text-xs text-slate-400">16 GB DDR5 • 4 Dedicated VCPUs</p>
                </div>
                <span className="text-slate-300 font-extrabold text-sm">$22.00/mo</span>
              </div>
            </div>

            <button
              onClick={handleDeployNewServer}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-sm shadow-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="size-4" />
              Instantly Provision Node
            </button>
          </div>
        </div>
      )}

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
