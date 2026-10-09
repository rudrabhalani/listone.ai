"use client";

import React from "react";

export const MarketplaceMarquee: React.FC = () => {
  const marketplaces = [
    "Amazon",
    "Flipkart",
    "Shopify",
    "Etsy",
    "Meesho",
  ];

  // Repeat for continuous seamless marquee
  const repeated = [...marketplaces, ...marketplaces, ...marketplaces, ...marketplaces];

  return (
    <div className="border-y border-white/10 bg-[#0E0E1A]/60 py-6 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 text-center mb-3">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Optimized for compliance & maximum conversions on top marketplaces
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B14] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap items-center">
          {repeated.map((name, idx) => (
            <div
              key={idx}
              className="inline-flex items-center mx-8 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-heading">
                {name}
              </span>
              <span className="ml-8 text-white/20 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
