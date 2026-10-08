"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
  QrCode,
  Smartphone,
  Lock,
} from "lucide-react";

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId?: string;
  amount?: number;
  itemName?: string;
  onPaymentSuccess?: (invoiceId: string) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  invoiceId = "INV-2026-092",
  amount = 15.0,
  itemName = "Minecraft Node Pro (Ryzen 7950X, 16GB DDR5, 100GB NVMe)",
  onPaymentSuccess,
}: RazorpayModalProps) {
  const [step, setStep] = useState<"review" | "processing" | "success">("review");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [txId, setTxId] = useState("");

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setStep("processing");

    setTimeout(() => {
      const generatedTx = "pay_rzp_" + Math.random().toString(36).substring(2, 11).toUpperCase();
      setTxId(generatedTx);
      setStep("success");
      if (onPaymentSuccess) {
        onPaymentSuccess(invoiceId);
      }
    }, 1800);
  };

  const handleResetAndClose = () => {
    setStep("review");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-5 sm:p-7 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,184,255,0.2)] text-left"
        style={{
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-glow">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-white">Razorpay</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                  3D SECURE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">StashrNode Cloud Services</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="size-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* STEP 1: REVIEW & AUTHORIZE */}
        {step === "review" && (
          <div className="mt-5 space-y-4">
            {/* Invoice Breakdown */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Invoice Identifier</span>
                <span className="font-mono text-cyan-300 font-semibold">{invoiceId}</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-xs">
                <span className="text-slate-400">Workload</span>
                <span className="text-slate-200 font-medium text-right line-clamp-1">{itemName}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Total Due</span>
                <span className="text-2xl font-black text-white tracking-tight">
                  ${amount.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (₹{(amount * 83).toFixed(0)} INR)
                  </span>
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "upi"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,184,255,0.25)]"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="size-4" />
                  Instant UPI (GPay/Paytm)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,184,255,0.25)]"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="size-4" />
                  Credit / Debit Card
                </button>
              </div>
            </div>

            {/* Security Pill */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
              <Lock className="size-3.5 text-emerald-400 shrink-0" />
              <span>PCI-DSS Level 1 Compliant • 256-bit AES TLS Encryption</span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSimulatePayment}
              className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm shadow-glow flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Simulate Settle ${amount.toFixed(2)} USD</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PROCESSING */}
        {step === "processing" && (
          <div className="py-10 text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <Loader2 className="size-12 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 size-12 rounded-full bg-cyan-400/20 animate-ping" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Communicating with Razorpay...</h3>
              <p className="text-xs text-slate-400 mt-1">
                Authenticating encrypted token and verifying 3D Secure Webhook.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === "success" && (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="size-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <CheckCircle2 className="size-9" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-1.5">
                Payment Authorized & Settled!
                <Sparkles className="size-5 text-amber-300" />
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Transaction confirmed by Razorpay Gateway. Node SLA extended.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="text-cyan-400 font-bold">{txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Settled Amount:</span>
                <span className="text-white">${amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway Status:</span>
                <span className="text-emerald-400 font-bold">CAPTURED (200 OK)</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors"
            >
              Done & Return to Fleet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
