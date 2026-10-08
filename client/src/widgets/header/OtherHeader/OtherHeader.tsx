"use client"

import styles from "../header.module.scss";
import UnwrapButton from "@/shared/ui/UnwrapButton/UnwrapButton";

interface Props{
    showButton?: boolean
    text: string
}

export default function OtherHeader({showButton, text}: Props) {
    return (
        <header className={styles.header}>
            <div>
                <h2 className={styles.category}>Account</h2>
                <p className={styles.title}>{text}</p>
            </div>
            {showButton && <UnwrapButton onClick={() => {}}>Save Changes</UnwrapButton>}
        </header>
    );
}