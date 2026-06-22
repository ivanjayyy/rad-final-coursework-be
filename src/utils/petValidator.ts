import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize the Gemini client.
const ai = new GoogleGenAI({});

// Interface for the validation result
export interface ImageValidationResult {
  isRealAnimal: boolean;
  isOffensiveOrInappropriate: boolean;
  confidenceScore: number; // 0 to 1
  reasoning: string;
}

// Schema for the validation result
const validationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    isRealAnimal: {
      type: Type.BOOLEAN,
      description:
        "True if the image contains a clear, real-life animal (like a dog, cat, bird, etc.). False if it is an object, abstract art, or just humans.",
    },
    isOffensiveOrInappropriate: {
      type: Type.BOOLEAN,
      description:
        "True if the image contains gore, violence, explicit content, dead animals, or text containing hate speech.",
    },
    confidenceScore: {
      type: Type.NUMBER,
      description:
        "A value between 0.0 and 1.0 indicating how confident the model is in its assessment.",
    },
    reasoning: {
      type: Type.STRING,
      description: "A one-sentence explanation for the decision.",
    },
  },
  required: [
    "isRealAnimal",
    "isOffensiveOrInappropriate",
    "confidenceScore",
    "reasoning",
  ],
};

// Function to validate the image
export async function validatePetImage(
  imageBuffer: Buffer,
  mimeType: string,
): Promise<ImageValidationResult> {
  try {
    // Convert buffer to inline data format required by the SDK
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType,
      },
    };

    const prompt = `
      Analyze this image uploaded to a Lost and Found Pet application. 
      You must determine:
      1. If the image actually contains a real, living animal.
      2. If the image violates basic safety/decency rules (contains blood, gore, graphic violence, or sexually explicit material).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [prompt, imagePart],
      config: {
        // Enforce the strict JSON structure
        responseMimeType: "application/json",
        responseSchema: validationSchema,
        // Set temperature low for more analytical/consistent classification
        temperature: 0.1,
      },
    });

    if (!response.text) {
      throw new Error("Empty response received from Gemini API.");
    }

    // Parse the safe, guaranteed JSON structure
    const result: ImageValidationResult = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini Image Validation Error:", error);
    // Fallback: Default to rejecting or accepting based on your app's safety tolerance
    return {
      isRealAnimal: false,
      isOffensiveOrInappropriate: true,
      confidenceScore: 0,
      reasoning: "Error executing AI validation middleware.",
    };
  }
}
