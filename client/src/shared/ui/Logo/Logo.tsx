import { WavesHorizontal } from "lucide-react";
import styles from "./Logo.module.scss";

interface Props{
    noMargin?: boolean;
}

export default function Logo({noMargin}: Props) {
    return (
        <div className={noMargin ? styles.noMargin : styles.logo}>
            <div className={styles.iconWrapper}>
                <WavesHorizontal />
            </div>
            <p className={styles.text}>Echo</p>
        </div>
    );
}