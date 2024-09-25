import { AiImageDescription } from "@/types/aiImageDescription";
import { SimilarityScore } from "@/types/similarityScore";

interface ScoreProps {
  scoreData: SimilarityScore | undefined;
  aiImageDescription: string;
}

const Score: React.FC<ScoreProps> = (props) => {
  if (!props.scoreData) return;

  return (
    <div>
      {props.scoreData.similarityScore && (
        <div className="mt-4">
            <p className="text-gray-900 dark:text-white">
              Looks like you are {" "} {(props.scoreData.similarityScore * 100).toFixed(3)}% AI.
            </p>
            <p className="text-gray-900 dark:text-white py-2">
              AI&apos;s Description: {props.aiImageDescription}
            </p>
        </div>
      )}
    </div>
  );
};

export default Score;
