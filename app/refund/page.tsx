import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20">
            Fair Seller Guarantee
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-4">
            Refund & Credit Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last updated: October 2026 • Listone.ai Inc.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 text-sm text-slate-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">1. Deduct On Success Only Policy</h2>
            <p>
              At <strong>Listone.ai</strong>, we operate on a strict fairness standard: credits are deducted only when an image pack, A+ module, or copy generation finishes successfully and passes automated QA. If a job fails, times out, or encounters a server disruption, your credits are refunded immediately to your account balance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">2. 7-Day Money-Back Guarantee</h2>
            <p>
              If you purchase a paid subscription or credit package and are unsatisfied with the generated quality within 7 days of purchase (provided fewer than 50% of the purchased credits have been used), you are entitled to a full refund to your original payment method (Stripe or Razorpay).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">3. How to Request a Refund</h2>
            <p>
              To initiate a refund, simply email <span className="text-pink-300 font-mono">billing@listone.ai</span> with your account email and transaction ID. Our support team processes approved requests within 2 business days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
