import {Search} from "lucide-react";
import styles from "./NoFounded.module.scss"
import Section from "@/shared/ui/Section/Section";

export default function NoFounded() {
    return (
        <Section>
            <div className={styles.noFounded}>
                <div className={styles.wrap}>
                    <Search className={styles.icon} strokeWidth={1.75} />
                    <h2 className={styles.title}>No matching topics</h2>
                    <p className={styles.description}>Try a different search term.</p>
                </div>
            </div>
        </Section>
    )
}