import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import {userTable} from "../user/user.schema";

export const settingsTable = pgTable("settings", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 50 }).notNull(),
    text: text("text"),
    value: boolean("value").default(false).notNull(),
    userId: uuid("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const settingsValidationSchema = z.object({
    title: z.string().min(1).max(50),
    text: z.string().max(255).optional(),
    value: z.boolean().default(false),
    userId: z.string().uuid(), // исправлен z.uuid()
});