"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Ideal for individual brand owners and new sellers launching 3 to 10 products.",
      priceMonthly: 29,
      priceYearly: 24,
      credits: "150 Credits / mo",
      skuCapacity: "~10 complete 15-image listings",
      popular: false,
      features: [
        "150 Generation Credits / month",
        "15-Shot AI Product Image Generator",
        "Canva-style editable layers & exports",
        "Pure White (RGB 255) Amazon Hero photos",
        "Basic A+ Content module generator",
        "SEO Listing copy (5 bullets & description)",
        "Standard AI Chat Copilot (50 chats/mo)",
        "Single-user commercial license",
      ],
      ctaText: "Start Free Trial",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For active e-commerce brands and 6/7-figure sellers scaling their catalog.",
      priceMonthly: 69,
      priceYearly: 55,
      credits: "500 Credits / mo",
      skuCapacity: "~35 complete 15-image listings",
      popular: true,
      features: [
        "500 Generation Credits / month",
        "All 15 Shot Types + Custom Prompts",
        "Full 7-Module A+ Content Studio",
        "Official Amazon ASIN / URL Auto-Importer",
        "Full Canva-Style Layer Editor with Undo/Redo",
        "High-Res 2000x2000+ Export (ZIP & PNG)",
        "Unlimited E-Commerce AI Chat & PPC Advice",
        "Brand Kit (Saved colors, logos, typography)",
        "Parallel generation queue with instant retry",
      ],
      ctaText: "Get Pro Access",
    },
    {
      id: "business",
      name: "Business",
      description: "For agencies, aggregators, and high-volume multi-brand e-commerce enterprises.",
      priceMonthly: 149,
      priceYearly: 119,
      credits: "1,500 Credits / mo",
      skuCapacity: "~100+ complete 15-image listings",
      popular: false,
      features: [
        "1,500 Generation Credits / month",
        "Bulk ASIN Catalog Batch Processing",
        "Multi-Seat Team Collaboration (Up to 5 seats)",
        "All Marketplaces: Amazon, Flipkart, Shopify, Etsy",
        "Priority GPU Render Queue (Fastest turnaround)",
        "Custom Brand Templates & Font Uploads",
        "Unlimited Listing Bullets, Search Terms & A+",
        "Dedicated Account Specialist & Priority Slack Support",
      ],
      ctaText: "Scale Your Agency",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0B0B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
            Transparent Credit Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Simple plans that scale with your SKUs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Deduct credits only on successful generations. Unused credits rollover on active subscriptions. Full commercial ownership guaranteed.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white/10 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Yearly Billing</span>
              <span className="bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

            if (plan.popular) {
              return (
                /* Featured Pro Plan with Animated Gradient Border */
                <div key={plan.id} className="relative flex flex-col">
                  <div className="gradient-border-box p-1 h-full shadow-2xl shadow-brand-violet/30 flex flex-col">
                    <div className="bg-[#121223] rounded-[15px] p-8 flex flex-col justify-between h-full relative">
                      {/* Popular Badge */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Most Popular</span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mt-2">
                          <h3 className="text-2xl font-bold font-heading text-white">
                            {plan.name}
                          </h3>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-pink/20 text-pink-300 border border-brand-pink/30">
                            {plan.credits}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-300 min-h-[36px]">
                          {plan.description}
                        </p>

                        <div className="mt-6 flex items-baseline gap-1">
                          <span className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
                            ${price}
                          </span>
                          <span className="text-sm text-slate-400">/ month</span>
                          {billingCycle === "yearly" && (
                            <span className="ml-2 text-xs text-pink-300 font-medium">
                              (billed annually)
                            </span>
                          )}
                        </div>

                        <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span>{plan.skuCapacity}</span>
                        </div>

                        <div className="my-6 border-t border-white/10" />

                        {/* Checklist */}
                        <ul className="space-y-3 text-sm text-slate-200">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        <Link
                          href="/dashboard?plan=pro"
                          className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/40 hover:shadow-brand-violet/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              /* Starter and Business Standard Glass Cards */
              <div
                key={plan.id}
                className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">
                      {plan.credits}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-300 min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
                      ${price}
                    </span>
                    <span className="text-sm text-slate-400">/ month</span>
                    {billingCycle === "yearly" && (
                      <span className="ml-2 text-xs text-pink-300 font-medium">
                        (billed annually)
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{plan.skuCapacity}</span>
                  </div>

                  <div className="my-6 border-t border-white/10" />

                  {/* Checklist */}
                  <ul className="space-y-3 text-sm text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={`/dashboard?plan=${plan.id}`}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee and Payment Support Footnote */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Credits deducted on success only — failed jobs auto-refunded</span>
          </span>
          <span>•</span>
          <span>Supports International Cards (Stripe) and UPI / NetBanking / Cards (Razorpay)</span>
          <span>•</span>
          <span>Cancel or switch plans anytime with one click</span>
        </div>
      </div>
    </section>
  );
};
