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
import { insertIntoDatabase } from "@/lib/db";

export const runtime = "edge";


interface InputFormProps {
  imageUrl: string;
  aiImageDescription: string;
  sessionId: string;
}

const InputForm: React.FC<InputFormProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [similarityScore, setSimilarityScore] = React.useState<number>();
  const [userDescription, setUserDescription] = React.useState<string>();
  const [nextSession, setNextSession] = React.useState<string>(nanoid());

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const text = formData.get("message") as string;
    if (!text) return;

    setIsLoading(true);
    setSubmitted(true);
    setUserDescription(text);

    const score = await getAiSimilarity(props.sessionId, text);

    setSimilarityScore(parseFloat((score * 100).toFixed(3)));
    setIsLoading(false);

    await insertIntoDatabase(
      props.sessionId,
      text,
      props.aiImageDescription,
      parseFloat((score * 100).toFixed(3)),
      props.imageUrl
    );
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
              placeholder="Give a detailed single sentence description"
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
      {similarityScore && (
        <>
          <ResultsDisplay
            userDescription={userDescription as string}
            aiDescription={props.aiImageDescription}
            similarity={similarityScore}
          />
          <Link href={`/are-you-ai/${nextSession}`}>
            <Button className="max-w-md text-xl px-8 py-4 my-4">
              Generate New Image
            </Button>
          </Link>
          <Link className="mt-1" href={`/recent`}>
            <Button variant="outline" className="py-2 px-8 text-lg">
              Recent Sessions
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default InputForm;
