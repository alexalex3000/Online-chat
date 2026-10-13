"use client"

import styles from "./Theme.module.scss";
import {ThemeColor} from "@/features/ChangeTheme/ChangeTheme";

interface Props {
    theme: ThemeColor;
}

const themeClasses: Record<Props["theme"], string> = {
    dark: styles.darkWrap,
    gray: styles.grayWrap,
    light: styles.lightWrap,
};

export default function Theme({ theme }: Props) {
    return (
        <div className={`${styles.wrapper} ${themeClasses[theme]}`}>
            <div className={styles.big} />
            <div className={styles.miniWrap}>
                <div className={styles.middle} />
                <div className={styles.mini} />
            </div>
        </div>
    );
}