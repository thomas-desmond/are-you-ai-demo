/* eslint-disable @next/next/no-img-element */
import HowItWorks from "@/components/how-it-works";
import InputForm from "@/components/input-form";
import { images } from "@/lib/images";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export default function Home() {
  const randomNumber = Math.floor(Math.random() * 12) + 1;
  const imageId = images[randomNumber];
  const imageUrl = `https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/${imageId}/public`;

  return (
    <div className="min-h-screen flex flex-col items-center pt-4">
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Are you AI?</h1>
        <p className="text-xl text-gray-600">
          Describe the image you see below
        </p>
      </div>

      <InputForm imageUrl={imageUrl} />
    </div>
  );
}
