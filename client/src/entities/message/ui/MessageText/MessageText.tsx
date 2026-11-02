"use client";

import styles from "./MessageText.module.scss";
import TimeInfo from "@/entities/message/ui/TimeInfo/TimeInfo";
import Status from "@/entities/message/ui/Status/Status";
import { MessageStatusType } from "@/entities/message/model/types";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import { useMessageStore } from "@/entities/message/model/message-settings-store";
import { useEffect, useRef, useState } from "react";
import MessageActions from "@/entities/message/ui/MessageActions/MessageActions";

interface Props {
    text: string;
    date: Date;
    status: MessageStatusType;
    user: "other" | "user";
}

export default function MessageText({ text, date, status, user }: Props) {
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const isVisible = useMessageStore((state) => state.isVisible);
    const open = useMessageStore((state) => state.open);
    const close = useMessageStore((state) => state.close);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        const menuWidth = 170;
        const menuHeight = 150;
        const padding = 12;

        const clientX = e.clientX + menuWidth + padding > window.innerWidth
            ? e.clientX - menuWidth
            : e.clientX;

        const clientY = e.clientY + menuHeight + padding > window.innerHeight
            ? e.clientY - menuHeight
            : e.clientY;

        const relativeLeft = clientX - rect.left;
        const relativeTop = clientY - rect.top;

        setPosition({
            left: relativeLeft,
            top: relativeTop,
        });

        open();
    };

    useEffect(() => {
        if (!isVisible) return;

        const handleDocumentClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener("mousedown", handleDocumentClick);

        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, [isVisible, close]);

    if (user === "other") {
        return (
            <div className={styles.contentWrapper}>
                <div className={styles.authorRow}>
                    <Name />
                    <Username />
                </div>
                <div className={styles.otherBubble}>
                    {text.trim()}
                    <div className={styles.meta}>
                        <TimeInfo date={date} user={user}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.userBubble} onContextMenu={handleOpen}>
                {text.trim()}
                <div className={styles.meta}>
                    <TimeInfo date={date} user={user}/>
                    <Status status={status} />
                </div>
                {isVisible && position.top !== 0 && (
                    <MessageActions ref={menuRef} top={position.top} left={position.left} />
                )}
            </div>
        </div>
    );
}