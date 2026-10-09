"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "How does the ASIN or product URL input work?",
      answer:
        "When you paste an Amazon ASIN or product listing URL, Listone.ai queries the official Amazon Selling Partner API (SP-API) and licensed e-commerce catalog partners. We fetch the official product title, existing catalog photos, and bullet specifications so you can confirm them before generation. We strictly enforce a zero-scraping policy to keep your account safe and compliant.",
    },
    {
      id: "faq-2",
      question: "Are the generated images compliant with Amazon and marketplace rules?",
      answer:
        "Yes, 100%. Shot #1 is programmatically engineered to meet Amazon's strict main image guidelines: pure RGB (255, 255, 255) white background, no text, no borders, no watermarks, and the product occupying at least 85% of the frame. All infographics and lifestyle shots respect marketplace safe zones so crucial details are never cut off by mobile UI overlays.",
    },
    {
      id: "faq-3",
      question: "Who owns the rights to the generated images and copy?",
      answer:
        "You own full commercial rights to all images, layers, A+ graphics, and copy generated on Listone.ai. You are completely free to use them across Amazon, Flipkart, Shopify, Meesho, social ad campaigns, packaging, and print media without royalties or attribution.",
    },
    {
      id: "faq-4",
      question: "How does the credit system and refund policy work?",
      answer:
        "Credits are deducted only upon successful completion of a generation job. If an image fails quality checks, gets distorted, or if a network interruption occurs, our automated QA pipeline marks the job failed and your credits are refunded to your balance instantly. Subscriptions also include a 7-day money-back satisfaction guarantee.",
    },
    {
      id: "faq-5",
      question: "Which languages and marketplaces does Listone.ai support?",
      answer:
        "Listone.ai supports both international marketplaces (Amazon US/UK/EU/JP, Shopify, Etsy) and leading Indian e-commerce platforms (Flipkart, Meesho, Amazon India). You can generate copy, bullets, and infographics in English, Hindi, Hinglish, Gujarati, Spanish, German, French, and Japanese.",
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#0E0E1A]/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-xs font-semibold text-indigo-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Everything you need to know about ASIN lookup, Amazon compliance, Canva editing, and commercial image ownership.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#121223] border border-white/10 overflow-hidden transition-all duration-200 hover:border-brand-violet/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold font-heading text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-slate-300 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brand-violet/20 text-brand-pink" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
