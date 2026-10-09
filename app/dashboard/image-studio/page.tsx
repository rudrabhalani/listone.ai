"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, GeneratedImageItem } from "@/lib/store";
import { PRODUCT_CATEGORIES, getRealisticShotsForProduct } from "@/lib/realistic-images";
import { ListingShotVisual } from "@/components/dashboard/ListingShotVisual";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  Crown,
  Maximize2,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode, setSelectedShotForEditor, saveProduct } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compact Chat Bar Input State
  const [promptInput, setPromptInput] = useState("");
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(
    PRODUCT_CATEGORIES[0].defaultImage
  );
  const [productName, setProductName] = useState(PRODUCT_CATEGORIES[0].defaultName);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [selectedShotModal, setSelectedShotModal] = useState<GeneratedImageItem | null>(null);

  // Build 15 Clean Visual Shots (Zero Text Overlays)
  const build15Shots = (imgUrl: string, pName: string) => {
    const presets = getRealisticShotsForProduct("shoes", imgUrl, pName);
    return presets.map((p) => ({
      id: `shot-${p.shotIndex}-${Date.now()}`,
      shotIndex: p.shotIndex,
      shotType: p.shotType,
      title: p.title,
      description: p.description,
      previewUrl: imgUrl,
      status: "ready" as const,
      layers: [
        {
          id: `bg-${p.shotIndex}`,
          type: "background" as const,
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
          type: "product" as const,
          name: "Product Image",
          imageUrl: imgUrl,
          x: 120,
          y: 120,
          width: 560,
          height: 560,
          locked: false,
          visible: true,
        },
      ],
    }));
  };

  // Initial mount
  useEffect(() => {
    const initialShots = build15Shots(
      customPhotoUrl || PRODUCT_CATEGORIES[0].defaultImage,
      productName
    );
    setShots(initialShots);
  }, []);

  // Handle ASIN URL query parameter
  useEffect(() => {
    const asinParam = searchParams.get("asin");
    if (asinParam) {
      setPromptInput(asinParam);
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
        setProductName(json.data.title);
        const img = json.data.imageUrl || PRODUCT_CATEGORIES[0].defaultImage;
        setCustomPhotoUrl(img);
        const updatedShots = build15Shots(img, json.data.title);
        setShots(updatedShots);
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  // File upload via compact chat bar
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCustomPhotoUrl(dataUrl);
        setIsGenerating(true);
        setTimeout(() => {
          const updatedShots = build15Shots(dataUrl, productName);
          setShots(updatedShots);
          setIsGenerating(false);
        }, 300);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fast generation
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const activeImg = customPhotoUrl || PRODUCT_CATEGORIES[0].defaultImage;
      const updatedShots = build15Shots(activeImg, productName);
      setShots(updatedShots);
      deductCredits(15);
      setIsGenerating(false);

      saveProduct({
        id: "prod-" + Date.now(),
        title: productName,
        category: "General",
        marketplace: "Amazon US",
        features: ["Premium Quality", "Durable Build", "Ergonomic Use"],
        generatedImages: updatedShots,
      });
    }, 300);
  };

  // Render clean 2000x2000 image without writing any text
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

      // Background only
      if (shotIndex === 1) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 2000, 2000);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 2000, 2000);
        grad.addColorStop(0, "#0F1123");
        grad.addColorStop(0.5, "#181A36");
        grad.addColorStop(1, "#0A0B14");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2000, 2000);
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const targetSize = shotIndex === 1 ? 1600 : 1450;
        const x = (2000 - targetSize) / 2;
        const y = (2000 - targetSize) / 2;

        ctx.shadowColor = shotIndex === 1 ? "rgba(0, 0, 0, 0.16)" : "rgba(0, 0, 0, 0.65)";
        ctx.shadowBlur = 45;
        ctx.shadowOffsetY = 30;

        try {
          ctx.drawImage(img, x, y, targetSize, targetSize);
        } catch {
          // ignore
        }

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

  // 1-Click ZIP Download containing ONLY the 15 clean photos
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder("Listone_15_Listing_Images");
    const activeImg = customPhotoUrl || PRODUCT_CATEGORIES[0].defaultImage;

    for (const shot of shots) {
      try {
        const blob = await renderShotToBlob(shot.shotIndex, activeImg);
        folder?.file(`0${shot.shotIndex}_Listing_Image.png`, blob);
      } catch {
        // continue
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "Listone_15_Listing_Images.zip");
  };

  const handleDownloadSingle = async (shot: GeneratedImageItem) => {
    const activeImg = customPhotoUrl || PRODUCT_CATEGORIES[0].defaultImage;
    const blob = await renderShotToBlob(shot.shotIndex, activeImg);
    saveAs(blob, `Listing_Photo_${shot.shotIndex}.png`);
  };

  const handleOpenInEditor = (shot: GeneratedImageItem) => {
    setSelectedShotForEditor(shot);
    router.push("/dashboard/editor");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* 1. COMPACT STUDIO HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#121223] rounded-[14px] flex items-center justify-center text-pink-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-extrabold font-heading text-white">
                15 Listing Images
              </h1>
              {isOwnerMode && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-emerald-400" />
                  <span>Free Owner Access</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 1-Click ZIP Download */}
        <button
          onClick={handleDownloadAll}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-900/30 flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download All 15 Images (ZIP)</span>
        </button>
      </div>

      {/* 2. SMALL, SLEEK CHAT BAR (NO SUGGESTIONS, CLEAN & MINIMAL) */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-2.5 shadow-xl">
        <div className="flex items-center gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          {/* Attach Image Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Upload className="w-4 h-4 text-brand-pink" />
            <span className="hidden sm:inline">
              {customPhotoUrl && customPhotoUrl !== PRODUCT_CATEGORIES[0].defaultImage
                ? "Change Photo"
                : "Upload Photo"}
            </span>
          </button>

          {/* Compact Input */}
          <input
            type="text"
            value={promptInput}
            onChange={(e) => {
              setPromptInput(e.target.value);
              if (e.target.value.trim().length > 3) {
                setProductName(e.target.value.trim());
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Type product name or paste Amazon ASIN to generate 15 photos..."
            className="flex-1 bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
          />

          {/* Fast Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-md shadow-brand-violet/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isGenerating ? "Generating..." : "Generate"}</span>
          </button>
        </div>
      </div>

      {/* 3. CLEAN 15-IMAGE GALLERY: ONLY IMAGES (NO CONTENT BELOW IMAGES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {shots.map((shot) => (
          <div
            key={shot.id}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0A0A12] border border-white/10 hover:border-brand-pink/50 shadow-lg transition-all duration-200 hover:-translate-y-1 select-none"
          >
            {/* Clean Visual (Zero Text On Image) */}
            <ListingShotVisual
              shotIndex={shot.shotIndex}
              productImage={customPhotoUrl || shot.previewUrl}
              productName={productName}
            />

            {/* Shot Number Indicator */}
            <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                #{shot.shotIndex}
              </span>
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
              <button
                onClick={() => setSelectedShotModal(shot)}
                title="View Full Size"
                className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDownloadSingle(shot)}
                title="Download Photo"
                className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenInEditor(shot)}
                title="Edit in Canva Canvas"
                className="p-2.5 rounded-xl bg-brand-violet hover:bg-brand-pink text-white backdrop-blur-md transition-colors"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. FULL-SIZE PREVIEW MODAL */}
      {selectedShotModal && (
        <div
          onClick={() => setSelectedShotModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full aspect-square bg-[#0B0B14] rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between"
          >
            <div className="flex-1 relative overflow-hidden">
              <ListingShotVisual
                shotIndex={selectedShotModal.shotIndex}
                productImage={customPhotoUrl || selectedShotModal.previewUrl}
                productName={productName}
              />
            </div>

            <div className="p-4 bg-[#121223] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Shot #{selectedShotModal.shotIndex} • High-Resolution Studio Render
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingle(selectedShotModal)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
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
          <RefreshCw className="w-5 h-5 animate-spin text-brand-pink" />
          <span>Loading Studio...</span>
        </div>
      }
    >
      <ImageStudioContent />
    </React.Suspense>
  );
}
