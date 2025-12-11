// Database schema will be defined here
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("inaugtation_users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  contact: varchar("contact", { length: 20 }),
  birthPlace: text("birth_place"),            // "Mumbai, Maharashtra, India"
  country: text("country"),                   // "India"

  day: integer("day").notNull(),              // 3
  month: integer("month").notNull(),          // 3
  year: integer("year").notNull(),            // 1943
  hour: integer("hour").notNull(),            // 2
  minute: integer("minute").notNull(),        // 4

  gender: varchar("gender", { length: 10 }),   // "female"
  language: varchar("language", { length: 20 }),

  tzone: numeric("tzone", { precision: 4, scale: 2 }),  // 6.50

  lat: numeric("lat", { precision: 10, scale: 7 }),      // "19.0759837"
  lon: numeric("lon", { precision: 10, scale: 7 }),      // "72.8776559",
});
