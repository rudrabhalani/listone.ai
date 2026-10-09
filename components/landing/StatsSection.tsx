"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Users, Image as ImageIcon } from "lucide-react";

export const StatsSection: React.FC = () => {
  const [counts, setCounts] = useState({
    images: 0,
    sellers: 0,
    listings: 0,
  });

  useEffect(() => {
    // Smooth animated number counter
    const duration = 2000;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        images: Math.round(progress * 142500),
        sellers: Math.round(progress * 3820),
        listings: Math.round(progress * 19400),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#0B0B14] relative border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brand-pink" />
            <span>Platform Activity Metrics (Sample benchmark preview)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group hover:border-brand-indigo/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 text-brand-indigo flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              {counts.images.toLocaleString()}+
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-2">
              Product Images Generated
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
              Sample Benchmark Data
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group hover:border-brand-violet/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 text-brand-violet flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              {counts.sellers.toLocaleString()}+
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-2">
              Sellers & Brands Empowered
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
              Sample Benchmark Data
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group hover:border-brand-pink/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-brand-pink/20 text-brand-pink flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              {counts.listings.toLocaleString()}+
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-2">
              Listings & A+ Modules Published
            </div>
            <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
              Sample Benchmark Data
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
