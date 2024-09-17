import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function ViewSourceCode({}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">View the Source Code</h2>
      <div className="space-y-4">
        <Link
          href="https://github.com/thomas-desmond/are-you-ai-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="w-full mb-2">
            <Github className="mr-2 h-4 w-4" />
            Frontend Repository
          </Button>
        </Link>
        <Link
          href="https://github.com/thomas-desmond/are-you-ai-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="w-full mb-2">
            <Github className="mr-2 h-4 w-4" />
            API Repository
          </Button>
        </Link>
      </div>
    </div>
  );
}
