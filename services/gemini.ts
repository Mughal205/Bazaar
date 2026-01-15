
import { GoogleGenAI } from "@google/genai";

// Generates an e-commerce product description using the gemini-3-flash-preview model.
export async function generateProductDescription(productName: string) {
  // Creating a new instance right before the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a compelling e-commerce product description for "${productName}" in both English and Urdu. Keep it professional and attractive for a Pakistani marketplace.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Description generation failed.";
  }
}

// Summarizes multiple customer reviews to assist potential buyers.
export async function summarizeReviews(reviews: string[]) {
  // Creating a new instance right before the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following customer reviews for a product to help buyers decide: ${reviews.join("; ")}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not summarize reviews.";
  }
}
