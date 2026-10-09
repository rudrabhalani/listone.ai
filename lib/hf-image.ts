/**
 * Hugging Face Image Generation Engine for Listone.ai
 * Supports FLUX.1, SDXL, and Serverless Inference
 */

import { HfInference } from "@huggingface/inference";

function getHfApiKey(): string {
  return process.env.HUGGINGFACE_API_KEY || "";
}

export async function generateProductImageWithHf(
  prompt: string,
  model = "black-forest-labs/FLUX.1-schnell"
): Promise<Buffer | null> {
  const token = getHfApiKey();
  if (!token) return null;

  const hf = new HfInference(token);

  try {
    const result: any = await hf.textToImage({
      model,
      inputs: prompt,
    });

    if (result && typeof result.arrayBuffer === "function") {
      const arrayBuffer = await result.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } else if (typeof result === "string") {
      const base64Data = result.replace(/^data:image\/\w+;base64,/, "");
      return Buffer.from(base64Data, "base64");
    }

    return null;
  } catch (error: any) {
    console.warn(`Hugging Face inference error with ${model}:`, error.message);
    return null;
  }
}
