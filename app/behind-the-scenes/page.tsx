/* eslint-disable @next/next/no-img-element */
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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Behind the Scenes: How &quot;Are you AI?&quot; Works
          </h1>
          <h3 className="text-xl font-bold mb-6">
            Taking advantage of Cloudflare&apos;s Developer Platform and Global
            Network
          </h3>
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>On Page Load</CardTitle>
              <CardDescription>
                What happens when the page first loads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/on-page-load.png"
                width={1430}
                height={704}
                alt="On Page Load Flow"
                className="rounded"
              />
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>API Flow On Submit</CardTitle>
              <CardDescription>
                What happens when you press &quot;Submit&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/on-submission.png"
                width={1355}
                height={698}
                alt="On Submission API Flow"
                className="rounded"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
