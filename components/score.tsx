import { SimilarityScore } from "@/types/similarityScore";

interface ScoreProps {
  scoreData: SimilarityScore | undefined;
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
        </div>
      )}
    </div>
  );
};

export default Score;
