import { config } from 'dotenv';

// Load .env.local first (Next.js convention), then .env
config({ path: '.env.local' });
config({ path: '.env' });
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
