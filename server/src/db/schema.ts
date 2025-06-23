
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const greetingsTable = pgTable('greetings', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const buttonInteractionsTable = pgTable('button_interactions', {
  id: serial('id').primaryKey(),
  interaction_type: text('interaction_type').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type Greeting = typeof greetingsTable.$inferSelect;
export type NewGreeting = typeof greetingsTable.$inferInsert;
export type ButtonInteraction = typeof buttonInteractionsTable.$inferSelect;
export type NewButtonInteraction = typeof buttonInteractionsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { 
  greetings: greetingsTable,
  buttonInteractions: buttonInteractionsTable
};
