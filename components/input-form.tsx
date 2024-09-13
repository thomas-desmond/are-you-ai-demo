/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import {
  getAiDescriptionAndInsertToVectorize,
  getAiSimilarity,
} from "@/lib/ai";
import Score from "./score";
import { SimilarityScore } from "@/types/similarityScore";
import LoadingSpinner from "./loading-spinner";

export const runtime = "edge";

const sessionId = nanoid();

interface InputFormProps {
  imageUrl: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    if (!text) return;

    setIsLoading(true);
    console.log("heading out to API");
    const data = await getAiSimilarity(sessionId, text);
    console.log("back from API");
    setScoreData(data);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-auto max-w-prose">
          {aiImageDescription && (
            <div className="pb-4">
              <label className="mb-2 pb-4 text-gray-900 dark:text-white">
                While you were waiting the llava-1.5-7b-hf image to text model
                has been hard at work and has come up with a description for the
                image, now it&apos;s your turn.
              </label>
            </div>
          )}
          <div className="flex justify-center text-center">
            <Score
              scoreData={scoreData}
              aiImageDescription={aiImageDescription}
            />
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
          <div className="flex flex-col justify-center content-center">
            {isLoading && <LoadingSpinner />}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </button>
            {aiImageDescription && scoreData && (
              <div className="flex flex-col justify-centerpy-2">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-2 py-2 px-4 rounded"
                  onClick={() => window.location.reload()}
                >
                  Go Again
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
