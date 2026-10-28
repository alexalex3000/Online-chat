"use client"

import styles from "./UnwrapButton.module.scss"

interface Props {
    children: React.ReactNode;
    form: string
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function UnwrapButton({onClick, children, form}: Props) {
    return (
        <button form={form} className={styles.button} onClick={onClick}>{children}</button>
    )
};