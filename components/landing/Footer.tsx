"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { Github, Twitter, Linkedin, Instagram, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07070E] border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" size="md" href="/" />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {siteConfig.tagline} Turn one product photo or Amazon ASIN into 15 high-converting listing images, complete A+ content, and optimized bullets.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.founder.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.founder.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.founder.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.founder.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-white/5"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard/image-studio" className="hover:text-white transition-colors">
                  15-Image Generator
                </Link>
              </li>
              <li>
                <Link href="/dashboard/aplus-studio" className="hover:text-white transition-colors">
                  A+ Content Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard/editor" className="hover:text-white transition-colors">
                  Canva-Style Editor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/listing-copy" className="hover:text-white transition-colors">
                  Amazon Listing Bullets
                </Link>
              </li>
              <li>
                <Link href="/dashboard/ai-chat" className="hover:text-white transition-colors">
                  E-Commerce AI Copilot
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#examples" className="hover:text-white transition-colors">
                  Examples Gallery
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  Amazon Compliance Guide
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Credit Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Help Center & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Company (with About as the LAST link) */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
              Company & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              {/* "About" as the LAST link as required by prompt */}
              <li>
                <Link
                  href="/about"
                  className="text-pink-400 font-semibold hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Listone.ai. Built by Rudra Bhalani.</p>
          <p className="flex items-center gap-2">
            <span>Crafted for e-commerce sellers worldwide</span>
            <span>•</span>
            <span className="text-slate-300">v2.0 Production</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
