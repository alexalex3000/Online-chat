"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-action";
import {serverFetch} from "@/shared/api/serverFetch";

const registerValidateSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "First name is required")
            .max(50, "First name must not exceed 50 characters"),

        surname: z
            .string()
            .trim()
            .min(1, "Last name is required")
            .max(50, "Last name must not exceed 50 characters"),

        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must not exceed 30 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            ),

        email: z
            .string()
            .trim()
            .min(1, "Email address is required")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must not exceed 20 characters"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const registerDrop = actionClient
    .schema(registerValidateSchema)
    .action(async ({parsedInput}) => {
        const {name, surname, email, password, username, confirmPassword} = parsedInput;

        const result = await serverFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({name, surname, email, password, username}),
        })

        return result
    })