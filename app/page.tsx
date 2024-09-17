import BehindTheScenesButton from "@/components/behind-the-scenes/BehindTheScenesButton";
import AppInfoCard from "@/components/AppInfoCard";

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
