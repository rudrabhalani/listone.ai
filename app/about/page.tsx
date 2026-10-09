"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { aboutConfig } from "@/config/about";
import {
  Sparkles,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Zap,
  Shield,
  Target,
  CheckCircle2,
  Mail,
  Camera,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0B14] text-[#E5E7EB] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* 1. HERO SECTION WITH ANIMATED AURORA GRADIENT */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          {/* Aurora gradient backdrops */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-brand-indigo/25 via-brand-violet/25 to-brand-pink/20 blur-[130px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-pink-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{aboutConfig.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Built by a young entrepreneur,{" "}
              <span className="gradient-text">for sellers everywhere.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {aboutConfig.hero.subheadline}
            </p>
          </div>
        </section>

        {/* 2. FOUNDER CARD SECTION */}
        <section className="mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Photo Upload Slot / Avatar with Gradient Ring */}
              <div className="relative group shrink-0">
                {/* Gradient ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-pink blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#141426] border-2 border-white/20 flex flex-col items-center justify-center text-center p-3 overflow-hidden shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white font-extrabold text-2xl mb-1 shadow-md">
                    {aboutConfig.founder.avatarPlaceholder}
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">Rudra Bhalani</span>
                  <span className="text-[9px] text-pink-300">Founder & Owner</span>

                  {/* Photo Slot Hint */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                    <Camera className="w-5 h-5 text-brand-pink mb-1" />
                    <span className="text-[10px] text-center font-semibold">Photo slot reserved</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-pink/15 text-pink-300 border border-brand-pink/30 text-xs font-bold uppercase tracking-wider mb-2">
                    {aboutConfig.founder.tag}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    {aboutConfig.founder.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-violet font-semibold mt-0.5">
                    {aboutConfig.founder.role} • {aboutConfig.founder.location}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {aboutConfig.founder.bio}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {aboutConfig.founder.extendedBio}
                </p>

                {/* Social Icons */}
                <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
                  <a
                    href={aboutConfig.founder.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={aboutConfig.founder.socials.x}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                    aria-label="X Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={aboutConfig.founder.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={aboutConfig.founder.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR STORY TIMELINE */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-3 py-1 rounded-full">
              Journey & Evolution
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold font-heading text-white">
              The Path to Listone.ai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutConfig.timeline.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#121223] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-3 relative hover:border-brand-violet/40 transition-colors"
              >
                <span className="text-xs font-bold text-brand-pink uppercase tracking-wider block">
                  {step.year}
                </span>
                <h3 className="text-lg font-bold font-heading text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MISSION & VISION CARDS */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${aboutConfig.missionVision.mission.gradient} border ${aboutConfig.missionVision.mission.borderColor} shadow-xl space-y-4`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full">
                Core Purpose
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                {aboutConfig.missionVision.mission.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {aboutConfig.missionVision.mission.description}
              </p>
            </div>

            <div
              className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${aboutConfig.missionVision.vision.gradient} border ${aboutConfig.missionVision.vision.borderColor} shadow-xl space-y-4`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full">
                Future Horizon
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                {aboutConfig.missionVision.vision.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {aboutConfig.missionVision.vision.description}
              </p>
            </div>
          </div>
        </section>

        {/* 5. VALUES SECTION */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Principles We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {aboutConfig.values.map((val) => (
              <div
                key={val.title}
                className="bg-[#121223] border border-white/10 rounded-3xl p-6 text-center space-y-3 hover:border-brand-pink/40 transition-colors"
              >
                <span className="text-4xl block mb-2">{val.emoji}</span>
                <h3 className="text-lg font-bold font-heading text-white">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. STATS COUNTERS (SAMPLE BENCHMARK) */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Growth Benchmarks (Sample Data)
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aboutConfig.stats.map((st, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl text-center">
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {st.value}
                </div>
                <div className="text-xs text-slate-300 mt-1">{st.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase">Sample</div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="mt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-border-box p-1 shadow-2xl">
            <div className="bg-[#121223] rounded-[15px] p-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Start Creating with Listone.ai
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                Join Rudra&apos;s mission to make high-converting e-commerce listings accessible to every brand founder on the planet.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink shadow-lg shadow-brand-violet/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Free Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Rudra & Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
