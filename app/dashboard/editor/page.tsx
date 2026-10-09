"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, LayerObject, GeneratedImageItem } from "@/lib/store";
import {
  Type,
  Square,
  Circle,
  Sparkles,
  Layers as LayersIcon,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Palette,
  ArrowLeft,
  Check,
  Save,
  Globe2,
  Ratio,
  Wand2,
  Move,
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export default function CanvaEditorPage() {
  const router = useRouter();
  const { selectedShotForEditor, updateShotLayers, activeProject } = useApp();

  // Default fallback layers if no shot selected
  const defaultInitialLayers: LayerObject[] = [
    {
      id: "layer-bg",
      type: "background",
      name: "Canvas Background",
      x: 0,
      y: 0,
      width: 800,
      height: 800,
      fill: "#14142B",
      locked: true,
      visible: true,
    },
    {
      id: "layer-headline",
      type: "text",
      name: "Headline Banner",
      x: 60,
      y: 60,
      width: 680,
      height: 70,
      text: "ULTRA ACTIVE NOISE CANCELLATION",
      fontSize: 30,
      fontFamily: "Plus Jakarta Sans",
      fontWeight: "800",
      fill: "#FFFFFF",
      locked: false,
      visible: true,
      opacity: 1,
    },
    {
      id: "layer-product",
      type: "product",
      name: "Product Cutout (Real Pixels)",
      x: 180,
      y: 180,
      width: 440,
      height: 440,
      locked: false,
      visible: true,
      opacity: 1,
    },
    {
      id: "layer-badge-1",
      type: "badge",
      name: "Feature Badge: Battery",
      x: 60,
      y: 680,
      width: 240,
      height: 48,
      text: "✦ 40-HOUR BATTERY LIFE",
      fill: "#EC4899",
      locked: false,
      visible: true,
      opacity: 1,
    },
    {
      id: "layer-badge-2",
      type: "badge",
      name: "Feature Badge: Drivers",
      x: 500,
      y: 680,
      width: 240,
      height: 48,
      text: "✦ 40mm GRAPHENE DRIVERS",
      fill: "#7C3AED",
      locked: false,
      visible: true,
      opacity: 1,
    },
  ];

  const [layers, setLayers] = useState<LayerObject[]>(
    selectedShotForEditor?.layers || defaultInitialLayers
  );
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("layer-headline");
  const [zoom, setZoom] = useState<number>(100);
  const [activeToolTab, setActiveToolTab] = useState<"text" | "shapes" | "badges" | "background">("text");

  // History stack for Undo / Redo
  const [history, setHistory] = useState<LayerObject[][]>([
    selectedShotForEditor?.layers || defaultInitialLayers,
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [autosaveText, setAutosaveText] = useState("Autosaved");

  // Autosave interval every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAutosaveText("Autosaving...");
      setTimeout(() => {
        setAutosaveText("Autosaved (just now)");
        if (selectedShotForEditor) {
          updateShotLayers(selectedShotForEditor.id, layers);
        }
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [layers, selectedShotForEditor, updateShotLayers]);

  // Push history state helper
  const pushHistory = (newLayers: LayerObject[]) => {
    const updated = history.slice(0, historyIndex + 1);
    updated.push(newLayers);
    setHistory(updated);
    setHistoryIndex(updated.length - 1);
    setLayers(newLayers);
  };

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setLayers(history[prev]);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setLayers(history[next]);
    }
  }, [historyIndex, history]);

  // Keyboard shortcut listener (Ctrl+Z, Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const activeLayer = layers.find((l) => l.id === selectedLayerId);

  // Update specific property on active layer
  const updateActiveLayerProp = (prop: keyof LayerObject, value: any) => {
    if (!selectedLayerId) return;
    const updated = layers.map((layer) =>
      layer.id === selectedLayerId ? { ...layer, [prop]: value } : layer
    );
    pushHistory(updated);
  };

  // Add new text layer
  const handleAddText = (type: "headline" | "subhead" | "body") => {
    const newLayer: LayerObject = {
      id: `text-${Date.now()}`,
      type: "text",
      name: type === "headline" ? "New Headline" : "New Feature Text",
      x: 100,
      y: 150 + layers.length * 20,
      width: 500,
      height: 50,
      text: type === "headline" ? "PREMIUM SOUND ARCHITECTURE" : "High-Performance Engineered Component",
      fontSize: type === "headline" ? 28 : 18,
      fontFamily: "Plus Jakarta Sans",
      fontWeight: "700",
      fill: "#FFFFFF",
      locked: false,
      visible: true,
      opacity: 1,
    };
    pushHistory([...layers, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Add badge sticker
  const handleAddBadge = (badgeText: string, color: string) => {
    const newBadge: LayerObject = {
      id: `badge-${Date.now()}`,
      type: "badge",
      name: `Badge: ${badgeText}`,
      x: 120,
      y: 400,
      width: 260,
      height: 48,
      text: badgeText,
      fill: color,
      locked: false,
      visible: true,
      opacity: 1,
    };
    pushHistory([...layers, newBadge]);
    setSelectedLayerId(newBadge.id);
  };

  // Reorder layer
  const moveLayerOrder = (index: number, direction: "up" | "down") => {
    const newLayers = [...layers];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLayers.length) return;
    const temp = newLayers[index];
    newLayers[index] = newLayers[targetIndex];
    newLayers[targetIndex] = temp;
    pushHistory(newLayers);
  };

  // Delete layer
  const handleDeleteLayer = (id: string) => {
    if (id === "layer-bg") return; // cannot delete background
    const updated = layers.filter((l) => l.id !== id);
    pushHistory(updated);
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  // Duplicate layer
  const handleDuplicateLayer = (layer: LayerObject) => {
    const clone: LayerObject = {
      ...layer,
      id: `${layer.type}-${Date.now()}`,
      name: `${layer.name} (Copy)`,
      x: layer.x + 20,
      y: layer.y + 20,
    };
    pushHistory([...layers, clone]);
    setSelectedLayerId(clone.id);
  };

  // Export handlers
  const handleExport = (format: "png" | "jpg" | "json") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layers, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `Listone_Canvas_${selectedShotForEditor?.title || "Design"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      return;
    }

    // Render offscreen canvas to real PNG/JPG
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale 800x800 coordinate system to 2000x2000
    const scale = 2000 / 800;

    // Draw background
    const bgLayer = layers.find((l) => l.type === "background");
    ctx.fillStyle = bgLayer?.fill || "#FFFFFF";
    ctx.fillRect(0, 0, 2000, 2000);

    // Draw each visible layer
    layers.forEach((l) => {
      if (!l.visible || l.type === "background") return;

      if (l.type === "product") {
        if (l.imageUrl) {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.src = l.imageUrl;
          try {
            ctx.drawImage(img, l.x * scale, l.y * scale, l.width * scale, l.height * scale);
          } catch {
            ctx.fillStyle = "#1E1E2F";
            ctx.fillRect(l.x * scale, l.y * scale, l.width * scale, l.height * scale);
          }
        } else {
          ctx.fillStyle = "#1E1E2F";
          ctx.beginPath();
          ctx.arc(400 * scale, 400 * scale, 180 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (l.type === "badge" && l.text) {
        ctx.fillStyle = l.fill || "#EC4899";
        ctx.roundRect(l.x * scale, l.y * scale, l.width * scale, l.height * scale, 24 * scale);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${16 * scale}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.text, (l.x + l.width / 2) * scale, (l.y + l.height / 2) * scale);
      } else if (l.type === "text" && l.text) {
        ctx.fillStyle = l.fill || "#FFFFFF";
        ctx.font = `${l.fontWeight || "bold"} ${(l.fontSize || 24) * scale}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(l.text, l.x * scale, l.y * scale);
      }
    });

    const mime = format === "jpg" ? "image/jpeg" : "image/png";
    const dataUrl = canvas.toDataURL(mime, 0.95);
    const link = document.createElement("a");
    link.download = `Listone_Amazon_2000px_${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A14] flex flex-col select-none overflow-hidden">
      {/* 1. TOP TOOLBAR */}
      <header className="h-16 bg-[#0E0E1A] border-b border-white/10 px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/image-studio"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Back to Studio"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {selectedShotForEditor ? selectedShotForEditor.title : "Canva Studio Editor"}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-violet/20 text-brand-pink border border-brand-violet/30">
                Amazon 2000x2000
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="text-emerald-400">●</span>
              <span>{autosaveText}</span>
              <span>•</span>
              <span className="text-slate-500">Ctrl+Z / Ctrl+Y shortcuts</span>
            </div>
          </div>
        </div>

        {/* Center: Undo / Redo / Zoom */}
        <div className="hidden md:flex items-center gap-2 bg-[#141426] border border-white/10 rounded-xl p-1">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-30 transition-all"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-30 transition-all"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button
            onClick={() => setZoom(Math.max(50, zoom - 15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 px-1">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 15))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right Magic Features & Export */}
        <div className="flex items-center gap-3">
          {/* Magic features buttons */}
          <button
            onClick={() => {
              // Swap background to pure white or atmospheric gradient
              const currentBg = layers.find((l) => l.type === "background")?.fill;
              const nextBg = currentBg === "#FFFFFF" ? "#14142B" : "#FFFFFF";
              const updated = layers.map((l) =>
                l.type === "background" ? { ...l, fill: nextBg } : l
              );
              pushHistory(updated);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-brand-pink" />
            <span>Toggle White/Dark Studio</span>
          </button>

          <button
            onClick={() => handleExport("png")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export 2000px PNG</span>
          </button>

          <button
            onClick={() => handleExport("json")}
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
            title="Download Layered JSON"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save JSON</span>
          </button>
        </div>
      </header>

      {/* 2. SUB TOOLBAR: Active layer properties */}
      {activeLayer && (
        <div className="h-12 bg-[#121223] border-b border-white/10 px-6 flex items-center gap-4 text-xs text-slate-300 overflow-x-auto shrink-0">
          <span className="font-bold text-white uppercase text-[11px] tracking-wider">
            Layer: {activeLayer.name}
          </span>
          <div className="w-[1px] h-4 bg-white/10" />

          {activeLayer.type === "text" && (
            <>
              <div className="flex items-center gap-1.5">
                <span>Font:</span>
                <select
                  value={activeLayer.fontFamily || "Plus Jakarta Sans"}
                  onChange={(e) => updateActiveLayerProp("fontFamily", e.target.value)}
                  className="bg-[#0B0B14] border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                >
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Size:</span>
                <input
                  type="number"
                  value={activeLayer.fontSize || 24}
                  onChange={(e) => updateActiveLayerProp("fontSize", parseInt(e.target.value, 10))}
                  className="w-14 bg-[#0B0B14] border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span>Color:</span>
                <input
                  type="color"
                  value={activeLayer.fill || "#FFFFFF"}
                  onChange={(e) => updateActiveLayerProp("fill", e.target.value)}
                  className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
                />
              </div>
            </>
          )}

          {activeLayer.type === "badge" && (
            <div className="flex items-center gap-2">
              <span>Badge Color:</span>
              <input
                type="color"
                value={activeLayer.fill || "#EC4899"}
                onChange={(e) => updateActiveLayerProp("fill", e.target.value)}
                className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
              />
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <span>Opacity:</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={activeLayer.opacity ?? 1}
              onChange={(e) => updateActiveLayerProp("opacity", parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      )}

      {/* 3. MAIN WORKSPACE: Left Assets | Center Canvas | Right Layers */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT ASSET TOOLS BAR */}
        <aside className="w-64 bg-[#0D0D19] border-r border-white/10 flex flex-col shrink-0 p-4 space-y-5 overflow-y-auto">
          {/* Tool category switcher */}
          <div className="grid grid-cols-4 gap-1 bg-[#141426] p-1 rounded-xl">
            <button
              onClick={() => setActiveToolTab("text")}
              className={`p-2 rounded-lg flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                activeToolTab === "text" ? "bg-brand-violet text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Type className="w-4 h-4 mb-0.5" />
              <span>Text</span>
            </button>
            <button
              onClick={() => setActiveToolTab("badges")}
              className={`p-2 rounded-lg flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                activeToolTab === "badges" ? "bg-brand-violet text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span>Badges</span>
            </button>
            <button
              onClick={() => setActiveToolTab("shapes")}
              className={`p-2 rounded-lg flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                activeToolTab === "shapes" ? "bg-brand-violet text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Square className="w-4 h-4 mb-0.5" />
              <span>Shapes</span>
            </button>
            <button
              onClick={() => setActiveToolTab("background")}
              className={`p-2 rounded-lg flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                activeToolTab === "background" ? "bg-brand-violet text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Palette className="w-4 h-4 mb-0.5" />
              <span>BG</span>
            </button>
          </div>

          {/* Tab 1: Text Options */}
          {activeToolTab === "text" && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Add Typography Layer
              </span>
              <button
                onClick={() => handleAddText("headline")}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors"
              >
                <div className="text-sm font-extrabold text-white">Add Headline Text</div>
                <div className="text-[10px] text-slate-400">Bold 30px capitalized feature</div>
              </button>

              <button
                onClick={() => handleAddText("subhead")}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors"
              >
                <div className="text-xs font-semibold text-white">Add Sub-feature Callout</div>
                <div className="text-[10px] text-slate-400">18px clean descriptive copy</div>
              </button>
            </div>
          )}

          {/* Tab 2: Badges & Stickers */}
          {activeToolTab === "badges" && (
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Pre-Approved Amazon Stickers
              </span>
              {[
                { label: "✦ 2-YEAR WARRANTY INCLUDED", color: "#EC4899" },
                { label: "✦ 100% ORGANIC & VEGAN", color: "#10B981" },
                { label: "✦ HI-RES AUDIO CERTIFIED", color: "#6366F1" },
                { label: "✦ FAST CHARGE READY", color: "#F59E0B" },
                { label: "✦ AMAZON SAFE ZONE", color: "#06B6D4" },
              ].map((badge) => (
                <button
                  key={badge.label}
                  onClick={() => handleAddBadge(badge.label, badge.color)}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span className="truncate">{badge.label}</span>
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: badge.color }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Tab 3: Shapes */}
          {activeToolTab === "shapes" && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Add Geometric Objects
              </span>
              <button
                onClick={() => handleAddBadge("FEATURE HIGHLIGHT", "#7C3AED")}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 text-xs font-bold text-white"
              >
                Add Rounded Callout Box
              </button>
            </div>
          )}

          {/* Tab 4: Background Presets */}
          {activeToolTab === "background" && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Canvas Backdrop Colors
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Amazon White", color: "#FFFFFF" },
                  { name: "Moody Studio", color: "#14142B" },
                  { name: "Deep Charcoal", color: "#11111A" },
                  { name: "Soft Lilac", color: "#F5F3FF" },
                  { name: "Navy Horizon", color: "#0F172A" },
                  { name: "Warm Cream", color: "#FDFBF7" },
                ].map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => {
                      const updated = layers.map((l) =>
                        l.type === "background" ? { ...l, fill: bg.color } : l
                      );
                      pushHistory(updated);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs text-white flex items-center gap-2"
                  >
                    <span
                      className="w-4 h-4 rounded-md border border-white/20 shrink-0"
                      style={{ backgroundColor: bg.color }}
                    />
                    <span className="truncate text-[11px]">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* CENTER STAGE CANVAS */}
        <main className="flex-1 bg-[#07070F] p-8 flex items-center justify-center overflow-auto relative bg-grid-pattern">
          {/* Virtual 800x800 square artboard (simulating high-res 2000x2000) */}
          <div
            className="relative bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/20 transition-transform duration-200"
            style={{
              width: "620px",
              height: "620px",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            {/* Render Layers in Array Order */}
            {layers.map((layer) => {
              if (!layer.visible) return null;
              const isSelected = selectedLayerId === layer.id;

              if (layer.type === "background") {
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className="absolute inset-0"
                    style={{ backgroundColor: layer.fill || "#FFFFFF" }}
                  />
                );
              }

              if (layer.type === "product") {
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`absolute cursor-move flex items-center justify-center ${
                      isSelected ? "ring-2 ring-brand-pink ring-offset-2 ring-offset-transparent" : ""
                    }`}
                    style={{
                      left: `${(layer.x / 800) * 100}%`,
                      top: `${(layer.y / 800) * 100}%`,
                      width: `${(layer.width / 800) * 100}%`,
                      height: `${(layer.height / 800) * 100}%`,
                      opacity: layer.opacity ?? 1,
                    }}
                  >
                    {layer.imageUrl ? (
                      <img
                        src={layer.imageUrl}
                        alt="Product"
                        className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-brand-indigo/20 to-brand-violet/20 flex flex-col items-center justify-center border border-white/20 p-4">
                        <Sparkles className="w-10 h-10 text-brand-pink mb-2" />
                        <span className="text-xs text-white font-bold">Product Cutout</span>
                      </div>
                    )}
                  </div>
                );
              }

              if (layer.type === "badge") {
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`absolute cursor-move flex items-center justify-center px-4 py-2 rounded-full shadow-lg ${
                      isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""
                    }`}
                    style={{
                      left: `${(layer.x / 800) * 100}%`,
                      top: `${(layer.y / 800) * 100}%`,
                      backgroundColor: layer.fill || "#EC4899",
                      opacity: layer.opacity ?? 1,
                    }}
                  >
                    <span className="text-white text-xs font-extrabold whitespace-nowrap">
                      {layer.text}
                    </span>
                  </div>
                );
              }

              if (layer.type === "text") {
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`absolute cursor-move p-2 rounded-lg ${
                      isSelected ? "ring-2 ring-brand-pink bg-brand-pink/10" : ""
                    }`}
                    style={{
                      left: `${(layer.x / 800) * 100}%`,
                      top: `${(layer.y / 800) * 100}%`,
                      opacity: layer.opacity ?? 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: layer.fontFamily || "Plus Jakarta Sans",
                        fontSize: `${(layer.fontSize || 24) * 0.75}px`,
                        fontWeight: layer.fontWeight || "bold",
                        color: layer.fill || "#FFFFFF",
                      }}
                      className="leading-tight block font-heading"
                    >
                      {layer.text}
                    </span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </main>

        {/* RIGHT LAYERS STACK & INSPECTOR */}
        <aside className="w-72 bg-[#0D0D19] border-l border-white/10 flex flex-col justify-between shrink-0 p-4 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
                <LayersIcon className="w-4 h-4 text-brand-pink" />
                <span>Layers Stack ({layers.length})</span>
              </span>
            </div>

            {/* Draggable / clickable layers list */}
            <div className="space-y-2">
              {layers.map((layer, index) => {
                const isSelected = selectedLayerId === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-brand-violet/20 border-brand-violet text-white font-bold shadow-md"
                        : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {layer.type === "text" && <Type className="w-3.5 h-3.5 text-brand-pink shrink-0" />}
                      {layer.type === "product" && <Move className="w-3.5 h-3.5 text-brand-indigo shrink-0" />}
                      {layer.type === "badge" && <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      {layer.type === "background" && <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                      <span className="truncate">{layer.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {/* Visibility Toggle */}
                      <button
                        onClick={() => {
                          const updated = layers.map((l) =>
                            l.id === layer.id ? { ...l, visible: !l.visible } : l
                          );
                          pushHistory(updated);
                        }}
                        className="text-slate-400 hover:text-white p-1"
                        title="Toggle Visibility"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-rose-400" />}
                      </button>

                      {/* Lock Toggle */}
                      <button
                        onClick={() => {
                          const updated = layers.map((l) =>
                            l.id === layer.id ? { ...l, locked: !l.locked } : l
                          );
                          pushHistory(updated);
                        }}
                        className="text-slate-400 hover:text-white p-1"
                        title="Toggle Lock"
                      >
                        {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>

                      {/* Up/Down Reorder */}
                      <button
                        onClick={() => moveLayerOrder(index, "up")}
                        disabled={index === 0}
                        className="text-slate-400 hover:text-white p-0.5 disabled:opacity-20"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveLayerOrder(index, "down")}
                        disabled={index === layers.length - 1}
                        className="text-slate-400 hover:text-white p-0.5 disabled:opacity-20"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      {layer.type !== "background" && (
                        <button
                          onClick={() => handleDeleteLayer(layer.id)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                          title="Delete Layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Inspector Details */}
          {activeLayer && activeLayer.type === "text" && (
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <span className="text-[11px] font-bold text-slate-300 block">
                Edit Selected Text Content
              </span>
              <textarea
                rows={2}
                value={activeLayer.text || ""}
                onChange={(e) => updateActiveLayerProp("text", e.target.value)}
                className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-violet"
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
