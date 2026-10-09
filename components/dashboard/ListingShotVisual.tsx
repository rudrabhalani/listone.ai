"use client";

import React from "react";

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
  // SHOT 1: Amazon Main Hero (Pure White RGB 255, 85% Frame, Contact Shadow - Amazon Compliant)
  if (shotIndex === 1) {
    return (
      <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[84%] max-w-[84%] object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-5 w-52 h-4 bg-black/15 rounded-[100%] blur-md pointer-events-none" />
      </div>
    );
  }

  // SHOT 2: Where To Use: Modern Minimalist Desk / Workspace Setting
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#26211C] via-[#1E1915] to-[#120F0D] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        {/* Soft morning window light aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
          />
          {/* Surface contact shadow simulating oak/walnut desk */}
          <div className="w-56 h-4 -mt-2 bg-black/60 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 3: Where To Use: Contemporary Living Space / Home Interior
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#161324] via-[#221C38] to-[#120E1F] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        {/* Warm ambient interior glow */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-52 h-3.5 -mt-2 bg-black/55 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 4: How It Works: Dynamic 45° Elevated Studio Angle
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0F1123] via-[#161833] to-[#0A0B16] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        {/* Dual studio softbox rim glow */}
        <div className="absolute top-6 left-6 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.7)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300"
          />
          <div className="w-50 h-3.5 -mt-2 bg-black/55 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 5: How It Works: 10x Macro Close-Up Texture & Craftsmanship
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#131122] to-[#090812] flex items-center justify-center p-4 select-none overflow-hidden">
        {/* Macro ambient lens highlight */}
        <div className="absolute inset-0 bg-radial from-brand-violet/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={productImage}
            alt={productName}
            className="scale-150 max-h-[92%] max-w-[92%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-105 group-hover:scale-160 transition-transform duration-300"
          />
        </div>
      </div>
    );
  }

  // SHOT 6: How To Use / Human Scale & Ergonomics
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#181628] via-[#211E34] to-[#0E0D18] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-violet-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_22px_26px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-48 h-3.5 -mt-2 bg-black/50 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 7: Premium Architectural Stone / Pedestal Showcase
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0B0C16] via-[#141528] to-[#07080F] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="absolute top-1/4 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle architectural pedestal base */}
          <div className="w-56 h-9 -mt-3 rounded-[100%] bg-gradient-to-r from-indigo-500/25 via-violet-400/20 to-pink-500/25 border border-white/10 shadow-[0_10px_25px_rgba(124,58,237,0.2)] backdrop-blur-md" />
          <div className="w-48 h-2.5 -mt-1 rounded-[100%] bg-black/60 blur-sm" />
        </div>
      </div>
    );
  }

  // SHOT 8: How It Works: 90° Overhead Flat Lay View
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-[#14141E] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        {/* Soft diffused omnidirectional lighting */}
        <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    );
  }

  // SHOT 9: Sleek Profile & Contour Silhouette
  if (shotIndex === 9) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#121122] via-[#1C1A35] to-[#0A0914] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)] transform rotate-6 group-hover:rotate-0 transition-transform duration-300"
          />
          <div className="w-48 h-3 -mt-2 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 10: Where To Use: Clean Architectural / Bright Marble Space
  if (shotIndex === 10) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#F3F4F8] via-[#E8EBF2] to-[#DDE1EC] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[78%] max-w-[78%] object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-52 h-3.5 -mt-2 bg-black/20 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 11: Where To Use: Outdoor Natural Sunlit Atmosphere
  if (shotIndex === 11) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#2D2114] via-[#3B2B1B] to-[#1B140B] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-52 h-4 -mt-2 bg-black/55 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 12: Unboxing & Presentation Layout
  if (shotIndex === 12) {
    return (
      <div className="relative w-full h-full bg-[#0C0D1B] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle presentation tier */}
          <div className="w-56 h-8 -mt-2 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/15 backdrop-blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 13: Floating Dimensional Perspective (Precision Depth)
  if (shotIndex === 13) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#141228] to-[#0A0915] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="w-48 h-3 -mt-1 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 14: Dual Perspective (Front & Angled Side-by-Side)
  if (shotIndex === 14) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#101222] via-[#181A32] to-[#090A14] flex items-center justify-center p-4 select-none overflow-hidden">
        <div className="grid grid-cols-2 gap-3 w-full h-full items-center justify-items-center">
          <div className="w-full h-full flex flex-col items-center justify-center p-2">
            <img
              src={productImage}
              alt="Front Perspective"
              className="max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.7)]"
            />
            <div className="w-28 h-2 -mt-1 bg-black/45 rounded-[100%] blur-sm" />
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center p-2">
            <img
              src={productImage}
              alt="3/4 Perspective"
              className="max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.7)] transform rotate-6"
            />
            <div className="w-28 h-2 -mt-1 bg-black/45 rounded-[100%] blur-sm" />
          </div>
        </div>
      </div>
    );
  }

  // SHOT 15: Cinematic Master Studio Showcase (Vibrant Ambient Halo)
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#140E24] via-[#201538] to-[#0A0713] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      <div className="absolute w-60 h-60 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <img
          src={productImage}
          alt={productName}
          className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
        />
        <div className="w-52 h-4 -mt-2 bg-black/55 rounded-[100%] blur-md" />
      </div>
    </div>
  );
};
