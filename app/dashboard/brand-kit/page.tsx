"use client";

import React, { useState } from "react";
import { Palette, Sparkles, Check, Plus, Upload, Sliders } from "lucide-react";

export default function BrandKitPage() {
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [accentColor, setAccentColor] = useState("#EC4899");
  const [secondaryColor, setSecondaryColor] = useState("#7C3AED");
  const [brandFont, setBrandFont] = useState("Plus Jakarta Sans");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-xs font-semibold text-pink-300 mb-2">
          <Palette className="w-3.5 h-3.5" />
          <span>Brand Assets & Typography</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Brand Kit
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Lock in your brand colors, typography, and logos so every 15-shot generator and A+ module adheres to your visual identity.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Brand Kit settings saved successfully!</span>
        </div>
      )}

      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold font-heading text-white">
          Brand Color Palette
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B0B14] border border-white/10 space-y-2">
            <span className="text-xs text-slate-400 font-semibold block">Primary Brand Color</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-white font-bold uppercase">{primaryColor}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B14] border border-white/10 space-y-2">
            <span className="text-xs text-slate-400 font-semibold block">Accent Callout Color</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-white font-bold uppercase">{accentColor}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B14] border border-white/10 space-y-2">
            <span className="text-xs text-slate-400 font-semibold block">Secondary Gradient Color</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-white font-bold uppercase">{secondaryColor}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <h3 className="text-base font-bold font-heading text-white">
            Default Typography
          </h3>
          <select
            value={brandFont}
            onChange={(e) => setBrandFont(e.target.value)}
            className="w-full max-w-sm bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
          >
            <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Geometric)</option>
            <option value="Inter">Inter (Ultra Clean Neutral)</option>
            <option value="Roboto">Roboto (E-Commerce Standard)</option>
            <option value="Playfair Display">Playfair Display (Luxury Editorial)</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Save Brand Kit
          </button>
        </div>
      </div>
    </div>
  );
}
