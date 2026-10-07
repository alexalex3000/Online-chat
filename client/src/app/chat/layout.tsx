import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./layout.module.scss"
import SidebarPc from "@/widgets/Sidebar/pc/SidebarPc";
import SidebarMobile from "@/widgets/Sidebar/mobile/SidebarMobile";

interface Props{
    children?: React.ReactNode
}

export default function ChatLayout({children}: Props) {
    return (
        <div className={styles.layout}>
            <Sidebar pc={<SidebarPc/>} mobile={<SidebarMobile/>}/>
            {children}
        </div>
    )
}