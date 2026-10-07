"use client"

import {ReactNode} from "react";
import styles from "./Button.module.scss"

interface Props{
    children?: ReactNode;
    onClick?: () => void;
    red?: boolean;
}

export default function Button({children,onClick, red}: Props){
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${red ? styles.red : ""}`}
        >
            {children}
        </button>
    )
}