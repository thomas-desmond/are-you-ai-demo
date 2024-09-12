/* eslint-disable @next/next/no-img-element */
import InputForm from "@/components/input-form";
import { images } from "@/lib/images";
import Image from "next/image";

export const runtime = "edge";

export default function Home() {
  const randomNumber = Math.floor(Math.random() * 12) + 1;
  const imageId = images[randomNumber];
  const imageUrl = `https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/${imageId}/public`;

  return (
    <div>
      <div className="flex flex-col items-center p-12">
        <h1 className="text-4xl font-bold mb-8">Are You AI?</h1>
        <p className="text-lg text-center mb-8 max-w-prose">
          It&rsquo;s you against the AI, describe the image below in a single
          concise sentence. Using text-embeddings and a Vector database we will
          find out how similar you are to AI!
        </p>
        <img
          src={imageUrl}
          width={300}
          height={250}
          alt="AI Generated Image"
        />
      </div>
      <InputForm imageUrl={imageUrl} />
    </div>
  );
}
