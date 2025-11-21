import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Extract base64 data and mime type
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Use Gemini 3 Pro Image Preview (Nano Banana Pro Preview) for photo restoration
    // This is the professional model with Google Search grounding and 4K support
    const imageModel = genAI.getGenerativeModel({ 
      model: "gemini-3.0-pro-image-preview" 
    });

    // Create a comprehensive restoration prompt
    const restorationPrompt = `You are a professional photo restoration expert. Using the provided image, create a high-quality restored version with these improvements:

RESTORATION GOALS:
- Enhance clarity and sharpness while maintaining natural appearance
- Correct and balance colors for accurate, vibrant reproduction
- Reduce noise, grain, and compression artifacts
- Repair any visible damage (scratches, tears, stains, fading)
- Improve contrast and exposure for optimal viewing
- Enhance fine details and textures
- Remove any dust spots or blemishes

IMPORTANT:
- Preserve the original composition and all subjects
- Keep the restoration realistic and natural
- Maintain the historical character and authenticity of the photo
- Do not add or remove people or major elements
- Match the style and era of the original photograph

Generate a professional, high-quality restored version of this photograph.`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    try {
      // Generate restored image using Gemini 3 Pro Image Preview (Nano Banana Pro)
      const result = await imageModel.generateContent([restorationPrompt, imagePart]);
      const response = result.response;

      // Extract the generated image from the response
      let restoredImageData = null;
      let analysisText = "";

      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.text) {
              analysisText += part.text;
            } else if (part.inlineData) {
              // Convert the generated image to base64 data URL
              const generatedBase64 = part.inlineData.data;
              const generatedMimeType = part.inlineData.mimeType || "image/png";
              restoredImageData = `data:${generatedMimeType};base64,${generatedBase64}`;
            }
          }
        }
      }

      if (restoredImageData) {
        return NextResponse.json({
          restoredImage: restoredImageData,
          analysis: analysisText || "Image successfully restored using Gemini 3 Pro Image Preview (Nano Banana Pro).",
          message: "Photo restored successfully with professional quality!",
        });
      } else {
        // If no image was generated, return the original with explanation
        return NextResponse.json({
          restoredImage: image,
          analysis: analysisText,
          message: "Image analysis completed. Image generation may require additional configuration.",
        });
      }
    } catch (imageGenError) {
      console.error("Image restoration error:", imageGenError);
      
      // Fallback: Return original image with error message
      return NextResponse.json({
        restoredImage: image,
        analysis: "",
        message: "Unable to restore image. Please ensure your API key has Gemini 3 Pro Image Preview (Nano Banana Pro) access enabled.",
      });
    }
  } catch (error) {
    console.error("Error restoring image:", error);
    return NextResponse.json(
      { error: "Failed to restore image" },
      { status: 500 }
    );
  }
}
