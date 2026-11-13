import {User} from "@/entities/user/model/types";
import {z} from "zod";

export type MessageStatusType = "pending" | "success" | "error";

export interface Message {
    id: string
    message: string;
    status: MessageStatusType;
    owner: User | null
    date: Date
}

export const validateMessage = z.object({
    id: z.string().uuid(),
    message: z.string().min(1),
    date: z.string().or(z.date()),
    userId: z.string().uuid(),
})

export const validateMessageResponse = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.array(
        z.object({
            id: z.string().uuid(),
            message: z.string().min(1),
            date: z.coerce.date(),
            status: z.enum(["success", "error", "pending"]),
            owner: z.object({
                id: z.string().uuid().optional(),
                role: z.enum(["user", "admin"]),
                name: z.string(),
                surname: z.string(),
                username: z.string(),
                email: z.string().email(),
                about: z.string().nullable(),
                phoneNumber: z.string().nullable(),
                logoUrl: z.string().nullable(),
                lastTimeOnline: z.coerce.date(),
            }),
        })
    )
})