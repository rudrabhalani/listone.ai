"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Camera, CheckCircle2 } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 bg-[#0B0B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-xs font-semibold text-brand-pink mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Quality Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            See the conversion difference in seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Slide to compare an unedited smartphone snap with Listone.ai&apos;s studio-grade generated listing image. Real product pixels preserved — zero hallucinated logos.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 select-none cursor-ew-resize group"
          >
            {/* AFTER IMAGE (Full Layer beneath) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#121226] via-[#1A1A36] to-[#2B1B47] flex items-center justify-center p-6">
              {/* Simulated Studio Listing Graphic */}
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                {/* Floating ambient glow */}
                <div className="absolute w-80 h-80 rounded-full bg-brand-pink/20 blur-3xl pointer-events-none" />

                {/* Badges and Callouts */}
                <div className="absolute top-6 left-6 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Amazon Safe Zone Verified</span>
                </div>

                <div className="absolute top-6 right-6 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                  4.8 ★ Best-Seller Layout
                </div>

                {/* Hero Product Graphic Simulation */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink p-1 shadow-2xl shadow-brand-violet/50 transform hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full bg-[#0E0E1C] rounded-[22px] flex flex-col items-center justify-center p-4">
                      <span className="text-5xl sm:text-6xl">🧴</span>
                      <span className="mt-2 text-xs font-bold text-white tracking-wider uppercase">Lumière Vital</span>
                      <span className="text-[10px] text-pink-300">20% Vitamin C + Hyaluronic</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-sm">
                    <span className="bg-white/10 border border-white/10 text-slate-200 text-xs px-2.5 py-1 rounded-lg">
                      ✦ 72hr Hydration
                    </span>
                    <span className="bg-white/10 border border-white/10 text-slate-200 text-xs px-2.5 py-1 rounded-lg">
                      ✦ Clean Clinical Formula
                    </span>
                    <span className="bg-white/10 border border-white/10 text-slate-200 text-xs px-2.5 py-1 rounded-lg">
                      ✦ 100% Vegan
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-black/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md">
                  Listone.ai Output (Layered Canvas)
                </div>
              </div>
            </div>

            {/* BEFORE IMAGE (Clipped overlay on top) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 bg-[#252528] flex items-center justify-center p-6 border-r border-white/40"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
              >
                {/* Simulated Raw Smartphone Snap */}
                <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                  <div className="absolute top-6 left-6 bg-black/70 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Raw Smartphone Photo (Before)</span>
                  </div>

                  {/* Dull unedited item */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-[#37373C] border border-white/10 flex flex-col items-center justify-center shadow-md">
                    <span className="text-5xl opacity-75 grayscale-[40%]">🧴</span>
                    <span className="mt-2 text-[11px] text-slate-400">Harsh desk shadow</span>
                  </div>

                  <div className="mt-6 text-xs text-slate-400 max-w-xs">
                    Messy background • Yellow lamp glare • Unappealing thumbnail
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Dividing Bar & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-brand-violet cursor-ew-resize">
                ⇄
              </div>
            </div>
          </div>

          {/* Helper caption */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>◄ Drag slider to compare Before</span>
            <span className="font-semibold text-slate-300">Click & drag anywhere on the card</span>
            <span>Compare After ►</span>
          </div>
        </div>
      </div>
    </section>
  );
};
