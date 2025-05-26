import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Earth, Database, Brain, Server } from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function AppInfoCard() {
  const session = nanoid();
  const features = [
    {
      icon: Earth,
      title: "Global Network",
      description:
        "Deployed to every one of Cloudflare's 330+ locations in a single click",
    },
    {
      icon: Database,
      title: "Vectorize",
      description:
        "Vectorize is a globally distributed vector database that enables you to build full-stack, AI-powered applications with Cloudflare Workers.",
    },
    {
      icon: Brain,
      title: "Workers AI",
      description:
        "Run machine learning models, powered by serverless GPUs, on Cloudflare's global network.",
    },
    {
      icon: Server,
      title: "Serverless API",
      description:
        "Deploy serverless code instantly across the globe to give it exceptional performance, reliability, and scale.",
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#F38020] to-yellow-400 bg-clip-text text-transparent flex items-center gap-2">
          <Server className="w-8 h-8 text-[#F38020] drop-shadow" />
          Are You AI?
        </CardTitle>
        <div className="my-4 p-4 rounded-lg bg-orange-50 border-l-4 border-[#F38020] flex items-start space-x-3 shadow-sm">
          <span className="text-md font-medium text-gray-900">
            <span className="font-bold text-[#F38020] block mb-4">
              Get ready to play the Are You AI Demo!
            </span>

            <span className="block mb-4">
              You&apos;ll be shown an image and need to describe it in one clear
              sentence.
            </span>

            <span className="block mb-4">
              {" "}
              After you submit your description, Workers AI will use an
              image-to-text model to describe the same image. Last, Vectorize
              will give you a similarity percentage that reveals how well your
              description lines up with the AI&apos;s interpretation. The higher
              the percentage, the more you think like AI.{" "}
            </span>

            <span className="font-semibold block">
              Give it your best shot and see if you are AI!
            </span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="h-6 w-6">
                <feature.icon className="text-primary" />{" "}
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <Link className="" href={`/are-you-ai/${session}`}>
          <Button className=" py-8 px-8 text-2xl rounded animate-pulse">
            Are You AI?
          </Button>
        </Link>
        <Link className="mt-4" href={`/recent`}>
          <Button variant="outline" className="py-2 px-8 text-lg">
            Recent Sessions
          </Button>
        </Link>
        <p className="mt-2 text-lg text-muted-foreground">Powered by</p>
        <Image
          src="/cloudflare-logo.png"
          alt="Cloudflare Logo"
          width={139}
          height={58}
        />{" "}
      </CardFooter>
    </Card>
  );
}
