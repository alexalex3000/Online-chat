"use client";

import { useEffect, useState, useRef } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import styles from "./AlertWindow.module.scss";
import { useAlertStore } from "@/features/AlertWindow/model/alert-store";

type AlertType = "success" | "error" | "info";

interface Props {
    duration?: number;
    onClose?: () => void;
}

export default function AlertWindow({ duration = 4000, onClose }: Props) {
    const value = useAlertStore((state) => state.value);
    const setValue = useAlertStore((state) => state.setValue);
    const type = useAlertStore((state) => state.type);
    const setType = useAlertStore((state) => state.setType);

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const closeAnimationRef = useRef<NodeJS.Timeout | null>(null);

    const handleClose = () => {
        setIsClosing(true);

        closeAnimationRef.current = setTimeout(() => {
            setValue(null);
            setType(null);
            setIsClosing(false);
            onClose?.();
        }, 200);
    };

    useEffect(() => {
        if (!value) {
            setIsClosing(false);
            return;
        }

        setIsClosing(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (duration > 0) {
            timerRef.current = setTimeout(() => {
                handleClose();
            }, duration);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (closeAnimationRef.current) clearTimeout(closeAnimationRef.current);
        };
    }, [value, duration]);

    if (!value) {
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
            className={`${styles.container} ${styles[type ?? "info"]} ${
                isClosing ? styles.closing : ""
            }`}
        >
            <span className={styles.icon}>{renderIcon()}</span>
            <span className={styles.message}>{value}</span>
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