"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  Zap,
} from "lucide-react";

export const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0B0B14]">
      {/* Aurora mesh background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-brand-indigo/25 via-brand-violet/20 to-brand-pink/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-cyan/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-brand-orange/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-xs font-semibold text-slate-200 hover:border-brand-violet/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-brand-pink animate-ping" />
            <span className="text-pink-300">New 2.0 Engine</span>
            <span className="text-slate-400">|</span>
            <span>Canva-style editable layers enabled</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Main Headline & Subhead */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
            Turn one product photo into{" "}
            <span className="gradient-text block sm:inline">
              15 high-converting listing images
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Get listing photos, A+ content and optimized bullets in minutes. Edit everything like Canva.
          </p>

          {/* Clean Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/image-studio")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-xl shadow-brand-violet/30 hover:shadow-brand-violet/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
            >
              <Sparkles className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
              <span>Launch Studio Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("how-it-works");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>See How It Works</span>
            </button>
          </div>

          {/* Clean Trust Line */}
          <div className="pt-4 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink" />
              <span>Commercial license included</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-indigo" />
              <span>Amazon TOS Compliant</span>
            </span>
          </div>
        </div>

        {/* Feature Teaser Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/20 flex items-center justify-center text-brand-indigo shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">15 Pack</p>
              <h5 className="text-sm font-bold text-white">Full Shot List in Minutes</h5>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Editable</p>
              <h5 className="text-sm font-bold text-white">Canva-style Layers Engine</h5>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">A+ & SEO</p>
              <h5 className="text-sm font-bold text-white">Bullets & Search Terms</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
