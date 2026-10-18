import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import {userTable} from "../user/user.schema";

export const messageStatusEnum = pgEnum("message_status", ["pending", "success", "error"]);
export const messageStatusValidate = z.enum(["pending", "success", "error"]);

export const messageTable = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    status: messageStatusEnum("status").default("pending").notNull(),
    userId: uuid("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
    date: timestamp("date").defaultNow().notNull(),
});

export const messageValidateSchema = z.object({
    message: z.string().min(1).max(500),
    status: messageStatusValidate.default("pending"),
    userId: z.string().uuid(),
    date: z.coerce.date().optional(),
});