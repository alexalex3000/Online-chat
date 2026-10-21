"use client"

import styles from "./FullButton.module.scss"

interface Props{
    onClick?:() => void;
    children:React.ReactNode;
}

export default function FullButton({onClick, children}: Props) {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={styles.button}
        >{children}</button>
    )
}