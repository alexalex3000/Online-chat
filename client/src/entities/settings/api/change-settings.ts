import { clientFetch } from "@/shared/api/clientFetch";
import { ChangeUserSettings, settingsResponseSchema } from "@/entities/settings/model/types";

export const changeSettings =  async (data: ChangeUserSettings) => {
    try {
        const result = await clientFetch(`/settings`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        const isValid = settingsResponseSchema.safeParse(result);

        if (!isValid.success) {
            throw new Error("Bad query");
        }

        return isValid.data;
    } catch (e) {
        console.error(e);
        return {success: false as const};
    }
}