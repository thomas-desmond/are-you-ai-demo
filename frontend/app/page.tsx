import AppInfoCard from "@/components/AppInfoCard";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full items-center justify-center">
        <AppInfoCard />
    </div>
  );
}
