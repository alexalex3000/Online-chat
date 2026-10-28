import {serverFetch} from "@/shared/api/serverFetch";
import {GetUserResponse} from "@/entities/user/model/types";

export const userApi = {
    async getUser(){
        const data = await serverFetch("/user/me", {
            method: "GET",
        }) as GetUserResponse

        console.log(data)

        return data
    }
}