import { AiImageDescription } from "@/types/aiImageDescription";
import { SimilarityScore } from "@/types/similarityScore";

async function getAiSimilarity(
  sessionId: string,
  text: string
): Promise<number> {
  try {
    const response = await fetch(
      "https://api.areyouaidemo.com/getSimilarityScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-Identifier": sessionId,
          "API-Key": process.env.API_KEY as string,
        },
        body: JSON.stringify({ sessionId, text }),
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

async function getAiDescriptionAndInsertToVectorize(
  sessionId: string,
  imageUrl: string
): Promise<string> {
  try {
    const response = await fetch(
      "https://api.areyouaidemo.com/aiImageDescription",
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
      "https://api.areyouaidemo.com/randomImageUrl",
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
  getAiDescriptionAndInsertToVectorize,
  getRandomAIGeneratedImage,
};
