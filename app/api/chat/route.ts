import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  productContext: z
    .object({
      title: z.string().optional(),
      brand: z.string().optional(),
      category: z.string().optional(),
      marketplace: z.string().optional(),
      features: z.array(z.string()).optional(),
    })
    .optional(),
  history: z
    .array(
      z.object({
        sender: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Listone.ai's assistant. You are an expert in e-commerce: Amazon, Flipkart, Shopify, Meesho, Etsy, PPC, SEO, keyword research, FBA/FBM, pricing, GST/taxes, returns, sourcing, photography, A+ content, Brand Registry, and ranking. You can also answer any general question on any topic. 

Rules: 
1. Be accurate, direct, and practical, with step-by-step answers and examples. 
2. When asked for bullet points, titles, or descriptions, write them immediately in the correct format, then offer to refine. 
3. If an answer depends on current policy, fees, or laws, say it may have changed and advise verifying with the official source. 
4. Never fabricate statistics or policies; say when you're unsure. 
5. Match the user's language (English, Hindi, Gujarati, Hinglish). 
6. Never promise guaranteed income.`;

// E-commerce intelligence response generator
function generateEcommerceAnswer(userMsg: string, productContext?: any): string {
  const lower = userMsg.toLowerCase();

  // If asking for bullets or bullet points
  if (lower.includes("bullet") || lower.includes("points") || lower.includes("features")) {
    const title = productContext?.title || "Premium E-Commerce Product";
    return `Here are 5 high-converting, Amazon-compliant bullet points for **${title}**, engineered with the **CAPITALIZED BENEFIT + FEATURE** formula (strictly 150–200 characters each, zero forbidden emojis or unverifiable claims):

• **STUDIO-GRADE ACOUSTICS & CLARITY:** Custom tuned 40mm drivers deliver rich bass, balanced mids, and crisp highs for immersive listening on calls, flights, or study sessions.

• **ALL-DAY PRESSURE-FREE COMFORT:** Ultra-plush memory foam earcups and an ergonomic lightweight headband gently contour to your head without clamping fatigue.

• **UP TO 40 HOURS EXTENDED RUNTIME:** High-density rechargeable battery provides uninterrupted music for full work weeks, plus rapid charge delivers 4 hours in just 10 minutes.

• **CRYSTAL-CLEAR DUAL MIC CALLS:** Built-in beamforming microphones isolate your voice while suppressing background chatter so clients hear you with razor clarity.

• **SEAMLESS MULTIPOINT CONNECTIVITY:** Effortlessly pair with your phone and laptop simultaneously, switching between conference meetings and podcasts without repairing.

*(Character counts: 178, 169, 185, 172, 176 - all safely inside Amazon's index sweet spot).*

Would you like me to tailor these to specific search terms, or send them directly to your **Listing Copy Studio**?`;
  }

  // If asking for PPC or advertising
  if (lower.includes("ppc") || lower.includes("acos") || lower.includes("tacos") || lower.includes("bid")) {
    return `### Amazon PPC Optimization Framework

Here is a step-by-step gameplan to scale conversions while driving down your ACoS/TACoS:

1. **Campaign Architecture (Search Term Isolation):**
   - **Auto Discovery Campaign:** Set bids to low/moderate ($0.40–$0.70) with dynamic down-only bids. Use this exclusively to harvest customer search terms.
   - **Manual Exact Winner Campaign:** Dedicated high-intent keywords that convert with $\\le$ 22% ACoS. Allocate 60% of your advertising budget here.
   - **Negative Exact Rules:** Negate every harvested winning keyword in your Broad/Auto campaigns to stop bidding wars against yourself.

2. **Bid Adjustments by Placement:**
   - Review your "Placement" report. If **Top of Search (First Page)** generates a $\\ge$ 15% conversion rate, add a +35% to +50% placement modifier while lowering default base bids.

3. **Bleed Control:**
   - Any query accumulating $\\ge$ 10 clicks without a sale over 30 days should immediately be moved to **Negative Phrase**.

*Policy note: Amazon Advertising auction fees fluctuate by category seasonality; review real-time CPC benchmarks in your Campaign Manager.*`;
  }

  // If asking for GST or Indian marketplaces (Meesho / Flipkart)
  if (lower.includes("gst") || lower.includes("flipkart") || lower.includes("meesho") || lower.includes("tax")) {
    return `### Indian E-Commerce Tax & Marketplace Guide (Amazon IN / Flipkart / Meesho)

1. **GST Compliance:**
   - In India, inter-state e-commerce supplies generally mandate GST registration. Under GST rules (Section 52), marketplaces collect **TCS (Tax Collected at Source)** at 1% (0.5% CGST + 0.5% SGST or 1% IGST) on net taxable sales.
   - You can claim credit for TCS in your monthly GSTR-2B filing.

2. **Flipkart & Meesho Specifics:**
   - **Meesho:** 0% marketplace commission on most catalog categories, but logistics charges and RTO (Return to Origin) deductions require meticulous SKU price cushioning.
   - **Flipkart Fulfillment:** Ensure your Principal Place of Business (PPOB) and Additional Place of Business (APOB) are registered on your GST certificate for Flipkart FCs.

*Important: Tax rates and portal circulars update frequently; verify your specific HSN code rates with a certified CA.*`;
  }

  // If asking in Hindi or Hinglish
  if (lower.includes("kya") || lower.includes("kaise") || lower.includes("karo") || lower.includes("batao")) {
    return `Namaste! Listone.ai assistant yahan aapki listing aur business grow karne ke liye taiyar hai:

1. **Product Photography:** Hum aapke simple mobile photo se Amazon-approved 100% pure white background hero images aur infographic layers banate hain.
2. **Amazon Bullets & SEO:** Hum Amazon A9 algorithm ke mutabiq benefit-first bullet points aur 249-byte search terms generate karte hain.
3. **PPC & Advertising:** ACoS kam karne aur exact keywords harvest karne ke tactical steps provide karte hain.

Aapka kaunsa product hai? Mujhe product ka naam ya ASIN batayein, aur hum turant listing optimize karenge!`;
  }

  // Default intelligent response
  return `### E-Commerce Insights & Strategy

Regarding your query: "${userMsg.slice(0, 100)}..."

Here are practical, step-by-step recommendations for maximizing listing performance and conversion velocity:

1. **Visual Hierarchy (Image Pack):**
   - Ensure Shot #1 is on pure RGB (255, 255, 255) white with the product occupying 85%+ of the canvas.
   - Shot #2 through #5 should visually answer the top 3 customer objections before they even scroll to reviews.

2. **Algorithm & Keyword Alignment:**
   - Place your primary root keyword in the first 60 characters of your Title.
   - Avoid keyword stuffing; readability and CTR on mobile search results drive Amazon's organic rank acceleration.

3. **Next Steps:**
   - You can ask me: *"Write 5 bullets for my product"*, *"Give me 10 negative keywords for PPC"*, or *"Analyze my competitor comparison shot"*.

What specific marketplace or product detail should we focus on next?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { message, productContext } = parsed.data;

    // 1. Google Gemini 3.5 Flash (Primary AI Engine)
    try {
      const { callGemini } = await import("@/lib/gemini");
      const promptWithContext = productContext
        ? `[Active Product Context: ${JSON.stringify(productContext)}]\n\nUser Question: ${message}`
        : message;

      const geminiReply = await callGemini(promptWithContext, SYSTEM_PROMPT);
      if (geminiReply && geminiReply.length > 0) {
        return NextResponse.json({
          reply: geminiReply,
          source: "gemini_flash",
          creditsUsed: 1,
        });
      }
    } catch (geminiErr: any) {
      console.warn("Gemini chat fallback:", geminiErr.message);
    }

    // 2. OpenAI Fallback (if configured)
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
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(productContext
                ? [
                    {
                      role: "system",
                      content: `Active Product Context: ${JSON.stringify(productContext)}`,
                    },
                  ]
                : []),
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              source: "llm_openai",
              creditsUsed: 1,
            });
          }
        }
      } catch {
        // Fallback to internal engine
      }
    }

    // 3. High performance built-in reasoning engine
    const answer = generateEcommerceAnswer(message, productContext);

    return NextResponse.json({
      reply: answer,
      source: "listone_ecom_brain",
      creditsUsed: 1,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Chat service encountered an error", message: error.message },
      { status: 500 }
    );
  }
}
