import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-full border border-brand-indigo/20">
            Terms of Service
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-4">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last updated: October 2026 • Listone.ai Inc.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 text-sm text-slate-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">1. Agreement to Terms</h2>
            <p>
              By signing up or utilizing the web services of <strong>Listone.ai</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">2. Full Commercial Ownership Guarantee</h2>
            <p className="p-4 rounded-xl bg-brand-violet/20 border border-brand-violet/40 text-pink-100 font-medium">
              Important: You maintain 100% full commercial rights to all generated images, layered canvas files, A+ designs, and written listing bullets produced on Listone.ai. You are authorized to use them commercially across Amazon, Shopify, Flipkart, Meesho, Etsy, advertising campaigns, and packaging without royalty obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">3. Marketplace Compliance & Ethics</h2>
            <p>
              You agree not to use Listone.ai to generate deceptive imagery that falsely misrepresents defective products or violates marketplace policies (such as Amazon Main Image RGB 255 pure white guidelines). Listone.ai strictly forbids scraping Amazon or unauthorized third-party platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">4. Credit Usage & Deductions</h2>
            <p>
              Credits are consumed solely upon the successful completion and delivery of generation jobs. Failed generations due to system errors are automatically reimbursed to your balance.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
