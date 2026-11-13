import { clientFetch } from "@/shared/api/clientFetch";
import { z } from "zod";

const deleteValidation = z.object({
    success: z.boolean(),
    message: z.string().min(1),
});

export type DeleteAccountResponse = z.infer<typeof deleteValidation>;

export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
    try {
        const result = await clientFetch("/auth/delete", {
            method: "DELETE",
        });

        const isValid = deleteValidation.safeParse(result);

        if (!isValid.success) {
            return {
                success: false,
                message: "Invalid server response",
            };
        }

        return isValid.data;
    } catch {
        return {
            success: false,
            message: "Can't delete your account, try again",
        };
    }
};