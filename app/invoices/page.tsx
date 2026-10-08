"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowDownToLine,
  ShieldCheck,
  Receipt,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import RazorpayModal from "@/components/RazorpayModal";

interface Invoice {
  id: string;
  item: string;
  amount: number;
  currency: string;
  date: string;
  dueDate: string;
  status: "Pending" | "Paid";
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-2026-092",
      item: "Minecraft Node Pro (Ryzen 7950X, 16GB DDR5, 100GB NVMe)",
      amount: 15.0,
      currency: "USD",
      date: "Oct 06, 2026",
      dueDate: "Oct 12, 2026",
      status: "Pending",
    },
    {
      id: "INV-2026-088",
      item: "Velocity Bungee Gateway Node (8GB RAM, High-Bandwidth)",
      amount: 8.0,
      currency: "USD",
      date: "Sep 06, 2026",
      dueDate: "Sep 12, 2026",
      status: "Paid",
    },
    {
      id: "INV-2026-074",
      item: "CosmicGuard DDoS Shield Layer 7 Enterprise Addon",
      amount: 5.0,
      currency: "USD",
      date: "Aug 06, 2026",
      dueDate: "Aug 12, 2026",
      status: "Paid",
    },
  ]);

  const [activeModalInvoice, setActiveModalInvoice] = useState<Invoice | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  const handleOpenPayModal = (invoice: Invoice) => {
    setActiveModalInvoice(invoice);
  };

  const handlePaymentSuccessCallback = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: "Paid" } : inv
      )
    );
    setPaymentSuccess(
      `Payment settled successfully for ${invoiceId}! Razorpay Webhook Verified.`
    );
  };

  const pendingTotal = invoices
    .filter((i) => i.status === "Pending")
    .reduce((sum, i) => sum + i.amount, 0);

  const paidTotal = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link
            href="/dashboard"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="size-3.5" />
            Back to Telemetry
          </Link>
          <span>/</span>
          <span className="text-slate-200">Billing Ledger</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap">
              Billing & Invoices
              <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                Razorpay 3D Secure
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Automated subscription management and one-click Razorpay settlement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="size-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold">
                  Gateway Protocol
                </p>
                <p className="text-xs font-bold text-white">Razorpay Serverless</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {paymentSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xl flex items-center gap-3 text-emerald-400 animate-in fade-in duration-200">
            <CheckCircle2 className="size-5 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">{paymentSuccess}</p>
          </div>
        )}

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4.5">
          <div className="glass-panel p-4.5 sm:p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Outstanding Balance
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-2">
              ${pendingTotal.toFixed(2)}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {pendingTotal > 0 ? "Due by Oct 12, 2026" : "Zero balance due"}
            </p>
          </div>

          <div className="glass-panel p-4.5 sm:p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Paid (YTD)
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
              ${paidTotal.toFixed(2)}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {invoices.filter((i) => i.status === "Paid").length} invoices cleared
            </p>
          </div>

          <div className="glass-panel p-4.5 sm:p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Billing Tier
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
              Enterprise
              <Sparkles className="size-5 text-amber-400" />
            </p>
            <p className="text-xs text-slate-400 mt-1">Priority 24/7 SLA</p>
          </div>
        </div>

        {/* Invoices Table Container */}
        <div className="glass-panel p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Receipt className="size-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">Invoice History</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Showing {invoices.length} entries
            </span>
          </div>

          <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm min-w-[620px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3 sm:px-4">Invoice #</th>
                  <th className="py-3 px-3 sm:px-4">Service Description</th>
                  <th className="py-3 px-3 sm:px-4">Issue Date</th>
                  <th className="py-3 px-3 sm:px-4">Due Date</th>
                  <th className="py-3 px-3 sm:px-4">Amount</th>
                  <th className="py-3 px-3 sm:px-4">Status</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => {
                  const isPending = inv.status === "Pending";
                  return (
                    <tr
                      key={inv.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-3 sm:px-4 font-mono font-bold text-cyan-400 text-xs sm:text-sm">
                        {inv.id}
                      </td>
                      <td className="py-4 px-3 sm:px-4 font-medium text-slate-200 text-xs sm:text-sm max-w-[200px] truncate">
                        {inv.item}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-slate-400 text-xs whitespace-nowrap">
                        {inv.date}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-slate-400 text-xs font-mono whitespace-nowrap">
                        {inv.dueDate}
                      </td>
                      <td className="py-4 px-3 sm:px-4 font-extrabold text-white text-sm sm:text-base whitespace-nowrap">
                        ${inv.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-3 sm:px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                            isPending
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          {isPending ? (
                            <>
                              <Clock className="size-3" />
                              Unpaid
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="size-3" />
                              Paid
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-right whitespace-nowrap">
                        {isPending ? (
                          <button
                            onClick={() => handleOpenPayModal(inv)}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-xs shadow-glow hover:brightness-110 transition-all cursor-pointer active:scale-95"
                          >
                            <CreditCard className="size-3.5" />
                            Pay via Razorpay
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              alert(`Downloading official PDF receipt for ${inv.id}`)
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                          >
                            <ArrowDownToLine className="size-3.5" />
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Razorpay Demo Modal */}
      {activeModalInvoice && (
        <RazorpayModal
          isOpen={!!activeModalInvoice}
          onClose={() => setActiveModalInvoice(null)}
          invoiceId={activeModalInvoice.id}
          amount={activeModalInvoice.amount}
          itemName={activeModalInvoice.item}
          onPaymentSuccess={handlePaymentSuccessCallback}
        />
      )}
    </>
  );
}
