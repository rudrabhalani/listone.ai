"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  store: string;
  avatarText: string;
  quote: string;
  marketplace: string;
  rating: number;
}

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "E-Commerce Founder",
      store: "Aura Essentials (D2C & Amazon)",
      avatarText: "AM",
      quote:
        "We used to pay photography studios $800 per SKU and wait two weeks for retouching. With Listone.ai, we uploaded raw iPhone photos of our skincare serum and got 15 Amazon-ready listing images with editable Canva layers in literally 3 minutes.",
      marketplace: "Amazon & Shopify",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Amazon 7-Figure Private Label Seller",
      store: "PeakLife Outdoors",
      avatarText: "SJ",
      quote:
        "The A+ Content Studio alone is worth 10x the price. I generated an entire 7-module layout, exported 970x600 banners and mobile-friendly comparison grids, and saw an immediate 22% bump in unit session percentage.",
      marketplace: "Amazon US & UK",
      rating: 5,
    },
    {
      id: 3,
      name: "Vikram Singhania",
      role: "Brand Director",
      store: "Kavya Organics",
      avatarText: "VS",
      quote:
        "Unlike generic AI photo generators that hallucinate fake product logos or warp colors, Listone.ai preserved our exact packaging and generated accurate feature callouts and dimensions. Truly built for real sellers.",
      marketplace: "Flipkart & Meesho",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-[#0B0B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <span>Sample Seller Testimonials (Beta Feedback Simulator)</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Loved by fast-growing e-commerce sellers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Here is what pilot brand founders experience when replacing expensive photo shoots with Listone.ai.
          </p>
        </div>

        {/* Carousel / Glass Cards */}
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
            {/* Top quote icon */}
            <Quote className="w-12 h-12 text-brand-pink/20 absolute top-6 right-6 pointer-events-none" />

            <div className="flex items-center gap-1 mb-6 text-amber-400">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-xs text-slate-400 font-semibold">(5.0 Sample Rating)</span>
            </div>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed italic font-normal">
              &quot;{testimonials[currentIndex].quote}&quot;
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-pink flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {testimonials[currentIndex].avatarText}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].store}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-pink font-semibold px-2.5 py-1 rounded-md bg-brand-pink/10 border border-brand-pink/20">
                  {testimonials[currentIndex].marketplace}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Sample
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-brand-indigo to-brand-pink"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
