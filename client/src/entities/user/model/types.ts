import {z} from "zod";

export interface User {
    id?:string;
    role: "user" | "admin";
    name: string;
    surname: string;
    username: string;
    email: string;
    about: string | null;
    lastTimeOnline: Date;
    logoUrl: string | null;
    phoneNumber: string | null;
}

export interface GetUserResponse {
    success: boolean;
    user?: User;
}

export const getUserValidatate = z.object({
    success: z.boolean(),
    user: z.object({
        id: z.string().uuid(),
        role: z.enum(["user", "admin"]),
        name: z.string().min(1),
        surname: z.string().min(1),
        username: z.string().min(1),
        email: z.string().email(),
        about: z.string().nullable(),
        phoneNumber: z.string().nullable(),
        logoUrl: z.string().url().nullable().or(z.literal(null)),
        lastTimeOnline: z.coerce.date(),
    }),
})

export interface GetUserCountResponse {
    success: boolean;
    total?: {
        total: number;
        onlineTotal: number;
    };
}