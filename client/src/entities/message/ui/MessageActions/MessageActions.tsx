"use client";

import { Files, SquarePen, Trash } from "lucide-react";
import ActionSection from "@/entities/message/ui/ActionSection/ActionSection";
import styles from "./MessageActions.module.scss";
import { RefObject } from "react";

interface Props {
    top: number;
    left: number;
    ref: RefObject<HTMLDivElement | null>;
}

export default function MessageActions({ top, left, ref }: Props) {
    const actions = [
        { text: "Copy", action: () => {}, icon: <Files size={18} /> },
        { text: "Edit", action: () => {}, icon: <SquarePen size={18} /> },
        { text: "Delete", action: () => {}, icon: <Trash size={18} /> },
    ];

    return (
        <div
            ref={ref}
            className={styles.container}
            style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
            onClick={(e) => e.stopPropagation()} // Блокируем всплытие клика к пузырю
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