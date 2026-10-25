import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {userTable} from "../../db/schema";
import {z} from "zod";

export const sessionTable = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => userTable.id, {onDelete: "cascade", onUpdate: "cascade"}),
    refreshToken: text("refresh_token").notNull().unique(),
    expiresAt: timestamp("expires_at", {withTimezone: true}).notNull(),
    createdAt: timestamp("created_at", {withTimezone: true}).notNull(),
})

export const registerValidateSchema = z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

export const loginValidateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(20),
})

export const logoutAllValidateSchema = z.object({
    userId: z.string().uuid(),
})

export interface TokenPayload{
    userId: string;
    role: "user" | "admin";
}

export interface RegisterData{
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginData{
    email: string;
    password: string;
}