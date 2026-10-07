import { WavesHorizontal } from "lucide-react";
import styles from "./Logo.module.scss";

export default function Logo() {
    return (
        <div className={`${styles.logo}`}>
            <div className={styles.iconWrapper}>
                <WavesHorizontal />
            </div>
            <p className={styles.text}>Echo</p>
        </div>
    );
}