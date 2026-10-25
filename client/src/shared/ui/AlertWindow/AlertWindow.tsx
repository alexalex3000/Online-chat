"use client";

import { useEffect, useState, useRef } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import styles from "./AlertWindow.module.scss";

type AlertType = "success" | "error" | "info";

interface Props {
    message?: string;
    type?: AlertType;
    duration?: number;
    onClose?: () => void;
}

export default function AlertWindow({message, type = "info", duration = 4000, onClose,}: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            onClose?.();
        }, 200);
    };

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            setIsClosing(false);

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            if (duration > 0) {
                timerRef.current = setTimeout(() => {
                    handleClose();
                }, duration);
            }
        } else {
            setIsVisible(false);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [message, duration]);

    if (!isVisible || !message) {
        return null;
    }

    const renderIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2 size={18} strokeWidth={2} />;
            case "error":
                return <AlertCircle size={18} strokeWidth={2} />;
            case "info":
            default:
                return <Info size={18} strokeWidth={2} />;
        }
    };

    return (
        <aside
            role="status"
            aria-live="polite"
            className={`${styles.container} ${styles[type]} ${
                isClosing ? styles.closing : ""
            }`}
        >
            <span className={styles.icon}>{renderIcon()}</span>
            <span className={styles.message}>{message}</span>
            <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close notification"
            >
                <X size={16} strokeWidth={2} />
            </button>
        </aside>
    );
}