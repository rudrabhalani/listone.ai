"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  MessageSquare,
  Sparkles,
  Send,
  Copy,
  Check,
  ArrowRight,
  Package,
  Layers,
  ChevronDown,
  RefreshCw,
  FileEdit,
  Globe2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AiChatPage() {
  const router = useRouter();
  const { activeProject, deductCredits, credits } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      content: `Hello! I am your **Listone.ai E-Commerce Copilot**. I specialize in Amazon, Flipkart, Shopify, Meesho, PPC bid strategies, A9 keyword ranking, FBA/FBM operations, GST, and high-converting listing copy.

I can also answer general business and technical questions, and communicate fluently in English, Hindi, Gujarati, or Hinglish.

How can I help boost your sales today?`,
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useProductContext, setUseProductContext] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickChips = [
    { label: "Write 5 Bullets", prompt: "Write 5 high-converting Amazon bullet points with capitalized benefit headers." },
    { label: "Find High-Volume Keywords", prompt: "Give me the top 10 search terms and backend keywords for my product category." },
    { label: "Improve My Title", prompt: "How can I rewrite my product title to maximize click-through rate while staying under 200 characters?" },
    { label: "Amazon PPC Bids", prompt: "How do I structure my Exact vs Broad Amazon PPC campaigns to lower TACoS?" },
    { label: "GST & Logistics (India)", prompt: "Explain the GST TCS deductions and RTO return buffer needed for Meesho and Flipkart." },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          productContext: useProductContext && activeProject
            ? {
                title: activeProject.name,
                brand: activeProject.brandName,
                marketplace: activeProject.marketplace,
                category: activeProject.category,
              }
            : undefined,
          history: messages.slice(-4),
        }),
      });

      const data = await response.json();
      deductCredits(1);

      const assistantMessage: Message = {
        id: "asst-" + Date.now(),
        sender: "assistant",
        content: data.reply || "I am ready to assist with your next listing inquiry.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: "asst-" + Date.now(),
        sender: "assistant",
        content: "I encountered a network timeout. Please verify your connection or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendToEditor = (content: string) => {
    // Save to local storage for listing copy prefill
    try {
      localStorage.setItem("listone_draft_bullets", content);
    } catch {}
    router.push("/dashboard/listing-copy?from=ai_chat");
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-[#121223] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Top Chat Header */}
      <div className="bg-[#0D0D19] px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121223] rounded-[10px] flex items-center justify-center text-pink-300">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Listone.ai E-Commerce Copilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe2 className="w-3.5 h-3.5 text-brand-pink" />
              <span>Multi-lingual: English, Hindi, Hinglish, Gujarati</span>
            </div>
          </div>
        </div>

        {/* Product Context Toggle Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setUseProductContext(!useProductContext)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              useProductContext
                ? "bg-brand-violet/20 border border-brand-violet/40 text-pink-200"
                : "bg-white/5 border border-white/10 text-slate-400"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product: {activeProject ? activeProject.name.slice(0, 20) + "..." : "Default SKU"}</span>
            <span className={`w-2 h-2 rounded-full ${useProductContext ? "bg-emerald-400" : "bg-slate-500"}`} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#0E0E1A]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white shrink-0 text-xs font-bold shadow">
                L1
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-5 text-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-brand-indigo/30 to-brand-violet/30 border border-brand-violet/40 text-white rounded-tr-none shadow"
                  : "bg-[#18182E] border border-white/10 text-slate-200 rounded-tl-none space-y-3 shadow-lg"
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>

              {msg.sender === "assistant" && msg.id !== "msg-welcome" && (
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{msg.timestamp}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleSendToEditor(msg.content)}
                      className="inline-flex items-center gap-1 text-brand-pink hover:text-pink-200 font-semibold transition-colors"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span>Send to Listing Copy</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                You
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white shrink-0 text-xs font-bold">
              L1
            </div>
            <div className="bg-[#18182E] border border-white/10 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-pink" />
              <span>Analyzing listing guidelines & synthesizing strategy...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-6 py-2.5 bg-[#0D0D19] border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] uppercase font-bold text-slate-400 shrink-0">Quick prompts:</span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSendMessage(chip.prompt)}
            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="p-4 bg-[#090912] border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about PPC bids, rewrite bullet points, calculate FBA fees, or GST rules..."
            className="flex-1 bg-[#121223] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-105 active:scale-95 disabled:opacity-40 transition-all flex items-center gap-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
