"use server";

import { getAiSimilarity } from "@/lib/ai";

const handleSubmitServerAction = async (prevState: any, formData: FormData) => {
  const text = formData.get("message") as string;
  if (!text) return;

  const sessionId = formData.get("sessionId") as string;
  const aiImageDescription = formData.get("aiImageDescription") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const score = await getAiSimilarity(sessionId, text, aiImageDescription, imageUrl);

  if (!score) {
    return {
      similarityScore: 0,
    };
  }

  return {
    similarityScore: parseFloat((score * 100).toFixed(3)),
    userDescription: text,
  };
};

export { handleSubmitServerAction };
