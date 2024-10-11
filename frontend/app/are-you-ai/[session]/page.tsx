import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getAiDescriptionAndInsertToVectorize,
  getRandomAIGeneratedImage,
} from "@/lib/ai";
import MainDisplay from "./MainDisplay";

export const runtime = "edge";

export default async function Home({
  params,
}: {
  params: { session: string };
}) {
  const imageUrl = await getRandomAIGeneratedImage(params.session);

  let aiImageDescription = "";
  if (imageUrl) {
    aiImageDescription = await getAiDescriptionAndInsertToVectorize(
      params.session,
      imageUrl
    );
  }

  return (
    <>
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
      <div className="min-h-full flex flex-col items-center justify-center pt-4">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Are you AI?</h1>
          <p className="text-xl text-gray-600">
            Describe the image you see below
          </p>
        </div>
        <MainDisplay
          imageUrl={imageUrl}
          aiImageDescription={aiImageDescription}
          sessionId={params.session}
        />
      </div>
    </>
  );
}
