import {relations} from "drizzle-orm";
import {messageTable, settingsTable, userTable} from "./schema";

export const userRelations = relations(userTable, ({many}) => ({
    settings: many(settingsTable),
    messages: many(messageTable)
}))

export const messageRelations = relations(messageTable, ({one}) => ({
    user: one(userTable, {
        fields: [messageTable.id],
        references: [userTable.id]
    }),
}))

export const settingsRelations = relations(settingsTable, ({one}) => ({
    user: one(userTable, {
        fields: [settingsTable.id],
        references: [userTable.id]
    }),
}))