export interface RealisticShotPreset {
  shotIndex: number;
  shotType: string;
  title: string;
  description: string;
  complianceTag: string;
  imageUrl: string;
  bgType: "pure_white" | "studio" | "lifestyle" | "macro" | "infographic";
}

export interface ProductCategoryPreset {
  id: string;
  label: string;
  icon: string;
  defaultName: string;
  defaultBrand: string;
  defaultImage: string;
  defaultFeatures: string[];
}

export const PRODUCT_CATEGORIES: ProductCategoryPreset[] = [
  {
    id: "shoes",
    label: "Footwear & Sneakers",
    icon: "👟",
    defaultName: "CloudPace Pro Cushion Running Sneakers",
    defaultBrand: "CloudPace Athletics",
    defaultImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Ultra-Responsive Nitrogen Foam Cushioning",
      "Breathable Engineered Engineered Mesh Upper",
      "All-Weather Anti-Slip Carbon Rubber Outsole",
    ],
  },
  {
    id: "watches",
    label: "Watches & Luxury",
    icon: "⌚",
    defaultName: "Apex Chronograph Sapphire Automatic Watch",
    defaultBrand: "Apex Horology",
    defaultImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Scratch-Resistant Curved Sapphire Crystal",
      "Precision 24-Jewel Japanese Automatic Movement",
      "100M Water Resistance with Surgical Stainless Steel",
    ],
  },
  {
    id: "backpacks",
    label: "Bags & Backpacks",
    icon: "🎒",
    defaultName: "NomadShield Waterproof Commuter Backpack",
    defaultBrand: "NomadShield Gear",
    defaultImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Ballistic Recycled Cordura Waterproof Fabric",
      "Dedicated 16-Inch Shock-Absorbing Laptop Sleeve",
      "Ergonomic Breathable Air-Mesh Back Channel",
    ],
  },
  {
    id: "skincare",
    label: "Skincare & Wellness",
    icon: "🧴",
    defaultName: "Pure Botanics Radiance Vitamin C Facial Serum",
    defaultBrand: "Pure Botanics",
    defaultImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Stabilized 20% Cold-Pressed Kakadu Plum Vitamin C",
      "Triple Multi-Molecular Hyaluronic Acid Matrix",
      "100% Certified Vegan, Hypoallergenic & Cruelty-Free",
    ],
  },
  {
    id: "headphones",
    label: "Audio & Electronics",
    icon: "🎧",
    defaultName: "Aura Acoustics Pro Wireless ANC Headphones",
    defaultBrand: "Aura Acoustics",
    defaultImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Custom 40mm Graphene High-Fidelity Acoustic Drivers",
      "Hybrid Active Noise Cancellation with Ambient Aware",
      "40-Hour Extended Battery Life with Rapid USB-C Charge",
    ],
  },
  {
    id: "drinkware",
    label: "Kitchen & Tumblers",
    icon: "☕",
    defaultName: "HydroFlow 32oz Insulated Stainless Steel Tumbler",
    defaultBrand: "HydroFlow Gear",
    defaultImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "Double-Wall Vacuum Insulation Keeps Cold for 24 Hours",
      "Food-Grade 18/8 Pro Stainless Steel - Zero Metal Taste",
      "100% Leak-Proof Magnetic Slider Sip Lid",
    ],
  },
  {
    id: "sunglasses",
    label: "Fashion & Eyewear",
    icon: "🕶️",
    defaultName: "TitanOptics Polarized Aerospace Sunglasses",
    defaultBrand: "TitanOptics",
    defaultImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85",
    defaultFeatures: [
      "High-Definition Triacetate Polarized UV400 Lenses",
      "Ultra-Light Aerospace Titanium Memory Frame",
      "Hydrophobic Oleophobic Scratch-Proof Nano Coating",
    ],
  },
];

