import { GuessData } from "@/types/guessData";

async function getAiSimilarity(sessionId: string, text: string): Promise<GuessData> {
    const response = await fetch("http://127.0.0.1:8787/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, text }),
    });
  
    const data = await response.json() as GuessData;
  
    return data;
  }
  
export { getAiSimilarity };