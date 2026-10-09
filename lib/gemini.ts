/**
 * Google Gemini AI Integration for Listone.ai
 * Powered by Gemini 3.5 Flash & 3.5 Flash-Lite
 */

function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || "";
}

export async function callGemini(
  prompt: string,
  systemInstruction?: string,
  preferredModel = "gemini-3.5-flash"
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("No Gemini API key available");
  }

  const modelsToTry = [preferredModel, "gemini-3.5-flash-lite"];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: any = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }],
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Gemini model ${model} failed (${res.status}): ${errText}`);
        continue;
      }

      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer && answer.trim().length > 0) {
        return answer.trim();
      }
    } catch (err: any) {
      console.warn(`Error calling Gemini model ${model}:`, err.message);
    }
  }

  throw new Error("Unable to generate response from Gemini API");
}

export async function generateEcommerceCopy(productName: string, category: string, features: string[]) {
  const prompt = `You are a world-class Amazon 7-figure listing copywriter and conversion optimization specialist.
Generate a high-converting Amazon product listing for:
Product Name: "${productName}"
Category: "${category}"
Key Features / Details: ${features.join(", ") || "Premium design, durable build, high performance"}

Respond strictly with valid JSON with this exact structure:
{
  "title": "Optimized Amazon Title (150-180 chars, keywords first, benefit driven)",
  "bulletPoints": [
    "KEY BENEFIT IN CAPS: Detailed explanation of how this feature solves the customer's problem without fluff.",
    "SECOND BENEFIT: Concrete proof and durability points.",
    "THIRD BENEFIT: Everyday convenience, ease of use, or comfort.",
    "FOURTH BENEFIT: Materials, engineering precision, or craftsmanship.",
    "FIFTH BENEFIT: Risk-free guarantee, customer care, and package contents."
  ],
  "description": "Engaging 2-3 paragraph Amazon product description focusing on emotional hook, lifestyle integration, and quality assurance.",
  "searchTerms": "backend search terms separated by spaces, under 249 bytes, no commas"
}`;

  const responseText = await callGemini(
    prompt,
    "You are an expert Amazon SEO and product copywriter. Output only valid JSON."
  );

  const cleaned = responseText
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}
