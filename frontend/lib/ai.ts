import { AiImageDescription } from "@/types/aiImageDescription";
import { SimilarityScore } from "@/types/similarityScore";

async function getAiSimilarity(
  sessionId: string,
  text: string
): Promise<number> {
  const response = await fetch("https://api.areyouaidemo.com/getSimilarityScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Session-Identifier": sessionId,
    },
    body: JSON.stringify({ sessionId, text }),
  });

  const data = (await response.json()) as SimilarityScore;

  return data.similarityScore;
}

async function getAiDescriptionAndInsertToVectorize(
  sessionId: string,
  imageUrl: string
): Promise<any> {
  const response = await fetch("https://api.areyouaidemo.com/aiImageDescription",  {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Session-Identifier": sessionId
    },
    body: JSON.stringify({ sessionId, imageUrl }),
   
  });

  const data = (await response.json()) as AiImageDescription;

  return data?.aiImageDescription;
}

async function getRandomAIGeneratedImage(sessionId: string): Promise<string> {
  const response = await fetch("https://api.areyouaidemo.com/randomImageUrl", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Session-Identifier": sessionId
    },
  });
  
  const data = await response.json() as any;

  return data.imageUrl;
}

export {
  getAiSimilarity,
  getAiDescriptionAndInsertToVectorize,
  getRandomAIGeneratedImage,
};
