import styles from "../Sidebar.module.scss"
import Logo from "@/shared/ui/Logo/Logo";
import SidebarLinks from "@/features/SidebarLinks/SidebarLinks";
import UserLink from "@/features/UserLink/UserLink";
import Link from "next/link";

export default function SidebarPc(){
    return (
        <div className={styles.sidebar}>
            <div className="flex gap-20 flex-col">
                <Logo/>
                <SidebarLinks/>
            </div>
            <Link href="/chat/profile">
                <UserLink/>
            </Link>
        </div>
    )
}