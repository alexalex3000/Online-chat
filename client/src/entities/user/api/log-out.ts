"use server"

import {serverFetch} from "@/shared/api/serverFetch";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function logOut() {
    try{
        const result = await serverFetch("/user/logout", {
            method: "POST",
        })

        if(!result){
            throw new Error("Failed to logOut");
        }

        return result
    } catch (e){
        console.error(e);
        return {success: false};
    } finally {
        const cookieStore = await cookies()

        cookieStore.delete("refreshToken")
        cookieStore.delete("accessToken")
    }

    redirect("/login")

    return {success: true}
}