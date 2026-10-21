import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {userTable} from "../../db/schema";

export const sessionTable = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => userTable.id, {onDelete: "cascade", onUpdate: "cascade"}),
    refreshToken: text("refresh_token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export interface TokenPayload{
    userId: string;
    role: "user" | "admin";
}

export interface RegisterData{
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface LoginData{
    email: string;
    password: string;
}