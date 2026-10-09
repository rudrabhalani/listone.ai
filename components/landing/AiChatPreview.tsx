"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Sparkles, Send, Copy, Check, ArrowRight } from "lucide-react";

export const AiChatPreview: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-24 bg-[#0E0E1A]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
            Autonomous E-Com Specialist
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            An AI assistant that actually knows Amazon & E-Commerce
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Trained on marketplace algorithms, A9 indexing rules, PPC bids, and GST/FBA logistics. Ask anything in English, Hindi, or Hinglish.
          </p>
        </div>

        {/* Chat Interface Preview Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#121223] border border-white/15 shadow-2xl overflow-hidden shadow-brand-violet/10">
          {/* Header Bar */}
          <div className="bg-[#0B0B14] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink p-0.5 shadow-md">
                <div className="w-full h-full bg-[#121223] rounded-[10px] flex items-center justify-center text-pink-300">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Listone.ai E-Commerce Copilot</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-xs text-slate-400">
                  Amazon PPC • SEO Bullets • FBA Rules • Sourcing
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/ai-chat"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <span>Open Full Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Conversation Stream */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#0E0E1A]">
            {/* User message 1 */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-brand-violet/20 border border-brand-violet/30 rounded-2xl rounded-tr-none px-5 py-3 max-w-xl text-sm text-slate-200">
                Can you rewrite my 1st bullet point for active noise cancelling headphones? My current one is just: &quot;Has good noise canceling and clear sound&quot;.
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                You
              </div>
            </div>

            {/* AI Response 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white shrink-0 text-xs font-bold">
                L1
              </div>
              <div className="bg-[#18182E] border border-white/10 rounded-2xl rounded-tl-none p-5 max-w-2xl text-sm space-y-3">
                <p className="text-slate-300">
                  Here is an optimized Amazon-compliant bullet following the high-converting <strong>CAPITALIZED BENEFIT + FEATURE</strong> formula (182 characters, index-safe):
                </p>

                <div className="bg-[#0B0B14] p-4 rounded-xl border border-brand-violet/30 relative group">
                  <p className="font-medium text-white text-sm leading-relaxed">
                    <strong>SILENT CLOUD ACOUSTICS:</strong> Blocks up to 98% of ambient engine and office noise using dual hybrid ANC microphones, providing immersion and crystal-clear calls anywhere.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
                    <span>Character count: 182 / 200 • Policy safe</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          "SILENT CLOUD ACOUSTICS: Blocks up to 98% of ambient engine and office noise using dual hybrid ANC microphones, providing immersion and crystal-clear calls anywhere.",
                          "msg-1"
                        )
                      }
                      className="inline-flex items-center gap-1 text-brand-pink hover:text-white"
                    >
                      {copiedId === "msg-1" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy bullet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* User message 2 */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-brand-violet/20 border border-brand-violet/30 rounded-2xl rounded-tr-none px-5 py-3 max-w-xl text-sm text-slate-200">
                My TACoS on Amazon PPC is 28% for a $35 item. How should I optimize exact vs broad match bids?
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                You
              </div>
            </div>

            {/* AI Response 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white shrink-0 text-xs font-bold">
                L1
              </div>
              <div className="bg-[#18182E] border border-white/10 rounded-2xl rounded-tl-none p-5 max-w-2xl text-sm space-y-3">
                <p className="text-slate-300">
                  For a $35 selling price with a target profit margin, 28% TACoS usually signals broad bleed. Here is your immediate 3-step action plan:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Harvest Exact Winners:</strong> Filter search terms report for queries with ≥3 orders and &lt;20% ACoS. Move these into a dedicated Single-Keyword Exact Campaign at 1.15x current bid.
                  </li>
                  <li>
                    <strong className="text-white">Negative Match the Broad:</strong> Immediately add those newly harvested exact keywords as <em>Negative Exact</em> in your Broad campaign to prevent bidding against yourself.
                  </li>
                  <li>
                    <strong className="text-white">Cap Non-Converting Clicks:</strong> Add negative phrase for terms with 10+ clicks and 0 orders over the past 30 days.
                  </li>
                </ol>
                <p className="text-xs text-slate-400 italic">
                  Note: Marketplace advertising algorithms change frequently; check current Amazon Advertising guidelines to verify bid multipliers.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Input Teaser */}
          <div className="p-4 bg-[#0B0B14] border-t border-white/10 flex items-center gap-3">
            <input
              type="text"
              readOnly
              value="Ask anything: 'Write a listing for my bamboo cutting board' or 'How do I calculate GST on FBA?'"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-pointer"
              onClick={() => {
                window.location.href = "/dashboard/ai-chat";
              }}
            />
            <Link
              href="/dashboard/ai-chat"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
