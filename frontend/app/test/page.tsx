/* eslint-disable @next/next/no-img-element */
import { images } from "@/lib/images";
import { getRandomAIGeneratedImage } from "@/lib/ai";

export const runtime = "edge";

export default async function Home() {
  const randomNumber = Math.floor(Math.random() * 12);

  const imageId = images[randomNumber];
  const imageUrl = await getRandomAIGeneratedImage();
    console.log("imageUrl", imageUrl);

  return (
    <>
      <img src={imageUrl} alt="AI generated image" />
    </>
  );
}
