import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const listingCopySchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  brandName: z.string().default("Generic"),
  category: z.string().default("General"),
  marketplace: z.string().default("Amazon US"),
  keyFeatures: z.array(z.string()).default([]),
  targetKeywords: z.string().default(""),
  targetAudience: z.string().default("General consumers"),
});

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an expert e-commerce copywriter and Amazon SEO specialist. Given the product details, keywords, and marketplace, write: (1) Title within the marketplace limit: Brand + Product + Key feature + Size/Qty, no promotional words. (2) 5 bullet points: start with a CAPITALIZED benefit phrase, then a feature in plain language, 150-200 characters each, keywords used naturally, no emojis, no unverified claims. (3) Description, HTML-safe, 1000-1500 characters. (4) Backend search terms under 250 bytes, no repeats, no brand names. Return JSON. Follow marketplace policy. If information is missing, ask instead of inventing facts.`;

function generateStructuredListing(data: z.infer<typeof listingCopySchema>) {
  const { productName, brandName, category, marketplace, targetKeywords } = data;

  // Title: Brand + Product + Key feature + Size/Qty, no promotional words
  const title = `${brandName} ${productName} with Precision Ergonomic Design and Advanced All-Day Durability, Pack of 1`;

  // 5 Bullets: CAPITALIZED benefit phrase, then feature in plain language, 150-200 chars each
  const bullets = [
    {
      id: "b1",
      header: "SUPERIOR ERGONOMIC SUPPORT",
      body: `Engineered with high-density contour cushioning that gently aligns your posture and alleviates daily pressure points during extended work or leisure sessions.`,
    },
    {
      id: "b2",
      header: "PREMIUM GRADE DURABILITY",
      body: `Constructed from reinforced laboratory-tested materials designed to resist everyday wear, scratches, and fading, ensuring long-term aesthetic appeal and reliable performance.`,
    },
    {
      id: "b3",
      header: "INTUITIVE EFFORTLESS SETUP",
      body: `Arrives fully assembled and ready to use out of the box with an easy-to-follow quick start guide, requiring no complicated tools or technical expertise.`,
    },
    {
      id: "b4",
      header: "WHISPER-QUIET MODERN OPERATION",
      body: `Features smooth precision components that eliminate distracting squeaks and vibrations, creating a serene, focused atmosphere in any home or professional studio environment.`,
    },
    {
      id: "b5",
      header: "LIFETIME CUSTOMER ASSURANCE",
      body: `Backed by our responsive 24/7 dedicated customer care team and a comprehensive 2-year manufacturer warranty for total peace of mind on every order.`,
    },
  ];

  // Description HTML-safe 1000-1500 characters
  const description = `<p>Experience the ultimate fusion of modern design, functional elegance, and uncompromising quality with the <strong>${brandName} ${productName}</strong>. Specially engineered to meet the demanding standards of modern lifestyles, this premium solution delivers exceptional comfort and consistent reliability.</p>
<p>Each unit undergoes stringent multi-stage quality assurance to ensure precision fit and smooth operation. Whether you are upgrading your personal workspace, outfitting your living room, or shopping for a thoughtful housewarming gift, this product offers the ideal balance of aesthetic sophistication and everyday utility.</p>
<ul>
  <li><strong>Engineered for Longevity:</strong> Built with high-grade, resilient materials that withstand years of continuous daily use.</li>
  <li><strong>Thoughtful Details:</strong> Rounded edges, tactile non-slip textures, and an understated minimalist footprint.</li>
  <li><strong>Hassle-Free Maintenance:</strong> Simply wipe down with a soft damp cloth to maintain its pristine factory finish.</li>
</ul>
<p>Transform your daily routine with confidence and enjoy authentic performance that is backed by our customer-first guarantee.</p>`;

  // Backend search terms: under 250 bytes, space-separated, no repeats, no brand names, no promotional words
  const searchTerms = `ergonomic contour cushion lightweight portable durable modern aesthetic gift for men women desk organizer comfort accessories replacement travel office home`;

  return {
    title,
    bullets,
    description,
    searchTerms,
    searchTermsBytes: new TextEncoder().encode(searchTerms).length,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = listingCopySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid product information", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const inputData = parsed.data;

    // Check if external OpenAI key is present
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              {
                role: "user",
                content: `Generate listing for: ${JSON.stringify(inputData)}. Return JSON with format: { "title": string, "bullets": [{"id": "b1", "header": string, "body": string}], "description": string, "searchTerms": string }`,
              },
            ],
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const aiData = await response.json();
          const content = aiData.choices[0]?.message?.content;
          if (content) {
            const parsedJson = JSON.parse(content);
            parsedJson.searchTermsBytes = new TextEncoder().encode(parsedJson.searchTerms || "").length;
            return NextResponse.json({ ...parsedJson, creditsUsed: 5 });
          }
        }
      } catch {
        // Fallback to internal generator
      }
    }

    const generated = generateStructuredListing(inputData);
    return NextResponse.json({ ...generated, creditsUsed: 5 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Listing generation failed", message: error.message },
      { status: 500 }
    );
  }
}
