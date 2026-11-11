import {serverFetch} from "@/shared/api/serverFetch";
import {settingsResponseSchema} from "@/entities/settings/model/types";

export const settingsApi = {
    getSettings: async() => {
        try{
            const result = await serverFetch(`/settings`)

            const isValid = settingsResponseSchema.safeParse(result)

            if(!isValid.success){
                throw new Error("Bad query")
            }

            return isValid.data;
        }
        catch(e){
            console.error(e)

            return {
                success: false
            }
        }
    }
}