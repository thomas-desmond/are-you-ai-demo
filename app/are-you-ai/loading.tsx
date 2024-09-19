import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-screen max-w-md mx-auto">
        <CardContent className="p-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm font-medium">Generating AI Image</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between px-4 pt-0 pb-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardFooter>
      </Card>
    </div>
  );
}
