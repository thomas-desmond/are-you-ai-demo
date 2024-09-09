import { GuessData } from "@/types/guessData";

interface ScoreProps {
  scoreData: GuessData | undefined;
}

const Score: React.FC<ScoreProps> = (props) => {
  if (!props.scoreData) return;

  return (
    <div>
      {props.scoreData.aiImageDescription && (
        <div className="mt-4">
          <p className="text-gray-900 dark:text-white">
            AI&apos;s Description: {props.scoreData.aiImageDescription}
          </p>
        </div>
      )}
      {props.scoreData.similarityScore && (
        <div className="mt-4">
            <p className="text-gray-900 dark:text-white">
              How similar are you to AI:{" "}
              {(props.scoreData.similarityScore * 100).toFixed(3)}%
            </p>
        </div>
      )}
    </div>
  );
};

export default Score;
