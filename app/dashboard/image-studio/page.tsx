"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp, GeneratedImageItem } from "@/lib/store";
import { getRealisticShotsForProduct } from "@/lib/realistic-images";
import { ListingShotVisual } from "@/components/dashboard/ListingShotVisual";
import { removeBackgroundClient } from "@/lib/image-cutout";
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
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode, setSelectedShotForEditor, saveProduct } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core State: ONLY user uploaded photo (NO default red shoes!)
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [selectedShotModal, setSelectedShotModal] = useState<GeneratedImageItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to build 15 clean visual shots with the user's uploaded product
  const build15Shots = (imgUrl: string, pName: string) => {
    const presets = getRealisticShotsForProduct("custom", imgUrl, pName);
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
    }));
  };

  // Handle ASIN URL query parameter if present
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
        const title = json.data.title || "My Product";
        setProductName(title);
        if (json.data.imageUrl) {
          const cleanCutout = await removeBackgroundClient(json.data.imageUrl);
          setCustomPhotoUrl(cleanCutout);
          setShots(build15Shots(cleanCutout, title));
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  // Process uploaded user photo directly: removes background box & generates 15 shots
  const processUploadedFile = async (file: File) => {
    setIsGenerating(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const activeName = productName || cleanName || "My Product";
      setProductName(activeName);

      // Remove any surrounding background color box so product is cleanly isolated
      const cutoutUrl = await removeBackgroundClient(rawDataUrl);
      setCustomPhotoUrl(cutoutUrl);

      setTimeout(() => {
        const generatedShots = build15Shots(cutoutUrl, activeName);
        setShots(generatedShots);
        deductCredits(15);
        setIsGenerating(false);

        saveProduct({
          id: "prod-" + Date.now(),
          title: activeName,
          category: "Custom",
          marketplace: "Amazon US",
          features: ["Premium Build", "Tested Durability", "Ergonomic Use"],
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

  const handleRegenerate = () => {
    if (!customPhotoUrl) return;
    setIsGenerating(true);
    setTimeout(() => {
      const activeName = promptInput.trim() || productName || "My Product";
      setProductName(activeName);
      setShots(build15Shots(customPhotoUrl, activeName));
      setIsGenerating(false);
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
    if (!customPhotoUrl || shots.length === 0) return;
    const zip = new JSZip();
    const folder = zip.folder("Listone_15_Listing_Images");

    for (const shot of shots) {
      try {
        const blob = await renderShotToBlob(shot.shotIndex, customPhotoUrl);
        folder?.file(`0${shot.shotIndex}_Listing_Image.png`, blob);
      } catch {
        // continue
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${(productName || "Product").replace(/\s+/g, "_")}_15_Listing_Images.zip`);
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
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* 1. STUDIO HEADER */}
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
                All-In-One Listing Studio
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

        {shots.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-900/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All 15 Images (ZIP)</span>
          </button>
        )}
      </div>

      {/* 2. COMPACT CHAT BAR (NO SUGGESTIONS, SIMPLE & CLEAR) */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-2.5 shadow-xl">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          {/* Attach / Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Upload className="w-4 h-4 text-brand-pink" />
            <span className="hidden sm:inline">
              {customPhotoUrl ? "Change Photo" : "Upload Product Photo"}
            </span>
          </button>

          {/* Compact Prompt / ASIN Input */}
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (customPhotoUrl ? handleRegenerate() : handleAsinLookup(promptInput))}
            placeholder={
              customPhotoUrl
                ? "Type to refine product name or press Enter..."
                : "Attach product photo or enter Amazon ASIN to generate 15 photos..."
            }
            className="flex-1 bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
          />

          {/* Action Button */}
          <button
            type="button"
            onClick={() => {
              if (customPhotoUrl) {
                handleRegenerate();
              } else if (promptInput.trim()) {
                handleAsinLookup(promptInput);
              } else {
                fileInputRef.current?.click();
              }
            }}
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

      {/* 3. MAIN WORKSPACE: IF NO PHOTO UPLOADED YET, SHOW CLEAN UPLOAD DROPZONE */}
      {!customPhotoUrl && shots.length === 0 ? (
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
              processUploadedFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-12 sm:p-20 text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
            isDragging
              ? "border-brand-pink bg-brand-pink/5 scale-[1.01]"
              : "border-white/15 hover:border-brand-violet/60 bg-[#121223]/60 hover:bg-[#121223]"
          }`}
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-indigo/20 via-brand-violet/20 to-brand-pink/20 border border-white/15 flex items-center justify-center text-brand-pink mb-5 shadow-2xl">
            <Upload className="w-9 h-9" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Upload Your Product Photo
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
            Drag & drop your product photo here or click to browse. Listone.ai automatically isolates your product and generates 15 high-converting listing photos.
          </p>

          <button
            type="button"
            className="mt-6 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo to-brand-pink shadow-lg shadow-brand-violet/25 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Select Product Image (PNG, JPG, WebP)</span>
          </button>
        </div>
      ) : (
        /* 4. CLEAN 15-IMAGE GALLERY: ONLY IMAGES (NO CONTENT BELOW IMAGES) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {shots.map((shot) => (
            <div
              key={shot.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0A0A12] border border-white/10 hover:border-brand-pink/50 shadow-lg transition-all duration-200 hover:-translate-y-1 select-none"
            >
              {/* Clean Visual of User's Product (Zero Text On Image) */}
              <ListingShotVisual
                shotIndex={shot.shotIndex}
                productImage={customPhotoUrl!}
                productName={productName}
              />

              {/* Shot Index Badge */}
              <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                  #{shot.shotIndex}
                </span>
              </div>

              {/* Hover Actions Overlay */}
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
      )}

      {/* 5. FULL-SIZE PREVIEW MODAL */}
      {selectedShotModal && customPhotoUrl && (
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
                productImage={customPhotoUrl}
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
