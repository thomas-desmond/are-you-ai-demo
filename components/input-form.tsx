"use client";
import React, { useEffect } from "react";

export const runtime = "edge";

const handleSubmitOld = async (e: any) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const text = formData.get("message");

  console.log("heading out to API");
  const stuff = await getAiSimilarity(text as string);
  console.log("back from API");
  console.log(stuff);
};

interface InputFormProps {
  imageUrl: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [aiDescription, setAiDescription] = React.useState<string>("");

  const getAiDescription = async () => {
    const res = await fetch(props.imageUrl);
    const blob = await res.arrayBuffer();
    const encodedImage = Array.from(new Uint8Array(blob));
    const response = await fetch(
      "http://127.0.0.1:8787/getAiImageDescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encodedImage }),
      }
    );

    const data = await response.json();
    console.log(data);
    setAiDescription(data?.aiImageDescription);
    return data;
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
        type="submit"
        onClick={getAiDescription}
      >
        Submit
      </button>
      <form onSubmit={handleSubmitOld}>
        {aiDescription && (
          <div className="mt-4">
            <p className="text-gray-900 dark:text-white">{aiDescription}</p>
          </div>
        )}
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
    </div>
  );
};

export default InputForm;

async function getAiSimilarity(text: string) {
  const response = await fetch("http://127.0.0.1:8787/guess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  return data;
}
