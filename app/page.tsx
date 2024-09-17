import AppInfoCard from "@/components/appInfoCard";
import BehindTheScenesButton from "@/components/behindTheScenes/behindTheScenesButton";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center">
        <AppInfoCard />
      </div>
      <BehindTheScenesButton />
    </div>
  );
}
