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
  // Light Background: Pure White #FFFFFF
  // =========================================================================
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
      </div>
    );
  }

  // =========================================================================
  // SHOT 2: In-Use Lifestyle Scene (Bright, Sunlit Modern Kitchen / Home)
  // Light Background: Bright daylight home environment
  // =========================================================================
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-[#F5F6F8] overflow-hidden select-none">
        <img
          src="/samples/media_1791548490183.jpg"
          alt="In-Use Lifestyle Scene"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Subtle light ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // =========================================================================
  // SHOT 3: Visual 3-Stage Setup Progression (1, 2, 3 Visual Sequence)
  // Light Background: Soft Light Cream #FAF8F5
  // =========================================================================
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-[#FAF8F5] p-3 flex flex-col justify-between select-none overflow-hidden">
        {/* 3 Step Panels with Visual Progression */}
        <div className="grid grid-cols-3 gap-1.5 my-auto items-center">
          {/* Step 1: Slide on */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black flex items-center justify-center self-start shadow-xs">
              1
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img
                src={productImage}
                alt="Step 1"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-600 rounded-full" />
            </div>
          </div>

          {/* Step 2: Thread / Adjust */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black flex items-center justify-center self-start shadow-xs">
              2
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1">
              <img
                src={productImage}
                alt="Step 2"
                className="max-h-full max-w-full object-contain transform rotate-6"
              />
            </div>
            <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-blue-600 rounded-full" />
            </div>
          </div>

          {/* Step 3: Fasten & Flow */}
          <div className="relative bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex flex-col items-center justify-between h-40">
            <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-black flex items-center justify-center self-start shadow-xs">
              3
            </span>
            <div className="flex-1 w-full flex items-center justify-center p-1 relative">
              <img
                src={productImage}
                alt="Step 3"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute bottom-1 w-6 h-6 bg-cyan-400/25 rounded-full blur-sm" />
            </div>
            <div className="w-full h-1 bg-emerald-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom subtle progress dots */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 4: Circular 10x Optical Texture Loupe
  // Light Background: Soft Light Grey-Blue #F4F7FB
  // =========================================================================
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-[#F4F7FB] p-4 flex flex-col justify-between select-none overflow-hidden">
        {/* Center Product with Circular Optical Loupe */}
        <div className="relative flex-1 flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[80%] max-w-[75%] object-contain drop-shadow-md"
          />

          {/* High-Tech Circular Magnifying Loupe Overlay */}
          <div className="absolute right-2 bottom-4 w-24 h-24 rounded-full border-3 border-blue-500 shadow-xl overflow-hidden bg-white shrink-0">
            <img
              src={productImage}
              alt="Texture Loupe"
              className="w-full h-full object-cover scale-200"
            />
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
            {/* Loupe Crosshair Focus Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full border border-blue-600/60" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-blue-800 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-blue-100">
          <ZoomIn className="w-3 h-3 text-blue-600" />
          <span className="text-[9px] font-extrabold font-mono">10x OPTICAL MACRO</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 5: Secure Fit & Universal Adjustment Guide
  // Light Background: Warm Light Cream #FAF9F5
  // =========================================================================
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-[#FAF9F5] p-3 flex flex-col justify-between select-none overflow-hidden">
        {/* Tap droplet indicator top right */}
        <div className="self-end w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shadow-xs">
          <Droplets className="w-4 h-4" />
        </div>

        {/* Center Product with adjustment arrows and inset badge */}
        <div className="relative flex-1 flex items-center justify-center my-1">
          <img
            src={productImage}
            alt={productName}
            className="max-h-40 max-w-[72%] object-contain drop-shadow-lg"
          />

          {/* Inset Installed Photo Badge */}
          <div className="absolute bottom-1 right-2 w-16 h-16 rounded-2xl border-2 border-white shadow-xl overflow-hidden bg-white">
            <img
              src="/samples/media_1791548490197.jpg"
              alt="Installed Inset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Directional adjustment indicator line */}
        <div className="flex items-center justify-center gap-1 py-1 text-blue-700">
          <span className="text-[9px] font-black font-mono tracking-wider">◀ ADJUSTABLE LOCK ▶</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 6: Before & After Replacement Indicator (Clean vs Saturated)
  // Light Background: Crisp Light Neutral #F6F6F8
  // =========================================================================
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-[#F6F6F8] p-3 flex flex-col justify-between select-none overflow-hidden">
        {/* Split Comparison Visual */}
        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Before: Clean */}
          <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center h-36 border border-slate-200 shadow-xs relative">
            <span className="absolute top-2 left-2.5 w-2 h-2 rounded-full bg-emerald-500" />
            <img
              src={productImage}
              alt="Clean"
              className="max-h-[80%] max-w-full object-contain"
            />
          </div>

          {/* After: Saturated / Replace */}
          <div className="bg-[#EDEDF0] p-2.5 rounded-2xl flex flex-col items-center justify-center h-36 border border-slate-300 shadow-xs relative">
            <span className="absolute top-2 left-2.5 w-2 h-2 rounded-full bg-amber-500" />
            <img
              src={productImage}
              alt="Replace"
              className="max-h-[80%] max-w-full object-contain filter brightness-75 contrast-125 grayscale-[65%]"
            />
          </div>
        </div>

        {/* Center Arrow connecting the two */}
        <div className="flex items-center justify-center gap-2 py-1">
          <span className="w-12 h-0.5 bg-blue-300 rounded-full" />
          <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          <span className="w-12 h-0.5 bg-blue-300 rounded-full" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 7: Dimensional Proportion Blueprint (Return Reducer)
  // Light Background: Architectural Blueprint Paper #F2F5F9
  // =========================================================================
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-[#F2F5F9] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
          <span className="text-[10px] font-extrabold text-blue-900 font-mono tracking-wider">
            SCALE & DIMENSIONS
          </span>
          <Ruler className="w-3.5 h-3.5 text-blue-600" />
        </div>

        {/* Blueprint grid with measurement lines */}
        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* Vertical dimension line */}
          <div className="absolute left-3 inset-y-4 border-l-2 border-dashed border-blue-400 flex items-center">
            <span className="text-[8px] font-mono font-bold text-blue-700 bg-[#F2F5F9] px-1 -ml-3 transform -rotate-90">
              11.5 cm
            </span>
          </div>

          <img
            src={productImage}
            alt={productName}
            className="max-h-36 max-w-[65%] object-contain drop-shadow-md"
          />

          {/* Horizontal dimension line */}
          <div className="absolute bottom-1 inset-x-8 border-b-2 border-dashed border-blue-400 flex justify-center">
            <span className="text-[8px] font-mono font-bold text-blue-700 bg-[#F2F5F9] px-1 -mt-2">
              6.5 cm
            </span>
          </div>
        </div>

        <div className="text-center text-[8px] font-mono text-blue-600">
          Standard Universal Fit
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 8: Head-to-Head Visual Comparison (Our Brand vs Generic)
  // Light Background: Soft Light Slate #F8FAFC
  // =========================================================================
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-[#F8FAFC] p-3 flex flex-col justify-between select-none overflow-hidden">
        <div className="grid grid-cols-2 gap-2 my-auto items-center">
          {/* Our Brand: Green Accent */}
          <div className="bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-2.5 flex flex-col items-center justify-center h-40 shadow-xs relative">
            <span className="absolute top-2 left-2.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <img
              src={productImage}
              alt="Our Product"
              className="max-h-24 max-w-full object-contain mb-1"
            />
            <span className="w-8 h-1 bg-emerald-400 rounded-full mt-1" />
          </div>

          {/* Generic Competitor: Red Flaw Accent */}
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-2.5 flex flex-col items-center justify-center h-40 opacity-70 relative">
            <span className="absolute top-2 left-2.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
              <X className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <div className="h-24 flex items-center justify-center text-slate-400 text-sm font-bold">
              ⚠️ Generic
            </div>
            <span className="w-8 h-1 bg-slate-300 rounded-full mt-1" />
          </div>
        </div>

        <div className="text-center text-[8px] font-mono font-bold text-emerald-700 py-1">
          ✓ Certified Heavy-Duty Build Quality
        </div>
      </div>
    );
  }

  // =========================================================================
  // SHOT 9: Studio White Marble Pedestal Showcase
  // Light Background: Pure White Marble #F8F9FA
  // =========================================================================
  return (
    <div className="relative w-full h-full bg-[#F8F9FA] p-4 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Soft directional morning window highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <img
          src={productImage}
          alt={productName}
          className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)] z-10 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Architectural stone pedestal base */}
        <div className="w-56 h-8 -mt-2 rounded-[100%] bg-gradient-to-r from-slate-200 via-white to-slate-200 border border-slate-300 shadow-md" />
        <div className="w-48 h-2 -mt-1 rounded-[100%] bg-black/10 blur-sm" />
      </div>

      <div className="absolute bottom-2.5 flex items-center gap-1 text-[8px] text-slate-500 font-mono">
        <ShieldCheck className="w-3 h-3 text-emerald-600" />
        <span>100% Quality Inspected</span>
      </div>
    </div>
  );
};
