import {serverFetch} from "@/shared/api/serverFetch";
import {GetUserResponse, getUserValidatate} from "@/entities/user/model/types";

export const userApi = {
    async getUser(){
        try{
            const data = await serverFetch("/user/me", {
                method: "GET",
            })

            const isValid = getUserValidatate.parse(data)

            return {
                success: true,
                user: isValid.user
            }
        } catch (e){
            console.error(e);
            return {
                success: false,
                error: e
            }
        }
    },

    async getUserById(id: string) {
        try{
            const data = await serverFetch(`/user/${id}`)

            const isValid = getUserValidatate.parse(data)

            return {
                success: true,
                user: isValid.user
            }
        } catch (e){
            console.error(e);
            return {
                success: false,
                error: e
            }
        }
    }
}