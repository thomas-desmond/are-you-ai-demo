"use client"
import React from "react";

const HowItWorks: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

  return (
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
  );
};

export default HowItWorks;
