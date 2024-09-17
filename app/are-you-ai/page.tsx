/* eslint-disable @next/next/no-img-element */
import InputForm from "@/components/input-form";
import { images } from "@/lib/images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BehindTheScenesButton from "@/components/behind-the-scenes/BehindTheScenesButton";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  const randomNumber = Math.floor(Math.random() * 12);
  
  const imageId = images[randomNumber];
  const imageUrl = `https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/${imageId}/public`;

  return (
    <>
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center pt-4">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Are you AI?</h1>
          <p className="text-xl text-gray-600">
            Describe the image you see below
          </p>
        </div>
        <InputForm imageUrl={imageUrl} />
        <BehindTheScenesButton />
      </div>
    </>
  );
}
