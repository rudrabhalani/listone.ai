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
} from "lucide-react";

function ImageStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deductCredits, isOwnerMode, setSelectedShotForEditor, saveProduct } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State: ONLY user uploaded photo (NO default images)
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shots, setShots] = useState<GeneratedImageItem[]>([]);
  const [selectedShotModal, setSelectedShotModal] = useState<GeneratedImageItem | null>(null);

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
      const activeName = cleanName || "Product";
      setProductName(activeName);

      // Cleanly remove any outer background box so product is isolated
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

  // Render clean 2000x2000 image matching each shot's realistic atmosphere
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

      // 1. Draw Background
      if (shotIndex === 1) {
        // Amazon Main: Pure White RGB 255
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 2000, 2000);
      } else if (shotIndex === 10) {
        // Bright Marble / Vanity Setting
        const grad = ctx.createLinearGradient(0, 0, 0, 2000);
        grad.addColorStop(0, "#F3F4F8");
        grad.addColorStop(0.5, "#E8EBF2");
        grad.addColorStop(1, "#DDE1EC");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2000, 2000);
      } else if (shotIndex === 2) {
        // Desk / Workspace Warm Tones
        const grad = ctx.createLinearGradient(0, 0, 2000, 2000);
        grad.addColorStop(0, "#26211C");
        grad.addColorStop(0.5, "#1E1915");
        grad.addColorStop(1, "#120F0D");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2000, 2000);
      } else if (shotIndex === 11) {
        // Warm Outdoor Sunlit
        const grad = ctx.createLinearGradient(0, 0, 2000, 2000);
        grad.addColorStop(0, "#2D2114");
        grad.addColorStop(0.5, "#3B2B1B");
        grad.addColorStop(1, "#1B140B");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2000, 2000);
      } else {
        // Studio & Ambient Gradients
        const grad = ctx.createLinearGradient(0, 0, 2000, 2000);
        grad.addColorStop(0, "#0F1123");
        grad.addColorStop(0.5, "#161833");
        grad.addColorStop(1, "#0A0B16");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 2000, 2000);
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (shotIndex === 14) {
          // Dual Perspective: Front + Angled Side-by-Side
          const targetW = 850;
          const targetH = 1200;
          
          // Left: Front
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 40;
          ctx.shadowOffsetY = 30;
          ctx.drawImage(img, 120, 400, targetW, targetH);

          // Right: 3/4 Angled
          ctx.save();
          ctx.translate(1450, 1000);
          ctx.rotate((6 * Math.PI) / 180);
          ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
          ctx.restore();
        } else if (shotIndex === 5) {
          // 10x Macro: Zoomed scale
          const zoomSize = 2400;
          const x = (2000 - zoomSize) / 2;
          const y = (2000 - zoomSize) / 2;
          ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
          ctx.shadowBlur = 50;
          ctx.shadowOffsetY = 40;
          ctx.drawImage(img, x, y, zoomSize, zoomSize);
        } else if (shotIndex === 9) {
          // Profile Angle
          const targetSize = 1450;
          ctx.save();
          ctx.translate(1000, 1000);
          ctx.rotate((6 * Math.PI) / 180);
          ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
          ctx.shadowBlur = 45;
          ctx.shadowOffsetY = 30;
          ctx.drawImage(img, -targetSize / 2, -targetSize / 2, targetSize, targetSize);
          ctx.restore();
        } else {
          // Standard Single-Subject Focus
          const targetSize = shotIndex === 1 ? 1600 : 1450;
          const x = (2000 - targetSize) / 2;
          const y = (2000 - targetSize) / 2;

          ctx.shadowColor =
            shotIndex === 1
              ? "rgba(0, 0, 0, 0.14)"
              : shotIndex === 10
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = shotIndex === 1 ? 35 : 45;
          ctx.shadowOffsetY = 30;

          try {
            ctx.drawImage(img, x, y, targetSize, targetSize);
          } catch {
            // ignore
          }

          // Contact shadow on floor for realism
          if (shotIndex === 1) {
            ctx.beginPath();
            ctx.ellipse(1000, 1850, 500, 35, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
            ctx.fill();
          }
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
    <div className="max-w-7xl mx-auto space-y-6 pb-20 select-none">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* 1. TOP BAR: ONLY UPLOAD BUTTON THEN NOTHING (SIMPLE AND CLEAR) */}
      <div className="flex items-center justify-between gap-4 bg-[#121223] border border-white/10 rounded-2xl p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121223] rounded-[10px] flex items-center justify-center text-pink-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Listone.ai</span>
            {isOwnerMode && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                <Crown className="w-3 h-3 text-emerald-400" />
                <span>Owner Free Access</span>
              </span>
            )}
          </div>
        </div>

        {/* Small Only Upload Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-md shadow-brand-violet/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>
              {isGenerating
                ? "Generating..."
                : customPhotoUrl
                ? "Upload New Photo"
                : "Upload Product Photo"}
            </span>
          </button>

          {shots.length > 0 && (
            <button
              onClick={handleDownloadAll}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download All (ZIP)</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: IF NO PHOTO UPLOADED YET, SHOW ONLY CLEAN UPLOAD BUTTON (SIMPLE AND CLEAR) */}
      {!customPhotoUrl && shots.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-8">
          <div className="p-12 rounded-3xl bg-[#121223]/70 border border-white/10 shadow-2xl flex flex-col items-center max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-indigo/20 via-brand-violet/20 to-brand-pink/20 border border-white/10 flex items-center justify-center text-brand-pink mb-6 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white font-extrabold text-sm shadow-xl shadow-brand-violet/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Product Photo</span>
            </button>
          </div>
        </div>
      ) : (
        /* 3. CLEAN 15-IMAGE GALLERY: ONLY IMAGES (NO CONTENT BELOW IMAGES) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {shots.map((shot) => (
            <div
              key={shot.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0A0A12] border border-white/10 hover:border-brand-pink/50 shadow-lg transition-all duration-200 hover:-translate-y-1 select-none"
            >
              {/* Clean Visual of User's Product in Real Listing Styles */}
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

      {/* 4. FULL-SIZE PREVIEW MODAL */}
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
