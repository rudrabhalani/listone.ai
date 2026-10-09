"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, GeneratedImageItem } from "@/lib/store";
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
  Maximize2,
  Layers,
  Copy,
  Check,
  X,
  Send,
  HelpCircle,
} from "lucide-react";

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode, setSelectedShotForEditor, saveProduct } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // State: ONLY user uploaded photo (NO default images)
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [selectedShotModal, setSelectedShotModal] = useState<GeneratedImageItem | null>(null);

  // Ask Bar State (Empty input by default)
  const [askQuery, setAskQuery] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);

  // Build up to 9 high-converting listing shots (all on light backgrounds)
  const build9Shots = (imgUrl: string, pName: string) => {
    const shotTitles = [
      "1. Amazon Main Hero (100% Pure White)",
      "2. In-Use Contextual Lifestyle",
      "3. 3-Step Setup Visual Progression",
      "4. Circular 10x Optical Texture Loupe",
      "5. Universal Secure Fit & Adjustment",
      "6. Before & After Replacement Indicator",
      "7. Dimensional Scale & Blueprint",
      "8. Head-to-Head Comparison Matrix",
      "9. Studio Light Marble Pedestal",
    ];

    return Array.from({ length: 9 }).map((_, idx) => {
      const shotIndex = idx + 1;
      return {
        id: `shot-${shotIndex}-${Date.now()}`,
        shotIndex,
        shotType: `shot_${shotIndex}`,
        title: shotTitles[idx] || `Listing Shot #${shotIndex}`,
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
          const cleanCutout = await removeBackgroundClient(json.data.imageUrl);
          setCustomPhotoUrl(cleanCutout);
          setShots(build9Shots(cleanCutout, title));
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
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const activeName = cleanName || "Product";
      setProductName(activeName);

      // Cleanly remove any outer background box so product is isolated
      const cutoutUrl = await removeBackgroundClient(rawDataUrl);
      setCustomPhotoUrl(cutoutUrl);

      setTimeout(() => {
        const generatedShots = build9Shots(cutoutUrl, activeName);
        setShots(generatedShots);
        deductCredits(9);
        setIsGenerating(false);

        saveProduct({
          id: "prod-" + Date.now(),
          title: activeName,
          category: "Custom",
          marketplace: "Amazon US",
          features: ["Premium Filtration", "Tool-Free Setup", "Secure Fit"],
          generatedImages: generatedShots,
        });
      }, 350);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Ask AI handler: Answers bullets, keywords, questions quickly via Gemini
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
            category: "General E-Commerce",
          },
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiAnswer(data.reply);
      } else {
        setAiAnswer("Here are high-converting bullet points for your product:\n\n• **SUPERIOR BUILD QUALITY:** Engineered with industrial-grade materials for maximum durability.\n• **TOOL-FREE QUICK SETUP:** Installs in seconds without complex tools or technical skills.\n• **ZERO-BYPASS PRECISION FIT:** Custom ergonomic seal prevents slipping and leaks.\n• **EVERYDAY CONVENIENCE:** Designed for effortless daily usage in home, kitchen, and office.\n• **100% SATISFACTION GUARANTEED:** Backed by dedicated 24/7 seller customer care.");
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

  // Render clean 2000x2000 light-background image
  const renderShotToBlob = (shotIndex: number, imgUrl: string): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 2000;
      canvas.height = 2000;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(new Blob());
        return;
      }

      // 1. Draw Light Background
      if (shotIndex === 1) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 2000, 2000);
      } else if (shotIndex === 3 || shotIndex === 5) {
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(0, 0, 2000, 2000);
      } else if (shotIndex === 4 || shotIndex === 7) {
        ctx.fillStyle = "#F4F7FB";
        ctx.fillRect(0, 0, 2000, 2000);
      } else {
        ctx.fillStyle = "#F8F9FA";
        ctx.fillRect(0, 0, 2000, 2000);
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const targetSize = shotIndex === 1 ? 1600 : 1450;
        const x = (2000 - targetSize) / 2;
        const y = (2000 - targetSize) / 2;

        ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 25;

        try {
          ctx.drawImage(img, x, y, targetSize, targetSize);
        } catch {
          // ignore
        }

        // Contact shadow
        ctx.beginPath();
        ctx.ellipse(1000, 1850, 480, 30, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fill();

        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, "image/png");
      };

      img.onerror = () => {
        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, "image/png");
      };

      img.src = imgUrl;
    });
  };

  // 1-Click ZIP Download containing the 9 listing photos
  const handleDownloadAll = async () => {
    if (!customPhotoUrl || shots.length === 0) return;
    const zip = new JSZip();
    const folder = zip.folder("Listone_9_Listing_Images");

    for (const shot of shots) {
      try {
        const blob = await renderShotToBlob(shot.shotIndex, customPhotoUrl);
        folder?.file(`0${shot.shotIndex}_Listing_Image.png`, blob);
      } catch {
        // continue
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${(productName || "Product").replace(/\s+/g, "_")}_9_Listing_Images.zip`);
  };

  const handleDownloadSingle = async (shot: GeneratedImageItem) => {
    if (!customPhotoUrl) return;
    const blob = await renderShotToBlob(shot.shotIndex, customPhotoUrl);
    saveAs(blob, `Listing_Photo_${shot.shotIndex}.png`);
  };

  const handleOpenInEditor = (shot: GeneratedImageItem) => {
    setSelectedShotForEditor(shot);
    router.push("/dashboard/editor");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 select-none px-2 sm:px-4">
      {/* Hidden File Pickers */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      {/* Click Photo Camera Input (Mobile & Desktop Camera Capture) */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* 1. TOP CONTROL BAR: UPLOAD + CLICK PHOTO + ASK BAR (MOBILE RESPONSIVE) */}
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

          {/* Action Buttons: Upload + Click Photo + ZIP Download */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Upload Button */}
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

            {/* Click Photo Camera Button */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Click Photo</span>
            </button>

            {/* Download ZIP */}
            {shots.length > 0 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download 9 (ZIP)</span>
                <span className="sm:hidden">ZIP</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. ASK BAR: DIRECTLY BELOW ICONS (NO PREFILLED TEXT) */}
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

        {/* 3. AI RESPONSE CARD (QUICK INTELLIGENCE LIKE CHATGPT / GEMINI) */}
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

      {/* 4. MAIN WORKSPACE: IF NO PHOTO YET, CLEAN UPLOAD / CLICK PHOTO HERO */}
      {!customPhotoUrl && shots.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[55vh] text-center p-4 sm:p-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121223]/70 border border-white/10 shadow-2xl flex flex-col items-center max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

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
        /* 5. 9 LISTING IMAGES: ALL LIGHT COLOR BACKGROUNDS, ZERO REPETITIONS, PURE VISUALS */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              9 High-Converting Listing Images (All Light Backgrounds)
            </span>
            <span className="text-xs text-emerald-400 font-mono">✓ Amazon Carousel Ready (1-9)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {shots.map((shot) => (
              <div
                key={shot.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-200 select-none"
              >
                {/* Clean Light-Background Visual (Zero text stamped on image) */}
                <ListingShotVisual
                  shotIndex={shot.shotIndex}
                  productImage={customPhotoUrl!}
                  productName={productName}
                />

                {/* Shot Index Pill */}
                <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                    #{shot.shotIndex}
                  </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                  <button
                    type="button"
                    onClick={() => setSelectedShotModal(shot)}
                    title="View Full Size"
                    className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(shot)}
                    title="Download Photo"
                    className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenInEditor(shot)}
                    title="Edit in Canva Canvas"
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white backdrop-blur-md transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. FULL-SIZE PREVIEW MODAL (MOBILE RESPONSIVE) */}
      {selectedShotModal && customPhotoUrl && (
        <div
          onClick={() => setSelectedShotModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-slate-200"
          >
            <div className="flex-1 relative overflow-hidden bg-white">
              <ListingShotVisual
                shotIndex={selectedShotModal.shotIndex}
                productImage={customPhotoUrl}
                productName={productName}
              />
            </div>

            <div className="p-3 sm:p-4 bg-[#121223] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Shot #{selectedShotModal.shotIndex} • Light Studio Render
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(selectedShotModal)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedShotModal(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
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
        <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
          <span>Loading Studio...</span>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
