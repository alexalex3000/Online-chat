"use client"

import styles from "./SidebarLinks.module.scss"
import Label from "@/shared/ui/Label/Label";
import SidebarLink from "@/shared/ui/SidebarLink/SidebarLink";
import {ReactNode} from "react";
import {CircleQuestionMarkIcon, MessageCircle, Settings, ShieldCheck, User} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SidebarLinks() {
    const path = usePathname();

    const workspaceLinks: {text: string, link: string, icon: ReactNode}[] = [
        {
            text: "Chat",
            link: "/chat",
            icon: <MessageCircle />
        },
        {
            text: "Edit Profile",
            link: "/chat/profile",
            icon: <User/>
        },
        {
            text: "Settings",
            link: "/chat/settings",
            icon: <Settings/>
        }
    ]

    const resourcesLinks: {text: string, link: string, icon: ReactNode}[] = [
        {
            text: "Help & FAQ",
            link: "/chat/help",
            icon: <CircleQuestionMarkIcon/>
        },
        {
            text: "Community Rules",
            link: "/rules",
            icon: <ShieldCheck />
        }
    ]

    return (
        <div className={styles.links}>
            <div>
                <Label label="workspace"/>
                {
                    workspaceLinks.map((link, i) => (
                        <Link key={i} href={link.link}>
                            <SidebarLink selected={path === link.link}>
                                {link.icon}
                                {link.text}
                            </SidebarLink>
                        </Link>
                    ))
                }
            </div>
            <div>
                <Label label="Resources"/>
                {
                    resourcesLinks.map((link, i) => (
                        <Link key={i} href={link.link}>
                            <SidebarLink selected={path === link.link}>
                                {link.icon}
                                {link.text}
                            </SidebarLink>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}