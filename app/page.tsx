import InputForm from "@/components/input-form";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="h-full">
      <div className="flex justify-center pt-28">
        <Link
          className="bg-orange-500 text-white py-4 px-8 text-4xl rounded animate-pulse"
          href="/are-you-ai"
        >
          Are you AI?
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <h1 className="text-xl font-bold">Powered by Cloudflare</h1>
        <div></div>
        <div className="flex justify-center mt-4">
          <Image
            src="/cloudflare-logo.png"
            alt="Cloudflare Pages Logo"
            width={272}
            height={116}
            className="mx-2"
          />
        </div>
      </div>
    </div>
  );
}
