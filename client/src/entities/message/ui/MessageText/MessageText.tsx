"use client";

import styles from "./MessageText.module.scss";
import TimeInfo from "@/entities/message/ui/TimeInfo/TimeInfo";
import Status from "@/entities/message/ui/Status/Status";
import {Message, MessageStatusType} from "@/entities/message/model/types";
import Name from "@/entities/user/ui/Name/Name";
import Username from "@/entities/user/ui/Username/Username";
import { useMessageStore } from "@/entities/message/model/message-settings-store";
import { useEffect, useRef, useState } from "react";
import MessageActions from "@/entities/message/ui/MessageActions/MessageActions";
import {User} from "@/entities/user/model/types";
import {useUserStore} from "@/entities/user/model/user-store";

interface Props {
    message: Message
}

export default function MessageText({message}: Props) {
    const user = useUserStore(state => state.user);

    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const activeMessageId = useMessageStore((state) => state.activeMessageId);
    const isVisible = activeMessageId === message.id;
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

        open(message.id);
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

    if (message.owner?.id !== user?.id) {
        return (
            <div className={styles.contentWrapper}>
                <div className={styles.authorRow}>
                    <Name name={message.owner?.name ?? "Deleted account"} />
                    <Username username={message.owner?.username ?? ""} />
                </div>
                <div className={styles.otherBubble}>
                    {message.message.trim()}
                    <div className={styles.meta}>
                        <TimeInfo date={message.date} user={"other"} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.userBubble} onContextMenu={handleOpen}>
                {message.message.trim()}
                <div className={styles.meta}>
                    <TimeInfo date={message.date} user={"user"}/>
                    <Status status={message.status} />
                </div>
                {isVisible && position.top !== 0 && (
                    <MessageActions id={message.id} text={message.message.trim()} ref={menuRef} top={position.top} left={position.left} />
                )}
            </div>
        </div>
    );
}