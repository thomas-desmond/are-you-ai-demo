import InputForm from "@/components/input-form";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center h-screen  animate-pulse">
        <Link
          className="bg-orange-500 text-white py-4 px-8 text-4xl rounded"
          href="/are-you-ai">
          Are you AI?
        </Link>
      </div>
    </div>
  );
}
