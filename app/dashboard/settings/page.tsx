"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Check, Key, Bell, User } from "lucide-react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("Aura Goods Official");
  const [sellerEmail, setSellerEmail] = useState("rudra@listone.ai");
  const [marketplaceDefault, setMarketplaceDefault] = useState("Amazon US");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Account & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Manage your seller credentials, default marketplace targets, and API integrations.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Account preferences saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#121223] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Store / Brand Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-violet"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Account Email
            </label>
            <input
              type="email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-violet"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Default Target Marketplace
            </label>
            <select
              value={marketplaceDefault}
              onChange={(e) => setMarketplaceDefault(e.target.value)}
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-violet"
            >
              <option value="Amazon US">Amazon US (2000x2000 Pure White)</option>
              <option value="Amazon IN">Amazon India (IN)</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Shopify">Shopify Store</option>
              <option value="Meesho">Meesho</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted credentials via Supabase RLS</span>
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
