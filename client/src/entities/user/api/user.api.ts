import {serverFetch} from "@/shared/api/serverFetch";
import {GetUserResponse} from "@/entities/user/model/types";

export const userApi = {
    async getUser(){
        try{
            const data = await serverFetch("/user/me", {
                method: "GET",
            }) as GetUserResponse

            return {
                success: true,
                user: data.user
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