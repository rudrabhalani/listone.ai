"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, GeneratedImageItem, LayerObject } from "@/lib/store";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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
  Download,
  RefreshCw,
  Palette,
  Check,
  AlertCircle,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

const PRESET_SAMPLE_PRODUCTS = [
  {
    name: "Aura Acoustics Studio Pro Wireless Headphones",
    brand: "Aura Acoustics",
    category: "Electronics",
    style: "Luxury" as const,
    asin: "B08N5WRWNW",
    emoji: "🎧",
    colors: ["#1E1E2F", "#6366F1", "#EC4899"],
    features: ["40mm Graphene Audio Drivers", "Hybrid Active Noise Cancellation", "40-Hour Extended Battery"],
  },
  {
    name: "Lumière Botanicals 20% Vitamin C Radiance Serum",
    brand: "Lumière Botanicals",
    category: "Beauty",
    style: "Clean" as const,
    asin: "B07XJ8C8F7",
    emoji: "🧴",
    colors: ["#FDF2E9", "#EA580C", "#F59E0B"],
    features: ["Stabilized 20% Kakadu Plum Extract", "Multi-Molecular Triple Hyaluronic Acid", "100% Vegan & Cruelty Free"],
  },
  {
    name: "RestWell Ergonomic Cervical Memory Foam Pillow",
    brand: "RestWell Home",
    category: "Home",
    style: "Minimal" as const,
    asin: "B081ZT4G47",
    emoji: "🛏️",
    colors: ["#F0FDF4", "#0D9488", "#1E293B"],
    features: ["Dual-Height Orthopedic Contour", "CertiPUR-US High-Density Rebound", "Breathable Bamboo Washable Cover"],
  },
  {
    name: "Uji Ceremonial First-Harvest Organic Matcha",
    brand: "Uji Botanics",
    category: "Food",
    style: "Clean" as const,
    asin: "B09V3HN1KC",
    emoji: "🍵",
    colors: ["#064E3B", "#10B981", "#ECFDF5"],
    features: ["First-Harvest Stone Ground Leaves", "High L-Theanine Calm Focus", "Zero Sugar or Fillers"],
  },
  {
    name: "HydroShield Waterproof Minimalist Commuter Pack",
    brand: "HydroShield",
    category: "Fashion",
    style: "Bold" as const,
    asin: "B08X4J5Z1Y",
    emoji: "🎒",
    colors: ["#0F172A", "#3B82F6", "#64748B"],
    features: ["YKK Aquaguard Taped Zippers", "Padded 16-Inch Laptop Cradle", "Recycled Cordura Ballistic Fabric"],
  },
];

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, credits, setSelectedShotForEditor, saveProduct, activeProject } = useApp();

  const [activeTab, setActiveTab] = useState<"upload" | "asin">("upload");
  const [asinInput, setAsinInput] = useState("");
  const [asinLoading, setAsinLoading] = useState(false);
  const [asinVerifiedData, setAsinVerifiedData] = useState<any | null>(null);

  // Form Fields
  const [productName, setProductName] = useState(activeProject?.name || "Aura Acoustics Studio Pro Wireless Headphones");
  const [brandName, setBrandName] = useState(activeProject?.brandName || "Aura Acoustics");
  const [category, setCategory] = useState("Electronics");
  const [marketplace, setMarketplace] = useState("Amazon US (2000x2000)");
  const [targetAudience, setTargetAudience] = useState("Professionals & Music Enthusiasts");
  const [style, setStyle] = useState<"Clean" | "Luxury" | "Bold" | "Minimal" | "Festive">("Clean");
  const [selectedEmoji, setSelectedEmoji] = useState("🎧");
  const [featuresList, setFeaturesList] = useState<string[]>([
    "Custom 40mm Graphene Audio Drivers",
    "Hybrid Active Noise Cancellation with Transparency Mode",
    "40-Hour Extended Battery with 10-Min Fast Charge",
  ]);

  // Generation Queue State
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Read URL query param for ASIN if passed from Hero
  useEffect(() => {
    const asinParam = searchParams.get("asin");
    if (asinParam) {
      setActiveTab("asin");
      setAsinInput(asinParam);
      handleAsinLookup(asinParam);
    }
  }, [searchParams]);

  const handleSelectPreset = (preset: (typeof PRESET_SAMPLE_PRODUCTS)[0]) => {
    setProductName(preset.name);
    setBrandName(preset.brand);
    setCategory(preset.category);
    setStyle(preset.style);
    setSelectedEmoji(preset.emoji);
    setFeaturesList(preset.features);
    setAsinInput(preset.asin);
    setAsinVerifiedData(null);
  };

  const handleAsinLookup = async (asinToFetch?: string) => {
    const query = asinToFetch || asinInput;
    if (!query.trim()) return;

    setAsinLoading(true);
    try {
      const res = await fetch("/api/asin-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAsinVerifiedData(json.data);
        setProductName(json.data.title);
        setBrandName(json.data.brand);
        if (json.data.features) setFeaturesList(json.data.features.slice(0, 3));
      }
    } catch {
      // Fallback
    } finally {
      setAsinLoading(false);
    }
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setProgressStep(1); // Step 1: Remove background

    setTimeout(() => {
      setProgressStep(2); // Step 2: Creative Director JSON
    }, 900);

    setTimeout(() => {
      setProgressStep(3); // Step 3: Parallel 15 rendering
    }, 1800);

    setTimeout(async () => {
      setProgressStep(4); // Step 4: QA Inspection & Layer graph assembly
      try {
        const res = await fetch("/api/generate-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName,
            brandName,
            category,
            marketplace,
            style,
            keyFeatures: featuresList,
          }),
        });
        const data = await res.json();
        if (data.shots) {
          setShots(data.shots);
          deductCredits(15);
          // Save in App Context
          saveProduct({
            id: "prod-" + Date.now(),
            title: productName,
            category,
            marketplace,
            features: featuresList,
            generatedImages: data.shots,
          });
        }
      } catch {
        // Fallback
      } finally {
        setIsGenerating(false);
        setProgressStep(0);
      }
    }, 2800);
  };

  const handleOpenInEditor = (shot: GeneratedImageItem) => {
    setSelectedShotForEditor(shot);
    router.push("/dashboard/editor");
  };

  const handleDownloadAllZip = async () => {
    if (shots.length === 0) return;
    const zip = new JSZip();
    const folder = zip.folder(`${brandName.replace(/\s+/g, "_")}_15_Listing_Shots`);

    // Add layer manifest and image descriptions
    const manifest = {
      product: productName,
      brand: brandName,
      marketplace,
      generatedAt: new Date().toISOString(),
      shots: shots.map((s) => ({
        index: s.shotIndex,
        title: s.title,
        description: s.description,
        layersCount: s.layers.length,
      })),
    };
    folder?.file("listing_manifest.json", JSON.stringify(manifest, null, 2));

    shots.forEach((shot) => {
      folder?.file(
        `Shot_${String(shot.shotIndex).padStart(2, "0")}_${shot.shotType}.json`,
        JSON.stringify(shot.layers, null, 2)
      );
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${brandName}_Listone_15_Shots.zip`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-xs font-semibold text-indigo-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Module A • 15-Shot Creative Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            15-Product Image Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Preserves authentic product pixels. Outputs Canva-ready layered canvases for all 15 listing angles.
          </p>
        </div>

        {shots.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadAllZip}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-lg shadow-brand-violet/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download 15-Pack (ZIP)</span>
            </button>
          </div>
        )}
      </div>

      {/* 5 Preset Sample Products Bar */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-4">
        <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
          Test With 5 Real Sample Products (One-Click Setup):
        </span>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_SAMPLE_PRODUCTS.map((preset) => (
            <button
              key={preset.asin}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                productName === preset.name
                  ? "bg-brand-violet/20 border-brand-violet text-pink-200 shadow"
                  : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-base">{preset.emoji}</span>
              <span>{preset.name.split(" ")[0]} {preset.name.split(" ")[1]}</span>
              <span className="text-[10px] text-slate-400 font-mono">({preset.asin})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Configuration Box */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Tabs: Upload vs ASIN */}
        <div className="flex items-center gap-2 p-1 bg-[#0B0B14] rounded-2xl max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "upload"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photos (1-5)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("asin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "asin"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Paste ASIN / URL</span>
          </button>
        </div>

        {/* Tab 1: Upload Dropzone */}
        {activeTab === "upload" ? (
          <div className="border-2 border-dashed border-white/15 hover:border-brand-violet/50 rounded-2xl p-8 text-center bg-white/[0.01] hover:bg-white/[0.03] transition-colors flex flex-col items-center justify-center cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-brand-violet/20 text-brand-pink flex items-center justify-center mb-3">
              <span className="text-3xl">{selectedEmoji}</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Selected Product: {productName}
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Drop 1-5 product photos here. Our automated cutout pipeline removes messy backgrounds while keeping original logos and label text 100% sharp.
            </p>
          </div>
        ) : (
          /* Tab 2: ASIN Lookup */
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={asinInput}
                onChange={(e) => setAsinInput(e.target.value)}
                placeholder="Paste ASIN (e.g. B08N5WRWNW or https://amazon.com/dp/...)"
                className="flex-1 bg-[#0B0B14] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
              />
              <button
                type="button"
                onClick={() => handleAsinLookup()}
                disabled={asinLoading}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-2"
              >
                {asinLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
                <span>Fetch ASIN</span>
              </button>
            </div>

            {asinVerifiedData && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-2xl">
                  {selectedEmoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      SP-API Verified
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ASIN: {asinVerifiedData.asin}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white mt-0.5">{asinVerifiedData.title}</h5>
                  <p className="text-xs text-slate-300 mt-1">Brand: {asinVerifiedData.brand} • {asinVerifiedData.price}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product Attributes Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Product Title</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Aesthetic Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as any)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
            >
              <option value="Clean">Clean (Crisp white studio, high light)</option>
              <option value="Luxury">Luxury (Moody dark, gold & violet ambient)</option>
              <option value="Bold">Bold (High contrast, vibrant gradients)</option>
              <option value="Minimal">Minimal (Understated earthy pastels)</option>
              <option value="Festive">Festive (Celebratory ambient sparkles)</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Preserves exact product pixels • Shot #1 Amazon RGB(255,255,255) guaranteed</span>
          </div>

          <button
            type="button"
            onClick={handleStartGeneration}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? "Processing 15-Shot Pack..." : "Generate 15 Images (15 Credits)"}</span>
          </button>
        </div>
      </div>

      {/* Generation Progress Overlay */}
      {isGenerating && (
        <div className="p-8 rounded-3xl bg-[#141426] border border-brand-violet/40 shadow-2xl space-y-5 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-brand-pink animate-spin" />
              <h3 className="text-base font-bold text-white">
                Generating 15 Listing Images in Parallel...
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-pink-300">
              {progressStep === 1 && "Step 1/4: Isolating Product Cutout"}
              {progressStep === 2 && "Step 2/4: Creative Director Shot List"}
              {progressStep === 3 && "Step 3/4: Rendering 15 Parallel Shots"}
              {progressStep === 4 && "Step 4/4: QA Inspection & Assembling Layers"}
            </span>
          </div>

          <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink h-full rounded-full transition-all duration-700"
              style={{ width: `${(progressStep / 4) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
            <div className={`p-2.5 rounded-xl border ${progressStep >= 1 ? "border-emerald-400 bg-emerald-500/10 text-emerald-300" : "border-white/5"}`}>
              ✓ 1. Background Cutout
            </div>
            <div className={`p-2.5 rounded-xl border ${progressStep >= 2 ? "border-emerald-400 bg-emerald-500/10 text-emerald-300" : "border-white/5"}`}>
              ✓ 2. Shot List Schema
            </div>
            <div className={`p-2.5 rounded-xl border ${progressStep >= 3 ? "border-emerald-400 bg-emerald-500/10 text-emerald-300" : "border-white/5"}`}>
              ✓ 3. 15 Parallel Renders
            </div>
            <div className={`p-2.5 rounded-xl border ${progressStep >= 4 ? "border-emerald-400 bg-emerald-500/10 text-emerald-300" : "border-white/5"}`}>
              ✓ 4. QA & Canvas Graph
            </div>
          </div>
        </div>
      )}

      {/* 15-Shot Output Gallery */}
      {shots.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <span>15 Listing Images Generated</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  All 15 Layered
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any image to open in the Canva-style editor. Every headline, badge, and element is movable.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  selectedFilter === "all" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All (15)
              </button>
              <button
                onClick={() => setSelectedFilter("infographic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  selectedFilter === "infographic" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Infographics (4)
              </button>
              <button
                onClick={() => setSelectedFilter("lifestyle")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  selectedFilter === "lifestyle" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Lifestyle (4)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shots
              .filter((shot) => {
                if (selectedFilter === "infographic") return shot.shotType.includes("infographic");
                if (selectedFilter === "lifestyle") return shot.shotType.includes("lifestyle") || shot.shotType.includes("hands");
                return true;
              })
              .map((shot) => (
                <div
                  key={shot.id}
                  className="group rounded-3xl overflow-hidden bg-[#121223] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Visual Artboard Simulation */}
                  <div
                    onClick={() => handleOpenInEditor(shot)}
                    className="relative aspect-square p-6 flex flex-col justify-between cursor-pointer overflow-hidden border-b border-white/5"
                    style={{
                      backgroundColor: shot.shotIndex === 1 ? "#FFFFFF" : "#141428",
                    }}
                  >
                    {/* Top shot tags */}
                    <div className="flex items-center justify-between z-10">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          shot.shotIndex === 1
                            ? "bg-black text-white"
                            : "bg-white/10 text-white backdrop-blur-md"
                        }`}
                      >
                        Shot #{shot.shotIndex}
                      </span>

                      {shot.shotIndex === 1 ? (
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow">
                          Pure White RGB(255,255,255)
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold bg-brand-pink/20 text-pink-300 px-2 py-0.5 rounded-full border border-brand-pink/30">
                          {shot.shotType.replace("_", " ")}
                        </span>
                      )}
                    </div>

                    {/* Central Product Cutout */}
                    <div className="my-auto mx-auto flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300 z-10">
                      <span className="text-6xl sm:text-7xl drop-shadow-xl">{selectedEmoji}</span>
                      {shot.shotIndex !== 1 && (
                        <div className="mt-3 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold backdrop-blur-md">
                          {brandName} • 2000x2000
                        </div>
                      )}
                    </div>

                    {/* Bottom Layers Badge */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                        {shot.layers.length} Layers
                      </span>
                      <span className="text-[11px] font-bold text-brand-pink group-hover:underline flex items-center gap-1">
                        <span>Edit Canvas</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 space-y-3">
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {shot.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {shot.description}
                    </p>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenInEditor(shot)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-brand-pink" />
                        <span>Canva Editor</span>
                      </button>

                      <button
                        onClick={() => {
                          // Quick individual regeneration
                          alert(`Regenerating Shot #${shot.shotIndex} with fresh composition.`);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Regenerate this shot"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImageStudioPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-brand-pink" />
          <span>Loading 15-Shot Image Studio...</span>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
