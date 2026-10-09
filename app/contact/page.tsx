"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { siteConfig } from "@/config/site";
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, MapPin } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-4">
            Contact Rudra & The Team
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Have questions about enterprise bulk ASIN processing, API access, or custom catalog models? We are here to help.
          </p>
        </div>

        {sentSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thank you! Your message has been received. Rudra will reply shortly.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 md:col-span-1 border border-white/10">
            <h3 className="text-base font-bold font-heading text-white">Direct Contacts</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Founder Email</div>
                  <div className="text-slate-400 font-mono">rudra@listone.ai</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Support & Sales</div>
                  <div className="text-slate-400 font-mono">support@listone.ai</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Headquarters</div>
                  <div className="text-slate-400">Gujarat, India (Global SaaS)</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 md:col-span-2 border border-white/10"
          >
            <h3 className="text-base font-bold font-heading text-white">Send Us a Direct Message</h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rudra / Seller Name"
                className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@brand.com"
                className="w-full bg-[#0B0B14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Message / Inquiry</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your brand, SKU volume, or questions..."
                className="w-full bg-[#0B0B14] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
