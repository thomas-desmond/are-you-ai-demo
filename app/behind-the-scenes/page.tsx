/* eslint-disable @next/next/no-img-element */
import ViewSourceCode from "@/components/behindTheScenes/viewSourceCode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const runtime = "edge";

export default function BehindTheScenes() {
  return (
    <>
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button>&#x2190; Back Home</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center w-full md:w-4/5">
          <h1 className="text-3xl font-bold mb-6">
            Behind the Scenes: How &quot;Are you AI?&quot; Works
          </h1>
          <h3 className="text-xl font-bold mb-6">
            Taking advantage of Cloudflare&apos;s Developer Platform and Global
            Network
          </h3>
          <ViewSourceCode />
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-5xl underline">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="min-w-4xl">
                {accordionData.map((item, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="border-b last:border-b-0 pb-4"
                  >
                    <AccordionTrigger className="hover:no-underline my-4 w-full">
                      <div className="flex flex-row justify-between items-center">
                        <h3 className="text-left text-lg md:text-3xl font-semibold">
                          {item.title}
                        </h3>
                        <ChevronDown />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="rounded-lg"
                        />
                        <Button className="w-full mb-4 sm:w-auto bg-[#F6821F] text-black ">
                          <a
                            href={item.learnMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                          </a>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

const accordionData = [
  {
    title: "Full-Stack Application Powered by Cloudflare",
    description:
      "Our advanced AI algorithms analyze images with high precision, identifying objects, scenes, and even emotions.",
    imageSrc: "/are-you-ai-services.png",
    learnMoreUrl: "https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/",
  },
  {
    title: "Global Serverless API",
    description:
      "Serverless globally-deployed APIs offer a cost-effective,scalable, and agile approach to building modern applications and services, allowing organizations to focus on delivering value to their users without being encumbered by the complexities of managing infrastructure.",
    imageSrc: "/region-earth.webp",
    learnMoreUrl:
      "https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-global-apis/",
  },
  {
    title: "Composable AI Architecture",
    description:
      "The AI market demands organizations to stay updated with the latest innovations. Composability, data portability, and standard APIs are crucial for mixing and matching AI components, facilitating seamless data exchange, ensuring interoperability, and fostering flexibility. Cloudflare's AI platform offers a composable AI infrastructure with support for standard interfaces and simplified development.",
    imageSrc: "/ai-composable.png",
    learnMoreUrl:
      "https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/",
  },
  {
    title: "AI Observability",
    description:
      "Using a forward proxy can mitigate challenges like fragmentation, availability, lack of observability, lack of cost control, and more. Cloudflare AI Gateway is positioned between the service making inference requests and the inference service platform, it serves as a single point for observability and control. By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.",
    imageSrc: "/ai-observability.png",
    learnMoreUrl:
      "https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-multivendor-observability-control/",
  },
];
