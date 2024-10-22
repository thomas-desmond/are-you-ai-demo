import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { toolTipData } from "@/content/toolTipData";

interface ResultsDisplayProps {
  userDescription: string;
  aiDescription: string;
  similarity: number;
}

export function ResultsDisplay({
  userDescription,
  aiDescription,
  similarity,
}: ResultsDisplayProps) {
  if (similarity === 0) {
    return (
      <Card className="w-full max-w-2xl mt-8">
        <CardHeader>
          <CardTitle className="font-semibold text-xl underline">
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>
              An error occurred while calculating the similarity score. Please
              try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mt-8">
      <CardHeader>
        <CardTitle className="font-semibold text-xl underline">
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">
            Your Description:
          </h3>
          <p className="text-gray-700">{userDescription}</p>
        </div>
        <ComponentWrapper
          imageUrls={["/products/workersai.svg"]}
          imageToolTips={[toolTipData.aiDescription]}
          imagePosition="top-right"
        >
          <div>
            <h3 className="font-semibold text-lg mb-2 underline">
              AI&apos;s Description:
            </h3>
            <p className="text-gray-700">{aiDescription}</p>
          </div>
        </ComponentWrapper>
        <ComponentWrapper
          imageUrls={["/products/vectorize.svg", "/products/workersai.svg"]}
          imageToolTips={[toolTipData.vectorize, toolTipData.textEmbedding]}
          imagePosition="bottom-right"
        >
          <div>
            <h3 className="font-semibold text-lg mb-2 underline">
              Similarity Score:
            </h3>
            <p className="text-2xl font-bold">{similarity}%</p>
          </div>
        </ComponentWrapper>
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">Verdict:</h3>
            <p className="text-xl font-bold">
            {similarity >= 80
              ? [
              "You might be AI!",
              "High similarity detected! Are you AI?",
              "AI-like response!",
              "Impressive! Your response is very AI-like.",
              "AI detected! Your response is highly similar.",
              "AI-level accuracy! Are you a machine?",
              "AI-like precision detected!",
              "Your response is highly AI-like!",
              "AI-level similarity achieved!"
              ].sort(() => 0.5 - Math.random())[0]
              : [
              "You're probably human!",
              "Low similarity. Likely human.",
              "Human-like response detected!",
              "Your response seems human.",
              "Human detected! Your response is not very AI-like.",
              "Human-level response detected!",
              "Your response is clearly human!",
              "Human-like accuracy detected!",
              "Your response is distinctly human!",
              "Human-level similarity!"
              ].sort(() => 0.5 - Math.random())[0]}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
