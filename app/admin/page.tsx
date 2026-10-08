"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Server,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Settings,
  Search,
  Filter,
  ExternalLink,
  RefreshCw,
  Sliders,
  ChevronRight,
  UserCheck,
  UserX,
  Plus,
  Send,
  QrCode,
  Globe,
  ArrowUpRight,
  ToggleLeft,
  ToggleRight,
  Headphones,
  Lock,
} from "lucide-react";

interface Gateway {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Standby" | "Disabled";
  type: string;
  fees: string;
  currencies: string;
  icon: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Client" | "Support Staff";
  nodes: number;
  spent: string;
  status: "Active" | "Suspended" | "Trial";
  joined: string;
}

interface Transaction {
  id: string;
  client: string;
  service: string;
  amount: number;
  gateway: string;
  status: "Settled" | "Pending" | "Refunded";
  time: string;
}

interface Ticket {
  id: string;
  subject: string;
  client: string;
  priority: "High" | "Normal" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  time: string;
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const [gateways, setGateways] = useState<Gateway[]>([
    {
      id: "razorpay",
      name: "Razorpay Standard Checkout",
      description: "Automated cards, UPI Auto-Collect, netbanking, and domestic wallets",
      status: "Active",
      type: "Serverless Route Handler",
      fees: "2.0% + GST",
      currencies: "INR, USD, EUR",
      icon: "⚡",
    },
    {
      id: "upi",
      name: "Offline UPI Instant QR",
      description: "Zero-fee direct bank QR settlement via PhonePe, GPay, Paytm, BHIM",
      status: "Active",
      type: "VPA Direct Transfer",
      fees: "0.0% (Zero Fee)",
      currencies: "INR",
      icon: "📱",
    },
    {
      id: "stripe",
      name: "Stripe International Express",
      description: "Global credit cards, Apple Pay, Google Pay, SEPA Direct Debit",
      status: "Standby",
      type: "Webhooks Ready",
      fees: "2.9% + 30¢",
      currencies: "USD, GBP, EUR, AUD",
      icon: "🌐",
    },
  ]);

  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "usr-001",
      name: "Shreyansh Singhal",
      email: "ops@stashrnode.live",
      role: "Super Admin",
      nodes: 8,
      spent: "$1,450.00",
      status: "Active",
      joined: "Jan 12, 2026",
    },
    {
      id: "usr-002",
      name: "Vikram Patel",
      email: "vikram@cloudcraft.in",
      role: "Client",
      nodes: 2,
      spent: "$360.00",
      status: "Active",
      joined: "Feb 18, 2026",
    },
    {
      id: "usr-003",
      name: "Alex Chen",
      email: "alex@mineverse.net",
      role: "Client",
      nodes: 3,
      spent: "$520.00",
      status: "Active",
      joined: "Mar 04, 2026",
    },
    {
      id: "usr-004",
      name: "Marcus Vance",
      email: "marcus@velocity-net.org",
      role: "Client",
      nodes: 1,
      spent: "$180.00",
      status: "Suspended",
      joined: "May 22, 2026",
    },
    {
      id: "usr-005",
      name: "Elena Rostova",
      email: "elena@nordicgaming.eu",
      role: "Client",
      nodes: 2,
      spent: "$410.00",
      status: "Active",
      joined: "Jul 11, 2026",
    },
    {
      id: "usr-006",
      name: "Priya Sharma",
      email: "priya@support.stashrnode.live",
      role: "Support Staff",
      nodes: 0,
      spent: "$0.00",
      status: "Active",
      joined: "Aug 01, 2026",
    },
  ]);

  const transactions: Transaction[] = [
    {
      id: "pay_O9x8K1l9b2",
      client: "Alex Chen",
      service: "Paper 1.20 16GB Dedicated",
      amount: 15.0,
      gateway: "Razorpay Standard",
      status: "Settled",
      time: "14m ago",
    },
    {
      id: "pay_N8w7J0k8a1",
      client: "Vikram Patel",
      service: "Velocity Bungee Gateway (8GB)",
      amount: 8.0,
      gateway: "Razorpay UPI",
      status: "Settled",
      time: "1h ago",
    },
    {
      id: "pay_M7v6I9j7z0",
      client: "Elena Rostova",
      service: "CosmicGuard DDoS Shield L7",
      amount: 5.0,
      gateway: "Razorpay Card",
      status: "Settled",
      time: "3h ago",
    },
    {
      id: "pay_L6u5H8i6y9",
      client: "Marcus Vance",
      service: "Paper 1.20 32GB Ultra",
      amount: 32.0,
      gateway: "Razorpay Standard",
      status: "Pending",
      time: "5h ago",
    },
  ];

  const tickets: Ticket[] = [
    {
      id: "TCK-109",
      subject: "Port Forwarding request on Frankfurt Proxy",
      client: "Marcus Vance",
      priority: "High",
      status: "Open",
      time: "22m ago",
    },
    {
      id: "TCK-108",
      subject: "Invoice settlement confirmation query",
      client: "Priya Sharma",
      priority: "Normal",
      status: "In Progress",
      time: "2h ago",
    },
    {
      id: "TCK-106",
      subject: "Modpack upload failure via SFTP gateway",
      client: "Alex Chen",
      priority: "Low",
      status: "Resolved",
      time: "1d ago",
    },
  ];

  const toggleGateway = (id: string) => {
    setGateways((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextStatus = g.status === "Active" ? "Standby" : "Active";
          return { ...g, status: nextStatus };
        }
        return g;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan shadow-glow">
              <ShieldAlert className="size-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Admin Command Center
            </h1>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Cluster operations, financial ledger, client directory, and gateway controls.
          </p>
        </div>

        {/* Status Pills & User Chip */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 text-xs font-semibold text-brand-emerald">
            <span className="size-2 rounded-full bg-brand-emerald animate-pulse" />
            API Connected
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan">
            <Lock className="size-3" />
            Admin Mode Active
          </span>

          {/* User Profile Chip */}
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm">
            <div className="size-7 rounded-lg bg-gradient-to-tr from-brand-cyan to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
              SS
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">
                Shreyansh
              </p>
              <p className="text-[10px] text-brand-cyan font-semibold tracking-wide">
                Super Admin
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5"
          >
            Client View
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="size-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-white tracking-tight">
              $14,890.50
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-semibold text-brand-emerald flex items-center gap-1">
                <TrendingUp className="size-3" />
                +18.4%
              </span>
              <span className="text-[11px] text-slate-400">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Total Clients */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Clients
            </span>
            <div className="size-9 rounded-xl bg-brand-cyan/15 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-white tracking-tight">
              142
            </p>
            <p className="text-xs text-slate-300 mt-1.5">
              138 Active accounts • 4 in trial
            </p>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Invoices
            </span>
            <div className="size-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-300">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-amber-300 tracking-tight">
              2 <span className="text-base font-normal text-slate-400">($47.00)</span>
            </p>
            <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-1 text-amber-400">
              <AlertTriangle className="size-3" />
              1 Overdue notice sent
            </p>
          </div>
        </div>

        {/* Active Clusters */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Clusters
            </span>
            <div className="size-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
              <Server className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-white tracking-tight">
              8 Nodes
            </p>
            <p className="text-xs text-brand-emerald mt-1.5 font-medium flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand-emerald animate-pulse" />
              4 Global Regions Online
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: Transactions & Ticket Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions (2 Columns) */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <CreditCard className="size-5 text-brand-cyan" />
              <h2 className="text-base font-bold text-white">
                Recent Gateway Transactions
              </h2>
            </div>
            <Link
              href="/invoices"
              className="text-xs text-brand-cyan hover:underline flex items-center gap-1"
            >
              All Invoices
              <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Gateway</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-brand-cyan">
                      {tx.id}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">
                      {tx.client}
                    </td>
                    <td className="py-3 px-3 text-slate-300 truncate max-w-[150px]">
                      {tx.service}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-white">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {tx.gateway}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          tx.status === "Settled"
                            ? "bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {tx.status === "Settled" ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          <Clock className="size-3" />
                        )}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-400 font-mono">
                      {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Tickets Queue (1 Column) */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Headphones className="size-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">
                Support Ticket Queue
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
              3 Active
            </span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-brand-cyan">
                    #{t.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.priority === "High"
                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                        : t.priority === "Normal"
                        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {t.subject}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{t.client}</span>
                  <span className="font-mono">{t.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert("Launching Live Support Desk Interface")}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Send className="size-3.5" />
            Open Support Desk
          </button>
        </div>
      </div>

      {/* Gateway Management Section */}
      <div className="glass-panel p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="size-5 text-brand-cyan" />
              Payment Gateway Configurations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage live payment routes, merchant IDs, and gateway activation state.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Auto-Settlement: Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gateways.map((gw) => {
            const isActive = gw.status === "Active";
            return (
              <div
                key={gw.id}
                className="p-5 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between space-y-4 hover:border-brand-cyan/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{gw.icon}</span>
                    <button
                      onClick={() => toggleGateway(gw.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? "bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30"
                          : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          isActive ? "bg-brand-emerald" : "bg-slate-500"
                        }`}
                      />
                      {gw.status}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {gw.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {gw.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Integration:</span>
                    <span className="font-mono text-slate-200">{gw.type}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Processing Fee:</span>
                    <span className="font-mono text-brand-gold">{gw.fees}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Currencies:</span>
                    <span className="font-mono text-slate-200">{gw.currencies}</span>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() =>
                        alert(`Configuring merchant credentials for ${gw.name}`)
                      }
                      className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
                    >
                      Configure
                    </button>
                    <button
                      onClick={() =>
                        alert(`Ping test initiated for ${gw.name}: 200 OK`)
                      }
                      className="py-1.5 px-3 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan/25 border border-brand-cyan/30 text-xs font-semibold text-brand-cyan transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Management Section */}
      <div className="glass-panel p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="size-5 text-brand-cyan" />
              Client & User Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect user roles, active server instances, and lifetime account balances.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {["All", "Super Admin", "Client", "Support Staff"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedRole === role
                      ? "bg-brand-cyan text-black font-bold shadow-glow"
                      : "bg-white/5 text-slate-300 hover:text-white border border-white/5"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Active Nodes</th>
                <th className="py-3 px-3">Total Spend</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Joined Date</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-brand-cyan/20 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                        {u.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-100 text-xs">{u.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        u.role === "Super Admin"
                          ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                          : u.role === "Support Staff"
                          ? "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30"
                          : "bg-white/5 text-slate-300 border-white/10"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-200">
                    {u.nodes} Instances
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-white">
                    {u.spent}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        u.status === "Active"
                          ? "bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30"
                          : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          u.status === "Active" ? "bg-brand-emerald" : "bg-rose-500"
                        }`}
                      />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {u.joined}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => alert(`Impersonating session for ${u.name}`)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Impersonate User"
                      >
                        <UserCheck className="size-3.5" />
                      </button>
                      <button
                        onClick={() => alert(`Managing server instances for ${u.name}`)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cyan hover:bg-brand-cyan/20 transition-colors"
                        title="Node Orchestration"
                      >
                        <Server className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
