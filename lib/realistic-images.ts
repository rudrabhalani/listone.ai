export interface RealisticShotPreset {
  shotIndex: number;
  shotType: string;
  title: string;
  description: string;
  complianceTag: string;
  imageUrl: string;
  bgType: "pure_white" | "studio" | "lifestyle" | "macro" | "infographic";
}

export const REALISTIC_PRODUCT_SETS: Record<string, RealisticShotPreset[]> = {
  headphones: [
    {
      shotIndex: 1,
      shotType: "main_hero",
      title: "1. Main Hero Image (Amazon Compliance)",
      description: "Pure white RGB(255,255,255) background, product occupies 85%+ of frame, no text or watermarks.",
      complianceTag: "Amazon RGB(255,255,255) Verified",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      bgType: "pure_white",
    },
    {
      shotIndex: 2,
      shotType: "front_angle",
      title: "2. Dynamic 45° Angle Shot",
      description: "Crisp studio key-lighting highlighting headband curve and ear-cup bevels.",
      complianceTag: "45° Studio Lighting",
      imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 3,
      shotType: "back_side",
      title: "3. Side Profile & Port Architecture",
      description: "Highlights USB-C fast charging port, 3.5mm bypass jack, and tactile control buttons.",
      complianceTag: "Functional Profile",
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 4,
      shotType: "macro_detail",
      title: "4. Macro Close-Up: Texture & Stitching",
      description: "Extreme close-up revealing protein leather ear cushions and brushed aluminum hinges.",
      complianceTag: "Macro Texture Focus",
      imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85",
      bgType: "macro",
    },
    {
      shotIndex: 5,
      shotType: "infographic_features",
      title: "5. Infographic: Acoustic Architecture",
      description: "Callout arrows detailing 40mm graphene drivers, hybrid dual-mic ANC, and Bluetooth 5.3.",
      complianceTag: "High-CTR Infographic",
      imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 6,
      shotType: "infographic_dimensions",
      title: "6. Infographic: Exact Dimensions & Weight",
      description: "Exact measurement lines: 7.4\" height x 6.8\" width, featherlight 248 grams.",
      complianceTag: "Dimension Guide",
      imageUrl: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 7,
      shotType: "lifestyle_primary",
      title: "7. Primary Lifestyle: Focus & Productivity",
      description: "Modern minimalist workspace with laptop, notebook, and warm ambient lighting.",
      complianceTag: "Editorial In-Use",
      imageUrl: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 8,
      shotType: "lifestyle_secondary",
      title: "8. Secondary Lifestyle: Studio & Travel",
      description: "Professional audio mixing console context conveying studio-grade caliber.",
      complianceTag: "Context Diversity",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 9,
      shotType: "hands_on_scale",
      title: "9. Hands-On / Human Scale View",
      description: "Model wearing and adjusting the headphones to demonstrate true human scale and fit.",
      complianceTag: "Human Scale Clarity",
      imageUrl: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 10,
      shotType: "benefit_banner",
      title: "10. Benefit Callout Header Banner",
      description: "Bold direct response graphic: 'ESCAPE DISTRACTIONS. DISCOVER PURE SOUND.'",
      complianceTag: "Benefit-First Banner",
      imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 11,
      shotType: "whats_in_box",
      title: "11. What's In The Box Flat-Lay",
      description: "Neat flat-lay with hard travel case, USB-C braided cable, 3.5mm cord, and quick-start card.",
      complianceTag: "Complete Packaging Set",
      imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 12,
      shotType: "competitor_vs",
      title: "12. Comparison vs Generic Competitors",
      description: "Visual matrix highlighting graphene drivers vs cheap dynamic drivers, 40h vs 18h battery.",
      complianceTag: "Conversion Matrix",
      imageUrl: "https://images.unsplash.com/photo-1520170353670-660999538603?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 13,
      shotType: "quality_certifications",
      title: "13. Material & Certification Seals",
      description: "Hi-Res Audio Certified, RoHS Compliant, CE, and FCC regulatory approval badges.",
      complianceTag: "Trust Accelerator",
      imageUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 14,
      shotType: "how_to_use",
      title: "14. 3-Step Effortless Setup Guide",
      description: "1. Turn on Bluetooth • 2. Tap to Pair Instantly • 3. Enjoy Multi-Device Auto-Switching.",
      complianceTag: "Onboarding Walkthrough",
      imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 15,
      shotType: "brand_story_guarantee",
      title: "15. Brand Story & 2-Year Warranty Shield",
      description: "Official 2-Year Full Manufacturer Guarantee and 24/7 dedicated seller support.",
      complianceTag: "Risk Reversal Guarantee",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
  ],

  serum: [
    {
      shotIndex: 1,
      shotType: "main_hero",
      title: "1. Main Hero Image (Amazon Compliance)",
      description: "Pure white RGB(255,255,255) background, dark amber dropper bottle centered at 85%+ frame.",
      complianceTag: "Amazon RGB(255,255,255) Verified",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85",
      bgType: "pure_white",
    },
    {
      shotIndex: 2,
      shotType: "front_angle",
      title: "2. Sculpted Angle with Bottle Radiance",
      description: "Studio backlight illuminating amber glass clarity and minimalist label typography.",
      complianceTag: "Luxury Studio Lighting",
      imageUrl: "https://images.unsplash.com/photo-1608248597359-2ff661c9446f?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 3,
      shotType: "back_side",
      title: "3. Ingredients Panel & INCI Formulation",
      description: "Clear view of clean ingredients, usage directions, batch code, and expiration seals.",
      complianceTag: "Label Transparency",
      imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 4,
      shotType: "macro_detail",
      title: "4. Macro Pipette Droplet Texture",
      description: "Crystal clear viscous serum droplet suspended from glass dropper pipette.",
      complianceTag: "Clinical Texture Macro",
      imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85",
      bgType: "macro",
    },
    {
      shotIndex: 5,
      shotType: "infographic_features",
      title: "5. Infographic: Triple Botanical Active Matrix",
      description: "20% Kakadu Plum (Vitamin C) + Triple Hyaluronic Acid + Ferulic Acid antioxidant shield.",
      complianceTag: "Active Formula Callouts",
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 6,
      shotType: "infographic_dimensions",
      title: "6. Infographic: 1 Fl Oz (30ml) Volume & Dispenser",
      description: "Accurate size breakdown: 60-day supply with daily morning dosage calibration.",
      complianceTag: "Dosage Calibration",
      imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 7,
      shotType: "lifestyle_primary",
      title: "7. Primary Lifestyle: Marble Vanity Ritual",
      description: "Styled on Italian Carrera marble with fresh eucalyptus and morning sunbeams.",
      complianceTag: "D2C Aesthetic Lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 8,
      shotType: "lifestyle_secondary",
      title: "8. Secondary Lifestyle: Spa Relaxation",
      description: "Calming botanical bathroom scene conveying tranquil morning self-care ritual.",
      complianceTag: "Spa Aesthetic Context",
      imageUrl: "https://images.unsplash.com/photo-1512290900672-1f5be6ac7632?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 9,
      shotType: "hands_on_scale",
      title: "9. Hands-On Application to Skin",
      description: "Model applying two drops to cheekbone showing instant lightweight glow absorption.",
      complianceTag: "Application Demonstration",
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
      bgType: "lifestyle",
    },
    {
      shotIndex: 10,
      shotType: "benefit_banner",
      title: "10. Benefit Callout Header Banner",
      description: "'RESTORE VISIBLE GLOW. FADE STUBBORN DARK SPOTS IN 14 DAYS.'",
      complianceTag: "Benefit Callout",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 11,
      shotType: "whats_in_box",
      title: "11. What's In The Box & Safety Seal",
      description: "30ml amber UV bottle with tamper-evident seal and recyclable embossed outer carton.",
      complianceTag: "Packaging & Safety",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85",
      bgType: "studio",
    },
    {
      shotIndex: 12,
      shotType: "competitor_vs",
      title: "12. Comparison: Stabilized vs Unstable Vitamin C",
      description: "Dark UV protective glass vs cheap clear plastic that oxidizes into orange residue.",
      complianceTag: "Formula Comparison",
      imageUrl: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 13,
      shotType: "quality_certifications",
      title: "13. Clean Beauty Certification Seals",
      description: "Leaping Bunny Cruelty-Free, 100% Vegan Certified, Paraben-Free, Fragrance-Free.",
      complianceTag: "Clean Beauty Verified",
      imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 14,
      shotType: "how_to_use",
      title: "14. Daily Morning Application Steps",
      description: "1. Cleanse face • 2. Apply 3-4 drops and pat gently • 3. Follow with SPF 50.",
      complianceTag: "Application Ritual",
      imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
    {
      shotIndex: 15,
      shotType: "brand_story_guarantee",
      title: "15. Dermatologist Tested & 60-Day Guarantee",
      description: "Clinically evaluated hypoallergenic formulation backed by a 60-day empty bottle guarantee.",
      complianceTag: "60-Day Guarantee Shield",
      imageUrl: "https://images.unsplash.com/photo-1512290900672-1f5be6ac7632?auto=format&fit=crop&w=1200&q=85",
      bgType: "infographic",
    },
  ],
};

export function getRealisticShotsForProduct(category: string, customImage?: string): RealisticShotPreset[] {
  const lower = (category || "").toLowerCase();
  let baseSet = REALISTIC_PRODUCT_SETS.headphones;

  if (lower.includes("beauty") || lower.includes("serum") || lower.includes("skin") || lower.includes("cosmetic")) {
    baseSet = REALISTIC_PRODUCT_SETS.serum;
  }

  // If user provided their own image, overlay it onto the realistic shot definitions
  if (customImage) {
    return baseSet.map((s, idx) => ({
      ...s,
      imageUrl: idx === 0 ? customImage : s.imageUrl,
    }));
  }

  return baseSet;
}
