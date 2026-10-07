"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, User, Settings, HelpCircle } from "lucide-react";
import styles from "./SidebarMobile.module.scss";

export default function SidebarMobile() {
    const path = usePathname();

    const links = [
        { text: "Chat", link: "/chat", icon: <MessageCircle /> },
        { text: "Profile", link: "/chat/profile", icon: <User /> },
        { text: "Settings", link: "/chat/settings", icon: <Settings /> },
        { text: "Help", link: "/chat/help", icon: <HelpCircle /> },
    ];

    return (
        <nav className={styles.bottomNav}>
            {links.map((link) => {
                const isActive = path === link.link;
                return (
                    <Link
                        key={link.link}
                        href={link.link}
                        className={`${styles.item} ${isActive ? styles.active : ""}`}
                    >
                        {link.icon}
                        <span>{link.text}</span>
                    </Link>
                );
            })}
        </nav>
    );
}