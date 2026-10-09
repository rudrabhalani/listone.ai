"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  FileText,
  MessageSquare,
  Share2,
  Sliders,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#0B0B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/20 px-3 py-1 rounded-full">
            All-In-One E-Commerce Suite
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Everything your listings need to dominate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Engineered specifically for online brands and Amazon sellers who refuse to settle for boring stock shots or generic copy.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Card 1: 15-Image Generator (Large Col-8) */}
          <div className="lg:col-span-8 group rounded-3xl p-8 bg-gradient-to-br from-[#121226] to-[#171734] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-indigo/20 text-indigo-300 border border-brand-indigo/30">
                  Core Generator
                </span>
                <span className="text-xs text-slate-400">15 Distinct Angles</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                15-Shot Professional Image Generator
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl">
                One click generates a complete listing image set: pure-white hero, infographics with dimension arrows, lifestyle scenes, competitor comparisons, and warranty badges.
              </p>
            </div>

            {/* Visual Teaser */}
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
              {[
                "Main Hero",
                "Infographic",
                "Lifestyle 1",
                "Dimensions",
                "Competitor vs",
              ].map((shot, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-2.5 text-center flex flex-col items-center justify-center border border-white/5 group-hover:border-brand-violet/30 transition-colors"
                >
                  <span className="text-lg mb-1">
                    {i === 0 ? "📦" : i === 1 ? "📊" : i === 2 ? "☕" : i === 3 ? "📏" : "⚔️"}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 truncate w-full">
                    {shot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Canva-Style Editor (Col-4) */}
          <div className="lg:col-span-4 group rounded-3xl p-8 bg-gradient-to-br from-[#1B1228] to-[#25153A] border border-white/10 hover:border-brand-pink/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/20 text-pink-300 border border-brand-pink/30">
                  Design Freedom
                </span>
                <Layers className="w-5 h-5 text-brand-pink" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                Canva-Style Layer Editor
              </h3>
              <p className="mt-3 text-slate-300 text-sm">
                No locked flat images. Drag text, swap icons, adjust shadows, and re-order elements on a freeform canvas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-pink-200 flex items-center justify-between">
              <span>Undo/redo • Snapping • Multi-fonts</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: A+ Content Studio (Col-4) */}
          <div className="lg:col-span-4 group rounded-3xl p-8 bg-gradient-to-br from-[#121A28] to-[#122238] border border-white/10 hover:border-brand-cyan/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Enhanced Brand Content
                </span>
                <Sliders className="w-5 h-5 text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                A+ Content Studio
              </h3>
              <p className="mt-3 text-slate-300 text-sm">
                7 high-converting A+ modules: 970x600 banner, brand story, 4-card grid, comparison matrix, specs table, and FAQs with live mobile previews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-cyan-300 flex items-center justify-between">
              <span>Desktop & Mobile simulator</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Listing Copy Generator (Col-4) */}
          <div className="lg:col-span-4 group rounded-3xl p-8 bg-gradient-to-br from-[#1E1929] to-[#251E33] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Amazon SEO
                </span>
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                Listing Copy & Bullets
              </h3>
              <p className="mt-3 text-slate-300 text-sm">
                Algorithmic 5-bullet formula (CAPITALIZED benefit first), HTML descriptions, and 249-byte search terms complying with strict Amazon indexing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-purple-300 flex items-center justify-between">
              <span>Byte counters & Density hints</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: AI Assistant + Multi-marketplace (Col-4) */}
          <div className="lg:col-span-4 group rounded-3xl p-8 bg-gradient-to-br from-[#25141E] to-[#331825] border border-white/10 hover:border-brand-orange/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  24/7 E-com Brain
                </span>
                <MessageSquare className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                E-Commerce AI Assistant
              </h3>
              <p className="mt-3 text-slate-300 text-sm">
                Instant expert advice on PPC bids, GST/taxation, FBA fees, returns management, sourcing, and multi-marketplace export (Amazon, Flipkart, Meesho, Shopify).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-orange-300 flex items-center justify-between">
              <span>Multi-lingual: English, Hindi, Hinglish</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
