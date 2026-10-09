"use client";

import React from "react";
import { UploadCloud, Wand2, Palette, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      color: "from-brand-indigo to-brand-violet",
      title: "Upload or paste ASIN",
      description:
        "Upload 1 to 5 product photos from any phone or camera, or paste your Amazon ASIN / product URL to pull official catalog data directly.",
      badge: "Step 1 • Input",
    },
    {
      step: "02",
      icon: Wand2,
      color: "from-brand-violet to-brand-pink",
      title: "AI generates 15 images + A+ content",
      description:
        "Our Creative Director AI removes backgrounds, preserves exact product pixels, and generates 15 marketplace-ready listing shots and rich A+ modules.",
      badge: "Step 2 • Generation",
    },
    {
      step: "03",
      icon: Palette,
      color: "from-brand-pink to-brand-orange",
      title: "Edit like Canva and export",
      description:
        "Open any shot in our layer-based editor. Move badges, tweak headlines, swap backgrounds, and export high-res PNGs or full ZIP packages.",
      badge: "Step 3 • Customization",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0E0E1A]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
            Streamlined 3-Step Workflow
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            How Listone.ai powers your store
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            No expensive 3D studio equipment, no waiting 2 weeks for design agencies. Go from raw photo to published listing in under 3 minutes.
          </p>
        </div>

        {/* 3 Glowing Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative group rounded-3xl p-8 bg-[#121223] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Glow backlight */}
                <div
                  className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-3xl font-extrabold font-heading text-white/20 group-hover:text-white/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 mb-6 shadow-lg`}>
                    <div className="w-full h-full bg-[#121223] rounded-[14px] flex items-center justify-center text-white">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-pink-100 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-brand-pink group-hover:translate-x-1 transition-transform">
                  <span>Fast, frictionless pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
