"use client"

import styles from "./UnwrapButton.module.scss"

interface Props {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function UnwrapButton({onClick, children}: Props) {
    return (
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
};