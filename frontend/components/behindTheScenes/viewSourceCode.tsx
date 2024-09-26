import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ViewSourceCode({}) {
  return (
    <Card className="w-full mx-auto bg-gradient-to-r from-[#FBAD41] via-[#F6821F] to-[#F6821F] text-black mb-4">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Source Code</h3>
          <p className="">
            Explore the GitHub repository powering this application
          </p>
        </div>
        <CardFooter className="p-0">
          <Link
            href="https://github.com/thomas-desmond/are-you-ai-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="text-primary hover:text-primary-foreground"
              asChild
            >
              <div>
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </div>
            </Button>
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
