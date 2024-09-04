"use client";
import React from "react";

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
  // Define the props for your component here
}

const InputForm: React.FC<InputFormProps> = (props) => {
  return (
    <form onSubmit={handleSubmitOld}>
      <div className="m-auto w-1/2">
        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your AI Image Description
        </label>
        <textarea
          id="message"
          name="message"
          className="block p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write a consise description of the image above..."
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
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







async function generateEmbedding(text: string) {
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



async function getAiImageDescription(): Promise<string> {
  const response = await fetch("/api/ai/image-description", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }
  const responseBody = await response.json();

  return responseBody as string;
}

async function insertEmbeddingInDb(embedding: number[]) {
  const response = await fetch(
    "https://are-you-ai.thomas-development.workers.dev/guess",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embedding }),
    }
  );

  if (!response.ok) {
    throw new Error("Request failed");
  }
  const responseBody = await response.json();
  console.log("Insert Embedding", responseBody);

  console.log(responseBody);
}
