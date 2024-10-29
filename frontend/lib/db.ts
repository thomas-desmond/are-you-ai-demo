import { Root } from "@/types/database";

async function fetchRecentSessions() {
  try {
    const response = await fetch(
      process.env.API_ENDPOINT + "/recentSessions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.API_KEY as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recent sessions");
    }

    const data = (await response.json()) as Root;
    return data.sessions;
  } catch (error) {
    console.error("Error fetching recent sessions:", error);
    return null;
  }
}

export { fetchRecentSessions };
