"use client"

import styles from "./ActionSection.module.scss"
import {ReactNode} from "react";

interface Props{
    text:string,
    action: () => void
    icon: ReactNode
    red?: boolean;
}

export default function ActionSection({text, action, icon, red}: Props) {
    return (
        <div
            onClick={action}
            className={`${styles.section} ${red ? styles.red : ""}`}>
            {icon}
            {text}
        </div>
    )
}