"use client";

import styles from "./ChangeUserLogo.module.scss";
import { Camera } from "lucide-react";
import { ChangeEvent, useTransition } from "react";
import { changeLogo } from "@/features/ChangeUserLogo/api/change-logo";
import { useUserStore } from "@/entities/user/model/user-store";
import { useAlertStore } from "@/features/AlertWindow/model/alert-store";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB (лимит Vercel Serverless Functions)

export default function ChangeUserLogo() {
    const [isPending, startTransition] = useTransition();
    const changeUserAvatar = useUserStore((state) => state.changeLogo);

    const setType = useAlertStore((state) => state.setType);
    const setValue = useAlertStore((state) => state.setValue);

    const showAlert = (message: string, type: "success" | "error") => {
        setValue(message);
        setType(type);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Сбрасываем value сразу, чтобы можно было повторно выбрать тот же файл
        e.target.value = "";

        if (!file) {
            showAlert("Cant change avatar", "error");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            showAlert("File too big. Max size — 4.5 MB", "error");
            return;
        }

        startTransition(async () => {
            try {
                const result = await changeLogo(file);

                if (!result.success) {
                    showAlert("Cant change avatar", "error");
                    return;
                }

                changeUserAvatar(result.url);
                showAlert("Successful changing of avatar", "success");
            } catch {
                showAlert("Cant change avatar", "error");
            }
        });
    };

    return (
        <label className={styles.badge} aria-label="Change avatar">
            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className={styles.input}
                disabled={isPending}
                onChange={handleChange}
            />
            <Camera className={styles.icon} />
        </label>
    );
}