"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0B14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width gradient banner container */}
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 md:p-20 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-2xl shadow-brand-violet/30 text-center">
          {/* Subtle noise/grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-pink/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Your High-Converting Listing Today</span>
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Ready to upgrade your product images in minutes?
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of smart online sellers who turned single phone photos into 15 studio-grade shots, A+ content, and optimized bullets.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-900 bg-white hover:bg-slate-100 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-4 h-4 text-brand-violet group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-black/30 hover:bg-black/40 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center"
              >
                <span>Meet the Founder</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-white/80 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>No credit card required • Instant generation • 100% Commercial rights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
