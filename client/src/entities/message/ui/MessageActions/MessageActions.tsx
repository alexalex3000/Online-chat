"use client";

import { Files, SquarePen, Trash } from "lucide-react";
import ActionSection from "@/entities/message/ui/ActionSection/ActionSection";
import styles from "./MessageActions.module.scss";
import { RefObject } from "react";
import {useWebsocket} from "@/shared/api/ws/useWebsocket";
import {useEditMessage} from "@/entities/message/model/edit-store";

interface Props {
    top: number;
    left: number;
    ref: RefObject<HTMLDivElement | null>;
    text: string;
    id: string
}

export default function MessageActions({ top, left, ref, text, id }: Props) {
    const setMessage = useEditMessage(state => state.setMessage)

    const sendMessage = useWebsocket(state => state.sendMessage)

    const editMessage = () => {
        setMessage(id, text)
    }

    const deleteMessage = () => {
        sendMessage({
            type: "DELETE_MESSAGE",
            data: {
                id: id,
            }
        })
    }

    const actions = [
        { text: "Copy", action: async () => {await navigator.clipboard.writeText(text)}, icon: <Files size={18} /> },
        { text: "Edit", action: editMessage, icon: <SquarePen size={18} /> },
        { text: "Delete", action: deleteMessage, icon: <Trash size={18} /> },
    ];

    return (
        <div
            ref={ref}
            className={styles.container}
            style={{ position: "absolute", top: `${top}px`, left: `${left}px`, zIndex: 9999 }}
            onClick={(e) => e.stopPropagation()}
        >
            {actions.map((action, index) => (
                <ActionSection
                    key={`${action.text}-${index}`}
                    text={action.text}
                    action={action.action}
                    icon={action.icon}
                    red={action.text === "Delete"}
                />
            ))}
        </div>
    );
}