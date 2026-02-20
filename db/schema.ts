import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  clerkUserId: text('clerk_user_id').primaryKey(),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userProgress = pgTable('user_progress', {
  clerkUserId: text('clerk_user_id').primaryKey().references(() => users.clerkUserId),
  progress: jsonb('progress').notNull(), // AppProgress shape
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
