import styles from "./ChatInterfaceSettings.module.scss"
import Label from "@/shared/ui/Label/Label";
import Section from "@/shared/ui/Section/Section";
import ChangeTheme from "@/features/ChangeTheme/ChangeTheme";
import {Moon} from "lucide-react";

export default function ChatInterfaceSettings() {
    return (
        <div>
            <Label label="Appearance"/>
            <Section>
                <header className={styles.header}>
                    <div className={styles.titleWrap}>
                        <Moon className={styles.icon} />
                        <h2 className={styles.title}>Color theme</h2>
                    </div>
                    <span className={styles.subtitle}>Choose your preferred interface style</span>
                </header>
                <div className={styles.main}>
                    <ChangeTheme/>
                </div>
            </Section>
        </div>
    )
}