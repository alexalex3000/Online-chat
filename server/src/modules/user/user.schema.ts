import {pgEnum, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { z } from "zod";

export const roleEnum = pgEnum("role_enum", ["user", "admin"])

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    role: roleEnum("role").default("user").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    surname: varchar("surname", { length: 30 }).notNull(),
    username: varchar("username", { length: 30 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    lastTimeOnline: timestamp("last_time_online", {withTimezone: true}).defaultNow().notNull(),
    logoUrl: text("logo_url"),
});

export interface User {
    role: "user" | "admin";
    name: string;
    surname: string;
    username: string;
    email: string;
    lastTimeOnline: Date;
    logoUrl: string | null;
}

export const changeUserValidateSchema = z.object({
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    email: z.string().email().min(1).optional(),
    logoUrl: z.string().min(1).optional(),
})

export type ChangeUser = z.infer<typeof changeUserValidateSchema>;