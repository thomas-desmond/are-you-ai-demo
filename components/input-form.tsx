"use client";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import {
  getAiDescriptionAndInsertToVectorize,
  getAiSimilarity,
} from "@/lib/ai";
import Score from "./score";
import { SimilarityScore } from "@/types/similarityScore";

export const runtime = "edge";

const sessionId = nanoid();

interface InputFormProps {
  imageUrl: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [scoreData, setScoreData] = React.useState<SimilarityScore>();
  const [aiImageDescription, setAiImageDescription] =
    React.useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aiImageDescription = await getAiDescriptionAndInsertToVectorize(
          sessionId,
          props.imageUrl
        );
        setAiImageDescription(aiImageDescription);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get("message") as string;

    console.log("heading out to API");
    const data = await getAiSimilarity(sessionId, text);
    console.log("back from API");
    setScoreData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-auto w-1/2">
          {aiImageDescription && (
            <div className="pb-4">
              <label className="mb-2 pb-4 text-gray-900 dark:text-white">
                While you were waiting the AI has been hard at work and has come
                up with a description for the image, now it&apos;s your turn.
              </label>
            </div>
          )}
          <div className="flex justify-center">
            <Score scoreData={scoreData} />
          </div>
          <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your AI Image Description
          </label>
          <input
            id="message"
            name="message"
            className="block p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a consise description of the image above..."
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
