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

export default function AppInfoCard() {

  const session = nanoid();
  const features = [
    {
      icon: Earth,
      title: "Global Network",
      description:
        "Deployed to every one of Cloudflares 330+ locations in a single click",
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
        "Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.",
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
        <CardTitle className="text-2xl font-bold">Are You AI?</CardTitle>
        <CardDescription>
          This tool is a demo of Cloudflares Developer Platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="h-6 w-6">
                <feature.icon
                  className="text-primary"
                />{" "}
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
        <Link
          className="bg-orange-500 text-white py-4 px-8 text-2xl rounded animate-pulse"
          href={`/are-you-ai`}
        >
          Are You AI?
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">
          Powered by Cloudflare
        </p>
      </CardFooter>
    </Card>
  );
}
