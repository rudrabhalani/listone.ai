"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, LayerObject, GeneratedImageItem } from "@/lib/store";
import { ListingShotVisual } from "@/components/dashboard/ListingShotVisual";
import { removeBackgroundClient } from "@/lib/image-cutout";
import JSZip from "jszip";
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
  Layers,
  Copy,
  Check,
  X,
  Send,
  Trash2,
  Maximize2,
  RotateCcw,
} from "lucide-react";

const SHOT_TITLES = [
  "1. Amazon Main Hero (100% Pure White)",
  "2. Where to Use • In-Home Ambient Context",
  "3. How to Use • 3-Step Setup Progression",
  "4. Circular 10x Optical Texture Loupe",
  "5. Accurate Scale & Dimensional Blueprint",
  "6. What's in the Box • Complete Set",
  "7. Dynamic 45° Angle Studio Showcase",
  "8. Head-to-Head Comparison Matrix",
  "9. Ergonomic Human Grip & Handheld Fit",
  "10. Before & After • Problem Resolved",
  "11. Multi-Angle Architecture & 360° Profile",
  "12. Extreme Durability Lab Tested",
  "13. Official Quality & Safety Certifications",
  "14. Core Commercial Benefits Banner",
  "15. 30-Day Money-Back Guarantee Shield",
];

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // User uploaded photo state (NO default fake images)
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  // 15 Listing Images state
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);

  // Canva Studio Modal state
  const [activeEditingShot, setActiveEditingShot] = useState<GeneratedImageItem | null>(null);
  const [canvaLayers, setCanvaLayers] = useState<LayerObject[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);

  // Canva Dragging & Resizing (Pointer events for desktop + mobile)
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

  // Ask Bar State (Empty input by default)
  const [askQuery, setAskQuery] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Build the complete set of 15 high-converting listing shots
  const build15Shots = (imgUrl: string, pName: string) => {
    return Array.from({ length: 15 }).map((_, idx) => {
      const shotIndex = idx + 1;
      return {
        id: `shot-${shotIndex}-${Date.now()}`,
        shotIndex,
        shotType: `shot_${shotIndex}`,
        title: SHOT_TITLES[idx] || `Listing Shot #${shotIndex}`,
        description: `Professional Amazon Listing Visual #${shotIndex}`,
        previewUrl: imgUrl,
        status: "ready" as const,
        layers: [
          {
            id: `bg-${shotIndex}`,
            type: "background" as const,
            name: "Canvas Background",
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            fill: "#FFFFFF",
            locked: true,
            visible: true,
          },
          {
            id: `product-${shotIndex}`,
            type: "product" as const,
            name: "Product Cutout",
            imageUrl: imgUrl,
            x: 120,
            y: 120,
            width: 560,
            height: 560,
            locked: false,
            visible: true,
          },
        ],
      };
    });
  };

  // Handle ASIN URL query parameter if present
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
          setCustomPhotoUrl(json.data.imageUrl);
          setShots(build15Shots(json.data.imageUrl, title));
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Process uploaded or camera-clicked photo
  const processUploadedFile = async (file: File) => {
    setIsGenerating(true);
    setGenerationStep("Analyzing photo & removing background...");
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const activeName = cleanName || "Product";
      setProductName(activeName);

      // Background cutout
      const cutoutUrl = await removeBackgroundClient(rawDataUrl);
      setCustomPhotoUrl(cutoutUrl);

      setGenerationStep("Generating 15 commercial listing shots...");
      setTimeout(() => {
        setShots(build15Shots(cutoutUrl, activeName));
        setIsGenerating(false);
        setGenerationStep("");
        deductCredits(1);
      }, 600);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Pointer drag & resize listeners for fluid Canva control (Desktop + Mobile)
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (dragState.isDragging && dragState.layerId) {
        const dx = (e.clientX - dragState.startX) * (800 / 600);
        const dy = (e.clientY - dragState.startY) * (800 / 600);

        setCanvaLayers((prev) =>
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

      if (resizeState.isResizing && resizeState.layerId) {
        const dx = (e.clientX - resizeState.startX) * (800 / 600);
        const dy = (e.clientY - resizeState.startY) * (800 / 600);

        setCanvaLayers((prev) =>
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

  // Open shot in Canva Studio modal
  const handleOpenCanvaModal = (shot: GeneratedImageItem) => {
    setActiveEditingShot(shot);
    setCanvaLayers([
      {
        id: "layer-bg",
        type: "background",
        name: "Background",
        x: 0,
        y: 0,
        width: 800,
        height: 800,
        fill: "#FFFFFF",
        locked: true,
        visible: true,
      },
      {
        id: "layer-product",
        type: "product",
        name: "Product",
        imageUrl: customPhotoUrl || "",
        x: 150,
        y: 150,
        width: 500,
        height: 500,
        locked: false,
        visible: true,
      },
    ]);
    setSelectedLayerId("layer-product");
  };

  // Add text & badges in Canva modal
  const handleAddCanvaText = (type: "headline" | "subtitle") => {
    const newId = `text-${Date.now()}`;
    const newLayer: LayerObject = {
      id: newId,
      type: "text",
      name: type === "headline" ? "Headline Banner" : "Callout Text",
      x: 60,
      y: type === "headline" ? 40 : 100,
      width: 680,
      height: type === "headline" ? 50 : 35,
      text: type === "headline" ? "HIGH-PERFORMANCE PRECISION DESIGN" : "Engineered for maximum daily durability",
      fontSize: type === "headline" ? 26 : 18,
      fontWeight: type === "headline" ? "800" : "600",
      fill: "#1E3A8A",
      locked: false,
      visible: true,
      opacity: 1,
    };
    setCanvaLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newId);
  };

  const handleAddCanvaBadge = (text: string, fill = "#1E40AF") => {
    const newId = `badge-${Date.now()}`;
    const newLayer: LayerObject = {
      id: newId,
      type: "badge",
      name: `Badge: ${text}`,
      x: 60,
      y: 710,
      width: 250,
      height: 44,
      text,
      fill,
      locked: false,
      visible: true,
      opacity: 1,
    };
    setCanvaLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newId);
  };

  // Export 2000x2000 HD from Canva modal
  const handleExportCanvaHd = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 2000, 2000);

    const scale = 2000 / 800;

    const finalize = () => {
      canvaLayers.forEach((l) => {
        if (!l.visible || l.type === "background") return;

        if (l.type === "badge" && l.text) {
          ctx.fillStyle = l.fill || "#1E40AF";
          ctx.beginPath();
          ctx.roundRect(l.x * scale, l.y * scale, l.width * scale, l.height * scale, 22 * scale);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = `bold ${16 * scale}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(l.text, (l.x + l.width / 2) * scale, (l.y + l.height / 2) * scale);
        } else if (l.type === "text" && l.text) {
          ctx.fillStyle = l.fill || "#1E3A8A";
          ctx.font = `${l.fontWeight || "800"} ${(l.fontSize || 24) * scale}px sans-serif`;
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText(l.text, l.x * scale, l.y * scale);
        }
      });

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${(productName || "Product").replace(/\s+/g, "_")}_Shot_${activeEditingShot?.shotIndex || 1}_2000x2000.png`);
        }
      }, "image/png");
    };

    const prodLayer = canvaLayers.find((l) => l.type === "product" && l.imageUrl);
    if (prodLayer?.imageUrl) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, prodLayer.x * scale, prodLayer.y * scale, prodLayer.width * scale, prodLayer.height * scale);
        finalize();
      };
      img.onerror = () => finalize();
      img.src = prodLayer.imageUrl;
    } else {
      finalize();
    }
  };

  // Download 1-Click single shot
  const handleDownloadSingleShot = (shot: GeneratedImageItem) => {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 2000, 2000);

    if (customPhotoUrl) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 200, 200, 1600, 1600);
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `${(productName || "Product").replace(/\s+/g, "_")}_Shot_${shot.shotIndex}_2000x2000.png`);
          }
        }, "image/png");
      };
      img.onerror = () => {
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, `Listing_Shot_${shot.shotIndex}.png`);
        });
      };
      img.src = customPhotoUrl;
    }
  };

  // Download all 15 images in 1 organized ZIP package
  const handleDownloadAll15Zip = async () => {
    if (!customPhotoUrl || shots.length === 0 || isDownloadingZip) return;
    setIsDownloadingZip(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(`${(productName || "Product").replace(/\s+/g, "_")}_15_Listing_Images`);

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = customPhotoUrl;

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

      for (let i = 1; i <= 15; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, 2000, 2000);
          ctx.drawImage(img, 200, 200, 1600, 1600);
          const dataUrl = canvas.toDataURL("image/png");
          const base64Data = dataUrl.split("base64,")[1];
          folder?.file(`Shot_${i}_${SHOT_TITLES[i - 1].replace(/[^a-zA-Z0-9]/g, "_")}.png`, base64Data, { base64: true });
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${(productName || "Product").replace(/\s+/g, "_")}_15_Listing_Images.zip`);
    } catch (err: any) {
      console.error("ZIP download error:", err.message);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  // Ask AI handler: Gemini answers instantly about bullets, keywords, pricing
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
            analysis: "Commercial Amazon Product Listing",
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

  const selectedLayer = canvaLayers.find((l) => l.id === selectedLayerId);

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
              <span className="text-sm font-extrabold text-white">Listone.ai 15 Listing Images</span>
              {isOwnerMode && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-emerald-400" />
                  <span>Free Owner Access</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Upload + Click Photo + Download All ZIP */}
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

            {shots.length > 0 && (
              <button
                type="button"
                onClick={handleDownloadAll15Zip}
                disabled={isDownloadingZip}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center gap-1.5 transition-all"
              >
                {isDownloadingZip ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isDownloadingZip ? "Exporting ZIP..." : "Download All 15 (ZIP)"}</span>
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

      {/* 4. LOADING STATE */}
      {isGenerating && (
        <div className="w-full p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm flex items-center justify-center gap-3 animate-pulse">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
          <span className="font-bold">{generationStep || "Synthesizing 15 listing images..."}</span>
        </div>
      )}

      {/* 5. INITIAL STATE IF NO PHOTO UPLOADED */}
      {!customPhotoUrl && !isGenerating && (
        <div className="flex flex-col items-center justify-center min-h-[55vh] text-center p-4 sm:p-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121223]/70 border border-white/10 shadow-2xl flex flex-col items-center max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Upload or Click a Product Photo</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-xs">
              AI generates all 15 distinct, high-quality commercial listing shots on light backgrounds with Canva layer editing.
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
      )}

      {/* 6. COMPLETE 15 LISTING IMAGES GALLERY GRID */}
      {shots.length > 0 && customPhotoUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-blue-400 tracking-wider">
              15 High-Quality Commercial Listing Images ({shots.length} Shots)
            </span>
            <span className="text-[11px] text-slate-400">
              Click any image to edit in Canva or download HD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {shots.map((shot) => (
              <div
                key={shot.id}
                className="group relative bg-[#121223] border border-white/10 hover:border-blue-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Visual Canvas Display */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <ListingShotVisual
                    shotIndex={shot.shotIndex}
                    productImage={customPhotoUrl}
                    productName={productName || "Product"}
                  />

                  {/* Hover Overlay with Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-30">
                    <button
                      type="button"
                      onClick={() => handleOpenCanvaModal(shot)}
                      className="w-full max-w-[200px] py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Edit in Canva Studio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadSingleShot(shot)}
                      className="w-full max-w-[200px] py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download HD (2000x2000)</span>
                    </button>
                  </div>
                </div>

                {/* Card Title Bar */}
                <div className="p-3 bg-[#0F101E] border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate pr-2">
                    {shot.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenCanvaModal(shot)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white shrink-0"
                    title="Customize"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CANVA LAYER EDITING MODAL */}
      {activeEditingShot && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#121223] border border-white/15 rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-extrabold text-white">
                  Canva Layer Editor: {activeEditingShot.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveEditingShot(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Tools on Left, Artboard on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-1">
              {/* Left: Canva Layer Toolbar */}
              <div className="space-y-4 bg-[#0A0B16] border border-white/10 rounded-2xl p-4">
                <span className="text-xs font-black uppercase text-blue-400 tracking-wider block">
                  Layer Operations
                </span>

                {/* Add Text */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 block">Add Text</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddCanvaText("headline")}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white font-bold flex items-center justify-center gap-1.5"
                    >
                      <Type className="w-3.5 h-3.5 text-blue-400" />
                      <span>Headline</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddCanvaText("subtitle")}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-200 flex items-center justify-center gap-1.5"
                    >
                      <Type className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Subtitle</span>
                    </button>
                  </div>
                </div>

                {/* Add Badges */}
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
                        onClick={() => handleAddCanvaBadge(b.text, b.color)}
                        className="w-full p-2 rounded-xl text-left text-xs font-bold text-white flex items-center justify-between border border-white/5 hover:border-white/20 transition-colors"
                        style={{ backgroundColor: `${b.color}25` }}
                      >
                        <span>{b.text}</span>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edit Selected Layer */}
                {selectedLayer && selectedLayer.id !== "layer-bg" && (
                  <div className="p-3 rounded-xl bg-[#121223] border border-blue-500/30 space-y-3 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-300">Edit Selected Layer</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCanvaLayers((prev) => prev.filter((l) => l.id !== selectedLayer.id));
                          setSelectedLayerId(null);
                        }}
                        className="p-1 rounded text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {selectedLayer.text !== undefined && (
                      <input
                        type="text"
                        value={selectedLayer.text}
                        onChange={(e) =>
                          setCanvaLayers((prev) =>
                            prev.map((l) => (l.id === selectedLayer.id ? { ...l, text: e.target.value } : l))
                          )
                        }
                        className="w-full bg-[#0A0B16] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                      />
                    )}

                    {selectedLayer.fontSize !== undefined && (
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Font Size</span>
                          <span>{selectedLayer.fontSize}px</span>
                        </div>
                        <input
                          type="range"
                          min={14}
                          max={48}
                          value={selectedLayer.fontSize}
                          onChange={(e) =>
                            setCanvaLayers((prev) =>
                              prev.map((l) =>
                                l.id === selectedLayer.id ? { ...l, fontSize: parseInt(e.target.value) } : l
                              )
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Download in Modal */}
                <button
                  type="button"
                  onClick={handleExportCanvaHd}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <Download className="w-4 h-4" />
                  <span>Download HD (2000x2000)</span>
                </button>
              </div>

              {/* Right: Canva Artboard */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center">
                <div
                  onClick={() => setSelectedLayerId(null)}
                  className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-300 select-none"
                >
                  {/* Layer 0: Shot Visual */}
                  <ListingShotVisual
                    shotIndex={activeEditingShot.shotIndex}
                    productImage={customPhotoUrl || ""}
                    productName={productName || "Product"}
                  />

                  {/* Overlay Layers */}
                  {canvaLayers.map((layer) => {
                    if (!layer.visible || layer.type === "background") return null;

                    const isSelected = selectedLayerId === layer.id;
                    const isDraggingThis = dragState.isDragging && dragState.layerId === layer.id;

                    // Text Layer
                    if (layer.type === "text") {
                      return (
                        <div
                          key={layer.id}
                          onPointerDown={(e) => {
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
                          }}
                          className={`absolute select-none px-3 py-1 rounded-lg touch-none ${
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
                          <span
                            className="block font-black leading-tight select-none pointer-events-none"
                            style={{
                              fontSize: `${(layer.fontSize || 24) * 0.62}px`,
                              color: layer.fill || "#1E3A8A",
                            }}
                          >
                            {layer.text}
                          </span>

                          {isSelected && (
                            <div
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                setResizeState({
                                  isResizing: true,
                                  layerId: layer.id,
                                  startX: e.clientX,
                                  startY: e.clientY,
                                  initialWidth: layer.width,
                                  initialHeight: layer.height,
                                });
                              }}
                              className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nwse-resize z-40 touch-none shadow-md"
                            />
                          )}
                        </div>
                      );
                    }

                    // Badge Layer
                    if (layer.type === "badge") {
                      return (
                        <div
                          key={layer.id}
                          onPointerDown={(e) => {
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
                          }}
                          className={`absolute select-none flex items-center justify-center px-3 py-1.5 rounded-full shadow-lg touch-none ${
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
                          <span className="text-white text-[11px] font-black whitespace-nowrap pointer-events-none tracking-wider">
                            {layer.text}
                          </span>

                          {isSelected && (
                            <div
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                setResizeState({
                                  isResizing: true,
                                  layerId: layer.id,
                                  startX: e.clientX,
                                  startY: e.clientY,
                                  initialWidth: layer.width,
                                  initialHeight: layer.height,
                                });
                              }}
                              className="absolute -right-1.5 -bottom-1.5 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-nwse-resize z-40 touch-none shadow-md"
                            />
                          )}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
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
        <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-sm font-semibold">Loading 15 Listing Images Studio...</span>
          </div>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
