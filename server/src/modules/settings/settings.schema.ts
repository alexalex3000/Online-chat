import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import { userTable } from "../user/user.schema";

export const settingsTable = pgTable("settings", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .unique()
        .references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }),

    chatSounds: boolean("chat_sounds").default(true).notNull(),
    pinnedMessageAlerts: boolean("pinned_message_alerts").default(true).notNull(),
    showOnlineStatus: boolean("show_online_status").default(true).notNull(),
    doNotDistract: boolean("do_not_distract").default(false).notNull(),
});

export const updateSettingsValidationSchema = z.object({
    chatSounds: z.boolean().optional(),
    pinnedMessageAlerts: z.boolean().optional(),
    showOnlineStatus: z.boolean().optional(),
    doNotDistract: z.boolean().optional(),
});

export const validateUserIdSchema = z.object({
    userId: z.string().min(1),
})

export type UserIdType = z.infer<typeof validateUserIdSchema>
export type SettingsTitleTypes = z.infer<typeof updateSettingsValidationSchema>