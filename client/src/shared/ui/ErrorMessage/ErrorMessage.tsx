import React from "react";
import { AlertCircle } from "lucide-react";
import styles from "./ErrorMessage.module.scss";

interface Props {
    message?: string;
}

export default function ErrorMessage({ message}: Props) {
    if (!message) return null;

    return (
        <div className={styles.banner} role="alert">
      <span className={styles.icon}>
        <AlertCircle size={16} strokeWidth={2} />
      </span>
            <span className={styles.text}>{message}</span>
        </div>
    );
}