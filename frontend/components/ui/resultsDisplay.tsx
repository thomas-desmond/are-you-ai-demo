import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ResultsDisplayProps {
  userDescription: string;
  aiDescription: string;
  similarity: number;
}

export function ResultsDisplay({ userDescription, aiDescription, similarity }: ResultsDisplayProps) {
  if (similarity === 0) {
    return (
      <Card className="w-full max-w-2xl mt-8">
        <CardHeader>
          <CardTitle className="font-semibold text-xl underline">Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>An error occurred while calculating the similarity score. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mt-8">
      <CardHeader>
        <CardTitle className="font-semibold text-xl underline" >Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">Your Description:</h3>
          <p className="text-gray-700">{userDescription}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">AI&apos;s Description:</h3>
          <p className="text-gray-700">{aiDescription}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">Similarity Score:</h3>
          <p className="text-2xl font-bold">{similarity}%</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 underline">Verdict:</h3>
          <p className="text-xl font-bold">
            {similarity >= 80 ? "You might be AI!" : "You're probably human!"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}