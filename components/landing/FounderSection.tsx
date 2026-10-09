"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Zap,
  ShieldCheck,
  Crown,
} from "lucide-react";

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-24 bg-[#080811] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-indigo/15 via-brand-violet/15 to-brand-pink/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Pill */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-xs font-bold text-pink-300">
            <Crown className="w-3.5 h-3.5 text-brand-pink" />
            <span>Meet The Founder</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            The Vision Behind Listone.ai
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Built by a 17-year-old entrepreneur with an obsession for generative AI and e-commerce growth.
          </p>
        </div>

        {/* Founder Card with Black Little Blur Photo Background */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-br from-white/10 via-brand-violet/20 to-brand-pink/20 shadow-2xl">
          <div className="rounded-[22px] bg-black/75 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 md:p-14">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              {/* Photo Container with black little blur photo bg */}
              <div className="relative shrink-0">
                {/* Soft blurred ambient glow behind the portrait */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink rounded-3xl opacity-30 blur-2xl pointer-events-none" />

                {/* Portrait Frame with subtle dark blur backdrop */}
                <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/60 backdrop-blur-md flex items-center justify-center group">
                  <Image
                    src="/founder.jpg"
                    alt="BHALANI RUDRA SANDIPBHAI - Founder & Owner of Listone.ai"
                    fill
                    sizes="(max-width: 768px) 256px, 288px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Gradient shadow overlay at the bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                  {/* Badges on the photo */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-pink/90 text-white backdrop-blur-md shadow-md">
                      17-Year-Old Founder
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                      Owner Access
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder Details & Story */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink uppercase tracking-widest mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Founder & Owner</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                    BHALANI RUDRA SANDIPBHAI
                  </h3>
                  <p className="text-sm font-semibold text-slate-400 mt-1">
                    17-year-old entrepreneur • Creator of Listone.ai
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  &quot;Rudra started Listone.ai with one goal: give every online seller, big or small, access to professional product images, A+ content, and listing optimization without expensive studios or agencies.&quot;
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Frustrated by seeing small sellers spend $800+ per SKU at design agencies or get rejected by Amazon due to poor smartphone lighting, Rudra engineered an AI pipeline that turns one raw photo into 15 photorealistic studio images, complete A+ content, and algorithmic SEO bullets in seconds.
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-slate-200">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Instant AI in Seconds:</strong> No waiting minutes for 3D renders</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Photorealistic Studio Quality:</strong> True product pixels preserved</span>
                  </div>
                </div>

                {/* Social Links & CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.founder.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.founder.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                      aria-label="X Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.founder.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.founder.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/10"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold text-pink-300 hover:text-white transition-colors group"
                  >
                    <span>Read Full Founder Story & Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
