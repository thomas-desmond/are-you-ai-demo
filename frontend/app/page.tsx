import AppInfoCard from "@/components/AppInfoCard";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import { toolTipData } from "@/content/toolTipData";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full items-center justify-center">
        <AppInfoCard />
    </div>
  );
}
