import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./layout.module.scss"
import SidebarPc from "@/widgets/Sidebar/pc/SidebarPc";
import SidebarMobile from "@/widgets/Sidebar/mobile/SidebarMobile";
import SocketProvider from "@/shared/lib/SocketProvider";
import {userApi} from "@/entities/user/api/user.api";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect-error";

interface Props{
    children?: React.ReactNode
}

export default async function ChatLayout({children}: Props) {
    try {
        const user = await userApi.getUser();

        if (!user) {
            redirect("/login");
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        redirect("/login");
    }

    return (
        <SocketProvider>
            <div className={styles.layout}>
                <Sidebar pc={<SidebarPc/>} mobile={<SidebarMobile/>}/>
                {children}
            </div>
        </SocketProvider>
    )
}