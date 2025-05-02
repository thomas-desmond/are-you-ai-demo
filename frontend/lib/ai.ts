import { AiImageDescription } from "@/types/aiImageDescription";
import { SimilarityScore } from "@/types/similarityScore";

async function getAiSimilarity(
  sessionId: string,
  text: string,
  aiImageDescription: string,
  imageUrl: string
): Promise<number> {
  try {
    const response = await fetch(
      process.env.API_ENDPOINT + "/getSimilarityScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-Identifier": sessionId,
          "API-Key": process.env.API_KEY as string,
        },
        body: JSON.stringify({ sessionId, text, aiImageDescription, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch similarity score`);
    }

    const data = (await response.json()) as SimilarityScore;

    return data.similarityScore;
  } catch (error) {
    console.error("Error fetching similarity score:", error);
    return 0;
  }
}

async function getAiImageDescription(
  sessionId: string,
  imageUrl: string
): Promise<string> {
  try {
    const response = await fetch(
      process.env.API_ENDPOINT + "/aiImageDescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-Identifier": sessionId,
          "API-Key": process.env.API_KEY as string,
        },
        body: JSON.stringify({ sessionId, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch AI image description`);
    }

    const data = (await response.json()) as AiImageDescription;

    return data?.aiImageDescription;
  } catch (error) {
    console.error("Error fetching AI image description:", error);
    return "";
  }
}

async function getRandomAIGeneratedImage(sessionId: string): Promise<string> {
  try {
    const response = await fetch(
      process.env.API_ENDPOINT + "/randomImageUrl",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Session-Identifier": sessionId,
          "API-Key": process.env.API_KEY as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch AI generated image`);
    }

    const data = (await response.json()) as any;
    return data.imageUrl;
  } catch (error) {
    console.error("Error fetching AI generated image:", error);
    return "";
  }
}

export {
  getAiSimilarity,
  getAiImageDescription,
  getRandomAIGeneratedImage,
};