export const SHOT_DEFINITIONS: Array<{
  shotIndex: number;
  shotType: string;
  title: string;
  descriptionTemplate: (productName: string, brandName: string) => string;
  complianceTag: string;
  bgType: "pure_white" | "studio" | "lifestyle" | "macro" | "infographic";
}> = [
  {
    shotIndex: 1,
    shotType: "main_hero",
    title: "1. Main Hero Image (Amazon Compliance)",
    descriptionTemplate: (p) => `Pure white RGB(255,255,255) background, ${p} occupies 85%+ of frame with natural contact shadow. No text or watermarks.`,
    complianceTag: "Amazon RGB(255,255,255) Verified",
    bgType: "pure_white",
  },
  {
    shotIndex: 2,
    shotType: "front_angle",
    title: "2. Dynamic 45° Angle Studio Showcase",
    descriptionTemplate: (p) => `Elevated circular studio pedestal with ambient spotlight highlighting ${p} contours and dimensional depth.`,
    complianceTag: "45° Studio Lighting",
    bgType: "studio",
  },
  {
    shotIndex: 3,
    shotType: "side_profile",
    title: "3. Precision Architecture & Profile",
    descriptionTemplate: (p) => `Geometric architectural studio display showcasing structural integrity, premium build, and tactile finish.`,
    complianceTag: "Precision Build Quality",
    bgType: "studio",
  },
  {
    shotIndex: 4,
    shotType: "macro_detail",
    title: "4. Macro Close-Up: Texture & Craftsmanship",
    descriptionTemplate: (p) => `High-tech 10x optical magnifying loupe revealing high-grade materials, precision joints, and zero defect manufacturing.`,
    complianceTag: "10x Macro Inspection",
    bgType: "macro",
  },
  {
    shotIndex: 5,
    shotType: "infographic_features",
    title: "5. Infographic: Top 3 Core Selling Points",
    descriptionTemplate: (p, b) => `Dynamic high-converting visual cards calling out the 3 primary value propositions and benefits of ${p}.`,
    complianceTag: "High-CTR Infographic",
    bgType: "infographic",
  },
  {
    shotIndex: 6,
    shotType: "infographic_dimensions",
    title: "6. Infographic: Technical Dimensions & Weight",
    descriptionTemplate: (p) => `Crisp blueprint dimension measurement lines with dual-arrow indicators for height, width, and ergonomic weight.`,
    complianceTag: "Dimension Scale Blueprint",
    bgType: "infographic",
  },
  {
    shotIndex: 7,
    shotType: "lifestyle_tabletop",
    title: "7. Authentic In-Use Lifestyle Tabletop",
    descriptionTemplate: (p) => `Natural wood tabletop setting with soft ambient morning daylight and authentic depth of field.`,
    complianceTag: "Editorial Lifestyle",
    bgType: "lifestyle",
  },
  {
    shotIndex: 8,
    shotType: "lifestyle_editorial",
    title: "8. Luxury Minimalist Architectural Scene",
    descriptionTemplate: (p) => `Contemporary architectural stone surface with directional soft sunlight accentuating modern aesthetic appeal.`,
    complianceTag: "Luxury Editorial Scene",
    bgType: "lifestyle",
  },
  {
    shotIndex: 9,
    shotType: "hands_on_scale",
    title: "9. Human Scale & Ergonomics Guide",
    descriptionTemplate: (p) => `Visual scale proportion guide demonstrating compact portability, ergonomic comfort, and everyday fit.`,
    complianceTag: "Ergonomic Scale Clarity",
    bgType: "lifestyle",
  },
  {
    shotIndex: 10,
    shotType: "benefit_banner",
    title: "10. Commercial Benefit Callout Banner",
    descriptionTemplate: (p, b) => `High-impact marketing hero banner: 'ENGINEERED FOR EXCELLENCE • MAXIMUM COMFORT & PERFORMANCE'.`,
    complianceTag: "High-Impact Commercial",
    bgType: "infographic",
  },
  {
    shotIndex: 11,
    shotType: "whats_in_box",
    title: "11. What's In The Box Unboxing Layout",
    descriptionTemplate: (p, b) => `Complete retail unboxing layout showing ${p} alongside official retail packaging, user guide, and warranty card.`,
    complianceTag: "Complete Unboxing Kit",
    bgType: "studio",
  },
  {
    shotIndex: 12,
    shotType: "competitor_vs",
    title: "12. Comparison Matrix: Our Brand vs Generic",
    descriptionTemplate: (p, b) => `High-converting split comparison showing 4 verified advantages of ${b} vs low-cost generic competitor flaws.`,
    complianceTag: "A/B Conversion Boost (+34%)",
    bgType: "infographic",
  },
  {
    shotIndex: 13,
    shotType: "quality_certifications",
    title: "13. Official Quality & Trust Certifications",
    descriptionTemplate: (p, b) => `Official holographic quality seals: 100% Quality Inspected, CE/RoHS Verified, and Eco-Friendly Packaging.`,
    complianceTag: "Triple Trust Seals",
    bgType: "infographic",
  },
  {
    shotIndex: 14,
    shotType: "how_to_use",
    title: "14. 3-Step Quick Start Setup Guide",
    descriptionTemplate: (p) => `Numbered visual setup workflow: 1. Unbox & Inspect • 2. 60-Second Quick Setup • 3. Enjoy Peak Performance.`,
    complianceTag: "Frictionless 3-Step Setup",
    bgType: "infographic",
  },
  {
    shotIndex: 15,
    shotType: "brand_guarantee",
    title: "15. 100% Money-Back Guarantee Shield",
    descriptionTemplate: (p, b) => `Radiant golden 30-Day Money-Back Guarantee shield backed by ${b}'s 2-Year full replacement warranty.`,
    complianceTag: "30-Day Guarantee Shield",
    bgType: "infographic",
  },
];

