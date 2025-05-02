"use server";

import { getAiImageDescription } from "@/lib/ai";

const getAiImageDescriptionAction = async (
  sessionId: string,
  imageUrl: string
) => {
  const aiImageDescription = await getAiImageDescription(
    sessionId,
    imageUrl
  );

  return aiImageDescription;
};

export { getAiImageDescriptionAction };
