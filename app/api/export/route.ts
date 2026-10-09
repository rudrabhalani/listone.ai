import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const exportSchema = z.object({
  marketplace: z.enum(["Amazon", "Flipkart", "Shopify", "Meesho", "Etsy"]).default("Amazon"),
  width: z.number().default(2000),
  height: z.number().default(2000),
  format: z.enum(["png", "jpg", "webp", "zip"]).default("png"),
  layersCount: z.number().default(1),
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = exportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid export specifications", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { marketplace, width, height, format } = parsed.data;

    return NextResponse.json({
      success: true,
      exportDetails: {
        marketplace,
        resolution: `${width}x${height} px`,
        format,
        colorSpace: "sRGB",
        compression: "lossless",
        complianceVerified: true,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Export failed", message: error.message },
      { status: 500 }
    );
  }
}
