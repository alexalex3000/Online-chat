import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 30 }).notNull(),
    surname: varchar("surname", { length: 30 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    lastTimeOnline: timestamp("last_time_online").defaultNow().notNull(),
    logoUrl: text("logo_url"),
});

export const userValidateSchema = z.object({
    name: z.string().min(1).max(30),
    surname: z.string().min(1).max(30),
    email: z.string().email(),
    lastTimeOnline: z.coerce.date().optional(),
    logoUrl: z.string().url().optional(),
});