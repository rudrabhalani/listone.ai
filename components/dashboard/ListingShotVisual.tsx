"use client";

import React from "react";
import {
  Check,
  X,
  AlertTriangle,
  Droplets,
  ShieldCheck,
  ArrowRight,
  ZoomIn,
  Ruler,
  Package,
  Layers,
  Sparkles,
  Award,
  Clock,
  RotateCw,
  Sliders,
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
  // 1. AMAZON MAIN HERO (100% PURE WHITE RGB 255, 85% FRAME)
  if (shotIndex === 1) {
    return (
      <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-5 w-52 h-4 bg-black/10 rounded-[100%] blur-md pointer-events-none" />
        <div className="absolute bottom-2 right-3 text-[9px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
          RGB(255, 255, 255) COMPLIANT
        </div>
      </div>
    );
  }

  // 2. WHERE TO USE (IN-HOME AMBIENT SCENE WITH SOFT DAYLIGHT)
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-[#F4F6F9] overflow-hidden select-none flex flex-col items-center justify-center p-4">
        {/* Ambient interior background with soft window light */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-white to-amber-50/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-300/40 to-transparent pointer-events-none" />

        {/* Countertop surface */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <img
            src={productImage}
            alt="In-Home Ambient"
            className="max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
          />
          {/* Countertop surface shadow */}
          <div className="w-60 h-4 -mt-2 bg-black/15 rounded-[100%] blur-md" />
        </div>

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-extrabold font-mono text-blue-900 border border-blue-100 shadow-xs flex items-center gap-1 z-20">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>IN-HOME LIFESTYLE CONTEXT</span>
        </div>
      </div>
    );
  }

  // 3. HOW TO USE (VISUAL 3-STEP SETUP PROGRESSION)
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-[#FAF8F5] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
          <span className="text-[10px] font-black text-amber-950 font-mono tracking-wider">
            HOW TO USE • 3-STEP SETUP
          </span>
          <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Under 60s
          </span>
        </div>

        {/* 3 Step Panels */}
        <div className="grid grid-cols-3 gap-2 my-auto items-center">
          {/* Step 1 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black flex items-center justify-center self-start">
              1
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img src={productImage} alt="Step 1" className="max-h-full max-w-full object-contain" />
            </div>
            <span className="text-[8px] font-bold text-slate-600 uppercase">Unbox & Align</span>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black flex items-center justify-center self-start">
              2
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img src={productImage} alt="Step 2" className="max-h-full max-w-full object-contain transform rotate-6" />
            </div>
            <span className="text-[8px] font-bold text-slate-600 uppercase">Attach / Lock</span>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-xl p-1.5 border border-emerald-300 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center self-start">
              3
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1 relative">
              <img src={productImage} alt="Step 3" className="max-h-full max-w-full object-contain" />
              <div className="absolute bottom-1 w-8 h-8 bg-emerald-400/20 rounded-full blur-sm" />
            </div>
            <span className="text-[8px] font-black text-emerald-700 uppercase">Ready To Use</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-1">
          <span className="w-2.5 h-1.5 rounded-full bg-blue-600" />
          <span className="w-2.5 h-1.5 rounded-full bg-blue-600" />
          <span className="w-6 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  }

  // 4. CIRCULAR 10X OPTICAL TEXTURE LOUPE
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-[#F4F7FB] p-4 flex flex-col justify-between select-none overflow-hidden">
        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[80%] max-w-[75%] object-contain drop-shadow-md"
          />

          {/* High-Tech Circular Loupe */}
          <div className="absolute right-2 bottom-4 w-24 h-24 rounded-full border-3 border-blue-500 shadow-xl overflow-hidden bg-white shrink-0">
            <img
              src={productImage}
              alt="Texture Loupe"
              className="w-full h-full object-cover scale-200"
            />
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 rounded-full border border-blue-600/70" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-blue-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-blue-200">
          <ZoomIn className="w-3 h-3 text-blue-600" />
          <span className="text-[9px] font-extrabold font-mono">10x OPTICAL MACRO CRAFTSMANSHIP</span>
        </div>
      </div>
    );
  }

  // 5. ACCURATE SCALE & DIMENSIONAL BLUEPRINT
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-[#F2F5F9] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
          <span className="text-[10px] font-extrabold text-blue-900 font-mono tracking-wider">
            PRECISE DIMENSIONS & SCALE
          </span>
          <Ruler className="w-3.5 h-3.5 text-blue-600" />
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* Vertical axis */}
          <div className="absolute left-4 inset-y-4 border-l-2 border-dashed border-blue-400 flex items-center">
            <span className="text-[8px] font-mono font-bold text-blue-700 bg-[#F2F5F9] px-1 -ml-3 transform -rotate-90">
              12.8 cm
            </span>
          </div>

          <img
            src={productImage}
            alt={productName}
            className="max-h-36 max-w-[65%] object-contain drop-shadow-md"
          />

          {/* Horizontal axis */}
          <div className="absolute bottom-1 inset-x-8 border-b-2 border-dashed border-blue-400 flex justify-center">
            <span className="text-[8px] font-mono font-bold text-blue-700 bg-[#F2F5F9] px-1 -mt-2">
              7.5 cm
            </span>
          </div>
        </div>

        <div className="text-center text-[9px] font-mono text-blue-700 font-bold">
          Universal Standard Fit • Compact Ergonomic Profile
        </div>
      </div>
    );
  }

  // 6. WHAT'S IN THE BOX (COMPLETE RETAIL UNBOXING)
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
          <span className="text-[10px] font-black text-amber-950 font-mono tracking-wider">
            WHAT&apos;S IN THE BOX • COMPLETE SET
          </span>
          <Package className="w-3.5 h-3.5 text-amber-700" />
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto items-end">
          {/* Main Item */}
          <div className="col-span-2 bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col items-center justify-center h-44">
            <img src={productImage} alt="Main Unit" className="max-h-32 max-w-full object-contain drop-shadow-md" />
            <span className="text-[9px] font-black text-slate-800 mt-2">1x Main Product Unit</span>
          </div>

          {/* Included Accessories */}
          <div className="flex flex-col gap-2">
            <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xs flex flex-col items-center justify-center h-20">
              <span className="text-[16px]">📦</span>
              <span className="text-[8px] font-bold text-slate-600 mt-1">Retail Box</span>
            </div>
            <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xs flex flex-col items-center justify-center h-20">
              <span className="text-[16px]">📑</span>
              <span className="text-[8px] font-bold text-slate-600 mt-1">User Manual</span>
            </div>
          </div>
        </div>

        <div className="text-center text-[8px] font-mono text-slate-500">
          Everything Included • Ready To Use Out Of The Box
        </div>
      </div>
    );
  }

  // 7. DYNAMIC 45° ANGLE STUDIO SHOWCASE
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-[#F8F9FA] p-4 flex flex-col items-center justify-center select-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)] z-10 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Architectural stone pedestal */}
          <div className="w-56 h-8 -mt-2 rounded-[100%] bg-gradient-to-r from-slate-200 via-white to-slate-200 border border-slate-300 shadow-md" />
          <div className="w-48 h-2 -mt-1 rounded-[100%] bg-black/10 blur-sm" />
        </div>

        <div className="absolute bottom-2.5 flex items-center gap-1 text-[8px] text-slate-500 font-mono">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>45° DYNAMIC CONTOUR DISPLAY</span>
        </div>
      </div>
    );
  }

  // 8. HEAD-TO-HEAD COMPARISON MATRIX (OUR BRAND VS GENERIC)
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-[#F8FAFC] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-[10px] font-black text-slate-900 font-mono tracking-wider">
            OUR BRAND VS GENERIC ALTERNATIVES
          </span>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            Top Rated
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Our Brand */}
          <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-2.5 flex flex-col items-center justify-center h-40 shadow-xs relative">
            <span className="absolute top-2 left-2.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <img src={productImage} alt="Our Product" className="max-h-24 max-w-full object-contain mb-1" />
            <span className="text-[9px] font-black text-emerald-800">Premium Build</span>
            <span className="text-[7.5px] text-emerald-600">Zero Leaks • 2-Yr Warranty</span>
          </div>

          {/* Generic */}
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-2.5 flex flex-col items-center justify-center h-40 opacity-70 relative">
            <span className="absolute top-2 left-2.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
              <X className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <div className="h-24 flex items-center justify-center text-slate-400 text-2xl font-bold">
              ⚠️
            </div>
            <span className="text-[9px] font-bold text-rose-800">Generic Knockoff</span>
            <span className="text-[7.5px] text-slate-500">Flimsy • Frequent Failures</span>
          </div>
        </div>

        <div className="text-center text-[8px] font-mono font-bold text-emerald-700 py-1">
          ✓ Verified Commercial Quality Standards
        </div>
      </div>
    );
  }

  // 9. ERGONOMIC HUMAN GRIP & HANDHELD USE
  if (shotIndex === 9) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-4 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
          <span className="text-[10px] font-black text-amber-950 font-mono tracking-wider">
            ERGONOMIC HUMAN-SCALE FIT
          </span>
          <span className="text-[8.5px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Comfort Grip
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt="Ergonomic Scale"
            className="max-h-[80%] max-w-[75%] object-contain drop-shadow-xl transform -rotate-3"
          />
          <div className="absolute bottom-2 left-4 w-12 h-12 rounded-full border-2 border-amber-400/60 bg-amber-50/80 flex items-center justify-center">
            <span className="text-[14px]">✋</span>
          </div>
        </div>

        <div className="text-center text-[9px] font-mono text-amber-900 font-bold">
          Non-Slip Tactile Surface • Engineered For Daily Hands-On Comfort
        </div>
      </div>
    );
  }

  // 10. BEFORE & AFTER (PROBLEM SOLVED)
  if (shotIndex === 10) {
    return (
      <div className="relative w-full h-full bg-[#F6F6F8] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-[10px] font-black text-slate-900 font-mono tracking-wider">
            BEFORE & AFTER • PROBLEM RESOLVED
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Before */}
          <div className="bg-[#EFEFF3] p-2.5 rounded-2xl flex flex-col items-center justify-center h-36 border border-slate-300 relative">
            <span className="text-[9px] font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full mb-1">
              BEFORE
            </span>
            <div className="text-2xl my-2">❌</div>
            <span className="text-[8px] font-bold text-slate-500 text-center">Cluttered & Inefficient</span>
          </div>

          {/* After */}
          <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center h-36 border-2 border-emerald-400 shadow-xs relative">
            <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
              AFTER
            </span>
            <img src={productImage} alt="After" className="max-h-16 max-w-full object-contain my-1" />
            <span className="text-[8px] font-black text-emerald-800 text-center">Clean, Fast & Effortless</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-1">
          <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[8px] font-mono font-bold text-blue-700">Immediate Quality Upgrade</span>
        </div>
      </div>
    );
  }

  // 11. MULTI-ANGLE PROFILE & 360° ARCHITECTURE
  if (shotIndex === 11) {
    return (
      <div className="relative w-full h-full bg-[#F5F7FA] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-blue-200/60 pb-1.5">
          <span className="text-[10px] font-black text-blue-950 font-mono tracking-wider">
            360° PRECISION ARCHITECTURE
          </span>
          <RotateCw className="w-3.5 h-3.5 text-blue-600" />
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[78%] max-w-[78%] object-contain drop-shadow-lg"
          />
          {/* Circular 360 angle arrow indicator */}
          <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-full m-6 pointer-events-none" />
        </div>

        <div className="text-center text-[9px] font-mono text-blue-800 font-bold">
          Seamless Seams • Industrial Grade Reinforced Joints
        </div>
      </div>
    );
  }

  // 12. DURABILITY & EXTREME QUALITY TESTING
  if (shotIndex === 12) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-amber-200 pb-1.5">
          <span className="text-[10px] font-black text-amber-950 font-mono tracking-wider">
            EXTREME DURABILITY LAB TESTED
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-xl"
          />
          <div className="absolute top-2 right-4 bg-emerald-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-md">
            ✓ 10,000+ CYCLES PASS
          </div>
        </div>

        <div className="text-center text-[9px] font-mono text-amber-900 font-bold">
          Drop Resistant • Thermal Shock Tested • Enduring Reliability
        </div>
      </div>
    );
  }

  // 13. TRIPLE TRUST & QUALITY CERTIFICATION SEALS
  if (shotIndex === 13) {
    return (
      <div className="relative w-full h-full bg-[#F8FAFC] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-[10px] font-black text-slate-900 font-mono tracking-wider">
            OFFICIAL QUALITY & SAFETY CERTIFIED
          </span>
          <Award className="w-3.5 h-3.5 text-blue-600" />
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-1.5 py-1 text-center">
          <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <span className="text-[8px] font-black text-blue-800 block">100% INSPECTED</span>
          </div>
          <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <span className="text-[8px] font-black text-emerald-700 block">NON-TOXIC</span>
          </div>
          <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <span className="text-[8px] font-black text-indigo-700 block">ISO COMPLIANT</span>
          </div>
        </div>
      </div>
    );
  }

  // 14. CORE COMMERCIAL BENEFITS BANNER
  if (shotIndex === 14) {
    return (
      <div className="relative w-full h-full bg-[#F4F6F9] p-3 flex flex-col justify-between select-none overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center py-2 px-3 rounded-xl shadow-md">
          <span className="text-[10px] font-black tracking-wide block uppercase">
            Engineered For Peak Performance
          </span>
          <span className="text-[8px] text-blue-100 block">Maximum Utility & Daily Convenience</span>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-2">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[80%] max-w-[80%] object-contain drop-shadow-lg"
          />
        </div>

        <div className="text-center text-[9px] font-mono text-blue-900 font-extrabold">
          ⭐ Top-Tier Customer Satisfaction Rated
        </div>
      </div>
    );
  }

  // 15. 30-DAY MONEY-BACK GUARANTEE & SHIELD
  return (
    <div className="relative w-full h-full bg-[#FAF9F5] p-4 flex flex-col items-center justify-between select-none overflow-hidden">
      <div className="w-full flex items-center justify-between border-b border-amber-200/60 pb-1.5">
        <span className="text-[10px] font-black text-amber-950 font-mono tracking-wider">
          RISK-FREE BUYER GUARANTEE
        </span>
        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
      </div>

      <div className="relative flex-1 flex items-center justify-center w-full my-2">
        <img
          src={productImage}
          alt={productName}
          className="max-h-[75%] max-w-[75%] object-contain drop-shadow-xl"
        />

        {/* Radiant Guarantee Badge Overlay */}
        <div className="absolute bottom-2 right-4 bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 px-3 py-1.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-950" />
          <div className="text-left">
            <span className="text-[9px] font-black block leading-none">30-DAY REFUND</span>
            <span className="text-[7px] font-bold block leading-none">100% Guaranteed</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[9px] font-mono text-amber-900 font-bold">
        Zero-Risk Purchase • Backed by 24/7 Priority Support
      </div>
    </div>
  );
};
