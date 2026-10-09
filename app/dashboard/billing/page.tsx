"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import {
  CreditCard,
  Sparkles,
  Check,
  Shield,
  Coins,
  ArrowRight,
  TrendingUp,
  Receipt,
  Globe,
  IndianRupee,
} from "lucide-react";

export default function BillingPage() {
  const { credits, addCredits } = useApp();
  const [selectedGateway, setSelectedGateway] = useState<"stripe" | "razorpay">("stripe");
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const creditPackages = [
    {
      id: "pack-100",
      credits: 100,
      priceUSD: 19,
      priceINR: 1599,
      bonus: "Standard Pack",
      popular: false,
    },
    {
      id: "pack-350",
      credits: 350,
      priceUSD: 49,
      priceINR: 3999,
      bonus: "+50 Bonus Credits",
      popular: true,
    },
    {
      id: "pack-1000",
      credits: 1000,
      priceUSD: 119,
      priceINR: 9999,
      bonus: "+200 Bonus Credits",
      popular: false,
    },
  ];

  const handleCheckout = (pack: (typeof creditPackages)[0]) => {
    // Simulate real gateway processing
    const paymentMsg =
      selectedGateway === "razorpay"
        ? `Payment verified via Razorpay (India UPI/Card). ${pack.credits} Credits added!`
        : `Payment verified via Stripe (International). ${pack.credits} Credits added!`;

    addCredits(pack.credits);
    setPurchaseSuccess(paymentMsg);
    setTimeout(() => setPurchaseSuccess(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-2">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Billing, Credits & Subscriptions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Credits Wallet & Payment Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Deduct on success only. Full international credit cards (Stripe) and Indian UPI / NetBanking (Razorpay) supported.
        </p>
      </div>

      {purchaseSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{purchaseSuccess}</span>
        </div>
      )}

      {/* Balance Summary Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Current Credit Balance
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white mt-1 flex items-center gap-3">
            <Coins className="w-8 h-8 text-brand-pink" />
            <span>{credits} Credits</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sufficient for ~{Math.floor(credits / 15)} complete 15-shot listing packages.
          </p>
        </div>

        {/* Payment Gateway Toggle */}
        <div className="bg-[#121223] border border-white/10 p-1.5 rounded-2xl flex items-center gap-1">
          <button
            onClick={() => setSelectedGateway("stripe")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              selectedGateway === "stripe"
                ? "bg-brand-violet text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Stripe (International USD)</span>
          </button>

          <button
            onClick={() => setSelectedGateway("razorpay")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              selectedGateway === "razorpay"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            <span>Razorpay (India INR / UPI)</span>
          </button>
        </div>
      </div>

      {/* Credit Packs Grid */}
      <div>
        <h3 className="text-lg font-bold font-heading text-white mb-4">
          Instant Top-Up Credit Packages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditPackages.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                pack.popular
                  ? "bg-gradient-to-br from-[#181830] to-[#25153A] border-2 border-brand-pink shadow-xl shadow-brand-pink/10"
                  : "bg-[#121223] border border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white">
                    {pack.bonus}
                  </span>
                  {pack.popular && (
                    <span className="text-[10px] uppercase font-bold text-brand-pink tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div className="text-3xl font-extrabold font-heading text-white">
                  {pack.credits} Credits
                </div>
                <div className="text-2xl font-bold text-slate-200 mt-2">
                  {selectedGateway === "razorpay" ? `₹${pack.priceINR}` : `$${pack.priceUSD}`}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Top-up never expires. Usable across Image Studio, A+ Content, and SEO Copywriter.
                </p>
              </div>

              <button
                onClick={() => handleCheckout(pack)}
                className={`mt-6 w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                  pack.popular
                    ? "bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white shadow-lg"
                    : "bg-white/10 hover:bg-white/15 text-white"
                }`}
              >
                <span>Purchase with {selectedGateway === "razorpay" ? "Razorpay" : "Stripe"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security and Policies */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>256-bit Encrypted Checkout • Zero Credit Storage • Instant Automated Activation</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/refund" className="hover:text-white underline">
            Refund Policy
          </Link>
          <Link href="/terms" className="hover:text-white underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
