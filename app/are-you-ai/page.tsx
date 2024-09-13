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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Are you AI?</h1>
        <p className="text-xl text-gray-600">
          Describe the image you see below
        </p>
      </div>

      <div className="max-w-md rounded-lg shadow-xl">
          <img
            src={imageUrl}
            alt="AI Generated Image"
            width={448}
            height={250}
            className="rounded-lg shadow-xl"
          />
      </div>

      <div className="w-full max-w-md">
        <form className="bg-white p-6 rounded-lg shadow-xl">
          <Input
            placeholder="Describe what you see in the image..."
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Submit Description
          </Button>
        </form>
      </div>
    </div>
    // <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
    //   <div className="flex flex-col items-center">
    //     <div className="mb-8 text-center">
    //       <h1 className="text-4xl font-bold text-gray-800">Are you AI?</h1>
    //       <p className="text-xl text-gray-600">
    //         Describe the image you see below
    //       </p>
    //     </div>
    //     <main className="w-full max-w-md bg-white rounded-lg shadow-xl">
    //       <div className=" w-full h-64">
    //         <img src={imageUrl} alt="AI Generated image" />
    //       </div>

    //       <form className="p-6 space-y-4">
    //       <div>
    //         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
    //           Image Description
    //         </label>
    //         <Input
    //           id="description"
    //           placeholder="Enter your description here..."
    //           className="w-full"
    //         />
    //       </div>
    //       <Button type="submit" className="w-full">
    //         Submit Description
    //       </Button>
    //     </form>
    //     </main>
    //   </div>
    //   {/* <InputForm imageUrl={imageUrl} /> */}
    //   {/* <HowItWorks /> */}
    // </div>
  );
}
