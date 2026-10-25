"use client"

import styles from "./FullButton.module.scss"

interface Props{
    onClick?:() => void;
    children:React.ReactNode;
    disabled?: boolean;
}

export default function FullButton({onClick, children, disabled}: Props) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            className={styles.button}
        >{children}</button>
    )
}