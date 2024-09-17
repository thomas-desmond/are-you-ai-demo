/* eslint-disable @next/next/no-img-element */
import ViewSourceCode from "@/components/behind-the-scenes/ViewSourceCode";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const runtime = "edge";

export default function BehindTheScenes() {
  return (
    <>
      <Link href="/are-you-ai">
        <Button className="m-2">&#x2190; Back to the App</Button>
      </Link>
      <div className="min-h-screen flex flex-col items-center">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">
            Behind the Scenes: How &quot;Are you AI?&quot; Works
          </h1>
          <h3 className="text-xl font-bold mb-6">
            Taking advantage of Cloudflare&apos;s Developer Platform and Global
            Network
          </h3>
          <Card className="max-w-4xl mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Serverless Global API</CardTitle>
              <CardDescription>
                Serverless globally-deployed APIs offer a cost-effective,
                scalable, and agile approach to building modern applications and
                services, allowing organizations to focus on delivering value to
                their users without being encumbered by the complexities of
                managing infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/region-earth.webp"
                width={1999}
                height={1126}
                alt="Global Serverless API"
                className="rounded"
              />
              <Link href="https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-global-apis/">
                <Button className="mt-4">Learn More</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="max-w-4xl mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Composable AI Architecture</CardTitle>
              <CardDescription>
                The AI market demands organizations to stay updated with the
                latest innovations. Composability, data portability, and
                standard APIs are crucial for mixing and matching AI components,
                facilitating seamless data exchange, ensuring interoperability,
                and fostering flexibility. Cloudflare&apos;s AI platform offers
                a composable AI infrastructure with support for standard
                interfaces and simplified development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/ai-composable.png"
                width={1200}
                height={639}
                alt="Composable AI Reference Architecture Diagram"
                className="rounded"
              />
              <Link href="https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/">
                <Button className="mt-4">Learn More</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="max-w-4xl mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>AI Observability</CardTitle>
              <CardDescription>
                Using a forward proxy can mitigate challenges like
                fragmentation, availability, lack of observability, lack of cost
                control, and more. Cloudflare AI Gateway is positioned between
                the service making inference requests and the inference service
                platform, it serves as a single point for observability and
                control. By shifting features such as rate limiting, caching,
                and error handling to the proxy layer, organizations can apply
                unified configurations across services and inference service
                providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/ai-observability.png"
                width={1200}
                height={380}
                alt="AI Observability Reference Architecture Diagram"
                className="rounded"
              />
              <Link href="https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-multivendor-observability-control/">
                <Button className="mt-4">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
          <ViewSourceCode />
        </div>
      </div>
    </>
  );
}
