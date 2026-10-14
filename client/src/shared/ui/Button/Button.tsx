"use client"

import {ReactNode} from "react";
import styles from "./Button.module.scss"

interface Props{
    children?: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    red?: boolean;
    disabled?: boolean;
}

export default function Button({children,onClick, red, type, disabled}: Props){
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${red ? styles.red : ""}`}
        >
            {children}
        </button>
    )
}