"use client"

import styles from "./ChangeTheme.module.scss"
import Theme from "@/features/ChangeTheme/ui/Theme/Theme";
import {useState} from "react";
import {Check} from "lucide-react";
import {cookies} from "next/headers";

export type ThemeColor = "dark" | "gray" | "light";

interface Schema {
    color: ThemeColor;
    action: () => void
}

export default function ChangeTheme() {
    const [theme, setTheme] = useState<ThemeColor>("dark");

    const colorSchemas: Schema[] = [
        {
            color: "dark",
            action: () => {},
        },
        {
            color: "gray",
            action: () => {}
        },
        {
            color: "light",
            action: () => {}
        }
    ]

    const handleClick = (theme: ThemeColor) => {
        setTheme(theme);
        document.documentElement.dataset.theme = theme;
        document.cookie = `theme=${theme}; path=/ max-age=3153600`;
    }

    return (
        <div className={styles.container}>
            {
                colorSchemas.map((themeObj) => (
                    <div onClick={() => handleClick(themeObj.color)} className={`${styles.changeThemeItem} ${themeObj.color === theme ? styles.selected : ""}`}>
                        <Theme theme={themeObj.color}/>
                        <p>{`${themeObj.color[0].toUpperCase()}${themeObj.color.slice(1)}`}</p>
                        {themeObj.color === theme && (
                            <div className={styles.checkBadge}>
                                <Check />
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}