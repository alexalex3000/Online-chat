import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import {userTable} from "../user/user.schema";

export const messageTable = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    userId: uuid("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    date: timestamp("date").defaultNow().notNull(),
});

export const messageQueryValidateSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(30),
    cursor: z.string().uuid().optional(),
});

export const messageBodyValidateSchema = z.object({
    message: z.string().min(1),
})

export type MessageBody = z.infer<typeof messageBodyValidateSchema>