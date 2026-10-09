import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LayerObject, GeneratedImageItem } from "@/lib/store";
import { getRealisticShotsForProduct } from "@/lib/realistic-images";

const generateImagesSchema = z.object({
  productName: z.string().min(2),
  brandName: z.string().default("Brand"),
  category: z.string().default("Electronics"),
  marketplace: z.string().default("Amazon US"),
  targetAudience: z.string().default("All"),
  brandColors: z.array(z.string()).default(["#4F46E5", "#7C3AED", "#EC4899"]),
  keyFeatures: z.array(z.string()).default([]),
  style: z.enum(["Clean", "Luxury", "Bold", "Minimal", "Festive"]).default("Clean"),
  productCutoutUrl: z.string().optional(),
});

export const runtime = "nodejs";

const SHOT_DEFINITIONS = [
  {
    shotIndex: 1,
    shotType: "main_hero",
    title: "1. Main Image (Amazon Hero)",
    description: "Pure white background (RGB 255,255,255), product occupies 85%+ of frame, no text or watermarks.",
    compliance: "Amazon Rule Compliant: RGB(255,255,255)",
    bg: "#FFFFFF",
  },
  {
    shotIndex: 2,
    shotType: "front_angle",
    title: "2. Dynamic 45° Angle Shot",
    description: "Sculpted studio lighting highlighting key contours, bevels, and tactile finish.",
    compliance: "Studio Lighting",
    bg: "#F8F8FC",
  },
  {
    shotIndex: 3,
    shotType: "back_side",
    title: "3. Back / Side Profile",
    description: "Reveals cable ports, rear ergonomics, seams, and functional design components.",
    compliance: "Detailed Angles",
    bg: "#F1F1F8",
  },
  {
    shotIndex: 4,
    shotType: "macro_detail",
    title: "4. Close-Up Texture & Craftsmanship",
    description: "Macro focus on premium stitching, matte metal textures, and precision finish.",
    compliance: "Texture Detail",
    bg: "#111122",
  },
  {
    shotIndex: 5,
    shotType: "infographic_features",
    title: "5. Infographic: Top 3 Core Features",
    description: "Callout arrows and circular icons detailing the top 3 selling advantages.",
    compliance: "Infographic Safe-Zone",
    bg: "#141428",
  },
  {
    shotIndex: 6,
    shotType: "infographic_dimensions",
    title: "6. Infographic: Exact Dimensions & Weight",
    description: "Measurement callout lines in inches and cm with comparative sizing guide.",
    compliance: "Returns Reducer",
    bg: "#181830",
  },
  {
    shotIndex: 7,
    shotType: "lifestyle_primary",
    title: "7. Primary Lifestyle In-Use Scene",
    description: "Authentic ambient environment showing real-world product usage and context.",
    compliance: "High-CTR Emotional Appeal",
    bg: "#1D1635",
  },
  {
    shotIndex: 8,
    shotType: "lifestyle_secondary",
    title: "8. Secondary Lifestyle Context",
    description: "Alternative usage scenario (e.g. travel, office desk, evening relaxation).",
    compliance: "Context Diversity",
    bg: "#24183E",
  },
  {
    shotIndex: 9,
    shotType: "hands_on_scale",
    title: "9. Hands-On / Human Scale Shot",
    description: "Human hand holding or adjusting product to convey tangible proportions.",
    compliance: "Scale Clarity",
    bg: "#1E1A2C",
  },
  {
    shotIndex: 10,
    shotType: "benefit_banner",
    title: "10. Benefit Callout Header Banner",
    description: "Bold benefit banner highlighting pain-point resolution.",
    compliance: "Direct Response Headline",
    bg: "#16162D",
  },
  {
    shotIndex: 11,
    shotType: "whats_in_box",
    title: "11. What's In The Box Breakdown",
    description: "Neat flat-lay of all included accessories, cables, documentation, and pouch.",
    compliance: "Buyer Expectation Set",
    bg: "#F4F4FA",
  },
  {
    shotIndex: 12,
    shotType: "competitor_vs",
    title: "12. Comparison vs Generic Competitor",
    description: "Side-by-side comparison matrix showing your quality advantages.",
    compliance: "Conversion Booster",
    bg: "#121226",
  },
  {
    shotIndex: 13,
    shotType: "quality_certifications",
    title: "13. Material & Certification Badges",
    description: "Safety seals, BPA-free, CE, FCC, RoHS, or organic quality verification.",
    compliance: "Trust Accelerator",
    bg: "#15152A",
  },
  {
    shotIndex: 14,
    shotType: "how_to_use",
    title: "14. 3-Step How-To-Use Guide",
    description: "Numbered progression steps showing effortless operation.",
    compliance: "Low Friction Onboarding",
    bg: "#171732",
  },
  {
    shotIndex: 15,
    shotType: "brand_story_guarantee",
    title: "15. Brand Story & Warranty Guarantee",
    description: "Trust seal with 2-year warranty and dedicated customer support guarantee.",
    compliance: "Risk Reversal Shield",
    bg: "#1C1433",
  },
];

