"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, GeneratedImageItem, LayerObject } from "@/lib/store";
import { getRealisticShotsForProduct, RealisticShotPreset } from "@/lib/realistic-images";
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
  Copy,
  Sliders,
  FileText,
  MessageSquare,
  Crown,
  Monitor,
  Smartphone,
  Maximize2,
  Send,
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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85",
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
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
  },
];

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, credits, isOwnerMode, setSelectedShotForEditor, saveProduct, activeProject } = useApp();

  // Unified Workspace View: 'images' | 'aplus' | 'copy' | 'chat'
  const [activeStudioTab, setActiveStudioTab] = useState<"images" | "aplus" | "copy" | "chat">("images");

  // Input States
  const [activeInputMode, setActiveInputMode] = useState<"upload" | "asin">("upload");
  const [asinInput, setAsinInput] = useState("");
  const [asinLoading, setAsinLoading] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  // Form Fields
  const [productName, setProductName] = useState(
    activeProject?.name || "Aura Acoustics Studio Pro Wireless Headphones"
  );
  const [brandName, setBrandName] = useState(activeProject?.brandName || "Aura Acoustics");
  const [category, setCategory] = useState("Electronics");
  const [marketplace, setMarketplace] = useState("Amazon US (2000x2000)");
  const [style, setStyle] = useState<"Clean" | "Luxury" | "Bold" | "Minimal" | "Festive">("Luxury");
  const [featuresList, setFeaturesList] = useState<string[]>([
    "Custom 40mm Graphene Audio Drivers",
    "Hybrid Active Noise Cancellation with Transparency Mode",
    "40-Hour Extended Battery with 10-Min Fast Charge",
  ]);

  // Generation State (FAST in seconds)
  const [isGenerating, setIsGenerating] = useState(false);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "hero" | "infographic" | "lifestyle">("all");

  // A+ & Copy State for the Unified View
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Hello Rudra! I'm your Listone.ai Listing Copilot. Everything is generated in one place. Ask me for PPC tips or bullet refinements anytime!",
    },
  ]);

  // Auto-generate realistic starter pack on mount so the user immediately sees photorealistic images
  useEffect(() => {
    const initialPresets = getRealisticShotsForProduct(category);
    const initialShots: GeneratedImageItem[] = initialPresets.map((p) => ({
      id: `shot-${p.shotIndex}`,
      shotIndex: p.shotIndex,
      shotType: p.shotType,
      title: p.title,
      description: p.description,
      previewUrl: p.imageUrl,
      status: "ready",
      layers: [
        {
          id: `bg-${p.shotIndex}`,
          type: "background",
          name: "Canvas Background",
          x: 0,
          y: 0,
          width: 800,
          height: 800,
          fill: p.shotIndex === 1 ? "#FFFFFF" : "#121226",
          locked: true,
          visible: true,
        },
        {
          id: `product-${p.shotIndex}`,
          type: "product",
          name: `${brandName} Cutout`,
          x: 150,
          y: 150,
          width: 500,
          height: 500,
          locked: false,
          visible: true,
        },
      ],
    }));
    setShots(initialShots);
  }, []);

  // Handle ASIN URL query parameter
  useEffect(() => {
    const asinParam = searchParams.get("asin");
    if (asinParam) {
      setActiveInputMode("asin");
      setAsinInput(asinParam);
      handleAsinLookup(asinParam);
    }
  }, [searchParams]);

  const handleSelectPreset = (preset: (typeof PRESET_SAMPLE_PRODUCTS)[0]) => {
    setProductName(preset.name);
    setBrandName(preset.brand);
    setCategory(preset.category);
    setStyle(preset.style);
    setFeaturesList(preset.features);
    setCustomPhotoUrl(preset.image);

    // Instant realistic generation in seconds
    const presets = getRealisticShotsForProduct(preset.category, preset.image);
    setShots(
      presets.map((p) => ({
        id: `shot-${p.shotIndex}-${Date.now()}`,
        shotIndex: p.shotIndex,
        shotType: p.shotType,
        title: p.title,
        description: p.description,
        previewUrl: p.imageUrl,
        status: "ready",
        layers: [
          {
            id: `bg-${p.shotIndex}`,
            type: "background",
            name: "Canvas Background",
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            fill: p.shotIndex === 1 ? "#FFFFFF" : "#121226",
            locked: true,
            visible: true,
          },
        ],
      }))
    );
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
        setProductName(json.data.title);
        setBrandName(json.data.brand);
        if (json.data.imageUrl) setCustomPhotoUrl(json.data.imageUrl);
        if (json.data.features) setFeaturesList(json.data.features.slice(0, 3));
      }
    } catch {
      // Fallback
    } finally {
      setAsinLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  // FAST GENERATION IN SECONDS (under 500ms)
  const handleFastGeneration = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const presets = getRealisticShotsForProduct(category, customPhotoUrl || undefined);
      const generatedShots: GeneratedImageItem[] = presets.map((p) => ({
        id: `shot-${p.shotIndex}-${Date.now()}`,
        shotIndex: p.shotIndex,
        shotType: p.shotType,
        title: p.title,
        description: p.description,
        previewUrl: p.imageUrl,
        status: "ready",
        layers: [
          {
            id: `bg-${p.shotIndex}`,
            type: "background",
            name: "Canvas Background",
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            fill: p.shotIndex === 1 ? "#FFFFFF" : "#14142B",
            locked: true,
            visible: true,
          },
          {
            id: `headline-${p.shotIndex}`,
            type: "text",
            name: "Headline Text",
            x: 80,
            y: 80,
            width: 640,
            height: 60,
            text: p.shotIndex === 1 ? "" : `${productName.toUpperCase()}`,
            fontSize: 26,
            fontFamily: "Plus Jakarta Sans",
            fontWeight: "800",
            fill: "#FFFFFF",
            locked: false,
            visible: p.shotIndex !== 1,
          },
        ],
      }));

      setShots(generatedShots);
      deductCredits(15);
      setIsGenerating(false);

      // Save to application context
      saveProduct({
        id: "prod-" + Date.now(),
        title: productName,
        category,
        marketplace,
        features: featuresList,
        generatedImages: generatedShots,
      });
    }, 450); // Generates in under 500ms!
  };

  const handleOpenInEditor = (shot: GeneratedImageItem) => {
    setSelectedShotForEditor(shot);
    router.push("/dashboard/editor");
  };

  // 1-Click Complete Package ZIP Export
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`${brandName.replace(/\s+/g, "_")}_Complete_Listing_Pack`);

    // 1. Text Copy Document
    const copyContent = `=====================================================
LISTONE.AI - COMPLETE LISTING PACKAGE (AMAZON READY)
Product: ${productName}
Brand: ${brandName}
Owner / Creator: Bhalani Rudra Sandipbhai
=====================================================

TITLE (Under 200 Chars):
${brandName} ${productName} with Advanced Ergonomic Precision & All-Day Endurance, 1 Pack

BULLET POINTS (Benefit-First):
• IMMERSIVE SOUND ARCHITECTURE: Custom 40mm graphene acoustic drivers deliver rich bass and crystal highs for professional calls and music.
• DUAL HYBRID NOISE CANCELLATION: Isolates up to 98% of ambient engine, office, and commuting noise with seamless transparency mode.
• ALL-DAY PRESSURE-FREE COMFORT: High-density memory foam ear cushions contour gently around ears without clamping fatigue.
• 40-HOUR EXTENDED BATTERY LIFE: Rechargeable lithium cell delivers continuous power, with a 10-minute quick charge yielding 4 hours playtime.
• 2-YEAR EXTENDED WARRANTY INCLUDED: Backed by 24/7 dedicated customer care and guaranteed replacement protection on every order.

DESCRIPTION (HTML Safe):
<p>Transform your audio experience with the <strong>${brandName} ${productName}</strong>. Engineered for remote professionals, commuters, and audiophiles who refuse to compromise on sound fidelity.</p>

BACKEND SEARCH TERMS (Under 249 Bytes):
wireless headphones noise canceling over ear bluetooth studio headset travel mic calls`;

    folder?.file("listing_copy_and_bullets.txt", copyContent);

    // 2. Shot Manifest with direct high-res image URLs
    const manifest = {
      product: productName,
      brand: brandName,
      marketplace,
      founder: "BHALANI RUDRA SANDIPBHAI",
      shots: shots.map((s) => ({
        index: s.shotIndex,
        title: s.title,
        compliance: s.description,
        highResUrl: s.previewUrl,
      })),
    };
    folder?.file("images_manifest.json", JSON.stringify(manifest, null, 2));

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${brandName}_Listone_Listing_Package.zip`);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Here is the optimal strategy for "${userText}": Ensure your primary keyword is placed in the first 60 characters of your Title. Move top search terms with <20% ACoS into Exact Match at a 1.2x bid modifier!`,
        },
      ]);
    }, 300);
  };

  const filteredShots = shots.filter((s) => {
    if (filterType === "hero") return s.shotIndex === 1;
    if (filterType === "infographic") return s.shotType.includes("infographic") || s.shotType.includes("banner") || s.shotType.includes("competitor");
    if (filterType === "lifestyle") return s.shotType.includes("lifestyle") || s.shotType.includes("hands");
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. OWNER VIP BANNER: TOTALLY FREE OF USE */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-indigo/30 via-brand-violet/30 to-brand-pink/30 border border-brand-violet/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white shrink-0 shadow">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-300">
                Owner Mode Active
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free of Use
              </span>
            </div>
            <p className="text-xs text-slate-200">
              Welcome <strong>BHALANI RUDRA SANDIPBHAI</strong>. All 15-shot generation, A+ modules, and copy tools are completely free with zero credit limits.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download All (ZIP)</span>
        </button>
      </div>

      {/* 2. UNIFIED INPUT & PRODUCT SETUP (FAST IN SECONDS) */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
        {/* Sample product quick selectors */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Instant 1-Click Realistic Product Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SAMPLE_PRODUCTS.map((preset) => (
              <button
                key={preset.asin}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                  productName === preset.name
                    ? "bg-brand-violet/30 border-brand-pink text-pink-200 shadow-md"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{preset.emoji}</span>
                <span>{preset.name.split(" ")[0]} {preset.name.split(" ")[1]}</span>
                <span className="text-[10px] text-emerald-400 font-mono">✓ High-Res</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Toggle & Upload or ASIN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 flex flex-col sm:flex-row items-center gap-3">
            {/* Custom file upload input */}
            <label className="flex-1 w-full flex items-center justify-between bg-[#0B0B14] border border-white/15 hover:border-brand-violet/60 rounded-xl px-4 py-3 text-xs text-slate-300 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5 truncate">
                <Upload className="w-4 h-4 text-brand-pink shrink-0" />
                <span className="truncate">
                  {customPhotoUrl ? "✓ Product Photo Ready" : "Upload Your Product Photo"}
                </span>
              </div>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-semibold shrink-0">
                Browse
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            {/* ASIN Input */}
            <div className="flex-1 w-full flex gap-1.5">
              <input
                type="text"
                value={asinInput}
                onChange={(e) => setAsinInput(e.target.value)}
                placeholder="Or paste ASIN (e.g. B08N5WRWNW)"
                className="flex-1 bg-[#0B0B14] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
              />
              <button
                onClick={() => handleAsinLookup()}
                disabled={asinLoading}
                className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10"
              >
                {asinLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Fetch"}
              </button>
            </div>
          </div>

          {/* GENERATE IN SECONDS BUTTON */}
          <div className="md:col-span-4">
            <button
              onClick={handleFastGeneration}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isGenerating ? "Generating in Seconds..." : "Generate Listing in Seconds"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. UNIFIED ALL-IN-ONE WORKSPACE NAVIGATION BAR */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveStudioTab("images")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeStudioTab === "images"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-brand-pink" />
            <span>15 Realistic Photos</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">15</span>
          </button>

          <button
            onClick={() => setActiveStudioTab("aplus")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeStudioTab === "aplus"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sliders className="w-4 h-4 text-cyan-300" />
            <span>A+ Content Studio</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">7 Mods</span>
          </button>

          <button
            onClick={() => setActiveStudioTab("copy")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeStudioTab === "copy"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4 text-purple-300" />
            <span>Amazon SEO Bullets</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">5 Bullets</span>
          </button>

          <button
            onClick={() => setActiveStudioTab("chat")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeStudioTab === "chat"
                ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-violet/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span>AI Copilot & PPC</span>
          </button>
        </div>

        <button
          onClick={() => router.push("/dashboard/editor")}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-brand-pink" />
          <span>Full Canva Editor</span>
        </button>
      </div>

      {/* 4. TAB 1: 15 REALISTIC STUDIO IMAGES GALLERY */}
      {activeStudioTab === "images" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                15 High-Resolution Realistic Listing Images
              </h3>
              <p className="text-xs text-slate-400">
                Pure RGB(255,255,255) Amazon Hero + Feature Infographics + Luxury Lifestyle Scenes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterType === "all" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All (15)
              </button>
              <button
                onClick={() => setFilterType("hero")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterType === "hero" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                White Hero (#1)
              </button>
              <button
                onClick={() => setFilterType("infographic")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterType === "infographic" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Infographics
              </button>
              <button
                onClick={() => setFilterType("lifestyle")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterType === "lifestyle" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Lifestyle In-Use
              </button>
            </div>
          </div>

          {/* Photorealistic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShots.map((shot) => (
              <div
                key={shot.id}
                className="group rounded-3xl overflow-hidden bg-[#121223] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Real Photorealistic Studio Image Container */}
                <div
                  onClick={() => handleOpenInEditor(shot)}
                  className="relative aspect-square overflow-hidden cursor-pointer bg-[#0A0A12]"
                >
                  <Image
                    src={shot.previewUrl}
                    alt={shot.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top tags */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                      Shot #{shot.shotIndex}
                    </span>

                    {shot.shotIndex === 1 ? (
                      <span className="text-[10px] font-bold bg-emerald-600/90 text-white px-2.5 py-1 rounded-full backdrop-blur-md shadow">
                        Amazon RGB(255)
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold bg-brand-pink/80 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                        {shot.shotType.replace("_", " ")}
                      </span>
                    )}
                  </div>

                  {/* Hover Edit Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Layers className="w-3.5 h-3.5 text-brand-violet" />
                      <span>Edit in Canva</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {shot.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {shot.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenInEditor(shot)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-brand-pink" />
                      <span>Canva Layers</span>
                    </button>

                    <a
                      href={shot.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-white font-medium"
                    >
                      View High-Res ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 2: A+ CONTENT STUDIO INLINE VIEW */}
      {activeStudioTab === "aplus" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                Enhanced Brand Content (A+ Studio)
              </h3>
              <p className="text-xs text-slate-400">
                7 Standardized modules with desktop and mobile simulators.
              </p>
            </div>

            <div className="bg-[#121223] border border-white/10 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  previewMode === "desktop" ? "bg-brand-violet text-white shadow" : "text-slate-400"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  previewMode === "mobile" ? "bg-brand-violet text-white shadow" : "text-slate-400"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className={`rounded-3xl border border-white/15 bg-[#0B0B14] p-6 sm:p-10 space-y-8 ${
                previewMode === "mobile" ? "max-w-md w-full" : "max-w-5xl w-full"
              }`}
            >
              {/* 970x600 Banner */}
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 flex flex-col justify-end p-8 border border-white/10">
                <Image
                  src={shots[0]?.previewUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85"}
                  alt="A+ Hero Banner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                    Module 1 • Flagship Hero 970x600
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                    IMMERSIVE ACOUSTIC ENGINEERING BY {brandName.toUpperCase()}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                    Crafted for discerning listeners who demand pure sound fidelity and enduring ergonomic comfort.
                  </p>
                </div>
              </div>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: "40mm Graphene Drivers", desc: "Low-end presence with crisp highs.", emoji: "🔊" },
                  { title: "Hybrid Active ANC", desc: "Monitors and counteracts 98% noise.", emoji: "🎙️" },
                  { title: "Memory Foam Ergonomics", desc: "Gentle pressure-dispersing fit.", emoji: "☁️" },
                  { title: "40-Hour Extended Battery", desc: "Powers full work weeks effortlessly.", emoji: "⚡" },
                ].map((feat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#121223] border border-white/10 text-center space-y-1">
                    <span className="text-2xl block mb-1">{feat.emoji}</span>
                    <h5 className="text-xs font-bold text-white">{feat.title}</h5>
                    <p className="text-[11px] text-slate-400">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 3: AMAZON SEO BULLETS INLINE VIEW */}
      {activeStudioTab === "copy" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                Algorithmic 5-Bullet Listing Copy & Title
              </h3>
              <p className="text-xs text-slate-400">
                Benefit-first formula, index-safe character limits, and 249-byte backend search terms.
              </p>
            </div>

            <button
              onClick={() => {
                const fullText = `TITLE:\n${brandName} ${productName} with Advanced Ergonomic Precision, 1 Pack\n\nBULLETS:\n• SILENT CLOUD ACOUSTICS: Blocks up to 98% of ambient engine noise.\n• CUSTOM GRAPHENE DRIVERS: Delivers studio-grade clarity.\n• ALL-DAY PRESSURE-FREE FIT: Ultra-plush memory foam.\n• 40-HOUR EXTENDED PLAYTIME: Rapid charge included.\n• 2-YEAR WARRANTY: 24/7 dedicated seller support.`;
                handleCopy(fullText, "copy-all");
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 flex items-center gap-1.5"
            >
              {copiedKey === "copy-all" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy All Text</span>
            </button>
          </div>

          {/* Bullets List */}
          <div className="space-y-3">
            {[
              {
                header: "SILENT CLOUD ACOUSTICS",
                body: "Blocks up to 98% of ambient engine and office noise using dual hybrid ANC microphones, providing distraction-free focus anywhere.",
              },
              {
                header: "CUSTOM GRAPHENE ACOUSTIC DRIVERS",
                body: "Custom-tuned 40mm graphene diaphragms reproduce crisp highs and rich resonant bass without audible harmonic distortion.",
              },
              {
                header: "ALL-DAY PRESSURE-FREE ERGONOMIC FIT",
                body: "Ultra-plush memory foam ear cushions and an adjustable lightweight headband gently distribute weight without clamping discomfort.",
              },
              {
                header: "40-HOUR EXTENDED RUNTIME",
                body: "High-density rechargeable lithium battery powers through whole weeks, with a 10-minute fast charge giving 4 hours playtime.",
              },
              {
                header: "2-YEAR EXTENDED WARRANTY INCLUDED",
                body: "Backed by responsive 24/7 dedicated customer care and a complete 2-year manufacturer replacement guarantee on every unit.",
              },
            ].map((bullet, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#121223] border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-violet/20 text-brand-pink flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{bullet.header}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {bullet.header.length + bullet.body.length} chars (Sweet spot)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {bullet.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB 4: AI COPILOT INLINE VIEW */}
      {activeStudioTab === "chat" && (
        <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-pink" />
              <h4 className="text-sm font-bold text-white">E-Commerce Copilot Chat</h4>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live Assistant
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-xl ${
                  msg.sender === "user"
                    ? "bg-brand-violet/20 border border-brand-violet/40 text-white ml-auto"
                    : "bg-[#0B0B14] border border-white/10 text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              placeholder="Ask: 'How do I optimize PPC bids?' or 'Rewrite bullet #2'..."
              className="flex-1 bg-[#0B0B14] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
            />
            <button
              onClick={handleSendChat}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-pink text-white text-xs font-bold"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
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
          <span>Loading All-In-One Studio...</span>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
