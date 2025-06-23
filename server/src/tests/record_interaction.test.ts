
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { buttonInteractionsTable } from '../db/schema';
import { type RecordInteractionInput } from '../schema';
import { recordInteraction } from '../handlers/record_interaction';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: RecordInteractionInput = {
  interaction_type: 'click'
};

describe('recordInteraction', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should record a button interaction', async () => {
    const result = await recordInteraction(testInput);

    // Basic field validation
    expect(result.interaction_type).toEqual('click');
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should save interaction to database', async () => {
    const result = await recordInteraction(testInput);

    // Query using proper drizzle syntax
    const interactions = await db.select()
      .from(buttonInteractionsTable)
      .where(eq(buttonInteractionsTable.id, result.id))
      .execute();

    expect(interactions).toHaveLength(1);
    expect(interactions[0].interaction_type).toEqual('click');
    expect(interactions[0].timestamp).toBeInstanceOf(Date);
  });

  it('should use default interaction type when specified', async () => {
    const defaultInput: RecordInteractionInput = {
      interaction_type: 'click'
    };

    const result = await recordInteraction(defaultInput);

    expect(result.interaction_type).toEqual('click');
  });

  it('should record custom interaction types', async () => {
    const customInput: RecordInteractionInput = {
      interaction_type: 'hover'
    };

    const result = await recordInteraction(customInput);

    expect(result.interaction_type).toEqual('hover');

    // Verify in database
    const interactions = await db.select()
      .from(buttonInteractionsTable)
      .where(eq(buttonInteractionsTable.id, result.id))
      .execute();

    expect(interactions[0].interaction_type).toEqual('hover');
  });
});
