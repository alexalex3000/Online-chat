import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./layout.module.scss"
import SidebarPc from "@/widgets/Sidebar/pc/SidebarPc";
import SidebarMobile from "@/widgets/Sidebar/mobile/SidebarMobile";
import SocketProvider from "@/shared/providers/SocketProvider";
import {userApi} from "@/entities/user/api/user.api";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {UserProvider} from "@/shared/providers/UserApiProvider";

interface Props{
    children?: React.ReactNode
}

export default async function ChatLayout({children}: Props) {
    let user = null;

    try {
        const response = await userApi.getUser();

        if (response?.success && response.user) {
            user = response.user;
        } else {
            redirect("/login");
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        console.error("[ChatLayout] Failed to load user:", error);
        redirect("/login");
    }

    return (
        <UserProvider user={user}>
            <SocketProvider>
                <div className={styles.layout}>
                    <Sidebar pc={<SidebarPc/>} mobile={<SidebarMobile/>}/>
                    {children}
                </div>
            </SocketProvider>
        </UserProvider>
    )
}