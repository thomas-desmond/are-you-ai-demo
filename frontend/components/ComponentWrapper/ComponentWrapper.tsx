import {
  Tip,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ComponentWrapperProps {
  children: React.ReactNode;
  borderColor?: string;
  imagePosition?: CornerPosition;
  imageUrls?: string[];
  imageToolTips?: string[];
}

export default function ComponentWrapper({
  children,
  borderColor = "border-primary",
  imagePosition = "top-left",
  imageUrls = ["/placeholder.svg?height=80&width=80"],
  imageToolTips = [""],
}: ComponentWrapperProps) {
  const getImagePositionClasses = (position: CornerPosition) => {
    switch (position) {
      case "top-left":
        return "-top-5 -left-5";
      case "top-right":
        return "-top-5 -right-5";
      case "bottom-left":
        return "-bottom-5 -left-5";
      case "bottom-right":
        return "-bottom-5 -right-5";
    }
  };

  const getStackDirection = (position: CornerPosition) => {
    switch (position) {
      case "top-left":
      case "bottom-left":
        return "flex-row";
      case "top-right":
      case "bottom-right":
        return "flex-row-reverse";
    }
  };
  return (
    <div
      className={`relative border-2 border-dashed border-[#F6821F] p-4 rounded-lg`}
    >
      <div className="relative z-10">{children}</div>
      <div
        className={`absolute ${getImagePositionClasses(imagePosition)} z-20`}
      >
        <div className={`flex ${getStackDirection(imagePosition)}`}>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={`${index > 0 ? "relative" : ""}`}
              style={{ zIndex: imageUrls.length - index }}
            >
              <Tip content={imageToolTips[index]}>
                <Image
                  src={url}
                  width={50}
                  height={50}
                  alt={`Corner image ${index + 1}`}
                  className="object-cover pr-1 bg-transparent"
                />
              </Tip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ComponentWrapper };
