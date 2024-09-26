import { AiImageDescription } from "@/types/aiImageDescription";
import { SimilarityScore } from "@/types/similarityScore";

async function getAiSimilarity(
  sessionId: string,
  text: string
): Promise<number> {
  const response = await fetch("https://are-you-ai-api.cf-tme.workers.dev/getSimilarityScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch("https://are-you-ai-api.cf-tme.workers.dev/aiImageDescription",  {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId, imageUrl }),
   
  });

  const data = (await response.json()) as AiImageDescription;

  return data?.aiImageDescription;
}

async function getRandomAIGeneratedImage(): Promise<string> {
  const response = await fetch("https://are-you-ai-api.cf-tme.workers.dev/randomImageUrl", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
