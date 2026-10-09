"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Sliders,
  Sparkles,
  Smartphone,
  Monitor,
  Download,
  Copy,
  Check,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";

export default function APlusStudioPage() {
  const router = useRouter();
  const { activeProject, deductCredits } = useApp();

  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [productName, setProductName] = useState(activeProject?.name || "Aura Acoustics Studio Pro Wireless Headphones");
  const [brandName, setBrandName] = useState(activeProject?.brandName || "Aura Acoustics");
  const [category, setCategory] = useState("Electronics");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 7 A+ Modules State
  const [modules, setModules] = useState<any[]>([
    {
      id: "mod-1",
      type: "hero_banner",
      dimensions: "970x600",
      name: "Module 1: Hero Banner",
      headline: "IMMERSIVE ACOUSTIC FIDELITY & SILENCE",
      subheadline: "Custom 40mm graphene drivers paired with hybrid noise isolation for pure studio immersion.",
      altText: "Aura Acoustics Studio Pro shown in ambient studio setting",
    },
    {
      id: "mod-2",
      type: "brand_story",
      dimensions: "970x300",
      name: "Module 2: The Brand Story",
      headline: "Engineered For Creators Who Demand Flawless Sound",
      body: "At Aura Acoustics, we believe premium sound reproduction should be intuitive, durable, and accessible. Every curve and frequency curve is tested across thousands of listening sessions to deliver uncompromising balance.",
      altText: "Aura Acoustics acoustic testing lab and craftsmanship",
    },
    {
      id: "mod-3",
      type: "four_grid",
      name: "Module 3: 4-Card Feature Highlights",
      items: [
        {
          title: "Custom Graphene Diaphragm",
          desc: "Delivers deep resonant bass and sparkling high frequencies without harmonic distortion.",
          emoji: "🔊",
        },
        {
          title: "Dual Hybrid ANC",
          desc: "Monitors and counteracts up to 98% of ambient engine and chatter frequencies.",
          emoji: "🎙️",
        },
        {
          title: "Pressure-Free Fit",
          desc: "Ultra-plush protein leather and memory foam gently envelop ears without fatigue.",
          emoji: "☁️",
        },
        {
          title: "40-Hour Battery Reserve",
          desc: "Powers through entire work weeks, with a 10-minute fast charge giving 4 hours playtime.",
          emoji: "⚡",
        },
      ],
    },
    {
      id: "mod-4",
      type: "comparison_chart",
      name: "Module 4: Comparison Matrix",
      headers: ["Specification", "Aura Studio Pro", "Standard Model", "Budget Lite"],
      rows: [
        { feature: "Active Noise Cancellation", val1: "Hybrid Dual-Mic", val2: "Passive Only", val3: "None" },
        { feature: "Battery Life", val1: "40 Hours", val2: "24 Hours", val3: "14 Hours" },
        { feature: "Multipoint Bluetooth 5.3", val1: "✓ Dual Device", val2: "✓ Dual Device", val3: "Single Device" },
        { feature: "Hard Travel Case Included", val1: "✓ Included", val2: "Pouch Only", val3: "None" },
        { feature: "Manufacturer Warranty", val1: "2 Years Full", val2: "1 Year", val3: "90 Days" },
      ],
    },
    {
      id: "mod-5",
      type: "sidebar_editorial",
      name: "Module 5: Split Image + Text Editorial",
      headline: "Effortless Transition Between Silence & Awareness",
      body: "Need to order a coffee or hear an airport boarding gate announcement? A simple one-second tap activates Transparency Mode, feeding crisp ambient voices straight into your ears without removing the headset.",
      altText: "Headphones wearer switching modes seamlessly",
    },
    {
      id: "mod-6",
      type: "specs_table",
      name: "Module 6: Technical Specifications",
      specs: [
        { attribute: "Driver Architecture", value: "40mm Graphene Composite Dynamic Transducer" },
        { attribute: "Frequency Bandwidth", value: "20Hz – 40,000Hz (Hi-Res Audio Certified)" },
        { attribute: "Connectivity", value: "Bluetooth 5.3 + 3.5mm Gold-Plated Audio Bypass" },
        { attribute: "Charging Standard", value: "USB Type-C (5V / 2A Fast Charge Protocol)" },
        { attribute: "Total Headset Weight", value: "248 grams (Ergonomic Featherweight)" },
      ],
    },
    {
      id: "mod-7",
      type: "faq_module",
      name: "Module 7: Verified Customer Questions",
      faqs: [
        {
          q: "Are these comfortable to wear with prescription glasses?",
          a: "Yes. The memory foam cushions conform smoothly around eyeglass frames without painful pressure points.",
        },
        {
          q: "Does the microphone work for Zoom and Teams meetings?",
          a: "Yes. Dual beamforming microphones suppress background keyboard clicks for crystal-clear virtual meetings.",
        },
      ],
    },
  ]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-aplus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, brandName, category }),
      });
      const data = await res.json();
      if (data.modules) {
        setModules(data.modules);
        deductCredits(10);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`${brandName.replace(/\s+/g, "_")}_Amazon_APlus_Content`);

    // Add copy-paste text document with alt-texts
    let textDoc = `========================================================\n`;
    textDoc += `LISTONE.AI - AMAZON A+ CONTENT SPECIFICATIONS & COPY\n`;
    textDoc += `Product: ${productName}\nBrand: ${brandName}\nGenerated: ${new Date().toLocaleDateString()}\n`;
    textDoc += `========================================================\n\n`;

    modules.forEach((mod, idx) => {
      textDoc += `--- [${idx + 1}] ${mod.name} ---\n`;
      if (mod.headline) textDoc += `Headline: ${mod.headline}\n`;
      if (mod.subheadline) textDoc += `Subhead: ${mod.subheadline}\n`;
      if (mod.body) textDoc += `Body Copy:\n${mod.body}\n`;
      if (mod.altText) textDoc += `Recommended Image Alt-Text: ${mod.altText}\n`;
      if (mod.items) {
        mod.items.forEach((item: any, i: number) => {
          textDoc += `  Feature ${i + 1}: ${item.title} - ${item.desc}\n`;
        });
      }
      textDoc += `\n`;
    });

    folder?.file("APlus_Copy_And_AltText.txt", textDoc);
    folder?.file("layout_manifest.json", JSON.stringify(modules, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${brandName}_Amazon_APlus_Export.zip`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Module B • Enhanced Brand Content (EBC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            A+ Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Assembles all 7 vertical A+ modules with desktop & mobile simulators, benefit-first copy, and instant ZIP export.
          </p>
        </div>

        {/* View toggle and export */}
        <div className="flex items-center gap-3">
          {/* Simulator switcher */}
          <div className="bg-[#121223] border border-white/10 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                previewMode === "desktop"
                  ? "bg-brand-violet text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                previewMode === "mobile"
                  ? "bg-brand-violet text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Simulator</span>
            </button>
          </div>

          <button
            onClick={handleExportZip}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export A+ Package (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Input controls */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Product:</span>
          <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            {productName}
          </span>
          <span className="text-xs text-slate-400 font-semibold">Brand:</span>
          <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            {brandName}
          </span>
        </div>

        <button
          onClick={handleRegenerate}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Regenerate A+ Copy (10 Credits)</span>
        </button>
      </div>

      {/* Vertical A+ Content Simulator Viewport */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#0B0B14] ${
            previewMode === "mobile"
              ? "max-w-md w-full border-4 border-slate-700 shadow-brand-violet/20"
              : "max-w-5xl w-full"
          }`}
        >
          {/* Header indicator inside simulator */}
          <div className="bg-[#151528] px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-white">
              Amazon Detail Page • {previewMode === "mobile" ? "Mobile App Simulation" : "Desktop View (970px width)"}
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              Amazon A+ Policy Compliant
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-12">
            {/* MODULE 1: HERO BANNER (970x600) */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1A3A] to-[#2B1B47] p-8 sm:p-14 text-center border border-white/10 shadow-lg">
              <div className="max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 inline-block">
                  {brandName} Flagship
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                  {modules[0].headline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg mx-auto">
                  {modules[0].subheadline}
                </p>

                <div className="pt-6 my-auto flex justify-center">
                  <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-7xl shadow-2xl backdrop-blur-md">
                    🎧
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
                  <span>Standard Size: 970x600 px</span>
                  <Link
                    href="/dashboard/editor"
                    className="text-brand-pink hover:underline font-semibold flex items-center gap-1"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Edit in Canva Studio</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* MODULE 2: BRAND STORY (970x300) */}
            <div className="rounded-2xl bg-[#121223] border border-white/10 p-8 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Our Story & Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {modules[1].headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {modules[1].body}
              </p>
            </div>

            {/* MODULE 3: 4-CARD FEATURE GRID */}
            <div>
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  Engineered With Purpose
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Top selling features with clear customer benefits
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules[2].items?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#121223] border border-white/10 text-center space-y-2 hover:border-brand-violet/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mx-auto shadow-sm">
                      {item.emoji}
                    </div>
                    <h4 className="text-xs font-bold text-white pt-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 4: COMPARISON MATRIX */}
            <div className="rounded-2xl bg-[#121223] border border-white/10 p-6 overflow-x-auto">
              <h3 className="text-base font-bold font-heading text-white mb-4">
                {modules[3].name}
              </h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    {modules[3].headers?.map((h: string, i: number) => (
                      <th
                        key={i}
                        className={`p-3 font-bold ${
                          i === 1 ? "text-brand-pink bg-brand-pink/5 rounded-t-lg" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {modules[3].rows?.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-semibold text-slate-300">{row.feature}</td>
                      <td className="p-3 font-bold text-white bg-brand-pink/5">{row.val1}</td>
                      <td className="p-3 text-slate-400">{row.val2}</td>
                      <td className="p-3 text-slate-500">{row.val3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MODULE 5: SPLIT EDITORIAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#121223] border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-brand-pink tracking-wider">
                  Everyday Versatility
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  {modules[4].headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {modules[4].body}
                </p>
              </div>
              <div className="h-56 bg-gradient-to-tr from-[#1E1E34] to-[#2B1B47] rounded-xl flex items-center justify-center text-6xl shadow-inner border border-white/5">
                ☕
              </div>
            </div>

            {/* MODULE 6: TECHNICAL SPECS TABLE */}
            <div className="bg-[#121223] border border-white/10 rounded-2xl p-6">
              <h3 className="text-base font-bold font-heading text-white mb-4">
                {modules[5].name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {modules[5].specs?.map((spec: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 flex justify-between gap-2 border border-white/5">
                    <span className="text-slate-400 font-medium">{spec.attribute}:</span>
                    <span className="text-white font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 7: FAQS */}
            <div className="bg-[#121223] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold font-heading text-white">
                Frequently Asked Product Questions
              </h3>
              <div className="space-y-3">
                {modules[6].faqs?.map((faq: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <h5 className="text-xs font-bold text-white">Q: {faq.q}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
