
import { db } from '../db';
import { greetingsTable } from '../db/schema';
import { type CreateGreetingInput, type Greeting } from '../schema';

export const createGreeting = async (input: CreateGreetingInput): Promise<Greeting> => {
  try {
    // Insert greeting record
    const result = await db.insert(greetingsTable)
      .values({
        message: input.message
      })
      .returning()
      .execute();

    // Return the created greeting
    const greeting = result[0];
    return {
      ...greeting
    };
  } catch (error) {
    console.error('Greeting creation failed:', error);
    throw error;
  }
};
