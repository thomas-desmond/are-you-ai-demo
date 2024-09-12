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
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

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
            {isLoading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                The slow part is waiting for the upsert of the AI image
                description into Vectorize...especially once metadata was added.
              </div>
            )}
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
      <div className="flex flex-col items-center justify-center mt-8">
        <button
          className="p-2 text-lg font-bold text-white bg-blue-500 rounded-md focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "How It Works" : "Show Less"}
        </button>
        <div className={`${isCollapsed ? "hidden" : "block"} mt-4`}>
          <img
            src="/on-page-load.png"
            width={1430}
            height={704}
            alt="AI Generated Image"
          />
          <img
            src="/on-submission.png"
            width={1355}
            height={698}
            alt="AI Generated Image"
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
