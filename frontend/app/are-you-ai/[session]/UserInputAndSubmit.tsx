import { useFormStatus } from "react-dom";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { LoadingSpinner } from "../../../components/ui/loadingSpinner";

interface InputFormAndSubmitButtonProps {
    similarityScore: number | undefined;
    onValueChange: (value: string) => void;
    disabled: boolean
}

export function InputFormAndSubmitButton({ similarityScore, onValueChange, disabled }:  InputFormAndSubmitButtonProps ) {
  const { pending } = useFormStatus();

  return (
    <>
      {(!pending && similarityScore == -1) && (
        <div className="w-full max-w-md mt-2 bg-white p-6 rounded-lg shadow-xl flex flex-col justify-center">
          <Input
            placeholder="Give a detailed single sentence description"
            className="mb-4"
            id="message"
            name="message"
            onChange={(e) => onValueChange(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={disabled}>
            {disabled ? "Getting AI's Description..." : "Submit Your Description"}

          </Button>
        </div>
      )}

      {pending && <LoadingSpinner className="mt-4" size={48} />}
    </>
  );
}
