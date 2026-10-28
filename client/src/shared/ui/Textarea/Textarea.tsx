"use client"

import { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    defaultValue?: string;
}

export default function Textarea({label, errorMessage, placeholder,defaultValue, id, ...props
                                 }: Props) {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
        <div className={`${styles.container}`}>
            {label && (
                <label htmlFor={textareaId} className={styles.label}>
                    {label}
                </label>
            )}

            <textarea
                id={textareaId}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`${styles.textarea} ${errorMessage ? styles.error : ""}`}
                {...props}
            />

            {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
        </div>
    );
}