"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  Zap,
} from "lucide-react";

export const Hero: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upload" | "asin">("upload");
  const [asinInput, setAsinInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleDemoSelect = (asin: string) => {
    router.push(`/dashboard/image-studio?asin=${asin}`);
  };

  const handleStartGeneration = () => {
    if (activeTab === "asin" && asinInput.trim()) {
      router.push(`/dashboard/image-studio?asin=${encodeURIComponent(asinInput.trim())}`);
    } else {
      router.push("/dashboard/image-studio");
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0B0B14]">
      {/* Aurora mesh background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-brand-indigo/25 via-brand-violet/20 to-brand-pink/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-cyan/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-brand-orange/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-xs font-semibold text-slate-200 hover:border-brand-violet/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-brand-pink animate-ping" />
            <span className="text-pink-300">New 2.0 Engine</span>
            <span className="text-slate-400">|</span>
            <span>Canva-style editable layers enabled</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Main Headline & Subhead */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-white">
            Turn one product photo into{" "}
            <span className="gradient-text block sm:inline">
              15 high-converting listing images
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Get listing photos, A+ content and optimized bullets in minutes. Edit everything like Canva.
          </p>
        </div>

        {/* Interactive Hero Upload Box with Animated Gradient Border */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="gradient-border-box p-1 shadow-2xl shadow-brand-violet/20">
            <div className="bg-[#12121F] rounded-[15px] p-6 sm:p-8">
              {/* Tabs Switcher */}
              <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === "upload"
                      ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photos (1-5)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("asin")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === "asin"
                      ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Paste ASIN / Product URL</span>
                </button>
              </div>

              {/* Tab 1: Upload Drop Area */}
              {activeTab === "upload" ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.[0]) {
                      setSelectedFileName(e.dataTransfer.files[0].name);
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                    isDragging
                      ? "border-brand-pink bg-brand-pink/5 scale-[1.01]"
                      : "border-white/15 hover:border-brand-violet/60 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                  onClick={() => {
                    const input = document.getElementById("hero-file-input");
                    input?.click();
                  }}
                >
                  <input
                    id="hero-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-indigo/20 to-brand-pink/20 border border-white/10 flex items-center justify-center text-brand-pink mb-4 shadow-inner">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-semibold text-white">
                    {selectedFileName ? (
                      <span className="text-emerald-400 flex items-center gap-1.5 justify-center">
                        <CheckCircle2 className="w-4 h-4" /> Ready: {selectedFileName}
                      </span>
                    ) : (
                      "Drop your product photo here, or browse files"
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-sm">
                    PNG, JPG, WEBP up to 25MB. Phone photos work great — our AI isolates the real product pixels.
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartGeneration();
                    }}
                    className="mt-6 w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:shadow-brand-violet/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Generate 15 Images Now</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Tab 2: ASIN / URL Input */
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={asinInput}
                      onChange={(e) => setAsinInput(e.target.value)}
                      placeholder="e.g. B09V3HN1KC or https://amazon.com/dp/..."
                      className="w-full bg-[#0B0B14] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet"
                    />
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Amazon SP-API & licensed data verified. Zero scraping policy.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartGeneration}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Fetch ASIN & Generate Listing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Quick Try Demo Chips */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">Or try with sample products:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoSelect("B08N5WRWNW")}
                    className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                  >
                    🎧 Headphones
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoSelect("B07XJ8C8F7")}
                    className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                  >
                    🧴 Vitamin C Serum
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoSelect("B081ZT4G47")}
                    className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                  >
                    🛏️ Memory Pillow
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Line */}
          <div className="mt-5 text-center flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink" />
              <span>Commercial license included</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-indigo" />
              <span>Amazon TOS Compliant</span>
            </span>
          </div>
        </div>

        {/* Floating Feature Teaser Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/20 flex items-center justify-center text-brand-indigo shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">15 Pack</p>
              <h5 className="text-sm font-bold text-white">Full Shot List in Minutes</h5>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/20 flex items-center justify-center text-brand-violet shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Editable</p>
              <h5 className="text-sm font-bold text-white">Canva-style Layers Engine</h5>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">A+ & SEO</p>
              <h5 className="text-sm font-bold text-white">Bullets & Search Terms</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
