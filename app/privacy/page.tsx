import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last updated: October 2026 • Listone.ai Inc.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 text-sm text-slate-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">1. Introduction</h2>
            <p>
              Welcome to <strong>Listone.ai</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We respect your privacy and are committed to protecting your personal data, catalog information, and uploaded product images. This policy describes how we collect, store, and process your data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">2. Information We Collect</h2>
            <p>
              When you use Listone.ai, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information (Name, Email address, authentication tokens).</li>
              <li>Product imagery and ASIN queries submitted for generation.</li>
              <li>Billing metadata handled securely by Stripe or Razorpay.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">3. Use of Product Images & Commercial Ownership</h2>
            <p>
              <strong>You retain 100% ownership of your raw product photographs and all AI-generated listing images and copy produced by Listone.ai.</strong> We do not sell your product designs or license your intellectual property to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">4. Data Security</h2>
            <p>
              We implement industry-standard AES-256 encryption at rest and TLS 1.3 in transit. Database access is guarded with Supabase Row Level Security (RLS) ensuring that users only have access to their own projects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-heading">5. Contact</h2>
            <p>
              For privacy inquiries, contact our team at: <span className="text-pink-300 font-mono">privacy@listone.ai</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
