"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-action";
import {serverFetch} from "@/shared/api/serverFetch";

const registerValidateSchema = z
    .object({
        email: z
            .string()
            .trim()
            .min(1, "Email address is required")
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must not exceed 20 characters"),
    })

export const loginDrop = actionClient
    .schema(registerValidateSchema)
    .action(async ({parsedInput}) => {
        try{
            const {email, password} = parsedInput;

            const result = await serverFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({email, password}),
            })

            console.log(result)

            return result
        } catch (e){
            console.log(e)

            return {
                success: false,
                error: e
            }
        }
    })