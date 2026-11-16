"use client"

import styles from "./ChangeUserLogo.module.scss"
import {Camera} from "lucide-react";

export default function ChangeUserLogo(){
    return (
        <button
            type="button"
            className={styles.badge}
            aria-label="Change avatar"
        >
            <Camera
                className={styles.icon}
            />
        </button>
    );
}