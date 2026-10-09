"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import {
  Sparkles,
  Image as ImageIcon,
  Sliders,
  FileText,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  ShieldCheck,
  Package,
} from "lucide-react";

export default function DashboardHomePage() {
  const { credits, projects, activeProject, setActiveProject, createProject } = useApp();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newMarketplace, setNewMarketplace] = useState("Amazon US");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    createProject(newProjectName.trim(), newBrandName.trim() || "My Brand", newMarketplace);
    setNewProjectName("");
    setNewBrandName("");
    setShowNewProjectModal(false);
  };

  const quickStartCards = [
    {
      title: "15-Shot Image Generator",
      tag: "Core Engine",
      description: "Upload a single product photo or ASIN to generate pure-white hero, infographics, and lifestyle shots.",
      icon: ImageIcon,
      href: "/dashboard/image-studio",
      gradient: "from-brand-indigo to-brand-violet",
      cta: "Launch Generator",
    },
    {
      title: "A+ Content Studio",
      tag: "Enhanced Brand Content",
      description: "Generate 970x600 banners, brand story, 4-card grids, and product comparison charts.",
      icon: Sliders,
      href: "/dashboard/aplus-studio",
      gradient: "from-brand-violet to-brand-pink",
      cta: "Design A+ Layout",
    },
    {
      title: "SEO Listing Copywriter",
      tag: "Amazon 5-Bullets",
      description: "Algorithmic title, 5 benefit-first bullets, HTML description, and 249-byte backend search terms.",
      icon: FileText,
      href: "/dashboard/listing-copy",
      gradient: "from-purple-600 to-indigo-600",
      cta: "Write Bullets",
    },
    {
      title: "E-Commerce AI Assistant",
      tag: "24/7 Specialist",
      description: "Ask any PPC, ranking, FBA fee, GST tax, or sourcing question with instant actionable advice.",
      icon: MessageSquare,
      href: "/dashboard/ai-chat",
      gradient: "from-pink-600 to-orange-500",
      cta: "Chat with Copilot",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Hero Banner */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-brand-indigo/30 via-brand-violet/20 to-brand-pink/20 border border-brand-violet/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-pink-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Listone.ai Production Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              From one photo to a complete listing.
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Select an existing product project below or launch a new 15-shot generation pack in minutes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
            <Link
              href="/dashboard/image-studio"
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate 15 Images</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121223] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium">Credits Available</span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2">
            <span>{credits}</span>
            <span className="text-xs text-pink-400 font-normal">/ 150</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Deducted only on success</p>
        </div>

        <div className="bg-[#121223] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium">Active Projects</span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {projects.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for exports</p>
        </div>

        <div className="bg-[#121223] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium">Amazon Compliance</span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-6 h-6" />
            <span>100%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">RGB 255 pure white hero</p>
        </div>

        <div className="bg-[#121223] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium">Editable Layers</span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-heading text-brand-pink">
            Canva v2
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Freeform drag & text edit</p>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div>
        <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2">
          <span>Quick Studio Actions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickStartCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[#121223] border border-white/10 hover:border-brand-violet/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                      {card.tag}
                    </span>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-pink-100 transition-colors">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink hover:text-white transition-colors"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="bg-[#121223] border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold font-heading text-white">
              Recent Projects & Listings
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any project to open in Image Studio or Canva Editor
            </p>
          </div>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="text-xs font-bold text-brand-pink hover:text-white flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Create SKU</span>
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                activeProject?.id === proj.id
                  ? "bg-brand-violet/10 border-brand-violet/40 shadow-sm"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet p-0.5 shrink-0">
                  <div className="w-full h-full bg-[#0E0E1A] rounded-[10px] flex items-center justify-center text-xl">
                    📦
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{proj.name}</h4>
                    {activeProject?.id === proj.id && (
                      <span className="text-[10px] bg-brand-pink/20 text-pink-300 font-bold px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {proj.brandName} • {proj.marketplace} • {proj.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {proj.createdAt}
                </span>
                <Link
                  href="/dashboard/image-studio"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Shots</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/dashboard/listing-copy"
                  className="px-3.5 py-2 rounded-xl bg-brand-violet/20 hover:bg-brand-violet/30 text-pink-200 text-xs font-semibold border border-brand-violet/30 flex items-center gap-1.5 transition-colors"
                >
                  <span>Copy</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121223] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="text-xl font-bold font-heading text-white">
              Create New Listing Project
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Organize your product images, A+ modules, and bullets.
            </p>

            <form onSubmit={handleCreateProject} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Product Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Ergonomic Bamboo Laptop Stand"
                  className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="e.g. Ergolyfe"
                  className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Primary Marketplace
                </label>
                <select
                  value={newMarketplace}
                  onChange={(e) => setNewMarketplace(e.target.value)}
                  className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-violet"
                >
                  <option value="Amazon US">Amazon US (2000x2000)</option>
                  <option value="Amazon India">Amazon India (IN)</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Shopify">Shopify Store</option>
                  <option value="Meesho">Meesho</option>
                  <option value="Etsy">Etsy</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo to-brand-pink shadow-md hover:scale-105 transition-transform"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
