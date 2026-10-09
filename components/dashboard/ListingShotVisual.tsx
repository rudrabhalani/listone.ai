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
  // SHOT 1: Pure White Background (Amazon Compliance - 85% Frame, Zero Text)
  if (shotIndex === 1) {
    return (
      <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[84%] max-w-[84%] object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-5 w-48 h-3.5 bg-black/15 rounded-[100%] blur-md pointer-events-none" />
      </div>
    );
  }

  // SHOT 2: 45° Angle Studio Showcase (Illuminated Pedestal, Soft Spotlight - Zero Text)
  if (shotIndex === 2) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0b0c16] via-[#131427] to-[#080910] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute top-1/4 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)] transform -rotate-2 hover:rotate-0 transition-transform duration-300"
          />
          <div className="w-56 h-9 -mt-3 rounded-[100%] bg-gradient-to-r from-indigo-500/30 via-violet-400/25 to-pink-500/30 border border-white/15 shadow-[0_10px_25px_rgba(124,58,237,0.25)] backdrop-blur-md" />
          <div className="w-48 h-2.5 -mt-1 rounded-[100%] bg-black/60 blur-sm" />
        </div>
      </div>
    );
  }

  // SHOT 3: Macro Close-Up: Texture & Craftsmanship (Pure Visual Focus - Zero Text)
  if (shotIndex === 3) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#111022] to-[#080811] flex items-center justify-center p-4 overflow-hidden select-none">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={productImage}
            alt={productName}
            className="scale-150 max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter contrast-105"
          />
        </div>
      </div>
    );
  }

  // SHOT 4: How To Use It (Action In Use - Zero Text)
  if (shotIndex === 4) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#141226] via-[#1c1b36] to-[#0e0c1b] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute top-10 right-10 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.65)] transform hover:scale-105 transition-transform duration-300"
          />
          <div className="w-44 h-3.5 -mt-2 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 5: How It Works (Functional Demonstration - Zero Text)
  if (shotIndex === 5) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#0c0d19] via-[#16182f] to-[#0a0b14] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
          />
          <div className="w-48 h-3 -mt-2 bg-black/50 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 6: Where To Use It: Modern Desk / Workspace Setting (Zero Text)
  if (shotIndex === 6) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#241a14] via-[#33251c] to-[#18110c] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        {/* Soft natural sunlight beam */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.75)]"
          />
          <div className="w-52 h-4 -mt-2 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 7: Where To Use It: Contemporary Home Living Setting (Zero Text)
  if (shotIndex === 7) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#191a24] via-[#242735] to-[#12131b] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute top-1/3 left-1/3 w-56 h-56 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.65)]"
          />
          <div className="w-48 h-3.5 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 8: Where To Use It: Active Travel / On-The-Go Setting (Zero Text)
  if (shotIndex === 8) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#111624] via-[#182136] to-[#0c101b] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.7)]"
          />
          <div className="w-50 h-3.5 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 9: Human Hand / Scale Context (Visual Proportion - Zero Text)
  if (shotIndex === 9) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#131221] to-[#0a0a13] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_22px_26px_rgba(0,0,0,0.7)]"
          />
          <div className="w-44 h-3.5 -mt-2 bg-black/50 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 10: Side & Profile Perspective (Zero Text)
  if (shotIndex === 10) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#121122] via-[#1b1933] to-[#0b0a16] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)] transform rotate-6 hover:rotate-0 transition-transform duration-300"
          />
          <div className="w-48 h-3 -mt-2 bg-black/40 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 11: Unboxing & Packaging Layout (Zero Text)
  if (shotIndex === 11) {
    return (
      <div className="relative w-full h-full bg-[#0c0d1b] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.7)]"
          />
          {/* Packaging Box Simulation beneath/beside */}
          <div className="w-56 h-8 -mt-2 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/15 backdrop-blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 12: Editorial Stone / Marble Pedestal (Zero Text)
  if (shotIndex === 12) {
    return (
      <div className="relative w-full h-full bg-gradient-to-tr from-[#1a1c24] via-[#242835] to-[#12141c] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.7)]"
          />
          <div className="w-52 h-4 -mt-2 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 13: Top-Down / 3/4 Elevated Angle (Zero Text)
  if (shotIndex === 13) {
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-[#0f101f] to-[#070810] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.75)] transform hover:scale-105 transition-transform duration-300"
          />
          <div className="w-48 h-3 -mt-2 bg-black/50 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 14: Ready-To-Use Setup Station (Zero Text)
  if (shotIndex === 14) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#121124] via-[#1d1b38] to-[#0b0a17] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
        <div className="absolute top-1/4 right-1/4 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <img
            src={productImage}
            alt={productName}
            className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.7)]"
          />
          <div className="w-48 h-3 -mt-2 bg-black/45 rounded-[100%] blur-md" />
        </div>
      </div>
    );
  }

  // SHOT 15: Master Studio Key-Light Showcase (Zero Text)
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#160f24] via-[#221638] to-[#0c0816] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      <div className="absolute w-56 h-56 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <img
          src={productImage}
          alt={productName}
          className="max-h-[76%] max-w-[76%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.8)] relative z-10 transform hover:scale-105 transition-transform duration-300"
        />
        <div className="w-52 h-4 -mt-2 bg-black/55 rounded-[100%] blur-md" />
      </div>
    </div>
  );
};
