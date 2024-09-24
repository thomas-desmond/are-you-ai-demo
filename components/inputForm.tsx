"use client";
import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import {
  getAiDescriptionAndInsertToVectorize,
  getAiSimilarity,
} from "@/lib/ai";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loadingSpinner";
import { ResultsDisplay } from "./ui/resultsDisplay";
import Link from "next/link";
import Image from "next/image";

export const runtime = "edge";

const sessionId = nanoid();

interface InputFormProps {
  imageUrl: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [similarityScore, setsimilarityScore] = React.useState<number>();
  const [userDescription, setUserDescription] = React.useState<string>();
  const [aiImageDescription, setAiImageDescription] =
    React.useState<string>("");
  const [nextSession, setNextSession] = React.useState<string>();


  useEffect(() => {
    setNextSession(nanoid());
    const fetchData = async () => {
      console.log("fetching data", props.imageUrl);
      if (!props.imageUrl) return;
      console.log("Fetching image description for AI");
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
    setSubmitted(true);
    setUserDescription(text);

    const score = await getAiSimilarity(sessionId, text);

    setsimilarityScore(parseFloat((score * 100).toFixed(3)));
    setIsLoading(false);
  };

  return (
    <>
        <Image
          src={props.imageUrl}
          alt="AI Generated Image"
          width={336}
          height={187}
          className="rounded-lg shadow-xl"
          priority
        />

      {!submitted && (
        <div className="w-full max-w-md mt-2 bg-white p-6 rounded-lg shadow-xl flex justify-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <Input
              placeholder="Give a consise description of the image..."
              className="mb-4"
              id="message"
              name="message"
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Submit Description
            </Button>
          </form>
        </div>
      )}
      {isLoading && <LoadingSpinner className="mt-4" size={48} />}
      {similarityScore && aiImageDescription && (
        <>
          <ResultsDisplay
            userDescription={userDescription as string}
            aiDescription={aiImageDescription}
            similarity={similarityScore}
          />
          <Link href={`/are-you-ai/${nextSession}`}>
            <Button className="max-w-md my-4">Go Again</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default InputForm;
