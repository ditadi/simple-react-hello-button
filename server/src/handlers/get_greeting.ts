
import { db } from '../db';
import { greetingsTable } from '../db/schema';
import { type Greeting } from '../schema';
import { desc } from 'drizzle-orm';

export const getGreeting = async (): Promise<Greeting> => {
  try {
    // Get the most recent greeting from the database
    const results = await db.select()
      .from(greetingsTable)
      .orderBy(desc(greetingsTable.created_at))
      .limit(1)
      .execute();

    // If no greetings exist, return a default greeting
    if (results.length === 0) {
      return {
        id: 0,
        message: "Hello! Welcome to our application.",
        created_at: new Date()
      };
    }

    return results[0];
  } catch (error) {
    console.error('Get greeting failed:', error);
    throw error;
  }
};
