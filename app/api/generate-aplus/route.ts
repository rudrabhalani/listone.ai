import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const aplusSchema = z.object({
  productName: z.string().min(2),
  brandName: z.string().default("Brand"),
  category: z.string().default("General"),
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = aplusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid product information", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { productName, brandName, category } = parsed.data;

    // Build the 7 standardized Amazon A+ Content modules
    const modules = [
      {
        id: "mod-1",
        type: "hero_banner",
        dimensions: "970x600",
        name: "Module 1: Hero Banner",
        headline: `IMMERSIVE ACOUSTIC ENGINEERING BY ${brandName.toUpperCase()}`,
        subheadline: "Crafted for discerning listeners who demand pure sound fidelity and enduring ergonomic comfort.",
        altText: `${brandName} ${productName} shown in studio environment with clean ambient lighting`,
      },
      {
        id: "mod-2",
        type: "brand_story",
        dimensions: "970x300",
        name: "Module 2: The Brand Story",
        headline: "Rooted in Passion, Driven by Modern Precision",
        body: `At ${brandName}, our design philosophy is straightforward: eliminate unnecessary complexity and obsess over user comfort. Every component is rigorously calibrated to meet commercial reliability standards without compromising sustainable manufacturing ethics.`,
        altText: `${brandName} heritage and design workshop craft`,
      },
      {
        id: "mod-3",
        type: "four_grid",
        dimensions: "4 x (300x300)",
        name: "Module 3: 4-Card Feature Grid",
        items: [
          {
            title: "Advanced Acoustic Drivers",
            desc: "Custom 40mm diaphragms reproducing subtle instrumental harmonics with rich low-end presence.",
            emoji: "🔊",
          },
          {
            title: "Hybrid Noise Isolation",
            desc: "Dual external microphones actively monitor environment noise for seamless concentration.",
            emoji: "🎙️",
          },
          {
            title: "Memory Foam Ergonomics",
            desc: "Gentle pressure-dispersing earcups built for continuous 8-hour work sessions.",
            emoji: "☁️",
          },
          {
            title: "Fast-Charge Battery",
            desc: "High-capacity lithium cell providing up to 40 hours of continuous wireless playback.",
            emoji: "⚡",
          },
        ],
      },
      {
        id: "mod-4",
        type: "comparison_chart",
        name: "Module 4: Product Comparison Matrix",
        headers: ["Feature Specification", `${brandName} Studio Pro`, "Standard Edition", "Lite Model"],
        rows: [
          { feature: "Active Noise Cancellation", val1: "Hybrid Dual-Mic", val2: "Passive Only", val3: "None" },
          { feature: "Continuous Battery Life", val1: "40 Hours", val2: "24 Hours", val3: "15 Hours" },
          { feature: "Quick Charge (10 Mins)", val1: "4 Hours Playtime", val2: "1.5 Hours", val3: "Not Supported" },
          { feature: "Multipoint Bluetooth 5.3", val1: "Included", val2: "Included", val3: "Single Device" },
          { feature: "Manufacturer Warranty", val1: "2 Years Full", val2: "1 Year", val3: "90 Days" },
        ],
      },
      {
        id: "mod-5",
        type: "sidebar_editorial",
        dimensions: "300x400 + Copy",
        name: "Module 5: Split Image + Text Editorial",
        headline: "Engineered For The Demands Of Travel & Remote Work",
        body: "Whether you are navigating bustling transit stations or working from a neighborhood café, intuitive touch gestures let you cycle seamlessly between Transparency Mode and Active Silence without touching your device.",
        altText: `${productName} worn comfortably in modern travel environment`,
      },
      {
        id: "mod-6",
        type: "specs_table",
        name: "Module 6: Technical Specifications Table",
        specs: [
          { attribute: "Transducer Size", value: "40mm Graphene Composite" },
          { attribute: "Frequency Response", value: "20Hz – 40,000Hz (Hi-Res)" },
          { attribute: "Wireless Standard", value: "Bluetooth 5.3 + AAC / LDAC" },
          { attribute: "Charging Interface", value: "USB Type-C (Fast Charge)" },
          { attribute: "Total Weight", value: "248 grams (Ultra-lightweight)" },
        ],
      },
      {
        id: "mod-7",
        type: "faq_module",
        name: "Module 7: Frequently Asked Questions",
        faqs: [
          {
            q: "Can I connect this to two devices simultaneously?",
            a: "Yes, Multipoint connection enables instant auto-switching between your laptop and smartphone.",
          },
          {
            q: "How do I activate the noise transparency mode?",
            a: "Simply tap the right earcup sensor for 1 second to hear your surroundings clearly.",
          },
          {
            q: "Is a carrying case included in the box?",
            a: "Yes, every order includes a premium hard-shell travel case and audio bypass cable.",
          },
        ],
      },
    ];

    return NextResponse.json({
      success: true,
      modulesCount: 7,
      modules,
      creditsUsed: 10,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "A+ Content generation failed", message: error.message },
      { status: 500 }
    );
  }
}
