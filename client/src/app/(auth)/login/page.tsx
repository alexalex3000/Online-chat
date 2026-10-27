import Login from "@/widgets/Login/Login";
import styles from "../page.module.scss"
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function LoginPage() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    const refreshToken = cookieStore.get("refreshToken")?.value

    if(accessToken || refreshToken) {
        redirect("/chat")
    }

    return (
        <div className={styles.wrapper}>
            <Login />
        </div>
    );
}