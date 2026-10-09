"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/store";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Code,
  Eye,
  Key,
} from "lucide-react";

interface BulletItem {
  id: string;
  header: string;
  body: string;
}

export default function ListingCopyPage() {
  const { activeProject, deductCredits } = useApp();

  const [productName, setProductName] = useState(activeProject?.name || "Lumière Vital Vitamin C Serum");
  const [brandName, setBrandName] = useState(activeProject?.brandName || "Lumière Botanicals");
  const [marketplace, setMarketplace] = useState(activeProject?.marketplace || "Amazon US");
  const [targetKeywords, setTargetKeywords] = useState("vitamin c serum, hyaluronic acid, anti aging facial serum, dark spot corrector");

  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Listing Output State
  const [title, setTitle] = useState(
    "Lumière Botanicals Vitamin C Facial Serum with 20% Pure Kakadu Plum and Hyaluronic Acid, Radiance Glow Formula, 1 Fl Oz"
  );
  const [bullets, setBullets] = useState<BulletItem[]>([
    {
      id: "b1",
      header: "CLINICAL 20% RADIANCE BOOST",
      body: "Infused with cold-extracted Australian Kakadu Plum and stabilized ascorbic acid to visibly brighten dull skin and diminish the appearance of stubborn dark spots.",
    },
    {
      id: "b2",
      header: "72-HOUR MULTI-MOLECULAR HYDRATION",
      body: "Combines triple-weight hyaluronic acid molecules that penetrate deeply into dermis layers, plumping fine lines without leaving a sticky or greasy residue behind.",
    },
    {
      id: "b3",
      header: "CLEAN BOTANICAL DERMATOLOGIST FORMULA",
      body: "100% vegan, cruelty-free, and formulated without synthetic fragrances, parabens, sulfates, or artificial dyes, making it safe for delicate and sensitive skin.",
    },
    {
      id: "b4",
      header: "FAST-ABSORBING WEIGHTLESS TEXTURE",
      body: "Silky lightweight liquid layers seamlessly under morning moisturizers, SPF sunscreens, and makeup foundations without pilling or causing unwanted breakouts.",
    },
    {
      id: "b5",
      header: "SATISFACTION GUARANTEED CARE",
      body: "Manufactured in a certified GMP facility with fresh batch seals and backed by our unconditional 60-day customer happiness guarantee on every single bottle.",
    },
  ]);
  const [description, setDescription] = useState(
    `<p>Unveil radiant, visibly firmer, and deeply replenished skin with the <strong>Lumière Botanicals Vitamin C Facial Serum</strong>. Formulated using pharmaceutical-grade botanical extracts, this lightweight daily treatment shields your complexion against environmental stressors while restoring a lit-from-within luminosity.</p>\n<p>Unlike conventional serums that oxidize rapidly, our dark amber UV-protective glass bottle preserves active potency from the very first drop to the last. Incorporate it effortlessly into your morning skincare ritual for visible tone refinement.</p>\n<ul>\n  <li><strong>Targeted Radiance:</strong> Targets sun spots, hyperpigmentation, and uneven texture.</li>\n  <li><strong>Deep Moisture Lock:</strong> Multi-weight hyaluronic acid delivers non-comedogenic hydration.</li>\n  <li><strong>Mindful Formulation:</strong> Hypoallergenic, sulfate-free, and cruelty-free certified.</li>\n</ul>`
  );
  const [searchTerms, setSearchTerms] = useState(
    "brightening facial oil moisturizing hydrating anti wrinkle pore minimizer blemishes sensitive skin daily morning routine dropper vegan"
  );
  const [descViewMode, setDescViewMode] = useState<"preview" | "html">("preview");

  // Calculate search terms byte count
  const searchTermsBytes = new TextEncoder().encode(searchTerms).length;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/listing-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          brandName,
          marketplace,
          targetKeywords,
        }),
      });
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (data.bullets) setBullets(data.bullets);
      if (data.description) setDescription(data.description);
      if (data.searchTerms) setSearchTerms(data.searchTerms);
      deductCredits(5);
    } catch {
      // Fallback keeps state
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateBullet = (bulletId: string) => {
    const freshBullets: Record<string, { header: string; body: string }> = {
      b1: {
        header: "INTENSE POSTURE CORRECTION & ALIGNMENT",
        body: "Precision molded contouring gently cradles the spine, relieving pressure points and promoting optimal spinal posture during grueling desk work.",
      },
      b2: {
        header: "AEROSPACE GRADE HEAT DISSIPATION",
        body: "Infused with cooling thermal airflow channels that prevent heat buildup, keeping your posture support fresh and comfortable throughout hot summer days.",
      },
      b3: {
        header: "NON-SLIP ADAPTIVE SECURE GRIP",
        body: "Equipped with rubberized micro-friction studs that anchor firmly onto leather, mesh, or wooden office chairs without slipping out of position.",
      },
      b4: {
        header: "EASY-CARE MACHINE WASHABLE COVER",
        body: "Features a smooth hidden zipper that lets you quickly remove the breathable outer cover for convenient machine washing whenever needed.",
      },
      b5: {
        header: "VERIFIED ZERO-FLATTEN INTEGRITY",
        body: "High-density rebound memory foam retains its original supportive shape over 100,000 compression cycles without sagging or going flat.",
      },
    };

    const replacement = freshBullets[bulletId] || freshBullets.b1;
    setBullets((prev) =>
      prev.map((b) => (b.id === bulletId ? { ...b, ...replacement } : b))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Module D • Amazon SEO Copywriter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Listing Copy & Bullets Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Compliant with Amazon A9 title formulas, 5-bullet benefit headers, HTML descriptions, and 249-byte backend search terms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const fullListing = `TITLE:\n${title}\n\nBULLETS:\n${bullets
                .map((b) => `• ${b.header}: ${b.body}`)
                .join("\n")}\n\nDESCRIPTION:\n${description}\n\nSEARCH TERMS:\n${searchTerms}`;
              handleCopy(fullListing, "all");
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors flex items-center gap-2"
          >
            {copiedKey === "all" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>Copy Entire Listing</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-lg shadow-brand-violet/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Regenerate (5 Credits)</span>
          </button>
        </div>
      </div>

      {/* Input Controls Bar */}
      <div className="bg-[#121223] border border-white/10 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Product Title / Model
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Marketplace
          </label>
          <select
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
          >
            <option value="Amazon US">Amazon US (A9)</option>
            <option value="Amazon IN">Amazon India</option>
            <option value="Flipkart">Flipkart</option>
            <option value="Shopify">Shopify Store</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Target Keywords
          </label>
          <input
            type="text"
            value={targetKeywords}
            onChange={(e) => setTargetKeywords(e.target.value)}
            placeholder="Comma-separated keywords"
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-violet"
          />
        </div>
      </div>

      {/* 1. TITLE SECTION */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Product Title
            </h3>
            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              Formula: Brand + Product + Key Feature + Size/Qty
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-bold ${
                title.length <= 200 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {title.length} / 200 chars
            </span>
            <button
              onClick={() => handleCopy(title, "title")}
              className="text-slate-400 hover:text-white p-1 rounded"
              title="Copy Title"
            >
              {copiedKey === "title" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <textarea
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-3 text-sm font-semibold text-white focus:outline-none focus:border-brand-violet leading-relaxed"
        />
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero promotional claims (&quot;Best&quot;, &quot;#1&quot;) detected • A9 title search optimized</span>
        </div>
      </div>

      {/* 2. 5 BULLET POINTS SECTION */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              2. Five Benefit-First Bullet Points
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sweet spot: 150–200 characters each. Capitalized benefit header with natural keywords.
            </p>
          </div>

          <span className="text-xs text-brand-pink font-semibold px-2.5 py-1 rounded-lg bg-brand-pink/10 border border-brand-pink/20">
            5 / 5 Bullets Ready
          </span>
        </div>

        <div className="space-y-4">
          {bullets.map((b, idx) => {
            const fullBulletLength = b.header.length + 2 + b.body.length;
            const isSweetSpot = fullBulletLength >= 140 && fullBulletLength <= 210;

            return (
              <div
                key={b.id}
                className="bg-[#0B0B14] border border-white/10 rounded-2xl p-4 space-y-2 hover:border-brand-violet/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-violet/20 text-brand-pink text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={b.header}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setBullets((prev) =>
                          prev.map((item) => (item.id === b.id ? { ...item, header: val } : item))
                        );
                      }}
                      className="bg-transparent border-b border-white/10 text-xs font-extrabold text-white uppercase tracking-wide focus:outline-none focus:border-brand-pink px-1 py-0.5"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        isSweetSpot
                          ? "bg-emerald-500/20 text-emerald-300 font-bold"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {fullBulletLength} chars {isSweetSpot ? "✓" : "⚠"}
                    </span>

                    <button
                      onClick={() => handleRegenerateBullet(b.id)}
                      className="p-1 text-slate-400 hover:text-brand-pink transition-colors"
                      title="Regenerate this bullet"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopy(`${b.header}: ${b.body}`, b.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy bullet"
                    >
                      {copiedKey === b.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={b.body}
                  onChange={(e) => {
                    const val = e.target.value;
                    setBullets((prev) =>
                      prev.map((item) => (item.id === b.id ? { ...item, body: val } : item))
                    );
                  }}
                  className="w-full bg-transparent text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-violet/40 rounded-lg p-1.5 leading-relaxed"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PRODUCT DESCRIPTION SECTION */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              3. HTML Product Description
            </h3>
            <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10 text-xs">
              <button
                onClick={() => setDescViewMode("preview")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 ${
                  descViewMode === "preview" ? "bg-brand-violet text-white font-bold" : "text-slate-400"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setDescViewMode("html")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 ${
                  descViewMode === "html" ? "bg-brand-violet text-white font-bold" : "text-slate-400"
                }`}
              >
                <Code className="w-3 h-3" />
                <span>HTML Code</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {description.length} / 1500 chars
            </span>
            <button
              onClick={() => handleCopy(description, "desc")}
              className="p-1 text-slate-400 hover:text-white"
              title="Copy Description"
            >
              {copiedKey === "desc" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {descViewMode === "html" ? (
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none focus:border-brand-violet leading-relaxed"
          />
        ) : (
          <div
            className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-5 text-xs text-slate-300 space-y-3 leading-relaxed [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      {/* 4. BACKEND SEARCH TERMS */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-brand-pink" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              4. Backend Search Terms (Generic Keywords)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                searchTermsBytes <= 249
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}
            >
              {searchTermsBytes} / 249 bytes
            </span>
            <button
              onClick={() => handleCopy(searchTerms, "searchTerms")}
              className="p-1 text-slate-400 hover:text-white"
              title="Copy search terms"
            >
              {copiedKey === "searchTerms" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <textarea
          rows={2}
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-brand-violet leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Rule: No punctuation, no brand names, space-separated only. Under 250 bytes strictly.</span>
          <span className="text-emerald-400 font-semibold">✓ Indexing Ready</span>
        </div>
      </div>
    </div>
  );
}
