import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRandomAIGeneratedImage } from "@/lib/ai";
import MainDisplay from "./MainDisplay";
import { nanoid } from "nanoid";

// Separate edge runtime function
export async function generateMetadata() {
  return {
    title: "Are you AI?",
    description: "Describe the image you see below",
  };
}

// Edge runtime configuration
export const runtime = "edge";

// Separate edge function for data fetching
async function getImageData(sessionId: string) {
  return await getRandomAIGeneratedImage(sessionId);
}

export default async function Home({
  params,
}: {
  params: { session: string };
}) {
  const sessionId = nanoid();
  const imageUrl = await getImageData(sessionId);

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
          sessionId={sessionId}
        />
      </div>
    </>
  );
}
