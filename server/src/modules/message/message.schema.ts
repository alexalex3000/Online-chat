import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import {userTable} from "../user/user.schema";

export const messageTable = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    userId: uuid("user_id")
        .references(() => userTable.id, { onDelete: "set null", onUpdate: "cascade" }),
    date: timestamp("date").defaultNow().notNull(),
});

export const messageQueryValidateSchema = z.object({
    cursor: z.string().uuid().optional(),
});

export const messageBodyValidateSchema = z.object({
    tempId: z.string().uuid(),
    message: z.string().min(1),
})

export const userTypingValidateSchema = z.object({
    userFullname: z.string().min(1)
})

export const editMessageValidateSchema = z.object({
    id: z.string().uuid(),
    message: z.string().min(1),
})

export const deleteMessageValidateSchema = z.object({
    id: z.string().uuid(),
})

export type MessageBody = z.infer<typeof messageBodyValidateSchema>