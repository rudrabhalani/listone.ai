"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, LayerObject } from "@/lib/store";
import { removeBackgroundClient } from "@/lib/image-cutout";
import { saveAs } from "file-saver";
import {
  Upload,
  Camera,
  Sparkles,
  Download,
  RefreshCw,
  Crown,
  Type,
  Award,
  Maximize2,
  Trash2,
  Copy,
  Check,
  X,
  Send,
  Move,
  Layers,
  ArrowRight,
  Eye,
  RotateCcw,
} from "lucide-react";

type ShotType = "lifestyle" | "how_to_use" | "overview_size" | "macro_detail" | "white_hero";

interface ShotOption {
  id: ShotType;
  label: string;
  icon: string;
  desc: string;
}

const SHOT_OPTIONS: ShotOption[] = [
  {
    id: "lifestyle",
    label: "Where to Use (Lifestyle)",
    icon: "🌟",
    desc: "In-home ambient scene showing where & how product is used",
  },
  {
    id: "how_to_use",
    label: "How to Use & Action",
    icon: "🛠️",
    desc: "Hands operating, assembling or installing in real action",
  },
  {
    id: "overview_size",
    label: "Product Overview & Size",
    icon: "📏",
    desc: "Dimensional overview with realistic scale & clean studio light",
  },
  {
    id: "macro_detail",
    label: "Macro Texture Detail",
    icon: "🔍",
    desc: "Extreme close-up on materials, micro-pores & craftsmanship",
  },
  {
    id: "white_hero",
    label: "Amazon Pure White Hero",
    icon: "🧼",
    desc: "100% Solid White RGB(255) Amazon main listing compliant",
  },
];

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const canvasStageRef = useRef<HTMLDivElement>(null);

  // Uploaded photo state
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productAnalysis, setProductAnalysis] = useState("");

  // Single focused image generation
  const [selectedShotType, setSelectedShotType] = useState<ShotType>("lifestyle");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Canva-style layer editing state
  const [layers, setLayers] = useState<LayerObject[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);

  // Dragging state
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    layerId: string | null;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({
    isDragging: false,
    layerId: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  // Resizing state
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    layerId: string | null;
    startX: number;
    startY: number;
    initialWidth: number;
    initialHeight: number;
  }>({
    isResizing: false,
    layerId: null,
    startX: 0,
    startY: 0,
    initialWidth: 0,
    initialHeight: 0,
  });

  // Ask Bar state (Starts completely empty)
  const [askQuery, setAskQuery] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // Handle ASIN URL query parameter
  useEffect(() => {
    const asinParam = searchParams.get("asin");
    if (asinParam) {
      handleAsinLookup(asinParam);
    }
  }, [searchParams]);

  const handleAsinLookup = async (queryToFetch: string) => {
    if (!queryToFetch.trim()) return;
    setIsGenerating(true);
    setGenerationStep("Fetching Amazon ASIN details...");
    try {
      const res = await fetch("/api/asin-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToFetch.trim() }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const title = json.data.title || "Product";
        setProductName(title);
        if (json.data.imageUrl) {
          setUploadedPhotoUrl(json.data.imageUrl);
          generateSingleImage(json.data.imageUrl, title, selectedShotType);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  // Process uploaded or clicked user photo
  const processUploadedFile = async (file: File) => {
    setIsGenerating(true);
    setGenerationStep("Reading image & removing background...");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const activeName = cleanName || "Product";
      setProductName(activeName);

      // Clean background removal
      const cutoutUrl = await removeBackgroundClient(rawDataUrl);
      setUploadedPhotoUrl(cutoutUrl);

      // Immediately generate the single high-quality focused image
      await generateSingleImage(rawDataUrl, activeName, selectedShotType);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Generate ONE single, high-quality image using Gemini 3.5 Flash vision + FLUX
  const generateSingleImage = async (
    imgBase64: string,
    pName: string,
    shotType: ShotType,
    customUserPrompt?: string
  ) => {
    setIsGenerating(true);
    setGenerationStep("Analyzing product with Gemini 3.5 Flash...");

    try {
      const res = await fetch("/api/generate-single-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imgBase64,
          shotType,
          customPrompt: customUserPrompt,
          productName: pName,
        }),
      });

      setGenerationStep("Synthesizing realistic listing image...");
      const data = await res.json();

      if (data.success && data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        if (data.productAnalysis) {
          setProductAnalysis(data.productAnalysis);
        }

        // Initialize Canva layers on top of this generated image
        setLayers([
          {
            id: "layer-bg",
            type: "background",
            name: "Generated Image Background",
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            imageUrl: data.imageUrl,
            locked: true,
            visible: true,
          },
        ]);
        setSelectedLayerId(null);
        deductCredits(1);
      }
    } catch (err: any) {
      console.error("Single image generation error:", err.message);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Pointer drag & resize listeners on window for fluid Canva-like control (Desktop + Mobile)
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // 1. Dragging
      if (dragState.isDragging && dragState.layerId) {
        const dx = (e.clientX - dragState.startX) * (800 / 600);
        const dy = (e.clientY - dragState.startY) * (800 / 600);

        setLayers((prev) =>
          prev.map((l) =>
            l.id === dragState.layerId
              ? {
                  ...l,
                  x: Math.round(dragState.initialX + dx),
                  y: Math.round(dragState.initialY + dy),
                }
              : l
          )
        );
      }

      // 2. Resizing
      if (resizeState.isResizing && resizeState.layerId) {
        const dx = (e.clientX - resizeState.startX) * (800 / 600);
        const dy = (e.clientY - resizeState.startY) * (800 / 600);

        setLayers((prev) =>
          prev.map((l) =>
            l.id === resizeState.layerId
              ? {
                  ...l,
                  width: Math.max(60, Math.round(resizeState.initialWidth + dx)),
                  height: Math.max(30, Math.round(resizeState.initialHeight + dy)),
                }
              : l
          )
        );
      }
    };

    const handlePointerUp = () => {
      if (dragState.isDragging) {
        setDragState((prev) => ({ ...prev, isDragging: false, layerId: null }));
      }
      if (resizeState.isResizing) {
        setResizeState((prev) => ({ ...prev, isResizing: false, layerId: null }));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState, resizeState]);

  // Canva Layer operations (Pointer events work on touch and mouse)
  const handleLayerPointerDown = (e: React.PointerEvent, layer: LayerObject) => {
    if (layer.locked) return;
    e.stopPropagation();
    setSelectedLayerId(layer.id);
    setDragState({
      isDragging: true,
      layerId: layer.id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: layer.x,
      initialY: layer.y,
    });
  };

  const handleResizePointerDown = (e: React.PointerEvent, layer: LayerObject) => {
    e.stopPropagation();
    setResizeState({
      isResizing: true,
      layerId: layer.id,
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: layer.width,
      initialHeight: layer.height,
    });
  };

  const handleAddText = (type: "headline" | "subtitle") => {
    const newId = `text-${Date.now()}`;
    const newLayer: LayerObject = {
      id: newId,
      type: "text",
      name: type === "headline" ? "Headline Banner" : "Callout Text",
      x: 60,
      y: type === "headline" ? 50 : 120,
      width: 680,
      height: type === "headline" ? 60 : 40,
      text: type === "headline" ? "HIGH-PERFORMANCE PRECISION DESIGN" : "Engineered for maximum daily durability",
      fontSize: type === "headline" ? 28 : 18,
      fontWeight: type === "headline" ? "800" : "600",
      fill: "#FFFFFF",
      locked: false,
      visible: true,
      opacity: 1,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleAddBadge = (text: string, fill = "#1E40AF") => {
    const newId = `badge-${Date.now()}`;
    const newLayer: LayerObject = {
      id: newId,
      type: "badge",
      name: `Badge: ${text}`,
      x: 60,
      y: 700,
      width: 260,
      height: 48,
      text,
      fill,
      locked: false,
      visible: true,
      opacity: 1,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleAddProductOverlay = () => {
    if (!uploadedPhotoUrl) return;
    const newId = `product-overlay-${Date.now()}`;
    const newLayer: LayerObject = {
      id: newId,
      type: "product",
      name: "Original Product Cutout",
      imageUrl: uploadedPhotoUrl,
      x: 150,
      y: 150,
      width: 500,
      height: 500,
      locked: false,
      visible: true,
      opacity: 1,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleDeleteSelectedLayer = () => {
    if (!selectedLayerId || selectedLayerId === "layer-bg") return;
    setLayers((prev) => prev.filter((l) => l.id !== selectedLayerId));
    setSelectedLayerId(null);
  };

  // Ask AI handler: Gemini answers quickly about bullets, keywords, pricing
  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim() || isAsking) return;

    setIsAsking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: askQuery.trim(),
          productContext: {
            title: productName || "Uploaded Product",
            analysis: productAnalysis,
          },
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiAnswer(data.reply);
      } else {
        setAiAnswer(
          "Here are 5 high-converting Amazon bullet points:\n\n• **SUPERIOR HEAVY-DUTY BUILD:** Built with industrial-grade materials for enduring durability.\n• **TOOL-FREE INSTANT SETUP:** Fast, seamless installation in seconds without complex tools.\n• **ZERO-LEAK PRECISION FIT:** Universal ergonomic seal prevents slipping or bypass.\n• **EVERYDAY CONVENIENT PERFORMANCE:** Clean, effortless daily utility for modern households.\n• **100% SATISFACTION ASSURED:** Backed by responsive 24/7 seller customer care."
        );
      }
    } catch {
      setAiAnswer("Unable to fetch response. Please try again.");
    } finally {
      setIsAsking(false);
    }
  };

  const handleCopyAiAnswer = () => {
    if (!aiAnswer) return;
    navigator.clipboard.writeText(aiAnswer);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  // Export composed 2000x2000 HD image from Canva layers
  const handleExportHd = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 2000 / 800;

    // 1. Draw background image
    const bgLayer = layers.find((l) => l.type === "background");
    const bgImgUrl = bgLayer?.imageUrl || generatedImageUrl;

    const finalizeAndDownload = () => {
      // 2. Draw visible stacked layers
      layers.forEach((l) => {
        if (!l.visible || l.type === "background") return;

        if (l.type === "product" && l.imageUrl) {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.src = l.imageUrl;
          try {
            ctx.drawImage(img, l.x * scale, l.y * scale, l.width * scale, l.height * scale);
          } catch {
            // ignore
          }
        } else if (l.type === "badge" && l.text) {
          ctx.fillStyle = l.fill || "#1E40AF";
          ctx.beginPath();
          ctx.roundRect(l.x * scale, l.y * scale, l.width * scale, l.height * scale, 24 * scale);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = `bold ${16 * scale}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(l.text, (l.x + l.width / 2) * scale, (l.y + l.height / 2) * scale);
        } else if (l.type === "text" && l.text) {
          ctx.fillStyle = l.fill || "#FFFFFF";
          ctx.font = `${l.fontWeight || "800"} ${(l.fontSize || 24) * scale}px sans-serif`;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
          ctx.shadowBlur = 10 * scale;
          ctx.fillText(l.text, l.x * scale, l.y * scale);
          ctx.shadowBlur = 0;
        }
      });

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${(productName || "Product").replace(/\s+/g, "_")}_${selectedShotType}_HD.png`);
        }
      }, "image/png");
    };

    if (bgImgUrl) {
      const bgImg = new window.Image();
      bgImg.crossOrigin = "anonymous";
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, 2000, 2000);
        finalizeAndDownload();
      };
      bgImg.onerror = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 2000, 2000);
        finalizeAndDownload();
      };
      bgImg.src = bgImgUrl;
    } else {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 2000, 2000);
      finalizeAndDownload();
    }
  };

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 select-none px-2 sm:px-4">
      {/* Hidden File / Camera Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* 1. TOP CONTROL BAR: UPLOAD + CLICK PHOTO + ASK BAR */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo & Owner Mode */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-[#121223] rounded-[10px] flex items-center justify-center text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">Listone.ai Studio</span>
              {isOwnerMode && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-emerald-400" />
                  <span>Free Owner Access</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Upload + Click Photo */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{isGenerating ? "Processing..." : "Upload Photo"}</span>
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Click Photo</span>
            </button>

            {generatedImageUrl && (
              <button
                type="button"
                onClick={handleExportHd}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download HD (2000x2000)</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. ASK BAR: EMPTY INPUT BY DEFAULT */}
        <form onSubmit={handleAskSubmit} className="mt-4 pt-3 border-t border-white/10">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="Ask anything about your listing (e.g. 5 bullet points, keywords, Amazon title, pricing)..."
              className="w-full bg-[#0A0B16] border border-white/15 focus:border-blue-500 rounded-xl px-4 py-3 pr-24 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={isAsking || !askQuery.trim()}
              className="absolute right-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {isAsking ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{isAsking ? "Thinking..." : "Ask AI"}</span>
            </button>
          </div>
        </form>

        {/* 3. AI RESPONSE CARD (GEMINI 3.5 FLASH) */}
        {aiAnswer && (
          <div className="mt-4 bg-[#090A14] border border-blue-500/30 rounded-2xl p-4 shadow-2xl relative animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">AI Listing Assistant (Gemini 3.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAiAnswer}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedAnswer ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAiAnswer(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans select-text max-h-60 overflow-y-auto pr-2">
              {aiAnswer}
            </div>
          </div>
        )}
      </div>

      {/* 4. SHOT TYPE SELECTOR (1 FOCUSED IMAGE GENERATION - NO COLLAGE!) */}
      {uploadedPhotoUrl && (
        <div className="bg-[#121223] border border-white/10 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Listing Shot:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full md:w-auto">
            {SHOT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setSelectedShotType(opt.id);
                  if (uploadedPhotoUrl) {
                    generateSingleImage(uploadedPhotoUrl, productName, opt.id);
                  }
                }}
                disabled={isGenerating}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                  selectedShotType === opt.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                }`}
              >
                <span>{opt.icon}</span>
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. MAIN WORKSPACE: IF NO PHOTO, INITIAL HERO; IF PHOTO, INTERACTIVE CANVA STUDIO */}
      {!uploadedPhotoUrl && !generatedImageUrl ? (
        <div className="flex flex-col items-center justify-center min-h-[55vh] text-center p-4 sm:p-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121223]/70 border border-white/10 shadow-2xl flex flex-col items-center max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Upload or Click a Product Photo</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-xs">
              AI analyzes your product and generates one high-quality, photorealistic listing image with full Canva editing.
            </p>

            <div className="space-y-3 w-full">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Product Photo</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Click Photo With Camera</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 6. REAL CANVA-STYLE EDITING WORKSPACE: 1 HIGH-QUALITY IMAGE WITH EDITABLE LAYERS */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT: CANVA TOOLBAR & LAYER CONTROLS */}
          <aside className="lg:col-span-1 bg-[#121223] border border-white/10 rounded-2xl p-4 space-y-5 shadow-xl">
            <div>
              <span className="text-xs font-black uppercase text-blue-400 tracking-wider block mb-1">
                Canva Layer Tools
              </span>
              <p className="text-[11px] text-slate-400">
                Click & drag layers freely. Use corner handles to resize.
              </p>
            </div>

            {/* Quick Add Elements */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 block">Add Text</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddText("headline")}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white font-bold flex items-center justify-center gap-1.5"
                >
                  <Type className="w-3.5 h-3.5 text-blue-400" />
                  <span>Headline</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddText("subtitle")}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-200 flex items-center justify-center gap-1.5"
                >
                  <Type className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Subtitle</span>
                </button>
              </div>
            </div>

            {/* Quick Add Badges */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-300 block">Add Trust Badges</span>
              <div className="space-y-1.5">
                {[
                  { text: "✦ AMAZON TOP RATED", color: "#1E40AF" },
                  { text: "✓ 100% QUALITY INSPECTED", color: "#047857" },
                  { text: "💧 100% LEAK-PROOF SEAL", color: "#0284C7" },
                  { text: "⚡ HIGH-DENSITY MICRO-MESH", color: "#4F46E5" },
                ].map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAddBadge(b.text, b.color)}
                    className="w-full p-2 rounded-xl text-left text-xs font-bold text-white flex items-center justify-between border border-white/5 hover:border-white/20 transition-colors"
                    style={{ backgroundColor: `${b.color}25` }}
                  >
                    <span>{b.text}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: b.color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Overlay Product Cutout */}
            {uploadedPhotoUrl && (
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleAddProductOverlay}
                  className="w-full p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  <span>Overlay Original Product</span>
                </button>
              </div>
            )}

            {/* Selected Layer Properties */}
            {selectedLayer && selectedLayer.id !== "layer-bg" && (
              <div className="p-3 rounded-xl bg-[#090A14] border border-blue-500/30 space-y-3 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-300">Edit Selected Layer</span>
                  <button
                    type="button"
                    onClick={handleDeleteSelectedLayer}
                    className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                    title="Delete Layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {selectedLayer.text !== undefined && (
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Text Content</label>
                    <input
                      type="text"
                      value={selectedLayer.text}
                      onChange={(e) =>
                        setLayers((prev) =>
                          prev.map((l) =>
                            l.id === selectedLayer.id ? { ...l, text: e.target.value } : l
                          )
                        )
                      }
                      className="w-full bg-[#121223] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {selectedLayer.fontSize !== undefined && (
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Font Size</span>
                      <span>{selectedLayer.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={48}
                      value={selectedLayer.fontSize}
                      onChange={(e) =>
                        setLayers((prev) =>
                          prev.map((l) =>
                            l.id === selectedLayer.id
                              ? { ...l, fontSize: parseInt(e.target.value) }
                              : l
                          )
                        )
                      }
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Regenerate Shot */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  if (uploadedPhotoUrl) {
                    generateSingleImage(uploadedPhotoUrl, productName, selectedShotType);
                  }
                }}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate This Shot</span>
              </button>
            </div>
          </aside>

          {/* RIGHT: INTERACTIVE CANVA ARTBOARD (ONE FOCUSED HIGH-QUALITY IMAGE) */}
          <main className="lg:col-span-3 flex flex-col items-center">
            {/* Loading Indicator */}
            {isGenerating && (
              <div className="w-full mb-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center justify-center gap-2 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>{generationStep || "Generating photorealistic image..."}</span>
              </div>
            )}

            {/* Canva Artboard Container */}
            <div
              ref={canvasStageRef}
              onClick={() => setSelectedLayerId(null)}
              className="relative w-full max-w-[640px] aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-200 select-none group"
            >
              {/* Layer 0: Generated Photorealistic Background Image */}
              {generatedImageUrl ? (
                <img
                  src={generatedImageUrl}
                  alt="Generated Listing Visual"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-6 text-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                  <span className="text-xs font-bold">Synthesizing realistic listing scene...</span>
                </div>
              )}

              {/* Render Stacked Draggable / Resizable Layers */}
              {layers.map((layer) => {
                if (!layer.visible || layer.type === "background") return null;

                const isSelected = selectedLayerId === layer.id;
                const isDraggingThis = dragState.isDragging && dragState.layerId === layer.id;

                // 1. Text Layer
                if (layer.type === "text") {
                  return (
                    <div
                      key={layer.id}
                      onPointerDown={(e) => handleLayerPointerDown(e, layer)}
                      onDoubleClick={() => setInlineEditingId(layer.id)}
                      className={`absolute select-none px-3 py-1.5 rounded-lg touch-none ${
                        isDraggingThis ? "cursor-grabbing" : "cursor-grab"
                      } ${
                        isSelected
                          ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-transparent shadow-xl"
                          : "hover:ring-1 hover:ring-blue-400/50"
                      }`}
                      style={{
                        left: `${(layer.x / 800) * 100}%`,
                        top: `${(layer.y / 800) * 100}%`,
                        width: `${(layer.width / 800) * 100}%`,
                        zIndex: isSelected ? 30 : 10,
                      }}
                    >
                      {inlineEditingId === layer.id ? (
                        <input
                          type="text"
                          autoFocus
                          value={layer.text || ""}
                          onChange={(e) =>
                            setLayers((prev) =>
                              prev.map((l) =>
                                l.id === layer.id ? { ...l, text: e.target.value } : l
                              )
                            )
                          }
                          onBlur={() => setInlineEditingId(null)}
                          onKeyDown={(e) => e.key === "Enter" && setInlineEditingId(null)}
                          className="bg-black/50 text-white rounded px-2 py-1 outline-none w-full"
                          style={{
                            fontSize: `${(layer.fontSize || 24) * 0.75}px`,
                            fontWeight: layer.fontWeight || "800",
                          }}
                        />
                      ) : (
                        <span
                          className="block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight select-none pointer-events-none"
                          style={{
                            fontSize: `${(layer.fontSize || 24) * 0.75}px`,
                            fontWeight: layer.fontWeight || "800",
                            color: layer.fill || "#FFFFFF",
                          }}
                        >
                          {layer.text}
                        </span>
                      )}

                      {/* Resize Corner Handle */}
                      {isSelected && (
                        <div
                          onPointerDown={(e) => handleResizePointerDown(e, layer)}
                          className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nwse-resize z-40 touch-none shadow-md"
                        />
                      )}
                    </div>
                  );
                }

                // 2. Badge Layer
                if (layer.type === "badge") {
                  return (
                    <div
                      key={layer.id}
                      onPointerDown={(e) => handleLayerPointerDown(e, layer)}
                      onDoubleClick={() => setInlineEditingId(layer.id)}
                      className={`absolute select-none flex items-center justify-center px-4 py-2 rounded-full shadow-lg touch-none ${
                        isDraggingThis ? "cursor-grabbing" : "cursor-grab"
                      } ${
                        isSelected
                          ? "ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-2xl"
                          : "hover:ring-1 hover:ring-white/50"
                      }`}
                      style={{
                        left: `${(layer.x / 800) * 100}%`,
                        top: `${(layer.y / 800) * 100}%`,
                        backgroundColor: layer.fill || "#1E40AF",
                        zIndex: isSelected ? 30 : 10,
                      }}
                    >
                      {inlineEditingId === layer.id ? (
                        <input
                          type="text"
                          autoFocus
                          value={layer.text || ""}
                          onChange={(e) =>
                            setLayers((prev) =>
                              prev.map((l) =>
                                l.id === layer.id ? { ...l, text: e.target.value } : l
                              )
                            )
                          }
                          onBlur={() => setInlineEditingId(null)}
                          onKeyDown={(e) => e.key === "Enter" && setInlineEditingId(null)}
                          className="bg-transparent text-white text-xs font-black outline-none text-center"
                        />
                      ) : (
                        <span className="text-white text-xs font-black whitespace-nowrap pointer-events-none tracking-wider">
                          {layer.text}
                        </span>
                      )}

                      {/* Resize Handle */}
                      {isSelected && (
                        <div
                          onPointerDown={(e) => handleResizePointerDown(e, layer)}
                          className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-nwse-resize z-40 touch-none shadow-md"
                        />
                      )}
                    </div>
                  );
                }

                // 3. Product Overlay Layer
                if (layer.type === "product" && layer.imageUrl) {
                  return (
                    <div
                      key={layer.id}
                      onPointerDown={(e) => handleLayerPointerDown(e, layer)}
                      className={`absolute select-none flex items-center justify-center touch-none ${
                        isDraggingThis ? "cursor-grabbing" : "cursor-grab"
                      } ${
                        isSelected
                          ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-2xl"
                          : "hover:ring-1 hover:ring-blue-400/50"
                      }`}
                      style={{
                        left: `${(layer.x / 800) * 100}%`,
                        top: `${(layer.y / 800) * 100}%`,
                        width: `${(layer.width / 800) * 100}%`,
                        height: `${(layer.height / 800) * 100}%`,
                        zIndex: isSelected ? 30 : 10,
                      }}
                    >
                      <img
                        src={layer.imageUrl}
                        alt="Product Overlay"
                        className="w-full h-full object-contain drop-shadow-2xl pointer-events-none"
                      />

                      {/* Resize Handle */}
                      {isSelected && (
                        <div
                          onPointerDown={(e) => handleResizePointerDown(e, layer)}
                          className="absolute -right-2 -bottom-2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nwse-resize z-40 touch-none shadow-md"
                        />
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-[640px]">
              <div className="text-xs text-slate-400">
                <span className="font-bold text-white">Shot: </span>
                <span>{SHOT_OPTIONS.find((s) => s.id === selectedShotType)?.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportHd}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download HD (2000x2000)</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default function ImageStudioPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-sm font-semibold">Loading Image Studio...</span>
          </div>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
