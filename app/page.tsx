import InputForm from "@/components/input-form";
import Image from "next/image";

export const runtime = "edge";

const imageUrl = "https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/1761b7e9-42ba-4081-ab48-06796d20b500/public";

export default function Home() {    return (
    <div>
      <div className="flex flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-8">Are You AI?</h1>
        <p className="text-lg text-center mb-8 max-w-prose">
          It&rsquo;s you against the AI, describe the image below in a single
          concise sentence. Using text-embeddings and a Vector database we will
          find out how similar you are to AI!
        </p>
        <Image
          src={imageUrl}
          width={500}
          height={250}
          alt="AI Generated Image"
        />
      </div>
      <InputForm imageUrl={imageUrl} />
    </div>
  );
}
