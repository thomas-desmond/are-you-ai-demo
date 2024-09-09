"use client";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { getAiSimilarity } from "@/lib/ai";
import Score from "./score";
import { GuessData } from "@/types/guessData";

export const runtime = "edge";

const sessionId = nanoid();

interface InputFormProps {
  imageUrl: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [scoreData, setScoreData] =  React.useState<GuessData>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get("message") as string;

    console.log("heading out to API");
    const data = await getAiSimilarity(sessionId, text);
    console.log("back from API");
    setScoreData(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="m-auto w-1/2">
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
      <div className="m-auto w-1/2">
        <Score scoreData={scoreData} />
      </div>
    </div>
  );
};

export default InputForm;
