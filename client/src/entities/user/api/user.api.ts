import {serverFetch} from "@/shared/api/serverFetch";

export const userApi = {
    async getUser(){
        const data = await serverFetch("/user/me", {
            method: "GET",
        })

        console.log(data);

        return data
    }
}