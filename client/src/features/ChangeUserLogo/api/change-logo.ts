"use server";

import { put } from "@vercel/blob";
import { serverFetch } from "@/shared/api/serverFetch";
import { changeAvatarValidate } from "@/entities/user/model/types";

type ChangeLogoResponse =
    | { success: true; url: string }
    | { success: false; error?: string };

export async function changeLogo(file: File): Promise<ChangeLogoResponse> {
    if (!file || file.size === 0) {
        return { success: false, error: "File not found" };
    }

    try {
        const blob = await put(`avatars/${Date.now()}-${file.name}`, file, {
            access: "public",
        });

        console.log(blob)

        const result = await serverFetch("/user/avatar", {
            method: "POST",
            body: JSON.stringify({ logoUrl: blob.url }),
        });

        const parsed = changeAvatarValidate.safeParse(result);

        if (!parsed.success || !parsed.data.success || !parsed.data.logoUrl) {
            return { success: false, error: "Invalid avatar url" };
        }

        return { success: true, url: parsed.data.logoUrl };
    } catch (error) {
        console.error("Error changing logo:", error);
        return { success: false, error: "Cant load file" };
    }
}