export function getRealisticShotsForProduct(
  categoryOrId: string,
  customImage?: string,
  productName?: string,
  brandName?: string
): RealisticShotPreset[] {
  const lower = (categoryOrId || "").toLowerCase();

  // Find matching category preset
  let matchedCategory = PRODUCT_CATEGORIES.find((c) => c.id === lower);

  if (!matchedCategory) {
    if (lower.includes("shoe") || lower.includes("footwear") || lower.includes("sneaker")) {
      matchedCategory = PRODUCT_CATEGORIES[0]; // shoes
    } else if (lower.includes("watch") || lower.includes("jewel") || lower.includes("luxury")) {
      matchedCategory = PRODUCT_CATEGORIES[1]; // watches
    } else if (lower.includes("bag") || lower.includes("pack") || lower.includes("travel")) {
      matchedCategory = PRODUCT_CATEGORIES[2]; // backpacks
    } else if (lower.includes("skin") || lower.includes("beauty") || lower.includes("serum") || lower.includes("cream")) {
      matchedCategory = PRODUCT_CATEGORIES[3]; // skincare
    } else if (lower.includes("drink") || lower.includes("bottle") || lower.includes("tumbler") || lower.includes("cup")) {
      matchedCategory = PRODUCT_CATEGORIES[5]; // drinkware
    } else if (lower.includes("glass") || lower.includes("eyewear") || lower.includes("sunglass")) {
      matchedCategory = PRODUCT_CATEGORIES[6]; // sunglasses
    } else {
      matchedCategory = PRODUCT_CATEGORIES[0]; // default to sneakers (visually distinct and universal)
    }
  }

  const pName = productName || matchedCategory.defaultName;
  const bName = brandName || matchedCategory.defaultBrand;
  const activeImage = customImage || matchedCategory.defaultImage;

  return SHOT_DEFINITIONS.map((def) => ({
    shotIndex: def.shotIndex,
    shotType: def.shotType,
    title: def.title,
    description: def.descriptionTemplate(pName, bName),
    complianceTag: def.complianceTag,
    imageUrl: activeImage,
    bgType: def.bgType,
  }));
}
