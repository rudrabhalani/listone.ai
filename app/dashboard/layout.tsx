"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { AppProvider, useApp } from "@/lib/store";
import {
  FolderKanban,
  Image as ImageIcon,
  Sliders,
  FileText,
  MessageSquare,
  Palette,
  CreditCard,
  Settings,
  Sparkles,
  Menu,
  X,
  Plus,
  Coins,
  ChevronDown,
  Bell,
  ExternalLink,
} from "lucide-react";

const navigationItems = [
  { name: "Projects", href: "/dashboard", icon: FolderKanban },
  { name: "Image Studio", href: "/dashboard/image-studio", icon: ImageIcon, badge: "15 Shots" },
  { name: "A+ Studio", href: "/dashboard/aplus-studio", icon: Sliders },
  { name: "Listing Copy", href: "/dashboard/listing-copy", icon: FileText },
  { name: "AI Chat", href: "/dashboard/ai-chat", icon: MessageSquare, badge: "Copilot" },
  { name: "Brand Kit", href: "/dashboard/brand-kit", icon: Palette },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const DashboardNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { credits, projects, activeProject, setActiveProject } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090912] text-[#E5E7EB] flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0E0E1A] border-b border-white/10 z-40 sticky top-0">
        <Logo variant="full" size="sm" href="/" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-xs font-bold text-pink-300">
            <Coins className="w-3.5 h-3.5 text-brand-pink" />
            <span>{credits}</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0D0D18] border-r border-white/10 flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo variant="full" size="md" href="/" />
          </div>

          {/* Active Project Switcher */}
          <div className="mt-5 relative">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">
              Active Project
            </label>
            <button
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-colors"
            >
              <span className="truncate">{activeProject ? activeProject.name : "Select Project"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            </button>

            {projectDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#141424] border border-white/15 rounded-xl shadow-2xl p-2 z-50">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p);
                      setProjectDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs truncate transition-colors ${
                      activeProject?.id === p.id
                        ? "bg-brand-violet/20 text-brand-pink font-bold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-brand-indigo/30 to-brand-violet/30 text-white border border-brand-violet/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-brand-pink" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-brand-pink/20 text-pink-300 font-bold border border-brand-pink/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Credits Card */}
        <div className="p-5 border-t border-white/10 bg-[#090912]/80 space-y-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-indigo/20 via-brand-violet/20 to-brand-pink/20 border border-brand-violet/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-brand-pink" />
                <span>Credits</span>
              </span>
              <span className="text-xs font-extrabold text-pink-300 font-mono">
                {credits} left
              </span>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-indigo to-brand-pink h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (credits / 150) * 100)}%` }}
              />
            </div>
            <Link
              href="/dashboard/billing"
              className="mt-3 block text-center py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors"
            >
              Get More Credits
            </Link>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-violet/40 text-pink-200 flex items-center justify-center font-bold text-[10px]">
                RB
              </div>
              <span className="truncate max-w-[90px] text-slate-300 font-medium">Rudra</span>
            </div>
            <Link href="/" className="hover:text-white flex items-center gap-1 text-[11px]">
              <span>Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex h-16 border-b border-white/10 bg-[#0B0B14]/80 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-300">
              Workspace:
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white">
              {activeProject?.name || "Listone Studio"}
            </span>
            <span className="text-xs text-slate-400">({activeProject?.marketplace || "Amazon"})</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md shadow-brand-violet/20 hover:scale-105 transition-transform"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>{credits} Credits</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">+ Add</span>
            </Link>

            <Link
              href="/dashboard/image-studio"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New 15-Shot Pack</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <DashboardNav>{children}</DashboardNav>
    </AppProvider>
  );
}
