"use client";

import React, { useState, useEffect } from "react";
import {
  MousePointer2,
  Type,
  Square,
  Sparkles,
  Layers as LayersIcon,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  Move,
  Eye,
  Lock,
} from "lucide-react";

export const EditorDemo: React.FC = () => {
  const [headlineText, setHeadlineText] = useState("ULTRA ACTIVE NOISE CANCELLATION");
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [badgePos, setBadgePos] = useState({ x: 30, y: 70 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev % 3) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0E0E1A]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
            No Static Flattener
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Live Canva-Style Layer Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Every product cutout, headline, dimension arrow, and badge remains an independent editable layer. Click, drag, retype, and recolor with zero Photoshop skills.
          </p>
        </div>

        {/* Editor Mockup Window */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#121223] border border-white/15 shadow-2xl overflow-hidden shadow-brand-violet/10">
          {/* Top Window Bar */}
          <div className="bg-[#0B0B14] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-3 text-xs text-slate-400 font-mono">
                Listone Canvas • Shot_05_Infographic.canvas
              </span>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 text-slate-300 text-xs">
                <Undo2 className="w-3.5 h-3.5 mr-1" />
                <Redo2 className="w-3.5 h-3.5" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold rounded-lg shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>Export 2000px</span>
              </button>
            </div>
          </div>

          {/* Sub Toolbar */}
          <div className="bg-[#18182E] px-4 py-2 border-b border-white/10 flex items-center gap-4 text-xs text-slate-300 overflow-x-auto">
            <span className="font-semibold text-white">Font:</span>
            <span className="bg-white/5 px-2 py-1 rounded border border-white/10 text-white font-mono">
              Plus Jakarta Sans
            </span>
            <span className="bg-white/5 px-2 py-1 rounded border border-white/10 text-white font-mono">
              36px
            </span>
            <span className="w-5 h-5 rounded bg-brand-pink inline-block border border-white/30" />
            <span className="text-slate-400">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              ✓ Autosaved (2s ago)
            </span>
          </div>

          {/* Editor Workspace: Left Tools | Center Canvas | Right Layers */}
          <div className="grid grid-cols-12 min-h-[460px]">
            {/* Left Tools Bar (Col 1 or 2) */}
            <div className="col-span-2 sm:col-span-1 bg-[#0F0F1D] border-r border-white/10 flex flex-col items-center py-4 gap-5 text-slate-400">
              <button className="p-2 rounded-xl bg-brand-violet/20 text-brand-pink">
                <Move className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Type className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Square className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {/* Center Canvas Area (Col 7 or 8) */}
            <div className="col-span-10 sm:col-span-8 bg-[#0B0B14] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden bg-grid-pattern">
              {/* Virtual Artboard (Square Amazon 2000x2000 scale) */}
              <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-[#16162D] rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between p-6">
                {/* Background Ambient Radial */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#121226] via-[#1F1735] to-[#2E1842] pointer-events-none" />

                {/* Layer 1: Editable Headline Text */}
                <div
                  className={`relative z-10 transition-all duration-300 p-2 rounded-lg cursor-text ${
                    activeLayer === 1
                      ? "ring-2 ring-brand-pink bg-brand-pink/10 shadow-lg"
                      : "hover:bg-white/5"
                  }`}
                  onClick={() => setActiveLayer(1)}
                >
                  <div className="text-[10px] uppercase font-bold tracking-widest text-brand-pink">
                    FEATURE HIGHLIGHT
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold font-heading text-white leading-tight">
                    {headlineText}
                  </h4>
                  {activeLayer === 1 && (
                    <div className="absolute -top-3 -right-2 bg-brand-pink text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                      Text Layer
                    </div>
                  )}
                </div>

                {/* Layer 2: Product Cutout with real pixels */}
                <div
                  className={`relative z-20 mx-auto my-auto transition-all duration-300 p-4 rounded-xl cursor-grab ${
                    activeLayer === 2
                      ? "ring-2 ring-brand-indigo bg-brand-indigo/10 scale-105"
                      : "hover:scale-102"
                  }`}
                  onClick={() => setActiveLayer(2)}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-brand-indigo to-brand-violet p-1 shadow-2xl flex items-center justify-center">
                    <div className="w-full h-full bg-[#0B0B14] rounded-xl flex items-center justify-center text-4xl sm:text-5xl">
                      🎧
                    </div>
                  </div>
                  {activeLayer === 2 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-indigo text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                      Product Layer (Locked Pixels)
                    </div>
                  )}
                </div>

                {/* Layer 3: Feature Callout Badge */}
                <div
                  className={`relative z-30 transition-all duration-500 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 self-start cursor-pointer ${
                    activeLayer === 3
                      ? "ring-2 ring-emerald-400 bg-emerald-500/20 translate-x-2"
                      : "hover:bg-white/15"
                  }`}
                  onClick={() => setActiveLayer(3)}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-white">40h Long Battery Life</span>
                  {activeLayer === 3 && (
                    <div className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                      Badge Object
                    </div>
                  )}
                </div>

                {/* Simulated Mouse Cursor Animation */}
                <div
                  className="absolute pointer-events-none transition-all duration-700 z-50 text-brand-pink"
                  style={{
                    top: activeLayer === 1 ? "18%" : activeLayer === 2 ? "50%" : "82%",
                    left: activeLayer === 1 ? "60%" : activeLayer === 2 ? "55%" : "35%",
                  }}
                >
                  <MousePointer2 className="w-5 h-5 fill-brand-pink drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Right Layers Inspector (Col 3) */}
            <div className="hidden sm:flex col-span-3 bg-[#0F0F1D] border-l border-white/10 p-4 flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <LayersIcon className="w-4 h-4 text-brand-pink" />
                    <span>Layers Stack</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">3 Layers</span>
                </div>

                <div className="space-y-2">
                  <div
                    onClick={() => setActiveLayer(1)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      activeLayer === 1
                        ? "bg-brand-pink/15 border-brand-pink text-white font-bold"
                        : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5 text-brand-pink" />
                      <span>Headline Text</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveLayer(2)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      activeLayer === 2
                        ? "bg-brand-indigo/15 border-brand-indigo text-white font-bold"
                        : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayersIcon className="w-3.5 h-3.5 text-brand-indigo" />
                      <span>Product Cutout</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveLayer(3)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      activeLayer === 3
                        ? "bg-emerald-500/15 border-emerald-400 text-white font-bold"
                        : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Battery Badge</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-[11px] text-slate-400 border border-white/5">
                💡 <span className="text-slate-300 font-semibold">Pro tip:</span> Click any layer in the list to inspect or modify on the canvas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
