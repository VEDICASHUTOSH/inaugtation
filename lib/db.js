import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Load environment variables and encode them properly for URI
const host = process.env.PG_HOST_DEV;
const user = encodeURIComponent(process.env.PG_USER_DEV);
const password = encodeURIComponent(process.env.PG_PASSWORD_DEV);
const database = encodeURIComponent(process.env.DB_NAME_DEV);
const port = 5432;

// Create connection string with properly encoded credentials
const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

// Create a connection to the database
const client = postgres(connectionString);

// Create and export the Drizzle instance
export const db = drizzle(client);
