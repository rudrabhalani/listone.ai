"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Maximize2,
  Award,
  Package,
  Check,
  Zap,
  TrendingUp,
} from "lucide-react";

interface ListingShotVisualProps {
  shotIndex: number;
  productImage: string;
  productName: string;
  brandName: string;
  features: string[];
  category: string;
}

export const ListingShotVisual: React.FC<ListingShotVisualProps> = ({
  shotIndex,
  productImage,
  productName,
  brandName,
  features,
  category,
}) => {
  const feat1 = features[0] || "Premium High-Grade Finish";
  const feat2 = features[1] || "Precision Engineered Durability";
  const feat3 = features[2] || "Ergonomic All-Day Usability";

  // SHOT 1: Amazon Main Hero (Pure White RGB 255)
  if (shotIndex === 1) {
    return (
      <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        {/* Soft realistic ground contact shadow */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-5 w-44 h-3.5 bg-black/20 rounded-[100%] blur-md pointer-events-none" />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/10 text-[9px] font-mono text-slate-700 font-bold">
          RGB(255,255,255) • 85% Frame
        </div>
      </div>
    );
  }

  // SHOT 2: 45° Angle Studio Showcase (Podium with Ambient Glow)
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0c0d18] via-[#141529] to-[#07080e] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        {/* Radial ambient spotlight */}
        <div className="absolute top-1/4 w-60 h-60 rounded-full bg-brand-violet/20 blur-3xl pointer-events-none" />

        {/* Product on podium */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)] transform -rotate-3 hover:rotate-0 transition-transform duration-300"
          />

          {/* 3D Illuminated Podium */}
          <div className="w-56 h-10 -mt-3 rounded-[100%] bg-gradient-to-r from-brand-indigo/40 via-brand-pink/30 to-brand-violet/40 border border-white/20 shadow-[0_10px_25px_rgba(236,72,153,0.3)] backdrop-blur-md" />
          <div className="w-48 h-2.5 -mt-1 rounded-[100%] bg-black/60 blur-sm" />
        </div>

        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-pink" />
          <span>Studio Key Light</span>
        </div>
      </div>
    );
  }

  // SHOT 3: Side Profile & Precision Architecture
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#10101f] via-[#1b1a32] to-[#0c0b16] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        {/* Architectural backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
          />
          <div className="w-48 h-3 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>

        {/* Feature Pill Callout */}
        <div className="absolute bottom-3 inset-x-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] text-white">
          <span className="font-bold truncate">{brandName} Architecture</span>
          <span className="text-emerald-400 font-mono text-[10px]">Precision Finish</span>
        </div>
      </div>
    );
  }

  // SHOT 4: Macro Close-Up Texture (With Magnifying Inspection Loupe)
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#131224] to-[#080811] flex items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[78%] max-w-[78%] object-contain opacity-80"
          />

          {/* High-Tech Magnifying Loupe Ring */}
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-brand-pink shadow-[0_0_30px_rgba(236,72,153,0.5)] backdrop-brightness-125 backdrop-contrast-125 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-pink animate-ping" />
            </div>
            <div className="absolute -bottom-3 bg-brand-pink text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
              10x Macro Focus
            </div>
          </div>
        </div>

        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 border border-white/15 text-[10px] text-pink-300 font-bold">
          Micro Texture & Stitching
        </div>
      </div>
    );
  }

  // SHOT 5: Infographic: Top 3 Selling Features
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#0c0d1a] via-[#141529] to-[#0f101e] p-4 flex flex-col justify-between overflow-hidden select-none">
        {/* Top Header */}
        <div className="text-center z-10 pt-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-pink block">
            Engineered Excellence
          </span>
          <h5 className="text-xs font-extrabold text-white truncate">{productName}</h5>
        </div>

        {/* Center Product with callout cards */}
        <div className="relative flex-1 flex items-center justify-center my-1">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[62%] max-w-[62%] object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
          />

          {/* Callout 1 (Top Left) */}
          <div className="absolute top-2 left-1 max-w-[42%] bg-black/75 backdrop-blur-md border border-brand-violet/40 rounded-xl p-2 shadow-lg">
            <div className="flex items-center gap-1 text-[10px] font-bold text-pink-300">
              <Sparkles className="w-3 h-3 text-brand-pink shrink-0" />
              <span className="truncate">{feat1}</span>
            </div>
          </div>

          {/* Callout 2 (Top Right) */}
          <div className="absolute top-2 right-1 max-w-[42%] bg-black/75 backdrop-blur-md border border-brand-violet/40 rounded-xl p-2 shadow-lg">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-300">
              <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{feat2}</span>
            </div>
          </div>

          {/* Callout 3 (Bottom Left) */}
          <div className="absolute bottom-2 left-1 max-w-[44%] bg-black/75 backdrop-blur-md border border-brand-violet/40 rounded-xl p-2 shadow-lg">
            <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-300">
              <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{feat3}</span>
            </div>
          </div>
        </div>

        <div className="text-center z-10 pb-1">
          <span className="text-[9px] text-slate-400 font-mono">
            High-CTR Listing Infographic Layout
          </span>
        </div>
      </div>
    );
  }

  // SHOT 6: Infographic: Exact Dimensions & Weight Blueprint
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-[#0a0f1d] border border-cyan-500/20 p-5 flex flex-col justify-between overflow-hidden select-none">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d415_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Dimension Specs Guide
          </span>
          <span className="text-[9px] font-mono text-slate-400">Scale: 1:1 Actual</span>
        </div>

        {/* Center Product with measurement lines */}
        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[68%] max-w-[68%] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
          />

          {/* Height Dimension Line (Right) */}
          <div className="absolute right-3 top-8 bottom-8 flex flex-col items-center justify-between">
            <div className="w-2 h-0.5 bg-cyan-400" />
            <div className="h-full w-[1.5px] bg-cyan-400/60 dashed flex items-center justify-center">
              <span className="bg-[#0a0f1d] px-1 py-0.5 text-[9px] font-mono font-bold text-cyan-300 rotate-90 whitespace-nowrap">
                Height: 18.5 cm
              </span>
            </div>
            <div className="w-2 h-0.5 bg-cyan-400" />
          </div>

          {/* Width Dimension Line (Bottom) */}
          <div className="absolute bottom-2 inset-x-12 flex items-center justify-between">
            <div className="h-2 w-0.5 bg-cyan-400" />
            <div className="w-full h-[1.5px] bg-cyan-400/60 flex items-center justify-center">
              <span className="bg-[#0a0f1d] px-1 text-[9px] font-mono font-bold text-cyan-300 whitespace-nowrap">
                Width: 12.0 cm
              </span>
            </div>
            <div className="h-2 w-0.5 bg-cyan-400" />
          </div>
        </div>

        {/* Weight Callout */}
        <div className="z-10 bg-black/60 border border-cyan-500/30 rounded-xl px-3 py-1 flex items-center justify-between text-[10px] font-mono text-slate-300">
          <span>Featherlight Ergonomics</span>
          <span className="text-cyan-300 font-bold">Net Weight: 240g</span>
        </div>
      </div>
    );
  }

  // SHOT 7: Natural Lifestyle Tabletop (Warm Wood Surface)
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#2a1e17] via-[#3a2c22] to-[#1c140e] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        {/* Soft morning ambient sunlight beam */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)]"
          />
          {/* Wood table reflection */}
          <div className="w-52 h-4 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>

        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span>☕ In-Use Workspace Lifestyle</span>
        </div>
      </div>
    );
  }

  // SHOT 8: Editorial Minimalist Scene (Textured Stone Studio)
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#1a1c23] via-[#242834] to-[#12141a] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)]"
          />
          <div className="w-48 h-3.5 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>

        <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          ✦ Editorial Caliber
        </div>
      </div>
    );
  }

  // SHOT 9: Human Scale & Ergonomics
  if (shotIndex === 9) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#131221] to-[#0a0a13] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_22px_26px_rgba(0,0,0,0.7)]"
          />
          <div className="w-44 h-3 -mt-2 bg-black/50 rounded-[100%] blur-md" />
        </div>

        <div className="absolute bottom-3 inset-x-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-2 flex items-center justify-between text-[10px] text-slate-300">
          <span className="font-bold text-white">Everyday Ergonomics</span>
          <span className="text-emerald-400 font-bold">100% Comfort Fit</span>
        </div>
      </div>
    );
  }

  // SHOT 10: High-Impact Commercial Callout Banner
  if (shotIndex === 10) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#1d0d29] via-[#2a133d] to-[#0e0717] p-5 flex flex-col justify-between overflow-hidden select-none">
        <div className="text-center z-10">
          <span className="text-[10px] uppercase font-extrabold text-brand-pink tracking-widest block">
            UNCOMPROMISING QUALITY
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-tight mt-0.5">
            BUILT FOR PERFORMANCE
          </h4>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute w-44 h-44 rounded-full bg-brand-pink/20 blur-2xl pointer-events-none" />
          <img
            src={productImage}
            alt={productName}
            className="max-h-[70%] max-w-[70%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] relative z-10"
          />
        </div>

        <div className="z-10 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-[10px] font-extrabold text-center py-1.5 rounded-xl shadow-lg">
          MAXIMUM CONVERSION BANNER
        </div>
      </div>
    );
  }

  // SHOT 11: What's In The Box Unboxing Layout
  if (shotIndex === 11) {
    return (
      <div className="relative w-full h-full bg-[#0d0e1c] p-4 flex flex-col justify-between overflow-hidden select-none">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Package className="w-3.5 h-3.5 text-brand-pink" />
            <span>What&apos;s In The Box</span>
          </div>
          <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
            Complete Kit
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[68%] max-w-[68%] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Checklist */}
        <div className="z-10 bg-black/60 border border-white/10 rounded-xl p-2 space-y-1 text-[10px]">
          <div className="flex items-center gap-1.5 text-white">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">1x {productName.split(" ").slice(0, 3).join(" ")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>1x Official Retail Packaging Box</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>1x Quick-Start User Manual & Warranty Card</span>
          </div>
        </div>
      </div>
    );
  }

  // SHOT 12: Comparison Matrix (Our Product vs Generic)
  if (shotIndex === 12) {
    return (
      <div className="relative w-full h-full bg-[#0a0a14] p-3 flex flex-col justify-between overflow-hidden select-none">
        <div className="text-center pb-1">
          <h5 className="text-[11px] font-bold text-white">Why Choose {brandName}?</h5>
          <p className="text-[9px] text-slate-400">Head-to-head comparison</p>
        </div>

        <div className="grid grid-cols-2 gap-2 flex-1 items-center">
          {/* Left: Our Product */}
          <div className="h-full bg-gradient-to-b from-emerald-950/40 to-slate-900/60 border border-emerald-500/40 rounded-xl p-2 flex flex-col justify-between">
            <div className="text-center">
              <span className="text-[9px] font-bold text-emerald-400 uppercase block">Our Brand</span>
              <div className="h-14 flex items-center justify-center my-1">
                <img
                  src={productImage}
                  alt={productName}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-1 text-[9px] text-slate-200">
              <div className="flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">Premium Materials</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">100% QA Tested</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Right: Generic Competitor */}
          <div className="h-full bg-slate-900/40 border border-rose-500/20 rounded-xl p-2 flex flex-col justify-between opacity-70">
            <div className="text-center">
              <span className="text-[9px] font-bold text-rose-400 uppercase block">Generic Other</span>
              <div className="h-14 flex items-center justify-center my-1 text-slate-500 text-xs">
                ⚠️ Competitor
              </div>
            </div>
            <div className="space-y-1 text-[9px] text-slate-400">
              <div className="flex items-center gap-1">
                <XCircle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                <span className="truncate">Cheap Plastics</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                <span className="truncate">No Testing</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                <span className="truncate">Zero Warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1 text-center">
          <span className="text-[9px] font-mono text-emerald-400 font-bold">
            Verified Conversion Boost (+34%)
          </span>
        </div>
      </div>
    );
  }

  // SHOT 13: Quality & Certification Seals
  if (shotIndex === 13) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0e0e1d] to-[#070710] p-4 flex flex-col justify-between overflow-hidden select-none">
        <div className="text-center z-10">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
            Certified Quality Guarantee
          </span>
          <h5 className="text-xs font-bold text-white truncate">{brandName} Certified</h5>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[68%] max-w-[68%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* 3 Badges */}
        <div className="z-10 grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400 mx-auto mb-0.5" />
            <span className="text-[8px] font-bold text-white block">100% Tested</span>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-0.5" />
            <span className="text-[8px] font-bold text-white block">CE & RoHS</span>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 mx-auto mb-0.5" />
            <span className="text-[8px] font-bold text-white block">Eco Packaging</span>
          </div>
        </div>
      </div>
    );
  }

  // SHOT 14: Step-by-Step Quick Start Guide
  if (shotIndex === 14) {
    return (
      <div className="relative w-full h-full bg-[#0d0e1c] p-4 flex flex-col justify-between overflow-hidden select-none">
        <div className="text-center z-10">
          <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest block">
            Easy 3-Step Setup
          </span>
          <h5 className="text-xs font-bold text-white">Ready in Under 60 Seconds</h5>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[64%] max-w-[64%] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* 3 Steps */}
        <div className="z-10 grid grid-cols-3 gap-1 text-center">
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <span className="w-4 h-4 rounded-full bg-brand-violet text-white text-[9px] font-bold inline-flex items-center justify-center mb-0.5">
              1
            </span>
            <span className="text-[8px] font-bold text-slate-200 block truncate">Unbox</span>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <span className="w-4 h-4 rounded-full bg-brand-pink text-white text-[9px] font-bold inline-flex items-center justify-center mb-0.5">
              2
            </span>
            <span className="text-[8px] font-bold text-slate-200 block truncate">Instant Setup</span>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-xl p-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold inline-flex items-center justify-center mb-0.5">
              3
            </span>
            <span className="text-[8px] font-bold text-slate-200 block truncate">Enjoy Daily</span>
          </div>
        </div>
      </div>
    );
  }

  // SHOT 15: Brand Story & 100% Money-Back Guarantee Shield
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1c1208] via-[#24170b] to-[#120a04] p-5 flex flex-col justify-between overflow-hidden select-none">
      <div className="text-center z-10">
        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
          RISK-FREE PURCHASE
        </span>
        <h4 className="text-xs font-bold text-white">100% Satisfaction Guarantee</h4>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
        <img
          src={productImage}
          alt={productName}
          className="max-h-[68%] max-w-[68%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] relative z-10"
        />
      </div>

      <div className="z-10 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-2 rounded-xl shadow-lg border border-amber-300/30">
        <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>30-Day Money-Back Guarantee</span>
        </div>
        <span className="text-[9px] text-amber-100 font-medium block">
          Zero Questions Asked • {brandName} Official
        </span>
      </div>
    </div>
  );
};
