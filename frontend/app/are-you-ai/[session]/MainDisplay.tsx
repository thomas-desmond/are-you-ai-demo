"use client";
import React from "react";
import { nanoid } from "nanoid";
import { Button } from "../../../components/ui/button";
import { ResultsDisplay } from "../../../components/ui/resultsDisplay";
import Link from "next/link";
import Image from "next/image";
import { useFormState } from "react-dom";
import { handleSubmitServerAction } from "@/app/actions/UserDescriptionSubmitAction";
import { InputFormAndSubmitButton } from "./UserInputAndSubmit";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import { toolTipData } from "@/content/toolTipData";
import { getAiDescriptionAndInsertToVectorizeAction } from "@/app/actions/getAiImageDescriptionAndVectorizeInsert";
import ShareButton from "./ShareButton";

export const runtime = "edge";

interface InputFormProps {
  imageUrl: string;
  sessionId: string;
}

const initialState = {
  similarityScore: -1,
  userDescription: "",
};

const MainDisplay: React.FC<InputFormProps> = (props) => {
  const [userDescription, setUserDescription] = React.useState<string>();
  const [nextSession, setNextSession] = React.useState<string>(nanoid());
  const [aiImageDescription, setAiImageDescription] =
    React.useState<string>("");

  const [state, formAction] = useFormState(
    handleSubmitServerAction,
    initialState
  );

  React.useEffect(() => {
    const getAiDescription = async () => {
      const aiImageDescription =
        await getAiDescriptionAndInsertToVectorizeAction(
          props.sessionId,
          props.imageUrl
        );
      setAiImageDescription(aiImageDescription);
    };

    getAiDescription();
  }, []);

  if (!props.imageUrl) {
    return (
      <div>
        <p>
          Error: Image could not be generated or generating AI Image Description
          failed.
        </p>
      </div>
    );
  }

  return (
    <>
      <ComponentWrapper
        imageUrls={[
          "/products/workersai.svg",
          "/products/aigateway.svg",
          "/products/images.svg",
        ]}
        imageToolTips={[
          toolTipData.randomImage,
          toolTipData.aiGateway,
          toolTipData.images,
        ]}
        imagePosition="top-right"
      >
        <Image
          src={props.imageUrl}
          alt="AI Generated Image"
          width={336}
          height={187}
          className="rounded-lg shadow-xl"
          priority
        />
      </ComponentWrapper>
      <form
        className="w-full flex justify-center items-center"
        action={formAction}
      >
        <InputFormAndSubmitButton
          similarityScore={state?.similarityScore}
          onValueChange={(value: string) => setUserDescription(value)}
          stillGeneratingAiDescription={Boolean(!aiImageDescription)}
        />
        <input type="hidden" name="sessionId" value={props.sessionId} />
        <input
          type="hidden"
          name="aiImageDescription"
          value={aiImageDescription}
        />
        <input type="hidden" name="imageUrl" value={props.imageUrl} />
      </form>
      {state && state.similarityScore != -1 && (
        <>
          <ResultsDisplay
            userDescription={userDescription as string}
            aiDescription={aiImageDescription}
            similarity={state.similarityScore}
          />
          <div className="w-full flex justify-center items-center space-between space-x-4">
            <Link href={`/are-you-ai/${nextSession}`}>
              <Button className="max-w-md text-xl px-8 py-4 my-4">
                Generate New Image
              </Button>
            </Link>
            <Link className="" href={`/recent`}>
              <Button
                variant="outline"
                className="max-w-md text-xl px-8 py-4 my-4"
              >
                Recent Sessions
              </Button>
            </Link>
          </div>
          <ShareButton  similarity={state.similarityScore} />
        </>
      )}
    </>
  );
};

export default MainDisplay;
