import {relations} from "drizzle-orm";
import {messageTable, sessionTable, settingsTable, userTable} from "./schema";

export const userRelations = relations(userTable, ({one, many}) => ({
    settings: many(settingsTable),
    messages: many(messageTable),
    session: one(sessionTable)
}))

export const messageRelations = relations(messageTable, ({one}) => ({
    user: one(userTable, {
        fields: [messageTable.userId],
        references: [userTable.id]
    }),
}))

export const settingsRelations = relations(settingsTable, ({one}) => ({
    user: one(userTable, {
        fields: [settingsTable.userId],
        references: [userTable.id]
    }),
}))

export const sessionRelations = relations(sessionTable, ({one}) => ({
    user: one(userTable, {
        fields: [sessionTable.userId],
        references: [userTable.id]
    })
}))