function buildLayersForShot(
  shot: (typeof SHOT_DEFINITIONS)[0],
  data: z.infer<typeof generateImagesSchema>
): LayerObject[] {
  const { productName, brandName, style } = data;
  const isWhiteHero = shot.shotIndex === 1;

  const layers: LayerObject[] = [
    // 1. Background layer
    {
      id: `bg-${shot.shotIndex}`,
      type: "background",
      name: "Canvas Background",
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      fill: isWhiteHero ? "#FFFFFF" : shot.bg,
      locked: true,
      visible: true,
    },
    // 2. Product cutout layer (always preserved in center)
    {
      id: `product-${shot.shotIndex}`,
      type: "product",
      name: `${brandName} Cutout (Real Pixels)`,
      x: isWhiteHero ? 100 : 180,
      y: isWhiteHero ? 100 : 220,
      width: isWhiteHero ? 800 : 640,
      height: isWhiteHero ? 800 : 640,
      locked: false,
      visible: true,
      opacity: 1,
    },
  ];

  // If not white hero, add editable typography and badge layers
  if (!isWhiteHero) {
    layers.push({
      id: `headline-${shot.shotIndex}`,
      type: "text",
      name: "Headline Text",
      x: 80,
      y: 70,
      width: 840,
      height: 90,
      text: shot.shotIndex === 5
        ? "ENGINEERED FOR SUPREME PERFORMANCE"
        : shot.shotIndex === 6
        ? "PRECISION SPECIFICATIONS & DIMENSIONS"
        : shot.shotIndex === 12
        ? "WHY SMART BUYERS CHOOSE LISTONE"
        : shot.shotIndex === 15
        ? "OFFICIAL 2-YEAR EXTENDED WARRANTY"
        : `${productName.toUpperCase()}`,
      fontSize: 34,
      fontFamily: "Plus Jakarta Sans",
      fontWeight: "800",
      fill: "#FFFFFF",
      locked: false,
      visible: true,
    });

    layers.push({
      id: `badge-${shot.shotIndex}`,
      type: "badge",
      name: "Feature Callout Badge",
      x: 80,
      y: 860,
      width: 320,
      height: 54,
      text: shot.compliance,
      fill: "#EC4899",
      locked: false,
      visible: true,
    });
  }

  return layers;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = generateImagesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid product parameters", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const inputData = parsed.data;
    const realisticPresets = getRealisticShotsForProduct(inputData.category || inputData.productName, inputData.productCutoutUrl);

    // Generate the complete 15 shots with layer graphs and realistic studio photos
    const generatedShots: GeneratedImageItem[] = SHOT_DEFINITIONS.map((def, idx) => {
      const layers = buildLayersForShot(def, inputData);
      const presetPhoto = realisticPresets[idx] || realisticPresets[0];

      return {
        id: `shot-${def.shotIndex}-${Date.now()}`,
        shotIndex: def.shotIndex,
        shotType: def.shotType,
        title: def.title,
        description: def.description,
        previewUrl: presetPhoto ? presetPhoto.imageUrl : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
        status: "ready",
        layers,
      };
    });

    return NextResponse.json({
      success: true,
      shotsCount: 15,
      shots: generatedShots,
      productName: inputData.productName,
      creditsDeducted: 15,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "15-Shot generation failed", message: error.message },
      { status: 500 }
    );
  }
}
