
import { db } from '../db';
import { buttonInteractionsTable } from '../db/schema';
import { type RecordInteractionInput, type ButtonInteraction } from '../schema';

export const recordInteraction = async (input: RecordInteractionInput): Promise<ButtonInteraction> => {
  try {
    // Insert interaction record
    const result = await db.insert(buttonInteractionsTable)
      .values({
        interaction_type: input.interaction_type
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Recording interaction failed:', error);
    throw error;
  }
};
