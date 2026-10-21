import {pgEnum, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { z } from "zod";

export const roleEnum = pgEnum("role_enum", ["user", "admin"])

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    role: roleEnum("role").default("user").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    surname: varchar("surname", { length: 30 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    lastTimeOnline: timestamp("last_time_online").defaultNow().notNull(),
    logoUrl: text("logo_url"),
});