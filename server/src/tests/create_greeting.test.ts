
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { greetingsTable } from '../db/schema';
import { type CreateGreetingInput } from '../schema';
import { createGreeting } from '../handlers/create_greeting';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateGreetingInput = {
  message: 'Hello, World!'
};

describe('createGreeting', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a greeting', async () => {
    const result = await createGreeting(testInput);

    // Basic field validation
    expect(result.message).toEqual('Hello, World!');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save greeting to database', async () => {
    const result = await createGreeting(testInput);

    // Query using proper drizzle syntax
    const greetings = await db.select()
      .from(greetingsTable)
      .where(eq(greetingsTable.id, result.id))
      .execute();

    expect(greetings).toHaveLength(1);
    expect(greetings[0].message).toEqual('Hello, World!');
    expect(greetings[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle different message types', async () => {
    const inputs = [
      { message: 'Short' },
      { message: 'A much longer greeting message with special characters: !@#$%^&*()' },
      { message: 'Greeting with numbers: 12345' }
    ];

    for (const input of inputs) {
      const result = await createGreeting(input);
      
      expect(result.message).toEqual(input.message);
      expect(result.id).toBeDefined();
      expect(result.created_at).toBeInstanceOf(Date);
    }
  });
});
