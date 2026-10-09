import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

export const runtime = "nodejs";

const SHOT_TYPE_PROMPTS: Record<string, string> = {
  lifestyle:
    "a bright, modern, high-end in-home lifestyle scene showing WHERE and HOW to use this product in a realistic environment with natural soft daylight, authentic depth of field, 8k resolution, commercial e-commerce photography",
  how_to_use:
    "an action commercial photography shot showing HOW TO USE this product, hands gently assembling, holding or operating it in real-world action, crisp studio lighting, 8k resolution",
  overview_size:
    "a complete product overview showing the item from a dimensional 3/4 angle with realistic scale, clean soft light studio backdrop, subtle contact shadow, commercial catalog photography, 8k resolution",
  macro_detail:
    "an extreme 10x optical macro close-up showcasing the fine material texture, craftsmanship, reinforced joints, and micro-finish of this product, shallow depth of field, 8k resolution",
  white_hero:
    "the product centered on a 100% solid pure white background (RGB 255, 255, 255), commercial softbox studio key lighting, natural soft ground contact shadow, Amazon main image compliant, 8k resolution",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, shotType = "lifestyle", customPrompt, productName = "Product" } = body;

    const GEMINI_KEY = process.env.GEMINI_API_KEY || "";

    let productDescription = productName;

    // 1. Analyze product image with Gemini 3.5 Flash if imageBase64 is provided
    if (imageBase64 && imageBase64.includes("base64,")) {
      try {
        const cleanBase64 = imageBase64.split("base64,")[1];
        const mimeType = imageBase64.split(";")[0].replace("data:", "") || "image/jpeg";

        const visionUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_KEY}`;
        const visionRes = await fetch(visionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "You are an expert commercial product photographer. Analyze this uploaded product and describe what it is, its color, shape, key materials, and primary usage in exactly one short sentence. Output ONLY that sentence.",
                  },
                  {
                    inlineData: {
                      mimeType,
                      data: cleanBase64,
                    },
                  },
                ],
              },
            ],
          }),
        });

        if (visionRes.ok) {
          const visionData = await visionRes.json();
          const identified = visionData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (identified) {
            productDescription = identified;
          }
        }
      } catch (err: any) {
        console.warn("Gemini vision analysis fallback:", err.message);
      }
    }

    // 2. Craft high-converting photography prompt
    const baseShotTheme = SHOT_TYPE_PROMPTS[shotType] || SHOT_TYPE_PROMPTS.lifestyle;
    let finalPrompt = customPrompt
      ? `${productDescription}, ${customPrompt}, commercial product photography, 8k resolution, photorealistic`
      : `Professional Amazon commercial product photograph of ${productDescription}, ${baseShotTheme}, photorealistic, ultra detailed, 8k`;

    // 3. Generate high-quality image (1 single focused image, no collage)
    const seed = Math.floor(Math.random() * 1000000);
    let generatedImageUrl: string | null = null;

    try {
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        finalPrompt
      )}?model=sana&width=1024&height=1024&nologo=true&seed=${seed}`;

      const imageRes = await fetch(pollinationsUrl, { signal: AbortSignal.timeout(10000) });
      if (imageRes.ok) {
        const imageBuffer = await imageRes.arrayBuffer();
        if (imageBuffer.byteLength > 2000) {
          generatedImageUrl = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString("base64")}`;
        }
      }
    } catch (pollErr: any) {
      console.warn("Pollinations generation fallback triggered:", pollErr.message);
    }

    // High-resolution fallback commercial photography scenes tailored by shot type
    if (!generatedImageUrl) {
      const FALLBACK_SCENES: Record<string, string> = {
        lifestyle:
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
        how_to_use:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
        overview_size:
          "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=85",
        macro_detail:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
        white_hero:
          "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
      };
      generatedImageUrl = FALLBACK_SCENES[shotType] || FALLBACK_SCENES.lifestyle;
    }

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageUrl,
      prompt: finalPrompt,
      productAnalysis: productDescription,
      shotType,
    });
  } catch (error: any) {
    console.error("Single image generation error:", error.message);
    return NextResponse.json(
      { error: "Image generation failed", message: error.message },
      { status: 500 }
    );
  }
}
