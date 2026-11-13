import {settingsResponseSchema} from "@/entities/settings/model/types";
import {clientFetch} from "@/shared/api/clientFetch";

export const getSettings = async () => {
    try {
        const result = await clientFetch(`/settings`)

        const isValid = settingsResponseSchema.safeParse(result)

        if (!isValid.success) {
            throw new Error("Bad query")
        }

        return isValid.data;
    } catch (e) {
        console.error(e)

        return {
            success: false
        }
    }
}
