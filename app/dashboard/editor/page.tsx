"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, LayerObject, GeneratedImageItem } from "@/lib/store";
import {
  Type,
  Square,
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
  Bold,
  Move,
} from "lucide-react";

export default function CanvaEditorPage() {
  const router = useRouter();
  const { selectedShotForEditor, updateShotLayers } = useApp();
  const artboardRef = useRef<HTMLDivElement>(null);

  // Default initial layers
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
      fontSize: 28,
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
      imageUrl: selectedShotForEditor?.previewUrl || "",
      x: 140,
      y: 140,
      width: 520,
      height: 520,
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

  // Dragging State
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    layerId: string | null;
    startX: number;
    startY: number;
    initialLayerX: number;
    initialLayerY: number;
  }>({
    isDragging: false,
    layerId: null,
    startX: 0,
    startY: 0,
    initialLayerX: 0,
    initialLayerY: 0,
  });

  // Inline editing state for text
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);

  // History stack for Undo / Redo
  const [history, setHistory] = useState<LayerObject[][]>([
    selectedShotForEditor?.layers || defaultInitialLayers,
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [autosaveText, setAutosaveText] = useState("Autosaved");

  // Push history helper
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

  // Autosave
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

  // DRAG & DROP LOGIC: Listens on window for smooth fluid dragging
  useEffect(() => {
    if (!dragState.isDragging || !dragState.layerId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const scale = 800 / 620; // 800 canvas units / 620 rendered pixels
      const dx = (e.clientX - dragState.startX) * scale;
      const dy = (e.clientY - dragState.startY) * scale;

      setLayers((prev) =>
        prev.map((l) =>
          l.id === dragState.layerId
            ? {
                ...l,
                x: Math.round(dragState.initialLayerX + dx),
                y: Math.round(dragState.initialLayerY + dy),
              }
            : l
        )
      );
    };

    const handleMouseUp = () => {
      setDragState((prev) => ({ ...prev, isDragging: false, layerId: null }));
      pushHistory(layers);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, layers]);

  // Layer MouseDown handler: Starts smooth drag
  const handleLayerMouseDown = (e: React.MouseEvent, layer: LayerObject) => {
    if (layer.locked || layer.type === "background") {
      setSelectedLayerId(layer.id);
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setSelectedLayerId(layer.id);
    setDragState({
      isDragging: true,
      layerId: layer.id,
      startX: e.clientX,
      startY: e.clientY,
      initialLayerX: layer.x,
      initialLayerY: layer.y,
    });
  };

  // Keyboard shortcut listener (Ctrl+Z, Ctrl+Y, Arrow keys for nudging)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      } else if (selectedLayerId && !inlineEditingId) {
        // Arrow key nudging
        const nudge = e.shiftKey ? 10 : 2;
        let dx = 0;
        let dy = 0;
        if (e.key === "ArrowUp") dy = -nudge;
        else if (e.key === "ArrowDown") dy = nudge;
        else if (e.key === "ArrowLeft") dx = -nudge;
        else if (e.key === "ArrowRight") dx = nudge;

        if (dx !== 0 || dy !== 0) {
          e.preventDefault();
          setLayers((prev) => {
            const updated = prev.map((l) =>
              l.id === selectedLayerId ? { ...l, x: l.x + dx, y: l.y + dy } : l
            );
            pushHistory(updated);
            return updated;
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, selectedLayerId, inlineEditingId]);

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

  // Add badge
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
    if (id === "layer-bg") return;
    const updated = layers.filter((l) => l.id !== id);
    pushHistory(updated);
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  // Export handlers
  const handleExport = (format: "png" | "jpg" | "json") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layers, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `Listone_Canvas_Design.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 2000 / 800;

    // Draw background
    const bgLayer = layers.find((l) => l.type === "background");
    ctx.fillStyle = bgLayer?.fill || "#FFFFFF";
    ctx.fillRect(0, 0, 2000, 2000);

    // Draw visible layers in order
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

    const dataUrl = canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Listone_Canvas_Export.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col bg-[#0B0B14] overflow-hidden select-none">
      {/* 1. TOP CONTROL BAR */}
      <header className="h-14 bg-[#121223] border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/image-studio")}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
              <span>Canva-Style Visual Editor</span>
              <span className="text-[10px] text-pink-400 bg-brand-pink/10 px-1.5 py-0.5 rounded font-normal">
                Layer Drag Active
              </span>
            </span>
            <span className="text-[10px] text-slate-400">{autosaveText}</span>
          </div>
        </div>

        {/* Center: Undo / Redo & Zoom */}
        <div className="flex items-center gap-1 bg-[#090912] p-1 rounded-xl border border-white/5">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button
            onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-300 px-1 min-w-[3rem] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((prev) => Math.min(200, prev + 10))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("png")}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG (2000px)</span>
          </button>
        </div>
      </header>

      {/* 2. SECONDARY CONTEXTUAL TOOLBAR */}
      {activeLayer && (
        <div className="h-11 bg-[#0E0E1B] border-b border-white/5 px-4 flex items-center gap-3 text-xs text-slate-300 overflow-x-auto shrink-0">
          <span className="font-bold text-white flex items-center gap-1">
            <Move className="w-3.5 h-3.5 text-brand-pink" />
            <span>{activeLayer.name}</span>
          </span>
          <div className="w-[1px] h-4 bg-white/10" />

          {activeLayer.type === "text" && (
            <>
              <div className="flex items-center gap-1.5">
                <span>Font Size:</span>
                <input
                  type="number"
                  min="12"
                  max="72"
                  value={activeLayer.fontSize || 24}
                  onChange={(e) => updateActiveLayerProp("fontSize", parseInt(e.target.value) || 24)}
                  className="w-14 bg-black/40 border border-white/10 rounded px-2 py-0.5 text-white"
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

              <button
                onClick={() =>
                  updateActiveLayerProp(
                    "fontWeight",
                    activeLayer.fontWeight === "800" ? "normal" : "800"
                  )
                }
                className={`p-1 rounded ${activeLayer.fontWeight === "800" ? "bg-white/20 text-white" : "text-slate-400"}`}
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {activeLayer.type === "badge" && (
            <div className="flex items-center gap-1.5">
              <span>Color:</span>
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

      {/* 3. MAIN WORKSPACE: Left Tools | Center Canvas | Right Layers */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT TOOL BAR */}
        <aside className="w-64 bg-[#0D0D19] border-r border-white/10 flex flex-col shrink-0 p-4 space-y-4 overflow-y-auto">
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

          {activeToolTab === "text" && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Add Typography
              </span>
              <button
                onClick={() => handleAddText("headline")}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors"
              >
                <div className="text-sm font-extrabold text-white">Headline Text</div>
                <div className="text-[10px] text-slate-400">Bold 28px capitalized feature</div>
              </button>
              <button
                onClick={() => handleAddText("subhead")}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors"
              >
                <div className="text-xs font-semibold text-white">Subheadline / Feature</div>
                <div className="text-[10px] text-slate-400">Medium 18px secondary benefit</div>
              </button>
            </div>
          )}

          {activeToolTab === "badges" && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Add Badges
              </span>
              <button
                onClick={() => handleAddBadge("✦ AMAZON TOP RATED", "#EC4899")}
                className="w-full p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold text-left"
              >
                ✦ Amazon Top Rated
              </button>
              <button
                onClick={() => handleAddBadge("✓ 100% QUALITY INSPECTED", "#10B981")}
                className="w-full p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-left"
              >
                ✓ 100% Quality Inspected
              </button>
              <button
                onClick={() => handleAddBadge("⚡ ULTRA DURABLE BUILD", "#7C3AED")}
                className="w-full p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold text-left"
              >
                ⚡ Ultra Durable Build
              </button>
            </div>
          )}

          {activeToolTab === "background" && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Background Colors
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Pure White", color: "#FFFFFF" },
                  { name: "Dark Studio", color: "#14142B" },
                  { name: "Slate Black", color: "#0A0B14" },
                  { name: "Soft Grey", color: "#F3F4F6" },
                ].map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => {
                      const bgLayer = layers.find((l) => l.type === "background");
                      if (bgLayer) updateActiveLayerProp("fill", bg.color);
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

        {/* CENTER STAGE CANVAS: REAL FLUID DRAG-AND-DROP */}
        <main className="flex-1 bg-[#07070F] p-8 flex items-center justify-center overflow-auto relative bg-grid-pattern">
          <div
            ref={artboardRef}
            className="relative bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/20 transition-transform duration-200"
            style={{
              width: "620px",
              height: "620px",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            {/* Render Layers in Stack Order */}
            {layers.map((layer) => {
              if (!layer.visible) return null;
              const isSelected = selectedLayerId === layer.id;
              const isLayerDragging = dragState.isDragging && dragState.layerId === layer.id;

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
                    onMouseDown={(e) => handleLayerMouseDown(e, layer)}
                    className={`absolute flex items-center justify-center select-none ${
                      isLayerDragging
                        ? "cursor-grabbing"
                        : "cursor-grab"
                    } ${
                      isSelected
                        ? "ring-2 ring-brand-pink ring-offset-2 ring-offset-transparent shadow-2xl"
                        : "hover:ring-1 hover:ring-brand-pink/50"
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
                      <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-brand-indigo/20 to-brand-violet/20 flex flex-col items-center justify-center border border-white/20 p-4 pointer-events-none">
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
                    onMouseDown={(e) => handleLayerMouseDown(e, layer)}
                    onDoubleClick={() => setInlineEditingId(layer.id)}
                    className={`absolute flex items-center justify-center px-4 py-2 rounded-full shadow-lg select-none ${
                      isLayerDragging ? "cursor-grabbing" : "cursor-grab"
                    } ${
                      isSelected
                        ? "ring-2 ring-white ring-offset-2 ring-offset-transparent shadow-2xl"
                        : "hover:ring-1 hover:ring-white/50"
                    }`}
                    style={{
                      left: `${(layer.x / 800) * 100}%`,
                      top: `${(layer.y / 800) * 100}%`,
                      backgroundColor: layer.fill || "#EC4899",
                      opacity: layer.opacity ?? 1,
                    }}
                  >
                    {inlineEditingId === layer.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={layer.text || ""}
                        onChange={(e) => updateActiveLayerProp("text", e.target.value)}
                        onBlur={() => setInlineEditingId(null)}
                        onKeyDown={(e) => e.key === "Enter" && setInlineEditingId(null)}
                        className="bg-transparent text-white text-xs font-extrabold outline-none text-center"
                      />
                    ) : (
                      <span className="text-white text-xs font-extrabold whitespace-nowrap pointer-events-none">
                        {layer.text}
                      </span>
                    )}
                  </div>
                );
              }

              if (layer.type === "text") {
                return (
                  <div
                    key={layer.id}
                    onMouseDown={(e) => handleLayerMouseDown(e, layer)}
                    onDoubleClick={() => setInlineEditingId(layer.id)}
                    className={`absolute p-2 rounded-lg select-none ${
                      isLayerDragging ? "cursor-grabbing" : "cursor-grab"
                    } ${
                      isSelected
                        ? "ring-2 ring-brand-pink bg-brand-pink/10 shadow-lg"
                        : "hover:ring-1 hover:ring-brand-pink/40"
                    }`}
                    style={{
                      left: `${(layer.x / 800) * 100}%`,
                      top: `${(layer.y / 800) * 100}%`,
                      opacity: layer.opacity ?? 1,
                    }}
                  >
                    {inlineEditingId === layer.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={layer.text || ""}
                        onChange={(e) => updateActiveLayerProp("text", e.target.value)}
                        onBlur={() => setInlineEditingId(null)}
                        onKeyDown={(e) => e.key === "Enter" && setInlineEditingId(null)}
                        className="bg-black/80 border border-brand-pink rounded px-2 py-1 text-white text-sm font-bold outline-none"
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: layer.fontFamily || "Plus Jakarta Sans",
                          fontSize: `${(layer.fontSize || 24) * 0.75}px`,
                          fontWeight: layer.fontWeight || "bold",
                          color: layer.fill || "#FFFFFF",
                        }}
                        className="leading-tight block font-heading pointer-events-none"
                      >
                        {layer.text}
                      </span>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </main>

        {/* RIGHT LAYERS STACK INSPECTOR */}
        <aside className="w-72 bg-[#0D0D19] border-l border-white/10 flex flex-col justify-between shrink-0 p-4 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
                <LayersIcon className="w-4 h-4 text-brand-pink" />
                <span>Layers Stack ({layers.length})</span>
              </span>
            </div>

            <div className="space-y-1.5">
              {layers
                .slice()
                .reverse()
                .map((layer, reverseIdx) => {
                  const actualIdx = layers.length - 1 - reverseIdx;
                  const isSelected = selectedLayerId === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => setSelectedLayerId(layer.id)}
                      className={`p-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-brand-violet/25 border border-brand-violet/60 text-white font-semibold"
                          : "bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Move className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{layer.name}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {layer.type !== "background" && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerOrder(actualIdx, "up");
                              }}
                              className="p-1 hover:text-white text-slate-500"
                              title="Bring Forward"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveLayerOrder(actualIdx, "down");
                              }}
                              className="p-1 hover:text-white text-slate-500"
                              title="Send Backward"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLayer(layer.id);
                              }}
                              className="p-1 hover:text-rose-400 text-slate-500"
                              title="Delete Layer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
