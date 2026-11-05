"use server"

import {z} from "zod";
import {actionClient} from "@/shared/lib/safe-action";
import {serverFetch} from "@/shared/api/serverFetch";
import {revalidatePath} from "next/cache";

const changeUserValidateSchema = z.object({
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    about: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    email: z.string().email().min(1).optional(),
    logoUrl: z.string().min(1).optional(),
    phoneNumber: z.string().min(10).optional()
})

export const changeUserDrop = actionClient
    .schema(changeUserValidateSchema)
    .action(async ({parsedInput}) => {
        const result = await serverFetch("/user/me", {
            method: "PATCH",
            body: JSON.stringify(parsedInput)
        })

        revalidatePath("/profile")
        return result
    })