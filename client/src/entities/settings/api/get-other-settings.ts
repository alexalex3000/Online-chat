import {serverFetch} from "@/shared/api/serverFetch";
import {settingsResponseSchema} from "@/entities/settings/model/types";

export const getOtherSettings = async (id: string) => {
    try{
        const result = await serverFetch(`/settings/${id}`)

        const isValid = settingsResponseSchema.safeParse(result)

        if(!isValid.success){
            throw new Error("Bad query")
        }

        return {
            success: true,
            settings: isValid.data.data
        }
    } catch (e){
        return {
            success: false
        }
    }
}