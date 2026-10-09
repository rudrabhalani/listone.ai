"use client";

import React from "react";
import {
  Check,
  X,
  AlertTriangle,
  Droplets,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ZoomIn,
  Ruler,
  Maximize2,
  CheckCircle2,
} from "lucide-react";

interface ListingShotVisualProps {
  shotIndex: number;
  productImage: string;
  productName: string;
}

export const ListingShotVisual: React.FC<ListingShotVisualProps> = ({
  shotIndex,
  productImage,
  productName,
}) => {
  // =========================================================================
  // SHOT 1: Amazon Main Hero (100% Pure White RGB 255, 85% Frame, Contact Shadow)
  // =========================================================================
  if (shotIndex === 1) {
    return (
      <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-5 w-52 h-4 bg-black/15 rounded-[100%] blur-md pointer-events-none" />
      </div>
    );
  }

  // =========================================================================
  // SHOT 2: Authentic In-Use Contextual Lifestyle Scene (Real Kitchen / Home)
  // =========================================================================
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-[#0a0a14] overflow-hidden select-none">
        {/* Real in-use photographic lifestyle background */}
        <img
          src="/samples/media_1791548490183.jpg"
          alt="In-Use Lifestyle Scene"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Soft vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        
        {/* Subtle authentic lifestyle badge */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 border border-white/15 text-white flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold">Everyday In-Home Performance</span>
          </div>
          <span className="text-[9px] text-slate-300 font-mono">100% Food-Safe</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 3: Tool-Free Three-Step Setup Guide (Exact Style of User's Amazon Reference)
  // =========================================================================
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-3 flex flex-col justify-between select-none overflow-hidden text-slate-800">
        {/* Top Header Banner */}
        <div className="text-center pt-0.5">
          <div className="inline-block bg-[#E1EEF8] text-[#133E68] font-black text-[11px] px-3 py-1 rounded-lg shadow-sm">
            Tool-Free Three-Step Setup
          </div>
        </div>

        {/* 3 Step Panels with Arrows */}
        <div className="grid grid-cols-3 gap-1.5 my-auto items-center relative">
          {/* Step 1 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm flex flex-col items-center justify-between h-36">
            <span className="w-4 h-4 rounded-full bg-[#133E68] text-white text-[9px] font-black flex items-center justify-center self-start">
              1
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img
                src={productImage}
                alt="Step 1"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full w-full text-center">
              Slide on
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm flex flex-col items-center justify-between h-36">
            <span className="w-4 h-4 rounded-full bg-[#133E68] text-white text-[9px] font-black flex items-center justify-center self-start">
              2
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img
                src={productImage}
                alt="Step 2"
                className="max-h-full max-w-full object-contain transform rotate-6"
              />
            </div>
            <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full w-full text-center">
              Thread strap
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm flex flex-col items-center justify-between h-36">
            <span className="w-4 h-4 rounded-full bg-[#133E68] text-white text-[9px] font-black flex items-center justify-center self-start">
              3
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1 relative">
              <img
                src={productImage}
                alt="Step 3"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute bottom-0 w-6 h-6 bg-cyan-400/20 rounded-full blur-sm" />
            </div>
            <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full w-full text-center">
              Tighten securely
            </span>
          </div>
        </div>

        {/* Bottom Instruction Bar */}
        <div className="bg-slate-100 rounded-xl p-1.5 flex items-center justify-between text-[8px] font-bold text-slate-600 px-2.5">
          <span>Slide on • Thread strap • Tighten securely</span>
          <span className="text-amber-700 font-extrabold flex items-center gap-0.5">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
            <span>Do not overtighten</span>
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 4: Captures Visible Particles & Circular Texture Loupe
  // =========================================================================
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-[#F4F8FC] p-3 flex flex-col justify-between select-none overflow-hidden text-slate-800">
        {/* Top Dark Navy Header */}
        <div className="bg-[#0B3A68] text-white p-2 rounded-xl text-center shadow-sm">
          <h4 className="text-xs font-black tracking-tight">Captures Visible Particles</h4>
          <p className="text-[8px] text-blue-200 font-medium">For rust, sediment, sand and dirt</p>
        </div>

        {/* Center: Particle Callouts + Product + Loupe */}
        <div className="relative flex-1 flex items-center justify-between px-1 my-1">
          {/* Left Particles Callout List */}
          <div className="space-y-1.5 z-10 shrink-0">
            {[
              { label: "Rust", color: "#B45309" },
              { label: "Sediment", color: "#4B5563" },
              { label: "Sand", color: "#D97706" },
              { label: "Dirt", color: "#78350F" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-[9px] font-bold text-slate-700">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Center Product Image with downward water flow arrow */}
          <div className="relative flex-1 h-36 flex items-center justify-center">
            <img
              src={productImage}
              alt={productName}
              className="max-h-full max-w-full object-contain drop-shadow-md"
            />
          </div>

          {/* Right Circular Texture Loupe */}
          <div className="relative w-16 h-16 rounded-full border-2 border-cyan-500 shadow-md overflow-hidden bg-white shrink-0">
            <img
              src={productImage}
              alt="Texture Loupe"
              className="w-full h-full object-cover scale-150"
            />
            <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-[8px] font-bold text-slate-500 bg-white py-1 rounded-lg border border-slate-200/60 shadow-xs">
          High-Density Micro-Fiber Surface Filtration
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 5: Adjusts For A Secure Fit (Guide with Fastener Arrows & Inset)
  // =========================================================================
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-3 flex flex-col justify-between select-none overflow-hidden text-slate-800">
        <div className="flex items-start justify-between">
          <div className="max-w-[65%]">
            <h4 className="text-xs font-black text-[#0B3A68] leading-tight">
              Adjusts For A Secure Fit
            </h4>
            <p className="text-[8px] text-slate-500 mt-0.5">
              Tighten on a correctly sized round tap
            </p>
          </div>

          {/* Tap icon badge */}
          <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700">
            <Droplets className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Center Product with adjustment arrows and inset badge */}
        <div className="relative flex-1 flex items-center justify-center my-1">
          <img
            src={productImage}
            alt={productName}
            className="max-h-36 max-w-[70%] object-contain drop-shadow-lg"
          />

          {/* Inset In-Use Photo Badge */}
          <div className="absolute bottom-0 right-1 w-14 h-14 rounded-xl border border-white shadow-lg overflow-hidden bg-white">
            <img
              src="/samples/media_1791548490197.jpg"
              alt="Installed Inset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Warning Note */}
        <div className="bg-white rounded-xl p-1.5 flex items-center justify-between text-[8px] font-semibold text-slate-600 px-3 shadow-xs border border-slate-200">
          <span>Universal Fastening Strap</span>
          <span className="text-amber-700 font-bold flex items-center gap-0.5">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
            <span>Do not overtighten</span>
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 6: Replace When Darkened / Before & After Guide
  // =========================================================================
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-[#F4F4F6] p-3 flex flex-col justify-between select-none overflow-hidden text-slate-800">
        {/* Top Comparison Pill */}
        <div className="self-center bg-white px-3 py-1 rounded-full text-[9px] font-extrabold text-slate-700 shadow-xs border border-slate-200">
          Before use → Replace
        </div>

        {/* Split Comparison Visual */}
        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Before: Clean */}
          <div className="bg-[#FAF9F5] p-2 rounded-xl flex flex-col items-center justify-center h-28 border border-slate-200 shadow-xs">
            <img
              src={productImage}
              alt="Clean Filter"
              className="max-h-full max-w-full object-contain"
            />
            <span className="text-[8px] font-bold text-emerald-700 mt-1">Clean Filter</span>
          </div>

          {/* After: Replace When Darkened */}
          <div className="bg-[#EAEAEA] p-2 rounded-xl flex flex-col items-center justify-center h-28 border border-slate-300 shadow-xs relative">
            <img
              src={productImage}
              alt="Darkened Filter"
              className="max-h-full max-w-full object-contain filter brightness-75 contrast-125 grayscale-[60%]"
            />
            <span className="text-[8px] font-bold text-amber-800 mt-1">Replace</span>
          </div>
        </div>

        {/* Bottom Dark Blue Banner */}
        <div className="bg-[#0B3A68] text-white p-2 rounded-xl text-center shadow-md">
          <h5 className="text-[11px] font-black">Replace When Darkened</h5>
          <p className="text-[8px] text-blue-200 mt-0.5">
            Also replace if damaged, clogged or restricted
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 7: 10x Extreme Macro Close-Up with HUD Crosshairs
  // =========================================================================
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-[#0E0F1A] flex flex-col justify-between p-3 select-none overflow-hidden text-white">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-wider text-cyan-400 uppercase">
            10x Precision Macro Detail
          </span>
          <span className="text-[8px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
            Optical Zoom
          </span>
        </div>

        {/* Extreme macro zoom with circular HUD overlay */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2">
          <img
            src={productImage}
            alt={productName}
            className="scale-160 max-h-[90%] max-w-[90%] object-contain filter contrast-110 drop-shadow-2xl"
          />
          {/* Circular HUD overlay ring */}
          <div className="absolute w-44 h-44 rounded-full border-2 border-cyan-400/40 pointer-events-none flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <div className="absolute top-1 text-[7px] text-cyan-300 font-mono">FOCAL POINT</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-1.5 text-center text-[8px] text-slate-300 font-medium">
          Zero-Defect Micro-Pores & Reinforced Seams
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 8: Multi-Location Home Compatibility (4-Quadrant Grid)
  // =========================================================================
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-[#111224] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <h4 className="text-[11px] font-extrabold tracking-wide uppercase text-indigo-300">
            Multi-Location Compatibility
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto">
          {[
            { label: "Kitchen Sink", icon: "🍳" },
            { label: "Bathroom Vanity", icon: "🛁" },
            { label: "Laundry Basin", icon: "🧺" },
            { label: "RV & Travel", icon: "🚐" },
          ].map((loc, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center h-20 text-center"
            >
              <span className="text-lg mb-1">{loc.icon}</span>
              <span className="text-[9px] font-bold text-slate-200">{loc.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-indigo-900/50 rounded-xl p-1.5 text-center text-[8px] text-indigo-200 font-semibold border border-indigo-500/30">
          Fits 99% of Standard Round Faucets
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 9: Technical Blueprint & Return-Reducer Dimensions
  // =========================================================================
  if (shotIndex === 9) {
    return (
      <div className="relative w-full h-full bg-[#0C1222] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
          <span className="text-[10px] font-extrabold text-cyan-400 font-mono">
            DIMENSION BLUEPRINT
          </span>
          <Ruler className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Blueprint grid with measurement lines */}
        <div className="relative flex-1 flex items-center justify-center my-2 bg-grid-pattern">
          {/* Vertical dimension line */}
          <div className="absolute left-4 inset-y-6 border-l-2 border-dashed border-cyan-400/60 flex items-center">
            <span className="text-[8px] font-mono text-cyan-300 bg-[#0C1222] px-1 -ml-3 transform -rotate-90">
              11.5 cm
            </span>
          </div>

          <img
            src={productImage}
            alt={productName}
            className="max-h-32 max-w-[65%] object-contain drop-shadow-xl"
          />

          {/* Horizontal dimension line */}
          <div className="absolute bottom-2 inset-x-8 border-b-2 border-dashed border-cyan-400/60 flex justify-center">
            <span className="text-[8px] font-mono text-cyan-300 bg-[#0C1222] px-1 -mt-2">
              6.5 cm
            </span>
          </div>
        </div>

        <div className="bg-cyan-950/60 border border-cyan-500/30 rounded-xl p-1.5 text-center text-[8px] text-cyan-200 font-mono">
          Universal Round Spout Compatible (15mm - 25mm)
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 10: Head-to-Head Comparison Matrix (Our Brand vs Generic)
  // =========================================================================
  if (shotIndex === 10) {
    return (
      <div className="relative w-full h-full bg-[#0A0B14] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
            Verified Performance Superiority
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Our Brand */}
          <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-2 flex flex-col items-center justify-center h-36">
            <span className="text-[9px] font-extrabold text-emerald-400 mb-1">Our Product</span>
            <img
              src={productImage}
              alt="Our Product"
              className="max-h-16 max-w-full object-contain mb-1.5"
            />
            <div className="text-[8px] font-bold text-emerald-300 space-y-0.5 text-center">
              <div>✓ High Density Micro-Mesh</div>
              <div>✓ Secure Tool-Free Lock</div>
              <div>✓ Zero Water Bypass</div>
            </div>
          </div>

          {/* Generic Competitor */}
          <div className="bg-slate-900/60 border border-rose-500/30 rounded-xl p-2 flex flex-col items-center justify-center h-36 opacity-75">
            <span className="text-[9px] font-extrabold text-rose-400 mb-1">Generic Other</span>
            <div className="h-16 flex items-center justify-center text-slate-500 text-xs">
              ⚠️ Generic
            </div>
            <div className="text-[8px] text-slate-400 space-y-0.5 text-center">
              <div>✕ Leaks & Slips Off</div>
              <div>✕ Weak Filtration</div>
              <div>✕ Tears Under Pressure</div>
            </div>
          </div>
        </div>

        <div className="text-center text-[8px] text-emerald-400 font-mono">
          +48% Longer Lifespan vs Unbranded Alternatives
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 11: True Human Hand Scale & Ergonomics
  // =========================================================================
  if (shotIndex === 11) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#1C1A2E] to-[#0D0B17] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <span className="text-[10px] font-extrabold uppercase text-purple-300 tracking-wider">
            Compact & Ergonomic Scale
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* Human hand silhouette simulation glow */}
          <div className="absolute w-44 h-44 rounded-full bg-purple-500/15 blur-2xl pointer-events-none" />
          <img
            src={productImage}
            alt={productName}
            className="max-h-36 max-w-[70%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
          />
          <div className="w-44 h-3.5 -mt-2 bg-black/60 rounded-[100%] blur-md" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-1.5 text-center text-[8px] text-slate-300 font-medium">
          Lightweight & Travel-Friendly • Fits Any Luggage
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 12: Premium Unboxing & Retail Package Arrangement
  // =========================================================================
  if (shotIndex === 12) {
    return (
      <div className="relative w-full h-full bg-[#0D0E1C] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider">
            What's In The Box
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt={productName}
            className="max-h-32 max-w-[65%] object-contain drop-shadow-2xl z-10"
          />
          {/* Packaging Box Simulation */}
          <div className="absolute bottom-2 inset-x-6 h-12 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-md flex items-center justify-around px-3 text-[8px] text-slate-300 font-bold">
            <span>📦 Retail Box</span>
            <span>📄 User Guide</span>
            <span>🔒 Fastener Band</span>
          </div>
        </div>

        <div className="text-center text-[8px] text-slate-400 font-mono">
          Ready to Gift • Eco-Friendly Packaging
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 13: Luxury Architectural Marble Pedestal Display
  // =========================================================================
  if (shotIndex === 13) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#131422] to-[#07080F] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
            Premium Architectural Craftsmanship
          </span>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center my-1">
          <div className="absolute w-56 h-56 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <img
            src={productImage}
            alt={productName}
            className="max-h-32 max-w-[70%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] z-10"
          />
          {/* Circular stone pedestal */}
          <div className="w-52 h-8 -mt-2 rounded-[100%] bg-gradient-to-r from-indigo-500/30 via-violet-400/25 to-pink-500/30 border border-white/20 shadow-xl backdrop-blur-md" />
          <div className="w-44 h-2 -mt-1 rounded-[100%] bg-black/70 blur-sm" />
        </div>

        <div className="text-center text-[8px] text-slate-400">
          Engineered for Longevity & Flawless Aesthetics
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 14: Dual 360° Perspective (Front + 45° Side-by-Side)
  // =========================================================================
  if (shotIndex === 14) {
    return (
      <div className="relative w-full h-full bg-[#0A0C1A] p-3 flex flex-col justify-between select-none overflow-hidden text-white">
        <div className="text-center">
          <span className="text-[10px] font-extrabold uppercase text-cyan-400 tracking-wider">
            360° Complete Angle Perspective
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto items-center justify-items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[8px] font-bold text-slate-400 mb-1">Front View</span>
            <img
              src={productImage}
              alt="Front"
              className="max-h-24 max-w-full object-contain drop-shadow-md"
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <span className="text-[8px] font-bold text-slate-400 mb-1">45° Profile</span>
            <img
              src={productImage}
              alt="Profile"
              className="max-h-24 max-w-full object-contain drop-shadow-md transform rotate-6"
            />
          </div>
        </div>

        <div className="text-center text-[8px] text-cyan-300 font-mono">
          Dual View Quality Verification
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 15: 100% Satisfaction & Safety Shield (Risk Reversal Guarantee)
  // =========================================================================
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1C1208] via-[#24170B] to-[#120A04] p-4 flex flex-col justify-between select-none overflow-hidden text-white">
      <div className="text-center z-10">
        <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest block">
          100% SATISFACTION GUARANTEE
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-1">
        <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
        <img
          src={productImage}
          alt={productName}
          className="max-h-32 max-w-[68%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] relative z-10"
        />
      </div>

      <div className="z-10 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-2 rounded-xl shadow-lg border border-amber-300/30">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>30-Day Money-Back Guarantee</span>
        </div>
        <div className="text-[8px] text-amber-100 mt-0.5">
          Dedicated 24/7 Amazon Customer Support
        </div>
      </div>
    </div>
  );
};
