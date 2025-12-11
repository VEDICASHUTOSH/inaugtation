import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './lib/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PG_HOST_DEV,
    user: process.env.PG_USER_DEV,
    password: process.env.PG_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    port: 5432,
  },
});
