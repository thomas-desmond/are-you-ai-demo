
import { Button } from "@/components/ui/button";
import { fetchRecentSessions } from "@/lib/db";
import Link from "next/link";
import RecentSessionsTable from "./recentSessionsTable";
import { Sessions } from "@/types/database";

export const runtime = "edge";

export default async function BehindTheScenes() {
  const recentSessions = await fetchRecentSessions() as Sessions;

  return (
    <>
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
      <RecentSessionsTable recentSessions={recentSessions} />
    </>
  );
}
