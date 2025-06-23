
import { z } from 'zod';

// Simple greeting schema for the hello button functionality
export const greetingSchema = z.object({
  id: z.number(),
  message: z.string(),
  created_at: z.coerce.date()
});

export type Greeting = z.infer<typeof greetingSchema>;

// Input schema for creating greetings
export const createGreetingInputSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
});

export type CreateGreetingInput = z.infer<typeof createGreetingInputSchema>;

// Simple button interaction schema
export const buttonInteractionSchema = z.object({
  id: z.number(),
  interaction_type: z.string(),
  timestamp: z.coerce.date()
});

export type ButtonInteraction = z.infer<typeof buttonInteractionSchema>;

// Input schema for button interactions
export const recordInteractionInputSchema = z.object({
  interaction_type: z.string().default("click")
});

export type RecordInteractionInput = z.infer<typeof recordInteractionInputSchema>;
