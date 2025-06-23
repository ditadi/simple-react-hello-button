
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { greetingsTable } from '../db/schema';
import { getGreeting } from '../handlers/get_greeting';

describe('getGreeting', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return default greeting when no greetings exist', async () => {
    const result = await getGreeting();

    expect(result.id).toEqual(0);
    expect(result.message).toEqual("Hello! Welcome to our application.");
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should return most recent greeting from database', async () => {
    // Insert test greetings separately to ensure different timestamps
    await db.insert(greetingsTable)
      .values({ message: 'First greeting' })
      .execute();

    // Small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(greetingsTable)
      .values({ message: 'Second greeting' })
      .execute();

    // Small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(greetingsTable)
      .values({ message: 'Most recent greeting' })
      .execute();

    const result = await getGreeting();

    expect(result.message).toEqual('Most recent greeting');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should return greeting with proper field types', async () => {
    // Insert a test greeting
    await db.insert(greetingsTable)
      .values({ message: 'Test greeting message' })
      .execute();

    const result = await getGreeting();

    expect(typeof result.id).toBe('number');
    expect(typeof result.message).toBe('string');
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.message).toEqual('Test greeting message');
  });

  it('should return most recent when multiple greetings exist', async () => {
    // Insert greetings with slight delay to ensure different timestamps
    await db.insert(greetingsTable)
      .values({ message: 'Older greeting' })
      .execute();

    // Small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(greetingsTable)
      .values({ message: 'Newer greeting' })
      .execute();

    const result = await getGreeting();

    expect(result.message).toEqual('Newer greeting');
  });
});
