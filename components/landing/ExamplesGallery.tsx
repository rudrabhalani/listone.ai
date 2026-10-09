"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowUpRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

type Category = "All" | "Footwear" | "Watches" | "Bags" | "Beauty" | "Drinkware";

interface ShowcaseItem {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  marketplace: string;
  imageUrl: string;
  metricLabel: string;
  metricValue: string;
  tags: string[];
}

export const ExamplesGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("All");

  const categories: Category[] = [
    "All",
    "Footwear",
    "Watches",
    "Bags",
    "Beauty",
    "Drinkware",
  ];

  const showcaseItems: ShowcaseItem[] = [
    {
      id: "sh-1",
      category: "Footwear",
      title: "CloudPace Pro Cushion Running Sneakers",
      subtitle: "Pure-white studio hero + in-action track perspective",
      marketplace: "Amazon 2000x2000",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "Click-Through Rate",
      metricValue: "+48% CTR",
      tags: ["RGB(255,255,255)", "In-Use Track", "15 Shots"],
    },
    {
      id: "sh-2",
      category: "Watches",
      title: "Apex Chronograph Sapphire Automatic Watch",
      subtitle: "Macro texture dial + illuminated pedestal showcase",
      marketplace: "Amazon & Shopify",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "Listing Conversion",
      metricValue: "+41% Conv",
      tags: ["Macro Sapphire", "Studio Pedestal", "Unboxing"],
    },
    {
      id: "sh-3",
      category: "Bags",
      title: "NomadShield Waterproof Commuter Backpack",
      subtitle: "Ergonomic transit scene + unboxing layout",
      marketplace: "Amazon A+ & Shopify",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "Add-to-Cart Rate",
      metricValue: "+36% Cart",
      tags: ["Weatherproof", "Laptop Sleeve", "Dimensions"],
    },
    {
      id: "sh-4",
      category: "Beauty",
      title: "Pure Botanics Radiance Vitamin C Serum",
      subtitle: "Morning vanity sunlight + clean botanical aesthetic",
      marketplace: "Flipkart & Amazon",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "Sales Velocity",
      metricValue: "+54% Sales",
      tags: ["Clean Beauty", "Dropper Detail", "Safe Zone"],
    },
    {
      id: "sh-5",
      category: "Drinkware",
      title: "HydroFlow 32oz Insulated Stainless Tumbler",
      subtitle: "Pure-white isolation + tabletop desk lifestyle",
      marketplace: "Amazon Choice",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "ROAS Multiplier",
      metricValue: "+3.8x ROAS",
      tags: ["Cold 24hr", "Leakproof Lid", "Desk Scale"],
    },
    {
      id: "sh-6",
      category: "Footwear",
      title: "VaporLite Carbon Fiber Trail Running Shoes",
      subtitle: "High-contrast dynamic angle + macro sole tread",
      marketplace: "Shopify & Amazon",
      imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=85",
      metricLabel: "Product Engagement",
      metricValue: "+62% Views",
      tags: ["Carbon Plate", "Trail Grip", "Amazon Prime"],
    },
  ];

  const filtered =
    activeTab === "All"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeTab);

  return (
    <section id="examples" className="py-24 bg-[#0B0B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-xs font-semibold text-brand-pink mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio-Grade Output Quality</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Real Listing Transformations That Convert
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            See how Listone.ai transforms raw product photos into high-converting Amazon & Shopify listing photography in seconds.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === cat
                  ? "bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-lg shadow-brand-violet/25"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photorealistic Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden bg-[#121223] border border-white/10 hover:border-brand-violet/50 shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Photorealistic Image Showcase */}
              <div className="relative aspect-[4/3] bg-[#090A12] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Metric pill */}
                <div className="absolute top-3 right-3 z-10 bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{item.metricValue}</span>
                </div>

                {/* Marketplace pill */}
                <div className="absolute top-3 left-3 z-10 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/15 backdrop-blur-md">
                  {item.marketplace}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-pink uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">15 Shots Ready</span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-pink-100 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Amazon Compliance Verified
                  </span>
                  <Link
                    href="/dashboard/image-studio"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-pink hover:text-white transition-colors"
                  >
                    <span>Try In Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
