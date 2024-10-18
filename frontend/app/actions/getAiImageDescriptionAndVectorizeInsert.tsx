"use server";

import { getAiDescriptionAndInsertToVectorize } from "@/lib/ai";

const getAiDescriptionAndInsertToVectorizeAction = async (
  sessionId: string,
  imageUrl: string
) => {
  const aiImageDescription = await getAiDescriptionAndInsertToVectorize(
    sessionId,
    imageUrl
  );

  return aiImageDescription;
};

export { getAiDescriptionAndInsertToVectorizeAction };
