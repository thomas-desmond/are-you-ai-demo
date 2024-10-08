import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-screen max-w-md mx-auto">
        <CardContent className="p-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="flex flex-col items-center justify-center mt-4 space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm font-medium">Using Cloudflare Workers AI to generate a random image (Text to Image) then using a separate AI Worker to generate the description (Image to Text)</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center px-4 pt-0 pb-4">
          <Skeleton className="h-4 mb-2 w-5/6" />
          <Skeleton className="h-4 w-5/6" />
        </CardFooter>
      </Card>
    </div>
  );
}
