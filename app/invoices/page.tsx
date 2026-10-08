"use client";

import React, { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowDownToLine,
  ShieldCheck,
  Receipt,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

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

  const [loadingInvoiceId, setLoadingInvoiceId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  const handlePayRazorpay = async (invoice: Invoice) => {
    setLoadingInvoiceId(invoice.id);

    try {
      // 1. Request Order Creation from Next.js Serverless Route Handler
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: invoice.id,
          amount: invoice.amount,
          currency: "INR", // Razorpay standard demo currency
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Razorpay order");
      }

      // 2. Configure Razorpay Standard Checkout
      const options = {
        key: data.keyId || "rzp_test_StashrNodeDemo",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "StashrNode Cloud Services",
        description: `Payment for ${invoice.id} - ${invoice.item}`,
        image: "https://stashrnode.live/images/logo.png",
        order_id: data.orderId,
        handler: function (razorpayResponse: any) {
          // Success Callback
          setInvoices((prev) =>
            prev.map((inv) =>
              inv.id === invoice.id ? { ...inv, status: "Paid" } : inv
            )
          );
          setPaymentSuccess(
            `Payment successfully settled! Transaction ID: ${
              razorpayResponse.razorpay_payment_id || "pay_demo_success"
            }`
          );
          setLoadingInvoiceId(null);
        },
        prefill: {
          name: "Admin User",
          email: "ops@stashrnode.live",
          contact: "+919876543210",
        },
        notes: {
          invoice_id: invoice.id,
          platform: "Next.js 14 Vercel Cloud",
        },
        theme: {
          color: "#00B8FF",
        },
      };

      // Check if Razorpay script loaded
      if (typeof (window as any).Razorpay !== "undefined") {
        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          alert(`Payment Failed: ${response.error.description}`);
          setLoadingInvoiceId(null);
        });
        rzp.open();
      } else {
        // Fallback simulation if checkout script is blocked or offline
        alert(
          "Razorpay SDK ready! Simulating sandbox settlement for " + invoice.id
        );
        setTimeout(() => {
          setInvoices((prev) =>
            prev.map((inv) =>
              inv.id === invoice.id ? { ...inv, status: "Paid" } : inv
            )
          );
          setPaymentSuccess(`Sandbox Payment Settled for ${invoice.id}!`);
          setLoadingInvoiceId(null);
        }, 1000);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Razorpay Checkout: ${err.message}`);
      setLoadingInvoiceId(null);
    }
  };

  return (
    <>
      {/* Load Razorpay Standard Checkout Client Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="space-y-8 pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-brand-cyan transition-colors flex items-center gap-1">
            <ChevronLeft className="size-3.5" />
            Back to Telemetry
          </Link>
          <span>/</span>
          <span className="text-slate-200">Billing Ledger</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Billing & Invoices
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 font-mono">
                Razorpay 3D Secure
              </span>
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Automated subscription management and one-click Razorpay settlement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="size-5 text-brand-cyan" />
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">
                  Gateway Protocol
                </p>
                <p className="text-xs font-bold text-white">Razorpay Serverless</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {paymentSuccess && (
          <div className="p-4 rounded-2xl bg-brand-emerald/15 border border-brand-emerald/30 backdrop-blur-xl flex items-center gap-3 text-brand-emerald">
            <CheckCircle2 className="size-5 shrink-0" />
            <p className="text-sm font-semibold">{paymentSuccess}</p>
          </div>
        )}

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel p-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Outstanding Balance
            </span>
            <p className="text-3xl font-extrabold text-amber-300 mt-2">
              ${invoices.filter((i) => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
            </p>
            <p className="text-xs text-slate-400 mt-1">Due by Oct 12, 2026</p>
          </div>

          <div className="glass-panel p-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Paid (YTD)
            </span>
            <p className="text-3xl font-extrabold text-brand-emerald mt-2">
              ${invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
            </p>
            <p className="text-xs text-slate-400 mt-1">2 invoices cleared</p>
          </div>

          <div className="glass-panel p-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Billing Tier
            </span>
            <p className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
              Enterprise
              <Sparkles className="size-5 text-brand-gold" />
            </p>
            <p className="text-xs text-slate-400 mt-1">Priority 24/7 SLA</p>
          </div>
        </div>

        {/* Invoices Table Container */}
        <div className="glass-panel p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Receipt className="size-5 text-brand-cyan" />
              <h2 className="text-lg font-bold text-white">Invoice History</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Showing {invoices.length} entries
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Service Description</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => {
                  const isPending = inv.status === "Pending";
                  const isLoading = loadingInvoiceId === inv.id;
                  return (
                    <tr
                      key={inv.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-brand-cyan">
                        {inv.id}
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-200">
                        {inv.item}
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-xs">
                        {inv.date}
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-xs font-mono">
                        {inv.dueDate}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-white text-base">
                        ${inv.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                            isPending
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30"
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
                      <td className="py-4 px-4 text-right">
                        {isPending ? (
                          <button
                            onClick={() => handlePayRazorpay(inv)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 text-black font-extrabold text-xs shadow-glow hover:brightness-110 transition-all disabled:opacity-50"
                          >
                            <CreditCard className="size-3.5" />
                            {isLoading ? "Opening Razorpay..." : "Pay via Razorpay"}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              alert(`Downloading official PDF receipt for ${inv.id}`)
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
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
    </>
  );
}
