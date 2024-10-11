import { Root } from "@/types/database";

async function insertIntoDatabase(sessionId: string, userDescription: string, aiImageDescription: string, score: number, imageUrl: string) {
    try {
      const response = await fetch('https://api.areyouaidemo.com/databaseInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Session-Identifier": sessionId
        },
        body: JSON.stringify({
          sessionId,
          userDescription,
          aiImageDescription,
          score,
          imageUrl,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to insert data into the database');
      }
  
    } catch (error) {
      console.error('Error inserting data into the database:', error);
    }
  }

async function fetchRecentSessions() {
    try {
        const response = await fetch('https://api.areyouaidemo.com/recentSessions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recent sessions');
        }

        const data = await response.json() as Root;
        return data.sessions;
    } catch (error) {
        console.error('Error fetching recent sessions:', error);
        return null;
    }
}

  export {
    insertIntoDatabase,
    fetchRecentSessions
  };